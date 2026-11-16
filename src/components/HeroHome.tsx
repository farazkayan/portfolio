import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowDownRight } from 'lucide-react';
import { ChildhoodPortrait } from './ChildhoodPortrait';
import {
  HandwrittenNote,
  MakerMark,
  SketchArrow,
  SketchUnderline,
} from './ui/HandcraftedMarks';

export const HeroHome: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const scrollTo = (id: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo({
      top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 75),
      behavior: 'smooth',
    });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[92svh] w-full flex-col justify-between overflow-hidden px-4 xs:px-5 pb-7 pt-24 xs:pt-24 sm:px-8 sm:pb-9 sm:pt-28 lg:px-12"
    >
      {/* Subtle restrained ambient depth (kept dark and calm on charcoal canvas) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-16 -z-10 h-[32rem] w-[32rem] rounded-full bg-purple-500/[0.04] blur-[120px]"
      />

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between py-2 sm:py-4"
      >
        {/* Top Editorial Datum Strip */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-900/90 pb-3.5 text-[11px] font-mono text-zinc-400">
          <div className="inline-flex items-center gap-2.5">
            <MakerMark size={16} />
            <span className="uppercase tracking-[0.16em] text-zinc-300">
              Student Builder · Dhaka, Bangladesh
            </span>
          </div>
          <span className="hidden sm:inline tracking-[0.14em] uppercase text-zinc-500">
            Portfolio / 2026
          </span>
        </div>

        {/* Main Asymmetrical Editorial Spread */}
        <div className="my-auto grid grid-cols-1 items-center gap-10 py-8 sm:py-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Art-Directed Typography, Context & Editorial Actions */}
          <div className="z-10 space-y-6 sm:space-y-7 lg:col-span-7">
            {/* Stacked Two-Line Name Lockup + Restrained Handwritten Aside */}
            <div className="space-y-2">
              <h1
                aria-label="Faraz Kayan Haque"
                className="font-display text-[2.75rem] xs:text-[3.25rem] sm:text-6xl lg:text-[4.35rem] xl:text-[4.85rem] font-medium leading-[0.96] tracking-[-0.045em] text-white"
              >
                <span className="block">Faraz Kayan</span>
                <span className="mt-0.5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-[#FAF5E8]">Haque</span>
                  <HandwrittenNote
                    aria-hidden="true"
                    className="text-xl xs:text-2xl sm:text-[1.7rem] text-[#E8684A]/85 -rotate-2 tracking-normal font-medium translate-y-[-2px]"
                  >
                    — tinkerer &amp; maker
                  </HandwrittenNote>
                </span>
              </h1>
            </div>

            {/* Preserved Core Tagline + Supporting Context */}
            <div className="space-y-3.5 max-w-xl">
              <p className="group font-display text-base xs:text-lg sm:text-[1.35rem] leading-[1.45] text-zinc-200 tracking-[-0.015em]">
                I see something that doesn’t exist, and I{' '}
                <span className="relative inline-block pb-1 text-white">
                  decide to build it.
                  <SketchUnderline
                    variant="squiggle"
                    revealOnView={false}
                    className="absolute left-0 -bottom-0.5 text-[#E8684A]/80 transition-opacity duration-200 group-hover:text-[#E8684A]"
                  />
                </span>
              </p>

              <p className="max-w-md text-sm sm:text-[15px] leading-relaxed text-zinc-400 font-normal">
                I build software, explore technology, and turn ideas into products and
                independent ventures.
              </p>
            </div>

            {/* Integrated Primary + Quiet Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <a
                href="#projects"
                onClick={scrollTo('projects')}
                className="group relative inline-flex min-h-[46px] items-center justify-center gap-3 rounded-xl bg-[#FAF5E8] px-6 py-3 text-sm font-display font-semibold tracking-tight text-[#141418] shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-all duration-200 hover:bg-white hover:-translate-y-0.5 active:translate-y-0 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF5E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141418]"
              >
                <span>See my projects</span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-[#141418] transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#ventures"
                onClick={scrollTo('ventures')}
                className="group inline-flex min-h-[44px] items-center gap-1.5 py-2 text-xs sm:text-[13px] font-mono text-zinc-300 transition-colors hover:text-[#FAF5E8] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8684A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141418] rounded-md px-1"
              >
                <span className="relative inline-block pb-1">
                  Explore ventures
                  <SketchUnderline
                    variant="arc"
                    hoverOnly
                    className="absolute left-0 -bottom-0.5 text-[#E8684A]/85"
                  />
                </span>
                <ArrowDownRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-[#E8684A]"
                />
              </a>
            </div>
          </div>

          {/* Right Column: Art-Directed Halftone Portrait Print Proof */}
          <div className="z-10 flex flex-col items-center lg:col-span-5 lg:items-end lg:pt-5">
            <div className="relative flex flex-col items-center lg:items-end">
              {/* Quiet Margin Annotation Outside the Portrait Frame */}
              <div className="mb-2.5 flex items-center gap-1.5 self-start sm:ml-2">
                <HandwrittenNote className="text-[16px] text-[#FAF5E8]/65 -rotate-2">
                  hover or tap to morph
                </HandwrittenNote>
                <SketchArrow
                  direction="down-right"
                  width={22}
                  height={15}
                  className="text-[#E8684A]/80 translate-y-1"
                />
              </div>

              {/* Compositional Print-Proof Backing Plate + Angled Halftone Frame */}
              <div className="relative">
                {/* Offset Architectural Hairline Proof Contour (never obscures portrait) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 translate-x-2.5 translate-y-2.5 sm:translate-x-3.5 sm:translate-y-3.5 rounded-2xl sm:rounded-3xl border border-[#FAF5E8]/14 bg-[#1c1c22]/35"
                >
                  {/* Subtle top-left & bottom-right print-shop registration corner ticks */}
                  <span className="absolute -top-1 -left-1 h-2.5 w-2.5 border-t border-l border-[#E8684A]/65" />
                  <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b border-r border-[#FAF5E8]/45" />
                </div>

                {/* Tactile Slightly Angled Placement — Settles Level on Hover/Focus */}
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:-rotate-[1.5deg] hover:rotate-0 focus-within:rotate-0 motion-reduce:rotate-0">
                  <ChildhoodPortrait className="w-[225px] xs:w-[255px] sm:w-[295px] lg:w-[310px] xl:w-[335px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Index Edge Bar */}
        <div className="flex items-center justify-between border-t border-zinc-900/80 pt-4 text-xs font-mono text-zinc-500">
          <span className="truncate pr-4">
            Software · Systems · Independent Ventures
          </span>
          <a
            href="#about"
            onClick={scrollTo('about')}
            className="group inline-flex shrink-0 items-center gap-2 py-1 text-zinc-400 transition hover:text-white"
          >
            <span>A little more</span>
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroHome;
