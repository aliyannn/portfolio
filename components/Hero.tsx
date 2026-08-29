'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileDown, ShieldCheck, Cpu, Sparkles, MessageCircle } from 'lucide-react';

// Dynamically import the Cyber Node Hologram with zero SSR overhead
const CyberHologram = dynamic(() => import('@/components/CyberHologram'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] sm:h-[600px] lg:h-[750px] rounded-3xl bg-zinc-950/40 border border-white/10 flex flex-col items-center justify-center p-6 space-y-3 backdrop-blur-xl">
      <div className="w-10 h-10 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
      <span className="text-xs font-mono text-cyan-300 animate-pulse tracking-wide">
        Initializing 3D Cyber Hologram...
      </span>
    </div>
  ),
});

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    'React & Three.js Engineer',
    'IT Systems & Network Specialist',
    'Fortinet Firewall Architect',
    'AI Agent & Vibe Coding Specialist',
    'Full Stack Cloud Integrator',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-visible bg-[#030712] transform-gpu">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/12 rounded-full blur-[180px] pointer-events-none" />

      {/* ====================================================================== */}
      {/* Single Unified Container Stage (No Column Boundary Clipping) */}
      {/* ====================================================================== */}
      <div className="relative max-w-7xl mx-auto w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center overflow-visible">
        
        {/* 🌟 Full-Stage 3D Canvas Layer (Center-Right Unconstrained Stage) */}
        <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[68%] h-[480px] sm:h-[600px] lg:h-[750px] pointer-events-auto z-0 overflow-visible flex items-center justify-center">
          <CyberHologram />
        </div>

        {/* 🌟 Foreground Content Layer (Left Aligned & High Z-Index) */}
        <div className="relative z-10 max-w-2xl pointer-events-auto flex flex-col items-start text-left space-y-5 w-full pt-4 lg:pt-0">
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/85 border border-emerald-500/40 backdrop-blur-md shadow-lg shadow-emerald-950/20"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-xs font-mono font-medium text-emerald-300 tracking-wide">
              Open for IT / Full Stack roles
            </span>
          </motion.div>

          {/* High-Tech Glassmorphic Micro-Badge Intro Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-zinc-900/70 border border-cyan-500/20 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)] mb-1 hover:scale-105 hover:border-cyan-400/50 transition-all duration-300 group cursor-default text-lg sm:text-xl md:text-2xl font-mono font-medium tracking-tight"
          >
            <span className="text-cyan-400 font-bold animate-pulse">&gt;</span>
            <span className="text-neutral-300">Hi, I'm</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 font-bold drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              Aliyan Gohar
            </span>
            <span className="inline-block w-2.5 h-5 bg-cyan-400 ml-1 animate-pulse rounded-sm align-middle shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.15]"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 drop-shadow-sm">
              Engineering Scalable Systems
            </span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 font-extrabold">
              &amp; High-Performance Web Applications
            </span>
          </motion.h1>

          {/* Dynamic Role Transition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-8 flex items-center gap-2 text-xs sm:text-base font-mono text-zinc-300"
          >
            <span className="text-purple-400 font-bold">&gt;</span>
            <span className="text-zinc-400">Spec:</span>
            <div className="relative overflow-hidden h-7 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-semibold text-cyan-300 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/30"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-xl leading-relaxed font-sans"
          >
            Bridging high-performance{' '}
            <span className="text-cyan-300 font-medium">
              React &amp; Three.js frontend architectures
            </span>{' '}
            with robust enterprise{' '}
            <span className="text-purple-300 font-medium">Fortinet network security</span>, cloud
            automation, and high-velocity AI agent workflows.
          </motion.p>

          {/* Skill Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400"
          >
            <span className="px-2.5 py-1 rounded-md bg-zinc-900/80 border border-white/10 flex items-center gap-1.5 text-zinc-300">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> React 18 &amp; R3F
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900/80 border border-white/10 flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> FortiGate 40F Security
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900/80 border border-white/10 flex items-center gap-1.5 text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Vibe Coding &amp; AI Agents
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3.5 pt-1"
          >
            <a
              href="#projects"
              className="group relative px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 text-zinc-950 font-extrabold tracking-wide">
                Explore Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="https://wa.me/923184321695?text=Hi%20Aliyan,%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity."
              target="_blank"
              rel="noopener noreferrer"
              className="group px-5 py-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 hover:border-emerald-400/80 backdrop-blur-xl text-emerald-300 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-xl hover:shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="font-mono">Let's Connect</span>
            </a>

            <a
              href="/Aliyan_Gohar_Software_Engineer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Aliyan_Gohar_Software_Engineer_Resume.pdf"
              className="group px-5 py-3 rounded-xl bg-zinc-900/80 border border-white/15 hover:border-cyan-500/50 backdrop-blur-xl text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-xl hover:bg-zinc-800/80"
            >
              <FileDown className="w-4 h-4 text-cyan-400 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-mono">Download CV</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
