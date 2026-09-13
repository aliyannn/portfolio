'use client';

import React, { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Globe,
  Layout,
  CheckCircle2,
  ChevronDown,
  Zap,
  Maximize2,
  X,
  Layers,
  Cpu,
  ShieldCheck,
  Sparkles,
  Sliders,
  Box,
} from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

// Prominent high-contrast styling for core requested technologies
const getHighContrastTagStyle = (tag: string) => {
  switch (tag) {
    case 'Next.js':
      return 'bg-zinc-100 text-zinc-950 font-bold border-white/90 shadow-[0_0_12px_rgba(255,255,255,0.2)]';
    case 'Three.js':
      return 'bg-cyan-400 text-zinc-950 font-bold border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.35)]';
    case 'React Three Fiber':
      return 'bg-teal-400 text-zinc-950 font-bold border-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.35)]';
    case 'WebGL':
      return 'bg-emerald-400 text-zinc-950 font-bold border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.35)]';
    case 'Tailwind CSS':
      return 'bg-sky-400 text-zinc-950 font-bold border-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]';
    case 'WebAssembly (Draco Compression)':
      return 'bg-purple-950/90 text-purple-200 font-semibold border-purple-400/50 shadow-[0_0_10px_rgba(168,85,247,0.25)]';
    case '@react-three/drei':
      return 'bg-indigo-950/90 text-indigo-200 font-semibold border-indigo-400/40';
    default:
      return 'bg-zinc-900/90 text-cyan-300/90 border-white/10';
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project }) => {
  const [activeImage, setActiveImage] = useState<string>(
    project.images && project.images.length > 0 ? project.images[0] : project.image
  );
  const [imageError, setImageError] = useState(false);
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic Random Picker on Mount for varied screenshot angles
  useEffect(() => {
    if (project.images && project.images.length > 1) {
      const randomIndex = Math.floor(Math.random() * project.images.length);
      setActiveImage(project.images[randomIndex]);
    }
  }, [project.images]);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [4, -4]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-4, 4]), { stiffness: 260, damping: 28 });

  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isModalOpen) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        x.set(mouseX);
        y.set(mouseY);
      });
    },
    [x, y, isModalOpen]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const displayDomain = project.domainName || project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <>
      <div className="perspective-1000 transform-gpu [contain:paint] h-full">
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35 }}
          className="group relative rounded-2xl bg-zinc-950/85 border border-white/10 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl will-change-transform h-full hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]"
        >
          {/* Card Header / Browser Mockup Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/90 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                {project.category}
              </span>
              <span className="text-[11px] font-mono text-neutral-400 truncate max-w-[130px] sm:max-w-[160px]">
                • {displayDomain}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/70" />
              <span className="w-2 h-2 rounded-full bg-amber-500/70" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
            </div>
          </div>

          {/* Visual Preview (Screenshot Frame) */}
          <div className="relative aspect-video max-h-48 w-full overflow-hidden bg-zinc-900 flex items-center justify-center">
            {imageError ? (
              /* Rendered when picture fails to load: Custom Personal Logo Fallback */
              <div className="relative w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-cyan-950/40 p-6 flex flex-col items-center justify-center text-center select-none overflow-hidden group/fallback">
                {/* Soft Ambient Neon Glow Behind Emblem */}
                <div className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-emerald-500/20 blur-xl pointer-events-none" />

                {/* Custom Personal Logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.png"
                  alt="Aliyan Gohar Logo"
                  className="relative w-16 h-16 object-contain mb-2.5 opacity-85 group-hover/fallback:opacity-100 group-hover/fallback:scale-105 transition-all duration-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.indexOf('/images/logo.png') !== -1) {
                      target.src = '/logo.png';
                    }
                  }}
                />

                <div className="relative z-10">
                  <h4 className="font-bold text-white text-xs sm:text-sm tracking-tight font-mono">
                    {project.title}
                  </h4>
                  <p className="text-[10px] text-cyan-400/80 font-mono mt-0.5">
                    {displayDomain}
                  </p>
                </div>
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={activeImage}
                alt={`${project.title} live screenshot`}
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100 transform-gpu"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />

            {/* Status Metric Badge */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-medium bg-zinc-900/90 backdrop-blur-md border border-emerald-500/30 text-emerald-300 flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  {project.metrics[0].value}
                </span>
              </div>
            )}
          </div>

          {/* Core Information Section */}
          <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
              </div>
              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Prominent High-Contrast Tech Stack Badges */}
            <div className="space-y-3 pt-1 border-t border-white/5">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className={`px-2 py-0.5 rounded-md border text-[10px] font-mono transition-all duration-200 ${getHighContrastTagStyle(
                      t
                    )}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Key Engineering Highlights Accordion */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsHighlightsOpen((prev) => !prev);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800/90 border border-cyan-500/25 hover:border-cyan-400/50 transition-all text-xs font-mono group/btn"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-zinc-200 font-semibold group-hover/btn:text-cyan-300 transition-colors">
                        Key Engineering Highlights
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        {project.highlights.length}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-cyan-400 transition-transform duration-300 ${
                        isHighlightsOpen ? 'rotate-180 text-cyan-300' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isHighlightsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 p-3 rounded-xl bg-zinc-900/95 border border-cyan-500/25 space-y-2.5 shadow-inner">
                          <div className="flex items-center justify-between pb-1 border-b border-white/5">
                            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Zap className="w-3 h-3 text-cyan-400" /> WebGL &amp; Optimization
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                              }}
                              className="text-[10px] font-mono text-zinc-400 hover:text-cyan-300 flex items-center gap-1 transition-colors underline underline-offset-2"
                            >
                              <Maximize2 className="w-3 h-3" /> Deep Dive Modal
                            </button>
                          </div>

                          <div className="space-y-2">
                            {project.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-left">
                                <span className="shrink-0 w-4 h-4 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[9px] flex items-center justify-center font-bold mt-0.5">
                                  0{idx + 1}
                                </span>
                                <div className="space-y-0.5">
                                  <p className="text-[11px] font-semibold text-zinc-100 font-mono">
                                    {highlight.title}
                                  </p>
                                  <p className="text-[10.5px] text-zinc-400 leading-relaxed">
                                    {highlight.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Direct Actions: Visit Live Website & Source Code */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-zinc-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_22px_rgba(6,182,212,0.45)] hover:scale-[1.01]"
                >
                  <span>{project.liveDemoLabel || 'Visit Live Website ↗'}</span>
                </a>

                {project.highlights && project.highlights.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-300 hover:text-cyan-200 transition-colors flex items-center justify-center shrink-0"
                    title="Key Engineering Highlights & Architecture Modal"
                    aria-label="Engineering Highlights"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors flex items-center justify-center shrink-0"
                    aria-label="GitHub Repository"
                    title="View Source Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Engineering Architecture & Optimization Modal */}
      <AnimatePresence>
        {isModalOpen && project.highlights && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] z-10 overflow-hidden"
            >
              {/* Background Cyber Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 relative">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
                    <Box className="w-3.5 h-3.5" />
                    <span>3D WebGL Production Architecture</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">{project.subtitle}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tech Stack Pills */}
              <div className="py-4 border-b border-white/5 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className={`px-2.5 py-1 rounded-md border text-[11px] font-mono ${getHighContrastTagStyle(
                      t
                    )}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Highlights & WebGL Optimization Details */}
              <div className="py-5 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  <span>Key Engineering Highlights &amp; Optimization Pipeline</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {project.highlights.map((item, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-2xl bg-zinc-900/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center">
                          0{index + 1}
                        </span>
                        <h4 className="font-mono font-bold text-white text-xs sm:text-sm">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-300 pl-7 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Live Production Verified • Sub-2s Asset Streaming</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-zinc-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105"
                  >
                    <span>Launch 3D Studio (New Tab) ↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;

