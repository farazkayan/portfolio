export interface ProjectRole {
  title: string;
  description: string;
  areas?: string[];
}

export interface ProjectCollaboration {
  myRole: string;
  collaboratorName: string;
  collaboratorUrl: string;
  collaboratorRole: string;
}

export interface ProjectCapability {
  title: string;
  description: string;
}

export interface ProjectTechSubsections {
  title: string;
  content: string;
}

export interface ProjectTechnicalDetails {
  headline?: string;
  explanation: string;
  areas?: string[];
  subsections?: ProjectTechSubsections[];
  diagramType?: 'soundmesh' | 'none';
}

export interface ProjectLink {
  label: string;
  url: string;
  type: 'live' | 'github';
}

export interface ProjectData {
  id: string;
  title: string;
  label: string;
  shortDescription: string;
  isFeatured?: boolean;
  featuredBadge?: string;
  themeColor?: 'blue' | 'rose' | 'purple';
  logoUrl: string;
  story: string;
  storyQuote?: string;
  overview: string;
  role?: ProjectRole;
  collaboration?: ProjectCollaboration;
  capabilities?: ProjectCapability[];
  technicalDetails?: ProjectTechnicalDetails;
  theHardPart?: string;
  whatILearned?: string;
  techStack: string[];
  links?: ProjectLink[];
  visualMeta?: {
    iconType: 'radio' | 'map' | 'terminal';
    tagline: string;
    subline: string;
    pills: string[];
  };
}

export const projects: ProjectData[] = [
  {
    id: 'soundmesh',
    title: 'SoundMesh',
    label: '01 — Featured Project',
    isFeatured: true,
    featuredBadge: '★ Featured Project',
    themeColor: 'blue',
    logoUrl: '/soundmesh.png',
    shortDescription:
      'A local-first mobile app that turns nearby phones into synchronized speakers.',
    storyQuote:
      'We wanted to watch a movie. We had 5 phones, but not a single speaker. So we made our own.',
    story:
      'We had an everyday problem with friends: we wanted to watch something together loudly, had multiple phones sitting on the table, but no dedicated speaker. Existing apps were either broken, required active internet connections, or introduced unbearable audio lag. We needed a local-first tool that just worked over Wi-Fi or hotspot, so we built it.',
    overview:
      'SoundMesh operates entirely on a local Wi-Fi or ad-hoc hotspot network. One device acts as the audio coordinator, streaming audio in real-time to receiver devices that buffer and synchronize playback using monotonic timestamps—eliminating the need for internet access or third-party servers.',
    collaboration: {
      myRole: 'Backend / Core',
      collaboratorName: 'Mahin',
      collaboratorUrl: 'https://github.com/mahinite',
      collaboratorRole: 'Frontend / UI',
    },
    role: {
      title: 'Backend / Core',
      description: 'I designed and implemented the networking engine, synchronization protocol, and native audio pipeline, while Mahin built the UI and frontend.',
      areas: [
        'Room coordinator & session management',
        'TCP socket protocol & streaming',
        'Local device discovery & handshakes',
        'Audio packetization & jitter buffering',
        'Monotonic clock drift compensation',
        'Cross-device testing & ADB profiling',
      ],
    },
    theHardPart:
      'Coordinating multiple mobile devices over local Wi-Fi while handling hardware audio latency and drift. Phones have differing hardware buffer sizes and independent internal clocks. Solving audio drift meant implementing monotonic timestamp adjustments and precise packet scheduling so sound waves hit ears in unison without echo.',
    technicalDetails: {
      headline: 'Distributed Local Audio Pipeline',
      explanation:
        'The host device captures system or file audio, divides the stream into timestamped packets, and coordinates low-latency TCP broadcast to connected mobile receivers across the local subnet.',
      areas: [
        'Local networking & TCP sockets',
        'Device discovery & handshake protocol',
        'Audio capture & chunk encoding',
        'Audio transport & receiver buffering',
        'Monotonic clock synchronization',
        'Native platform timing (Android/iOS)',
        'Contract testing & automated verification',
      ],
      diagramType: 'soundmesh',
    },
    whatILearned:
      'Building SoundMesh took my engineering outside the web browser. It forced me deep into local networking protocols, audio buffer pipelines, monotonic clock drift, and native platform services on Android and iOS.',
    techStack: [
      'Flutter',
      'Dart',
      'Kotlin',
      'Android Native',
      'Swift',
      'TCP / Networking',
      'Audio',
      'Synchronization',
      'ADB',
      'Testing',
    ],
    links: [
      {
        label: 'Live demo',
        url: 'https://getsoundmesh.pages.dev',
        type: 'live',
      },
      {
        label: 'View on GitHub',
        url: 'https://github.com/farazkayan/SoundMesh',
        type: 'github',
      },
    ],
    visualMeta: {
      iconType: 'radio',
      tagline: 'Zero-Cloud Distributed Audio Mesh',
      subline: 'Local Wi-Fi / Hotspot · Multi-device monotonic sync',
      pills: ['Flutter', 'Dart', 'Kotlin', 'TCP', 'Audio Engine'],
    },
  },
  {
    id: 'avero',
    title: 'Avero',
    label: '02 — Personal Memory Platform',
    themeColor: 'rose',
    logoUrl: '/avero.png',
    shortDescription:
      'A dedicated, private space to pin memories to real locations on a map, sort them in a timeline, and keep a history of things worth remembering.',
    storyQuote:
      'I had made a lot of memories with my best friend and wished I could relive them.',
    story:
      'Avero started from an authentic personal desire, not a tutorial. Social media turns shared moments into public performances, while standard photo libraries are disorganized and flat. Avero is an intimate, private memory space where trips, milestones, and shared history live forever pinned to physical coordinates.',
    overview:
      'Avero combines interactive map pinning with chronological timelines to preserve personal milestones and shared history. By isolating private vaults behind edge-authenticated URLs and strict PostgreSQL Row-Level Security, it gives friends a quiet digital home free from public social algorithms and feed clutter.',
    theHardPart:
      'Balancing geospatial rendering with secure media delivery. Uploading and previewing large media assets required signed Backblaze B2 URLs routed through Cloudflare Workers for edge caching, paired with clustered Leaflet pins to keep client-side map interactions responsive.',
    capabilities: [
      {
        title: 'Secure Media Storage',
        description:
          'Direct encrypted pipeline handling high-resolution photo and video uploads.',
      },
      {
        title: 'Interactive Map Pinning',
        description:
          'Geospatial engine anchoring memories to coordinates across customizable map tiles.',
      },
      {
        title: 'Timeline Synchronization',
        description:
          'Chronological timeline grouping moments by milestone, journey, and date.',
      },
      {
        title: 'Private Comments',
        description:
          'Contextual notes, inside jokes, and commentary pinned to individual memories.',
      },
      {
        title: 'Role-Based Access Control',
        description:
          'Strict granular policies ensuring shared vaults remain isolated and private.',
      },
      {
        title: 'Real-Time Updates',
        description:
          'Live synchronization across collaborators as new memories and media are placed.',
      },
    ],
    whatILearned:
      'This project forced me to understand real-world engineering constraints beyond tutorials. I had to learn how to properly handle large media uploads, securely proxy images via edge workers, structure relational data, enforce Row-Level Security, and keep private spaces isolated.',
    technicalDetails: {
      headline: 'Secure Edge & Spatial Architecture',
      explanation:
        'A full-stack cloud application leveraging object storage, serverless edge proxies, and spatial PostgreSQL data structures.',
      subsections: [
        {
          title: 'Media Handling',
          content:
            'Backblaze B2 for durable object storage, fronted by Cloudflare Workers for edge caching, URL signing, and private media delivery.',
        },
        {
          title: 'Spatial Data',
          content:
            'Leaflet + React Leaflet for location-based memory pinning, clustered markers, and coordinate mapping.',
        },
        {
          title: 'Data Architecture',
          content:
            'Supabase + PostgreSQL utilizing Row-Level Security (RLS) policies to keep intimate shared spaces strictly confidential.',
        },
      ],
    },
    techStack: [
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Leaflet',
      'Cloudflare',
      'Tailwind CSS',
    ],
    links: [
      {
        label: 'Visit Avero',
        url: 'https://withavero.pages.dev/',
        type: 'live',
      },
    ],
    visualMeta: {
      iconType: 'map',
      tagline: 'Private Spatial Memory Vault',
      subline: 'Map Pinning · Chronological Timelines · Encrypted Media',
      pills: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Leaflet'],
    },
  },
  {
    id: 'nexus',
    title: 'Nexus',
    label: '03 — Desktop Utility',
    themeColor: 'purple',
    logoUrl: '/nexus.png',
    shortDescription:
      'A local desktop tool built to automate boring tasks and organize my workspace.',
    storyQuote:
      'This doesn’t exist. I need it. It would make my life faster. So I’ll build it.',
    story:
      'I was wasting time setting up dev environments, managing local files, and doing repetitive tasks by hand. I didn’t want a bloated web wrapper or another browser tab. I wanted a fast native tool sitting directly on my computer. So I built what I actually needed.',
    overview:
      'Nexus is a local desktop utility designed to eliminate repetitive developer friction, supervise system processes, and automate desktop workflows without the memory overhead or startup lag of web-wrapped tools.',
    theHardPart:
      'Designing a responsive Qt desktop interface that manages concurrent OS subprocesses and filesystem operations without blocking the main UI thread, while keeping resource consumption under 40 MB of RAM.',
    whatILearned:
      'Building Nexus taught me how to structure standalone desktop applications, manage OS-level processes, work with native window behavior, and use AI effectively to speed up development routines.',
    technicalDetails: {
      headline: 'Native OS Integration & Process Management',
      explanation:
        'Engineered in Python with PySide6 (Qt) rather than a web wrapper such as Electron for instant startup, minimal memory consumption, and native OS file dialogs on Windows.',
      subsections: [
        {
          title: 'Native UI Integration',
          content:
            'PySide6 provides true native Windows controls, system tray behavior, and direct OS file supervision with low RAM footprint.',
        },
        {
          title: 'AI-Assisted Workflow',
          content:
            'Developed with an AI-directed local codebase workflow and modern code generation models.',
        },
      ],
    },
    techStack: ['Python', 'PySide6', 'Git', 'OS libraries'],
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/farazkayan/nexus-workflow-manager',
        type: 'github',
      },
    ],
    visualMeta: {
      iconType: 'terminal',
      tagline: 'Native Windows Workflow Supervisor',
      subline: 'PySide6 Qt · OS Process Control · Zero Web-Wrapper Overhead',
      pills: ['Python', 'PySide6', 'Qt', 'Process Control', 'Git'],
    },
  },
];
