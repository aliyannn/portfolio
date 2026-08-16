import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Cpu,
  MapPin,
  Clock,
  Sparkles,
  Zap,
  ShieldCheck,
  Trophy,
  Layers,
  Terminal,
  Server,
  Activity,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const BentoAbout: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const cardStyle =
    'rounded-2xl border border-white/10 bg-neutral-900/30 backdrop-blur-xl p-6 hover:border-indigo-500/40 transition-all duration-300 shadow-2xl relative overflow-hidden group';

  return (
    <section id="about" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Title */}
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/60 border border-indigo-500/30 text-xs font-mono text-indigo-300 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>About & Core Competencies</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-extrabold text-white"
        >
          Architecting High-Scale Systems & <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Interactive Digital Experiences
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400 max-w-2xl text-sm sm:text-base"
        >
          {PORTFOLIO_DATA.personalInfo.bio}
        </motion.p>
      </div>

      {/* Modern 4-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 (2 cols): Dynamic Bio card with code snippet backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`lg:col-span-2 ${cardStyle} flex flex-col justify-between`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-500" />

          {/* Interactive Code Snippet Backdrop */}
          <div className="absolute right-3 bottom-3 top-16 w-1/2 hidden sm:block opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none font-mono text-[10px] text-indigo-300 bg-neutral-950/80 p-4 rounded-xl border border-white/5 overflow-hidden">
            <div className="text-neutral-500 pb-2">// engineer.config.ts</div>
            <div className="text-purple-400">const<span className="text-white"> engineer</span> = &#123;</div>
            <div className="pl-4 text-cyan-300">name:<span className="text-emerald-300"> "{PORTFOLIO_DATA.personalInfo.name}"</span>,</div>
            <div className="pl-4 text-cyan-300">focus:<span className="text-emerald-300"> "Full Stack & 3D Web Graphics"</span>,</div>
            <div className="pl-4 text-cyan-300">stack: [<span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Three.js"</span>, <span className="text-amber-300">"Fortinet"</span>],</div>
            <div className="pl-4 text-cyan-300">security:<span className="text-indigo-300"> true</span>,</div>
            <div className="text-purple-400">&#125;;</div>
          </div>

          <div className="space-y-4 relative z-10 max-w-lg">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Full-Spectrum Engineering</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Synthesizing high-velocity React frontend architectures and Three.js 3D web rendering with enterprise network security, pfSense firewalls, and AI automation tools.
            </p>
          </div>

          <div className="pt-6 flex flex-wrap gap-2 relative z-10">
            {['React.js', 'TypeScript', 'Three.js / WebGL', 'Tailwind CSS', 'Fortinet Security', 'pfSense'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-300">
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Card 2 (1 col): Interactive Tech Stack radar/chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`lg:col-span-1 ${cardStyle} flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-400" /> Core Stack
            </span>
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          </div>

          <div className="space-y-2.5 my-2">
            {[
              { name: 'React & Next.js', icon: Code2, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
              { name: 'TypeScript', icon: Terminal, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
              { name: 'Three.js / R3F', icon: Sparkles, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
              { name: 'Tailwind CSS', icon: Layers, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
              { name: 'Fortinet / pfSense', icon: Server, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
            ].map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-medium ${tech.color} hover:scale-102 transition-transform cursor-default`}
                >
                  <span className="flex items-center gap-2 text-neutral-200">
                    <Icon className="w-3.5 h-3.5" />
                    {tech.name}
                  </span>
                  <Zap className="w-3 h-3 opacity-60" />
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-[11px] font-mono text-neutral-500 text-center">
            Verified Stack & Production Tools
          </div>
        </motion.div>

        {/* Card 3 (1 col): Live Status / Location card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`lg:col-span-1 ${cardStyle} flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-mono uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-purple-400 animate-bounce" /> Location
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="my-6 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-mono font-bold text-white tracking-tight">{time || '12:00:00 PM'}</span>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">PKT (UTC+5)</span>
            </div>
            <p className="text-neutral-300 text-xs leading-relaxed">
              Based in {PORTFOLIO_DATA.personalInfo.location} — Open for global remote & local roles.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-neutral-300">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" /> Response Time
            </span>
            <span className="font-mono text-emerald-400 font-semibold">{PORTFOLIO_DATA.personalInfo.responseTime}</span>
          </div>
        </motion.div>

        {/* Card 4 (2 cols): Key strengths & engineering metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`lg:col-span-2 ${cardStyle} flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-indigo-400" /> Engineering Impact & Strengths
            </span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="font-display text-3xl font-extrabold text-white">4+</span>
              <p className="text-xs text-neutral-400 font-mono">Years Experience</p>
              <p className="text-[11px] text-neutral-500">Software & Networks</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="font-display text-3xl font-extrabold text-emerald-400">100%</span>
              <p className="text-xs text-neutral-400 font-mono">System Delivery</p>
              <p className="text-[11px] text-neutral-500">On-time SLA record</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 col-span-2 sm:col-span-1">
              <span className="font-display text-3xl font-extrabold text-indigo-400">99.9%</span>
              <p className="text-xs text-neutral-400 font-mono">Uptime Security</p>
              <p className="text-[11px] text-neutral-500">Fortinet / pfSense</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-neutral-400">High-Performance Clean Code & Security Standards</span>
            <a
              href="#contact"
              className="text-xs font-mono font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              Get In Touch &rarr;
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoAbout;
