import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import PublicSite from "./PublicSite.jsx";
import content from "./generated/content.json";
import { buildHead } from "./seo.js";

// Used only at build time by scripts/prerender.mjs.
export function render({ siteUrl }) {
  const html = renderToString(
    <StrictMode>
      <PublicSite content={content} />
    </StrictMode>
  );
  return { html, head: buildHead(content.profile, siteUrl) };
}
