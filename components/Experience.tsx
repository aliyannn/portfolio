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
  Building2,
  Award,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../src/data/portfolioData';

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  return (
    <section id="experience" className="relative py-20 bg-[#030712] overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>WORK HISTORY &amp; CREDENTIALS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Professional Experience &amp;{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              Education
            </span>
          </motion.h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Track record across enterprise IT systems, full-stack Next.js/React engineering, custom WordPress architectures, and developer mentorship.
          </p>

          {/* Tab Toggle Controls */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTab('work')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'work'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-zinc-950 shadow-lg shadow-cyan-500/20 font-bold'
                  : 'bg-zinc-900/80 text-zinc-400 border border-white/10 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Work History ({PORTFOLIO_DATA.experiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-zinc-950 shadow-lg shadow-cyan-500/20 font-bold'
                  : 'bg-zinc-900/80 text-zinc-400 border border-white/10 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education &amp; Certifications</span>
            </button>
          </div>
        </div>

        {/* Work History: 2-Column Balanced Responsive Grid */}
        {activeTab === 'work' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="h-full p-6 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-md hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl group hover:shadow-cyan-500/10"
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-xs font-mono font-semibold text-cyan-300">
                          {exp.company}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-indigo-300 text-xs font-mono shrink-0 shadow">
                      {exp.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-4 pb-3 border-b border-white/5">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      {exp.location}
                    </span>
                    <span>•</span>
                    <span className="text-purple-300 font-medium">{exp.type}</span>
                  </div>

                  {/* Concise Bullet Points (Top 3 max for balanced vertical height) */}
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                    {exp.achievements.slice(0, 3).map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inline Technology Chips */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 text-[11px] font-mono">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-zinc-950 border border-white/10 text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Education & Certifications View */}
        {activeTab === 'education' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-xl transition-all shadow-xl hover:border-cyan-500/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                      <span className="text-xs font-mono text-cyan-300">{edu.institution}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 mb-4">{edu.details}</p>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-3 border-t border-white/5">
                    <span className="text-indigo-300 font-semibold">{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications Grid */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                Industry Certifications &amp; Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between hover:border-cyan-500/30 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                      <span className="text-xs font-mono text-zinc-400">{cert.issuer}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-white/10 text-xs font-mono text-cyan-300 font-bold">
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
