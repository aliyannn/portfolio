'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, ChevronDown, ChevronUp, Cpu, Globe, Rocket } from 'lucide-react';
import { PROJECTS } from '../src/data/projects';
import { ProjectCard } from '../src/components/ProjectCard';

const INITIAL_VISIBLE_COUNT = 6;

const CATEGORIES = [
  { id: 'All', label: 'All Projects', icon: Layers },
  { id: 'Full Stack & Frontend', label: 'Full Stack & Frontend', icon: Cpu },
  { id: 'WordPress & CMS', label: 'WordPress & CMS', icon: Globe },
  { id: 'Vibe Coding & 3D', label: 'Vibe Coding & 3D', icon: Rocket },
] as const;

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);

  // Optimized in-memory filtering with useMemo
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.category === activeCategory ||
        p.secondaryCategory === activeCategory
    );
  }, [activeCategory]);

  // Clamped visible items to avoid mounting excessive DOM nodes
  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  // Category switch resets the visible counter
  const handleCategoryChange = useCallback((catId: string) => {
    setActiveCategory(catId);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, []);

  const handleToggleVisible = useCallback(() => {
    if (visibleCount >= filteredProjects.length) {
      setVisibleCount(INITIAL_VISIBLE_COUNT);
      const section = document.getElementById('projects');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setVisibleCount((prev) => Math.min(prev + 6, filteredProjects.length));
    }
  }, [visibleCount, filteredProjects.length]);

  const hasMore = visibleCount < filteredProjects.length;

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible transform-gpu">
      {/* Ambient Cyber Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[170px] pointer-events-none" />

      {/* Standardized Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PRODUCTION ARCHITECTURES</span>
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
          className="text-zinc-400 text-sm sm:text-base mt-2.5 leading-relaxed"
        >
          Explore live web applications, client portals, enterprise CMS architectures, and 3D WebGL interfaces built for scale and high conversion.
        </motion.p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            const count =
              cat.id === 'All'
                ? PROJECTS.length
                : PROJECTS.filter(
                    (p) =>
                      p.category === cat.id || p.secondaryCategory === cat.id
                  ).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive
                      ? 'bg-zinc-950/20 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Streamlined 3-Column Responsive Grid on Desktop */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 [contain:layout]"
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Smart Load More / Show Less Action Button */}
      {filteredProjects.length > INITIAL_VISIBLE_COUNT && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex justify-center items-center"
        >
          <button
            onClick={handleToggleVisible}
            className="group relative px-6 py-2.5 rounded-2xl bg-zinc-900/90 border border-cyan-500/30 hover:border-cyan-400 backdrop-blur-xl text-xs sm:text-sm font-mono text-zinc-200 hover:text-white flex items-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-950/30 hover:shadow-cyan-500/20 hover:scale-105"
          >
            <span className="font-semibold">
              {hasMore
                ? `Load More Projects (${filteredProjects.length - visibleCount} remaining)`
                : 'Show Less Projects'}
            </span>
            {hasMore ? (
              <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
            ) : (
              <ChevronUp className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
            )}
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
