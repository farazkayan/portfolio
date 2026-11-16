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

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  label: string;
  category: string;
  status: string;
  shortDescription: string;
  cardSummary?: string;
  modalOverview: string;
  contributionSummary: string;
  technicalHighlight: string;
  isFeatured?: boolean;
  featuredBadge?: string;
  themeColor?: 'blue' | 'rose' | 'purple';
  logoUrl: string;
  screenshot?: ProjectScreenshot;
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
    category: 'Local-First Mobile Audio',
    status: 'Live demo & open repository',
    isFeatured: true,
    featuredBadge: '★ Featured Project',
    themeColor: 'blue',
    logoUrl: '/soundmesh.png',
    shortDescription:
      'A local-first mobile app that turns nearby phones into synchronized speakers over local Wi-Fi or a hotspot.',
    cardSummary:
      'Turns nearby phones into synchronized speakers over local Wi-Fi—built when five phones on a table still left us without a speaker. Streams real-time audio packets with monotonic clock sync across Android and iOS, without internet or cloud servers.',
    modalOverview:
      'SoundMesh grew out of an everyday problem with friends: five phones sitting on a table, no speaker, and existing apps either broken or lagging over the cloud. It runs strictly on local Wi-Fi or a hotspot—one phone coordinates playback while nearby devices receive and align audio locally.',
    contributionSummary:
      'Co-built with Mahin. I handled the backend and core systems—the room coordinator, TCP socket streaming, device discovery, jitter buffering, monotonic clock drift compensation, and cross-device ADB profiling—while Mahin designed and built the frontend UI.',
    technicalHighlight:
      'Monotonic clock drift compensation and real-time TCP jitter buffering across Android and iOS—no internet or cloud server required.',
    storyQuote:
      'We wanted to watch a movie. We had 5 phones, but not a single speaker. So we made our own.',
    story:
      'We had an everyday problem with friends: we wanted to watch something together loudly, had multiple phones sitting on the table, but no dedicated speaker. Existing apps were either broken, required active internet connections, or introduced unbearable audio lag. We needed a local-first tool that worked over Wi-Fi or a phone hotspot, so we built it.',
    overview:
      'SoundMesh runs entirely on a local Wi-Fi or hotspot network. One phone acts as the audio coordinator, streaming packets in real time to receiver devices that buffer and align playback using monotonic timestamps—without internet access or external servers.',
    collaboration: {
      myRole: 'Backend / Core',
      collaboratorName: 'Mahin',
      collaboratorUrl: 'https://github.com/mahinite',
      collaboratorRole: 'Frontend / UI',
    },
    role: {
      title: 'Backend / Core',
      description:
        'I designed and built the networking engine, synchronization protocol, and native audio pipeline, while Mahin designed and built the frontend UI.',
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
      'Coordinating multiple mobile devices over local Wi-Fi while handling hardware audio latency and clock drift. Phones have differing hardware buffer sizes and independent internal clocks, so keeping playback aligned meant implementing monotonic timestamp adjustments and careful packet scheduling.',
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
      'Building SoundMesh took my engineering outside the browser. It pushed me deep into local networking protocols, audio buffer pipelines, monotonic clock drift, and native platform timing on Android and iOS.',
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
    category: 'Private Spatial Memory Vault',
    status: 'Live web application',
    themeColor: 'rose',
    logoUrl: '/avero.png',
    shortDescription:
      'A private web space to pin memories to real map coordinates, sort them in a timeline, and keep shared history outside public feeds.',
    cardSummary:
      'A private map and timeline for shared memories, built so meaningful moments stay off public social feeds. Pairs clustered Leaflet pins with Cloudflare-signed Backblaze media and PostgreSQL Row-Level Security.',
    modalOverview:
      'Avero started from wanting a quiet, private place to revisit trips and shared milestones rather than posting them on public social feeds or burying them in flat photo albums. Memories anchor directly to map coordinates alongside a chronological timeline and private notes.',
    contributionSummary:
      'Built independently from scratch—designing the React/TypeScript interface, Leaflet coordinate clustering, PostgreSQL schema with Row-Level Security policies, and the Backblaze B2 + Cloudflare Workers signed media proxy.',
    technicalHighlight:
      'Signed Backblaze B2 media delivery through Cloudflare Workers, clustered Leaflet pins, and PostgreSQL Row-Level Security.',
    storyQuote:
      'I had made a lot of memories with my best friend and wished I could relive them.',
    story:
      'Avero started from a personal desire rather than a template. Social media turns shared moments into public performances, while standard photo libraries feel flat and disorganized. Avero gives trips and milestones a private home pinned directly to the places they happened.',
    overview:
      'Avero combines interactive map pinning with chronological timelines to preserve personal milestones and shared history. Private vaults sit behind edge-signed media URLs and PostgreSQL Row-Level Security, keeping memories out of public feeds and algorithms.',
    theHardPart:
      'Balancing geospatial rendering with private media delivery. Uploading and previewing large photos and videos required signed Backblaze B2 URLs proxied through Cloudflare Workers for edge caching, alongside clustered Leaflet markers to keep map interaction smooth.',
    capabilities: [
      {
        title: 'Secure Media Storage',
        description:
          'Direct pipeline handling high-resolution photo and video uploads behind signed edge URLs.',
      },
      {
        title: 'Interactive Map Pinning',
        description:
          'Geospatial view anchoring memories to real coordinates across interactive map tiles.',
      },
      {
        title: 'Timeline Synchronization',
        description:
          'Chronological timeline grouping moments by milestone, journey, and date.',
      },
      {
        title: 'Private Comments',
        description:
          'Contextual notes and commentary pinned directly to individual memories.',
      },
      {
        title: 'Role-Based Access Control',
        description:
          'Granular PostgreSQL policies keeping shared vaults isolated and private.',
      },
      {
        title: 'Real-Time Updates',
        description:
          'Live synchronization between invited collaborators as new memories are added.',
      },
    ],
    whatILearned:
      'This project taught me real-world web architecture constraints beyond small demos—handling large media uploads, signing and proxying private assets through edge workers, structuring relational schemas, and enforcing Row-Level Security.',
    technicalDetails: {
      headline: 'Secure Edge & Spatial Architecture',
      explanation:
        'A full-stack web application combining object storage, serverless edge proxies, and spatial PostgreSQL queries.',
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
            'Supabase + PostgreSQL using Row-Level Security (RLS) policies to keep shared spaces isolated and confidential.',
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
      subline: 'Map Pinning · Chronological Timelines · Signed Edge Media',
      pills: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Leaflet'],
    },
  },
  {
    id: 'nexus',
    title: 'Nexus',
    label: '03 — Desktop Utility',
    category: 'Native Desktop Utility',
    status: 'Open repository · Personal tool',
    themeColor: 'purple',
    logoUrl: '/nexus.png',
    shortDescription:
      'A local desktop utility built to automate repetitive workspace setups and organize everyday developer routines.',
    cardSummary:
      'A native desktop utility that automates repetitive dev setups and workspace chores without browser-tab bloat. Built with Python and PySide6 (Qt) to supervise local OS subprocesses directly.',
    modalOverview:
      'Nexus was built to eliminate repetitive manual work—spinning up dev environments, tidying local folders, and launching routine tasks—without keeping another heavy web wrapper or browser tab open. It sits natively on Windows for fast everyday use.',
    contributionSummary:
      'Designed and built independently in Python and PySide6 (Qt), handling concurrent OS subprocess orchestration, native Windows file dialogs and tray integration, and local workflow automation using an AI-assisted build loop.',
    technicalHighlight:
      'Native Windows Qt interface in Python and PySide6 managing concurrent OS subprocesses without Electron or browser-tab overhead.',
    storyQuote:
      'This doesn’t exist. I need it. It would make my life faster. So I’ll build it.',
    story:
      'I was spending too much time setting up dev environments, tidying local files, and repeating the same setup steps by hand. I didn’t want another heavy web wrapper or browser tab—I wanted a fast native utility sitting directly on my desktop.',
    overview:
      'Nexus is a local desktop utility built to cut out repetitive workspace setup, supervise local OS processes, and organize routine workflows without the startup lag or memory weight of web-wrapped tools.',
    theHardPart:
      'Designing a responsive Qt desktop interface that runs concurrent OS subprocesses and filesystem tasks off the main UI thread, keeping interactions snappy and resource usage lean compared to web-wrapped desktop apps.',
    whatILearned:
      'Building Nexus taught me how to structure standalone desktop software, supervise OS-level subprocesses safely, work with native Windows dialogs and tray behavior, and move quickly using AI-assisted development.',
    technicalDetails: {
      headline: 'Native OS Integration & Process Management',
      explanation:
        'Built in Python with PySide6 (Qt) rather than a web wrapper like Electron for fast startup, lightweight memory usage, and native OS file handling on Windows.',
      subsections: [
        {
          title: 'Native UI Integration',
          content:
            'PySide6 provides native Windows controls, system tray integration, and direct OS file supervision with a small footprint.',
        },
        {
          title: 'AI-Assisted Workflow',
          content:
            'Built with an AI-directed local development workflow to iterate quickly on UI states and process orchestration.',
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
