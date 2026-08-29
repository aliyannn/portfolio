'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ShieldCheck,
  Radio,
  CheckCircle2,
  Layers,
  Laptop,
  Smartphone,
} from 'lucide-react';
import { WebGLErrorBoundary } from '@/components/3d/3DErrorBoundary';

// ======================================================================
// 1. Device & Client Telemetry Parser
// ======================================================================
interface ClientTelemetry {
  deviceType: 'Desktop' | 'Tablet' | 'Mobile';
  deviceModel: string;
  osName: string;
  gpuName: string;
}

function parseClientTelemetry(): ClientTelemetry {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'Desktop',
      deviceModel: 'Developer Node',
      osName: 'Windows',
      gpuName: 'WebGL Graphics Core',
    };
  }

  const ua = navigator.userAgent || '';
  const width = window.screen.width;
  const height = window.screen.height;
  const dpr = window.devicePixelRatio || 1;
  const resW = Math.round(Math.min(width, height) * dpr);
  const resH = Math.round(Math.max(width, height) * dpr);

  let deviceType: 'Desktop' | 'Tablet' | 'Mobile' = 'Desktop';
  let deviceModel = 'Custom PC / Workstation';
  let osName = 'Windows 11';

  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) {
    if (/iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      deviceType = 'Tablet';
      osName = 'iPadOS';
      deviceModel = 'Apple iPad';
    } else {
      deviceType = 'Mobile';
      osName = 'iOS 17';
      if (resW === 1179 && resH === 2556) deviceModel = 'Apple iPhone 15 Pro / 16';
      else if (resW === 1290 && resH === 2796) deviceModel = 'Apple iPhone 15 Pro Max / 16 Plus';
      else if (resW === 1170 && resH === 2532) deviceModel = 'Apple iPhone 14 / 13 / 12 Pro';
      else if (resW === 1284 && resH === 2778) deviceModel = 'Apple iPhone 14 Plus / 13 Pro Max';
      else if (resW === 1125 && resH === 2436) deviceModel = 'Apple iPhone X / XS / 11 Pro';
      else deviceModel = 'Apple iPhone';
    }
  } else if (/Android/i.test(ua)) {
    deviceType = /Mobile/i.test(ua) ? 'Mobile' : 'Tablet';
    osName = 'Android 14';
    if (/SM-S928/i.test(ua)) deviceModel = 'Samsung Galaxy S24 Ultra';
    else if (/SM-S918/i.test(ua)) deviceModel = 'Samsung Galaxy S23 Ultra';
    else if (/Pixel 8 Pro/i.test(ua)) deviceModel = 'Google Pixel 8 Pro';
    else if (/Pixel 8/i.test(ua)) deviceModel = 'Google Pixel 8';
    else deviceModel = 'Android Flagship';
  } else {
    deviceType = 'Desktop';
    if (/Win/i.test(ua)) {
      osName = 'Windows 11';
      deviceModel = 'Custom PC / Workstation';
    } else if (/Mac/i.test(ua)) {
      osName = 'macOS Sonoma';
      deviceModel = 'MacBook Pro / Mac';
    } else if (/Linux/i.test(ua)) {
      osName = 'Linux';
      deviceModel = 'Linux Workstation';
    }
  }

  let gpuName = 'High-Performance WebGL Core';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const unmasked = (gl as WebGLRenderingContext).getParameter(
          debugInfo.UNMASKED_RENDERER_WEBGL
        );
        if (unmasked) {
          if (/Apple/i.test(unmasked)) gpuName = 'Apple M-Series GPU';
          else if (/NVIDIA/i.test(unmasked)) {
            const match = unmasked.match(/RTX\s*\d+/i) || unmasked.match(/GTX\s*\d+/i);
            gpuName = match ? `NVIDIA GeForce ${match[0]}` : 'NVIDIA GeForce RTX';
          } else if (/Radeon|AMD/i.test(unmasked)) {
            gpuName = 'AMD Radeon Graphics';
          } else if (/Intel/i.test(unmasked)) {
            gpuName = 'Intel Iris / UHD Graphics';
          } else if (/Adreno/i.test(unmasked)) {
            const match = unmasked.match(/Adreno\s*\d+/i);
            gpuName = match ? `Qualcomm ${match[0]}` : 'Qualcomm Adreno GPU';
          } else {
            gpuName = unmasked.replace(/ANGLE \((.*)\)/, '$1').slice(0, 24);
          }
        }
      }
    }
  } catch (e) {
    // fallback
  }

  return { deviceType, deviceModel, osName, gpuName };
}

// ======================================================================
// 2. Three.js Geodesic Holographic Core & Orbital Field
// ======================================================================
interface HologramSceneProps {
  hoveredNode: string | null;
}

function HolographicCoreMesh({ hoveredNode }: HologramSceneProps) {
  const coreGroupRef = useRef<THREE.Group>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const innerOctaRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Particle cloud orbiting core
  const particleCount = 75;
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.3 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      arr[i] = radius * Math.cos(theta) * Math.cos(phi);
      arr[i + 1] = radius * Math.sin(phi);
      arr[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.y = t * 0.25;
      coreGroupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y -= delta * 0.32;
      outerSphereRef.current.rotation.z += delta * 0.14;
    }

    if (innerOctaRef.current) {
      innerOctaRef.current.rotation.x += delta * 0.6;
      innerOctaRef.current.rotation.y += delta * 0.8;
      const scale = 0.9 + Math.sin(t * 2.5) * 0.08;
      innerOctaRef.current.scale.set(scale, scale, scale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.35 + Math.PI / 4;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.3;
      ring2Ref.current.rotation.y = Math.cos(t * 0.4) * 0.3 - Math.PI / 4;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.08;
    }
  });

  const isBoosted = Boolean(hoveredNode);

  return (
    <group ref={coreGroupRef} scale={0.9}>
      {/* Central Inner Pulsing Crystal Core */}
      <mesh ref={innerOctaRef}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive={isBoosted ? '#38bdf8' : '#0284c7'}
          emissiveIntensity={isBoosted ? 1.6 : 1.15}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Geodesic Neon Obsidian Wireframe Outer Sphere */}
      <mesh ref={outerSphereRef}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={isBoosted ? 0.8 : 0.45}
          emissive="#06b6d4"
          emissiveIntensity={isBoosted ? 0.9 : 0.4}
        />
      </mesh>

      {/* Geodesic Vertices Glowing Nodes */}
      <points>
        <icosahedronGeometry args={[1.26, 1]} />
        <pointsMaterial
          size={0.07}
          color="#38bdf8"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Orbital Holographic Cyber Ring 1 (Cyan) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.75, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital Holographic Cyber Ring 2 (Indigo/Violet) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.08, 0.018, 16, 90]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Quantum Data Particle Starfield */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#a855f7"
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ======================================================================
// 3. Main CyberHologram Interactive Assembly
// ======================================================================
export const CyberHologram: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Client telemetry
  const [telemetry, setTelemetry] = useState<ClientTelemetry>({
    deviceType: 'Desktop',
    deviceModel: 'Developer Node',
    osName: 'Detecting OS...',
    gpuName: 'WebGL Graphics Core',
  });

  // Dynamic live ping jitter (22ms - 34ms)
  const [pingMs, setPingMs] = useState<number>(24);
  const [rxSpeed, setRxSpeed] = useState<string>('1.4 MB/s');
  const [txSpeed, setTxSpeed] = useState<string>('840 KB/s');

  useEffect(() => {
    setTelemetry(parseClientTelemetry());

    const interval = setInterval(() => {
      setPingMs(Math.floor(22 + Math.random() * 12));
      setRxSpeed(`${(1.2 + Math.random() * 0.6).toFixed(1)} MB/s`);
      setTxSpeed(`${Math.floor(750 + Math.random() * 220)} KB/s`);
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  // Framer Motion 3D Tilt Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 160,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredNode(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[380px] sm:h-[420px] lg:h-[450px] flex items-center justify-center perspective-1000 select-none overflow-visible"
    >
      {/* Ambient Horizon Glow Beams Behind Hologram */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] bg-cyan-500/16 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] bg-purple-600/16 rounded-full blur-[90px] pointer-events-none animate-pulse-slow [animation-delay:2s]" />

      {/* 3D Parallax Assembly Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[480px] h-full flex items-center justify-center transform-gpu overflow-visible"
      >
        {/* ========================================================= */}
        {/* A. Central Three.js WebGL Hologram Canvas */}
        {/* ========================================================= */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-auto z-0 overflow-visible"
          style={{ transform: 'translateZ(0px)' }}
        >
          <WebGLErrorBoundary fallbackTitle="Holographic Core Offline">
            <Canvas
              camera={{ position: [0, 0, 7.2], fov: 44 }}
              dpr={[1, 1.5]}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
              }}
              className="w-full h-full overflow-visible"
            >
              <ambientLight intensity={0.85} />
              <pointLight position={[5, 5, 5]} intensity={1.5} color="#38bdf8" />
              <pointLight position={[-5, -5, -3]} intensity={1.2} color="#a855f7" />
              <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.5}>
                <HolographicCoreMesh hoveredNode={hoveredNode} />
              </Float>
            </Canvas>
          </WebGLErrorBoundary>
        </div>

        {/* ========================================================= */}
        {/* B. SVG Dynamic Laser Connecting Circuit Traces */}
        {/* ========================================================= */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          style={{ transform: 'translateZ(15px)' }}
          viewBox="0 0 480 420"
          fill="none"
        >
          <defs>
            <linearGradient id="laser-grad-node1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="laser-grad-node2" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="laser-grad-node3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
            </linearGradient>

            <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Laser Trace 1: Core (240, 210) -> Node 1 (Top-Right: 370, 50) */}
          <path
            d="M 240 210 C 290 160, 330 100, 370 50"
            stroke="url(#laser-grad-node1)"
            strokeWidth={hoveredNode === 'node1' ? 2.2 : 1.3}
            strokeDasharray="5 4"
            className="transition-all duration-300"
            filter="url(#laser-glow)"
            opacity={hoveredNode === 'node1' ? 0.95 : 0.45}
          />
          <circle r="2.8" fill="#38bdf8" filter="url(#laser-glow)">
            <animateMotion
              path="M 240 210 C 290 160, 330 100, 370 50"
              dur={hoveredNode === 'node1' ? '1.2s' : '2.4s'}
              repeatCount="indefinite"
            />
          </circle>

          {/* Laser Trace 2: Core (240, 210) -> Node 2 (Left: 90, 190) */}
          <path
            d="M 240 210 C 180 220, 130 200, 90 190"
            stroke="url(#laser-grad-node2)"
            strokeWidth={hoveredNode === 'node2' ? 2.2 : 1.3}
            strokeDasharray="5 4"
            className="transition-all duration-300"
            filter="url(#laser-glow)"
            opacity={hoveredNode === 'node2' ? 0.95 : 0.45}
          />
          <circle r="2.8" fill="#818cf8" filter="url(#laser-glow)">
            <animateMotion
              path="M 240 210 C 180 220, 130 200, 90 190"
              dur={hoveredNode === 'node2' ? '1.1s' : '2.6s'}
              repeatCount="indefinite"
            />
          </circle>

          {/* Laser Trace 3: Core (240, 210) -> Node 3 (Bottom-Right: 375, 365) */}
          <path
            d="M 240 210 C 285 260, 330 320, 375 365"
            stroke="url(#laser-grad-node3)"
            strokeWidth={hoveredNode === 'node3' ? 2.2 : 1.3}
            strokeDasharray="5 4"
            className="transition-all duration-300"
            filter="url(#laser-glow)"
            opacity={hoveredNode === 'node3' ? 0.95 : 0.45}
          />
          <circle r="2.8" fill="#34d399" filter="url(#laser-glow)">
            <animateMotion
              path="M 240 210 C 285 260, 330 320, 375 365"
              dur={hoveredNode === 'node3' ? '1.0s' : '2.2s'}
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* ========================================================= */}
        {/* C. 3 Orbiting Satellite HUD Cards (Floating Micro-Glass Widgets) */}
        {/* ========================================================= */}

        {/* ------------------------------------------------------------- */}
        {/* Satellite Node 1 (Top-Right): "Live Network Node" */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          onMouseEnter={() => setHoveredNode('node1')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute top-2 right-1 sm:right-3 z-20 transition-all duration-300 ${
            hoveredNode === 'node1' ? 'scale-105' : 'scale-100'
          }`}
          style={{ transform: 'translateZ(36px)' }}
        >
          <div className="relative group p-[1px] rounded-xl bg-gradient-to-r from-cyan-500/40 via-white/10 to-teal-500/30 backdrop-blur-xl shadow-[0_8px_24px_-6px_rgba(6,182,212,0.3)] hover:shadow-[0_12px_32px_-4px_rgba(6,182,212,0.45)]">
            <div className="px-3 py-2 rounded-xl bg-zinc-950/85 border border-white/10 flex flex-col gap-0.5 font-mono text-xs">
              <div className="flex items-center justify-between gap-2.5 text-[9.5px] text-zinc-400">
                <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-cyan-300">
                  <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                  Live Network Node
                </span>
                <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[8.5px]">
                  <ShieldCheck className="w-2 h-2" /> FORTINET ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-between gap-2.5 pt-0.5">
                <div className="flex items-center gap-1 text-emerald-300 font-bold text-[11px] sm:text-xs">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span>{pingMs}ms Latency</span>
                </div>

                <div className="text-[9.5px] text-zinc-400 flex items-center gap-1">
                  <span className="text-cyan-300">{rxSpeed}</span>
                  <span className="text-zinc-500">⇄</span>
                  <span className="text-emerald-300">{txSpeed}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* Satellite Node 2 (Left): "Device Telemetry" */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          onMouseEnter={() => setHoveredNode('node2')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute top-[42%] left-0 sm:left-1 z-20 transition-all duration-300 ${
            hoveredNode === 'node2' ? 'scale-105' : 'scale-100'
          }`}
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="relative group p-[1px] rounded-xl bg-gradient-to-r from-purple-500/40 via-white/10 to-indigo-500/30 backdrop-blur-xl shadow-[0_8px_24px_-6px_rgba(139,92,246,0.3)] hover:shadow-[0_12px_32px_-4px_rgba(139,92,246,0.45)]">
            <div className="px-3 py-2 rounded-xl bg-zinc-950/85 border border-white/10 flex flex-col gap-0.5 font-mono text-xs max-w-[190px] sm:max-w-[210px]">
              <div className="flex items-center justify-between gap-2 text-[9.5px] text-zinc-400">
                <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-purple-300">
                  {telemetry.deviceType === 'Mobile' ? (
                    <Smartphone className="w-2.5 h-2.5 text-purple-400" />
                  ) : (
                    <Laptop className="w-2.5 h-2.5 text-purple-400" />
                  )}
                  Device Telemetry
                </span>
                <span className="text-emerald-400 font-bold text-[9px]">99.9% UPTIME</span>
              </div>

              <div className="font-semibold text-white truncate text-[11px] sm:text-xs pt-0.5">
                {telemetry.deviceModel}
              </div>

              <div className="text-[9px] text-zinc-400 truncate flex items-center gap-1">
                <span className="text-purple-300">{telemetry.osName}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 truncate">{telemetry.gpuName}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* Satellite Node 3 (Bottom-Right): "Core Architecture" */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          onMouseEnter={() => setHoveredNode('node3')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute bottom-2 right-1 sm:right-3 z-20 transition-all duration-300 ${
            hoveredNode === 'node3' ? 'scale-105' : 'scale-100'
          }`}
          style={{ transform: 'translateZ(34px)' }}
        >
          <div className="relative group p-[1px] rounded-xl bg-gradient-to-r from-emerald-500/40 via-cyan-500/20 to-indigo-500/30 backdrop-blur-xl shadow-[0_8px_24px_-6px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_32px_-4px_rgba(16,185,129,0.45)]">
            <div className="px-3 py-2 rounded-xl bg-zinc-950/85 border border-white/10 flex flex-col gap-1 font-mono text-xs">
              <div className="flex items-center justify-between gap-2.5 text-[9.5px] text-zinc-400">
                <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-emerald-300">
                  <Layers className="w-2.5 h-2.5 text-emerald-400" />
                  Core Architecture
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[8.5px]">
                  <CheckCircle2 className="w-2 h-2 text-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-200">
                <span className="px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  React 18
                </span>
                <span className="text-zinc-600">•</span>
                <span className="px-1.5 py-0.2 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  Three.js
                </span>
                <span className="text-zinc-600">•</span>
                <span className="px-1.5 py-0.2 rounded bg-zinc-900 border border-white/15 text-white">
                  Next.js 14
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CyberHologram;
