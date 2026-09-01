'use client';

import { ArrowUp, Github, Linkedin, Heart, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#030712]/80 backdrop-blur-xl py-12 px-6 sm:px-12 overflow-hidden">
      {/* Background glow spot */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-t from-cyan-500/10 to-violet-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-white tracking-wider">
              {PORTFOLIO_DATA.personalInfo.name.toUpperCase()}
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <p className="text-xs text-slate-400 font-mono">
            {PORTFOLIO_DATA.personalInfo.title} • {PORTFOLIO_DATA.personalInfo.location}
          </p>
        </div>

        {/* Middle Copyright */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <span>© {new Date().getFullYear()} {PORTFOLIO_DATA.personalInfo.name}. Built with</span>
          <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 animate-pulse" />
          <span>& React + Three.js.</span>
        </div>

        {/* Right Actions & Back to top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={PORTFOLIO_DATA.personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full glass-card border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full glass-card border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              download="Aliyan_Gohar_Software_Engineer_Resume.pdf"
              className="w-9 h-9 rounded-full glass-card border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 transition-all duration-300 shadow-cyan-glow/20"
              aria-label="Download Resume"
              title="Download Resume PDF"
            >
              <FileText className="w-4 h-4" />
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 group"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
