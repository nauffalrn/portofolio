import "./index.css";

// Production HTML is prerendered (scripts/prerender.mjs): all content and the
// anchor links already work without JS. React only adds interactivity
// (modals, mobile menu), so the whole app bundle is fetched after the page has
// loaded instead of competing with the hero image and fonts. Only the CSS
// stays in this entry, so it is still inlined into the HTML at build time.
const start = () => import("./hydrate.jsx");

if (document.readyState === "complete") {
  start();
} else {
  window.addEventListener("load", start, { once: true });
}
