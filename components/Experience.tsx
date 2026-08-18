'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Cpu,
  FileDown,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../src/data/portfolioData';

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>CAREER TIMELINE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
        >
          Work Experience &amp;{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Education
          </span>
        </motion.h2>

        {/* Tab Toggle Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('work')}
            className={`px-5 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'work'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/40'
                : 'bg-zinc-900/80 text-zinc-400 border border-white/10 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work History ({PORTFOLIO_DATA.experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`px-5 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'education'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/40'
                : 'bg-zinc-900/80 text-zinc-400 border border-white/10 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education &amp; Certifications</span>
          </button>
        </div>
      </div>

      {/* Main Connected Timeline Container */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'work' && (
          <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-6">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative group"
              >
                {/* Connected Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-zinc-950 border-2 border-indigo-400 group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                {/* Compact Experience Glass Card */}
                <div className="p-5 sm:p-6 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/30 backdrop-blur-xl transition-all duration-300 shadow-xl group-hover:bg-zinc-900/60">
                  {/* Header Row: Role & Company Left, Date & Location Right */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-indigo-400 flex items-center gap-1.5 mt-0.5">
                        <span>{exp.company}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-xs font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-800/60 border border-white/5">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-indigo-300">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {exp.period}
                      </span>
                      <span className="hidden sm:flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-1.5 text-sm text-neutral-300 leading-relaxed mb-4">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Inline Technology Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5 text-[11px] font-mono">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/10 text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/30 backdrop-blur-xl transition-all shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                      <span className="text-xs font-mono text-indigo-400">{edu.institution}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-3 border-t border-white/5">
                    <span>{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Industry Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                      <span className="text-xs font-mono text-zinc-400">{cert.issuer}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-white/10 text-xs font-mono text-cyan-300">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
