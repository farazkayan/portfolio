
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

    window.scrollTo({
      top: Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - 75
      ),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[92svh] w-full flex-col justify-between overflow-hidden px-4 pb-7 pt-24 xs:px-5 sm:px-8 sm:pb-9 sm:pt-28 lg:px-12"
    >
      {/* Very subtle warm atmosphere — gently breathing */}
      <motion.div
        key={prefersReducedMotion ? 'glow-static' : 'glow-ambient'}
        aria-hidden="true"
        initial={false}
        animate={
          prefersReducedMotion
            ? { opacity: 0.85, scale: 1 }
            : { opacity: [0.62, 1, 0.62], scale: [0.985, 1.03, 0.985] }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 13.8,
                delay: 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#E8684A]/[0.04] blur-[120px]"
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
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between py-3 sm:py-5"
      >
        {/* Main composition */}
        <div className="my-auto grid grid-cols-1 items-center gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:gap-10">

          {/* Introduction */}
          <div className="z-10 lg:col-span-7">

            {/* Name */}
            <h1
              aria-label="Faraz Kayan Haque"
              className="font-display text-[clamp(2.7rem,6.4vw,5.8rem)] font-medium leading-[0.98] tracking-[-0.055em] text-white"
            >
              <span className="block">Faraz Kayan</span>

              <span className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
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

            {/* Original tagline */}
            <div className="mt-9 max-w-xl sm:mt-11">
              <p className="font-display text-base leading-relaxed tracking-[-0.015em] text-zinc-200 sm:text-xl">
                I see something that doesn’t exist, and I decide to build it.
              </p>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                I build software, explore technology, and turn ideas into
                products and independent ventures.
              </p>
            </div>

            {/* Original FlowButton + secondary venture link */}
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-9">

              <FlowButton
                text="See my projects"
                href="#projects"
                onClick={scrollTo('projects')}
                variant="primary"
              />

              <a
                href="#ventures"
                onClick={scrollTo('ventures')}
                className="group inline-flex items-center gap-2 py-2 text-sm text-zinc-400 transition-colors hover:text-[#FAF5E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8684A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#191919]"
              >
                <span>Explore ventures</span>

                <ArrowDownRight
                  aria-hidden="true"
                  className="h-4 w-4 text-[#E8684A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* Childhood portrait */}
          <div className="z-10 flex justify-center lg:col-span-5 lg:justify-end lg:pr-6">

            <div className="relative">
              {/* Quietly floating signature maker mark anchored outside portrait top-left */}
              <motion.div
                key={prefersReducedMotion ? 'maker-static' : 'maker-ambient'}
                aria-hidden="true"
                initial={false}
                animate={
                  prefersReducedMotion
                    ? { y: 0, rotate: -2 }
                    : { y: [0, -4, 0], rotate: [-3, 3.5, -3] }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 9.2,
                        delay: 0.7,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
                className="pointer-events-none absolute -left-5 -top-5 z-20 sm:-left-7 sm:-top-6"
              >
                <MakerMark size={20} className="opacity-85" />
              </motion.div>

              {/* Single quiet offset frame with slow ambient drift */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3"
              >
                <motion.div
                  key={prefersReducedMotion ? 'frame-static' : 'frame-ambient'}
                  initial={false}
                  animate={
                    prefersReducedMotion
                      ? { x: 0, y: 0, rotate: 0 }
                      : { x: [0, 2.5, 0], y: [0, -2, 0], rotate: [0, 0.65, 0] }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 11.6,
                          delay: 2.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                  }
                  className="h-full w-full rounded-2xl border border-[#FAF5E8]/15"
                />
              </div>

              <div
                className={`relative transition-transform duration-500 ease-out ${
                  prefersReducedMotion
                    ? ''
                    : 'lg:-rotate-[1deg] lg:hover:rotate-0'
                }`}
              >
                <ChildhoodPortrait
                  className="w-[220px] xs:w-[250px] sm:w-[285px] lg:w-[310px] xl:w-[325px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Original bottom navigation */}
        <footer className="flex items-center justify-between gap-4 border-t border-white/[0.09] pt-4 text-xs font-mono text-zinc-500">

          <span className="truncate pr-3">
            Software · Systems · Independent Ventures
          </span>

          <a
            href="#about"
            onClick={scrollTo('about')}
            className="group inline-flex shrink-0 items-center gap-2 py-1 text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8684A]"
          >
            <span>A little more</span>

            <ArrowDown
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
            />
          </a>
        </footer>
      </motion.div>
    </section>
  );
};

export default HeroHome;
