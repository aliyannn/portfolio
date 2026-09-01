import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BentoGrid } from '@/components/BentoGrid';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/src/components/sections/Contact';
import { Footer } from '@/src/components/layout/Footer';
import { CursorSpotlight } from '@/src/components/layout/CursorSpotlight';

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
        <BentoGrid />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
