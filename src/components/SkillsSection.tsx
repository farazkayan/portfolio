import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HandwrittenNote,
  SketchArrow,
  SketchUnderline,
} from './ui/HandcraftedMarks';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  usedIn: string[];
  whatUsedFor: string;
  note?: string;
  isCore?: boolean;
}

interface SkillCategory {
  num: string;
  title: string;
  badge?: string;
  skills: SkillItem[];
  isAiCategory?: boolean;
}

const categories: SkillCategory[] = [
  {
    num: '01',
    title: 'Languages',
    skills: [
      {
        id: 'python',
        name: 'Python',
        category: 'Languages',
        usedIn: ['Nexus', 'School'],
        whatUsedFor: 'Building Nexus with Python and learning Python in school.',
        isCore: true,
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'Languages',
        usedIn: ['Avero'],
        whatUsedFor: 'Primary language for type-safe application logic in Avero.',
        isCore: true,
      },
      {
        id: 'sql',
        name: 'SQL',
        category: 'Languages',
        usedIn: ['Avero'],
        whatUsedFor: 'Relational data modeling, indexing, and queries in PostgreSQL.',
      },
    ],
  },
  {
    num: '02',
    title: 'Web / Frontend',
    skills: [
      {
        id: 'react',
        name: 'React',
        category: 'Web / Frontend',
        usedIn: ['Avero'],
        whatUsedFor: 'Building the application interface and frontend.',
        isCore: true,
      },
      {
        id: 'vite',
        name: 'Vite',
        category: 'Web / Frontend',
        usedIn: ['Avero'],
        whatUsedFor: 'Fast modern build tooling and development environment.',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'Web / Frontend',
        usedIn: ['Avero'],
        whatUsedFor: 'Rapid utility-first design systems and responsive layouts.',
      },
      {
        id: 'react-router',
        name: 'React Router',
        category: 'Web / Frontend',
        usedIn: ['Avero'],
        whatUsedFor: 'Client-side navigation and route management.',
      },
      {
        id: 'leaflet',
        name: 'Leaflet',
        category: 'Web / Frontend',
        usedIn: ['Avero'],
        whatUsedFor: 'Interactive mapping engine for geospatial views.',
      },
      {
        id: 'react-leaflet',
        name: 'React Leaflet',
        category: 'Web / Frontend',
        usedIn: ['Avero'],
        whatUsedFor: 'React bindings for Leaflet map controls and overlays.',
      },
      {
        id: 'html',
        name: 'HTML',
        category: 'Web / Frontend',
        usedIn: ['Web development / projects'],
        whatUsedFor: 'Semantic markup and web accessibility foundations.',
      },
    ],
  },
  {
    num: '03',
    title: 'Backend & Data',
    skills: [
      {
        id: 'supabase',
        name: 'Supabase',
        category: 'Backend & Data',
        usedIn: ['Avero'],
        whatUsedFor: 'Auth, database management, and real-time syncing in Avero.',
        isCore: true,
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'Backend & Data',
        usedIn: ['Avero'],
        whatUsedFor: 'Relational storage, triggers, and foreign key relations.',
      },
      {
        id: 'edge-functions',
        name: 'Supabase Edge Functions',
        category: 'Backend & Data',
        usedIn: ['Avero'],
        whatUsedFor: 'Serverless backend logic running at the edge.',
      },
      {
        id: 'deno',
        name: 'Deno',
        category: 'Backend & Data',
        usedIn: ['Avero'],
        whatUsedFor: 'TypeScript runtime powering edge microservices.',
      },
    ],
  },
  {
    num: '04',
    title: 'Infrastructure & Deployment',
    skills: [
      {
        id: 'cf-pages',
        name: 'Cloudflare Pages',
        category: 'Infrastructure & Deployment',
        usedIn: ['Avero', 'Portfolio', 'Other deployments'],
        whatUsedFor: 'Global edge hosting with instant CI/CD deployments.',
      },
      {
        id: 'cf-workers',
        name: 'Cloudflare Workers',
        category: 'Infrastructure & Deployment',
        usedIn: ['Avero'],
        whatUsedFor: 'Low-latency serverless routing and proxy handling.',
      },
      {
        id: 'backblaze',
        name: 'Backblaze B2',
        category: 'Infrastructure & Deployment',
        usedIn: ['Avero'],
        whatUsedFor: 'S3-compatible persistent object and media storage.',
      },
      {
        id: 'wrangler',
        name: 'Wrangler',
        category: 'Infrastructure & Deployment',
        usedIn: ['Avero'],
        whatUsedFor: 'Cloudflare command-line deployment and environment tooling.',
      },
    ],
  },
  {
    num: '05',
    title: 'Mobile & Native',
    badge: 'beyond the browser',
    skills: [
      {
        id: 'flutter',
        name: 'Flutter',
        category: 'Mobile & Native',
        usedIn: ['SoundMesh'],
        whatUsedFor: 'Building the main mobile application.',
        note: 'Learned while building SoundMesh.',
        isCore: true,
      },
      {
        id: 'dart',
        name: 'Dart',
        category: 'Mobile & Native',
        usedIn: ['SoundMesh'],
        whatUsedFor: 'Reactive client architecture and cross-platform UI logic.',
        isCore: true,
      },
      {
        id: 'kotlin',
        name: 'Kotlin',
        category: 'Mobile & Native',
        usedIn: ['SoundMesh'],
        whatUsedFor: 'Android-native integration and platform-specific work.',
        note: 'Android native background audio and service binding.',
        isCore: true,
      },
      {
        id: 'android-studio',
        name: 'Android Studio',
        category: 'Mobile & Native',
        usedIn: ['SoundMesh'],
        whatUsedFor: 'Native SDK configurations, profiling, and build toolchains.',
      },
      {
        id: 'android-native',
        name: 'Android Native Development',
        category: 'Mobile & Native',
        usedIn: ['SoundMesh'],
        whatUsedFor: 'Platform channels, native threads, and Android system services.',
      },
      {
        id: 'swift',
        name: 'Swift',
        category: 'Mobile & Native',
        usedIn: ['SoundMesh'],
        whatUsedFor: 'Native iOS target exploration and AVFoundation audio research.',
      },
    ],
  },
  {
    num: '06',
    title: 'Systems / Networking / Audio',
    badge: 'SoundMesh',
    skills: [
      {
        id: 'tcp-net',
        name: 'Networking / TCP',
        category: 'Systems / Networking / Audio',
        usedIn: ['SoundMesh'],
        whatUsedFor: 'Local device connections, discovery, TCP connections, handshakes and communication.',
      },
      {
        id: 'audio-eng',
        name: 'Audio Engineering',
        category: 'Systems / Networking / Audio',
        usedIn: ['SoundMesh'],
        whatUsedFor: 'Audio capture, transport, receiving and playback.',
      },
      {
        id: 'sync',
        name: 'Synchronization',
        category: 'Systems / Networking / Audio',
        usedIn: ['SoundMesh'],
        whatUsedFor: 'Synchronized playback and monotonic timing across devices.',
      },
      {
        id: 'adb',
        name: 'Android Debugging / ADB',
        category: 'Systems / Networking / Audio',
        usedIn: ['SoundMesh'],
        whatUsedFor: 'Testing and debugging real Android devices over USB and Wi-Fi ADB.',
      },
      {
        id: 'testing',
        name: 'Testing / Contract Testing',
        category: 'Systems / Networking / Audio',
        usedIn: ['SoundMesh', 'App development'],
        whatUsedFor: 'Ensuring packet integrity and cross-device communication reliability.',
      },
    ],
  },
  {
    num: '07',
    title: 'Development Tools',
    skills: [
      {
        id: 'git',
        name: 'Git',
        category: 'Development Tools',
        usedIn: ['Avero', 'SoundMesh', 'Nexus', 'Portfolio', 'Basically everything'],
        whatUsedFor: 'Basically everything.',
        note: 'My go-to tool.',
        isCore: true,
      },
      {
        id: 'github',
        name: 'GitHub',
        category: 'Development Tools',
        usedIn: ['Avero', 'SoundMesh', 'Nexus', 'Portfolio', 'Basically everything'],
        whatUsedFor: 'Code hosting, version history, branches, and issue tracking.',
      },
      {
        id: 'playwright',
        name: 'Playwright',
        category: 'Development Tools',
        usedIn: ['Testing apps with AI'],
        whatUsedFor: 'Automated end-to-end browser workflows and AI validation.',
      },
      {
        id: 'eslint',
        name: 'ESLint',
        category: 'Development Tools',
        usedIn: ['Mostly Avero'],
        whatUsedFor: 'Static syntax validation and lint enforcement.',
      },
    ],
  },
  {
    num: '08',
    title: 'AI & Development',
    badge: 'daily workflow',
    isAiCategory: true,
    skills: [
      {
        id: 'kilo-code',
        name: 'Kilo Code',
        category: 'AI & Development',
        usedIn: ['Building apps and tools'],
        whatUsedFor: 'Code generation and prototyping agent for software scaffolding.',
      },
      {
        id: 'claude',
        name: 'Claude',
        category: 'AI & Development',
        usedIn: ['Building / experimenting'],
        whatUsedFor: 'Brainstorming, prompt engineering, and figuring things out while building.',
      },
      {
        id: 'gemini',
        name: 'Gemini',
        category: 'AI & Development',
        usedIn: ['Studying'],
        whatUsedFor: 'Mostly school/study work.',
      },
      {
        id: 'nvidia-nim',
        name: 'NVIDIA NIM',
        category: 'AI & Development',
        usedIn: ['AI development'],
        whatUsedFor: 'My AI provider.',
      },
      {
        id: 'lm-studio',
        name: 'LM Studio',
        category: 'AI & Development',
        usedIn: ['Local AI experiments'],
        whatUsedFor: 'Experimenting with tiny locally hosted AI models.',
      },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(
    categories[0].skills[0]
  );

  const handleSelectSkill = (skill: SkillItem) => {
    setSelectedSkill(skill);
    // On small screens, if detail panel is below, smoothly scroll so user sees the change
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const detailEl = document.getElementById('selected-skill-detail');
      if (detailEl) {
        detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const totalTools = categories.reduce((sum, cat) => sum + cat.skills.length, 0);

  return (
    <div className="border-t border-zinc-900/60">
      <section
        id="skills"
        className="scroll-mt-24 sm:scroll-mt-28 py-12 sm:py-14 lg:py-16 px-4 xs:px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full relative"
      >
        {/* ====================================================
            HEADER & INTRODUCING THE TOOLKIT
            Tone: Technical Teal / Mint
            ==================================================== */}
        <div className="mb-6 sm:mb-8 space-y-2.5">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="text-teal-400 font-semibold">03</span>
              <span className="text-zinc-700">/</span>
              <span className="uppercase tracking-widest text-zinc-300 font-medium">
                The Toolkit
              </span>
            </div>

            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
              Most of these started with me needing something.
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-6">
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.35rem] font-medium tracking-tight text-white font-display">
                Tools I use
              </h2>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-0.5">
                <p className="text-sm xs:text-base sm:text-[17px] text-zinc-400 font-display">
                  A toolkit built project by project.
                </p>
                <HandwrittenNote className="text-[15px] sm:text-base text-teal-300/80 -rotate-1">
                  — mostly learned mid-bug
                </HandwrittenNote>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-normal leading-relaxed lg:text-right">
              I’m still learning many of these. Here are the tools I’ve picked up by building things and solving problems that mattered to me.
            </p>
          </div>
        </div>

        {/* ====================================================
            MAIN TWO-COLUMN CATALOG & DETAIL LAYOUT
            Left (8 Cols): Clean hairline-divided category groups with natural-width tokens
            Right (4 Cols): Sticky Selected Skill Detail Panel
            ==================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-9 items-start">
          {/* Left / Primary Area: Clean, unboxed category groups — zero truncated text */}
          <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-5">
            {categories.map((cat) => (
              <div
                key={cat.num}
                className="border-t border-zinc-800/75 pt-3"
              >
                {/* Category Heading */}
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="font-mono text-[11px] tabular-nums text-teal-400/85 shrink-0">
                      {cat.num}
                    </span>
                    <h3 className="text-[13.5px] font-medium tracking-tight text-zinc-100 font-display truncate">
                      {cat.title}
                    </h3>
                  </div>

                  {cat.badge && (
                    <HandwrittenNote className="text-[13.5px] text-teal-300/75 -rotate-1 shrink-0 leading-none">
                      {cat.badge}
                    </HandwrittenNote>
                  )}
                </div>

                {/* Natural-width Interactive Tool Tokens (no truncation) */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => {
                    const isSelected = selectedSkill.id === skill.id;
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => handleSelectSkill(skill)}
                        className={`
                          px-2.5 py-1.5 min-h-[34px] rounded-lg text-[12.5px] sm:text-[13px] font-medium leading-tight
                          transition-all duration-150 border cursor-pointer whitespace-nowrap
                          touch-manipulation focus-visible:outline-none focus-visible:ring-2
                          focus-visible:ring-teal-400/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141418]
                          ${
                            isSelected
                              ? 'bg-teal-400/12 border-teal-400/60 text-teal-100 shadow-[0_0_0_1px_rgba(45,212,191,0.16)]'
                              : skill.isCore
                              ? 'bg-zinc-900/75 border-zinc-700/75 text-zinc-100 hover:border-teal-400/40 hover:bg-zinc-800/80 hover:text-white'
                              : 'bg-zinc-900/35 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/75 hover:text-zinc-200'
                          }
                        `}
                        aria-label={`Select ${skill.name}`}
                        aria-pressed={isSelected}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right / Secondary Area: Crisp Sticky Tool Inspector */}
          <div
            id="selected-skill-detail"
            className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 lg:self-start scroll-mt-28"
          >
            <div className="rounded-2xl bg-gradient-to-b from-[#1a1a22] to-[#15151a] border border-zinc-800/90 ring-1 ring-inset ring-white/[0.04] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.34)]">
              {/* Top Metadata Strip */}
              <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-zinc-800/70 text-[11px] font-mono">
                <span className="uppercase tracking-widest text-teal-400 font-medium">
                  Selected tool
                </span>
                <span className="text-zinc-500 truncate">
                  {selectedSkill.category}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {/* Skill Title & Core Metadata (unboxed) */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <h4 className="relative inline-block pb-1 text-2xl sm:text-[1.75rem] font-medium tracking-tight text-white font-display">
                        {selectedSkill.name}
                        <SketchUnderline
                          variant="arc"
                          revealOnView={false}
                          className="absolute left-0 -bottom-0.5 text-teal-400/60"
                        />
                      </h4>
                      {selectedSkill.isCore && (
                        <span className="text-[11px] font-mono text-teal-400/90">
                          Core stack
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Used In (clean typographic list with separators, zero pill clutter) */}
                  <div className="space-y-1.5 pt-3.5 border-t border-zinc-800/70">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Used in
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-200 font-medium">
                      {selectedSkill.usedIn.map((project, idx) => (
                        <React.Fragment key={project}>
                          {idx > 0 && (
                            <span aria-hidden="true" className="text-zinc-600">
                              ·
                            </span>
                          )}
                          <span>{project}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Context / Usage */}
                  <div className="space-y-1.5 pt-3.5 border-t border-zinc-800/70">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                      What I used it for
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      {selectedSkill.whatUsedFor}
                    </p>
                  </div>

                  {/* Optional Personal Note */}
                  {selectedSkill.note && (
                    <div className="pt-3 border-t border-zinc-800/70 flex items-center gap-2 text-xs font-mono text-teal-300/90">
                      <SketchArrow
                        direction="right-down"
                        width={16}
                        height={12}
                        className="text-teal-400/80 shrink-0"
                      />
                      <span>{selectedSkill.note}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quiet Footer Hint */}
            <div className="mt-3 px-1 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Select any tool to inspect</span>
              <span className="text-teal-400/85 tabular-nums">{totalTools} tools</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsSection;
