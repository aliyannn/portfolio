'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  FileDown,
  ShieldCheck,
  Cpu,
  Sparkles,
  MessageCircle,
  Globe,
} from 'lucide-react';

// Dynamically import the Cyber Node Hologram with zero SSR overhead
const CyberHologram = dynamic(() => import('@/components/CyberHologram'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] sm:h-[420px] lg:h-[450px] rounded-2xl bg-zinc-950/40 border border-white/10 flex flex-col items-center justify-center p-6 space-y-3 backdrop-blur-xl">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
      <span className="text-xs font-mono text-cyan-300 animate-pulse tracking-wide">
        Initializing 3D Cyber Hologram...
      </span>
    </div>
  ),
});

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center pt-28 pb-16 overflow-visible bg-[#030712] transform-gpu">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Standardized Max-Width Container (Aligned with Bento Grid and other sections) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-visible z-10">
        
        {/* Left Column: Prominent Identity, Value Proposition & CTAs */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-left flex flex-col items-start w-full">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center gap-2"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/40 backdrop-blur-md shadow-md shadow-emerald-950/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-300 tracking-wide">
                Available for High-Impact Roles &amp; Projects
              </span>
            </div>
          </motion.div>

          {/* Prominent Name & Role Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white"
          >
            <span className="block text-white">
              I'm <span className="text-white">Aliyan Gohar</span>
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 mt-1">
              Systems &amp; Full-Stack Engineer
            </span>
          </motion.h1>

          {/* Clear, High-Value Subtitle Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-sans"
          >
            Full-Stack &amp; Systems Engineer specializing in high-performance{' '}
            <span className="text-cyan-300 font-medium">Next.js/React architectures</span>, custom enterprise systems, and automated cloud workflows. Bridging modern creative{' '}
            <span className="text-teal-300 font-medium">3D WebGL frontends</span> with robust, scalable backend engineering.
          </motion.p>

          {/* Spec Badges & Quick Proof */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-zinc-400 pt-1"
          >
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 flex items-center gap-1.5 text-zinc-300 hover:border-cyan-500/40 transition-colors">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Next.js 14 / React 18
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 flex items-center gap-1.5 text-zinc-300 hover:border-teal-500/40 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Three.js &amp; 3D WebGL
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 flex items-center gap-1.5 text-zinc-300 hover:border-blue-500/40 transition-colors">
              <Globe className="w-3.5 h-3.5 text-blue-400" /> WordPress &amp; Custom CMS
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 flex items-center gap-1.5 text-zinc-300 hover:border-purple-500/40 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Network Infrastructure &amp; Cloud
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="group relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5 text-zinc-950 font-bold tracking-wide">
                Explore Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="https://wa.me/923184321695?text=Hi%20Aliyan,%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity."
              target="_blank"
              rel="noopener noreferrer"
              className="group px-4 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 hover:border-emerald-400/80 backdrop-blur-xl text-emerald-300 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="font-mono">Let's Connect</span>
            </a>

            <a
              href="/Aliyan_Gohar_Software_Engineer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Aliyan_Gohar_Software_Engineer_Resume.pdf"
              className="group px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/15 hover:border-cyan-500/50 backdrop-blur-xl text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-md hover:bg-zinc-800/80"
            >
              <FileDown className="w-4 h-4 text-cyan-400 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-mono">Download CV</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column (3D Hologram & Floating Pills) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-6 xl:col-span-5 relative w-full h-[450px] lg:h-[500px] flex items-center justify-center overflow-visible"
        >
          <CyberHologram />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
