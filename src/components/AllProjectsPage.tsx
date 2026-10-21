import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Cpu,
  BookOpen,
} from 'lucide-react';
import { projects, ProjectData } from '../data/projectsData';

interface AllProjectsPageProps {
  onBack: () => void;
}

export const AllProjectsPage: React.FC<AllProjectsPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#141418] text-zinc-100 flex flex-col font-sans selection:bg-purple-900/40 selection:text-purple-200 antialiased">
      {/* ====================================================
          STICKY TOP NAVIGATION BAR (Destination Header)
          ==================================================== */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#141418]/90 border-b border-zinc-800/80 px-5 sm:px-8 lg:px-12 py-3.5 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer min-h-[44px] py-1 touch-manipulation"
            aria-label="Back to Portfolio"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-purple-400" />
            <span className="font-medium">Return to Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest hidden xs:inline">
              Project Destination · {projects.length} Builds
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </header>

      {/* ====================================================
          MAIN EDITORIAL PROJECT DESTINATION CANVAS
          ==================================================== */}
      <main className="flex-1 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-20 lg:py-24 space-y-12 sm:space-y-16 w-full">
        {/* Destination Header with Faraz's Authentic Voice */}
        <div className="space-y-4 border-b border-zinc-800/80 pb-8 sm:pb-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <span>04</span>
            <span className="text-zinc-700">/</span>
            <span className="uppercase tracking-widest font-semibold">
              Project Archive
            </span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white font-display">
            Things I’ve built.
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 font-display leading-relaxed">
            Software built because something was missing, annoying, or worth
            making from scratch.
          </p>

          <p className="text-xs sm:text-[13.5px] font-mono text-zinc-500 leading-relaxed pt-1">
            Zero tutorial copies. Real everyday problems, local-first experiments,
            and software I actually use.
          </p>
        </div>

        {/* ====================================================
            VERTICAL STACK OF SUBSTANTIAL PROJECT DESTINATION CARDS
            Elevated, lighter charcoal surfaces (#131317 / #16161b)
            ==================================================== */}
        <div className="space-y-7 sm:space-y-9">
          {projects.map((project, index) => (
            <ProjectDestinationCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </main>

      {/* ====================================================
          FOOTER RETURN ACTION
          ==================================================== */}
      <footer className="border-t border-zinc-800/80 py-10 sm:py-14 px-5 sm:px-8 lg:px-12 bg-[#09090b]">
        <div className="max-w-6xl mx-auto flex flex-col xs:flex-row items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer min-h-[44px] py-1 touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-purple-400" />
            <span>Return to Main Portfolio</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>Faraz Kayan Haque</span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-400">Project Archive</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ------------------------------------------------------------
// Dedicated Substantial Project Destination Card
// ------------------------------------------------------------
interface ProjectDestinationCardProps {
  project: ProjectData;
  index: number;
}

const ProjectDestinationCard: React.FC<ProjectDestinationCardProps> = ({
  project,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const projectNumber = String(index + 1).padStart(2, '0');

  // Distinct project color tokens
  const getThemeTokens = () => {
    switch (project.themeColor) {
      case 'rose':
        return {
          border: 'border-rose-500/30 hover:border-rose-500/55',
          glow: 'shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(251,113,133,0.08)]',
          badge: 'bg-rose-950/60 border-rose-500/40 text-rose-300',
          accentText: 'text-rose-400',
          softText: 'text-rose-300',
          logoBg: 'bg-rose-950/20 border-rose-500/30',
          quoteBorder: 'border-rose-500/80',
          actionBtn:
            'bg-rose-500 text-zinc-950 hover:bg-rose-400 shadow-[0_0_20px_rgba(251,113,133,0.3)]',
          subtleBtn:
            'bg-zinc-900 border-zinc-700 text-rose-300 hover:border-rose-500/50 hover:text-white',
          dot: 'bg-rose-400',
          innerSurface: 'bg-[#181820]',
        };
      case 'purple':
        return {
          border: 'border-purple-500/30 hover:border-purple-500/55',
          glow: 'shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(192,132,252,0.08)]',
          badge: 'bg-purple-950/60 border-purple-500/40 text-purple-300',
          accentText: 'text-purple-400',
          softText: 'text-purple-300',
          logoBg: 'bg-purple-950/20 border-purple-500/30',
          quoteBorder: 'border-purple-500/80',
          actionBtn:
            'bg-purple-500 text-zinc-950 hover:bg-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.3)]',
          subtleBtn:
            'bg-zinc-900 border-zinc-700 text-purple-300 hover:border-purple-500/50 hover:text-white',
          dot: 'bg-purple-400',
          innerSurface: 'bg-[#181820]',
        };
      case 'blue':
      default:
        return {
          border: 'border-sky-500/35 hover:border-sky-500/60',
          glow: 'shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(56,189,248,0.09)]',
          badge: 'bg-sky-950/60 border-sky-500/40 text-sky-300',
          accentText: 'text-sky-400',
          softText: 'text-sky-300',
          logoBg: 'bg-sky-950/20 border-sky-500/30',
          quoteBorder: 'border-sky-500/80',
          actionBtn:
            'bg-sky-400 text-zinc-950 hover:bg-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.35)]',
          subtleBtn:
            'bg-zinc-900 border-zinc-700 text-sky-300 hover:border-sky-500/50 hover:text-white',
          dot: 'bg-sky-400',
          innerSurface: 'bg-[#181820]',
        };
    }
  };

  const theme = getThemeTokens();

  return (
    <article
      className={`
        rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden
        bg-[#0c0c0e] ${theme.border} ${theme.glow}
      `}
    >
      {/* ====================================================
          MAIN SUBSTANTIAL PROJECT SURFACE
          Elevated charcoal container with generous editorial layout
          ==================================================== */}
      <div className="p-5 sm:p-8 lg:p-9 space-y-6 sm:space-y-8">
        {/* Top Header Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4 sm:pb-5">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-zinc-500">
              {projectNumber}
            </span>
            <span className="text-zinc-700">/</span>
            {project.isFeatured ? (
              <span
                className={`px-3 py-1 rounded-full border text-[11px] sm:text-xs font-mono font-medium shadow-sm ${theme.badge}`}
              >
                ★ Featured Project
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full border border-zinc-700/80 bg-zinc-900/90 text-[11px] sm:text-xs font-mono text-zinc-300 font-medium">
                {project.label || 'Project'}
              </span>
            )}
          </div>

          {/* Collaborator Link if present (e.g. Mahin in Purple) */}
          {project.collaboration && (
            <div className="text-xs font-mono text-zinc-400">
              Built with{' '}
              <a
                href={project.collaboration.collaboratorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-4 transition-colors text-purple-400 hover:text-purple-300"
              >
                {project.collaboration.collaboratorName}
              </a>
            </div>
          )}
        </div>

        {/* Core Project Presentation: Two Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Column 1: Prominent Logo + Quick Snapshot (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-3">
            {/* Project Logo Visual Box */}
            <div
              className={`w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border bg-[#181820] shadow-lg flex items-center justify-center shrink-0 ${theme.logoBg}`}
            >
              <img
                src={project.logoUrl}
                alt={`${project.title} logo`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Quick Metadata Box */}
            <div className="w-full p-3.5 sm:p-4 rounded-xl bg-[#181820] border border-zinc-800/80 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-[11px] text-zinc-500 uppercase">Type</span>
                <span className="text-zinc-200 font-medium truncate max-w-[150px]">
                  {project.id === 'soundmesh'
                    ? 'Mobile / Networking'
                    : project.id === 'avero'
                    ? 'Web / Cloud & Maps'
                    : 'Desktop Utility'}
                </span>
              </div>

              {project.collaboration && (
                <div className="flex items-center justify-between text-zinc-400 pt-1 border-t border-zinc-800">
                  <span className="text-[11px] text-zinc-500 uppercase">Role</span>
                  <span className={`font-medium ${theme.softText}`}>
                    {project.collaboration.myRole}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Editorial Description, Story, and Actions (8 Cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-2">
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-medium tracking-tight text-white font-display">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Authentic Story / Motivation Highlight Box */}
            {project.storyQuote && (
              <div
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#181820] border-l-4 border border-zinc-800/80 space-y-1.5 ${theme.quoteBorder}`}
              >
                <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block">
                  The Motivation
                </span>
                <p className="text-sm sm:text-[15px] font-display italic text-zinc-100 leading-snug">
                  &ldquo;{project.storyQuote}&rdquo;
                </p>
                <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed pt-1">
                  {project.story}
                </p>
              </div>
            )}

            {/* Tech Stack Pills Ribbon */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                Technologies &amp; Architecture
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#181820] border border-zinc-700/80 text-xs font-mono text-zinc-200 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                {project.links && project.links.length > 0 && (
                  <a
                    href={project.links[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer touch-manipulation ${theme.actionBtn}`}
                  >
                    <span>{project.links[0].label}</span>
                    {project.links[0].type === 'github' ? (
                      <Github className="w-3.5 h-3.5" />
                    ) : (
                      <ExternalLink className="w-3.5 h-3.5" />
                    )}
                  </a>
                )}

                {/* Second link if any */}
                {project.links && project.links.length > 1 && (
                  <a
                    href={project.links[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-medium transition-all cursor-pointer touch-manipulation ${theme.subtleBtn}`}
                  >
                    <span>{project.links[1].label}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Detailed Deep-Dive Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 touch-manipulation"
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? 'Hide Architecture' : 'Explore Architecture'}</span>
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          EXPANDABLE ARCHITECTURAL BREAKDOWN
          Deep technical details, diagrams, and takeaways
          ==================================================== */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="border-t border-zinc-800 bg-[#0e0e12] overflow-hidden"
          >
            <div className="p-6 sm:p-9 lg:p-12 space-y-6 sm:space-y-8">
              {/* Architecture & Engineering Sections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Technical Overview */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#141418] border border-zinc-800 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>System Architecture</span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-zinc-300 leading-relaxed">
                    {project.overview}
                  </p>
                  {project.theHardPart && (
                    <div className="pt-3 border-t border-zinc-800/80 space-y-1">
                      <span className={`text-[11px] font-mono uppercase tracking-wider block ${theme.softText}`}>
                        The Hard Part
                      </span>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {project.theHardPart}
                      </p>
                    </div>
                  )}
                </div>

                {/* What I Learned */}
                {project.whatILearned && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#141418] border border-zinc-800 space-y-3 shadow-sm flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span>Engineering Takeaways</span>
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-zinc-300 leading-relaxed">
                        {project.whatILearned}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                      practical growth · solving edge cases
                    </div>
                  </div>
                )}
              </div>

              {/* Subsections if available (e.g. Avero / Nexus) */}
              {project.technicalDetails?.subsections && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#141418] border border-zinc-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold border-b border-zinc-800 pb-3">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Deep-Dive Subsystems</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.technicalDetails.subsections.map((sub) => (
                      <div key={sub.title} className="space-y-1.5 text-xs">
                        <span className="font-mono text-zinc-200 font-semibold block">
                          {sub.title}
                        </span>
                        <p className="text-zinc-400 leading-relaxed">{sub.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Diagram if SoundMesh */}
              {project.technicalDetails?.diagramType === 'soundmesh' && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#141418] border border-zinc-800 space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold block">
                    Zero-Cloud Audio Broadcast Flow
                  </span>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-xs pt-1">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-sky-500/40 text-sky-300 w-full md:w-auto text-left">
                      <div className="font-semibold">Phone A (Host Coordinator)</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">
                        Audio capture &amp; clock master
                      </div>
                    </div>

                    <div className="text-center text-zinc-500 text-xs py-1">
                      <span className="text-zinc-400">▼ Local TCP Network Broadcast</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 w-full md:w-auto text-left md:text-right">
                      <div className="font-semibold">Phone B &amp; C (Receivers)</div>
                      <div className="text-[10px] text-emerald-400/90 mt-0.5">
                        Synchronized monotonic playback
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default AllProjectsPage;
