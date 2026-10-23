import { useEffect, useRef } from "react";
import Icon from "./Icon";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Shared dialog shell: locks page scroll, closes on Escape / backdrop click,
// keeps Tab inside the dialog, and hands focus back to whatever opened it.
const Modal = ({ label, onClose, className = "", children }) => {
  const dialogRef = useRef(null);
  // Read during the first render, before autoFocus moves focus to Close.
  const openerRef = useRef(document.activeElement);
  // Parents pass an inline onClose; keep the latest without re-running the effect.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      opener?.focus?.();
    };
  }, []);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-h-[90vh] overflow-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800/90 text-white ring-1 ring-zinc-600 transition-colors hover:bg-zinc-700"
        >
          <Icon name="close" className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
