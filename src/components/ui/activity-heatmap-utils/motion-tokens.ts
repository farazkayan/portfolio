/**
 * Motion design tokens for the ActivityHeatmap component.
 * Calibrated for physical, calm, Apple-like fluid spring transitions and micro-interactions.
 */

export const motionTokens = {
  ease: {
    /** Enter curve for newly appearing elements */
    enter: [0.16, 1, 0.3, 1] as const,
    /** Standard smooth deceleration curve */
    standard: [0.2, 0, 0, 1] as const,
    /** Exit curve for disappearing elements */
    exit: [0.7, 0, 0.84, 0] as const,
  },
  blur: {
    /** Blur used on text rolls and transitions */
    soft: 4,
    /** Subtle blur for minor changes */
    subtle: 2,
    /** Crisp */
    none: 0,
  },
  spring: {
    /** Morph spring used for width/layout readjustments */
    morph: {
      type: "spring" as const,
      stiffness: 360,
      damping: 28,
      mass: 0.8,
    },
    /** Snappy spring for tooltip gliding and position tracking */
    snappy: {
      type: "spring" as const,
      stiffness: 480,
      damping: 32,
      mass: 0.6,
    },
    /** Gentle spring for relaxed transitions */
    gentle: {
      type: "spring" as const,
      stiffness: 240,
      damping: 24,
    },
  },
  duration: {
    instant: 0,
    fast: 0.15,
    normal: 0.22,
    slow: 0.35,
  },
} as const;

export default motionTokens;
