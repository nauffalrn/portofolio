// Shared page column: every section and the navbar sit on the same left edge.
export const CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-6";

const Section = ({ id, title, aside, children }) => (
  <section id={id} aria-labelledby={`${id}-title`} className={`${CONTAINER} py-12 sm:py-16`}>
    <div className="reveal mb-10 sm:mb-12 flex items-baseline justify-between gap-4 border-b border-zinc-800 pb-4">
      <h2 id={`${id}-title`} className="text-3xl sm:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      {aside && <p className="font-mono text-sm text-zinc-400">{aside}</p>}
    </div>
    {children}
  </section>
);

export default Section;
