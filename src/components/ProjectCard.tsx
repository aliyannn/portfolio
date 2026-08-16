import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Eye, ArrowUpRight } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  // 3D Tilt calculation based on mouse position relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [12, -12]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-12, 12]), { stiffness: 300, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="perspective-1000 transform-gpu">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative rounded-2xl bg-neutral-900/30 border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl cursor-pointer"
        onClick={() => onSelect(project)}
      >
        {/* Project Preview Banner with Hover Zoom */}
        <div className="relative h-56 w-full overflow-hidden bg-neutral-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />

          {/* Category Pill Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-neutral-900/80 backdrop-blur-md border border-white/15 text-indigo-300">
              {project.category}
            </span>
          </div>

          {/* Quick Action Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
            <span className="px-4 py-2 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xl shadow-indigo-500/30 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-4 h-4" /> View Details
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                {project.title}
              </h3>
              <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            <p className="text-xs font-mono text-indigo-400/80">{project.subtitle}</p>
            <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed">{project.description}</p>
          </div>

          {/* Tech Badges */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-neutral-300"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 text-neutral-500">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>

            {/* Links with magnetic hover */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-neutral-400 hover:text-white transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-neutral-400 hover:text-indigo-300 transition-colors"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
