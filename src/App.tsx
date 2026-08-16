import React from 'react';
import { useLenis } from './hooks/useLenis';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CursorSpotlight } from './components/layout/CursorSpotlight';
import { Hero } from './components/sections/Hero';
import { BentoAbout } from './components/sections/BentoAbout';
import { Projects } from './components/sections/Projects';
import { ExperienceSkills } from './components/sections/ExperienceSkills';
import { Contact } from './components/sections/Contact';

export function App() {
  // Initialize Lenis smooth momentum scrolling
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 bg-noise selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      {/* Dynamic Mouse Spotlight */}
      <CursorSpotlight />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <BentoAbout />
        <Projects />
        <ExperienceSkills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
