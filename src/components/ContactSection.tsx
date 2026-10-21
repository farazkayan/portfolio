import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Clock,
} from 'lucide-react';
import { FlowButton } from './ui/flow-button';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [dhakaTime, setDhakaTime] = useState('');
  const [dhakaStatus, setDhakaStatus] = useState('');

  const email = 'contact@farazkh.dev';

  // Live Dhaka local time & contextual status
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeString = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now);
        setDhakaTime(timeString);

        const hourStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: 'numeric',
          hour12: false,
        }).format(now);
        const hour = parseInt(hourStr, 10);

        if (hour >= 1 && hour < 8) {
          setDhakaStatus('Likely asleep or debugging servers late 🌙');
        } else if (hour >= 8 && hour < 14) {
          setDhakaStatus('Student mode & morning coffee ☕');
        } else if (hour >= 14 && hour < 20) {
          setDhakaStatus('Building, tinkering & classes ⚡');
        } else {
          setDhakaStatus('Online & coding side projects 🚀');
        }
      } catch {
        setDhakaTime('Dhaka · UTC+6');
        setDhakaStatus('Available for cool ideas');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: 'GitHub',
      handle: '@farazkayan',
      url: 'https://github.com/farazkayan',
      icon: Github,
      accent: 'hover:border-zinc-500 hover:text-white',
    },
    {
      name: 'LinkedIn',
      handle: 'Faraz Kayan Haque',
      url: 'https://www.linkedin.com/in/faraz-kayan-haque-6b70253aa/',
      icon: Linkedin,
      accent: 'hover:border-blue-500/50 hover:text-blue-400',
    },
    {
      name: 'Instagram',
      handle: '@faraz_kayan_haque',
      url: 'https://www.instagram.com/faraz_kayan_haque/',
      icon: Instagram,
      accent: 'hover:border-rose-500/50 hover:text-rose-400',
    },
    {
      name: 'Facebook',
      handle: 'farazkayanhaque',
      url: 'https://facebook.com/farazkayanhaque',
      icon: Facebook,
      accent: 'hover:border-indigo-500/50 hover:text-indigo-400',
    },
  ];

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto w-full"
    >
      {/* Background radial accent glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.04)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="flex flex-col items-center text-center space-y-9 sm:space-y-11">
        {/* ====================================================
            EYEBROW / THE END LABEL
            ==================================================== */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span className="text-purple-400 font-semibold">07</span>
          <span className="text-zinc-700">/</span>
          <span className="uppercase tracking-widest text-zinc-300 font-medium">
            Contact &amp; Connect
          </span>
        </div>

        {/* ====================================================
            MAIN MESSAGE: CENTRAL SIGN-OFF STATEMENT
            ==================================================== */}
        <div className="space-y-3 max-w-2xl px-2">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-medium tracking-tight text-white font-display leading-[1.12]">
            I don’t know what I’ll build next.
          </h2>
          <p className="text-xl xs:text-2xl sm:text-3xl font-normal tracking-tight text-zinc-400 font-display">
            That’s kind of the fun part.
          </p>
          <p className="pt-1 text-xs xs:text-sm sm:text-base text-zinc-400 font-display max-w-lg mx-auto leading-relaxed">
            Have an idea, want to build something, or just want to say hi? I’m probably interested.
          </p>
        </div>

        {/* ====================================================
            LIVE DHAKA STATUS RADAR PILL
            Personal, real-time proof of life & location
            ==================================================== */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#1c1c22]/90 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            {dhakaTime || 'Dhaka · UTC+6'}
          </span>
          <span className="text-zinc-600 hidden xs:inline">·</span>
          <span className="text-zinc-400 text-[11px] sm:text-xs">
            Dhaka, BD · {dhakaStatus}
          </span>
        </div>

        {/* ====================================================
            PRIMARY ACTION: FLOW BUTTON & COPY EMAIL UTILITY
            ==================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-1">
          {/* Primary Action Button */}
          <FlowButton
            text="Say hello"
            href={`mailto:${email}`}
            variant="primary"
            className="w-full sm:w-auto min-h-[44px]"
          />

          {/* Quick Copy Email Utility */}
          <button
            type="button"
            onClick={handleCopy}
            className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1c1c22] border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs transition-all cursor-pointer w-full sm:w-auto outline-none focus:ring-1 focus:ring-purple-500/50 min-h-[44px] touch-manipulation"
            title="Copy email address"
            aria-label="Copy email address"
          >
            <span className="truncate text-zinc-300 group-hover:text-white text-xs">
              {email}
            </span>
            <span className="text-zinc-600">·</span>
            {copied ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium shrink-0">
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-zinc-400 group-hover:text-purple-300 transition-colors shrink-0">
                <Copy className="w-3.5 h-3.5" />
                <span>copy</span>
              </span>
            )}
          </button>
        </div>


        {/* ====================================================
            SOCIAL PROFILES GRID WITH REAL HANDLES
            ==================================================== */}
        <div className="w-full max-w-2xl pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#1c1c22]/90 border border-zinc-800/90 text-left transition-all duration-200 shadow-sm flex flex-col justify-between space-y-2 hover:-translate-y-0.5 ${social.accent}`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                      ↗
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-zinc-200 block">
                      {social.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 truncate block">
                      {social.handle}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* ====================================================
            QUIET SIGN-OFF DISCLAIMER
            ==================================================== */}
        <div className="pt-6 sm:pt-8 border-t border-zinc-900/90 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© 2026 Faraz Kayan Haque</span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-400">Response time: usually &lt;24 hours</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 font-sans italic text-[11px] sm:text-xs">
            <span>Built because why not.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
