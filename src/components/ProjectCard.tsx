'use client';

import React, { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Globe, Layout, CheckCircle2 } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project }) => {
  const [activeImage, setActiveImage] = useState<string>(
    project.images && project.images.length > 0 ? project.images[0] : project.image
  );
  const [imageError, setImageError] = useState(false);

  // Dynamic Random Picker on Mount for varied screenshot angles
  useEffect(() => {
    if (project.images && project.images.length > 1) {
      const randomIndex = Math.floor(Math.random() * project.images.length);
      setActiveImage(project.images[randomIndex]);
    }
  }, [project.images]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 260, damping: 28 });

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

  const displayDomain = project.domainName || project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

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
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-cyan-950/40 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Layout className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Live System</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm tracking-tight">{project.title}</h4>
                <p className="text-[10px] text-cyan-400/80 font-mono mt-0.5">{displayDomain}</p>
              </div>
            </div>
          ) : (
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
            <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Prominent Tech Stack Badges */}
          <div className="space-y-3 pt-1 border-t border-white/5">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-zinc-900/90 border border-white/10 text-[10px] font-mono text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Direct Actions: Visit Live Website & Source Code */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <span>Visit Live Website ↗</span>
              </a>

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
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
