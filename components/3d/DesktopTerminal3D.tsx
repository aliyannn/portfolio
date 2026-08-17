'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  CheckCircle2,
  Cpu,
  Laptop,
  Smartphone,
  Monitor,
  Clock,
  Wifi,
  HardDrive,
  RefreshCw,
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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

// 3D Three.js Server Core Mesh
function ServerNodeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 45;
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
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.15;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
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
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
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
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
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

export const DesktopTerminal3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Parallax 3D spring values
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

  // Real-time Client Telemetry State
  const [deviceType, setDeviceType] = useState<'Desktop' | 'Tablet' | 'Mobile'>('Desktop');
  const [osName, setOsName] = useState<string>('Detecting...');
  const [cpuCores, setCpuCores] = useState<number>(4);
  const [viewport, setViewport] = useState<string>('1920x1080');
  const [batteryInfo, setBatteryInfo] = useState<string>('Detecting...');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [networkType, setNetworkType] = useState<string>('Fast (HTTP/2)');
  const [sessionSeconds, setSessionSeconds] = useState<number>(1);
  const [terminalHistory, setTerminalHistory] = useState<
    { id: string; type: 'cmd' | 'info' | 'success' | 'warn'; text: string }[]
  >([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const nav = navigator as CustomNavigator;
    const ua = nav.userAgent || '';

    let device: 'Desktop' | 'Tablet' | 'Mobile' = 'Desktop';
    if (/iPad|tablet/i.test(ua)) device = 'Tablet';
    else if (/Mobile|Android|iPhone|iPod/i.test(ua)) device = 'Mobile';
    setDeviceType(device);

    let os = 'Unknown OS';
    if (/Win/i.test(ua)) os = 'Windows';
    else if (/Mac/i.test(ua)) os = 'macOS';
    else if (/Linux/i.test(ua)) os = 'Linux';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    setOsName(os);

    if (nav.hardwareConcurrency) {
      setCpuCores(nav.hardwareConcurrency);
    }
    setViewport(`${window.innerWidth}x${window.innerHeight}px`);

    const handleResize = () => {
      setViewport(`${window.innerWidth}x${window.innerHeight}px`);
    };
    window.addEventListener('resize', handleResize);

    const updateOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);

    if (nav.connection) {
      const type = nav.connection.effectiveType?.toUpperCase() || '4G';
      const rtt = nav.connection.rtt ? `${nav.connection.rtt}ms` : '18ms';
      setNetworkType(`${type} (${rtt})`);
    }

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
        .catch(() => setBatteryInfo('AC Power'));
    } else {
      setBatteryInfo('AC Power');
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, []);

  // Throttled 1-Second Session Timer
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

  useEffect(() => {
    const initialLines = [
      { id: '1', type: 'cmd' as const, text: '$ desktop-diag --init-scan' },
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
      { id: newId + '-cmd', type: 'cmd', text: '$ desktop-diag --refresh' },
      {
        id: newId + '-res',
        type: 'success',
        text: `✔ Client Diag Updated: Uptime ${formatUptime(sessionSeconds)} | ${viewport} | Latency: < 24ms`,
      },
    ]);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto perspective-1000 py-2 transform-gpu"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-2xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-cyan-500/20 backdrop-blur-2xl shadow-[0_20px_50px_-15px_rgba(6,182,212,0.25)] border border-white/10"
      >
        <Server3DCanvas />

        {/* Floating Status Badges */}
        <div
          className="absolute -top-4 -left-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/90 border border-emerald-500/40 backdrop-blur-md shadow-lg text-xs font-mono text-emerald-300"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-medium flex items-center gap-1">
            <Monitor className="w-3.5 h-3.5 text-emerald-400" />
            Device: {deviceType} ({osName})
          </span>
        </div>

        <div
          className="absolute -top-4 -right-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/90 border border-cyan-500/40 backdrop-blur-md shadow-lg text-xs font-mono text-cyan-300"
          style={{ transform: 'translateZ(35px)' }}
        >
          <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-medium">Network: {isOnline ? 'Online' : 'Offline'}</span>
        </div>

        <div
          className="absolute -bottom-4 -left-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/90 border border-purple-500/40 backdrop-blur-md shadow-lg text-xs font-mono text-purple-300"
          style={{ transform: 'translateZ(25px)' }}
        >
          <Clock className="w-3.5 h-3.5 text-purple-400 animate-spin [animation-duration:10s]" />
          <span className="font-medium">Uptime: {formatUptime(sessionSeconds)}</span>
        </div>

        {/* Terminal Window Frame */}
        <div className="relative z-20 rounded-xl bg-zinc-950/90 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-25 z-30" />

          {/* Window Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/90 border-b border-white/10 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-400/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-400/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 font-medium">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>client@guest-device:~ (Connected)</span>
            </div>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>

          {/* Terminal Console Output */}
          <div
            ref={terminalBodyRef}
            className="p-4 min-h-[220px] max-h-[270px] overflow-y-auto font-mono text-xs leading-relaxed space-y-1.5 text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-700"
          >
            <div className="text-zinc-500 text-[11px] pb-2 border-b border-zinc-800/60 mb-2 flex items-center justify-between">
              <span>Client Diag v2.4.0 (Web API Telemetry)</span>
              <span className="text-emerald-400 font-semibold">Fortinet Protected</span>
            </div>

            {terminalHistory.map((item) => (
              <div key={item.id}>
                {item.type === 'cmd' && (
                  <div className="text-cyan-400 font-medium flex items-center gap-1.5">
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

            <div className="text-cyan-400 font-medium flex items-center gap-1.5 pt-1">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span className="text-zinc-300">
                $ uptime: <span className="text-purple-300 font-semibold">{formatUptime(sessionSeconds)}</span> | power: <span className="text-emerald-300">{batteryInfo}</span>
              </span>
              <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
          </div>

          {/* Footer Specs */}
          <div className="px-3.5 py-2 bg-zinc-900/80 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-2 text-zinc-400">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>{cpuCores} Cores</span>
              <span className="text-zinc-600">|</span>
              <HardDrive className="w-3 h-3 text-purple-400" />
              <span>{viewport}</span>
            </div>
            <button
              onClick={handleRunDiagnostic}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
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

export default DesktopTerminal3D;
