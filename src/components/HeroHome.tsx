import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { ChildhoodPortrait } from './ChildhoodPortrait';
import { FlowButton } from './ui/flow-button';

export const HeroHome: React.FC = () => {
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
      className="relative flex min-h-[92svh] w-full flex-col justify-between overflow-hidden px-4 xs:px-5 pb-8 pt-20 xs:pt-24 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12"
    >
      {/* Subtle purple background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[34rem] w-[34rem] rounded-full bg-purple-500/[0.045] blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto my-auto w-full max-w-5xl py-6 xs:py-8 sm:py-12 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Bio & CTAs */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-7 z-10">
            <h1 className="font-display text-[2.2rem] xs:text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-7xl font-medium leading-[1.05] tracking-[-0.04em] text-white">
              Faraz Kayan Haque
            </h1>

            <p className="max-w-xl border-l border-purple-400/50 pl-3.5 sm:pl-4 font-display text-sm xs:text-base sm:text-lg leading-relaxed text-zinc-300">
              I see something that doesn’t exist, and I decide to build it.
            </p>

            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-5">
              <FlowButton
                text="See my projects"
                href="#projects"
                onClick={scrollTo('projects')}
                variant="primary"
              />
            </div>
          </div>

          {/* Right Column: Childhood Portrait (prominent, natural, and balanced) */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end pt-2 sm:pt-4 lg:pt-0 z-10">
            <ChildhoodPortrait className="w-[210px] xs:w-[250px] sm:w-[290px] lg:w-[310px] xl:w-[335px]" />
          </div>
        </div>
      </motion.div>

      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-zinc-900/80 pt-5 text-xs font-mono text-zinc-500">
        <span>2026</span>
        <a
          href="#about"
          onClick={scrollTo('about')}
          className="group inline-flex items-center gap-2 py-1 text-zinc-400 transition hover:text-white"
        >
          A little more <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  );
};

export default HeroHome;
