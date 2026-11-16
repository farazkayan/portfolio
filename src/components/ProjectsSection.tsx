import React, { useCallback, useRef, useState } from 'react';
import { LayoutGroup } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { projects, ProjectData } from '../data/projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectDialog } from './ProjectDialog';
import { SketchDivider, SketchUnderline } from './ui/HandcraftedMarks';

interface ProjectsSectionProps {
  onViewAllProjects?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onViewAllProjects,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const cardButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleOpenProject = useCallback((project: ProjectData) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    const closingId = selectedProject?.id;
    setSelectedProject(null);

    if (closingId) {
      window.requestAnimationFrame(() => {
        cardButtonRefs.current[closingId]?.focus({ preventScroll: true });
      });
    }
  }, [selectedProject?.id]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 sm:scroll-mt-28 py-12 sm:py-16 lg:py-20 px-4 xs:px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full relative overflow-x-clip border-t border-zinc-900/60"
    >
      <LayoutGroup id="featured-projects-showcase">
        <div className="space-y-7 sm:space-y-8">
          {/* ====================================================
              SECTION HEADER
              ==================================================== */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span className="text-zinc-400 font-semibold">04</span>
                <span className="text-zinc-700">/</span>
                <span className="uppercase tracking-widest text-zinc-300 font-medium">
                  Projects
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
                Select a project to inspect
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
              <div>
                <h2
                  id="projects-heading"
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-white font-display"
                >
                  <span className="relative inline-block pb-1">
                    Featured Work
                    <SketchUnderline
                      variant="arc"
                      className="absolute left-0 -bottom-0.5 text-[#E8684A]/80"
                    />
                  </span>
                </h2>
                <p className="text-sm xs:text-base sm:text-[17px] text-zinc-400 font-display mt-1">
                  Software built around real problems—click any card to explore.
                </p>
              </div>
            </div>
          </div>

          {/* ====================================================
              STATE A: IMAGE-FIRST PROJECT GALLERY
              Balanced 3-column desktop grid, 2-col tablet, 1-col mobile
              ==================================================== */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isSelected={selectedProject?.id === project.id}
                onSelect={handleOpenProject}
                buttonRef={(el) => {
                  cardButtonRefs.current[project.id] = el;
                }}
              />
            ))}
          </div>

          {/* ====================================================
              QUIET ARCHIVE LINK
              ==================================================== */}
          <div className="space-y-3.5">
            <SketchDivider markClassName="text-[#E8684A]/55" />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-0.5">
              <span className="text-xs font-mono text-zinc-500">
                Full architecture notes &amp; engineering writeups
              </span>

              <a
                href="/projects"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    if (onViewAllProjects) {
                      onViewAllProjects();
                    } else {
                      window.location.href = '/projects';
                    }
                  }
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-purple-400/50 text-white font-mono text-xs font-medium hover:bg-zinc-800/90 transition-colors cursor-pointer min-h-[44px] touch-manipulation w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141418]"
                aria-label="View All Projects archive"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-purple-400" />
              </a>
            </div>
          </div>
        </div>

        {/* ====================================================
            STATE B: EXPANDABLE PROJECT MODAL
            ==================================================== */}
        <ProjectDialog
          project={selectedProject}
          projects={projects}
          onClose={handleCloseModal}
          onNavigate={handleOpenProject}
        />
      </LayoutGroup>
    </section>
  );
};

export default ProjectsSection;
