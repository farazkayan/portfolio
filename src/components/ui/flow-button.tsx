'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface FlowButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  text?: string;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'outline' | 'default';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function FlowButton({
  text = "See my projects",
  href,
  className = "",
  onClick,
  target,
  rel,
  variant = 'primary',
  ...props
}: FlowButtonProps) {
  const isPrimary = variant === 'primary';

  const leftArrowStroke = isPrimary
    ? 'stroke-zinc-950 group-hover:stroke-white'
    : 'stroke-white';

  const rightArrowStroke = isPrimary
    ? 'stroke-zinc-950 group-hover:stroke-white'
    : 'stroke-white';

  const labelColor = isPrimary
    ? 'text-zinc-950 group-hover:text-white'
    : 'text-white';

  const content = (
    <>
      {/* Left arrow (arr-2) - slides in from the left on hover */}
      <ArrowRight 
        className={`absolute w-4 h-4 left-[-25%] ${leftArrowStroke} fill-none z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`} 
      />

      {/* Button label */}
      <span className={`relative z-[1] -translate-x-3 group-hover:translate-x-3 ${labelColor} font-semibold text-sm tracking-tight transition-all duration-[800ms] ease-out`}>
        {text}
      </span>

      {/* Expanding dynamic radial circle */}
      <span 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-[50%] opacity-0 group-hover:w-[320px] group-hover:h-[320px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none" 
      />

      {/* Right arrow (arr-1) - slides out to the right on hover */}
      <ArrowRight 
        className={`absolute w-4 h-4 right-4 ${rightArrowStroke} fill-none z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`} 
      />
    </>
  );

  const primaryClasses = "border border-white/90 bg-white px-8 py-3 text-zinc-950 hover:border-purple-400 hover:rounded-[12px] hover:shadow-[0_0_28px_rgba(192,132,252,0.45)]";
  const outlineClasses = "border border-zinc-700/80 bg-zinc-900/90 hover:bg-purple-600/30 px-7 py-3 text-white hover:border-purple-400/80 hover:rounded-[12px] hover:shadow-[0_0_24px_rgba(168,85,247,0.35)]";

  const baseClasses = `group relative inline-flex min-h-11 items-center justify-center gap-1 overflow-hidden rounded-[100px] text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] select-none ${isPrimary ? primaryClasses : outlineClasses} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        target={target}
        rel={rel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={baseClasses}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}

export default FlowButton;
