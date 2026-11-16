import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ventures, VentureData } from '../data/venturesData';
import {
  FeaturedOfferingViewModel,
  LatestReleaseResponse,
  resolveFeaturedOfferingViewModel,
} from '../utils/gumroadLatestRelease';

let cachedLatestReleasePromise: Promise<LatestReleaseResponse | null> | null = null;

function loadLatestReleaseOnce(): Promise<LatestReleaseResponse | null> {
  if (!cachedLatestReleasePromise) {
    cachedLatestReleasePromise = fetch('/api/ventures/latest-release', {
      headers: { Accept: 'application/json' },
    })
      .then(async (res) => {
        if (!res.ok) return null;
        const data = (await res.json()) as LatestReleaseResponse;
        if (!data || typeof data !== 'object' || !('status' in data)) return null;
        return data;
      })
      .catch(() => null);
  }
  return cachedLatestReleasePromise;
}

/* ============================================================================
   CARD 01: SAWAH — Earthy, Minimal, Tactile & Physical Product-Focused
   Palette: Deep olive (#2E3328), Muted olive (#3A4034), Warm cream (#F5F0DC)
   ============================================================================ */
const SawahVentureCard: React.FC<{ venture: VentureData }> = ({ venture }) => {
  return (
    <article
      aria-labelledby="venture-sawah-title"
      className="group relative h-full rounded-2xl sm:rounded-3xl bg-[#2E3328] border border-[#F5F0DC]/15 hover:border-[#F5F0DC]/30 p-4 sm:p-6 flex flex-col justify-between gap-4 sm:gap-5 shadow-[0_14px_40px_rgba(0,0,0,0.42)] transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle tactile matte warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(245,240,220,0.06),transparent_55%)]"
      />

      <div className="relative z-10 space-y-3.5 sm:space-y-4">
        {/* Top Metadata Strip */}
        <div className="flex items-center justify-between gap-3 border-b border-[#F5F0DC]/12 pb-2.5">
          <span className="text-[11px] font-mono tracking-wide text-[#D6D0BA]">
            {venture.category}
          </span>
          <span className="text-[11px] font-mono text-[#B5B09B] shrink-0">
            {venture.num}
          </span>
        </div>

        {/* Brand Identity & Editorial Serif Heading */}
        <div className="flex items-baseline justify-between gap-4">
          <h3
            id="venture-sawah-title"
            style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            className="text-3xl sm:text-[2.35rem] leading-none tracking-[0.04em] text-[#F5F0DC] font-normal"
          >
            {venture.name}
          </h3>
          <span className="text-[11px] font-mono text-[#B5B09B]">
            {venture.domain}
          </span>
        </div>

        {/* Tactile Framed Print Presentation */}
        <div className="rounded-xl sm:rounded-2xl bg-[#3A4034] border border-[#F5F0DC]/12 p-3.5 sm:p-4">
          <div className="flex flex-col xs:flex-row items-center gap-4">
            {/* Stepped Architectural Frame + Gallery Mat + Real Print */}
            <div className="relative shrink-0">
              {/* Subtle offset backing frame silhouette */}
              <div
                aria-hidden="true"
                className="absolute -right-2 -bottom-2 inset-0 translate-x-1 translate-y-1 border border-[#F5F0DC]/20 pointer-events-none"
              />
              {/* Physical Frame Moulding -> Gallery Cream Mat -> Photograph */}
              <div className="relative w-24 sm:w-[104px] aspect-[3/4] bg-[#1C1B18] p-[5px] shadow-[0_10px_24px_rgba(0,0,0,0.38)] ring-1 ring-[#F5F0DC]/15 transition-transform duration-300 group-hover:-translate-y-0.5">
                <div className="w-full h-full bg-[#F5F0DC] p-[7px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.18)]">
                  <div className="w-full h-full overflow-hidden bg-[#2E3328]">
                    {venture.artworkUrl && (
                      <img
                        src={venture.artworkUrl}
                        alt={venture.artworkAlt || `${venture.name} custom framed print`}
                        width="224"
                        height="300"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Craft Details & Frame Finish Swatches */}
            <div className="flex-1 min-w-0 space-y-3 text-center xs:text-left">
              <p
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                className="text-xl sm:text-2xl text-[#F5F0DC] leading-snug italic"
              >
                Your photos. Given a place.
              </p>

              {/* Tactile Frame Colour Swatches */}
              {venture.frameSwatches && (
                <div className="pt-1 flex items-center justify-center xs:justify-start gap-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#B5B09B]">
                    Frames
                  </span>
                  <div className="flex items-center gap-1.5" aria-label="Available frame colour finishes">
                    {venture.frameSwatches.map((swatch) => (
                      <span
                        key={swatch.name}
                        title={swatch.name}
                        aria-label={swatch.name}
                        className="w-3.5 h-3.5 rounded-full border border-[#F5F0DC]/35 shadow-sm"
                        style={{ backgroundColor: swatch.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description & Co-Founder Attribution */}
        <div className="space-y-2">
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#E6E0CA] font-normal">
            {venture.description}
          </p>

          {venture.coFounders && venture.coFounders.length > 0 && (
            <p className="text-xs font-mono text-[#B5B09B] leading-relaxed">
              Co-founded by{' '}
              {venture.coFounders.map((founder, idx) => (
                <React.Fragment key={founder.name}>
                  {idx > 0 && <span className="text-[#8F8A77]"> &amp; </span>}
                  {founder.url ? (
                    <a
                      href={founder.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F5F0DC] underline decoration-[#F5F0DC]/45 underline-offset-4 hover:decoration-[#F5F0DC] hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F0DC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E3328]"
                    >
                      {founder.name}
                    </a>
                  ) : (
                    <span className="text-[#D6D0BA]">{founder.name}</span>
                  )}
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      </div>

      {/* Primary Action Row */}
      <div className="relative z-10 pt-3 border-t border-[#F5F0DC]/12 flex items-center justify-between gap-3">
        <a
          href={venture.primaryAction.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={venture.primaryAction.ariaLabel}
          className="group/link inline-flex items-center justify-center gap-2 rounded-lg bg-[#F5F0DC] hover:bg-[#FFFFFF] text-[#2E3328] px-5 py-2.5 text-xs font-mono font-semibold tracking-wide transition-colors min-h-[44px] w-full sm:w-auto touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F0DC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E3328]"
        >
          <span>{venture.primaryAction.label}</span>
          <ArrowUpRight
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>

        <span className="hidden sm:inline text-[11px] font-mono text-[#B5B09B]">
          Physical prints · Dhaka
        </span>
      </div>
    </article>
  );
};

/* ============================================================================
   CARD 02: FARAZ KAYAN — Playful, Doodley & Handcrafted Creative Notebook
   Palette: Warm notebook cream (#FAF5E8), Ink (#1B1917), Coral (#E8684A), Cobalt (#2F5BEA)
   ============================================================================ */
const FarazKayanVentureCard: React.FC<{ venture: VentureData }> = ({ venture }) => {
  const [apiResponse, setApiResponse] = useState<LatestReleaseResponse | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let active = true;
    loadLatestReleaseOnce().then((payload) => {
      if (!active || !payload) return;
      setApiResponse(payload);
    });
    return () => {
      active = false;
    };
  }, []);

  const offering: FeaturedOfferingViewModel | null = resolveFeaturedOfferingViewModel(
    venture.featuredOffering,
    apiResponse,
  );

  useEffect(() => {
    setImageFailed(false);
  }, [offering?.imageUrl]);

  return (
    <article
      aria-labelledby="venture-faraz-title"
      className="group relative h-full rounded-2xl sm:rounded-3xl bg-[#FAF5E8] border-2 border-[#1B1917] p-4 sm:p-6 flex flex-col justify-between gap-4 sm:gap-5 shadow-[4px_4px_0px_rgba(255,255,255,0.12)] transition-transform duration-200"
    >
      {/* Subtle dot-grid creative notebook paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl opacity-55"
        style={{
          backgroundImage: 'radial-gradient(rgba(27,25,23,0.13) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Playful sage-lime masking / washi tape strip along top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-2.5 right-8 sm:right-12 w-16 h-5 bg-[#CFE28C]/90 border border-[#1B1917]/70 -rotate-2 shadow-[1px_1px_0px_rgba(27,25,23,0.25)]"
      />

      <div className="relative z-10 space-y-3 sm:space-y-4">
        {/* Top Notebook Margin Strip */}
        <div className="flex items-center justify-between gap-3 border-b border-dashed border-[#1B1917]/20 pb-2.5">
          <div className="min-w-0 flex-1 flex items-center gap-1.5 text-[11px] font-mono text-[#57534E]">
            {/* Small hand-drawn coral asterisk doodle */}
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              className="text-[#E8684A] shrink-0"
            >
              <path
                d="M8 1.5V14.5M2.3 4.7L13.7 11.3M13.7 4.7L2.3 11.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="truncate">{venture.category}</span>
          </div>
          <span className="text-[11px] font-mono text-[#57534E] shrink-0">
            {venture.num}
          </span>
        </div>

        {/* Brand Name + Hand-drawn Squiggle Underline */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <h3
              id="venture-faraz-title"
              className="text-2xl sm:text-[1.95rem] font-bold tracking-tight text-[#1B1917] font-display leading-none"
            >
              {venture.name}
            </h3>
            {venture.subtitle && (
              <span className="relative inline-block text-sm font-semibold text-[#2F5BEA] font-display pb-1">
                {venture.subtitle}
                {/* Hand-drawn coral squiggle underline */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 10"
                  fill="none"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-0.5 w-full h-[7px] text-[#E8684A]"
                >
                  <path
                    d="M2 6.5C14 1.5 26 8.5 38 4.5C50 0.5 62 8.5 74 4.5C86 0.5 98 8 118 4"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-mono text-[#57534E]">
              {venture.domain}
            </p>
            <span
              style={{ fontFamily: '"Caveat", cursive' }}
              className="text-base sm:text-lg font-semibold text-[#E8684A] -rotate-2 select-none"
            >
              crafted by hand ✎
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-[15px] leading-relaxed text-[#292524] font-normal">
          {venture.description}
        </p>

        {/* Handwritten Note + Arrow + Dynamic Latest Published Product */}
        {offering && (
          <div className="pt-1 space-y-1.5">
            <div className="flex items-center gap-1.5 pl-1">
              <span
                style={{ fontFamily: '"Caveat", cursive' }}
                className="text-[17px] leading-none font-semibold text-[#2F5BEA]"
              >
                psst... check out the latest
              </span>
              {/* Hand-drawn curved arrow doodle pointing down-right */}
              <svg
                aria-hidden="true"
                width="26"
                height="16"
                viewBox="0 0 28 18"
                fill="none"
                className="text-[#2F5BEA] translate-y-0.5"
              >
                <path
                  d="M2 4C11 3 18 6 22 14M22 14L17 12.5M22 14L24.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <a
              href={offering.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${offering.name} — ${offering.subtitle} (opens in a new tab)`}
              className="group/kit flex items-center gap-3 sm:gap-3.5 rounded-xl bg-[#FFFDF8] border-[1.5px] border-[#1B1917] p-2.5 sm:p-3 shadow-[3px_3px_0px_#1B1917] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1B1917] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5BEA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF5E8]"
            >
              {/* Actual Product Cover Thumbnail */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden border border-[#1B1917]/20 bg-[#FAF5E8] -rotate-2 group-hover/kit:rotate-0 transition-transform duration-200 flex items-center justify-center">
                {offering.imageUrl && !imageFailed ? (
                  <img
                    src={offering.imageUrl}
                    alt={offering.imageAlt}
                    width="72"
                    height="72"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setImageFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="text-xs font-mono font-bold text-[#1B1917]/60 select-none"
                  >
                    {offering.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#2F5BEA] font-semibold">
                  {offering.label}
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm sm:text-[15px] font-bold text-[#1B1917] font-display truncate group-hover/kit:text-[#2F5BEA] transition-colors">
                    {offering.name}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 shrink-0 text-[#1B1917] group-hover/kit:text-[#2F5BEA] transition-transform group-hover/kit:translate-x-0.5 group-hover/kit:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-xs text-[#57534E] block truncate">
                  {offering.subtitle}
                </span>
              </div>
            </a>
          </div>
        )}
      </div>

      {/* Primary Action Row */}
      <div className="relative z-10 pt-3 border-t border-dashed border-[#1B1917]/20 flex items-center justify-between gap-3">
        <a
          href={venture.primaryAction.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={venture.primaryAction.ariaLabel}
          className="group/link inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F5BEA] hover:bg-[#244BC8] text-white border-[1.5px] border-[#1B1917] shadow-[3px_3px_0px_#1B1917] hover:shadow-[2px_2px_0px_#1B1917] hover:translate-x-[1px] hover:translate-y-[1px] px-5 py-2.5 text-xs font-mono font-semibold transition-all min-h-[44px] w-full sm:w-auto touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B1917] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF5E8]"
        >
          <span>{venture.primaryAction.label}</span>
          <ArrowUpRight
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>

        {/* Small hand-drawn 4-point star doodle */}
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="hidden sm:block text-[#E8684A] shrink-0"
        >
          <path
            d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </article>
  );
};

/* ============================================================================
   VINTAGE SHOPFRONT ARCHITECTURE
   Cohesive painted fascia sign, projecting striped scalloped awning,
   mullioned window bays, and timber sill plinth.
   ============================================================================ */
const SCALLOP_VALANCE_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='32' viewBox='0 0 48 32'%3E%3Cpath d='M0 0 H48 V18 Q36 31 24 18 Q12 31 0 18 Z' fill='white'/%3E%3C/svg%3E")`;

const StorefrontFascia: React.FC = () => (
  <div className="relative z-10 mx-1 sm:mx-2">
    {/* Stepped timber cornice crown */}
    <div
      aria-hidden="true"
      className="h-2.5 sm:h-3 mx-1 sm:mx-2 rounded-t-[3px] bg-gradient-to-b from-[#655746] via-[#473D31] to-[#2B251E] border-x border-t border-[#7E6E59]/45 shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
    />

    {/* Painted heritage shop signboard */}
    <div className="relative bg-[#221F1B] border-x-2 border-t-2 border-[#4B4135] px-5 py-3.5 sm:px-8 sm:py-4.5 shadow-[inset_0_1px_0_rgba(244,235,218,0.08),inset_0_-10px_22px_rgba(0,0,0,0.5)]">
      {/* Subtle satin painted-wood sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(244,235,218,0.045)_0%,transparent_48%,rgba(0,0,0,0.24)_100%)]"
      />

      {/* Inner painted cream/brass border rule & corner mounting pins */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 sm:inset-2.5 border border-[#D7C6A2]/25"
      >
        <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-[#C9B382]/60" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#C9B382]/60" />
        <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-[#C9B382]/60" />
        <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#C9B382]/60" />
      </div>

      <div className="relative z-10">
        <h2
          id="ventures-heading"
          style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          className="text-[1.95rem] xs:text-[2.25rem] sm:text-4xl lg:text-[2.65rem] leading-[1.03] tracking-[0.015em] text-[#F4EBDA] font-normal [text-shadow:0_2px_1px_rgba(0,0,0,0.75)]"
        >
          Ventures &amp; Independent Work
        </h2>
      </div>
    </div>
  </div>
);

const StorefrontAwning: React.FC = () => (
  <div aria-hidden="true" className="relative z-20 select-none">
    {/* Iron & brass awning roller rail */}
    <div className="mx-1 sm:mx-2 h-2 bg-gradient-to-b from-[#5E5244] via-[#2C2620] to-[#171411] border-x border-[#736453]/45 shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />

    {/* Projecting sloped canvas canopy body */}
    <div className="relative mx-0.5 sm:mx-0">
      {/* Left & right iron side-bracket silhouettes */}
      <div className="hidden sm:block absolute -bottom-1 left-2 w-2.5 h-5 bg-gradient-to-b from-[#3A332B] to-[#181512] border border-[#5B5044]/40 -skew-x-12 opacity-85" />
      <div className="hidden sm:block absolute -bottom-1 right-2 w-2.5 h-5 bg-gradient-to-b from-[#3A332B] to-[#181512] border border-[#5B5044]/40 skew-x-12 opacity-85" />

      <div
        className="relative h-10 xs:h-11 sm:h-12 w-full overflow-hidden border-t border-[#4B3028]/60"
        style={{
          clipPath: 'polygon(0.9% 0%, 99.1% 0%, 100% 100%, 0% 100%)',
          backgroundImage: [
            // Soft sunlit depth from top roller down toward front valance seam
            'linear-gradient(180deg, rgba(16,12,10,0.40) 0%, rgba(255,248,232,0.11) 46%, rgba(16,12,10,0.08) 84%, rgba(16,12,10,0.28) 100%)',
            // Subtle fabric rib / pleat shading aligned every 24px
            'repeating-linear-gradient(90deg, rgba(0,0,0,0.10) 0px, rgba(0,0,0,0.10) 1px, rgba(255,248,232,0.09) 10px, rgba(0,0,0,0.11) 24px)',
            // Woven canvas micro-texture
            'repeating-linear-gradient(0deg, rgba(22,16,12,0.06) 0px, rgba(22,16,12,0.06) 1px, transparent 1px, transparent 3px)',
            // Alternating vintage burgundy & warm aged cream stripes (24px / 24px = 48px cycle)
            'repeating-linear-gradient(90deg, #7C332B 0px, #7C332B 24px, #ECE0C4 24px, #ECE0C4 48px)',
          ].join(', '),
        }}
      >
        {/* Side awning return shadows to convey projection depth */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/35 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/35 to-transparent" />
        {/* Stitched front valance seam highlight */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-b from-[#3A221D]/45 to-[#F7EEDB]/35" />
      </div>
    </div>

    {/* Hanging scalloped valance with real drop shadow onto window lintel */}
    <div className="relative mx-0.5 sm:mx-0 -mt-[1px] [filter:drop-shadow(0_9px_10px_rgba(0,0,0,0.62))]">
      <div
        className="relative h-6 sm:h-7 w-full"
        style={{
          WebkitMaskImage: SCALLOP_VALANCE_MASK,
          WebkitMaskRepeat: 'repeat-x',
          WebkitMaskSize: '48px 100%',
          maskImage: SCALLOP_VALANCE_MASK,
          maskRepeat: 'repeat-x',
          maskSize: '48px 100%',
          backgroundImage: [
            'linear-gradient(180deg, rgba(16,12,10,0.26) 0%, rgba(255,250,238,0.06) 45%, rgba(16,12,10,0.24) 100%)',
            'repeating-linear-gradient(90deg, rgba(0,0,0,0.09) 0px, rgba(0,0,0,0.09) 1px, rgba(255,248,232,0.07) 10px, rgba(0,0,0,0.10) 24px)',
            'repeating-linear-gradient(0deg, rgba(22,16,12,0.05) 0px, rgba(22,16,12,0.05) 1px, transparent 1px, transparent 3px)',
            'repeating-linear-gradient(90deg, #7C332B 0px, #7C332B 24px, #ECE0C4 24px, #ECE0C4 48px)',
          ].join(', '),
        }}
      >
        {/* Piped bias-tape edge trim traced along every scallop */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="ventures-scallop-piping"
              width="48"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 18 Q12 31 24 18 Q36 31 48 18"
                fill="none"
                stroke="#DFD0AF"
                strokeWidth="1.6"
                strokeOpacity="0.82"
              />
              <path
                d="M0 16.5 Q12 29.5 24 16.5 Q36 29.5 48 16.5"
                fill="none"
                stroke="#3A221D"
                strokeWidth="0.8"
                strokeOpacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ventures-scallop-piping)" />
        </svg>
      </div>
    </div>

    {/* Soft cast canopy shadow resting on the upper window transom */}
    <div className="mx-1 sm:mx-2 h-4 -mt-2.5 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />
  </div>
);

interface ShopWindowBayProps {
  bayLabel: string;
  children: React.ReactNode;
}

const ShopWindowBay: React.FC<ShopWindowBayProps> = ({ bayLabel, children }) => (
  <div className="relative flex flex-col">
    {/* Painted timber transom header plate above each shop window */}
    <div className="mx-3 sm:mx-4 mb-1.5 flex items-center justify-between gap-2 text-[11px] font-mono text-[#B8AB92]">
      <span className="truncate">{bayLabel}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-[#4B4136]/75" />
    </div>

    {/* Recessed wooden shopfront window frame */}
    <div className="relative flex-1 rounded-[20px] sm:rounded-[26px] bg-[#211D18] border border-[#4D4337]/90 p-1.5 sm:p-2.5 pt-2.5 sm:pt-3 shadow-[inset_0_3px_12px_rgba(0,0,0,0.72),0_1px_0_rgba(244,235,218,0.06)]">
      {/* Subtle architectural window glass sheen across upper corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[20px] sm:rounded-[26px] bg-[linear-gradient(135deg,rgba(244,235,218,0.045)_0%,transparent_34%)]"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  </div>
);

export const VenturesSection: React.FC = () => {
  const sawah = ventures.find((v) => v.id === 'sawah')!;
  const farazKayan = ventures.find((v) => v.id === 'faraz-kayan-digital')!;

  return (
    <section
      id="ventures"
      aria-labelledby="ventures-heading"
      className="scroll-mt-24 sm:scroll-mt-28 py-12 sm:py-14 lg:py-16 px-4 xs:px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full relative overflow-x-clip border-t border-zinc-900/60"
    >
      {/* Subtle warm ambient atmosphere behind the shopfront */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(236,224,196,0.035)_0%,transparent_65%)]"
      />

      <div className="space-y-5 sm:space-y-6">
        {/* Portfolio Section Index Strip */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="text-[#E8684A] font-semibold" aria-hidden="true">✦</span>
            <span className="text-zinc-700">/</span>
            <span className="uppercase tracking-widest text-zinc-300 font-medium">
              Ventures
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
            From ideas to real offerings
          </span>
        </div>

        {/* ====================================================
            COHESIVE VINTAGE SHOPFRONT ELEVATION
            1. Painted Fascia Signboard
            2. Projecting Striped & Scalloped Fabric Awning
            3. Timber-Framed Two-Bay Shop Display Windows
            4. Painted Window Sill & Wainscot Plinth
            ==================================================== */}
        <div className="relative">
          <StorefrontFascia />
          <StorefrontAwning />

          {/* Shopfront Surround & Mullioned Display Windows */}
          <div className="relative z-10 mx-1 sm:mx-2 -mt-2 bg-[#1A1714] border-x-2 border-[#463D32] px-2 pt-3.5 pb-4 sm:px-5 sm:pt-5 sm:pb-5 shadow-[inset_0_12px_28px_rgba(0,0,0,0.55)]">
            {/* Subtle warm interior window-bay ambient wash */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(237,225,200,0.04)_0%,transparent_72%)]"
            />

            {/* Subtle center wooden pilaster mullion between the two display bays on md+ */}
            <div
              aria-hidden="true"
              className="hidden md:block pointer-events-none absolute top-9 bottom-5 left-1/2 -translate-x-1/2 w-2.5 bg-gradient-to-r from-[#262019] via-[#3A3229] to-[#211C16] border-x border-[#54493C]/50 shadow-[0_0_12px_rgba(0,0,0,0.55)]"
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7 items-stretch">
              <ShopWindowBay bayLabel="Window 01 · Custom Framing">
                <SawahVentureCard venture={sawah} />
              </ShopWindowBay>

              <ShopWindowBay bayLabel="Window 02 · Stationery & Digital">
                <FarazKayanVentureCard venture={farazKayan} />
              </ShopWindowBay>
            </div>
          </div>

          {/* Projecting Wooden Window Sill Ledge */}
          <div
            aria-hidden="true"
            className="relative z-20 mx-0.5 sm:mx-1 h-3 bg-gradient-to-b from-[#594D3F] via-[#3F352B] to-[#262019] border-y border-[#726350]/55 shadow-[0_6px_14px_rgba(0,0,0,0.55)] rounded-[2px]"
          />

          {/* Painted Timber Wainscot Apron Plinth */}
          <div
            aria-hidden="true"
            className="relative z-10 mx-1 sm:mx-2 bg-[#171411] border-x-2 border-b-2 border-[#3C342B] rounded-b-lg h-3 sm:h-3.5"
          />
        </div>
      </div>
    </section>
  );
};

export default VenturesSection;
