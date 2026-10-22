import { useState } from "react";
import Icon from "../components/Icon";
import Modal from "../components/Modal";
import ResponsiveImage from "../components/ResponsiveImage";
import SectionTitle from "./SectionTitle";

const INITIAL_VISIBLE = 6;

const ProjectCard = ({ project, onSelect }) => (
  <button
    type="button"
    className="reveal text-left bg-zinc-800 rounded-md hover:bg-zinc-700 transition duration-300 overflow-hidden hover:scale-105"
    onClick={() => onSelect(project)}
  >
    <span className="block w-full overflow-hidden group relative">
      <ResponsiveImage
        image={project.image}
        alt={`${project.nama} project screenshot`}
        sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="bg-white/20 rounded-full p-3 text-white">
          <Icon name="zoomIn" className="w-6 h-6" />
        </span>
      </span>
    </span>
    <span className="block p-4">
      <span className="block text-xl sm:text-2xl font-bold my-4">{project.nama}</span>
      <span className="flex flex-wrap gap-2">
        {(project.tools || []).map((tool) => (
          <span
            key={tool}
            className="py-1 px-3 border border-zinc-500 bg-zinc-600 rounded-md font-semibold text-sm"
          >
            {tool}
          </span>
        ))}
      </span>
    </span>
  </button>
);

const Projects = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);

  return (
    <section id="project" className="proyek mt-32 py-10 px-4">
      <SectionTitle>Project</SectionTitle>
      <div className="proyek-box mt-14 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 max-w-7xl mx-auto">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
        ))}
      </div>

      {projects.length > INITIAL_VISIBLE && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
          >
            {showAll ? "Show Less" : "More Projects"}
          </button>
        </div>
      )}

      {selectedProject && (
        <Modal
          label={selectedProject.nama}
          onClose={() => setSelectedProject(null)}
          className="max-w-6xl bg-zinc-800 rounded-lg border border-zinc-700"
        >
          <div className="p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 pr-16">
              {selectedProject.nama}
            </h3>
            <ResponsiveImage
              image={selectedProject.image}
              alt={selectedProject.nama}
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="w-full h-auto object-contain rounded-lg max-h-[60vh] mb-4"
            />
            <div className="text-zinc-200">
              <p className="mb-4 leading-relaxed">{selectedProject.desk}</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-semibold text-zinc-300 mr-2">Tech Stack:</span>
                {(selectedProject.tools || []).map((tool) => (
                  <span
                    key={tool}
                    className="py-1 px-3 bg-blue-900/40 text-blue-200 rounded-md font-semibold text-sm border border-blue-700/40"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Projects;
