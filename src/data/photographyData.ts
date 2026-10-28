export interface PhotoItem {
  id: string;
  filename: string;
  title: string;
  caption: string;
  alt: string;
  aspectRatio: '3:4' | '9:20';
  aspectRatioValue: number; // width / height
  previewUrl: string;
  fullResUrl: string;
  originalDimensions: {
    width: number;
    height: number;
  };
  orientation: 'portrait';
}

export const photographyData: PhotoItem[] = [
  {
    id: '094603',
    filename: 'IMG_20240417_094603.webp',
    title: 'Morning Ascent',
    caption: 'Crisp early light cutting against geometric edges toward a clear open sky.',
    alt: 'Tall 9:20 vertical photograph looking upward along geometric structures into a vibrant blue sky.',
    aspectRatio: '9:20',
    aspectRatioValue: 9 / 20,
    previewUrl: '/web/IMG_20240417_094603.webp',
    fullResUrl: '/web-hq/IMG_20240417_094603.webp',
    originalDimensions: {
      width: 7200,
      height: 16000,
    },
    orientation: 'portrait',
  },
  {
    id: '155553',
    filename: 'IMG_20240417_155553.webp',
    title: 'Pavement Shadows',
    caption: 'Quiet geometry of cast shadows stretching across the afternoon walkway.',
    alt: 'Tall 9:20 vertical photograph showing angular shadows crossing textured pavement.',
    aspectRatio: '9:20',
    aspectRatioValue: 9 / 20,
    previewUrl: '/web/IMG_20240417_155553.webp',
    fullResUrl: '/web-hq/IMG_20240417_155553.webp',
    originalDimensions: {
      width: 7200,
      height: 16000,
    },
    orientation: 'portrait',
  },
  {
    id: '125346',
    filename: 'IMG_20240416_125346.webp',
    title: 'Noon Silhouette',
    caption: 'A tall vertical frame slicing through bright foliage into the deep stillness below.',
    alt: 'Tall 9:20 vertical composition framing midday greenery descending into deep shadow.',
    aspectRatio: '9:20',
    aspectRatioValue: 9 / 20,
    previewUrl: '/web/IMG_20240416_125346.webp',
    fullResUrl: '/web-hq/IMG_20240416_125346.webp',
    originalDimensions: {
      width: 7200,
      height: 16000,
    },
    orientation: 'portrait',
  },
  {
    id: '173520',
    filename: 'IMG_20240416_173520.webp',
    title: 'Late Afternoon Perspective',
    caption: 'Low-angle sunlight raking across street surfaces as the day begins to settle.',
    alt: 'Tall 9:20 vertical composition of a street corridor bathed in late afternoon sunlight.',
    aspectRatio: '9:20',
    aspectRatioValue: 9 / 20,
    previewUrl: '/web/IMG_20240416_173520.webp',
    fullResUrl: '/web-hq/IMG_20240416_173520.webp',
    originalDimensions: {
      width: 7200,
      height: 16000,
    },
    orientation: 'portrait',
  },
  {
    id: 'wa0162',
    filename: 'IMG-20240417-WA0162.webp',
    title: 'Midday Canopy',
    caption: 'Diffused daylight falling across the urban skyline, caught between open sky and street level.',
    alt: 'Vertical 3:4 portrait photograph capturing architectural lines under a soft, diffused midday sky.',
    aspectRatio: '3:4',
    aspectRatioValue: 3 / 4,
    previewUrl: '/web/IMG-20240417-WA0162.webp',
    fullResUrl: '/web-hq/IMG-20240417-WA0162.webp',
    originalDimensions: {
      width: 4800,
      height: 6400,
    },
    orientation: 'portrait',
  },
  {
    id: 'wa0036',
    filename: 'IMG-20240428-WA0036.webp',
    title: 'Terracotta Facets',
    caption: 'Warm brickwork and weathered textures catching the muted evening ambient glow.',
    alt: 'Vertical 3:4 portrait photograph capturing warm textured masonry and muted ambient light.',
    aspectRatio: '3:4',
    aspectRatioValue: 3 / 4,
    previewUrl: '/web/IMG-20240428-WA0036.webp',
    fullResUrl: '/web-hq/IMG-20240428-WA0036.webp',
    originalDimensions: {
      width: 4800,
      height: 6400,
    },
    orientation: 'portrait',
  },
];
