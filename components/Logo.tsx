'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'w-11 h-11 sm:w-12 sm:h-12',
}) => {
  return (
    <div className={`relative shrink-0 flex items-center justify-center select-none group transition-transform duration-300 group-hover:scale-105 ${className}`}>
      {/* Soft Ambient Neon Glow Behind Emblem */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/25 via-blue-500/20 to-emerald-500/25 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.45)] group-hover:drop-shadow-[0_0_18px_rgba(6,182,212,0.7)] transition-all duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vibrant Cyan-to-Blue-to-Emerald Brand Gradient */}
          <linearGradient id="ag-cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="48%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Inner Monogram Core Gradient */}
          <linearGradient id="ag-monogram-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Deep Core Radial Gradient */}
          <radialGradient id="ag-bg-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a101f" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0.95" />
          </radialGradient>

          {/* Ambient Glow Filter */}
          <filter id="ag-glow-fx" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Isometric Hexagon Core Body */}
        <polygon
          points="50,6 91,28 91,72 50,94 9,72 9,28"
          fill="url(#ag-bg-radial)"
          stroke="url(#ag-cyber-grad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          filter="url(#ag-glow-fx)"
          className="group-hover:stroke-[4] transition-all duration-300"
        />

        {/* Inner Geometric Grid Guide Track */}
        <polygon
          points="50,14 83,32 83,68 50,86 17,68 17,32"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Precision 'A' Circuit Backbone */}
        <path
          d="M 31 71 L 50 22 L 69 71"
          stroke="url(#ag-monogram-grad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:stroke-[#38bdf8] transition-colors duration-300"
        />

        {/* 'A' Center Data Bridge */}
        <path
          d="M 38 52 L 62 52"
          stroke="#38BDF8"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 'G' Interlocking Integration Loop */}
        <path
          d="M 65 41 L 74 46 L 74 68 L 50 79 L 35 71"
          stroke="url(#ag-cyber-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M 52 64 L 67 64"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* High-Luminance Cyber Vertex Nodes */}
        <circle cx="50" cy="6" r="2.8" fill="#06B6D4" className="animate-pulse" />
        <circle cx="91" cy="28" r="2.8" fill="#3B82F6" />
        <circle cx="91" cy="72" r="2.8" fill="#10B981" />
        <circle cx="50" cy="94" r="2.8" fill="#10B981" />
        <circle cx="9" cy="72" r="2.8" fill="#3B82F6" />
        <circle cx="9" cy="28" r="2.8" fill="#06B6D4" />
        <circle cx="50" cy="22" r="2.2" fill="#ffffff" />
      </svg>
    </div>
  );
};

export default Logo;
