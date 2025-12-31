import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Fungsi untuk smooth scroll dengan offset
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 100; // Tinggi navbar + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    closeMobileMenu();
  };

  return (
    <nav
      className={`navbar py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-900/90 backdrop-blur shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="logo">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Portofolio
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="menu hidden md:flex items-center gap-8 lg:gap-10">
          <li>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="text-base lg:text-lg font-medium hover:text-blue-200 transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "about")}
              className="text-base lg:text-lg font-medium hover:text-blue-200 transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#experience"
              onClick={(e) => handleNavClick(e, "experience")}
              className="text-base lg:text-lg font-medium hover:text-blue-200 transition-colors"
            >
              Experience
            </a>
          </li>
          <li>
            <a
              href="#project"
              onClick={(e) => handleNavClick(e, "project")}
              className="text-base lg:text-lg font-medium hover:text-blue-200 transition-colors"
            >
              Project
            </a>
          </li>
          <li>
            <a
              href="#achievement"
              onClick={(e) => handleNavClick(e, "achievement")}
              className="text-base lg:text-lg font-medium hover:text-blue-200 transition-colors"
            >
              Achievement
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="text-base lg:text-lg font-medium hover:text-blue-200 transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className={mobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur md:hidden">
            <ul className="flex flex-col items-center py-4 space-y-4">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, "home")}
                  className="text-lg font-medium hover:text-blue-200 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, "about")}
                  className="text-lg font-medium hover:text-blue-200 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleNavClick(e, "experience")}
                  className="text-lg font-medium hover:text-blue-200 transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#project"
                  onClick={(e) => handleNavClick(e, "project")}
                  className="text-lg font-medium hover:text-blue-200 transition-colors"
                >
                  Project
                </a>
              </li>
              <li>
                <a
                  href="#achievement"
                  onClick={(e) => handleNavClick(e, "achievement")}
                  className="text-lg font-medium hover:text-blue-200 transition-colors"
                >
                  Achievement
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="text-lg font-medium hover:text-blue-200 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
