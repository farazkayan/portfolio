import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
} from 'lucide-react';
import { ProjectData } from '../data/projectsData';

interface ProjectCardProps {
  project: ProjectData;
  defaultExpanded?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Project-specific accent color, border, and glow shadow mapping
  const getThemeClasses = () => {
    switch (project.themeColor) {
      case 'rose':
        return {
          cardBorder: 'border-rose-500/25 hover:border-rose-500/50',
          cardGlow: 'shadow-[0_16px_50px_rgba(0,0,0,0.55),0_0_32px_rgba(251,113,133,0.07)]',
          badge: 'bg-rose-950/50 border-rose-500/40 text-rose-300',
          textAccent: 'text-rose-400',
          textSoft: 'text-rose-300',
          iconBg: 'bg-zinc-950/90 border-rose-500/30 text-rose-400',
          quoteBorder: 'border-rose-500/70',
          buttonText: 'text-rose-400 hover:text-rose-300',
          dotBg: 'bg-rose-400',
          subtlePill: 'text-rose-300/90 border-rose-500/20 bg-rose-950/20',
        };
      case 'purple':
        return {
          cardBorder: 'border-purple-500/25 hover:border-purple-500/50',
          cardGlow: 'shadow-[0_16px_50px_rgba(0,0,0,0.55),0_0_32px_rgba(192,132,252,0.07)]',
          badge: 'bg-purple-950/50 border-purple-500/40 text-purple-300',
          textAccent: 'text-purple-400',
          textSoft: 'text-purple-300',
          iconBg: 'bg-zinc-950/90 border-purple-500/30 text-purple-400',
          quoteBorder: 'border-purple-500/70',
          buttonText: 'text-purple-400 hover:text-purple-300',
          dotBg: 'bg-purple-400',
          subtlePill: 'text-purple-300/90 border-purple-500/20 bg-purple-950/20',
        };
      case 'blue':
      default:
        return {
          cardBorder: 'border-sky-500/30 hover:border-sky-500/55',
          cardGlow: 'shadow-[0_16px_50px_rgba(0,0,0,0.55),0_0_35px_rgba(56,189,248,0.08)]',
          badge: 'bg-sky-950/60 border-sky-500/50 text-sky-300',
          textAccent: 'text-sky-400',
          textSoft: 'text-sky-300',
          iconBg: 'bg-zinc-950/90 border-sky-500/30 text-sky-400',
          quoteBorder: 'border-sky-500/70',
          buttonText: 'text-sky-400 hover:text-sky-300',
          dotBg: 'bg-sky-400',
          subtlePill: 'text-sky-300/90 border-sky-500/20 bg-sky-950/20',
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <article
      className={`
        rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden bg-[#1c1c22]/95
        ${theme.cardBorder}
        ${theme.cardGlow}
      `}
    >
      {/* ====================================================
          1. HEADER & COLLAPSED PREVIEW
          Clean, intentional, predictable layout
          ==================================================== */}
      <div className="p-5 sm:p-8 lg:p-9">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-7">
          <div className="flex items-center gap-2.5">
            {project.isFeatured ? (
              <span className={`rounded-full border px-3 py-1 text-[10px] font-mono font-medium sm:text-[11px] ${theme.badge}`}>
                Featured
              </span>
            ) : (
              <span className={`rounded-full border px-3 py-1 text-[10px] font-mono font-medium sm:text-[11px] ${theme.subtlePill}`}>
                Project
              </span>
            )}
            <span className="text-[11px] font-mono text-zinc-600">{project.label.replace(/^\d+ — /, '')}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.collaboration && (
              <span className="mr-1 hidden text-xs text-zinc-500 sm:inline">
                with <a href={project.collaboration.collaboratorUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-300 transition hover:text-white">{project.collaboration.collaboratorName}</a>
              </span>
            )}
            {project.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-[11px] font-medium transition-colors ${link.type === 'live' ? 'border-white/15 bg-white text-zinc-950 hover:bg-zinc-200' : 'border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-zinc-600 hover:text-white'}`}
              >
                {link.type === 'github' ? <Github className="h-3.5 w-3.5" /> : <ExternalLink className="h-3.5 w-3.5" />}
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid items-center gap-4 sm:gap-8 md:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1fr)_210px]">
          <div>
            <div className="flex items-center gap-3 mb-2 md:hidden">
              {project.logoUrl && (
                <div className={`w-11 h-11 rounded-xl border p-1.5 shrink-0 bg-zinc-950/80 ${theme.iconBg}`}>
                  <img
                    src={project.logoUrl}
                    alt={`${project.title} logo`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              )}
              <h3 className="font-display text-2xl xs:text-3xl font-medium tracking-tight text-white">
                {project.title}
              </h3>
            </div>
            <h3 className="hidden md:block font-display text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
              {project.title}
            </h3>
            <p className="mt-2 sm:mt-3 max-w-2xl text-sm leading-6 sm:leading-7 text-zinc-400 sm:text-[15px]">
              {project.shortDescription}
            </p>
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
              {project.techStack.slice(0, 5).map((tech) => (
                <span key={tech} className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[10px] text-zinc-400 sm:text-[11px]">{tech}</span>
              ))}
              {project.techStack.length > 5 && <span className="px-1 py-1 text-[10px] text-zinc-600 sm:text-[11px]">+{project.techStack.length - 5}</span>}
            </div>
          </div>

          {project.logoUrl && (
            <div className={`hidden aspect-square overflow-hidden rounded-2xl border bg-zinc-950/80 shadow-inner md:block ${theme.iconBg}`}>
              <img
                src={project.logoUrl}
                alt={`${project.title} logo`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-zinc-800/70 pt-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`group flex items-center gap-2 text-xs font-mono font-medium transition-colors cursor-pointer outline-none min-h-[44px] py-1 touch-manipulation ${theme.buttonText}`}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Hide project details' : 'More about this project'}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            ) : (
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            )}
          </button>

          <span className="hidden text-[11px] text-zinc-600 sm:inline">Story, approach &amp; details</span>
        </div>
      </div>

      {/* ====================================================
          2. EXPANDED STATE: STRUCTURED REUSABLE CARD GRID
          Predictable 1-column on mobile, 2-column on desktop
          ==================================================== */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="border-t border-zinc-800/80 bg-[#09090b]/80 overflow-hidden"
          >
            <div className="p-4 sm:p-8 lg:p-10 space-y-4 sm:space-y-6">
              {/* Row 1: Story Card & Overview Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Story Card */}
                <div className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#1c1c22] border border-zinc-800/90 flex flex-col justify-between space-y-3 sm:space-y-4 shadow-sm">
                  <div className="space-y-2.5 sm:space-y-3">
                    <span className={`text-xs font-mono uppercase tracking-widest font-semibold block ${theme.textAccent}`}>
                      The Story
                    </span>
                    {project.storyQuote && (
                      <p className="text-sm xs:text-base sm:text-lg text-white font-display italic leading-snug">
                        &ldquo;{project.storyQuote}&rdquo;
                      </p>
                    )}
                    <p className="text-xs sm:text-[13.5px] text-zinc-400 leading-relaxed font-normal">
                      {project.story}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-900 text-[10.5px] sm:text-[11px] font-mono text-zinc-600">
                    personal motivation · practical problem
                  </div>
                </div>

                {/* Overview Card */}
                <div className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#1c1c22] border border-zinc-800/90 flex flex-col justify-between space-y-3 sm:space-y-4 shadow-sm">
                  <div className="space-y-2.5 sm:space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold block">
                      Overview
                    </span>
                    <p className="text-xs xs:text-sm sm:text-[14.5px] text-zinc-200 font-display leading-relaxed">
                      {project.overview}
                    </p>
                    {project.theHardPart && (
                      <div className="pt-2 border-t border-zinc-900 space-y-1 sm:space-y-1.5">
                        <span className={`text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider block ${theme.textSoft}`}>
                          The Hard Part:
                        </span>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {project.theHardPart}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="pt-2 border-t border-zinc-900 text-[10.5px] sm:text-[11px] font-mono text-zinc-600">
                    core concept · product vision
                  </div>
                </div>
              </div>

              {/* Row 2: Role & Collaboration (if present) OR Capabilities (if present) */}
              {project.role && project.collaboration && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* My Role Card */}
                  <div className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#1c1c22] border border-zinc-800/90 space-y-3 sm:space-y-4 shadow-sm">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold block">
                      My Role
                    </span>
                    <div className="space-y-1.5 sm:space-y-2">
                      <span className={`text-xs sm:text-sm font-mono font-semibold block ${theme.textSoft}`}>
                        {project.role.title}
                      </span>
                      <p className="text-xs sm:text-[13.5px] text-zinc-300 leading-relaxed">
                        {project.role.description}
                      </p>
                    </div>

                    {project.role.areas && (
                      <div className="pt-2 border-t border-zinc-900">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                          Handled Areas
                        </span>
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 text-xs font-mono text-zinc-400">
                          {project.role.areas.map((area) => (
                            <div key={area} className="flex items-center gap-1.5">
                              <span className={`w-1 h-1 rounded-full shrink-0 ${theme.dotBg}`} />
                              <span className="truncate">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Collaboration Card */}
                  <div className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#1c1c22] border border-zinc-800/90 space-y-3 sm:space-y-4 shadow-sm">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold block">
                      Built With
                    </span>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-1">
                        <span className="text-xs font-mono text-zinc-200 font-semibold block">
                          Faraz
                        </span>
                        <span className={`text-xs font-mono block ${theme.textSoft}`}>
                          {project.collaboration.myRole}
                        </span>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-1">
                        <div className="flex items-center justify-between">
                          <a
                            href={project.collaboration.collaboratorUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono font-semibold underline underline-offset-4 text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            {project.collaboration.collaboratorName}
                          </a>
                          <span className="text-[10px] font-mono text-zinc-500">
                            github.com/mahinite ↗
                          </span>
                        </div>
                        <span className="text-xs font-mono text-zinc-300 block">
                          {project.collaboration.collaboratorRole}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Row 2 (Alternative): What I Built (Capabilities Card) */}
              {project.capabilities && (
                <div className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#1c1c22] border border-zinc-800/90 space-y-3 sm:space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5 sm:pb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                      What I Built (Capabilities)
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-zinc-600">
                      {project.capabilities.length} Core Systems
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-1">
                    {project.capabilities.map((cap, idx) => (
                      <div key={cap.title} className="space-y-1">
                        <span className="text-xs font-mono text-zinc-200 font-semibold block">
                          {idx + 1}. {cap.title}
                        </span>
                        <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                          {cap.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Row 3: Technical Details Card (Wide Card with Diagram or Subsections) */}
              {project.technicalDetails && (
                <div className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#1c1c22] border border-zinc-800/90 space-y-4 sm:space-y-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5 sm:pb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                      Technical Details
                    </span>
                    {project.technicalDetails.headline && (
                      <span className={`text-[11px] sm:text-xs font-mono ${theme.textSoft} truncate max-w-[180px] sm:max-w-none`}>
                        {project.technicalDetails.headline}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-[13.5px] text-zinc-300 leading-relaxed font-normal">
                    {project.technicalDetails.explanation}
                  </p>

                  {/* Architecture Diagram if SoundMesh */}
                  {project.technicalDetails.diagramType === 'soundmesh' && (
                    <div className="p-3.5 sm:p-5 rounded-xl bg-zinc-950/90 border border-zinc-800 space-y-3">
                      <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500 uppercase block">
                        Architecture Flow
                      </span>
                      <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-xs">
                        <div className="p-2.5 sm:p-3 rounded-lg bg-zinc-900 border border-sky-500/40 text-sky-300 w-full md:w-auto text-left">
                          <div className="font-semibold">Phone A (Host Coordinator)</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">Audio capture &amp; clock master</div>
                        </div>

                        <div className="text-center text-zinc-500 text-[11px] py-0.5 sm:py-1">
                          <div className="h-[1px] w-16 bg-gradient-to-r from-sky-500/50 to-emerald-500/50 hidden md:block my-1" />
                          <span className="text-[10px] sm:text-xs text-zinc-400">▼ Local TCP Network</span>
                        </div>

                        <div className="p-2.5 sm:p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 w-full md:w-auto text-left md:text-right">
                          <div className="font-semibold">Phone B &amp; Phone C (Receivers)</div>
                          <div className="text-[10px] text-emerald-400/90 mt-0.5">Synchronized buffer playback</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Technical Subsections if Avero / Nexus */}
                  {project.technicalDetails.subsections && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-1 sm:pt-2">
                      {project.technicalDetails.subsections.map((sub) => (
                        <div key={sub.title} className="space-y-1 text-xs">
                          <span className="font-mono text-zinc-200 font-semibold block">
                            {sub.title}
                          </span>
                          <p className="text-zinc-400 leading-relaxed">{sub.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technical Areas List */}
                  {project.technicalDetails.areas && (
                    <div className="pt-2 border-t border-zinc-900">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                        Systems &amp; Protocol Breakdown
                      </span>
                      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-2 text-xs font-mono text-zinc-400">
                        {project.technicalDetails.areas.map((techArea) => (
                          <div key={techArea} className="flex items-center gap-1.5">
                            <span className={`w-1 h-1 rounded-full shrink-0 ${theme.dotBg}`} />
                            <span className="truncate">{techArea}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Row 4: What I Learned Card & Tech Stack Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* What I Learned Card */}
                {project.whatILearned && (
                  <div className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#1c1c22] border border-zinc-800/90 flex flex-col justify-between space-y-3 sm:space-y-4 shadow-sm">
                    <div className="space-y-2 sm:space-y-2.5">
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold block">
                        What I Learned
                      </span>
                      <p className="text-xs sm:text-[13.5px] text-zinc-300 leading-relaxed font-normal">
                        {project.whatILearned}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-zinc-900 text-[10.5px] sm:text-[11px] font-mono text-zinc-600">
                      engineering growth · real-world constraints
                    </div>
                  </div>
                )}

                {/* Tech Stack & Actions Card */}
                <div className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#1c1c22] border border-zinc-800/90 flex flex-col justify-between space-y-4 sm:space-y-5 shadow-sm">
                  <div className="space-y-2.5 sm:space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold block">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 sm:pt-4 border-t border-zinc-900 flex items-center justify-between gap-3">
                    {project.links && project.links.length > 0 ? (
                      <a
                        href={project.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-mono text-white transition-colors hover:${theme.textSoft} py-1 touch-manipulation`}
                      >
                        <span>{project.links[0].label}</span>
                        {project.links[0].type === 'github' ? (
                          <Github className="w-3.5 h-3.5" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5" />
                        )}
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-zinc-600">
                        Local-first software
                      </span>
                    )}

                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer py-1 px-2 rounded touch-manipulation"
                    >
                      Collapse ↑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default ProjectCard;
