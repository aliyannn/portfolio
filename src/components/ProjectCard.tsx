'use client';

import React, { useRef, useCallback, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Eye, ArrowUpRight, Globe, CheckCircle2, Layout, Sparkles } from 'lucide-react';
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

  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 220, damping: 24 });

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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="group relative rounded-2xl bg-zinc-950/75 border border-white/10 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl cursor-pointer will-change-transform h-full hover:shadow-cyan-500/15"
        onClick={() => onSelect(project)}
      >
        {/* Card Header & Mockup Frame */}
        <div className="relative w-full overflow-hidden bg-zinc-950/90 border-b border-white/10">
          
          {/* Browser Window Header Bar */}
          <div className="px-3.5 py-2.5 bg-zinc-900/90 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            
            {/* Domain Address Bar */}
            <div className="px-2.5 py-0.5 rounded-md bg-zinc-950/80 border border-white/10 text-[10px] font-mono text-zinc-400 flex items-center gap-1 max-w-[170px] truncate">
              <Globe className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
              <span className="truncate">{project.domainName}</span>
            </div>

            {/* Category Tag */}
            <span className="text-[10px] font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
              {project.category}
            </span>
          </div>

          {/* Screenshot Banner with Shimmer Loading & Fallback */}
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 flex items-center justify-center">
            
            {/* Skeleton Shimmer while loading */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse flex items-center justify-center">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>Fetching live preview...</span>
                </div>
              </div>
            )}

            {/* Clean Gradient Fallback if screenshot fails */}
            {imageError ? (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-cyan-950/40 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <Layout className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Live System</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base tracking-tight">{project.title}</h4>
                  <p className="text-xs text-cyan-400/80 font-mono mt-0.5">{project.domainName}</p>
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
              <div className="absolute bottom-3 left-3 z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-zinc-900/90 backdrop-blur-md border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {project.metrics[0].value}
                </span>
              </div>
            )}

            {/* Quick Action Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-xl shadow-cyan-500/30 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <Eye className="w-4 h-4 text-zinc-950" /> View Case Study
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            <p className="text-[11px] font-mono text-cyan-400/80">{project.subtitle}</p>
            <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed pt-1">{project.description}</p>
          </div>

          {/* Tech Badges & Actions */}
          <div className="pt-3 border-t border-white/5 flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-white/10 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Live External Link CTA */}
            <div className="flex items-center justify-between pt-1" onClick={(e) => e.stopPropagation()}>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline font-semibold"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                  aria-label="GitHub Repository"
                  title="Source Code"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
