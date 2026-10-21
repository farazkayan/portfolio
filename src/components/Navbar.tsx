import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LimelightNav, NavItem } from './ui/limelight-nav';
import {
  Home,
  User,
  GraduationCap,
  Code2,
  FolderKanban,
  Server,
  Gamepad2,
  Mail,
} from 'lucide-react';

const SECTION_IDS = [
  'home',
  'about',
  'education',
  'skills',
  'projects',
  'homelab',
  'hobbies',
  'contact',
];

export const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const isUserClickingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  const scrollToSection = (id: string, index: number) => {
    isUserClickingRef.current = true;
    setActiveTab(index);

    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = window.setTimeout(() => {
      isUserClickingRef.current = false;
    }, 1000);

    const target = document.getElementById(id);
    if (target) {
      const navOffset = 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  // Scroll detection to highlight active item
  const handleScroll = useCallback(() => {
    if (isUserClickingRef.current) return;

    const triggerY = Math.min(window.innerHeight * 0.35, 300);

    // If near bottom of the page, activate the last tab (contact)
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 30) {
      setActiveTab(SECTION_IDS.length - 1);
      return;
    }

    const sections = SECTION_IDS.map((id, index) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return { index, rect: el.getBoundingClientRect() };
    }).filter((v): v is { index: number; rect: DOMRect } => Boolean(v));

    if (!sections.length) return;

    const current = sections.find(
      ({ rect }) => rect.top <= triggerY && rect.bottom > triggerY
    );

    if (current) {
      setActiveTab(current.index);
      return;
    }

    // Default to closest section
    let closestIndex = sections[0].index;
    let closestDistance = Infinity;
    sections.forEach(({ index, rect }) => {
      const distance = Math.abs(rect.top - triggerY);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveTab(closestIndex);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Nav items with Faraz's components and names
  const customNavItems: NavItem[] = [
    {
      id: 'home',
      icon: <Home />,
      label: 'Home',
      onClick: () => scrollToSection('home', 0),
    },
    {
      id: 'about',
      icon: <User />,
      label: 'About',
      onClick: () => scrollToSection('about', 1),
    },
    {
      id: 'education',
      icon: <GraduationCap />,
      label: 'Education',
      onClick: () => scrollToSection('education', 2),
    },
    {
      id: 'skills',
      icon: <Code2 />,
      label: 'Skills',
      onClick: () => scrollToSection('skills', 3),
    },
    {
      id: 'projects',
      icon: <FolderKanban />,
      label: 'Projects',
      onClick: () => scrollToSection('projects', 4),
    },
    {
      id: 'homelab',
      icon: <Server />,
      label: 'Homelab',
      onClick: () => scrollToSection('homelab', 5),
    },
    {
      id: 'hobbies',
      icon: <Gamepad2 />,
      label: 'Hobbies',
      onClick: () => scrollToSection('hobbies', 6),
    },
    {
      id: 'contact',
      icon: <Mail />,
      label: 'Contact',
      onClick: () => scrollToSection('contact', 7),
    },
  ];

  return (
    <>
      {/* Brand Anchor (FKH) — Left-aligned, fixed on desktop */}
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('home', 0);
        }}
        className="fixed top-5 left-6 sm:left-8 z-50 hidden lg:flex items-center gap-2 group text-zinc-300 hover:text-white transition-colors"
        aria-label="Faraz Kayan Haque Home"
      >
        <div className="w-8 h-8 rounded-full border border-zinc-800/80 bg-[#0c0c0e]/90 backdrop-blur-md flex items-center justify-center font-display font-semibold text-xs tracking-wider text-zinc-300 group-hover:border-zinc-500/50 group-hover:text-white transition-colors shadow-sm">
          FKH
        </div>
      </a>

      {/* Floating Limelight Navigation Bar */}
      <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-0.75rem)] flex items-center justify-center">
        <LimelightNav
          className="bg-secondary dark:bg-card/50 dark:border-accent/50 rounded-xl shadow-2xl backdrop-blur-md max-w-full"
          items={customNavItems}
          activeIndex={activeTab}
          onTabChange={(index) => setActiveTab(index)}
        />
      </div>
    </>
  );
};

export { LimelightNav };
export default Navbar;
