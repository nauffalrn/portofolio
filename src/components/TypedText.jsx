import { useEffect, useState } from "react";

const TYPE_MS = 100;
const DELETE_MS = 50;
const PAUSE_MS = 2000;

function nextStep({ index, length, deleting }, texts) {
  const text = texts[index];
  if (!deleting) {
    return length < text.length
      ? { index, length: length + 1, deleting }
      : { index, length, deleting: true };
  }
  if (length > 0) return { index, length: length - 1, deleting };
  return { index: (index + 1) % texts.length, length: 0, deleting: false };
}

// Typewriter effect, isolated in its own component so its 10 updates/second
// re-render only this <span> instead of the whole page.
// Starts with the first text fully typed so the prerendered HTML (and search
// engines) see real content.
const TypedText = ({ texts, className }) => {
  const [step, setStep] = useState({
    index: 0,
    length: texts[0].length,
    deleting: false,
  });

  useEffect(() => {
    const fullyTyped = !step.deleting && step.length === texts[step.index].length;
    const delay = fullyTyped ? PAUSE_MS : step.deleting ? DELETE_MS : TYPE_MS;
    const timeout = setTimeout(() => setStep(nextStep(step, texts)), delay);
    return () => clearTimeout(timeout);
  }, [step, texts]);

  return (
    <span className={className}>
      <span className="sr-only">{texts.join(", ")}</span>
      <span aria-hidden="true">
        {texts[step.index].slice(0, step.length)}
        <span className="animate-pulse">|</span>
      </span>
    </span>
  );
};

export default TypedText;
