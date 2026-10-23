import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Icon from "./Icon";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Projects" },
  { id: "achievement", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

// useLayoutEffect warns during the build-time prerender; it only matters in the browser.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Raised surface shared by the pill and the mobile panel: a lighter fill than the page,
// a hairline border and a soft top highlight so it reads as its own layer.
const SURFACE =
  "border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_14px_36px_-14px_rgb(0_0_0/0.9)]";

// Tracks which section is under the navbar so its link can be marked current.
function useActiveSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    // "home" is observed too so no link stays marked while the hero is in view.
    const sections = ["home", ...NAV_ITEMS.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let inBand = null;
    // The last section is too short to reach the band, so it wins once the page bottoms out.
    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? NAV_ITEMS.at(-1).id : inBand);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) inBand = visible[0].target.id;
        update();
      },
      // A thin band just below the navbar: whichever section crosses it is current.
      { rootMargin: "-30% 0px -65% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return active;
}

// Desktop links with a highlight that slides to the current section.
const DesktopLinks = ({ active }) => {
  const listRef = useRef(null);
  const [indicator, setIndicator] = useState(null);

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      // Measure the <li>: it is the link's offset parent, so its offset is relative to the list.
      const item = listRef.current?.querySelector(`[data-id="${active}"]`)?.parentElement;
      setIndicator(item ? { left: item.offsetLeft, width: item.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <ul ref={listRef} className="relative hidden items-center md:flex">
      <li
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 rounded-full bg-white/[0.08] ring-1 ring-white/10 motion-safe:transition-[transform,width,opacity] motion-safe:duration-300 motion-safe:ease-out"
        style={{
          width: indicator?.width ?? 0,
          transform: `translateX(${indicator?.left ?? 0}px)`,
          opacity: indicator ? 1 : 0,
        }}
      />
      {NAV_ITEMS.map((item) => {
        const current = item.id === active;
        return (
          <li key={item.id} className="relative">
            <a
              href={`#${item.id}`}
              data-id={item.id}
              aria-current={current ? "location" : undefined}
              className={`flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors lg:px-4 ${
                current ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const Navbar = ({ brand }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const active = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
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
  const raised = scrolled || mobileMenuOpen;

  return (
    <nav ref={navRef} aria-label="Main" className="navbar fixed inset-x-0 top-3 z-40 sm:top-4">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div
          className={`${SURFACE} relative flex h-14 items-center justify-between rounded-full pr-2 pl-5 transition-[background-color] duration-300 ${
            raised ? "bg-zinc-900/95" : "bg-zinc-900/75"
          }`}
        >
          {/* Green hairline along the top edge, echoing the logo's cursor bar. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 -top-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
          />
          {/* Wordmark echoes the logo: the name followed by a green cursor bar. */}
          <a href="#home" className="inline-flex items-baseline text-lg font-bold tracking-tight text-white sm:text-xl">
            {brand}
            <span className="ml-1 inline-block h-[0.14em] w-[0.6em] rounded-[1px] bg-accent-strong" aria-hidden="true" />
          </a>

          <DesktopLinks active={active} />

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className={`${SURFACE} absolute inset-x-4 top-full mt-2 overflow-hidden rounded-3xl bg-zinc-900/95 p-2 sm:inset-x-6 md:hidden`}
          >
            <ul>
              {NAV_ITEMS.map((item) => {
                const current = item.id === active;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={closeMobileMenu}
                      aria-current={current ? "location" : undefined}
                      className={`flex min-h-12 items-center justify-between rounded-2xl px-4 text-lg font-medium transition-colors ${
                        current ? "bg-white/[0.08] text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {current && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
