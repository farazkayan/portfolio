import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { HomelabSection } from './components/HomelabSection';
import { HobbiesSection } from './components/HobbiesSection';
import { ContactSection } from './components/ContactSection';
import HalftoneWordmarkFooter from './components/ui/halftone-wordmark-footer';

const AllProjectsPage = lazy(() =>
  import('./components/AllProjectsPage').then((m) => ({
    default: m.AllProjectsPage,
  }))
);

export default function App() {
  const [isAllProjectsView, setIsAllProjectsView] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.pathname === '/projects' ||
      window.location.hash === '#/projects' ||
      window.location.search.includes('view=projects')
    );
  });

  useEffect(() => {
    const handlePopState = () => {
      const isProjects =
        window.location.pathname === '/projects' ||
        window.location.hash === '#/projects' ||
        window.location.search.includes('view=projects');
      setIsAllProjectsView(isProjects);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleGoToAllProjects = () => {
    window.history.pushState(null, '', '/projects');
    setIsAllProjectsView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    window.history.pushState(null, '', '/');
    setIsAllProjectsView(false);
    window.requestAnimationFrame(() => {
      const target = document.getElementById('projects');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  if (isAllProjectsView) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#141418]" />}>
        <AllProjectsPage onBack={handleBackToPortfolio} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#141418] text-zinc-100 flex flex-col font-sans selection:bg-purple-900/40 selection:text-purple-200">
      {/* Floating Limelight Navbar */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-1 flex flex-col">
        <HeroHome />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onViewAllProjects={handleGoToAllProjects} />
        <HomelabSection />
        <HobbiesSection />
        <ContactSection />
        <HalftoneWordmarkFooter
          wordmark="faraz"
          label=""
          meta=""
          palette={{
            background: "#141418",
            ink: "#e4e4e7",
            warm: "#c084fc",
          }}
          height="520px"
        />
      </main>
    </div>
  );
}
