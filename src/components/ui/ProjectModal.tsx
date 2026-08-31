'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Cpu, Globe, Layout } from 'lucide-react';
import { Project } from '../../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      setImageLoaded(false);
      setImageError(false);
      // Lock background body scroll
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
        {/* Clickable Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-transparent"
        />

        {/* Modal Dialog Card with Independent Vertical Scrolling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl focus:outline-none custom-scrollbar z-10 my-auto flex flex-col"
        >
          {/* Sticky Header with Close Button */}
          <div className="sticky top-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-zinc-950/90 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-400">•</span>
              <span className="text-xs font-mono text-zinc-400 truncate max-w-[200px]">{project.domainName}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-500/40 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          {/* Top Banner Image with Live Screenshot */}
          <div className="relative aspect-video max-h-72 w-full overflow-hidden bg-zinc-900 flex items-center justify-center shrink-0">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse flex items-center justify-center">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>Loading live screenshot...</span>
                </div>
              </div>
            )}

            {imageError ? (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-cyan-950/40 p-6 flex flex-col justify-end">
                <Layout className="w-8 h-8 text-cyan-400 mb-2" />
                <span className="text-xs font-mono text-cyan-400">{project.domainName}</span>
              </div>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-85' : 'opacity-0'
                }`}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 right-6">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-cyan-300 mt-0.5">{project.subtitle}</p>
            </div>
          </div>

          {/* Modal Body Content (Fully Scrollable) */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Overview & Architecture */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                System Overview &amp; Architecture
              </h4>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                {project.metrics.map((m) => (
                  <div key={m.label} className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10">
                    <span className="text-[11px] text-zinc-400 font-mono block">{m.label}</span>
                    <span className="text-base font-bold text-cyan-400 font-display mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Technology &amp; Tooling
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-white/10 text-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions & External Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center gap-2 transition-all duration-300"
                >
                  <span>Visit Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-zinc-200 hover:text-white hover:border-cyan-500/40 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300"
                >
                  <Github className="w-3.5 h-3.5" /> View Source Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
