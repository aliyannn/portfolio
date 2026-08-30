'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Cpu,
  MapPin,
  Sparkles,
  Zap,
  ShieldCheck,
  Trophy,
  Layers,
  CheckCircle2,
  Globe,
  Bot,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../src/data/portfolioData';
import RubiksCubeCard from './RubiksCubeCard';

export const BentoGrid: React.FC = () => {
  const [pktTime, setPktTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setPktTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative py-20 overflow-hidden bg-[#030712] transform-gpu">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none transform-gpu" />

      {/* Main Outer Responsive Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ABOUT &amp; ARCHITECTURE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Engineering Versatility &amp;{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              Systems Expertise
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base mt-3"
          >
            A unified view into my engineering philosophy, core technology stack, delivery metrics, and global availability.
          </motion.p>
        </div>

        {/* Balanced 3-Column Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-7xl mx-auto w-full">
          {/* ====================================================================== */}
          {/* ROW 1 LEFT: Card 1 (Bio & Philosophy): md:col-span-2 */}
          {/* ====================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2 p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-cyan-500/30 transition-all duration-300 group h-full [contain:paint]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                  SYSTEMS OVERVIEW
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Full-Spectrum Engineering Philosophy
              </h3>

              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                {PORTFOLIO_DATA.personalInfo.bio}
              </p>

              {/* Active Engineering Focus / Core Pillars Micro-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
                <div className="p-3 rounded-xl bg-zinc-950/50 border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-300 mb-1">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>High-Velocity Web</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 leading-snug">
                    Next.js 14, SSR/ISR, Edge Middleware &amp; Three.js
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/50 border border-white/[0.06] hover:border-purple-500/30 transition-all flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-purple-300 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    <span>Infrastructure &amp; Sec</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 leading-snug">
                    Enterprise Fortinet Networks &amp; Automated CI/CD
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/50 border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-300 mb-1">
                    <Bot className="w-3.5 h-3.5 text-amber-400" />
                    <span>AI Agents &amp; Vibe</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 leading-snug">
                    Autonomous Dev Agents &amp; Prompt Automation
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Tech Pills Anchored at Bottom Edge */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 text-xs font-mono mt-2">
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-cyan-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> React 18 &amp; Three.js
              </span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-blue-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> WordPress &amp; CMS
              </span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-purple-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> FortiGate 40F
              </span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-amber-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> AI Agent Workflows
              </span>
            </div>
          </motion.div>

          {/* ====================================================================== */}
          {/* ROW 1 RIGHT: Card 2 (Core Tech Stack): md:col-span-1 */}
          {/* ====================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="md:col-span-1 p-6 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-purple-500/30 transition-all duration-300 group h-full [contain:paint]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                  CORE STACK
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                Technology Stack
              </h3>

              <div className="space-y-3">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" /> React &amp; Next.js
                    </span>
                    <span className="text-cyan-400">95%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full w-[95%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-400" /> WordPress &amp; CMS
                    </span>
                    <span className="text-blue-400">94%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full w-[94%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Fortinet &amp; Security
                    </span>
                    <span className="text-purple-400">95%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full w-[95%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Vibe Coding &amp; AI
                    </span>
                    <span className="text-amber-400">96%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full w-[96%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400 flex items-center justify-between mt-3">
              <span>Verified Skills</span>
              <span className="text-purple-400 font-semibold">100% Tested</span>
            </div>
          </motion.div>

          {/* ====================================================================== */}
          {/* ROW 2 LEFT: Card 3 (Location & Timezone): md:col-span-1 */}
          {/* ====================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="md:col-span-1 p-6 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-emerald-500/30 transition-all duration-300 group h-full [contain:paint]"
          >
            <div>
              {/* Header Row */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Location &amp; Timezone
                    </h3>
                    <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>Lahore, PK • UTC+5</span>
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-semibold tracking-wide flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AVAILABLE
                </span>
              </div>

              {/* Digital Clock Block */}
              <div className="bg-zinc-950/70 border border-white/[0.08] p-3 rounded-xl text-center mb-3 shadow-inner">
                <span className="text-[9px] font-mono text-zinc-400 block mb-0.5 uppercase tracking-widest font-semibold">
                  CURRENT LOCAL TIME (PKT)
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 tracking-wider block drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                  {pktTime || '00:00:00 PM'}
                </span>
              </div>

              {/* Compact 3-Column Overlap Grid */}
              <div className="mb-2">
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 font-semibold text-center sm:text-left">
                  GLOBAL TIMEZONE OVERLAP
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-center my-2">
                  <div className="p-2 rounded-lg bg-zinc-950/60 border border-white/[0.06] hover:border-cyan-500/30 transition-colors">
                    <span className="text-[10px] text-neutral-400 block">🇬🇧 UK/EU</span>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold">11AM-8PM</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-950/60 border border-white/[0.06] hover:border-indigo-500/30 transition-colors">
                    <span className="text-[10px] text-neutral-400 block">🇺🇸 US EST</span>
                    <span className="text-[11px] font-mono text-indigo-300 font-semibold">7AM-2PM</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-950/60 border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
                    <span className="text-[10px] text-neutral-400 block">🇦🇪 Gulf</span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">Full Day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 text-[10px] font-mono text-zinc-400 border-t border-white/5 flex items-center gap-1 mt-2">
              <Zap className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span>⚡ SLA: &lt; 2h Response • Remote Ready</span>
            </div>
          </motion.div>

          {/* ====================================================================== */}
          {/* ROW 2 RIGHT: Card 4 (Engineering Delivery Track Record): md:col-span-2 */}
          {/* ====================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="md:col-span-2 p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-amber-500/20 backdrop-blur-md flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl group h-full [contain:paint]"
          >
            <div>
              {/* Header Row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                      Engineering Delivery Track Record
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Key engineering benchmarks across multi-stack production systems.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-semibold">
                  IMPACT METRICS
                </span>
              </div>

              {/* Vertically Centered Tall Metric Boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto py-3">
                <div className="py-6 px-3 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-center flex flex-col justify-center">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 block mb-1">
                    4+ Yrs
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide">
                    Tech Experience
                  </span>
                </div>

                <div className="py-6 px-3 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-center flex flex-col justify-center">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 block mb-1">
                    99.9%
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide">
                    System Uptime
                  </span>
                </div>

                <div className="py-6 px-3 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-center flex flex-col justify-center">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 block mb-1">
                    100%
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide">
                    Delivery Rate
                  </span>
                </div>

                <div className="py-6 px-3 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-center flex flex-col justify-center">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-purple-400 block mb-1">
                    &lt; 2h
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide">
                    Avg Response
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Deployments Footer */}
            <div className="text-xs font-mono text-emerald-400/90 flex items-center gap-1.5 pt-3 border-t border-white/[0.06]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Verified React, Next.js, WordPress &amp; Fortinet Deployments</span>
            </div>
          </motion.div>

          {/* ====================================================================== */}
          {/* ROW 3: Interactive 3D Rubik's Cube Bento Feature Card: md:col-span-3 */}
          {/* ====================================================================== */}
          <div className="md:col-span-3 [contain:paint]">
            <RubiksCubeCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
