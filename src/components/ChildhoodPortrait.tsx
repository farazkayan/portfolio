import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { PARTICLE_COUNT, MORPH_DATA } from '../data/halftoneMorphData';

interface ChildhoodPortraitProps {
  className?: string;
}

export const ChildhoodPortrait: React.FC<ChildhoodPortraitProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const animProgressRef = useRef({ progress: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // -------------------------------------------------------------------------
  // High-performance batched Path2D frame renderer (runs buttery-smooth 60+ FPS)
  // -------------------------------------------------------------------------
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const t = animProgressRef.current.progress;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 720;
    const height = 960;

    // Reset transform & clear canvas with warm darkroom paper tone
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#eae6de';
    ctx.fillRect(0, 0, width, height);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Radial stagger window: waves out from center
    const staggerWindow = 0.38;
    const invWindow = 1 - staggerWindow;

    // Ink palettes
    const baseColor = '#101827';
    const scatterColor = '#3b1d5a'; // subtle kinetic violet warmth during peak flight

    // Batch circles into two Path2D instances for sub-millisecond drawing
    const basePath = new Path2D();
    const scatterPath = new Path2D();
    let hasScatter = false;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 9;
      const x1 = MORPH_DATA[idx];
      const y1 = MORPH_DATA[idx + 1];
      const r1 = MORPH_DATA[idx + 2];
      const x2 = MORPH_DATA[idx + 3];
      const y2 = MORPH_DATA[idx + 4];
      const r2 = MORPH_DATA[idx + 5];
      const sx = MORPH_DATA[idx + 6];
      const sy = MORPH_DATA[idx + 7];
      const delay = MORPH_DATA[idx + 8];

      // Local particle progress with radial delay
      const localT = Math.max(0, Math.min(1, (t - delay * staggerWindow) / invWindow));

      // Organic ease curve with momentum (cubic in-out)
      const ease = localT < 0.5
        ? 4 * localT * localT * localT
        : 1 - Math.pow(-2 * localT + 2, 3) / 2;

      // Parabolic flight arc
      const arc = prefersReducedMotion ? 0 : Math.sin(localT * Math.PI);

      const x = x1 + (x2 - x1) * ease + sx * arc;
      const y = y1 + (y2 - y1) * ease + sy * arc;
      const r = Math.max(0, r1 + (r2 - r1) * ease);

      if (r > 0.15) {
        if (arc > 0.35) {
          hasScatter = true;
          scatterPath.moveTo(x + r, y);
          scatterPath.arc(x, y, r, 0, Math.PI * 2);
        } else {
          basePath.moveTo(x + r, y);
          basePath.arc(x, y, r, 0, Math.PI * 2);
        }
      }
    }

    ctx.fillStyle = baseColor;
    ctx.fill(basePath);

    if (hasScatter) {
      ctx.fillStyle = scatterColor;
      ctx.fill(scatterPath);
    }
  }, []);

  // -------------------------------------------------------------------------
  // Handle Canvas Resize, DPR, and Initial Paint
  // -------------------------------------------------------------------------
  useEffect(() => {
    const handleCanvasSetup = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(720 * dpr);
      canvas.height = Math.round(960 * dpr);

      renderFrame();
    };

    handleCanvasSetup();
    window.addEventListener('resize', handleCanvasSetup, { passive: true });

    return () => {
      window.removeEventListener('resize', handleCanvasSetup);
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
    };
  }, [renderFrame]);

  // -------------------------------------------------------------------------
  // Parallax on mouse move
  // -------------------------------------------------------------------------
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouchDevice) return;

    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      targetX = normX * 4;
      targetY = normY * 4;
      if (!rafId) rafId = requestAnimationFrame(updateParallax);
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      if (container) {
        container.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`);
        container.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`);
      }
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(updateParallax);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // -------------------------------------------------------------------------
  // Morph Transition Trigger using GSAP
  // -------------------------------------------------------------------------
  const triggerMorph = useCallback((toHoverState: boolean) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 0.35 : 1.15;
    const targetValue = toHoverState ? 1 : 0;

    setIsHovered(toHoverState);
    setIsAnimating(true);

    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    tweenRef.current = gsap.to(animProgressRef.current, {
      progress: targetValue,
      duration,
      ease: 'power3.out',
      onUpdate: renderFrame,
      onComplete: () => {
        setIsAnimating(false);
        renderFrame();
      },
    });
  }, [renderFrame]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      triggerMorph(true);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      triggerMorph(false);
    }
  };

  const handleClick = () => {
    // Allows intentional tap-to-toggle on mobile and touchscreens
    triggerMorph(!isHovered);
  };

  return (
    <div
      ref={containerRef}
      className={`group relative select-none transition-transform duration-500 ease-out ${className}`}
      style={{
        transform: 'translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0)',
      }}
    >
      {/* Soft ambient violet glow behind the portrait card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 sm:-inset-3 -z-10 rounded-[2rem] bg-purple-500/12 blur-2xl transition-opacity duration-500 group-hover:bg-purple-500/25"
      />

      {/* Main Photo Card Container */}
      <div
        className={`photo-card relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f4f1ea] border border-white/20 p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-all duration-300 group-hover:shadow-[0_25px_60px_rgba(192,132,252,0.2)] group-hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141418] ${
          isAnimating ? 'will-change-transform' : ''
        }`}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Interactive morphing halftone childhood portrait. Hover, tap, or press Enter to transform."
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerMorph(!isHovered);
          }
        }}
      >
        <span className="sr-only">
          Interactive halftone portrait of Faraz as a child, morphing between two states.
        </span>

        {/* Subtle halftone paper texture overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:6px_6px] opacity-70 z-10"
        />

        {/* 60FPS Halftone Morphing Canvas with fixed aspect ratio */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#eae6de]">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Minimal editorial caption with micro-interaction */}
        <div className="mt-2 sm:mt-2.5 flex items-center justify-between px-1 text-[10px] sm:text-[11px] font-mono select-none">
          <span className="tracking-widest uppercase text-zinc-700 font-medium transition-colors duration-300 group-hover:text-purple-900">
            ME
          </span>
          <span className="text-zinc-500 tracking-wider text-[9px] uppercase transition-opacity duration-300 opacity-60 group-hover:opacity-100">
            {isHovered ? 'State II' : 'Hover / Tap'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChildhoodPortrait;
