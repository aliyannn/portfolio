'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../src/data/projects';
import { ProjectCard } from '../src/components/ProjectCard';
import { ProjectModal } from '../src/components/ui/ProjectModal';

const CATEGORIES = ['All', 'Full Stack', '3D & Interactive', 'UI/UX Design'];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Standardized Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>FEATURED WORK</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
        >
          High-Impact Applications &amp;{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
            Interactive Systems
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-base mt-3"
        >
          Explore production web applications, 3D web graphics, and full-stack software built for speed, resilience, and user experience.
        </motion.p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
