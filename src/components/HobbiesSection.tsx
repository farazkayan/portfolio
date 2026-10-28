import React, { useEffect, useRef, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { Camera, Gamepad2, Tv, Compass } from 'lucide-react';

// ------------------------------------------------------------
// Official Rive Cat Component
// Source asset: cat-following-the-mouse.riv
// Tracks cursor ONLY while inside the Cats card.
// ------------------------------------------------------------
interface RiveCatProps {
  isHobbiesVisible: boolean;
  cardRef: React.RefObject<HTMLElement | null>;
}

const RIVE_STATE_MACHINE = 'State Machine 1';

const RiveCat: React.FC<RiveCatProps> = ({
  isHobbiesVisible,
  cardRef,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const latestPos = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);
  const isPointerInside = useRef(false);

  const { rive, RiveComponent } = useRive({
    src: '/cat-following-the-mouse.riv',
    stateMachines: RIVE_STATE_MACHINE,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  // ----------------------------------------------------------
  // Diagnostic: confirm the state machine exists
  // ----------------------------------------------------------
  useEffect(() => {
    if (!rive) return;

    const availableMachines = rive.stateMachineNames;

    if (!availableMachines.includes(RIVE_STATE_MACHINE)) {
      console.warn(
        `[Hobbies/RiveCat] State machine "${RIVE_STATE_MACHINE}" was not found.`,
        {
          availableStateMachines: availableMachines,
        }
      );
    }
  }, [rive]);

  // ----------------------------------------------------------
  // Send an actual mouse event to the Rive canvas.
  // Rive listens for mousemove / mouseover / mouseout.
  // ----------------------------------------------------------
  const dispatchToRive = (
    clientX: number,
    clientY: number,
    type: 'mouseover' | 'mousemove' | 'mouseout'
  ) => {
    if (!containerRef.current) return;

    const canvas = containerRef.current.querySelector(
      'canvas'
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    const event = new MouseEvent(type, {
      clientX,
      clientY,
      bubbles: true,
      cancelable: true,
      view: window,
      buttons: 0,
    });

    canvas.dispatchEvent(event);
  };

  // ----------------------------------------------------------
  // Track ONLY inside the Cats card
  // ----------------------------------------------------------
  useEffect(() => {
    if (!isHobbiesVisible || !rive || !cardRef.current) return;

    const card = cardRef.current;

    const updateRivePosition = () => {
      rafId.current = null;

      if (
        !latestPos.current ||
        !containerRef.current ||
        !isPointerInside.current
      ) {
        return;
      }

      const canvas = containerRef.current.querySelector(
        'canvas'
      ) as HTMLCanvasElement | null;

      if (!canvas) return;

      const cardRect = card.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();

      if (
        cardRect.width <= 0 ||
        cardRect.height <= 0 ||
        canvasRect.width <= 0 ||
        canvasRect.height <= 0
      ) {
        return;
      }

      // Normalize mouse position inside the Cats card.
      const normalizedX = Math.max(
        0,
        Math.min(
          1,
          (latestPos.current.x - cardRect.left) / cardRect.width
        )
      );

      const normalizedY = Math.max(
        0,
        Math.min(
          1,
          (latestPos.current.y - cardRect.top) / cardRect.height
        )
      );

      // Keep the synthetic cursor comfortably inside the Rive canvas.
      const riveX = 0.12 + normalizedX * 0.76;
      const riveY = 0.12 + normalizedY * 0.76;

      const targetX =
        canvasRect.left + canvasRect.width * riveX;

      const targetY =
        canvasRect.top + canvasRect.height * riveY;

      dispatchToRive(targetX, targetY, 'mousemove');
    };

    // --------------------------------------------------------
    // A mouse or touch pointer enters the Cats card.
    // --------------------------------------------------------
    const handlePointerEnter = (event: PointerEvent) => {
      isPointerInside.current = true;

      latestPos.current = {
        x: event.clientX,
        y: event.clientY,
      };

      const canvas = containerRef.current?.querySelector(
        'canvas'
      ) as HTMLCanvasElement | null;

      if (!canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const normalizedX = Math.max(
        0,
        Math.min(
          1,
          (event.clientX - cardRect.left) / cardRect.width
        )
      );

      const normalizedY = Math.max(
        0,
        Math.min(
          1,
          (event.clientY - cardRect.top) / cardRect.height
        )
      );

      const targetX =
        canvasRect.left +
        canvasRect.width *
          (0.12 + normalizedX * 0.76);

      const targetY =
        canvasRect.top +
        canvasRect.height *
          (0.12 + normalizedY * 0.76);

      // Tell Rive the cursor just entered.
      dispatchToRive(targetX, targetY, 'mouseover');

      // Immediately give Rive the current mouse position.
      dispatchToRive(targetX, targetY, 'mousemove');
    };

    // --------------------------------------------------------
    // Coalesce pointer movement to one Rive update per animation frame.
    // --------------------------------------------------------
    const handlePointerMove = (event: PointerEvent) => {
      if (!isPointerInside.current) return;

      latestPos.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (rafId.current === null) {
        rafId.current =
          requestAnimationFrame(updateRivePosition);
      }
    };

    // --------------------------------------------------------
    // Reset the gaze when a pointer leaves or a touch is cancelled.
    // --------------------------------------------------------
    const handlePointerLeave = () => {
      isPointerInside.current = false;
      latestPos.current = null;

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      const canvas = containerRef.current?.querySelector(
        'canvas'
      ) as HTMLCanvasElement | null;

      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      dispatchToRive(
        rect.left - 100,
        rect.top - 100,
        'mouseout'
      );
    };

    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);
    card.addEventListener('pointercancel', handlePointerLeave);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      card.removeEventListener(
        'pointerenter',
        handlePointerEnter
      );

      card.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      card.removeEventListener(
        'pointerleave',
        handlePointerLeave
      );
      card.removeEventListener('pointercancel', handlePointerLeave);
    };
  }, [isHobbiesVisible, rive, cardRef]);

  return (
    <div
      className="
        absolute bottom-4 right-4 z-0
        h-[clamp(7rem,22vw,10rem)] w-[clamp(7rem,22vw,10rem)]
        overflow-hidden rounded-[1.4rem] sm:rounded-[1.7rem]
        border border-amber-400/25 bg-[radial-gradient(circle_at_50%_38%,rgba(245,158,11,0.12),rgba(12,12,14,0.2)_68%)]
        shadow-[0_12px_32px_rgba(0,0,0,0.38)]
        flex items-center justify-center select-none
        group-hover:border-amber-400/45 transition-colors duration-300
      "
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        className="
          h-[135%] w-[135%]
          shrink-0
          pointer-events-none
          flex
          items-center
          justify-center
        "
      >
        <RiveComponent className="w-full h-full" />
      </div>
    </div>
  );
};

// ------------------------------------------------------------
// Cats Card
// ------------------------------------------------------------
interface CatsCardProps {
  isHobbiesVisible: boolean;
}

const CatsCard: React.FC<CatsCardProps> = ({
  isHobbiesVisible,
}) => {
  const cardRef = useRef<HTMLElement | null>(null);

  return (
    <article
      ref={cardRef}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        sm:rounded-3xl
        bg-[#1c1c22]/95
        border
        border-zinc-800/90
        p-5
        sm:p-8
        flex
        flex-col
        justify-between
        space-y-4
        sm:space-y-6
        shadow-[0_12px_40px_rgba(0,0,0,0.35)]
        transition-all
        duration-300
        hover:border-amber-500/40
        hover:bg-[#22222a]
      "
    >
      {/* Background Rive Cat */}
      <RiveCat
        isHobbiesVisible={isHobbiesVisible}
        cardRef={cardRef}
      />

      {/* Card Header & Icon */}
      <div
        className="
          space-y-3
          sm:space-y-4
          relative
          z-20
          pointer-events-none
        "
      >
        <div className="flex items-center justify-between">
          <div
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-2xl
              bg-amber-950/30
              border
              border-amber-500/30
              flex
              items-center
              justify-center
              text-amber-400
              group-hover:border-amber-500/50
              group-hover:bg-amber-950/50
              transition-all
              duration-300
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <path d="M12 5c-4 0-7.5 2.5-7.5 7 0 4.5 3.5 7 7.5 7s7.5-2.5 7.5-7c0-4.5-3.5-7-7.5-7z" />
              <path d="M4.5 12c-.5-1.5-.5-5 2-8l4 2.5" />
              <path d="M19.5 12c.5-1.5-.5-5-2-8l-4 2.5" />
              <circle
                cx="9"
                cy="12"
                r="1"
                fill="currentColor"
              />
              <circle
                cx="15"
                cy="12"
                r="1"
                fill="currentColor"
              />
              <path d="M11 15h2" />
            </svg>
          </div>

          <span
            className="
              text-[11px]
              font-mono
              text-zinc-500
              font-medium
              group-hover:text-amber-400
              transition-colors
              relative
              z-20
            "
          >
            01
          </span>
        </div>

        <div className="space-y-1">
          <h3
            className="
              text-xl
              xs:text-2xl
              sm:text-3xl
              font-medium
              tracking-tight
              text-white
              font-display
            "
          >
            Cats
          </h3>

          <span
            className="
              text-[10.5px]
              sm:text-[11px]
              font-mono
              text-amber-400/90
              uppercase
              tracking-wider
              block
            "
          >
            Warm &amp; Playful
          </span>
        </div>
      </div>

      {/* Card Body */}
      <p
        className="
          text-xs
          sm:text-base
          text-zinc-300
          font-display
          leading-relaxed
          relative
          z-10
          pointer-events-none
          max-w-[18rem]
          pr-[5.5rem]
          sm:max-w-[17rem]
          md:pr-[6.5rem]
          xl:pr-0
        "
      >
        I love cats. That’s basically the whole explanation.
      </p>
    </article>
  );
};

// ------------------------------------------------------------
// Main Hobbies Section
// ------------------------------------------------------------
interface HobbiesSectionProps {
  onExplorePhotography?: () => void;
}

export const HobbiesSection: React.FC<HobbiesSectionProps> = ({
  onExplorePhotography,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // ----------------------------------------------------------
  // Detect when Hobbies enters the viewport
  // ----------------------------------------------------------
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '100px 0px 100px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hobbies"
      className="
        scroll-mt-24
        sm:scroll-mt-28
        py-20
        sm:py-24
        lg:py-28
        px-4
        xs:px-5
        sm:px-8
        lg:px-12
        max-w-6xl
        mx-auto
        w-full
        relative
        overflow-hidden
      "
    >
      {/* ------------------------------------------------------
          Subtle Destination Atmosphere
          ------------------------------------------------------ */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,191,36,0.025)_0%,transparent_70%)]
        "
      />

      <div className="space-y-9 sm:space-y-12">
        {/* ====================================================
            SECTION HEADER
            ==================================================== */}
        <div className="space-y-3">
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-zinc-900
              pb-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-mono
                text-zinc-500
              "
            >
              <span className="text-zinc-400 font-semibold">
                06
              </span>

              <span className="text-zinc-700">/</span>

              <span
                className="
                  uppercase
                  tracking-widest
                  text-zinc-300
                  font-medium
                "
              >
                Hobbies
              </span>
            </div>

            <span
              className="
                text-xs
                font-mono
                text-zinc-500
                hidden
                sm:inline
              "
            >
              Beyond the terminal
            </span>
          </div>

          <div className="space-y-1 sm:space-y-1.5">
            <h2
              className="
                text-2xl
                xs:text-3xl
                sm:text-4xl
                lg:text-5xl
                font-medium
                tracking-tight
                text-white
                font-display
              "
            >
              Hobbies
            </h2>

            <p
              className="
                text-sm
                xs:text-base
                sm:text-lg
                text-zinc-400
                font-display
              "
            >
              Here’s what I do when I’m not building things.
            </p>
          </div>
        </div>

        {/* ====================================================
            2 + 3 CARD COMPOSITION
            ==================================================== */}
        <div className="space-y-4 sm:space-y-6">
          {/* ==================================================
              TOP ROW: TWO LARGE CARDS
              ================================================== */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
              sm:gap-6
            "
          >
            {/* ------------------------------------------------
                01 — CATS
                ------------------------------------------------ */}
            <CatsCard
              isHobbiesVisible={isVisible}
            />

            {/* ------------------------------------------------
                02 — PHOTOGRAPHY
                ------------------------------------------------ */}
            <article
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                sm:rounded-3xl
                bg-[#1c1c22]/95
                border
                border-zinc-800/90
                p-5
                sm:p-8
                flex
                flex-col
                justify-between
                space-y-4
                sm:space-y-6
                shadow-[0_12px_40px_rgba(0,0,0,0.35)]
                transition-all
                duration-300
                hover:border-sky-500/40
                hover:bg-[#22222a]
              "
            >
              {/* Faint Camera Viewfinder Watermark */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-4
                  -right-4
                  text-sky-500/[0.03]
                  group-hover:text-sky-500/[0.07]
                  transition-all
                  duration-500
                "
                aria-hidden="true"
              >
                <svg
                  width="150"
                  height="150"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    strokeDasharray="3 3"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="18"
                  />

                  <path d="M 20 30 L 20 20 L 30 20" />
                  <path d="M 80 30 L 80 20 L 70 20" />
                  <path d="M 20 70 L 20 80 L 30 80" />
                  <path d="M 80 70 L 80 80 L 70 80" />

                  <line
                    x1="50"
                    y1="42"
                    x2="50"
                    y2="58"
                  />

                  <line
                    x1="42"
                    y1="50"
                    x2="58"
                    y2="50"
                  />
                </svg>
              </div>

              {/* Card Header */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="
                      w-9
                      h-9
                      sm:w-10
                      sm:h-10
                      rounded-2xl
                      bg-sky-950/30
                      border
                      border-sky-500/30
                      flex
                      items-center
                      justify-center
                      text-sky-400
                      group-hover:border-sky-500/50
                      group-hover:bg-sky-950/50
                      transition-all
                      duration-300
                    "
                  >
                    <Camera
                      className="
                        w-4
                        h-4
                        sm:w-5
                        sm:h-5
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>

                  <span
                    className="
                      text-[11px]
                      font-mono
                      text-zinc-600
                      group-hover:text-sky-400/80
                      transition-colors
                    "
                  >
                    02
                  </span>
                </div>

                <div className="space-y-1">
                  <h3
                    className="
                      text-xl
                      xs:text-2xl
                      sm:text-3xl
                      font-medium
                      tracking-tight
                      text-white
                      font-display
                    "
                  >
                    Photography
                  </h3>

                  <span
                    className="
                      text-[10.5px]
                      sm:text-[11px]
                      font-mono
                      text-sky-400/90
                      uppercase
                      tracking-wider
                      block
                    "
                  >
                    Observational &amp; Calm
                  </span>
                </div>
              </div>

              {/* Card Body & CTA */}
              <div className="space-y-4 relative z-10">
                <p
                  className="
                    text-xs
                    sm:text-base
                    text-zinc-300
                    font-display
                    leading-relaxed
                  "
                >
                  Taking pictures of things and capturing moments
                  that just feel right.
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onExplorePhotography) {
                        onExplorePhotography();
                      } else {
                        window.history.pushState(null, '', '/photography');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }
                    }}
                    className="
                      group/cta
                      inline-flex
                      items-center
                      gap-2.5
                      px-4
                      py-2
                      rounded-xl
                      bg-sky-950/40
                      hover:bg-sky-900/60
                      border
                      border-sky-500/30
                      hover:border-sky-400/60
                      text-xs
                      sm:text-[13px]
                      font-mono
                      text-sky-300
                      hover:text-white
                      transition-all
                      cursor-pointer
                      min-h-[44px]
                      touch-manipulation
                      focus:outline-none
                      focus:ring-2
                      focus:ring-sky-400/60
                    "
                    aria-label="Explore photography collection"
                  >
                    <span className="font-medium">Explore photography</span>
                    <span className="transition-transform duration-200 group-hover/cta:translate-x-1 text-sky-400">
                      &rarr;
                    </span>
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* ==================================================
              BOTTOM ROW: THREE SMALLER CARDS
              ================================================== */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              gap-4
              sm:gap-6
            "
          >
            {/* ------------------------------------------------
                03 — GAMING
                ------------------------------------------------ */}
            <article
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                sm:rounded-3xl
                bg-[#1c1c22]/95
                border
                border-zinc-800/90
                p-5
                sm:p-7
                flex
                flex-col
                justify-between
                space-y-4
                sm:space-y-5
                shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                transition-all
                duration-300
                hover:border-emerald-500/40
                hover:bg-[#22222a]
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-3
                  -right-3
                  text-emerald-500/[0.03]
                  group-hover:text-emerald-500/[0.06]
                  transition-all
                  duration-500
                "
                aria-hidden="true"
              >
                <svg
                  width="110"
                  height="110"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="35"
                    y="15"
                    width="30"
                    height="70"
                    rx="6"
                  />

                  <rect
                    x="15"
                    y="35"
                    width="70"
                    height="30"
                    rx="6"
                  />
                </svg>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="
                      w-8
                      h-8
                      sm:w-9
                      sm:h-9
                      rounded-xl
                      bg-emerald-950/30
                      border
                      border-emerald-500/30
                      flex
                      items-center
                      justify-center
                      text-emerald-400
                      group-hover:border-emerald-500/50
                      group-hover:bg-emerald-950/50
                      transition-all
                      duration-300
                    "
                  >
                    <Gamepad2
                      className="
                        w-4
                        h-4
                        transition-transform
                        duration-300
                        group-hover:-rotate-6
                      "
                    />
                  </div>

                  <span
                    className="
                      text-[11px]
                      font-mono
                      text-zinc-600
                      group-hover:text-emerald-400/80
                      transition-colors
                    "
                  >
                    03
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <h3
                    className="
                      text-lg
                      xs:text-xl
                      sm:text-2xl
                      font-medium
                      tracking-tight
                      text-white
                      font-display
                    "
                  >
                    Gaming
                  </h3>

                  <span
                    className="
                      text-[10px]
                      sm:text-[10.5px]
                      font-mono
                      text-emerald-400/90
                      uppercase
                      tracking-wider
                      block
                    "
                  >
                    Relaxed &amp; Indie
                  </span>
                </div>
              </div>

              <p
                className="
                  text-xs
                  sm:text-[13.5px]
                  text-zinc-400
                  font-sans
                  leading-relaxed
                  relative
                  z-10
                "
              >
                Chill and indie games to unwind. Stray, Stardew
                Valley, Minecraft. No competitive stress.
              </p>
            </article>

            {/* ------------------------------------------------
                04 — ANIME
                ------------------------------------------------ */}
            <article
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                sm:rounded-3xl
                bg-[#1c1c22]/95
                border
                border-zinc-800/90
                p-5
                sm:p-7
                flex
                flex-col
                justify-between
                space-y-4
                sm:space-y-5
                shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                transition-all
                duration-300
                hover:border-rose-500/40
                hover:bg-[#22222a]
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-3
                  -right-3
                  text-rose-500/[0.03]
                  group-hover:text-rose-500/[0.06]
                  transition-all
                  duration-500
                "
                aria-hidden="true"
              >
                <svg
                  width="110"
                  height="110"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="15"
                    y="20"
                    width="70"
                    height="50"
                    rx="8"
                  />

                  <path d="M 35 78 L 65 78" />
                  <path d="M 50 70 L 50 78" />
                </svg>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="
                      w-8
                      h-8
                      sm:w-9
                      sm:h-9
                      rounded-xl
                      bg-rose-950/30
                      border
                      border-rose-500/30
                      flex
                      items-center
                      justify-center
                      text-rose-400
                      group-hover:border-rose-500/50
                      group-hover:bg-rose-950/50
                      transition-all
                      duration-300
                    "
                  >
                    <Tv
                      className="
                        w-4
                        h-4
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>

                  <span
                    className="
                      text-[11px]
                      font-mono
                      text-zinc-600
                      group-hover:text-rose-400/80
                      transition-colors
                    "
                  >
                    04
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <h3
                    className="
                      text-lg
                      xs:text-xl
                      sm:text-2xl
                      font-medium
                      tracking-tight
                      text-white
                      font-display
                    "
                  >
                    Anime
                  </h3>

                  <span
                    className="
                      text-[10px]
                      sm:text-[10.5px]
                      font-mono
                      text-rose-400/90
                      uppercase
                      tracking-wider
                      block
                    "
                  >
                    Stories &amp; Art
                  </span>
                </div>
              </div>

              <p
                className="
                  text-xs
                  sm:text-[13.5px]
                  text-zinc-400
                  font-sans
                  leading-relaxed
                  relative
                  z-10
                "
              >
                Great stories and beautiful animation. Just a nice
                way to disconnect from the terminal.
              </p>
            </article>

            {/* ------------------------------------------------
                05 — SIDE QUESTS
                ------------------------------------------------ */}
            <article
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                sm:rounded-3xl
                bg-[#1c1c22]/95
                border
                border-zinc-800/90
                p-5
                sm:p-7
                flex
                flex-col
                justify-between
                space-y-4
                sm:space-y-5
                shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                transition-all
                duration-300
                hover:border-purple-500/50
                hover:bg-[#22222a]
                sm:col-span-2
                md:col-span-1
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-3
                  -right-3
                  text-purple-500/[0.04]
                  group-hover:text-purple-500/[0.08]
                  transition-all
                  duration-500
                "
                aria-hidden="true"
              >
                <svg
                  width="110"
                  height="110"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    strokeDasharray="4 3"
                  />

                  <path d="M 50 10 L 50 90 M 10 50 L 90 50" />

                  <polygon
                    points="50,25 56,50 50,45 44,50"
                    fill="currentColor"
                  />

                  <polygon
                    points="50,75 56,50 50,55 44,50"
                  />
                </svg>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="
                      w-8
                      h-8
                      sm:w-9
                      sm:h-9
                      rounded-xl
                      bg-purple-950/40
                      border
                      border-purple-500/40
                      flex
                      items-center
                      justify-center
                      text-purple-400
                      group-hover:border-purple-500/60
                      group-hover:bg-purple-950/60
                      transition-all
                      duration-300
                    "
                  >
                    <Compass
                      className="
                        w-4
                        h-4
                        transition-transform
                        duration-500
                        group-hover:rotate-45
                      "
                    />
                  </div>

                  <span
                    className="
                      text-[11px]
                      font-mono
                      text-zinc-600
                      group-hover:text-purple-400/80
                      transition-colors
                    "
                  >
                    05
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <h3
                    className="
                      text-lg
                      xs:text-xl
                      sm:text-2xl
                      font-medium
                      tracking-tight
                      text-white
                      font-display
                    "
                  >
                    Side Quests
                  </h3>

                  <span
                    className="
                      text-[10px]
                      sm:text-[10.5px]
                      font-mono
                      text-purple-300
                      uppercase
                      tracking-wider
                      block
                    "
                  >
                    Curiosity &amp; Exploration
                  </span>
                </div>
              </div>

              <blockquote
                className="
                  border-l
                  border-purple-500/60
                  pl-3
                  py-0.5
                  relative
                  z-10
                "
              >
                <p
                  className="
                    text-xs
                    sm:text-[13.5px]
                    text-zinc-300
                    font-display
                    italic
                    leading-relaxed
                  "
                >
                  &ldquo;That sounds cool. I have the time and
                  tools. Why not?&rdquo;
                </p>
              </blockquote>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;
