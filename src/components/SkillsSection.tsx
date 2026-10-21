import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Radio,
  Terminal,
  Bot,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

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
  icon: React.ComponentType<{ className?: string }>;
  skills: SkillItem[];
  isAiCategory?: boolean;
}

const categories: SkillCategory[] = [
  {
    num: '01',
    title: 'Languages',
    icon: Code2,
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
    icon: Globe,
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
    icon: Database,
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
    icon: Cloud,
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
    badge: 'SoundMesh took the toolkit outside the browser.',
    icon: Smartphone,
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
    icon: Radio,
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
    icon: Terminal,
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
    icon: Bot,
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

  return (
    <div className="border-t border-zinc-900/60">
      <section
        id="skills"
        className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-24 lg:py-28 px-4 xs:px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full relative"
      >
        {/* Subtle Destination Atmosphere: Technical Teal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.03)_0%,transparent_65%)]"
        />
        {/* ====================================================
            HEADER & INTRODUCING THE TOOLKIT
            Tone: Technical Teal / Mint
            ==================================================== */}
        <div className="space-y-4 mb-10 sm:mb-12">
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

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white font-display">
                Tools I use
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-zinc-400 font-display mt-0.5 sm:mt-1">
                A toolkit built project by project.
              </p>
            </div>

            <p className="text-xs sm:text-[13.5px] text-zinc-400 max-w-xl font-normal leading-relaxed lg:text-right">
              I’m still learning many of these. Here are the tools I’ve picked up by building things and solving problems that mattered to me.
            </p>
          </div>
        </div>

        {/* ====================================================
            MAIN TWO-COLUMN CATALOG & DETAIL LAYOUT
            Left (8 Cols): Full Category & Skill Catalog
            Right (4 Cols): Sticky Selected Skill Detail Panel
            ==================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left / Primary Area: All Categories & Skills remain visible */}
          <div className="lg:col-span-7 xl:col-span-8 grid gap-4 sm:gap-5 lg:grid-cols-1 xl:grid-cols-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isAi = cat.isAiCategory;
              return (
                <div
                  key={cat.num}
                  className={`
                    rounded-2xl p-4 sm:p-5 transition-all duration-200 border
                    ${
                      isAi
                        ? 'bg-[#0f0e15]/60 border-purple-900/30'
                        : 'bg-[#0c0c0e]/75 border-zinc-800/80 hover:border-zinc-700'
                    }
                  `}
                >
                  {/* Category Heading & Divider */}
                  <div className="flex items-center justify-between pb-3 mb-3 sm:mb-4 border-b border-zinc-900">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-teal-400/90">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-200 font-mono uppercase">
                          {cat.title}
                        </h3>
                      </div>
                    </div>

                    {cat.badge && (
                      <span className="text-[10px] sm:text-[11px] font-mono text-teal-400/80 truncate max-w-[150px] sm:max-w-none">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Skills Grid: All skills neatly aligned and always visible */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                    {cat.skills.map((skill) => {
                      const isSelected = selectedSkill.id === skill.id;
                      return (
                        <button
                          key={skill.id}
                          onClick={() => handleSelectSkill(skill)}
                          className={`
                            group relative px-3 py-2.5 sm:px-3.5 sm:py-2.5 rounded-xl text-left transition-all duration-150
                            border cursor-pointer outline-none flex items-center justify-between min-h-[44px] touch-manipulation focus-visible:ring-2 focus-visible:ring-teal-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0e]
                            ${
                              isSelected
                                ? 'bg-teal-950/40 border-teal-500/50 text-white shadow-sm ring-1 ring-teal-500/30'
                                : skill.isCore
                                ? 'bg-zinc-900/60 border-zinc-700/80 text-zinc-200 hover:border-teal-500/40 hover:text-white hover:bg-zinc-800/60'
                                : 'bg-zinc-900/30 border-zinc-800/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-900/60'
                            }
                          `}
                          aria-label={`Select ${skill.name}`}
                          aria-pressed={isSelected}
                        >
                          <div className="flex items-center gap-2 truncate pr-1">
                            {skill.isCore && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  isSelected ? 'bg-teal-400' : 'bg-zinc-500'
                                }`}
                              />
                            )}
                            <span
                              className={`text-xs sm:text-[13px] font-mono truncate ${
                                isSelected
                                  ? 'text-white font-medium'
                                  : skill.isCore
                                  ? 'text-zinc-200 font-medium'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {skill.name}
                            </span>
                          </div>

                          <ArrowRight
                            className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                              isSelected
                                ? 'opacity-100 text-teal-400'
                                : 'opacity-0 group-hover:opacity-40 text-zinc-400'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right / Secondary Area: Dedicated Sticky Selected Skill Detail Panel */}
          <div
            id="selected-skill-detail"
            className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 lg:self-start scroll-mt-28"
          >
              <div className="rounded-2xl bg-[#0c0c0e] border border-zinc-800/90 p-5 sm:p-7 shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
              {/* Header marker */}
              <div className="flex items-center justify-between pb-3 sm:pb-3.5 mb-4 sm:mb-5 border-b border-zinc-900 text-xs font-mono">
                <div className="flex items-center gap-2 text-teal-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-widest font-semibold text-[11px]">
                    Selected Skill
                  </span>
                </div>
                <span className="text-zinc-500 text-[11px]">
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
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Skill Title & Core Status */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="text-xl xs:text-2xl sm:text-3xl font-medium tracking-tight text-white font-display">
                        {selectedSkill.name}
                      </h4>
                      {selectedSkill.isCore && (
                        <span className="px-2 py-0.5 rounded-full bg-teal-950/40 text-[10px] font-mono text-teal-300 border border-teal-500/30">
                          core
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Used In Section */}
                  <div className="space-y-2 pt-2 border-t border-zinc-900/80">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Used in
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSkill.usedIn.map((project) => (
                        <span
                          key={project}
                          className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700/80 text-xs font-mono text-zinc-200 font-medium"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* What I used it for Section */}
                  <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-zinc-900/80">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                      What I used it for
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {selectedSkill.whatUsedFor}
                    </p>
                  </div>

                  {/* Optional Personal Note / Context */}
                  {selectedSkill.note && (
                    <div className="pt-2.5 sm:pt-3 border-t border-zinc-900/80 flex items-start gap-2 text-xs font-mono text-teal-300/90">
                      <span className="text-zinc-600">↳</span>
                      <span>{selectedSkill.note}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quiet Helpful Hint */}
            <div className="mt-3 sm:mt-4 px-2 flex items-center justify-between text-[11px] font-mono text-zinc-600">
              <span>Tap any skill to inspect</span>
              <span className="text-teal-400/80">38 tools</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsSection;
