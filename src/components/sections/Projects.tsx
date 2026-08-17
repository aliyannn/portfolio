'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../../data/projects';
import { ProjectCard } from '../ProjectCard';
import { ProjectModal } from '../ui/ProjectModal';

const CATEGORIES = ['All', 'Full Stack', '3D & Interactive', 'UI/UX Design'];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10 transform-gpu">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-indigo-500/30 text-xs font-mono text-indigo-300 shadow-lg"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Crafted Works</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-extrabold text-white"
        >
          Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Projects Showcase</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400 max-w-2xl text-sm sm:text-base"
        >
          Interactive WebGL environments, production SaaS platforms, and cutting-edge design systems.
        </motion.p>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 pt-4"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 font-semibold'
                  : 'bg-neutral-900/40 border border-white/10 text-neutral-400 hover:text-white hover:border-indigo-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={(p) => setSelectedProject(p)} />
        ))}
      </div>

      {/* Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Projects;
