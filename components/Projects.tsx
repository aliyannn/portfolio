'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers } from 'lucide-react';
import { PROJECTS, Project, ProjectCategory } from '../src/data/projects';
import { ProjectCard } from '../src/components/ProjectCard';
import { ProjectModal } from '../src/components/ui/ProjectModal';

const CATEGORIES = [
  'All',
  'Full Stack & Frontend',
  'WordPress & CMS',
  'Vibe Coding & 3D',
] as const;

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter(
          (p) =>
            p.category === activeCategory ||
            p.secondaryCategory === activeCategory
        );

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient Cyber Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[170px] pointer-events-none" />

      {/* Standardized Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PRODUCTION BUILDS &amp; ARCHITECTURES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
        >
          Verified Production Work &amp;{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            Client Deployments
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed"
        >
          Explore verified live applications, client portals, customized enterprise CMS platforms, and 3D WebGL architectures engineered for scalability.
        </motion.p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                {cat === 'All' && <Layers className="w-3.5 h-3.5" />}
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-zinc-950/20 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {cat === 'All'
                    ? PROJECTS.length
                    : PROJECTS.filter(
                        (p) =>
                          p.category === cat || p.secondaryCategory === cat
                      ).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Verified Projects */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={(p) => setSelectedProject(p)}
          />
        ))}
      </motion.div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
