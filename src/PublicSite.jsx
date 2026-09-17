import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import PreLoader from "./components/PreLoader.jsx";
import Aurora from "./components/Aurora.jsx";
import App from "./App.jsx";

const PublicSite = () => (
  <>
    <Aurora />
    <PreLoader />
    <Navbar />
    <div className="pt-24">
      <App />
      <Footer />
    </div>
  </>
);

export default PublicSite;
