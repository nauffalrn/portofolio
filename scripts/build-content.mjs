// Build-time content pipeline for the public site.
//
// Why: the public page used to fetch its content (and multi-MB images) from
// Supabase in the browser *after* the JS bundle ran, which made LCP ~19s on
// mobile. Instead we fetch everything once at build time, optimize every image
// into responsive WebP files served from our own origin, and write a JSON file
// that the page is prerendered from.
//
// Output:
//   src/generated/content.json  - content consumed by the React app
//   public/media/*.webp         - optimized images (content-hashed, cacheable)
//
// Usage: node scripts/build-content.mjs
//   Reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from the environment or
//   .env. Set CONTENT_FIXTURE=path/to/rows.json to build from a local file of
//   raw rows ({ profile, experiences, projects, certificates }) instead.

import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { loadEnv } from "vite";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_JSON = path.join(ROOT, "src", "generated", "content.json");
const MEDIA_DIR = path.join(ROOT, "public", "media");
const MEDIA_URL = "/media";

// Candidate widths for srcset. The browser picks one based on the `sizes`
// attribute and the device pixel ratio.
const WIDTHS = [128, 320, 480, 560, 640, 1024, 1600];
const WEBP_QUALITY = 75;

async function loadRows() {
  if (process.env.CONTENT_FIXTURE) {
    return JSON.parse(await readFile(process.env.CONTENT_FIXTURE, "utf8"));
  }

  const env = { ...loadEnv("production", ROOT, "VITE_"), ...process.env };
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Copy .env.example to .env and fill them in."
    );
  }

  const supabase = createClient(url, key);
  const unwrap = ({ data, error }) => {
    if (error) throw error;
    return data;
  };
  const ordered = (table) =>
    supabase.from(table).select("*").order("order_index", { ascending: true });

  const [profile, experiences, projects, certificates] = await Promise.all([
    supabase.from("profile").select("*").eq("id", 1).single().then(unwrap),
    ordered("experiences").then(unwrap),
    ordered("projects").then(unwrap),
    ordered("certificates").then(unwrap),
  ]);
  return { profile, experiences, projects, certificates };
}

async function processImage(sourceUrl) {
  const res = await fetch(sourceUrl);
  if (!res.ok) throw new Error(`Failed to download ${sourceUrl}: ${res.status}`);

  // Apply EXIF orientation once so width/height below match what is displayed.
  const input = await sharp(Buffer.from(await res.arrayBuffer()), { failOn: "none" })
    .rotate()
    .toBuffer();
  const { width, height } = await sharp(input).metadata();

  // Content hash => the URL changes whenever the image changes, which lets us
  // cache /media/* forever.
  const id = createHash("sha1").update(input).digest("hex").slice(0, 12);
  const widths = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, WIDTHS.at(-1))])];

  const variants = await Promise.all(
    widths.map(async (w) => {
      const file = `${id}-${w}.webp`;
      const target = path.join(MEDIA_DIR, file);
      if (!existsSync(target)) {
        await sharp(input).resize({ width: w }).webp({ quality: WEBP_QUALITY }).toFile(target);
      }
      return { url: `${MEDIA_URL}/${file}`, width: w };
    })
  );

  const largest = variants.at(-1);
  return {
    src: largest.url,
    srcSet: variants.map((v) => `${v.url} ${v.width}w`).join(", "),
    width: largest.width,
    height: Math.round((height * largest.width) / width),
  };
}

// The same URL can appear several times (e.g. hero + mini avatar); process once.
const imageCache = new Map();
function optimizeImage(url) {
  if (!url) return Promise.resolve(null);
  if (!imageCache.has(url)) imageCache.set(url, processImage(url));
  return imageCache.get(url);
}

// Drop DB bookkeeping and raw storage URLs so they don't end up in the bundle.
function stripInternalFields(row, extraKeys = []) {
  const omitted = new Set(["created_at", "updated_at", "order_index", ...extraKeys]);
  return Object.fromEntries(Object.entries(row).filter(([k]) => !omitted.has(k)));
}

async function buildContent({ profile, experiences, projects, certificates }) {
  const [heroImage, universityLogo] = await Promise.all([
    optimizeImage(profile.hero_image_url),
    optimizeImage(profile.university_logo_url),
  ]);

  return {
    profile: {
      ...stripInternalFields(profile, ["hero_image_url", "university_logo_url"]),
      hero_image: heroImage,
      university_logo: universityLogo,
    },
    experiences: await Promise.all(
      experiences.map(async (exp) => ({
        ...stripInternalFields(exp, ["logo_url", "photos"]),
        logo: await optimizeImage(exp.logo_url),
        photos: await Promise.all(
          (exp.photos || []).map(async (photo) => ({
            caption: photo.caption || "",
            image: await optimizeImage(photo.src),
          }))
        ),
      }))
    ),
    projects: await Promise.all(
      projects.map(async (project) => ({
        ...stripInternalFields(project, ["gambar_url"]),
        image: await optimizeImage(project.gambar_url),
      }))
    ),
    certificates: await Promise.all(
      certificates.map(async (certificate) => ({
        ...stripInternalFields(certificate, ["gambar_url"]),
        image: await optimizeImage(certificate.gambar_url),
      }))
    ),
  };
}

async function main() {
  await mkdir(MEDIA_DIR, { recursive: true });
  await mkdir(path.dirname(OUT_JSON), { recursive: true });

  const content = await buildContent(await loadRows());
  await writeFile(OUT_JSON, JSON.stringify(content, null, 2));
  console.log(`Content written to ${path.relative(ROOT, OUT_JSON)} (${imageCache.size} images optimized).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
