import React from 'react';
import { ProjectData } from '../data/projectsData';

interface ProjectCoverArtworkProps {
  project: ProjectData;
  context?: 'card' | 'modal';
}

/**
 * Editorial project cover artwork.
 * When `project.screenshot` is supplied in projectsData.ts, it renders the real
 * screenshot directly with zero layout changes. Until then, each project renders
 * bespoke editorial cover art built around its genuine brand mark and domain motif.
 */
export const ProjectCoverArtwork: React.FC<ProjectCoverArtworkProps> = ({
  project,
  context = 'card',
}) => {
  const isModal = context === 'modal';

  // Seamless swap for genuine project screenshots once provided
  if (project.screenshot) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#121216]">
        <img
          src={project.screenshot.src}
          alt={project.screenshot.alt}
          className={`h-full w-full object-cover ${
            isModal
              ? ''
              : 'transition-transform duration-500 ease-out group-hover/card:scale-[1.025] motion-reduce:transition-none'
          }`}
          loading="eager"
          decoding="async"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141418]/45 via-transparent to-transparent"
        />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 1. SOUNDMESH — Concentric Acoustic Wave Rings & Warm Cream Waveform Emblem
  // --------------------------------------------------------------------------
  if (project.id === 'soundmesh') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#13151d] select-none">
        {/* Soft atmospheric violet + acoustic sky tint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(192,132,252,0.14),rgba(56,189,248,0.06)_42%,transparent_74%)]"
        />

        {/* Delicate concentric acoustic rings */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 250"
          fill="none"
          className={`pointer-events-none absolute inset-0 h-full w-full ${
            isModal
              ? 'opacity-80'
              : 'opacity-65 transition-transform duration-500 ease-out group-hover/card:scale-[1.04] motion-reduce:transition-none'
          }`}
        >
          <circle
            cx="200"
            cy="125"
            r="58"
            stroke="#FAF5E8"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="125"
            r="90"
            stroke="#C084FC"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle
            cx="200"
            cy="125"
            r="126"
            stroke="#FAF5E8"
            strokeOpacity="0.09"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="125"
            r="164"
            stroke="#38BDF8"
            strokeOpacity="0.1"
            strokeWidth="1"
            strokeDasharray="2 8"
          />
          {/* Subtle satellite nodes around the acoustic ring */}
          <circle cx="110" cy="125" r="3" fill="#E8684A" fillOpacity="0.85" />
          <circle cx="290" cy="125" r="3" fill="#C084FC" fillOpacity="0.85" />
          <circle cx="200" cy="35" r="2.5" fill="#FAF5E8" fillOpacity="0.6" />
        </svg>

        {/* Quiet corner typographic editorial marks */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-3 font-mono text-[9.5px] tracking-[0.16em] text-zinc-500 uppercase"
        >
          Local Wi-Fi
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3.5 font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase"
        >
          Audio Mesh
        </span>

        {/* Genuine SoundMesh Waveform Mark */}
        <div
          className={`relative z-10 overflow-hidden rounded-2xl border border-white/20 bg-[#F4F1EC] shadow-[0_14px_34px_rgba(0,0,0,0.55)] ${
            isModal
              ? 'h-24 w-24 p-3 sm:h-28 sm:w-28 sm:p-3.5'
              : 'h-20 w-20 p-2.5 transition-transform duration-300 ease-out group-hover/card:scale-105 motion-reduce:transition-none'
          }`}
        >
          <img
            src={project.logoUrl}
            alt="SoundMesh acoustic emblem"
            className="h-full w-full object-contain"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. AVERO — Cartographic Coordinate Grid, Curved Route & Bronze Crest
  // --------------------------------------------------------------------------
  if (project.id === 'avero') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#171316] select-none">
        {/* Warm muted coral & bronze ambient bloom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(232,104,74,0.14),rgba(217,175,112,0.06)_42%,transparent_75%)]"
        />

        {/* Editorial cartographic grid & delicate pinned trajectory */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 250"
          fill="none"
          className={`pointer-events-none absolute inset-0 h-full w-full ${
            isModal
              ? 'opacity-85'
              : 'opacity-70 transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none'
          }`}
        >
          {/* Fine latitude / longitude rules */}
          <line x1="0" y1="62" x2="400" y2="62" stroke="#FAF5E8" strokeOpacity="0.045" />
          <line x1="0" y1="125" x2="400" y2="125" stroke="#FAF5E8" strokeOpacity="0.06" />
          <line x1="0" y1="188" x2="400" y2="188" stroke="#FAF5E8" strokeOpacity="0.045" />
          <line x1="100" y1="0" x2="100" y2="250" stroke="#FAF5E8" strokeOpacity="0.045" />
          <line x1="200" y1="0" x2="200" y2="250" stroke="#FAF5E8" strokeOpacity="0.06" />
          <line x1="300" y1="0" x2="300" y2="250" stroke="#FAF5E8" strokeOpacity="0.045" />

          {/* Curved memory route between pinned points */}
          <path
            d="M78 172 C132 146, 152 72, 200 125 C246 175, 276 92, 326 76"
            stroke="#E8684A"
            strokeOpacity="0.45"
            strokeWidth="1.25"
            strokeDasharray="4 4"
          />
          <circle cx="78" cy="172" r="3.5" fill="#E8684A" fillOpacity="0.85" />
          <circle cx="78" cy="172" r="8" stroke="#E8684A" strokeOpacity="0.28" />
          <circle cx="326" cy="76" r="3.5" fill="#FAF5E8" fillOpacity="0.85" />
          <circle cx="326" cy="76" r="8" stroke="#FAF5E8" strokeOpacity="0.22" />
        </svg>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-3 font-mono text-[9.5px] tracking-[0.16em] text-zinc-500 uppercase"
        >
          Coordinates
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3.5 font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase"
        >
          Private Vault
        </span>

        {/* Genuine Avero Bronze Crest */}
        <div
          className={`relative z-10 overflow-hidden rounded-2xl border border-[#e2b97a]/25 bg-[#0e0e10] shadow-[0_14px_34px_rgba(0,0,0,0.6)] ${
            isModal
              ? 'h-24 w-24 sm:h-28 sm:w-28'
              : 'h-20 w-20 transition-transform duration-300 ease-out group-hover/card:scale-105 motion-reduce:transition-none'
          }`}
        >
          <img
            src={project.logoUrl}
            alt="Avero bronze crest emblem"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 3. NEXUS — Architectural Blueprint Frame, Corner Marks & Graph Node Emblem
  // --------------------------------------------------------------------------
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#151422] select-none">
      {/* Soft violet accent wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(192,132,252,0.16),rgba(99,102,241,0.06)_45%,transparent_75%)]"
      />

      {/* Crisp geometric node structure & corner registration marks */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 250"
        fill="none"
        className={`pointer-events-none absolute inset-0 h-full w-full ${
          isModal
            ? 'opacity-85'
            : 'opacity-70 transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none'
        }`}
      >
        {/* Outer architectural blueprint frame */}
        <rect
          x="32"
          y="26"
          width="336"
          height="198"
          rx="10"
          stroke="#C084FC"
          strokeOpacity="0.14"
          strokeDasharray="3 5"
        />
        {/* Subtle horizontal rule */}
        <line x1="32" y1="125" x2="368" y2="125" stroke="#FAF5E8" strokeOpacity="0.05" />
        {/* Node connection branches */}
        <path
          d="M200 125 L108 168 M200 125 L292 168 M200 125 L200 62"
          stroke="#C084FC"
          strokeOpacity="0.28"
          strokeWidth="1.2"
        />
        <circle cx="108" cy="168" r="3.5" fill="#2DD4BF" fillOpacity="0.7" />
        <circle cx="292" cy="168" r="3.5" fill="#93C5FD" fillOpacity="0.7" />
        <circle cx="200" cy="62" r="3" fill="#C084FC" fillOpacity="0.8" />
      </svg>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-3 font-mono text-[9.5px] tracking-[0.16em] text-zinc-500 uppercase"
      >
        Native Qt
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-3.5 font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase"
      >
        Desktop Tool
      </span>

      {/* Genuine Nexus Graph Emblem */}
      <div
        className={`relative z-10 overflow-hidden rounded-2xl border border-purple-300/25 bg-[#1b1830] shadow-[0_14px_34px_rgba(0,0,0,0.6)] ${
          isModal
            ? 'h-24 w-24 sm:h-28 sm:w-28'
            : 'h-20 w-20 transition-transform duration-300 ease-out group-hover/card:scale-105 motion-reduce:transition-none'
        }`}
      >
        <img
          src={project.logoUrl}
          alt="Nexus workflow emblem"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default ProjectCoverArtwork;
