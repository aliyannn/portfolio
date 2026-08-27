'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Sparkles, Layers, RefreshCw, Move3d, Shield, Code2, Globe, Cpu, Zap } from 'lucide-react';
import { TECH_FACES } from './3d/RubiksCube';

// Dynamic import with SSR false and skeleton fallback
const RubiksCube = dynamic(() => import('./3d/RubiksCube'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] sm:min-h-[440px] flex flex-col items-center justify-center bg-zinc-950/40 rounded-2xl border border-white/5 p-6 backdrop-blur-xl">
      <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-xl border-2 border-cyan-500/20 animate-ping" />
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 animate-spin">
          <RefreshCw className="w-6 h-6" />
        </div>
      </div>
      <p className="text-xs font-mono text-cyan-400/90 tracking-widest uppercase animate-pulse">
        Initializing 3D WebGL Matrix...
      </p>
      <div className="w-32 h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
        <div className="h-full bg-cyan-500 animate-pulse w-3/4 rounded-full" />
      </div>
    </div>
  ),
});

export const RubiksCubeCard: React.FC = () => {
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full rounded-2xl bg-zinc-950/70 border border-cyan-500/20 p-5 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden group hover:border-cyan-500/40 transition-all duration-500 flex flex-col justify-between"
    >
      {/* Background Neon Ambient Glows */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top HUD Frame Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-2">
        {/* Top Badge as requested */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wide shadow-inner">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>✦ Interactive 3D Stack Core</span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
              autoRotate
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title="Toggle autonomous layer twisting"
          >
            <RefreshCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>Auto Twist</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div className="relative z-10 w-full h-[360px] sm:h-[420px] my-2">
        <RubiksCube autoRotate={autoRotate} />
      </div>

      {/* Tech Stack Palette Legend Bar */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2 my-3 pt-3 border-t border-white/5">
        {Object.entries(TECH_FACES).map(([key, face]) => (
          <div
            key={key}
            className={`p-2 rounded-xl border ${face.bgClass} ${face.borderClass} flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
              style={{ backgroundColor: face.color, boxShadow: `0 0 8px ${face.color}` }}
            />
            <div className="min-w-0 flex-1">
              <div className={`text-[11px] font-semibold truncate ${face.textClass}`}>
                {face.name}
              </div>
              <div className="text-[9px] font-mono text-zinc-400 truncate">
                {face.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Hint Footer as requested */}
      <div className="relative z-10 flex items-center justify-between pt-2 text-[11px] font-mono text-zinc-400 border-t border-white/5">
        <span className="flex items-center gap-1.5 text-cyan-400/90 font-medium">
          <Move3d className="w-3.5 h-3.5" />
          [Drag to Rotate • 3D WebGL Matrix]
        </span>
        <span className="hidden sm:inline-block text-zinc-500">
          6 Glowing Cyber Faces
        </span>
      </div>
    </motion.div>
  );
};

export default RubiksCubeCard;
