import React, { useState } from 'react';
import { Mail, ArrowRight, Copy, Check, Github, Linkedin, Instagram, Facebook } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'contact@farazkh.dev';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/farazkayan',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/faraz-kayan-haque-6b70253aa/',
      icon: Linkedin,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/faraz_kayan_haque/',
      icon: Instagram,
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/farazkayanhaque',
      icon: Facebook,
    },
  ];

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto w-full"
    >
      {/* Subtle background atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.035)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="flex flex-col items-center text-center space-y-7 sm:space-y-9">
        {/* ====================================================
            EYEBROW / THE END LABEL
            ==================================================== */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span className="text-zinc-400 font-semibold">07</span>
          <span className="text-zinc-700">/</span>
          <span className="uppercase tracking-widest text-zinc-400 font-medium">
            The End
          </span>
        </div>

        {/* ====================================================
            MAIN MESSAGE: CENTRAL SIGN-OFF STATEMENT
            ==================================================== */}
        <div className="space-y-2 sm:space-y-3 max-w-2xl px-2">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white font-display leading-[1.18] sm:leading-[1.15]">
            I don’t know what I’ll build next.
          </h2>
          <p className="text-lg xs:text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-zinc-400 font-display">
            That’s kind of the fun part.
          </p>
        </div>

        {/* ====================================================
            DESCRIPTIVE NOTE
            ==================================================== */}
        <p className="text-xs xs:text-sm sm:text-base text-zinc-400 font-display max-w-lg leading-relaxed px-2">
          Have an idea, want to build something, or just want to say hi? I’m probably interested.
        </p>

        {/* ====================================================
            PRIMARY ACTION: SAY HELLO & EMAIL UTILITY
            Mobile friendly flex layout
            ==================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 sm:pt-2 w-full max-w-md">
          {/* Primary Action Button */}
          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-zinc-950 font-mono text-xs font-medium hover:bg-zinc-200 transition-all cursor-pointer shadow-sm w-full sm:w-auto min-h-[44px] touch-manipulation"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-900" />
            <span>Say hello</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Quick Copy Email Utility */}
          <button
            type="button"
            onClick={handleCopy}
            className="group inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-[#0c0c0e] border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs transition-all cursor-pointer w-full sm:w-auto outline-none focus:ring-1 focus:ring-purple-500/50 min-h-[44px] touch-manipulation"
            title="Copy email address"
            aria-label="Copy email address"
          >
            <span className="truncate max-w-[170px] xs:max-w-[210px] sm:max-w-none text-zinc-400 group-hover:text-zinc-200 text-[11px] sm:text-xs">
              {email}
            </span>
            <span className="text-zinc-600">·</span>
            {copied ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium shrink-0">
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-zinc-500 group-hover:text-purple-300 transition-colors shrink-0">
                <Copy className="w-3.5 h-3.5" />
                <span>copy</span>
              </span>
            )}
          </button>
        </div>

        {/* ====================================================
            SOCIAL LINKS: UNDERSTATED ICON ROW
            ==================================================== */}
        <div className="pt-4 sm:pt-6 w-full">
          <nav aria-label="Social profiles" className="flex items-center justify-center gap-3 sm:gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0c0c0e]/90 border border-zinc-800/90 hover:border-zinc-600 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all duration-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 touch-manipulation"
                  aria-label={social.name}
                  title={social.name}
                >
                  <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-200 group-hover:scale-110" />
                  <span className="sr-only">{social.name}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* ====================================================
            FOOTER & QUIET PERSONAL SIGNATURE
            ==================================================== */}
        <div className="pt-8 sm:pt-14 border-t border-zinc-900/80 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-600">
          <div>
            <span>© 2026 Faraz Kayan Haque.</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-500 font-sans italic text-[11px] sm:text-xs">
            <span>Built because why not.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/70 inline-block animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
