import { useState } from "react";
import Icon from "../components/Icon";
import Modal from "../components/Modal";
import ResponsiveImage from "../components/ResponsiveImage";
import Section from "./Section";

const HighlightCard = ({ certificate, onSelect }) => (
  <li className="reveal">
    <button
      type="button"
      onClick={() => onSelect(certificate)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/70 text-left transition-colors hover:border-zinc-600"
    >
      <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-white p-3">
        <ResponsiveImage
          image={certificate.image}
          alt=""
          sizes="(min-width: 1152px) 360px, (min-width: 640px) 31vw, 100vw"
          className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>
      <span className="flex flex-1 items-start justify-between gap-3 p-5">
        <span className="font-semibold leading-snug">{certificate.nama}</span>
        <Icon name="arrowRight" className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-400 transition-colors group-hover:text-accent" />
      </span>
    </button>
  </li>
);

const CertificateRow = ({ certificate, onSelect }) => (
  <li>
    <button
      type="button"
      onClick={() => onSelect(certificate)}
      className="group flex min-h-12 w-full items-center justify-between gap-4 border-b border-zinc-800 py-3 text-left text-zinc-300 transition-colors hover:text-white"
    >
      <span>{certificate.nama}</span>
      <Icon name="arrowRight" className="h-4 w-4 flex-shrink-0 text-zinc-600 transition-colors group-hover:text-accent" />
    </button>
  </li>
);

const Achievements = ({ certificates }) => {
  const [selected, setSelected] = useState(null);
  const highlights = certificates.filter((c) => c.is_highlight);
  const others = certificates.filter((c) => !c.is_highlight);

  return (
    <Section id="achievement" title="Achievements">
      {highlights.length > 0 && (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((certificate) => (
            <HighlightCard key={certificate.id} certificate={certificate} onSelect={setSelected} />
          ))}
        </ul>
      )}

      {others.length > 0 && (
        <div className={`reveal ${highlights.length > 0 ? "mt-14" : ""}`}>
          {highlights.length > 0 && (
            <h3 className="mb-2 text-lg font-semibold">
              Courses &amp; certificates{" "}
              <span className="font-mono text-sm font-normal text-zinc-400">{others.length}</span>
            </h3>
          )}
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {others.map((certificate) => (
              <CertificateRow key={certificate.id} certificate={certificate} onSelect={setSelected} />
            ))}
          </ul>
        </div>
      )}

      {selected && (
        <Modal
          label={selected.nama}
          onClose={() => setSelected(null)}
          className="max-w-4xl rounded-lg border border-zinc-800 bg-zinc-900"
        >
          <div className="p-5 sm:p-8">
            <h3 className="mb-5 pr-14 text-xl font-bold sm:text-2xl">{selected.nama}</h3>
            <ResponsiveImage
              image={selected.image}
              alt={`Certificate: ${selected.nama}`}
              sizes="(min-width: 896px) 832px, 100vw"
              className="h-auto w-full max-w-full rounded-md bg-white object-contain p-2"
            />
          </div>
        </Modal>
      )}
    </Section>
  );
};

export default Achievements;
