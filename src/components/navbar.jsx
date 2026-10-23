import { useState, useEffect, useRef } from "react";
import Icon from "./Icon";
import { CONTAINER } from "../sections/Section";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Projects" },
  { id: "achievement", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

// Tracks which section is under the navbar so its link can be marked current.
function useActiveSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    // "home" is observed too so no link stays marked while the hero is in view.
    const sections = ["home", ...NAV_ITEMS.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      // A thin band just below the navbar: whichever section crosses it is current.
      { rootMargin: "-30% 0px -65% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

// Plain anchor links: smooth scrolling comes from `motion-safe:scroll-smooth`
// on <html> and the fixed-header offset from `scroll-margin-top` (index.css).
const NavLinks = ({ className, linkClassName, active, onNavigate }) => (
  <ul className={className}>
    {NAV_ITEMS.map((item) => {
      const current = item.id === active;
      return (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            aria-current={current ? "location" : undefined}
            className={`font-medium transition-colors hover:text-white ${
              current ? "text-white" : "text-zinc-400"
            } ${linkClassName}`}
          >
            {item.label}
          </a>
        </li>
      );
    })}
  </ul>
);

const Navbar = ({ brand }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const active = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = () => setMobileMenuOpen(false);
    const handleKeyDown = (e) => e.key === "Escape" && close();
    const handlePointerDown = (e) => !navRef.current?.contains(e.target) && close();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className={`navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-zinc-950/90 backdrop-blur border-b border-zinc-800/80 py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className={`${CONTAINER} flex items-center justify-between`}>
        {/* Wordmark echoes the logo: the name followed by a green cursor bar. */}
        <a href="#home" className="inline-flex items-baseline text-xl font-bold tracking-tight text-white sm:text-2xl">
          {brand}
          <span className="ml-1 inline-block h-[0.14em] w-[0.6em] rounded-[1px] bg-accent-strong" aria-hidden="true" />
        </a>

        <NavLinks
          className="hidden md:flex items-center gap-7 lg:gap-9"
          linkClassName="text-[0.95rem]"
          active={active}
        />

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-white md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <Icon name={mobileMenuOpen ? "close" : "menu"} className="h-6 w-6" />
        </button>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 right-0 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur md:hidden"
          >
            <NavLinks
              className={`${CONTAINER} flex flex-col py-2`}
              linkClassName="flex min-h-12 items-center text-lg"
              active={active}
              onNavigate={closeMobileMenu}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
