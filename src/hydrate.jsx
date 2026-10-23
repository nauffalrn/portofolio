import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import PublicSite from "./PublicSite.jsx";
import content from "./generated/content.json";

// Loaded lazily by src/entry-client.jsx after the page's load event.
const container = document.getElementById("root");
const app = (
  <StrictMode>
    <PublicSite content={content} />
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  // `vite dev` serves an empty #root.
  createRoot(container).render(app);
}
