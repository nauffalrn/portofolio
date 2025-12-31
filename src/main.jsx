import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import PreLoader from "./components/PreLoader.jsx";
import Aurora from "./components/Aurora.jsx";
import "remixicon/fonts/remixicon.css";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Aurora />
    <PreLoader />
    <Navbar />
    <div className="pt-24">
      <App />
      <Footer />
    </div>
  </StrictMode>
);
