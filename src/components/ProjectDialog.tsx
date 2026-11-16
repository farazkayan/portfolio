import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Github,
  X,
} from 'lucide-react';
import { ProjectData } from '../data/projectsData';
import { ProjectCoverArtwork } from './ProjectCoverArtwork';
import { HandwrittenNote } from './ui/HandcraftedMarks';

interface ProjectDialogProps {
  project: ProjectData | null;
  projects: ProjectData[];
  onClose: () => void;
  onNavigate: (project: ProjectData) => void;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({
  project,
  projects,
  onClose,
  onNavigate,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const currentIndex = project
    ? projects.findIndex((p) => p.id === project.id)
    : -1;

  const handlePrev = () => {
    if (!projects.length || currentIndex < 0) return;
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    onNavigate(projects[prevIdx]);
  };

  const handleNext = () => {
    if (!projects.length || currentIndex < 0) return;
    const nextIdx = (currentIndex + 1) % projects.length;
    onNavigate(projects[nextIdx]);
  };

  // Scroll lock with scrollbar width compensation so page never shifts
  useEffect(() => {
    if (!project) return;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [Boolean(project)]);

  // Move keyboard focus into dialog on open
  useEffect(() => {
    if (!project) return;
    const raf = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(raf);
  }, [Boolean(project)]);

  // Escape, ArrowLeft/Right, and Tab focus trap
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
        onNavigate(projects[prevIdx]);
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIdx = (currentIndex + 1) % projects.length;
        onNavigate(projects[nextIdx]);
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);

        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, currentIndex, projects, onClose, onNavigate]);

  const accentText =
    project?.themeColor === 'rose' ? 'text-[#E8684A]' : 'text-purple-300';

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-md p-0 sm:p-6 lg:p-8"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-dialog-title-${project.id}`}
            aria-describedby={`project-dialog-desc-${project.id}`}
            layoutId={
              prefersReducedMotion ? undefined : `project-card-${project.id}`
            }
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 32,
              mass: 0.9,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[94dvh] sm:max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-white/[0.12] bg-[#16161d] text-zinc-100 shadow-[0_32px_90px_rgba(0,0,0,0.85)]"
          >
            {/* ====================================================
                A. HEADER (Title, Category, Prev/Next, Close)
                ==================================================== */}
            <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.08] bg-[#16161d]/95 px-5 py-4 sm:px-7">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <HandwrittenNote className={`text-base -rotate-2 ${accentText}`}>
                    {String(currentIndex + 1).padStart(2, '0')}
                  </HandwrittenNote>
                  <span aria-hidden="true" className="text-zinc-700">
                    ·
                  </span>
                  <span className="truncate">{project.category}</span>
                </div>

                <motion.h3
                  id={`project-dialog-title-${project.id}`}
                  layoutId={
                    prefersReducedMotion
                      ? undefined
                      : `project-title-${project.id}`
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 340,
                    damping: 32,
                    mass: 0.9,
                  }}
                  className="mt-0.5 font-display text-2xl sm:text-3xl font-medium tracking-tight text-white"
                >
                  {project.title}
                </motion.h3>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {/* Subtle Prev / Next Controls */}
                <div
                  className="hidden xs:flex items-center rounded-lg border border-white/[0.08] bg-[#121218] p-0.5"
                  aria-label="Project navigation"
                >
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous project"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-1.5 font-mono text-[11px] tabular-nums text-zinc-500">
                    {currentIndex + 1}/{projects.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next project"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Visible Close Button */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details (Escape)"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-[#121218] text-zinc-300 transition-colors hover:border-white/[0.25] hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 touch-manipulation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </header>

            {/* ====================================================
                SCROLLABLE BODY (Visual + Structured Details)
                ==================================================== */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6 space-y-6">
              {/* B. Main Visual */}
              <motion.div
                layoutId={
                  prefersReducedMotion
                    ? undefined
                    : `project-cover-${project.id}`
                }
                transition={{
                  type: 'spring',
                  stiffness: 340,
                  damping: 32,
                  mass: 0.9,
                }}
                className="relative h-52 sm:h-64 md:h-72 w-full overflow-hidden rounded-xl border border-white/[0.08]"
              >
                <ProjectCoverArtwork project={project} context="modal" />
              </motion.div>

              {/* C. Short Overview + D. My Contribution */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <section className="space-y-2">
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                    Overview
                  </h4>
                  <p
                    id={`project-dialog-desc-${project.id}`}
                    className="text-sm sm:text-[15px] leading-relaxed text-zinc-200"
                  >
                    {project.modalOverview}
                  </p>
                </section>

                <section className="space-y-2 md:border-l md:border-white/[0.08] md:pl-6">
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                    My Contribution
                  </h4>
                  <p className="text-sm sm:text-[14.5px] leading-relaxed text-zinc-300">
                    {project.contributionSummary}
                  </p>
                  {project.collaboration && (
                    <p className="pt-1 font-mono text-xs text-zinc-400">
                      Collaborator:{' '}
                      <a
                        href={project.collaboration.collaboratorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-300 underline decoration-purple-400/40 underline-offset-4 transition-colors hover:text-white"
                      >
                        {project.collaboration.collaboratorName} (
                        {project.collaboration.collaboratorRole}) ↗
                      </a>
                    </p>
                  )}
                </section>
              </div>

              {/* E. Technical Details + F. Project Status */}
              <div className="grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-5 md:grid-cols-3">
                <section className="space-y-2 md:col-span-2">
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                    Technical Details
                  </h4>
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-zinc-300">
                    {project.technicalHighlight}
                  </p>
                  <p className="pt-1 font-mono text-xs leading-relaxed text-zinc-400">
                    {project.techStack.join(' · ')}
                  </p>
                </section>

                <section className="space-y-2 md:border-l md:border-white/[0.08] md:pl-6">
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                    Status
                  </h4>
                  <p className="text-sm font-display text-[#FAF5E8]">
                    {project.status}
                  </p>
                </section>
              </div>
            </div>

            {/* ====================================================
                G. FOOTER & EXTERNAL LINKS + MOBILE NAV
                ==================================================== */}
            <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] bg-[#131319] px-5 py-3.5 sm:px-7">
              <div className="flex flex-wrap items-center gap-2.5">
                {project.links?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg border px-4 py-2 font-mono text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                      link.type === 'live'
                        ? 'border-[#FAF5E8]/80 bg-[#FAF5E8] text-[#141418] hover:bg-white'
                        : 'border-white/[0.12] bg-[#1b1b24] text-zinc-200 hover:border-white/[0.28] hover:text-white'
                    }`}
                  >
                    {link.type === 'github' ? (
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>

              {/* Mobile Prev/Next helper */}
              <div className="flex items-center gap-1 xs:hidden">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous project"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] text-zinc-300 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-1.5 font-mono text-xs text-zinc-500">
                  {currentIndex + 1}/{projects.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next project"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] text-zinc-300 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <span className="hidden sm:inline font-mono text-[11px] text-zinc-500">
                ← / → switch · Esc to close
              </span>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectDialog;
