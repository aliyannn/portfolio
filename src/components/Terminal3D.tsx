import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal, ShieldCheck, Zap, Server, Activity, RefreshCw, CheckCircle2, Play, Cpu, Lock } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Server Node Scene using React Three Fiber
function ServerNodeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random particles for ambient cyber aura
  const particleCount = 60;
  const positions = useRef(new Float32Array(particleCount * 3));
  
  if (positions.current[0] === 0) {
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions.current[i] = (Math.random() - 0.5) * 5;
      positions.current[i + 1] = (Math.random() - 0.5) * 5;
      positions.current[i + 2] = (Math.random() - 0.5) * 5;
    }
  }

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.25;
      ringRef.current.rotation.x += delta * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group scale={1.1}>
      {/* Central Cyber Node Mesh */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.35}
          emissive="#0284c7"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Outer Data Torus Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Floating Cyber Aura Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions.current, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#38bdf8"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function Server3DBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full opacity-60"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-5, -5, -2]} intensity={1.2} color="#a855f7" />
        <ServerNodeMesh />
      </Canvas>
    </div>
  );
}

// CLI Script Line Type Definition
interface TerminalLine {
  id: string;
  type: 'cmd' | 'output' | 'info' | 'success';
  content: string;
}

const CLI_STEPS = [
  {
    cmd: 'git status',
    output: [
      { text: 'On branch main. Branch is up to date with origin/main.', type: 'info' as const },
      { text: 'Working tree clean. All systems operational.', type: 'success' as const }
    ]
  },
  {
    cmd: 'connect --cluster us-east-1',
    output: [
      { text: '[OK] TLS 1.3 Handshake established (latency: 18ms)', type: 'info' as const },
      { text: '[OK] Fortinet FortiGate 40F Security Perimeter Active', type: 'success' as const }
    ]
  },
  {
    cmd: 'status: 200 OK',
    output: [
      { text: 'HTTP/2 200 OK (Content-Type: application/json)', type: 'success' as const },
      { text: 'Edge cache: HIT (Region: iad1)', type: 'info' as const }
    ]
  },
  {
    cmd: 'stack: [React, TypeScript, Node.js, Cloud Services]',
    output: [
      { text: 'Core Stack: React 18, Three.js, TailwindCSS, AWS, Docker', type: 'info' as const },
      { text: 'Vibe Coding & AI Agents: Active', type: 'success' as const }
    ]
  },
  {
    cmd: 'deploy --prod',
    output: [
      { text: 'Compiling production assets... [100%]', type: 'info' as const },
      { text: '✔ Deployed commit #a8f9c12 to production cluster', type: 'success' as const }
    ]
  }
];

export const Terminal3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Parallax 3D tilt springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 18,
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
  };

  // Terminal Auto-typing engine
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [currentCmd, setCurrentCmd] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const currentStep = CLI_STEPS[stepIndex];
    const fullCmd = currentStep.cmd;

    if (currentCmd.length < fullCmd.length) {
      // Type next character
      timeoutId = setTimeout(() => {
        setCurrentCmd(fullCmd.slice(0, currentCmd.length + 1));
      }, 40 + Math.random() * 30);
    } else {
      // Command typing completed, append command & output lines
      timeoutId = setTimeout(() => {
        setHistory((prev) => {
          const newLines: TerminalLine[] = [
            ...prev,
            { id: Math.random().toString(), type: 'cmd', content: `$ ${fullCmd}` },
            ...currentStep.output.map((line) => ({
              id: Math.random().toString(),
              type: line.type,
              content: line.text,
            })),
          ];
          // Keep terminal history bounded
          return newLines.slice(-12);
        });

        setCurrentCmd('');
        setStepIndex((prevIndex) => (prevIndex + 1) % CLI_STEPS.length);
      }, 900);
    }

    return () => clearTimeout(timeoutId);
  }, [currentCmd, stepIndex]);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, currentCmd]);

  const handleRunPreset = (presetCmd: string) => {
    setHistory((prev) => [
      ...prev,
      { id: Math.random().toString(), type: 'cmd', content: `$ ${presetCmd}` },
      { id: Math.random().toString(), type: 'success', content: `✔ Executed: ${presetCmd} - 200 OK` },
    ]);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-2xl mx-auto perspective-1000 py-4 transform-gpu"
    >
      {/* 3D Tilt Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-2xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-cyan-500/20 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] border border-white/10"
      >
        {/* Background 3D R3F Canvas */}
        <Suspense fallback={null}>
          <Server3DBackground />
        </Suspense>

        {/* Floating Infrastructure Metrics Badges */}
        {/* Badge 1: System Uptime (Top Left) */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-5 -left-2 sm:-left-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-emerald-500/40 backdrop-blur-xl shadow-lg shadow-emerald-950/40 text-xs font-mono text-emerald-300"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-semibold">System Uptime: 99.9%</span>
        </motion.div>

        {/* Badge 2: Latency (Top Right) */}
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -top-5 -right-2 sm:-right-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-cyan-500/40 backdrop-blur-xl shadow-lg shadow-cyan-950/40 text-xs font-mono text-cyan-300"
          style={{ transform: 'translateZ(45px)' }}
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-semibold">Latency: &lt; 24ms</span>
        </motion.div>

        {/* Badge 3: Security (Bottom Left) */}
        <motion.div
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-5 -left-2 sm:-left-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-purple-500/40 backdrop-blur-xl shadow-lg shadow-purple-950/40 text-xs font-mono text-purple-300"
          style={{ transform: 'translateZ(35px)' }}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-semibold">Security: TLS 1.3 Active</span>
        </motion.div>

        {/* Badge 4: Active Deployment (Bottom Right) */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -bottom-5 -right-2 sm:-right-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-indigo-500/40 backdrop-blur-xl shadow-lg shadow-indigo-950/40 text-xs font-mono text-indigo-300"
          style={{ transform: 'translateZ(40px)' }}
        >
          <Server className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold">Active Deployment: Production</span>
        </motion.div>

        {/* Main Acrylic Glass Terminal Window */}
        <div className="relative z-20 rounded-xl bg-zinc-950/85 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Subtle Scanline CRT Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30 z-30" />

          {/* Terminal Window Titlebar Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-white/10 select-none">
            {/* macOS Control Dots */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400/40 flex items-center justify-center group cursor-pointer">
                <span className="text-[8px] text-red-950 opacity-0 group-hover:opacity-100 font-bold">×</span>
              </div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40 flex items-center justify-center group cursor-pointer">
                <span className="text-[8px] text-amber-950 opacity-0 group-hover:opacity-100 font-bold">-</span>
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40 flex items-center justify-center group cursor-pointer">
                <span className="text-[8px] text-emerald-950 opacity-0 group-hover:opacity-100 font-bold">+</span>
              </div>
            </div>

            {/* Terminal Title */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-medium">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>aliyan@system-node-01: ~ (zsh)</span>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div
            ref={terminalBodyRef}
            className="p-5 min-h-[260px] max-h-[310px] overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed space-y-2 text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-700"
          >
            {/* System Welcome Banner */}
            <div className="text-zinc-500 text-[11px] pb-2 border-b border-zinc-800/60 mb-3 flex items-center justify-between">
              <span>Cyber Terminal v2.4.0 (x86_64-apple-darwin22.0)</span>
              <span className="text-cyan-500/70 font-semibold">FortiGate Protected</span>
            </div>

            {/* Terminal History */}
            {history.map((item) => (
              <div key={item.id} className="transition-all duration-150">
                {item.type === 'cmd' && (
                  <div className="text-cyan-400 font-medium flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&gt;</span>
                    <span>{item.content}</span>
                  </div>
                )}
                {item.type === 'info' && (
                  <div className="text-zinc-400 pl-4 border-l border-zinc-800 my-0.5">
                    {item.content}
                  </div>
                )}
                {item.type === 'success' && (
                  <div className="text-emerald-400 pl-4 border-l border-emerald-500/40 my-0.5 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item.content}</span>
                  </div>
                )}
              </div>
            ))}

            {/* Live Typing Line */}
            <div className="text-cyan-400 font-medium flex items-center gap-2 pt-1">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span>$ {currentCmd}</span>
              <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block ml-0.5 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
          </div>

          {/* Quick Action Interactive Pills Bar */}
          <div className="px-4 py-2.5 bg-zinc-900/60 border-t border-white/5 flex items-center justify-between gap-2 overflow-x-auto text-[11px] font-mono text-zinc-400">
            <span className="text-zinc-500 shrink-0 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-400" /> Presets:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleRunPreset('git status')}
                className="px-2.5 py-1 rounded bg-zinc-800/60 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/40 transition-colors"
              >
                git status
              </button>
              <button
                onClick={() => handleRunPreset('sys info')}
                className="px-2.5 py-1 rounded bg-zinc-800/60 hover:bg-purple-500/20 hover:text-purple-300 border border-white/5 hover:border-purple-500/40 transition-colors"
              >
                sys info
              </button>
              <button
                onClick={() => handleRunPreset('deploy --prod')}
                className="px-2.5 py-1 rounded bg-zinc-800/60 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-colors"
              >
                deploy
              </button>
              <button
                onClick={() => setHistory([])}
                className="p-1 rounded bg-zinc-800/60 hover:bg-red-500/20 hover:text-red-400 border border-white/5 transition-colors"
                title="Clear Terminal"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Terminal3D;
