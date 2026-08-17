import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileDown, Terminal, ShieldCheck, Cpu, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Terminal3D } from '../Terminal3D';

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
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden bg-[#030712] transform-gpu">
      {/* 1. Cyber Grid & Dot Matrix Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* 2. Ambient Radial Purple / Cyan Light Beams behind Terminal & Content */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-600/12 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left Column: IT-Themed Hero Typography & CTAs */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          
          {/* Status Pill: Pulsing green dot with "Open for IT / Full Stack roles" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/80 border border-emerald-500/40 backdrop-blur-xl w-max shadow-lg shadow-emerald-950/20"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-xs font-mono font-medium text-emerald-300 tracking-wide">
              Open for IT / Full Stack roles
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
          >
            <span className="block text-zinc-400 text-lg sm:text-xl font-mono font-normal mb-2 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">&gt;</span> Hi, I'm{' '}
              <span className="text-white font-semibold underline decoration-cyan-500/50 decoration-2 underline-offset-4">
                {PORTFOLIO_DATA.personalInfo.name}
              </span>
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 drop-shadow-sm">
              Engineering Scalable Systems
            </span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 font-extrabold">
              &amp; High-Performance Web Applications
            </span>
          </motion.h1>

          {/* Dynamic Monospace Role Transition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 flex items-center gap-2.5 text-base sm:text-lg font-mono text-zinc-300"
          >
            <span className="text-purple-400 font-bold">&gt;</span>
            <span className="text-zinc-400">Spec:</span>
            <div className="relative overflow-hidden h-8 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-semibold text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/30"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Clean Monospace / Sans Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed font-sans"
          >
            Bridging high-performance <span className="text-cyan-300 font-medium">React &amp; Three.js frontend architectures</span> with robust enterprise <span className="text-purple-300 font-medium">Fortinet network security</span>, cloud automation, and high-velocity AI agent workflows.
          </motion.p>

          {/* Key Skill Highlights Pills */}
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
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Primary Glowing Gradient "Explore Projects" Button */}
            <a
              href="#projects"
              className="group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 text-zinc-950 font-extrabold tracking-wide">
                Explore Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {/* Secondary Glassmorphism "Download CV" Button linking to /resume.pdf */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Aliyan_Gohar_Resume.pdf"
              className="group px-7 py-3.5 rounded-xl bg-zinc-900/80 border border-white/15 hover:border-cyan-500/50 backdrop-blur-xl text-white font-medium text-sm flex items-center gap-2.5 transition-all duration-300 shadow-xl hover:bg-zinc-800/80"
            >
              <FileDown className="w-4.5 h-4.5 text-cyan-400 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-mono">Download CV</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Centerpiece 3D Cyber Terminal & Server Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative w-full"
        >
          <Terminal3D />
        </motion.div>
      </div>

      {/* Floating Animated Scroll Prompt */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { duration: 1, delay: 0.8 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-cyan-400 transition-colors z-20"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Scroll Down</span>
        <div className="w-5 h-9 rounded-full border border-zinc-700/80 p-1 flex justify-center backdrop-blur-xs">
          <div className="w-1.5 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;
