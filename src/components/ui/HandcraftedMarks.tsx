import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SketchUnderlineProps {
  className?: string;
  variant?: 'squiggle' | 'arc' | 'double';
  revealOnView?: boolean;
  hoverOnly?: boolean;
}

/**
 * Slightly imperfect hand-drawn SVG underline inspired by Faraz Kayan's creative studio notes.
 */
export const SketchUnderline: React.FC<SketchUnderlineProps> = ({
  className = 'text-[#E8684A]/80',
  variant = 'squiggle',
  revealOnView = true,
  hoverOnly = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const paths: Record<NonNullable<SketchUnderlineProps['variant']>, string> = {
    squiggle:
      'M2 6.8C15 2.2 28 8.4 41 4.4C54 0.8 68 8.2 81 4.4C94 0.9 107 7.6 122 4.2C132 2.4 140 5.4 146 4.8',
    arc: 'M2 7.2C36 2.6 88 2.2 146 6.2',
    double: 'M3 5.5C44 2.4 98 2.8 145 5.2M14 9.5C54 7.4 102 7.2 138 8.8',
  };

  if (hoverOnly) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 148 12"
        fill="none"
        preserveAspectRatio="none"
        className={`pointer-events-none block h-[7px] w-full sketch-hover-line ${className}`}
      >
        <path
          d={paths[variant]}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 148 12"
      fill="none"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-[7px] w-full ${className}`}
    >
      <motion.path
        d={paths[variant]}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={
          prefersReducedMotion
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0.35 }
        }
        animate={revealOnView ? undefined : { pathLength: 1, opacity: 1 }}
        whileInView={revealOnView ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true, amount: 'some' }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
};

interface SketchArrowProps {
  className?: string;
  direction?: 'down-right' | 'down-left' | 'down' | 'right-down';
  width?: number;
  height?: number;
}

/**
 * Small organic sketch-drawn arrow pointing gently toward an interactive element or note.
 */
export const SketchArrow: React.FC<SketchArrowProps> = ({
  className = 'text-[#FAF5E8]/60',
  direction = 'down-right',
  width = 28,
  height = 20,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const shapes: Record<
    NonNullable<SketchArrowProps['direction']>,
    { viewBox: string; d: string }
  > = {
    'down-right': {
      viewBox: '0 0 32 22',
      d: 'M3 4C12 3 20 7 25 16M25 16L19.5 14.5M25 16L27.2 10.6',
    },
    'down-left': {
      viewBox: '0 0 32 22',
      d: 'M29 4C20 3 12 7 7 16M7 16L12.5 14.5M7 16L4.8 10.6',
    },
    'right-down': {
      viewBox: '0 0 30 22',
      d: 'M2 10C11 6 19 8 25 16M25 16L19.5 15.2M25 16L26 10.4',
    },
    down: {
      viewBox: '0 0 18 28',
      d: 'M9 2C7.8 9 10.2 17 9 25M9 25L4.5 19.5M9 25L13.5 19.5',
    },
  };

  const shape = shapes[direction];

  return (
    <svg
      aria-hidden="true"
      width={width}
      height={height}
      viewBox={shape.viewBox}
      fill="none"
      className={`pointer-events-none shrink-0 ${className}`}
    >
      <motion.path
        d={shape.d}
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 'some' }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.55,
          delay: prefersReducedMotion ? 0 : 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
};

interface SketchMarkProps {
  className?: string;
  size?: number;
}

/**
 * Tiny hand-drawn 4-point star mark (restraint-focused accent).
 */
export const SketchSparkle: React.FC<SketchMarkProps> = ({
  className = 'text-[#E8684A]/80',
  size = 15,
}) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`pointer-events-none shrink-0 ${className}`}
  >
    <path
      d="M12 2.5C12.7 7.6 13.4 10.3 21.2 12C13.6 13.2 12.8 16.4 12 21.5C11.2 16.4 10.4 13.4 2.8 12C10.4 10.5 11.3 7.6 12 2.5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Small hand-drawn asterisk doodle for margin notes & quiet dividers.
 */
export const SketchAsterisk: React.FC<SketchMarkProps> = ({
  className = 'text-[#E8684A]/75',
  size = 12,
}) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    className={`pointer-events-none shrink-0 ${className}`}
  >
    <path
      d="M8.2 1.8C7.9 6 8.3 10.2 7.8 14.2M2.4 4.9C6.2 7 9.9 9.1 13.6 11.1M13.4 4.7C9.7 7 6.1 9.2 2.5 11.3"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
    />
  </svg>
);

interface HandwrittenNoteProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Restrained Caveat margin annotation derived from Faraz Kayan's creative studio identity.
 */
export const HandwrittenNote: React.FC<HandwrittenNoteProps> = ({
  children,
  className = '',
}) => (
  <span
    style={{ fontFamily: 'var(--font-hand)' }}
    className={`inline-block select-none leading-none font-medium tracking-[0.01em] ${className}`}
  >
    {children}
  </span>
);

/**
 * Quiet section-end divider featuring a hairline rule interrupted by a tiny hand-drawn asterisk.
 */
export const SketchDivider: React.FC<{ className?: string; markClassName?: string }> = ({
  className = '',
  markClassName = 'text-zinc-600',
}) => (
  <div aria-hidden="true" className={`flex items-center gap-3 w-full ${className}`}>
    <div className="h-px flex-1 bg-zinc-900" />
    <SketchAsterisk size={11} className={markClassName} />
    <div className="h-px w-8 sm:w-12 bg-zinc-900" />
  </div>
);

/**
 * Signature studio maker's mark: a restrained geometric diamond-spark with an imperfect ink tick.
 */
export const MakerMark: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 18,
}) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`pointer-events-none shrink-0 ${className}`}
  >
    <path
      d="M12 2.4C12.5 7.4 13.6 10.6 21.4 12C13.7 13.2 12.6 16.4 12 21.6C11.4 16.4 10.3 13.3 2.6 12C10.3 10.6 11.5 7.5 12 2.4Z"
      stroke="#FAF5E8"
      strokeOpacity="0.82"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18.2" cy="5.8" r="1.4" fill="#E8684A" fillOpacity="0.9" />
  </svg>
);

