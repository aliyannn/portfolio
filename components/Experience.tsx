'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../src/data/portfolioData';

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  return (
    <section id="experience" className="relative py-24 bg-[#030712] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header & Glowing Glassmorphic Pill Tab Switcher */}
        <div className="flex flex-col items-start md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-neutral-400 text-xs font-mono mb-3">
              <span>03 / EXPERIENCE &amp; CREDENTIALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Work History &amp; Education
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl font-sans">
              Track record across full-stack Next.js/React engineering, enterprise IT systems, custom WordPress architectures, and technical mentorship.
            </p>
          </div>

          {/* Redesigned Glowing Glassmorphic Pill Tab Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-lg backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('work')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'work'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-[0_0_20px_-3px_rgba(6,182,212,0.5)] border border-cyan-400/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              <Briefcase className={`w-3.5 h-3.5 ${activeTab === 'work' ? 'text-cyan-200' : 'text-neutral-400'}`} />
              <span>Work ({PORTFOLIO_DATA.experiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-[0_0_20px_-3px_rgba(6,182,212,0.5)] border border-cyan-400/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              <GraduationCap className={`w-3.5 h-3.5 ${activeTab === 'education' ? 'text-cyan-200' : 'text-neutral-400'}`} />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Work History: 2-Column Responsive Grid with Left Accent Glow */}
        {activeTab === 'work' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-7xl mx-auto w-full">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="relative overflow-hidden rounded-2xl bg-zinc-950/70 border border-white/[0.08] border-l-4 border-l-cyan-500/80 p-6 transition-all duration-300 hover:border-l-cyan-400 hover:border-white/20 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.15)] flex flex-col justify-between h-full group"
              >
                {/* Subtle top accent highlight on hover */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-xs text-neutral-400 font-mono flex items-center gap-2 mt-0.5">
                        <span className="text-neutral-300 font-medium">{exp.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-neutral-500">
                          <MapPin className="w-3 h-3 text-cyan-400/60" /> {exp.location}
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/[0.05] border border-white/[0.08] text-neutral-300 shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  {/* Clean Description Statements without dashes or bullet icons */}
                  <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-2.5 mt-4 mb-5 font-sans">
                    {exp.achievements.slice(0, 3).map((ach, i) => (
                      <p key={i} className="text-neutral-300">
                        {ach}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Subtle Minimal Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-neutral-400 border border-white/[0.06] group-hover:border-cyan-500/30 group-hover:text-neutral-300 transition-colors"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="relative overflow-hidden rounded-2xl bg-zinc-950/70 border border-white/[0.08] border-l-4 border-l-indigo-500/80 p-6 transition-all duration-300 hover:border-l-indigo-400 hover:border-white/20 hover:shadow-[0_10px_30px_-10px_rgba(99,102,241,0.15)] group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{edu.degree}</h3>
                      <span className="text-xs font-mono text-cyan-300">{edu.institution}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 mb-4 font-sans leading-relaxed">{edu.details}</p>

                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-3 border-t border-white/[0.06]">
                    <span className="text-neutral-300">{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications Grid */}
            <div className="pt-6 border-t border-white/[0.08]">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                Industry Certifications &amp; Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.08] flex items-center justify-between hover:border-white/20 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">{cert.title}</h4>
                      <span className="text-xs font-mono text-neutral-400">{cert.issuer}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-cyan-300 font-semibold">
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
