'use client';

import React, { useRef, useCallback, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Eye, ArrowUpRight, Globe, CheckCircle2, Layout, Sparkles, ArrowRight } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [6, -6]), { stiffness: 240, damping: 26 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-6, 6]), { stiffness: 240, damping: 26 });

  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
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
        className="group relative rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl cursor-pointer will-change-transform h-full hover:shadow-cyan-500/15"
        onClick={() => onSelect(project)}
      >
        {/* Card Header & Mockup Frame */}
        <div className="relative w-full overflow-hidden bg-zinc-950/90 border-b border-white/10">
          
          {/* Browser Window Header Bar */}
          <div className="px-3 py-2 bg-zinc-900/90 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/70" />
              <span className="w-2 h-2 rounded-full bg-amber-500/70" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
            </div>
            
            {/* Domain Address Bar */}
            <div className="px-2 py-0.5 rounded-md bg-zinc-950/80 border border-white/10 text-[9.5px] font-mono text-zinc-400 flex items-center gap-1 max-w-[140px] truncate">
              <Globe className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
              <span className="truncate">{project.domainName}</span>
            </div>

            {/* Category Tag */}
            <span className="text-[9px] font-mono text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
              {project.category.replace(' & ', '/')}
            </span>
          </div>

          {/* Screenshot Banner with Shimmer Loading & Fallback */}
          <div className="relative aspect-video max-h-44 w-full overflow-hidden bg-zinc-900 flex items-center justify-center">
            
            {/* Skeleton Shimmer while loading */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse flex items-center justify-center">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                  <span>Loading preview...</span>
                </div>
              </div>
            )}

            {/* Clean Gradient Fallback if screenshot fails */}
            {imageError ? (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-cyan-950/40 p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <Layout className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Live System</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm tracking-tight">{project.title}</h4>
                  <p className="text-[10px] text-cyan-400/80 font-mono mt-0.5">{project.domainName}</p>
                </div>
              </div>
            ) : (
              <img
                src={project.image}
                alt={`${project.title} live screenshot`}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 transform-gpu ${
                  imageLoaded ? 'opacity-85 group-hover:opacity-100' : 'opacity-0'
                }`}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />

            {/* Status / Metric Indicator */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="absolute bottom-2.5 left-2.5 z-10">
                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-medium bg-zinc-900/90 backdrop-blur-md border border-emerald-500/30 text-emerald-300 flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  {project.metrics[0].value}
                </span>
              </div>
            )}

            {/* Quick Action Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-xs">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-xl shadow-cyan-500/30 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span>View Case Study →</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate pr-2">
                {project.title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </div>
            <p className="text-[10.5px] font-mono text-cyan-400/80 truncate">{project.subtitle}</p>
            <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed pt-0.5">{project.description}</p>
          </div>

          {/* Tech Badges & Actions */}
          <div className="pt-2.5 border-t border-white/5 flex flex-col gap-2.5">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[9.5px] font-mono bg-zinc-900 border border-white/10 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono bg-zinc-900/60 text-zinc-500">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>

            {/* Live External Link & Case Study Trigger CTA */}
            <div className="flex items-center justify-between pt-0.5">
              <button
                type="button"
                onClick={() => onSelect(project)}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group-hover:underline"
              >
                <span>View Case Study →</span>
              </button>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-cyan-300 transition-colors"
                    aria-label="Visit Live Site"
                    title="Visit Live Site"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                    aria-label="GitHub Repository"
                    title="Source Code"
                  >
                    <Github className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
