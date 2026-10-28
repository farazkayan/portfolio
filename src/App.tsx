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

const PhotographyPage = lazy(() =>
  import('./components/PhotographyPage').then((m) => ({
    default: m.PhotographyPage,
  }))
);

type RouteView = 'home' | 'projects' | 'photography';

const getInitialView = (): RouteView => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname;
  const hash = window.location.hash;
  const search = window.location.search;

  if (
    path === '/photography' ||
    hash === '#/photography' ||
    search.includes('view=photography')
  ) {
    return 'photography';
  }
  if (
    path === '/projects' ||
    hash === '#/projects' ||
    search.includes('view=projects')
  ) {
    return 'projects';
  }
  return 'home';
};

export default function App() {
  const [currentView, setCurrentView] = useState<RouteView>(getInitialView);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleGoToAllProjects = () => {
    window.history.pushState(null, '', '/projects');
    setCurrentView('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromProjects = () => {
    window.history.pushState(null, '', '/');
    setCurrentView('home');
    window.requestAnimationFrame(() => {
      const target = document.getElementById('projects');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  const handleGoToPhotography = () => {
    window.history.pushState(null, '', '/photography');
    setCurrentView('photography');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromPhotography = () => {
    window.history.pushState(null, '', '/');
    setCurrentView('home');
    window.requestAnimationFrame(() => {
      const target = document.getElementById('hobbies');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  if (currentView === 'projects') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#141418]" />}>
        <AllProjectsPage onBack={handleBackFromProjects} />
      </Suspense>
    );
  }

  if (currentView === 'photography') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#141418]" />}>
        <PhotographyPage onBack={handleBackFromPhotography} />
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
        <HobbiesSection onExplorePhotography={handleGoToPhotography} />
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
