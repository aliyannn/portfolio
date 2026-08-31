'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, Cpu, Layout, CheckCircle2 } from 'lucide-react';
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

  const displayDomain = project.domainName || project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        {/* Clickable Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-transparent"
        />

        {/* Perfectly Centered Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Sleek Browser-Style Top Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900/90 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400 truncate max-w-[220px]">
                • {displayDomain}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Interior Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar">
            
            {/* Live Preview Image / Screenshot Frame */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center">
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
                  <span className="text-xs font-mono text-cyan-400">{displayDomain}</span>
                </div>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-90' : 'opacity-0'
                  }`}
                />
              )}
            </div>

            {/* Project Title & Overview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-mono text-cyan-400">{project.subtitle}</p>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed pt-1">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Metrics if available */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                {project.metrics.map((m) => (
                  <div key={m.label} className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10">
                    <span className="text-[11px] text-zinc-400 font-mono block">{m.label}</span>
                    <span className="text-base font-bold text-cyan-400 font-display mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Technologies &amp; Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t: string) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Site & Source External Links */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-zinc-200 hover:text-white hover:border-cyan-500/40 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  <span>View Source Code</span>
                </a>
              ) : <div />}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <span>Visit Live Website ↗</span>
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
