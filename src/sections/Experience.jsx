import { useState } from "react";
import Icon from "../components/Icon";
import Modal from "../components/Modal";
import ResponsiveImage from "../components/ResponsiveImage";
import Section from "./Section";

const VISIBLE_BULLETS = 3;

const isCurrent = (exp) => /present/i.test(exp.duration || "");

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// Start month of a duration like "Jul 2025 - Sep 2025 · 2 mos" or "Aug 26 - Present",
// as a sortable number (year * 12 + month). Unparseable durations sort last.
function startValue(duration = "") {
  const match = duration.match(/([a-z]{3})[a-z]*\.?\s+(\d{2,4})/i);
  if (!match) return -Infinity;
  const month = MONTHS.indexOf(match[1].toLowerCase());
  if (month === -1) return -Infinity;
  const year = match[2].length === 2 ? 2000 + Number(match[2]) : Number(match[2]);
  return year * 12 + month;
}

// Newest first: current roles on top, then by start date. Ties keep the admin order.
const newestFirst = (experiences) =>
  [...experiences].sort(
    (a, b) => isCurrent(b) - isCurrent(a) || startValue(b.duration) - startValue(a.duration)
  );

const PhotoStrip = ({ exp, onSelect }) => (
  <ul aria-label={`Photos from ${exp.company}`} className="mt-6 grid max-w-md grid-cols-3 gap-2">
    {exp.photos.map((photo, index) => (
      <li key={photo.image?.src ?? index}>
        <button
          type="button"
          aria-label={photo.caption || `Open photo ${index + 1} from ${exp.company}`}
          className="group relative block aspect-square w-full overflow-hidden rounded-md bg-zinc-800"
          onClick={() => onSelect(photo)}
        >
          <ResponsiveImage
            image={photo.image}
            alt=""
            sizes="(min-width: 640px) 144px, 30vw"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Icon name="zoomIn" className="h-5 w-5" />
          </span>
        </button>
      </li>
    ))}
  </ul>
);

const ExperienceItem = ({ exp, onSelectPhoto }) => {
  const [expanded, setExpanded] = useState(false);
  const bullets = exp.description || [];
  const hiddenCount = bullets.length - VISIBLE_BULLETS;
  const shown = expanded ? bullets : bullets.slice(0, VISIBLE_BULLETS);
  const current = isCurrent(exp);

  return (
    <li className="reveal grid grid-cols-1 gap-4 border-t border-zinc-800 pt-8 first:border-t-0 first:pt-0 lg:grid-cols-[15rem_1fr] lg:gap-10">
      <div className="font-mono text-sm text-zinc-400 lg:pt-1">
        <p className="text-zinc-200">{exp.duration}</p>
        <p className="mt-1 text-zinc-400">{exp.location}</p>
        {current && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Current role
          </p>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
            <ResponsiveImage
              image={exp.logo}
              alt={exp.company}
              sizes="48px"
              className="block h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-semibold sm:text-2xl">{exp.position}</h3>
            <p className="mt-0.5 text-zinc-300">
              {exp.company}
              {exp.type && <span className="text-zinc-400"> · {exp.type}</span>}
            </p>
          </div>
        </div>

        {bullets.length > 0 && (
          <ul className="mt-5 max-w-[70ch] list-disc space-y-2 pl-5 text-zinc-300 marker:text-zinc-600">
            {shown.map((desc) => (
              <li key={desc} className="leading-relaxed">
                {desc}
              </li>
            ))}
          </ul>
        )}
        {hiddenCount > 0 && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((open) => !open)}
            className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent hover:text-white"
          >
            {expanded ? "Show less" : `Show ${hiddenCount} more`}
            <Icon
              name="chevronDown"
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}

        {exp.skills?.length > 0 && (
          <ul aria-label="Tools used" className="mt-5 flex flex-wrap gap-1.5">
            {exp.skills.map((skill) => (
              <li
                key={skill}
                className="rounded border border-zinc-800 px-2 py-1 font-mono text-xs text-zinc-400"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}

        {exp.photos?.length > 0 && <PhotoStrip exp={exp} onSelect={onSelectPhoto} />}
      </div>
    </li>
  );
};

const Experience = ({ experiences }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-10">
        {newestFirst(experiences).map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} onSelectPhoto={setSelectedPhoto} />
        ))}
      </ol>

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
            <p className="mt-4 rounded-lg bg-zinc-900/80 px-6 py-3 text-center text-base font-medium text-white sm:text-lg">
              {selectedPhoto.caption}
            </p>
          )}
        </Modal>
      )}
    </Section>
  );
};

export default Experience;
