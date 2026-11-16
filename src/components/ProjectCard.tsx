import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectData } from '../data/projectsData';
import { ProjectCoverArtwork } from './ProjectCoverArtwork';
import { SketchUnderline } from './ui/HandcraftedMarks';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  isSelected: boolean;
  onSelect: (project: ProjectData) => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isSelected,
  onSelect,
  buttonRef,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const displayIndex = String(index + 1).padStart(2, '0');

  const hoverAccentBorder =
    project.themeColor === 'rose'
      ? 'hover:border-[#E8684A]/45 focus-visible:border-[#E8684A]/70'
      : 'hover:border-purple-400/45 focus-visible:border-purple-400/70';

  const underlineAccent =
    project.themeColor === 'rose' ? 'text-[#E8684A]' : 'text-purple-400';

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      layoutId={prefersReducedMotion ? undefined : `project-card-${project.id}`}
      onClick={() => onSelect(project)}
      aria-haspopup="dialog"
      aria-expanded={isSelected}
      aria-label={`Open ${project.title} project details`}
      transition={{
        type: 'spring',
        stiffness: 340,
        damping: 32,
        mass: 0.9,
      }}
      className={`group/card group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#18181f]/95 text-left transition-colors duration-200 cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#141418] ${hoverAccentBorder} ${
        isSelected && !prefersReducedMotion ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Strong Project Visual Cover */}
      <motion.div
        layoutId={prefersReducedMotion ? undefined : `project-cover-${project.id}`}
        transition={{
          type: 'spring',
          stiffness: 340,
          damping: 32,
          mass: 0.9,
        }}
        className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.06]"
      >
        <ProjectCoverArtwork project={project} context="card" />
      </motion.div>

      {/* 2, 3, 4. Project Name + Subtle Category + Open Affordance */}
      <div className="flex items-end justify-between gap-4 p-4 sm:p-5">
        <div className="min-w-0 space-y-1">
          <p className="font-mono text-[11px] text-zinc-400 truncate">
            <span className="text-zinc-500">{displayIndex}</span>
            <span aria-hidden="true" className="mx-1.5 text-zinc-700">
              ·
            </span>
            <span>{project.category}</span>
          </p>

          <motion.h3
            layoutId={prefersReducedMotion ? undefined : `project-title-${project.id}`}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 32,
              mass: 0.9,
            }}
            className="font-display text-xl sm:text-2xl font-medium tracking-tight text-[#FAF5E8] transition-colors group-hover/card:text-white"
          >
            <span className="relative inline-block pb-0.5">
              {project.title}
              <SketchUnderline
                variant="arc"
                hoverOnly
                className={`absolute left-0 -bottom-0.5 ${underlineAccent}`}
              />
            </span>
          </motion.h3>
        </div>

        {/* Small visual indication that card opens */}
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-[#141418]/90 text-zinc-400 transition-all duration-200 group-hover/card:border-white/[0.2] group-hover/card:text-[#FAF5E8] group-focus-visible/card:border-purple-400/60 group-focus-visible/card:text-white"
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none" />
        </span>
      </div>
    </motion.button>
  );
};

export default ProjectCard;
