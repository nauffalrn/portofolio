// Turns dist/index.html into a fully rendered static page (SSG).
//
// Runs after `vite build` (client) and `vite build --ssr` (server bundle):
//   1. renders <PublicSite> to HTML, so content is visible before any JS runs
//      and crawlers see real text;
//   2. injects SEO tags (title, description, Open Graph, JSON-LD);
//   3. inlines the CSS so it isn't a separate render-blocking request;
//   4. writes robots.txt and sitemap.xml for the same SITE_URL.
//
// Env: SITE_URL (default https://www.nauffal.my.id) for canonical/OG URLs.

import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SSR_DIST = path.join(ROOT, "dist-ssr");
const SITE_URL = process.env.SITE_URL || "https://www.nauffal.my.id";

const STYLESHEET_LINK = /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g;

async function inlineStylesheets(html) {
  const links = [...html.matchAll(STYLESHEET_LINK)];
  for (const [tag, href] of links) {
    const css = await readFile(path.join(DIST, href), "utf8");
    html = html.replace(tag, () => `<style>${css}</style>`);
  }
  return html;
}

// Fonts used above the fold. Fonts referenced only from the (inlined) CSS are
// discovered late, after the HTML is parsed; preloading them lets them arrive
// before first paint, so the hero text never reflows on the font swap.
const CRITICAL_FONTS = /\/assets\/(?:poppins-latin-(?:400|500|600|700)|jetbrains-mono-latin-400)-normal-[\w-]+\.woff2/g;

function preloadFonts(html) {
  const hrefs = [...new Set(html.match(CRITICAL_FONTS) || [])];
  const links = hrefs
    .map((href) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="${href}">`)
    .join("");
  return html.replace("</title>", () => `</title>${links}`);
}

async function writeCrawlerFiles(siteUrl) {
  const homeUrl = `${siteUrl.replace(/\/$/, "")}/`;
  const today = new Date().toISOString().slice(0, 10);

  await writeFile(
    path.join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${homeUrl}sitemap.xml\n`
  );
  await writeFile(
    path.join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${homeUrl}</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`
  );
}

async function main() {
  const { render } = await import(
    pathToFileURL(path.join(SSR_DIST, "entry-server.js")).href
  );
  const { html: appHtml, head } = render({ siteUrl: SITE_URL });

  const templatePath = path.join(DIST, "index.html");
  const template = await readFile(templatePath, "utf8");
  // Function replacers: `$` in content must not be treated as a pattern.
  const page = preloadFonts(await inlineStylesheets(
    template
      .replace("<!--app-head-->", () => head)
      .replace("<!--app-html-->", () => appHtml)
  ));

  await writeFile(templatePath, page);
  await writeCrawlerFiles(SITE_URL);
  await rm(SSR_DIST, { recursive: true, force: true });
  console.log(`Prerendered dist/index.html for ${SITE_URL}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
