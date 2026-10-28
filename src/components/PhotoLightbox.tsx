import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Loader2, ArrowUpRight } from 'lucide-react';
import { PhotoItem } from '../data/photographyData';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  allPhotos: PhotoItem[];
  onClose: () => void;
  onNavigate: (photo: PhotoItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  allPhotos,
  onClose,
  onNavigate,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Keep track of the currently focused element to restore on exit
  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    return () => {
      previousActiveElement.current?.focus();
    };
  }, []);

  // Lock background scrolling
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Reset loading state whenever the active photo changes
  useEffect(() => {
    if (photo) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [photo?.id]);

  const currentIndex = photo
    ? allPhotos.findIndex((p) => p.id === photo.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex <= 0) {
      onNavigate(allPhotos[allPhotos.length - 1]);
    } else {
      onNavigate(allPhotos[currentIndex - 1]);
    }
  }, [currentIndex, allPhotos, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex >= allPhotos.length - 1) {
      onNavigate(allPhotos[0]);
    } else {
      onNavigate(allPhotos[currentIndex + 1]);
    }
  }, [currentIndex, allPhotos, onNavigate]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${photo.title} - Full-Resolution Viewer`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl text-zinc-100 select-none overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* ====================================================
            HEADER CONTROLS BAR
            ==================================================== */}
        <header className="relative z-20 flex items-center justify-between px-4 xs:px-6 py-3.5 sm:py-4 border-b border-zinc-900 bg-black/40 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-sky-400">
              {String(currentIndex + 1).padStart(2, '0')}{' '}
              <span className="text-zinc-600">/</span>{' '}
              {String(allPhotos.length).padStart(2, '0')}
            </span>
            <div className="hidden sm:block h-3.5 w-px bg-zinc-800" />
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              {photo.originalDimensions.width} × {photo.originalDimensions.height} px · WebP HQ
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={photo.fullResUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xs:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer min-h-[38px]"
              title="Open full resolution in new tab"
            >
              <span>Original File</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              aria-label="Close photograph viewer (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* ====================================================
            MAIN IMAGE VIEWPORT (Zero Cropping, Pure Aspect Ratio)
            ==================================================== */}
        <main className="relative flex-1 flex items-center justify-center p-3 xs:p-4 sm:p-6 overflow-hidden">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            aria-label="Previous photograph (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            aria-label="Next photograph (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Stage Container */}
          <div className="relative flex items-center justify-center max-h-[76vh] sm:max-h-[82vh] max-w-[94vw] sm:max-w-[88vw] w-full h-full">
            {/* Loading Spinner */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-zinc-400">
                <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
                <span className="text-xs font-mono tracking-wider text-zinc-500">
                  Loading full-resolution WebP ({photo.aspectRatio})…
                </span>
              </div>
            )}

            {/* Error Fallback */}
            {hasError && (
              <div className="flex flex-col items-center justify-center gap-3 p-6 text-center max-w-sm rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <p className="text-sm font-display text-zinc-300">
                  Unable to load high-resolution image directly.
                </p>
                <img
                  src={photo.previewUrl}
                  alt={photo.alt}
                  className="max-h-[60vh] max-w-full object-contain rounded-lg"
                />
              </div>
            )}

            {/* High-Resolution Photograph — Loaded on Demand Only */}
            <img
              key={photo.id}
              src={photo.fullResUrl}
              alt={photo.alt}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              className={`
                max-h-[74vh] sm:max-h-[80vh] max-w-[92vw] sm:max-w-[85vw]
                object-contain transition-opacity duration-300
                shadow-[0_20px_60px_rgba(0,0,0,0.85)]
                ${isLoading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}
              `}
              style={{
                aspectRatio: photo.aspectRatioValue,
              }}
            />
          </div>
        </main>

        {/* ====================================================
            FOOTER CAPTION DOCK
            ==================================================== */}
        <footer className="relative z-20 px-4 xs:px-6 py-3 sm:py-4 border-t border-zinc-900 bg-black/60 backdrop-blur-md shrink-0">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
            <div className="space-y-0.5">
              <h2 className="text-base sm:text-lg font-medium text-white font-display tracking-tight">
                {photo.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-display leading-relaxed">
                {photo.caption}
              </p>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-3 text-[11px] font-mono text-zinc-500 shrink-0">
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-sky-400">
                {photo.aspectRatio} Portrait
              </span>
              <span>Faraz Kayan Haque</span>
            </div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoLightbox;
