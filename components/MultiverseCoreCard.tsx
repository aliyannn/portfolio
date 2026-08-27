'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Cpu, Orbit, RefreshCw, Zap } from 'lucide-react';
import { MULTIVERSE_DIMENSIONS, MultiverseDimension } from './3d/MultiverseCore';

// Dynamic import with SSR false and glowing skeleton fallback
const MultiverseCore = dynamic(() => import('./3d/MultiverseCore'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] flex flex-col items-center justify-center bg-zinc-950/40 rounded-2xl border border-white/5 p-6 backdrop-blur-xl">
      <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-violet-500/20 animate-ping" />
        <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/40 flex items-center justify-center text-violet-400 animate-spin">
          <Orbit className="w-6 h-6" />
        </div>
      </div>
      <p className="text-xs font-mono text-violet-400/90 tracking-widest uppercase animate-pulse">
        Warping Multiverse WebGL Matrix...
      </p>
      <div className="w-32 h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
        <div className="h-full bg-violet-500 animate-pulse w-4/5 rounded-full" />
      </div>
    </div>
  ),
});

export const MultiverseCoreCard: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<MultiverseDimension | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full rounded-2xl bg-zinc-950/75 border border-violet-500/20 p-5 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden group hover:border-violet-500/40 transition-all duration-500 flex flex-col justify-between"
    >
      {/* Background Cosmic Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top HUD Frame Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-2">
        {/* Header Tag as requested */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/50 border border-violet-500/30 text-violet-300 text-xs font-mono tracking-wide shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span>✦ Dimension Matrix // Multi-Disciplinary Stack</span>
        </div>

        {/* Corner Live Status Badges as requested */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-cyan-500/30 text-cyan-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            WARP: ACTIVE
          </span>
          <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-purple-500/30 text-purple-400 hidden sm:inline-flex items-center gap-1.5">
            <Orbit className="w-3 h-3 text-purple-400" />
            NODES: 4 DIMENSIONS
          </span>
        </div>
      </div>

      {/* 3D Multiverse WebGL Canvas */}
      <div className="relative z-10 w-full h-[360px] sm:h-[440px] my-1">
        <MultiverseCore onDimensionSelect={setSelectedDimension} />
      </div>

      {/* Multiverse Dimension Legend Pills */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 my-3 pt-3 border-t border-white/5">
        {MULTIVERSE_DIMENSIONS.map((dim) => {
          const isSelected = selectedDimension?.id === dim.id;
          return (
            <div
              key={dim.id}
              className={`p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-zinc-900 border-cyan-400 shadow-lg scale-[1.02]'
                  : 'bg-zinc-900/60 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-zinc-400">
                  {dim.code}
                </span>
                <span
                  className="w-2 h-2 rounded-full shadow-sm"
                  style={{ backgroundColor: dim.color, boxShadow: `0 0 8px ${dim.color}` }}
                />
              </div>
              <div className="text-xs font-bold text-white truncate">
                {dim.name}
              </div>
              <div className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                {dim.category}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Hint Footer as requested */}
      <div className="relative z-10 flex items-center justify-between pt-2.5 text-[11px] font-mono text-zinc-400 border-t border-white/5">
        <span className="flex items-center gap-1.5 text-violet-400 font-medium">
          <Compass className="w-3.5 h-3.5" />
          [Drag to Traverse the Multiverse Matrix]
        </span>
        <span className="hidden sm:inline-block text-zinc-500">
          Interactive WebGL Cosmic Core
        </span>
      </div>
    </motion.div>
  );
};

export default MultiverseCoreCard;
