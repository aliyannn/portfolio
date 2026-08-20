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
        
        {/* Minimalist Section Header */}
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

          {/* Minimal Tab Switcher */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-zinc-950 border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('work')}
              className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'work'
                  ? 'bg-white/10 text-white font-medium border border-white/15'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Work ({PORTFOLIO_DATA.experiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'education'
                  ? 'bg-white/10 text-white font-medium border border-white/15'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Work History: 2-Column Minimalist Grid */}
        {activeTab === 'work' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-7xl mx-auto w-full">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="rounded-xl bg-zinc-950/60 border border-white/[0.08] p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/40 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Minimal Header & Meta Row */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-xs text-neutral-400 font-mono flex items-center gap-2 mt-0.5">
                        <span className="text-neutral-300 font-medium">{exp.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-neutral-500">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/[0.05] border border-white/[0.08] text-neutral-300 shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  {/* Compact Content & Bullet Points with Minimal Dash */}
                  <ul className="text-xs sm:text-sm text-neutral-400 leading-relaxed space-y-2 mt-4 mb-5">
                    {exp.achievements.slice(0, 3).map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-neutral-500 shrink-0 mt-0.5">—</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subtle Minimal Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-neutral-400 border border-white/[0.06]"
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
                  className="rounded-xl bg-zinc-950/60 border border-white/[0.08] p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/40"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{edu.degree}</h3>
                      <span className="text-xs font-mono text-neutral-400">{edu.institution}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 mb-4 font-sans">{edu.details}</p>

                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-3 border-t border-white/[0.06]">
                    <span className="text-neutral-300">{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Minimal Certifications Grid */}
            <div className="pt-6 border-t border-white/[0.08]">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-neutral-400" />
                Industry Certifications &amp; Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.08] flex items-center justify-between hover:border-white/20 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">{cert.title}</h4>
                      <span className="text-xs font-mono text-neutral-400">{cert.issuer}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300">
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
