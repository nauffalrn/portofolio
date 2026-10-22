import { useEffect } from "react";
import Icon from "./Icon";

// Shared dialog shell: locks page scroll, closes on Escape / backdrop click,
// and moves focus to the close button so keyboard users land inside it.
const Modal = ({ label, onClose, className = "", children }) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
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
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-700"
        >
          <Icon name="close" className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
