
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowDownRight } from 'lucide-react';

import { ChildhoodPortrait } from './ChildhoodPortrait';
import { FlowButton } from './ui/flow-button';
import {
  HandwrittenNote,
  MakerMark,
  SketchUnderline,
} from './ui/HandcraftedMarks';

export const HeroHome: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const scrollTo = (id: string) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    const navOffset = window.innerWidth < 640 ? 64 : 80;
    window.scrollTo({
      top: Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - navOffset
      ),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[92svh] w-full flex-col justify-between overflow-x-clip px-4 pb-6 pt-[4.25rem] xs:px-5 sm:px-8 sm:pb-8 sm:pt-24 md:pt-28 lg:px-12"
    >
      {/* Single restrained, slowly drifting atmospheric accent (compositor-only) */}
      <motion.div
        key={prefersReducedMotion ? 'atmosphere-static' : 'atmosphere-drift'}
        aria-hidden="true"
        initial={false}
        animate={
          prefersReducedMotion
            ? { opacity: 0.75, x: 0, y: 0 }
            : {
                opacity: [0.55, 0.9, 0.55],
                x: [0, -18, 10, 0],
                y: [0, 14, -8, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 18,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="pointer-events-none absolute -right-32 top-16 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.06)_0%,rgba(232,104,74,0.035)_48%,transparent_72%)] blur-3xl will-change-transform"
      />

      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 9 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between py-2 sm:py-4"
      >
        {/* Main composition */}
        <div className="my-auto grid grid-cols-1 items-center gap-6 py-3 sm:gap-9 sm:py-8 md:grid-cols-12 md:gap-8 lg:gap-10 lg:py-10">
          {/* Primary & Secondary Text Stack */}
          <div className="z-10 md:col-span-7">
            {/* Tertiary layer: quiet personal-builder & location identification */}
            <p className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-[0.03em] text-zinc-400 sm:mb-4 sm:text-xs">
              <span className="whitespace-nowrap text-[#FAF5E8]/90">
                Student &amp; builder
              </span>
              <span className="inline-flex items-center gap-x-2 whitespace-nowrap">
                <span aria-hidden="true" className="text-zinc-600">
                  ·
                </span>
                <span>Dhaka, Bangladesh</span>
              </span>
            </p>

            {/* Primary layer: Name + restrained handwritten annotation */}
            <h1
              id="hero-heading"
              aria-label="Faraz Kayan Haque"
              className="font-display text-[clamp(2.45rem,6.1vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.05em] text-white"
            >
              <span className="block">Faraz Kayan</span>

              <span className="mt-1 flex flex-wrap items-baseline gap-x-3.5 gap-y-1 sm:gap-x-4">
                <span className="relative inline-block text-[#FAF5E8]">
                  Haque

                  <SketchUnderline
                    variant="squiggle"
                    revealOnView={false}
                    className="absolute -bottom-1 left-0 w-full text-[#E8684A]/85"
                  />
                </span>

                <HandwrittenNote className="rotate-[-4deg] text-lg text-[#E8684A] sm:text-xl">
                  still curious.
                </HandwrittenNote>
              </span>
            </h1>

            {/* Primary lead statement + Secondary supporting context */}
            <div className="mt-5 max-w-xl sm:mt-8 lg:mt-10">
              <p className="font-display text-[17px] leading-snug tracking-[-0.015em] text-zinc-100 sm:text-xl lg:text-[22px]">
                I see something that doesn’t exist, and I decide to build it.
              </p>

              <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400 sm:mt-3 sm:text-[15px]">
                Building software, technical experiments, and
                small independent ventures—learning by making real things work.
              </p>
            </div>

            {/* CTA Arrangement: Primary FlowButton + quiet secondary paths */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5 sm:mt-8 sm:gap-y-3">
              <FlowButton
                text="See my projects"
                href="#projects"
                onClick={scrollTo('projects')}
                variant="primary"
              />

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <a
                  href="#ventures"
                  onClick={scrollTo('ventures')}
                  className="group inline-flex min-h-11 items-center gap-1.5 rounded-md py-2 text-sm text-zinc-300 transition-colors hover:text-[#FAF5E8] active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8684A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#141418]"
                >
                  <span>Explore ventures</span>
                  <ArrowDownRight
                    aria-hidden="true"
                    className="h-4 w-4 text-[#E8684A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 motion-reduce:transition-none"
                  />
                </a>

                <span
                  aria-hidden="true"
                  className="hidden h-3 w-px bg-white/15 xs:inline-block"
                />

                <a
                  href="#contact"
                  onClick={scrollTo('contact')}
                  className="inline-flex min-h-11 items-center rounded-md py-2 text-sm text-zinc-400 transition-colors hover:text-[#FAF5E8] active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8684A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#141418]"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>

          {/* Secondary layer: Signature Interactive Childhood Portrait */}
          <div className="z-10 flex justify-center md:col-span-5 md:justify-end md:pr-3 lg:pr-6">
            <div className="relative">
              {/* Signature maker mark anchored outside portrait top-left */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-4 -top-4 z-20 sm:-left-6 sm:-top-5"
              >
                <MakerMark size={20} className="opacity-85" />
              </div>

              {/* Quiet architectural backing frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl border border-[#FAF5E8]/15 sm:translate-x-3 sm:translate-y-3 sm:rounded-3xl"
              />

              <div
                className={`relative transition-transform duration-500 ease-out motion-reduce:transition-none ${
                  prefersReducedMotion
                    ? ''
                    : 'md:-rotate-[1deg] md:hover:rotate-0'
                }`}
              >
                <ChildhoodPortrait
                  className="w-[196px] min-[375px]:w-[214px] xs:w-[232px] sm:w-[260px] md:w-[245px] lg:w-[300px] xl:w-[325px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tertiary bottom navigation strip */}
        <footer className="flex items-center justify-between gap-4 border-t border-white/[0.09] pt-3.5 text-xs font-mono text-zinc-400 sm:pt-4">
          <span className="truncate pr-3">
            Software · Systems · Independent Ventures
          </span>

          <a
            href="#about"
            onClick={scrollTo('about')}
            className="group inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md py-1.5 text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8684A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141418]"
          >
            <span>A little more</span>

            <ArrowDown
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </footer>
      </motion.div>
    </section>
  );
};

export default HeroHome;
