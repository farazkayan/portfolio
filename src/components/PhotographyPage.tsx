import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PolaroidLineCarousel } from './ui/polaroid-line-carousel';
import { PhotoLightbox } from './PhotoLightbox';
import { photographyData, PhotoItem } from '../data/photographyData';

interface PhotographyPageProps {
  onBack: () => void;
}

export const PhotographyPage: React.FC<PhotographyPageProps> = ({ onBack }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Faraz Kayan Haque | Photography';

    return () => {
      document.title = 'Faraz Kayan Haque | Portfolio';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#141418] text-zinc-100 flex flex-col font-sans selection:bg-sky-900/40 selection:text-sky-200 antialiased">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#141418]/90 border-b border-zinc-800/80 px-4 xs:px-5 sm:px-8 lg:px-12 py-3.5 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer min-h-[44px] py-1 touch-manipulation"
            aria-label="Back to Portfolio"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-sky-400" />
            <span className="font-medium">Return to Portfolio</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 py-6 sm:py-10 space-y-8 sm:space-y-12 w-full">
        {/* Hanging Polaroid Line Carousel */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-[#0e0e12] shadow-2xl">
          <PolaroidLineCarousel
            photos={photographyData}
            height="clamp(480px, 68vh, 600px)"
            cardWidth={300}
            sag={46}
            swing={1}
            autoplay={4500}
            background="#0e0e12"
            ink="#f4f4f5"
            string="#8a7f72"
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          />
        </div>

        {/* Collection Grid */}
        <div className="pt-2">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7">
            {photographyData.map((photo, idx) => {
              const is34 = photo.aspectRatio === '3:4';
              return (
                <article
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${photo.title} (${photo.aspectRatio}) in full resolution`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPhoto(photo);
                    }
                  }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#16161b] border border-zinc-800 hover:border-sky-500/40 p-3 sm:p-4 transition-all duration-300 hover:bg-[#1a1a22] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  {/* Photo Frame preserving intrinsic aspect ratio */}
                  <div
                    className={`
                      w-full overflow-hidden rounded-xl bg-black/60 border border-zinc-800/80 relative flex items-center justify-center
                      ${is34 ? 'aspect-[3/4]' : 'aspect-[9/20] max-h-[380px]'}
                    `}
                  >
                    <img
                      src={photo.previewUrl}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Faint overlay on hover */}
                    <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs font-mono text-sky-300 border border-sky-500/30 shadow-lg">
                        Inspect {photo.originalDimensions.width}×{photo.originalDimensions.height}
                      </span>
                    </div>
                  </div>

                  {/* Card Description */}
                  <div className="pt-3.5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>0{idx + 1}</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-800/90 text-sky-400">
                        {photo.aspectRatio}
                      </span>
                    </div>

                    <h2 className="text-sm sm:text-base font-medium text-white font-display tracking-tight group-hover:text-sky-300 transition-colors">
                      {photo.title}
                    </h2>

                    <p className="text-xs text-zinc-400 font-display line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      {/* ====================================================
          FULL RESOLUTION LIGHTBOX (Mounted On-Demand Only)
          ==================================================== */}
      {selectedPhoto && (
        <PhotoLightbox
          photo={selectedPhoto}
          allPhotos={photographyData}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={(nextPhoto) => setSelectedPhoto(nextPhoto)}
        />
      )}

      {/* ====================================================
          FOOTER RETURN ACTION
          ==================================================== */}
      <footer className="border-t border-zinc-800/80 py-8 sm:py-14 px-4 xs:px-5 sm:px-8 lg:px-12 bg-[#09090b]">
        <div className="max-w-6xl mx-auto flex flex-col xs:flex-row items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer min-h-[44px] py-1 touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-sky-400" />
            <span>Return to Main Portfolio</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>Faraz Kayan Haque</span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-400">Observational Photography</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PhotographyPage;
