export interface VentureFeaturedOffering {
  label: string;
  name: string;
  subtitle: string;
  url: string;
  imageUrl: string;
  imageAlt: string;
}

export interface VentureFrameSwatch {
  name: string;
  hex: string;
}

export interface VentureCoFounder {
  name: string;
  url?: string;
}

export interface VentureData {
  id: string;
  num: string;
  name: string;
  subtitle?: string;
  category: string;
  domain: string;
  description: string;
  coFounders?: VentureCoFounder[];
  artworkUrl?: string;
  artworkAlt?: string;
  frameSwatches?: VentureFrameSwatch[];
  featuredOffering?: VentureFeaturedOffering;
  primaryAction: {
    label: string;
    url: string;
    ariaLabel: string;
  };
}

export const ventures: VentureData[] = [
  {
    id: 'sawah',
    num: '01',
    name: 'SAWAH',
    category: 'Co-Founded Business / E-commerce',
    domain: 'sawah.farazkh.dev',
    description:
      'An online custom-framed photo business based in Dhaka, Bangladesh. Customers can upload their own photographs, choose frame colours, and order personalised framed prints.',
    coFounders: [
      { name: 'ME' },
      { name: 'Arifeen Mahin', url: 'https://mahinite.pages.dev' },
    ],
    artworkUrl: '/ventures/sawah-frame.jpg',
    artworkAlt:
      'Custom mounted golden-hour courtyard photograph inside a handcrafted SAWAH A4 frame',
    frameSwatches: [
      { name: 'Satin Black', hex: '#1C1B18' },
      { name: 'Gallery Cream', hex: '#F5F0DC' },
    ],
    primaryAction: {
      label: 'Visit SAWAH',
      url: 'https://sawah.farazkh.dev',
      ariaLabel: 'Visit SAWAH custom-framed photo storefront',
    },
  },
  {
    id: 'faraz-kayan-digital',
    num: '02',
    name: 'Faraz Kayan',
    subtitle: 'Digital Products',
    category: 'Independent Digital Products / Entrepreneurship',
    domain: 'shop.farazkh.dev',
    description:
      'An independent digital-products venture focused on creating and publishing practical digital resources, including tools designed for students.',
    featuredOffering: {
      label: 'Featured release',
      name: 'The Student Deadline Kit',
      subtitle: 'Planner & Assignment Tracker',
      url: 'https://shop.farazkh.dev/l/the-project-kit',
      imageUrl: '/ventures/student-deadline-kit.png',
      imageAlt: 'The Student Deadline Kit cover preview',
    },
    primaryAction: {
      label: 'Explore Digital Products',
      url: 'https://shop.farazkh.dev',
      ariaLabel: 'Explore Faraz Kayan Digital Products storefront',
    },
  },
];
