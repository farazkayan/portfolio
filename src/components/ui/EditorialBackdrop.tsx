import React from 'react';

const PAPER_GRAIN_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><filter id="p"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0.04 0.32 0.32 0.32 0 0.03 0.29 0.29 0.29 0 0.01 0 0 0 0.065 0"/></filter><rect width="180" height="180" filter="url(#p)"/></svg>`
);

/**
 * Global atmospheric layer providing subtle printed-paper tooth, restrained
 * warm cream/coral editorial light, and a gentle peripheral vignette across the
 * charcoal portfolio canvas without affecting foreground contrast or interactions.
 */
export const EditorialBackdrop: React.FC = () => (
  <div
    aria-hidden="true"
    data-testid="editorial-backdrop"
    className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
  >
    {/* Restrained ambient cream & muted coral editorial depth */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: [
          'radial-gradient(78% 58% at 80% 10%, rgba(250, 245, 232, 0.032), transparent 68%)',
          'radial-gradient(68% 52% at 10% 48%, rgba(232, 104, 74, 0.024), transparent 66%)',
          'radial-gradient(72% 48% at 82% 84%, rgba(250, 245, 232, 0.02), transparent 66%)',
        ].join(', '),
      }}
    />

    {/* Ultra-fine warm printed-paper grain */}
    <div
      className="absolute inset-0 opacity-75"
      style={{
        backgroundImage: `url("data:image/svg+xml,${PAPER_GRAIN_SVG}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
      }}
    />

    {/* Gentle peripheral vignette preserving charcoal center */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(120% 105% at 50% 42%, transparent 56%, rgba(8, 8, 11, 0.36) 100%)',
      }}
    />
  </div>
);

export default EditorialBackdrop;
