import { useState } from "react";
import Icon from "../components/Icon";
import Modal from "../components/Modal";
import ResponsiveImage from "../components/ResponsiveImage";
import Section from "./Section";

const INITIAL_VISIBLE = 6;
const VISIBLE_TOOLS = 4;

// Optional: only projects that are actually hosted have a live_url.
const LiveLink = ({ project, className = "" }) =>
  project.live_url ? (
    <a
      href={project.live_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.nama}: live site`}
      className={`relative z-10 inline-flex min-h-11 items-center gap-1 font-mono text-sm text-zinc-300 hover:text-accent ${className}`}
    >
      Live
      <Icon name="arrowUpRight" className="h-4 w-4" />
    </a>
  ) : null;

// The title button is stretched over the whole card (after:inset-0), so the
// card opens the details while the Live link above it stays clickable.
const ProjectCard = ({ project, onSelect }) => {
  const tools = project.tools || [];
  const extraTools = tools.length - VISIBLE_TOOLS;

  return (
    <li className="reveal group relative flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/70 transition-colors hover:border-zinc-600 has-[button:focus-visible]:border-accent">
      <div className="aspect-[16/10] overflow-hidden bg-zinc-800">
        <ResponsiveImage
          image={project.image}
          alt=""
          sizes="(min-width: 1152px) 360px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="text-left after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.nama}
          </button>
        </h3>
        {project.desk && (
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-zinc-400">{project.desk}</p>
        )}

        {tools.length > 0 && (
          <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-1.5">
            {tools.slice(0, VISIBLE_TOOLS).map((tool) => (
              <li
                key={tool}
                className="rounded border border-zinc-800 px-2 py-1 font-mono text-xs text-zinc-400"
              >
                {tool}
              </li>
            ))}
            {extraTools > 0 && (
              <li className="px-1 py-1 font-mono text-xs text-zinc-400">+{extraTools}</li>
            )}
          </ul>
        )}

        <div className="mt-auto flex min-h-11 items-center justify-between gap-4 pt-4">
          <LiveLink project={project} />
          <span
            aria-hidden="true"
            className="ml-auto inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors group-hover:text-accent"
          >
            Details
            <Icon name="arrowRight" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </li>
  );
};

const Projects = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);
  const hiddenCount = projects.length - INITIAL_VISIBLE;

  return (
    <Section id="project" title="Projects" aside={`${projects.length} total`}>
      <ul id="project-list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
        ))}
      </ul>

      {hiddenCount > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls="project-list"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-5 font-semibold text-zinc-100 ring-1 ring-zinc-700 transition-colors hover:bg-zinc-800"
          >
            {showAll ? "Show fewer projects" : `Show ${hiddenCount} more projects`}
            <Icon name="chevronDown" className={`h-5 w-5 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}

      {selectedProject && (
        <Modal
          label={selectedProject.nama}
          onClose={() => setSelectedProject(null)}
          className="max-w-5xl rounded-lg border border-zinc-800 bg-zinc-900"
        >
          <div className="p-5 sm:p-8">
            <h3 className="mb-5 pr-14 text-2xl font-bold">{selectedProject.nama}</h3>
            <ResponsiveImage
              image={selectedProject.image}
              alt={`${selectedProject.nama} screenshot`}
              sizes="(min-width: 1024px) 960px, 100vw"
              className="mb-6 h-auto max-h-[60vh] w-full rounded-md object-contain"
            />
            {selectedProject.desk && (
              <p className="mb-6 max-w-[70ch] leading-relaxed text-zinc-300">{selectedProject.desk}</p>
            )}
            {(selectedProject.tools || []).length > 0 && (
              <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5">
                {selectedProject.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-300"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            )}
            <LiveLink project={selectedProject} className="mt-4" />
          </div>
        </Modal>
      )}
    </Section>
  );
};

export default Projects;
