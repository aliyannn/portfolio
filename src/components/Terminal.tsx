import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal as TerminalIcon, ShieldCheck, Zap, Server, RefreshCw, CheckCircle2, Cpu, Laptop, Smartphone, Monitor, Clock, Wifi, BatteryCharging, HardDrive } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Interface for Browser Battery API
interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => any) | null;
}

interface CustomNavigator extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    rtt?: number;
    downlink?: number;
    saveData?: boolean;
  };
}

// 3D Background Server Mesh Component (React Three Fiber)
function ServerNodeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 50;
  const positions = useRef(new Float32Array(particleCount * 3));

  if (positions.current[0] === 0) {
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions.current[i] = (Math.random() - 0.5) * 5;
      positions.current[i + 1] = (Math.random() - 0.5) * 5;
      positions.current[i + 2] = (Math.random() - 0.5) * 5;
    }
  }

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group scale={1.05}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.3}
          emissive="#0284c7"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#8b5cf6"
          emissiveIntensity={0.7}
          transparent
          opacity={0.5}
        />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions.current, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#38bdf8"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function Server3DCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full opacity-50"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#38bdf8" />
        <pointLight position={[-5, -5, -2]} intensity={1.0} color="#a855f7" />
        <ServerNodeMesh />
      </Canvas>
    </div>
  );
}

export const Terminal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Parallax 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 140,
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

  // --- Real-time Client Diagnostics State ---
  const [deviceType, setDeviceType] = useState<'Desktop' | 'Tablet' | 'Mobile'>('Desktop');
  const [osName, setOsName] = useState<string>('Detecting...');
  const [cpuCores, setCpuCores] = useState<number>(4);
  const [viewport, setViewport] = useState<string>('1920x1080');
  const [batteryInfo, setBatteryInfo] = useState<string>('Detecting...');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [networkType, setNetworkType] = useState<string>('Fast (HTTP/2)');
  const [sessionSeconds, setSessionSeconds] = useState<number>(1);
  const [terminalHistory, setTerminalHistory] = useState<
    { id: string; type: 'cmd' | 'info' | 'success' | 'warn'; text: string }[]
  >([]);

  // 1. Detect Device, OS, System specs
  useEffect(() => {
    const nav = navigator as CustomNavigator;
    const ua = nav.userAgent || '';

    // Device classification
    let device: 'Desktop' | 'Tablet' | 'Mobile' = 'Desktop';
    if (/iPad|tablet/i.test(ua) || (window.innerWidth >= 640 && window.innerWidth <= 1024 && 'ontouchstart' in window)) {
      device = 'Tablet';
    } else if (/Mobile|Android|iPhone|iPod/i.test(ua) || window.innerWidth < 640) {
      device = 'Mobile';
    }
    setDeviceType(device);

    // OS Detection
    let os = 'Unknown OS';
    if (/Win/i.test(ua)) os = 'Windows';
    else if (/Mac/i.test(ua)) os = 'macOS';
    else if (/Linux/i.test(ua)) os = 'Linux';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    setOsName(os);

    // CPU Cores & Viewport
    if (nav.hardwareConcurrency) {
      setCpuCores(nav.hardwareConcurrency);
    }
    setViewport(`${window.innerWidth}x${window.innerHeight}px`);

    const handleResize = () => {
      setViewport(`${window.innerWidth}x${window.innerHeight}px`);
    };
    window.addEventListener('resize', handleResize);

    // Network status
    const updateOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);

    if (nav.connection) {
      const type = nav.connection.effectiveType?.toUpperCase() || '4G';
      const rtt = nav.connection.rtt ? `${nav.connection.rtt}ms` : '18ms';
      setNetworkType(`${type} (${rtt})`);
    }

    // Battery API
    if (nav.getBattery) {
      nav
        .getBattery()
        .then((battery) => {
          const updateBattery = () => {
            const levelPct = Math.round(battery.level * 100);
            const status = battery.charging ? 'Charging' : 'Discharging';
            setBatteryInfo(`${levelPct}% (${status})`);
          };
          updateBattery();
          battery.addEventListener('levelchange', updateBattery);
          battery.addEventListener('chargingchange', updateBattery);
        })
        .catch(() => {
          setBatteryInfo('AC Power');
        });
    } else {
      setBatteryInfo('AC Power');
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, []);

  // 2. Real-Time Session Uptime Counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return hrs > 0 ? `${pad(hrs)}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`;
  };

  // 3. Initialize Terminal Log Lines with Real Visitor Specs
  useEffect(() => {
    const initialLines = [
      { id: '1', type: 'cmd' as const, text: '$ client-diag --init-scan' },
      { id: '2', type: 'info' as const, text: `[DEVICE] Visitor Node: ${deviceType} (${osName})` },
      { id: '3', type: 'info' as const, text: `[HARDWARE] CPU Cores: ${cpuCores} Cores | Viewport: ${viewport}` },
      { id: '4', type: 'info' as const, text: `[POWER] Energy State: ${batteryInfo}` },
      { id: '5', type: 'success' as const, text: `[NETWORK] Status: ${isOnline ? 'Online (TLS 1.3)' : 'Offline'} | Speed: ${networkType}` },
      { id: '6', type: 'success' as const, text: `[STATUS] 200 OK - Connected to Aliyan's Portfolio Cluster` },
    ];
    setTerminalHistory(initialLines);
  }, [deviceType, osName, cpuCores, viewport, batteryInfo, isOnline, networkType]);

  const handleRunDiagnostic = () => {
    const newId = Math.random().toString();
    setTerminalHistory((prev) => [
      ...prev,
      { id: newId + '-cmd', type: 'cmd', text: '$ client-diag --refresh' },
      {
        id: newId + '-res',
        type: 'success',
        text: `✔ Client Diag Updated: Uptime ${formatUptime(sessionSeconds)} | ${viewport} | Latency: < 24ms`,
      },
    ]);
  };

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory, sessionSeconds]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg lg:max-w-xl mx-auto perspective-1000 py-3 transform-gpu"
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
          <Server3DCanvas />
        </Suspense>

        {/* Floating Real-Time Status Pills */}
        {/* Pill 1: Visitor Device (Top Left) */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -left-2 sm:-left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/85 border border-emerald-500/40 backdrop-blur-xl shadow-lg text-xs font-mono text-emerald-300"
          style={{ transform: 'translateZ(35px)' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-medium flex items-center gap-1">
            {deviceType === 'Mobile' ? (
              <Smartphone className="w-3 h-3 text-emerald-400" />
            ) : deviceType === 'Tablet' ? (
              <Laptop className="w-3 h-3 text-emerald-400" />
            ) : (
              <Monitor className="w-3 h-3 text-emerald-400" />
            )}
            Device: {deviceType} ({osName})
          </span>
        </motion.div>

        {/* Pill 2: Live Ping / Network (Top Right) */}
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -top-4 -right-2 sm:-right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/85 border border-cyan-500/40 backdrop-blur-xl shadow-lg text-xs font-mono text-cyan-300"
          style={{ transform: 'translateZ(40px)' }}
        >
          <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-medium">Network: {isOnline ? 'Online' : 'Offline'}</span>
        </motion.div>

        {/* Pill 3: Real-Time Session Uptime (Bottom Left) */}
        <motion.div
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-4 -left-2 sm:-left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/85 border border-purple-500/40 backdrop-blur-xl shadow-lg text-xs font-mono text-purple-300"
          style={{ transform: 'translateZ(30px)' }}
        >
          <Clock className="w-3.5 h-3.5 text-purple-400 animate-spin [animation-duration:10s]" />
          <span className="font-medium">Uptime: {formatUptime(sessionSeconds)}</span>
        </motion.div>

        {/* Main Glassmorphic Terminal Card Body */}
        <div className="relative z-20 rounded-xl bg-zinc-950/90 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* CRT Scanline Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30 z-30" />

          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-white/10 select-none">
            {/* macOS Window Control Dots */}
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
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-medium">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>client@guest-device:~ (Connected)</span>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>
          </div>

          {/* Terminal Log Console */}
          <div
            ref={terminalBodyRef}
            className="p-4 sm:p-5 min-h-[250px] max-h-[300px] overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed space-y-2 text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-700"
          >
            {/* Terminal Banner */}
            <div className="text-zinc-500 text-[11px] pb-2 border-b border-zinc-800/60 mb-2 flex items-center justify-between">
              <span>Client Diag v2.4.0 (Web API Telemetry)</span>
              <span className="text-emerald-400 font-semibold">Fortinet Protected</span>
            </div>

            {/* Rendered History */}
            {terminalHistory.map((item) => (
              <div key={item.id} className="transition-all duration-150">
                {item.type === 'cmd' && (
                  <div className="text-cyan-400 font-medium flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">&gt;</span>
                    <span>{item.text}</span>
                  </div>
                )}
                {item.type === 'info' && (
                  <div className="text-zinc-400 pl-3 border-l border-zinc-800 my-0.5">
                    {item.text}
                  </div>
                )}
                {item.type === 'success' && (
                  <div className="text-emerald-400 pl-3 border-l border-emerald-500/40 my-0.5 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item.text}</span>
                  </div>
                )}
              </div>
            ))}

            {/* Dynamic Live Uptime & Telemetry Prompt */}
            <div className="text-cyan-400 font-medium flex items-center gap-2 pt-1">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span className="text-zinc-300">
                $ uptime: <span className="text-purple-300 font-semibold">{formatUptime(sessionSeconds)}</span> | power: <span className="text-emerald-300">{batteryInfo}</span>
              </span>
              <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
          </div>

          {/* Quick Action Presets Bar */}
          <div className="px-4 py-2 bg-zinc-900/80 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-2 text-zinc-400">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>{cpuCores} Cores</span>
              <span className="text-zinc-600">|</span>
              <HardDrive className="w-3 h-3 text-purple-400" />
              <span>{viewport}</span>
            </div>
            <button
              onClick={handleRunDiagnostic}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh Diag</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Terminal;
