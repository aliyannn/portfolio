import React from 'react';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { CursorSpotlight } from '@/src/components/layout/CursorSpotlight';
import { Hero } from '@/components/Hero';
import { BentoAbout } from '@/src/components/sections/BentoAbout';
import { Projects } from '@/src/components/sections/Projects';
import { ExperienceSkills } from '@/src/components/sections/ExperienceSkills';
import { Contact } from '@/src/components/sections/Contact';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 bg-noise selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      {/* Dynamic Mouse Spotlight */}
      <CursorSpotlight />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main Portfolio Sections */}
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
