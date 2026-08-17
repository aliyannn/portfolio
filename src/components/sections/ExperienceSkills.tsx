'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Cpu,
  ShieldCheck,
  LayoutGrid,
  Layers,
  ChevronRight,
  Award,
  Sparkles,
  MapPin,
  Calendar,
  FileDown,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const ExperienceSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'education'>('experience');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutGrid':
        return <LayoutGrid className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10 transform-gpu">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/60 border border-purple-500/30 text-xs font-mono text-purple-300 shadow-lg"
        >
          <Briefcase className="w-3.5 h-3.5 text-purple-400" />
          <span>Professional Journey & Technical Stack</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-extrabold text-white"
        >
          Work Experience & <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Engineering Matrix</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400 max-w-2xl text-sm sm:text-base"
        >
          Demonstrated engineering history across modern web development, network security infrastructure, and AI workflow integration.
        </motion.p>

        {/* View Switcher Toggle */}
        <div className="p-1.5 rounded-full bg-neutral-900/40 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-center gap-1 mt-4">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Work History ({PORTFOLIO_DATA.experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'skills'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" /> Skills & Expertise
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'education'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Education & Certs
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {/* TAB 1: WORK EXPERIENCE TIMELINE */}
        {activeTab === 'experience' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/30 hover:border-indigo-400 transition-colors group"
              >
                {/* Glowing Timeline Bullet Node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-indigo-400 group-hover:scale-125 transition-transform flex items-center justify-center shadow-lg shadow-indigo-500/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>

                <div className="rounded-2xl border border-white/10 bg-neutral-900/30 backdrop-blur-xl p-6 sm:p-8 space-y-4 hover:border-indigo-500/40 transition-all duration-300 shadow-2xl">
                  {/* Header Row */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          <Calendar className="w-3 h-3 text-indigo-400" />
                          {exp.period}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-neutral-400">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-neutral-300 font-mono flex items-center gap-1.5 mt-1">
                        <span className="text-indigo-400 font-semibold">{exp.company}</span>
                        <span className="text-neutral-600">•</span>
                        <span className="text-neutral-400 font-normal flex items-center gap-1 text-xs">
                          <MapPin className="w-3 h-3 text-neutral-500" />
                          {exp.location}
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-sm leading-relaxed">{exp.description}</p>

                  {/* Achievements */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Key Responsibilities & Impact:
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                          <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack Badges */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Resume Download Callout */}
            <div className="pt-6 text-center">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Aliyan_Gohar_Resume.pdf"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-neutral-900/60 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-mono font-semibold hover:border-indigo-400 hover:bg-neutral-800/80 transition-all shadow-2xl"
              >
                <FileDown className="w-4 h-4 text-indigo-400" />
                View Full Detailed Resume PDF
              </a>
            </div>
          </motion.div>
        )}

        {/* TAB 2: SKILLS MATRIX */}
        {activeTab === 'skills' && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {PORTFOLIO_DATA.skills.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
                className="rounded-2xl border border-white/10 bg-neutral-900/30 backdrop-blur-xl p-6 sm:p-8 space-y-6 hover:border-indigo-500/40 transition-all duration-300 shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{cat.title}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-400/80 bg-indigo-500/5 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    {cat.skills.length} competencies
                  </span>
                </div>

                <div className="space-y-5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-200 font-sans">{skill.name}</span>
                        <span className="font-mono text-[11px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {skill.badge}
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="h-2 w-full rounded-full bg-neutral-950 overflow-hidden p-0.5 border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
                        />
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans leading-tight">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: EDUCATION & CERTIFICATIONS */}
        {activeTab === 'education' && (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" /> Academic Background
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PORTFOLIO_DATA.education.map((edu, idx) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-neutral-900/30 backdrop-blur-xl p-6 space-y-3 shadow-2xl"
                  >
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {edu.period}
                    </span>
                    <h4 className="font-display text-lg font-bold text-white leading-snug">{edu.degree}</h4>
                    <p className="text-xs font-mono text-neutral-300">{edu.institution} • {edu.location}</p>
                    {edu.details && <p className="text-xs text-neutral-400">{edu.details}</p>}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" /> Professional Certifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-neutral-900/30 backdrop-blur-xl p-6 flex items-start gap-4 shadow-2xl"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-white">{cert.title}</h4>
                      <p className="text-xs font-mono text-neutral-400 mt-1">
                        Issued by <span className="text-purple-300">{cert.issuer}</span> ({cert.year})
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSkills;
