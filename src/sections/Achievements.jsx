import { useState } from "react";
import Modal from "../components/Modal";
import ResponsiveImage from "../components/ResponsiveImage";
import SectionTitle from "./SectionTitle";

const Achievements = ({ certificates }) => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="achievement" className="achievement mt-32 py-10 px-4">
      <SectionTitle>Achievement</SectionTitle>
      <div className="sertifikat-box mt-14 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 max-w-7xl mx-auto">
        {certificates.map((certificate) => (
          <button
            type="button"
            key={certificate.id}
            className="reveal text-left p-3 bg-zinc-800 rounded-md hover:bg-zinc-700 transition duration-300 hover:scale-105"
            onClick={() => setSelected(certificate)}
          >
            <span className="w-full h-48 bg-white rounded-md mb-3 flex items-center justify-center overflow-hidden">
              <ResponsiveImage
                image={certificate.image}
                alt=""
                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </span>
            <span className="block text-sm font-bold leading-tight">{certificate.nama}</span>
          </button>
        ))}
      </div>

      {selected && (
        <Modal
          label={selected.nama}
          onClose={() => setSelected(null)}
          className="max-w-4xl bg-zinc-800 rounded-lg border border-zinc-700"
        >
          <div className="p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 pr-12">
              {selected.nama}
            </h3>
            <ResponsiveImage
              image={selected.image}
              alt={selected.nama}
              sizes="(min-width: 896px) 848px, 100vw"
              className="w-full max-w-full h-auto object-contain rounded-lg bg-zinc-900 p-2"
            />
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Achievements;
