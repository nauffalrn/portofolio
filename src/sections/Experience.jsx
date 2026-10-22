import { useState } from "react";
import Icon from "../components/Icon";
import Modal from "../components/Modal";
import ResponsiveImage from "../components/ResponsiveImage";
import SectionTitle from "./SectionTitle";

const PhotoGrid = ({ photos, onSelect }) => (
  <div className="mt-6">
    <h4 className="text-lg font-semibold mb-3 text-blue-200 flex items-center gap-2">
      <Icon name="image" />
      Documentation
    </h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {photos.map((photo, index) => (
        <button
          type="button"
          key={photo.image?.src ?? index}
          className="relative group overflow-hidden rounded-lg bg-zinc-700 aspect-square"
          onClick={() => onSelect(photo)}
        >
          {/* The visible caption already names the button; alt only when there is none. */}
          <ResponsiveImage
            image={photo.image}
            alt={photo.caption ? "" : `Experience photo ${index + 1}`}
            sizes="(min-width: 768px) 160px, 45vw"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <span className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
            <Icon name="zoomIn" className="w-6 h-6" />
          </span>
          {photo.caption && (
            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2 text-white text-xs text-center font-medium">
              {photo.caption}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

const ExperienceCard = ({ exp, onSelectPhoto }) => (
  <article className="reveal bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition-colors duration-300 h-full">
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
        <ResponsiveImage
          image={exp.logo}
          alt={exp.company}
          sizes="64px"
          className="w-full h-full object-contain block"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-xl sm:text-2xl font-bold mb-1">{exp.position}</h3>
        <p className="text-base sm:text-lg text-blue-200 mb-1">
          {exp.company} · {exp.type}
        </p>
        <p className="text-sm text-zinc-400 mb-1">{exp.duration}</p>
        <p className="text-sm text-zinc-400 mb-4">{exp.location}</p>

        <ul className="list-disc list-inside space-y-2 mb-4 text-zinc-300 text-sm sm:text-base">
          {(exp.description || []).map((desc) => (
            <li key={desc} className="leading-relaxed">
              {desc}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {(exp.skills || []).map((skill) => (
            <span
              key={skill}
              className="py-1 px-3 bg-blue-900/40 text-blue-200 rounded-md text-xs sm:text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {exp.photos?.length > 0 && (
          <PhotoGrid photos={exp.photos} onSelect={onSelectPhoto} />
        )}
      </div>
    </div>
  </article>
);

const Experience = ({ experiences }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="experience" className="experience mt-32 py-10 px-4">
      <SectionTitle>Experience</SectionTitle>
      <div className="experience-box mt-14 grid md:grid-cols-2 grid-cols-1 gap-6 max-w-7xl mx-auto">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} onSelectPhoto={setSelectedPhoto} />
        ))}
      </div>

      {selectedPhoto && (
        <Modal
          label={selectedPhoto.caption || "Experience photo"}
          onClose={() => setSelectedPhoto(null)}
          className="max-w-7xl flex flex-col items-center"
        >
          <ResponsiveImage
            image={selectedPhoto.image}
            alt={selectedPhoto.caption || "Experience photo"}
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
          />
          {selectedPhoto.caption && (
            <p className="mt-4 bg-zinc-900/80 px-6 py-3 rounded-lg text-white text-center text-base sm:text-lg font-medium">
              {selectedPhoto.caption}
            </p>
          )}
        </Modal>
      )}
    </section>
  );
};

export default Experience;
