'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layout } from 'lucide-react';
import { Project } from '../../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      setImageError(false);
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
  const modalScreenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(project.demoUrl)}?w=1200&h=750`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        {/* Clickable Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-transparent"
        />

        {/* Perfectly Centered Modal Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Compact Top Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400 truncate max-w-[200px]">
                • {displayDomain}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Interior Content */}
          <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
            
            {/* Live Preview / Screenshot Frame */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center">
              {imageError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-cyan-950/40 p-6 flex flex-col justify-end">
                  <Layout className="w-8 h-8 text-cyan-400 mb-2" />
                  <span className="text-xs font-mono text-cyan-400">{displayDomain}</span>
                </div>
              ) : (
                <img
                  src={modalScreenshotUrl}
                  alt={project.title}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-top"
                />
              )}
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((t: string) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-xs font-mono text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Live Action Link */}
            <div className="pt-3 flex justify-end gap-3 items-center">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-zinc-200 hover:text-white hover:border-cyan-500/40 font-semibold text-xs transition-all"
                >
                  View Source Code
                </a>
              )}
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                Open Live Site ↗
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
