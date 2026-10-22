import { StrictMode } from "react";
import "./index.css";
import PublicSite from "./PublicSite.jsx";
import content from "./generated/content.json";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <PublicSite content={content} />
  </StrictMode>
);

// Production HTML is prerendered (scripts/prerender.mjs): all content and the
// anchor links already work without JS. React only adds interactivity
// (modals, mobile menu), so react-dom - the largest chunk - is fetched after
// the page has loaded instead of competing with the hero image and fonts.
async function start() {
  const { createRoot, hydrateRoot } = await import("react-dom/client");
  if (container.hasChildNodes()) {
    hydrateRoot(container, app);
  } else {
    // `vite dev` serves an empty #root.
    createRoot(container).render(app);
  }
}

if (document.readyState === "complete") {
  start();
} else {
  window.addEventListener("load", start, { once: true });
}
