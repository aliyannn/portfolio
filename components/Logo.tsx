'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-xs', sub: 'text-[8px]' },
    md: { icon: 'w-10 h-10', text: 'text-sm', sub: 'text-[9px]' },
    lg: { icon: 'w-12 h-12', text: 'text-base', sub: 'text-[10px]' },
  };

  const { icon: iconSize, text: textSize, sub: subSize } = sizeMap[size];

  return (
    <div className={`group flex items-center gap-3 select-none ${className}`}>
      {/* Cyber-Engineered Hexagon Monogram Graphic */}
      <div className={`relative ${iconSize} shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
        {/* Soft Cyan Ambient Glow Backlight */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_10px_rgba(6,182,212,0.45)] transition-all duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Hexagon Border & Monogram Gradient */}
            <linearGradient id="ag-brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="45%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            {/* Inner Core Glow */}
            <linearGradient id="ag-core-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Ambient Shadow Filter */}
            <filter id="ag-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Hexagonal Outer Frame */}
          <polygon
            points="50,7 90,28 90,72 50,93 10,72 10,28"
            fill="#030712"
            fillOpacity="0.85"
            stroke="url(#ag-brand-grad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className="group-hover:stroke-[4] transition-all duration-300"
            filter="url(#ag-glow-filter)"
          />

          {/* Inner Hexagon Circuit Grid Track */}
          <polygon
            points="50,15 82,32 82,68 50,85 18,68 18,32"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Precision 'A' Monogram Circuit Track */}
          <path
            d="M 32 70 L 50 24 L 68 70"
            stroke="url(#ag-brand-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:stroke-[#38bdf8] transition-colors duration-300"
          />

          {/* 'A' Crossbar / Bridge */}
          <path
            d="M 39 52 L 61 52"
            stroke="url(#ag-core-grad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* 'G' Geometric Integration Loop */}
          <path
            d="M 64 42 L 72 46 L 72 68 L 50 78 L 36 71"
            stroke="url(#ag-brand-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <path
            d="M 52 64 L 65 64"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Glowing Vertex Data Nodes */}
          <circle cx="50" cy="7" r="2.5" fill="#06b6d4" className="animate-pulse" />
          <circle cx="90" cy="28" r="2.5" fill="#6366f1" />
          <circle cx="90" cy="72" r="2.5" fill="#10b981" />
          <circle cx="10" cy="28" r="2.5" fill="#06b6d4" />
          <circle cx="50" cy="24" r="2" fill="#ffffff" />
        </svg>
      </div>

      {/* Typography Lockup */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-bold ${textSize} tracking-tight text-white group-hover:text-cyan-300 transition-colors`}>
            Aliyan Gohar
          </span>
          <span className={`${subSize} font-mono text-cyan-400/90 tracking-widest uppercase font-semibold flex items-center gap-1.5`}>
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            SYSTEMS &amp; FULL STACK
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
