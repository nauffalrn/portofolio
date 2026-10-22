// Builds the <head> tags for the prerendered page from the profile content.
// Runs at build time only (see src/entry-server.jsx).

const DESCRIPTION_MAX = 155; // Google truncates snippets around here.

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function truncate(text, max) {
  if (text.length <= max) return text;
  const lastSpace = text.lastIndexOf(" ", max - 1);
  return `${text.slice(0, lastSpace > 0 ? lastSpace : max - 1)}…`;
}

function buildPersonSchema(profile, siteUrl, imageUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: siteUrl,
    image: imageUrl,
    email: profile.contact_email ? `mailto:${profile.contact_email}` : undefined,
    alumniOf: profile.university_name
      ? { "@type": "CollegeOrUniversity", name: profile.university_name }
      : undefined,
    sameAs: [
      profile.contact_linkedin,
      profile.contact_github,
      profile.contact_instagram,
    ].filter(Boolean),
  };
}

export function buildHead(profile, siteUrl) {
  const canonicalUrl = `${siteUrl.replace(/\/$/, "")}/`;
  const title = `${profile.name} | ${profile.title}`;
  const description = truncate(
    profile.about_paragraphs?.[0] || `${profile.name} — ${profile.title}.`,
    DESCRIPTION_MAX
  );
  const imageUrl = profile.hero_image
    ? new URL(profile.hero_image.src, canonicalUrl).href
    : undefined;

  // "</" is escaped so the JSON can never close the <script> tag early.
  const jsonLd = JSON.stringify(
    buildPersonSchema(profile, canonicalUrl, imageUrl)
  ).replace(/</g, "\\u003c");

  const meta = [
    ["name", "description", description],
    ["property", "og:type", "profile"],
    ["property", "og:site_name", profile.name],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:url", canonicalUrl],
    ["property", "og:image", imageUrl],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
    ["name", "twitter:image", imageUrl],
  ]
    .filter(([, , content]) => content)
    .map(
      ([attr, key, content]) =>
        `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`
    );

  return [
    `<title>${escapeHtml(title)}</title>`,
    ...meta,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join("\n    ");
}
