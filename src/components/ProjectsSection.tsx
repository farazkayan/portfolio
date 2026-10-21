import React from 'react';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projectsData';
import { ProjectCard } from './ProjectCard';

interface ProjectsSectionProps {
  onViewAllProjects?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onViewAllProjects,
}) => {
  const soundmesh = projects.find((p) => p.id === 'soundmesh')!;
  const avero = projects.find((p) => p.id === 'avero')!;

  return (
    <section
      id="projects"
      className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-24 lg:py-28 px-4 xs:px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full relative overflow-hidden"
    >
      {/* Subtle Destination Atmosphere: Showcase Focus */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.03)_0%,transparent_65%)]"
      />
      <div className="space-y-10 sm:space-y-12">
        {/* ====================================================
            SECTION HEADER
            ==================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="text-zinc-400 font-semibold">04</span>
              <span className="text-zinc-700">/</span>
              <span className="uppercase tracking-widest text-zinc-300 font-medium">
                Projects
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
              I see something missing → I build it.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white font-display">
                Featured Work
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-zinc-400 font-display mt-0.5 sm:mt-1">
                Real software built to solve real problems.
              </p>
            </div>
            <p className="text-xs font-mono text-zinc-500 sm:text-right">
              2 Featured Builds · Expand for breakdown
            </p>
          </div>
        </div>

        {/* ====================================================
            FEATURED PROJECTS (SoundMesh & Avero)
            Stacked with full visual hierarchy
            ==================================================== */}
        <div className="space-y-6 sm:space-y-10">
          <ProjectCard project={soundmesh} defaultExpanded={false} />
          <ProjectCard project={avero} defaultExpanded={false} />
        </div>

        {/* ====================================================
            VIEW ALL PROJECTS BUTTON
            Mobile-first action card
            ==================================================== */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-zinc-900">
          <div className="space-y-0.5">
            <span className="text-xs font-mono text-zinc-300 block font-medium">
              Looking for more builds?
            </span>
            <span className="text-[11px] font-mono text-zinc-500 block">
              Explore SoundMesh, Avero, and Nexus in the dedicated project archive.
            </span>
          </div>

          <button
            onClick={() => {
              if (onViewAllProjects) {
                onViewAllProjects();
              } else {
                window.location.href = '/projects';
              }
            }}
            className="group inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 text-white font-mono text-xs font-medium hover:bg-zinc-800 transition-all cursor-pointer shadow-sm min-h-[44px] touch-manipulation w-full sm:w-auto"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-purple-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
