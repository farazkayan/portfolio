import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  whatItIs: string;
  whyIRunIt: string;
  whatILearned: string;
}

const services: ServiceItem[] = [
  {
    id: 'open-webui',
    name: 'Open WebUI',
    category: 'AI interface',
    whatItIs:
      'A web interface for interacting with AI models and compatible model providers.',
    whyIRunIt:
      'It gives me a central interface for experimenting with AI and accessing models through my own infrastructure.',
    whatILearned:
      'Self-hosting AI interfaces, configuring model connections, managing application configuration, and integrating AI into a personal server environment.',
  },
  {
    id: 'memos',
    name: 'Memos',
    category: 'Personal notes',
    whatItIs: 'An open-source, self-hosted application for capturing and organizing notes.',
    whyIRunIt:
      'It gives me a lightweight place to keep personal notes on infrastructure and everyday ideas.',
    whatILearned:
      'Deploying a persistent web application, configuring access, and maintaining application data on my own server.',
  },
  {
    id: 'immich',
    name: 'Immich',
    category: 'Photo and video management',
    whatItIs: 'A self-hosted photo and video management platform.',
    whyIRunIt:
      'It gives me a private, self-managed alternative for organizing and accessing personal media.',
    whatILearned:
      'Deploying a multi-component application, managing media storage, understanding background processing, and considering the resource requirements of machine-learning features.',
  },
  {
    id: 'jellyfin',
    name: 'Jellyfin',
    category: 'Media streaming',
    whatItIs: 'An open-source media server for organizing and streaming personal media.',
    whyIRunIt:
      'I use it as the foundation for a self-hosted media library that I can access through compatible clients.',
    whatILearned:
      'Media-server deployment, library configuration, streaming connectivity, and the practical constraints of running media services on low-power hardware.',
  },
  {
    id: 'nextcloud',
    name: 'Nextcloud',
    category: 'Personal cloud storage',
    whatItIs: 'A self-hosted platform for storing, managing, and accessing files.',
    whyIRunIt:
      'It gives me control over my own cloud-storage environment rather than depending entirely on a third-party storage provider.',
    whatILearned:
      'Persistent data management, application configuration, trusted-domain settings, storage planning, and troubleshooting stateful services.',
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'Workflow automation',
    whatItIs:
      'A workflow automation platform that connects applications, APIs, and services.',
    whyIRunIt:
      'It provides a self-hosted environment for experimenting with automations and connecting different parts of my digital workflow.',
    whatILearned:
      'Workflow design, API integrations, handling credentials, connecting services, and automating tasks through event-driven processes.',
  },
  {
    id: 'homarr',
    name: 'Homarr',
    category: 'Homelab dashboard',
    whatItIs:
      'A customizable dashboard for bringing self-hosted services together in one interface.',
    whyIRunIt:
      'It gives me a central homepage for navigating my homelab and keeping its services organized.',
    whatILearned:
      'Service organization, dashboard configuration, application integration, and designing a more convenient interface for managing a multi-service environment.',
  },
  {
    id: 'guacamole',
    name: 'Apache Guacamole',
    category: 'Browser-based remote access',
    whatItIs:
      'A clientless remote desktop gateway that supports protocols such as RDP, VNC, and SSH.',
    whyIRunIt:
      'I have explored using browser-based access to remote computers without needing a dedicated desktop client.',
    whatILearned:
      'Remote-access architecture, connection configuration, web-based gateways, and the security considerations involved in exposing administrative access.',
  },
  {
    id: 'continuity-mcp',
    name: 'Continuity + Obsidian',
    category: 'AI memory · MCP integration',
    whatItIs:
      'Continuity is my custom memory-infrastructure project, designed to connect structured memory operations with an Obsidian-based vault through MCP tools.',
    whyIRunIt:
      'I am building a way for AI tools to search memories, retrieve related information, and propose memory changes while keeping the underlying knowledge accessible in a human-readable vault.',
    whatILearned:
      'MCP server development, tool integration, structured memory retrieval, relationships between memories, and designing human-review workflows for AI-assisted knowledge management.',
  },
];

export const HomelabSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('jellyfin');
  const selectedService = services.find((service) => service.id === selectedId)!;
  const serviceDetails = [
    { label: 'What it is', text: selectedService.whatItIs },
    { label: 'Why I run it', text: selectedService.whyIRunIt },
    { label: 'What I learned', text: selectedService.whatILearned },
  ];

  return (
    <section
      id="homelab"
      className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.03)_0%,transparent_65%)]"
      />

      <div className="space-y-9 sm:space-y-12">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-3 text-xs font-mono text-zinc-500">
            <span className="font-semibold text-emerald-400">05</span>
            <span className="text-zinc-700">/</span>
            <span className="font-medium uppercase tracking-widest text-zinc-300">
              Infrastructure
            </span>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-medium tracking-tight text-white font-display">
              Things I run at home.
            </h2>
            <div className="max-w-3xl space-y-2 text-sm leading-7 text-zinc-400 sm:text-[15px]">
              <p>
                I had an old laptop lying around, so naturally, I turned it into a
                server. Now it runs my own little ecosystem of self-hosted
                services, from AI and photo storage to automation and cloud
                storage. It&apos;s not the most powerful machine, but it&apos;s
                mine, and it&apos;s taught me a lot about running things myself.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 pt-1 sm:space-y-6 sm:pt-2">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/90 px-4 py-2.5 text-xs font-mono text-zinc-200 shadow-sm">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
              <span>Dell Inspiron 7348</span>
              <span className="text-[11px] text-zinc-500">(Ubuntu 24.04 · CasaOS)</span>
            </div>

            <div className="h-5 w-px bg-zinc-800 sm:h-6" />
            <span aria-hidden="true" className="-my-1 text-[9px] text-zinc-600">▼</span>

            <div className="mt-1 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/90 px-4 py-2.5 text-xs font-mono text-zinc-300 shadow-sm">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
              <span>Docker</span>
            </div>

            <div className="h-5 w-px bg-zinc-800 sm:h-6" />
          </div>

          <div className="hidden md:block">
            <div className="relative h-px w-full bg-zinc-800">
              <div className="absolute left-1/2 -top-1 h-2 w-px bg-zinc-800" />
            </div>
            <div className="grid grid-cols-5 gap-3 pt-3">
              {services.map((service) => {
                const isSelected = service.id === selectedService.id;

                return (
                  <div key={service.id} className="flex flex-col items-center">
                    <div aria-hidden="true" className="-mt-3 mb-1 h-3 w-px bg-zinc-800" />
                    <span aria-hidden="true" className="-mt-1.5 mb-1 text-[9px] text-zinc-700">▼</span>
                    <button
                      type="button"
                      onClick={() => setSelectedId(service.id)}
                      aria-pressed={isSelected}
                      className={`min-h-11 w-full cursor-pointer rounded-lg border px-2.5 py-2 text-center font-mono text-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400/70 ${
                        isSelected
                          ? 'border-emerald-500/60 bg-zinc-900 text-white ring-1 ring-emerald-500/20'
                          : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-zinc-200'
                      }`}
                    >
                      {service.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-1 md:hidden">
            <p className="mb-2 text-center text-[11px] font-mono text-zinc-500">
              Known services
            </p>
            <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
              {services.map((service) => {
                const isSelected = service.id === selectedService.id;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedId(service.id)}
                    aria-pressed={isSelected}
                    className={`flex min-h-11 items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-left font-mono text-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400/70 ${
                      isSelected
                        ? 'border-emerald-500/60 bg-zinc-900 text-white ring-1 ring-emerald-500/20'
                        : 'border-zinc-800/80 bg-zinc-950/70 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="truncate font-medium">{service.name}</span>
                    {isSelected && (
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-1 sm:pt-2">
          <div className="rounded-2xl border border-zinc-800/90 bg-[#0c0c0e]/95 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="space-y-4 sm:space-y-6"
                aria-live="polite"
              >
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3 sm:pb-4">
                  <h3 className="text-xl font-medium tracking-tight text-white font-display sm:text-2xl">
                    {selectedService.name}
                  </h3>
                  <span className="text-[10.5px] font-mono font-semibold tracking-wide text-emerald-400 sm:text-[11px]">
                    {selectedService.category}
                  </span>
                </div>

                {serviceDetails.map((detail, index) => (
                  <div
                    key={detail.label}
                    className={`space-y-1.5 ${
                      index > 0 ? 'border-t border-zinc-900/80 pt-3 sm:pt-4' : ''
                    }`}
                  >
                    <span className="block text-[10.5px] font-mono font-semibold uppercase tracking-widest text-zinc-500 sm:text-[11px]">
                      {detail.label}
                    </span>
                    <p className="text-xs leading-relaxed text-zinc-300 sm:text-sm">
                      {detail.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomelabSection;
