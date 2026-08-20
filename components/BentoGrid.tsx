'use client';

import React, { useState, useEffect } from 'react';
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
  Server,
  Activity,
  CheckCircle2,
  Globe,
  Layout,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../src/data/portfolioData';

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
    <section id="about" className="relative py-20 overflow-hidden bg-[#030712]">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

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
            A unified view into my engineering philosophy, core technology stack, geographic availability, and delivery metrics.
          </motion.p>
        </div>

        {/* Balanced 3-Column Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 (Bio): lg:col-span-2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-cyan-500/30 transition-all duration-300 group h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
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

              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {PORTFOLIO_DATA.personalInfo.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 text-xs font-mono">
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-cyan-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> React 18 &amp; Three.js
              </span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-blue-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> WordPress &amp; CMS Architecture
              </span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-purple-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Fortinet FortiGate 40F
              </span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-amber-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Vibe Coding &amp; AI Agents
              </span>
            </div>
          </motion.div>

          {/* Card 2 (Core Stack): lg:col-span-1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 p-6 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-purple-500/30 transition-all duration-300 group h-full"
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

          {/* Card 3 (Location & Timezone): lg:col-span-1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 p-6 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-emerald-500/30 transition-all duration-300 group h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AVAILABLE
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                Location &amp; Timezone
              </h3>

              <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lahore, Pakistan (PKT)</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/70 border border-white/5 text-center">
                <span className="text-[10px] font-mono text-zinc-500 block mb-1">CURRENT LOCAL TIME</span>
                <span className="text-lg font-mono font-bold text-emerald-400 tracking-wider">
                  {pktTime || '00:00:00 PM'}
                </span>
              </div>
            </div>

            <div className="pt-3 text-[11px] font-mono text-zinc-400 border-t border-white/5 mt-4">
              <span>Remote &amp; On-Site Support Ready</span>
            </div>
          </motion.div>

          {/* Card 4 (Impact & Metrics): lg:col-span-2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-amber-500/30 transition-all duration-300 group h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                  IMPACT METRICS
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                Engineering Delivery Track Record
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-xl font-extrabold text-amber-400 font-mono block">4+ Yrs</span>
                  <span className="text-[10px] font-mono text-zinc-400">Tech Experience</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-xl font-extrabold text-cyan-400 font-mono block">99.9%</span>
                  <span className="text-[10px] font-mono text-zinc-400">System Uptime</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-xl font-extrabold text-emerald-400 font-mono block">100%</span>
                  <span className="text-[10px] font-mono text-zinc-400">Delivery Rate</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-xl font-extrabold text-purple-400 font-mono block">&lt; 2h</span>
                  <span className="text-[10px] font-mono text-zinc-400">Avg Response</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 font-medium mt-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified React Next.js, WordPress &amp; Fortinet Deployments</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
