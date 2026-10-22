import { useState, useEffect } from "react";
import Icon from "./Icon";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Project" },
  { id: "achievement", label: "Achievement" },
  { id: "contact", label: "Contact" },
];

// Plain anchor links: smooth scrolling comes from `scroll-smooth` on <html>
// and the fixed-header offset from `scroll-margin-top` on sections (index.css).
const NavLinks = ({ className, linkClassName, onNavigate }) => (
  <ul className={className}>
    {NAV_ITEMS.map((item) => (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          onClick={onNavigate}
          className={`font-medium hover:text-blue-200 transition-colors ${linkClassName}`}
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = ({ brand }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav
      aria-label="Main"
      className={`navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-zinc-900/90 backdrop-blur shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="text-2xl sm:text-3xl font-bold text-white">
          {brand}
        </a>

        <NavLinks
          className="hidden md:flex items-center gap-8 lg:gap-10"
          linkClassName="text-base lg:text-lg"
        />

        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <Icon name={mobileMenuOpen ? "close" : "menu"} className="w-7 h-7" />
        </button>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur md:hidden"
          >
            <NavLinks
              className="flex flex-col items-center py-4 space-y-4"
              linkClassName="text-lg"
              onNavigate={closeMobileMenu}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
