import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileDown, Terminal, Sparkles, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

// Lazy load 3D Hero Canvas for performance optimization
const HeroCanvas = lazy(() => import('../3d/HeroCanvas'));

function ShimmerPlaceholder() {
  return (
    <div className="w-full h-[420px] sm:h-[520px] lg:h-[580px] rounded-3xl bg-neutral-900/30 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      <div className="w-20 h-20 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin mb-4" />
      <span className="text-xs font-mono text-neutral-400">Loading Interactive 3D Canvas...</span>
    </div>
  );
}

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = PORTFOLIO_DATA.roles;

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-purple-500/5 to-transparent transform-gpu">
      {/* Background Aceternity-style Ambient Spotlight Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Particle Stars Backdrop (Pure CSS) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Column: Headline, Badge, Bio & CTAs */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Top Badge: Glowing "Available for opportunities" live pulsing badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/60 border border-emerald-500/30 backdrop-blur-md w-max shadow-lg shadow-emerald-950/20"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-xs font-mono font-medium text-emerald-300">
              Available for opportunities
            </span>
          </motion.div>

          {/* Headline: High-impact typography with silver-to-white gradient text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
          >
            <span className="block text-slate-300 text-2xl sm:text-3xl font-medium mb-1 font-sans">
              Hello, I'm
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 drop-shadow-sm">
              {PORTFOLIO_DATA.personalInfo.name}
            </span>
          </motion.h1>

          {/* Dynamic Role Transition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 flex items-center gap-3 text-lg sm:text-xl font-mono text-slate-300"
          >
            <span className="text-indigo-400 font-bold">&gt;</span>
            <span className="text-neutral-400">Specializing in</span>
            <div className="relative overflow-hidden h-8 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Sub-headline Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-sans"
          >
            {PORTFOLIO_DATA.personalInfo.subHeadline}
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Primary Glowing "Explore Work" Button */}
            <a
              href="#projects"
              className="group relative px-7 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {/* Secondary Glassmorphic "Download CV" Button linking directly to /resume.pdf */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Aliyan_Gohar_Resume.pdf"
              className="group px-7 py-4 rounded-full bg-neutral-900/40 border border-white/10 hover:border-indigo-500/40 backdrop-blur-xl text-white font-semibold text-sm flex items-center gap-2.5 transition-all duration-300 shadow-2xl hover:bg-neutral-800/50"
            >
              <FileDown className="w-4.5 h-4.5 text-indigo-400 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download CV</span>
            </a>

            {/* Contact Button */}
            <a
              href="#contact"
              className="px-6 py-4 rounded-full bg-neutral-900/30 border border-white/10 text-neutral-300 hover:text-white hover:border-purple-500/40 font-medium text-sm flex items-center gap-2 backdrop-blur-md transition-all duration-300"
            >
              <Terminal className="w-4 h-4 text-purple-400" />
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Holographic Glass Orb / Cyber Core Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <Suspense fallback={<ShimmerPlaceholder />}>
            <HeroCanvas />
          </Suspense>
        </motion.div>
      </div>

      {/* Floating Animated Scroll Down Prompt */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { duration: 1, delay: 0.8 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 hover:text-indigo-400 transition-colors"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border-2 border-neutral-700/80 p-1 flex justify-center backdrop-blur-xs">
          <div className="w-1.5 h-2 bg-indigo-400 rounded-full animate-bounce" />
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;
