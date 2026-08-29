'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
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
  Activity,
  ShieldCheck,
  Zap,
  Radio,
  Sparkles,
  Server,
  Maximize2,
} from 'lucide-react';

// ==========================================
// 1. Interactive Ambient Cyber-Particle Field
// ==========================================
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
}

const CyberParticleField: React.FC<{
  mousePos: { x: number; y: number; active: boolean };
}> = ({ mousePos }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette: Cyan, Indigo, Violet, Teal
    const colors = ['#06b6d4', '#818cf8', '#2dd4bf', '#a855f7', '#38bdf8'];
    const particleCount = Math.min(Math.floor((width * height) / 4800), 65);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius,
        baseRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let wavePhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- Subtle Organic Ambient Cyber Grid Waves ---
      wavePhase += 0.015;
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;

      // Horizontal flowing cyber sine curves
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        const yOffset = height * 0.3 + j * 50;
        for (let x = 0; x < width; x += 12) {
          const y =
            yOffset +
            Math.sin(x * 0.008 + wavePhase + j * 1.5) * 16 +
            Math.cos(x * 0.015 - wavePhase * 0.8) * 8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Second wave set (Indigo/Violet accent)
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.07)';
      for (let j = 0; j < 2; j++) {
        ctx.beginPath();
        const yOffset = height * 0.6 + j * 45;
        for (let x = 0; x < width; x += 12) {
          const y =
            yOffset +
            Math.cos(x * 0.009 - wavePhase * 1.2 + j) * 18 +
            Math.sin(x * 0.02 + wavePhase) * 6;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // --- Particle Constellation & Interactive Mouse Physics ---
      const maxConnectDistance = 95;
      const mouseInfluenceRadius = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal Drift
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off canvas boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse Interactive Gravity Pull & Displacement
        if (mousePos.active) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceRadius) {
            const force = (1 - dist / mouseInfluenceRadius) * 1.2;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
            p.radius = p.baseRadius * 1.6;
          } else {
            p.radius = p.baseRadius;
          }
        } else {
          p.radius = p.baseRadius;
        }

        // Draw Particle Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connecting Constellation Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < maxConnectDistance) {
            const lineAlpha = (1 - dist / maxConnectDistance) * 0.22;
            const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            grad.addColorStop(0, p.color);
            grad.addColorStop(1, p2.color);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = grad;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-75"
    />
  );
};

// ==========================================
// 2. Client Device & Hardware Diagnostics Parser
// ==========================================
export interface DeviceInfoResult {
  deviceType: 'Desktop' | 'Tablet' | 'Mobile';
  exactModel: string;
  osName: string;
  gpuName: string;
  screenSpecs: string;
}

export function getDeviceInfo(): DeviceInfoResult {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'Desktop',
      exactModel: 'Developer Node',
      osName: 'Unknown OS',
      gpuName: 'WebGL Graphics',
      screenSpecs: '1920x1080',
    };
  }

  const ua = navigator.userAgent || '';
  const width = window.screen.width;
  const height = window.screen.height;
  const dpr = window.devicePixelRatio || 1;

  const resW = Math.round(Math.min(width, height) * dpr);
  const resH = Math.round(Math.max(width, height) * dpr);

  let deviceType: 'Desktop' | 'Tablet' | 'Mobile' = 'Desktop';
  let exactModel = 'Custom PC';
  let osName = 'Windows';

  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) {
    if (/iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      deviceType = 'Tablet';
      osName = 'iPadOS';
      exactModel = 'Apple iPad';
    } else {
      deviceType = 'Mobile';
      osName = 'iOS 17';
      if (resW === 1179 && resH === 2556) exactModel = 'Apple iPhone 15 Pro / 16';
      else if (resW === 1290 && resH === 2796) exactModel = 'Apple iPhone 15 Pro Max / 16 Plus';
      else if (resW === 1170 && resH === 2532) exactModel = 'Apple iPhone 14 / 13 / 12 Pro';
      else if (resW === 1284 && resH === 2778) exactModel = 'Apple iPhone 14 Plus / 13 Pro Max';
      else if (resW === 1125 && resH === 2436) exactModel = 'Apple iPhone X / XS / 11 Pro';
      else if (resW === 828 && resH === 1792) exactModel = 'Apple iPhone 11 / XR';
      else if (resW === 1080 && resH === 2340) exactModel = 'Apple iPhone 13 mini / 12 mini';
      else exactModel = 'Apple iPhone';
    }
  } else if (/Android/i.test(ua)) {
    deviceType = /Mobile/i.test(ua) ? 'Mobile' : 'Tablet';
    osName = 'Android 14';

    if (/SM-S928/i.test(ua)) exactModel = 'Samsung Galaxy S24 Ultra';
    else if (/SM-S918/i.test(ua)) exactModel = 'Samsung Galaxy S23 Ultra';
    else if (/SM-S908/i.test(ua)) exactModel = 'Samsung Galaxy S22 Ultra';
    else if (/SM-F946/i.test(ua)) exactModel = 'Samsung Galaxy Z Fold 5';
    else if (/SM-F731/i.test(ua)) exactModel = 'Samsung Galaxy Z Flip 5';
    else if (/Pixel 8 Pro/i.test(ua)) exactModel = 'Google Pixel 8 Pro';
    else if (/Pixel 8/i.test(ua)) exactModel = 'Google Pixel 8';
    else if (/Pixel 7/i.test(ua)) exactModel = 'Google Pixel 7 Pro';
    else if (/Xiaomi/i.test(ua)) exactModel = 'Xiaomi Flagship';
    else if (/OnePlus/i.test(ua)) exactModel = 'OnePlus Flagship';
    else {
      const match = ua.match(/;\s*([^;]+)\s+Build\//);
      exactModel = match ? match[1] : 'Android Device';
    }
  } else {
    deviceType = 'Desktop';
    if (/Win/i.test(ua)) {
      osName = 'Windows 11';
      exactModel = 'Custom PC / Workstation';
    } else if (/Mac/i.test(ua)) {
      osName = 'macOS Sonoma';
      exactModel = 'MacBook Pro / Mac';
    } else if (/Linux/i.test(ua)) {
      osName = 'Linux';
      exactModel = 'Linux Workstation';
    }
  }

  let gpuName = 'High-Performance WebGL';
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
          } else if (/Mali/i.test(unmasked)) {
            gpuName = 'ARM Mali GPU';
          } else {
            gpuName = unmasked.replace(/ANGLE \((.*)\)/, '$1').slice(0, 26);
          }
        }
      }
    }
  } catch (e) {
    // fallback
  }

  return {
    deviceType,
    exactModel,
    osName,
    gpuName,
    screenSpecs: `${window.innerWidth}x${window.innerHeight}px`,
  };
}

// ==========================================
// 3. Main Live Telemetry Terminal Component
// ==========================================
interface TerminalLine {
  id: string;
  type: 'cmd' | 'info' | 'success' | 'warn' | 'accent';
  prefix?: string;
  text: string;
  delayMs?: number;
}

export const Terminal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D card tilt & dynamic spotlight border
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for 3D perspective tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
    setMousePos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  // Hardware Telemetry State
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoResult>({
    deviceType: 'Desktop',
    exactModel: 'Detecting Device...',
    osName: 'Detecting OS...',
    gpuName: 'WebGL Graphics Core',
    screenSpecs: '1920x1080px',
  });

  const [cpuCores, setCpuCores] = useState<number>(8);
  const [batteryInfo, setBatteryInfo] = useState<string>('Detecting...');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [sessionSeconds, setSessionSeconds] = useState<number>(1);

  // Dynamic Real-Time Network Packet Telemetry & Realistic Ping Jitter
  const [rxSpeed, setRxSpeed] = useState<string>('1.4 MB/s');
  const [txSpeed, setTxSpeed] = useState<string>('840 KB/s');
  const [pingMs, setPingMs] = useState<number>(28);
  const [packetTick, setPacketTick] = useState<boolean>(false);

  // Sequential Live Animated Typing & Output Stream
  const [typedCommand, setTypedCommand] = useState<string>('');
  const [isTypingCommand, setIsTypingCommand] = useState<boolean>(true);
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [activeTab, setActiveTab] = useState<'TELEMETRY' | 'SECURITY' | 'NETWORK'>('TELEMETRY');
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState<boolean>(false);

  // Detect Hardware & Web APIs on Mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const info = getDeviceInfo();
    setDeviceInfo(info);

    const nav = navigator as any;
    if (nav.hardwareConcurrency) {
      setCpuCores(nav.hardwareConcurrency);
    }

    const handleResize = () => {
      setDeviceInfo((prev) => ({
        ...prev,
        screenSpecs: `${window.innerWidth}x${window.innerHeight}px`,
      }));
    };
    window.addEventListener('resize', handleResize);

    const updateOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);

    if (nav.getBattery) {
      nav
        .getBattery()
        .then((battery: any) => {
          const updateBattery = () => {
            const levelPct = Math.round(battery.level * 100);
            const status = battery.charging ? 'Charging' : 'Discharging';
            setBatteryInfo(`${levelPct}% (${status})`);
          };
          updateBattery();
          battery.addEventListener('levelchange', updateBattery);
          battery.addEventListener('chargingchange', updateBattery);
        })
        .catch(() => setBatteryInfo('AC Power (100%)'));
    } else {
      setBatteryInfo('AC Power (100%)');
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, []);

  // Session Uptime Clock
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

  // Real-Time Dynamic Packet Counter & Realistic Ping Jitter (24ms — 38ms)
  useEffect(() => {
    const packetInterval = setInterval(() => {
      setPacketTick((prev) => !prev);

      // Realistic RX/TX network fluctuations
      const rxVal = (1.2 + Math.random() * 0.7).toFixed(1);
      const txVal = Math.floor(720 + Math.random() * 260);
      setRxSpeed(`${rxVal} MB/s`);
      setTxSpeed(`${txVal} KB/s`);

      // Ping fluctuation between 24ms and 38ms
      const randomPing = Math.floor(24 + Math.random() * 15);
      setPingMs(randomPing);
    }, 1200);

    return () => clearInterval(packetInterval);
  }, []);

  // Full Telemetry Stream Data
  const targetLines: TerminalLine[] = useMemo(
    () => [
      {
        id: 'line-device',
        type: 'info',
        prefix: '[DEVICE]',
        text: `Visitor Node: ${deviceInfo.exactModel} (${deviceInfo.osName})`,
      },
      {
        id: 'line-hardware',
        type: 'info',
        prefix: '[HARDWARE]',
        text: `CPU: ${cpuCores} Cores | GPU: ${deviceInfo.gpuName}`,
      },
      {
        id: 'line-power',
        type: 'info',
        prefix: '[POWER]',
        text: `Energy: ${batteryInfo} | Viewport: ${deviceInfo.screenSpecs}`,
      },
      {
        id: 'line-network',
        type: 'success',
        prefix: '[NETWORK]',
        text: `Status: ${isOnline ? 'Online (TLS 1.3 Active)' : 'Offline'} | Latency: ${pingMs}ms`,
      },
      {
        id: 'line-security',
        type: 'success',
        prefix: '[SECURITY]',
        text: `FortiGate 40F UTM Shield: Inspection Mode Active (Zero Threats)`,
      },
      {
        id: 'line-status',
        type: 'accent',
        prefix: '[STATUS]',
        text: `200 OK — Secure Gateway Linked to Aliyan's Engineering Cluster`,
      },
    ],
    [deviceInfo, cpuCores, batteryInfo, isOnline, pingMs]
  );

  // Animated Typing Effect for the First Command (`$ system-diag --init-scan`)
  const runInitialScan = useCallback(() => {
    const fullCommand = '$ system-diag --init-scan';
    setTypedCommand('');
    setIsTypingCommand(true);
    setVisibleLines([]);
    setIsDiagnosticRunning(true);

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingCommand(false);

        // Sequentially stream terminal output lines with staggered reveal
        targetLines.forEach((line, index) => {
          setTimeout(() => {
            setVisibleLines((prev) => {
              if (prev.some((p) => p.id === line.id)) return prev;
              return [...prev, line];
            });

            if (index === targetLines.length - 1) {
              setIsDiagnosticRunning(false);
            }

            // Auto-scroll terminal body to bottom
            if (terminalBodyRef.current) {
              terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
            }
          }, 240 * (index + 1));
        });
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [targetLines]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runInitialScan();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Quick Action Diagnostics Trigger
  const handleQuickCommand = (cmd: string) => {
    const newId = Math.random().toString();
    let responseText = '';
    let resType: 'cmd' | 'info' | 'success' | 'warn' = 'success';

    if (cmd === 'audit') {
      responseText = `✔ Security Audit Passed: All microservices healthy (TLS 1.3 / OWASP Top 10 Guarded)`;
    } else if (cmd === 'network') {
      responseText = `⚡ Real-Time Pipeline: RX: ${rxSpeed} ⇄ TX: ${txSpeed} | Jitter: ±1.2ms | Ping: ${pingMs}ms`;
    } else if (cmd === 'speedtest') {
      responseText = `🚀 WebGL Frame Rate: 60 FPS | DOM Mutation Latency: 1.4ms | Core Web Vitals: 100/100`;
    } else if (cmd === 'clear') {
      setVisibleLines([]);
      setTypedCommand('$ system-diag --ready');
      return;
    }

    setVisibleLines((prev) => [
      ...prev,
      { id: `${newId}-cmd`, type: 'cmd', text: `$ diag --${cmd}` },
      { id: `${newId}-res`, type: resType, prefix: '[RESULT]', text: responseText },
    ]);

    setTimeout(() => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    }, 50);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto perspective-1000 py-4 transform-gpu select-none"
    >
      {/* 🌟 1. Interactive Ambient Cyber-Particle Field & Wave Backdrop */}
      <CyberParticleField mousePos={mousePos} />

      {/* Ambient Pulsing Glow Orbs Behind Card */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      {/* ⚡ 4. 3D Hover Tilt Framer Motion Perspective Card */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-2xl p-[1.5px] transition-transform duration-200 ease-out hover:scale-[1.018]"
      >
        {/* Dynamic Border Spotlight Gradient that tracks mouse coordinates */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: mousePos.active
              ? `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6,182,212,0.45), rgba(129,140,248,0.2) 35%, rgba(255,255,255,0.06) 70%, transparent 100%)`
              : 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(6,182,212,0.18), rgba(99,102,241,0.15))',
          }}
        />

        {/* Outer Glass Card Container */}
        <div className="relative rounded-2xl bg-zinc-950/85 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(6,182,212,0.25)] overflow-hidden">
          
          {/* ⚡ 1. Animated Scanning Beam (Radar Shimmer Effect) */}
          <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-2xl">
            {/* Travelling Neon Scan Beam */}
            <div className="w-full h-24 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent blur-sm animate-[scan_4.5s_ease-in-out_infinite]" />
            {/* Fine CRT Scanline Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-25" />
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Top Telemetry Floating Status Bar (3D Pop Depth) */}
          {/* ------------------------------------------------------------- */}
          <div
            className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-zinc-900/90 border-b border-white/10 text-xs font-mono select-none relative z-40"
            style={{ transform: 'translateZ(20px)' }}
          >
            {/* Window Controls & Session Title */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/90 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              </div>
              <div className="flex items-center gap-1.5 ml-2 text-zinc-300 font-semibold tracking-wide text-[11px]">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>node://client-telemetry.sh</span>
              </div>
            </div>

            {/* ⚡ 2. Dynamic Real-Time Network Packet Counter & Live Ping Jitter */}
            <div className="flex items-center gap-3 text-[11px]">
              {/* RX/TX Packet Counter */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950/80 border border-white/10 text-zinc-300">
                <Radio className={`w-3 h-3 text-cyan-400 ${packetTick ? 'scale-110' : 'scale-95'} transition-transform duration-300`} />
                <span className="text-zinc-400">RX/TX:</span>
                <span className="text-cyan-300 font-bold">{rxSpeed}</span>
                <span className="text-zinc-500">⇄</span>
                <span className="text-emerald-300 font-bold">{txSpeed}</span>
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    packetTick ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-cyan-400 shadow-[0_0_6px_#38bdf8]'
                  } transition-colors duration-300 ml-0.5`}
                />
              </div>

              {/* Dynamic Live Ping Indicator */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/50 border border-emerald-500/30 text-emerald-300">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>{pingMs}ms</span>
              </div>

              {/* Manual Refresh Diag Button */}
              <button
                onClick={runInitialScan}
                disabled={isDiagnosticRunning}
                aria-label="Refresh telemetry diagnostics"
                className="p-1 rounded-md bg-zinc-800/80 hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-all duration-200 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isDiagnosticRunning ? 'animate-spin text-cyan-400' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Sub-Header Node Telemetry Meta Bar */}
          {/* ------------------------------------------------------------- */}
          <div className="px-4 py-2 bg-zinc-950/90 border-b border-zinc-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-zinc-300">
                {deviceInfo.deviceType === 'Mobile' ? (
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                )}
                <span className="font-medium text-white">{deviceInfo.exactModel}</span>
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">{deviceInfo.osName}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-purple-300">
                <Clock className="w-3 h-3 text-purple-400" />
                <span>Uptime: {formatUptime(sessionSeconds)}</span>
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[10px]">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                FORTIGATE 40F
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* ⚡ 3. Live Animated Typing Console Stream */}
          {/* ------------------------------------------------------------- */}
          <div
            ref={terminalBodyRef}
            className="p-4 sm:p-5 h-[230px] sm:h-[260px] overflow-y-auto font-mono text-xs leading-relaxed space-y-2 bg-zinc-950/90 text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
          >
            {/* Top diagnostic header */}
            <div className="text-zinc-500 text-[11px] pb-2 border-b border-zinc-800/60 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Client Diag Core v3.2.0 • Fortinet Fabric Telemetry</span>
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE CONNECTED
              </span>
            </div>

            {/* Typing Command Line Prompt */}
            <div className="text-cyan-400 font-bold flex items-center gap-2">
              <span className="text-emerald-400 font-extrabold">&gt;</span>
              <span className="text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                {typedCommand}
              </span>
              {isTypingCommand && (
                <span className="w-2.5 h-4 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.9)] animate-pulse rounded-sm inline-block" />
              )}
            </div>

            {/* Staggered Output Stream */}
            <AnimatePresence mode="popLayout">
              {visibleLines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -8, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex items-start gap-2 font-mono text-[11.5px] sm:text-xs"
                >
                  {line.type === 'cmd' && (
                    <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                      <span className="text-emerald-400">&gt;</span>
                      <span>{line.text}</span>
                    </div>
                  )}

                  {line.type === 'info' && (
                    <div className="text-zinc-300 pl-3 border-l-2 border-zinc-700/80 my-0.5 flex items-center gap-1.5">
                      {line.prefix && (
                        <span className="text-cyan-400 font-semibold">{line.prefix}</span>
                      )}
                      <span>{line.text}</span>
                    </div>
                  )}

                  {line.type === 'success' && (
                    <div className="text-emerald-300 pl-3 border-l-2 border-emerald-500/60 my-0.5 flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      {line.prefix && (
                        <span className="text-emerald-400 font-semibold">{line.prefix}</span>
                      )}
                      <span>{line.text}</span>
                    </div>
                  )}

                  {line.type === 'accent' && (
                    <div className="text-purple-300 pl-3 border-l-2 border-purple-500/60 my-0.5 flex items-center gap-2 font-medium bg-purple-950/20 py-1 rounded-r-md">
                      <Zap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      {line.prefix && (
                        <span className="text-purple-400 font-semibold">{line.prefix}</span>
                      )}
                      <span className="text-zinc-200">{line.text}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Terminal Live Prompt Cursor when idle */}
            {!isTypingCommand && visibleLines.length > 0 && (
              <div className="flex items-center gap-2 text-cyan-400 pt-1">
                <span className="text-emerald-400 font-extrabold">&gt;</span>
                <span className="text-zinc-400 text-xs">$</span>
                <span className="w-2.5 h-4 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse rounded-sm inline-block" />
              </div>
            )}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Interactive Diagnostic Quick-Pills & Hardware Specs Footer */}
          {/* ------------------------------------------------------------- */}
          <div className="px-4 py-2.5 bg-zinc-900/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-[11px] font-mono select-none">
            {/* Quick Action Diagnostic Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-zinc-500 text-[10px] uppercase font-bold mr-1">Diag:</span>
              <button
                onClick={() => handleQuickCommand('audit')}
                className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-emerald-500/20 text-zinc-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/40 transition-all"
              >
                --audit
              </button>
              <button
                onClick={() => handleQuickCommand('network')}
                className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-cyan-500/20 text-zinc-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-all"
              >
                --network
              </button>
              <button
                onClick={() => handleQuickCommand('speedtest')}
                className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-purple-500/20 text-zinc-300 hover:text-purple-300 border border-white/10 hover:border-purple-500/40 transition-all"
              >
                --speed
              </button>
              <button
                onClick={() => handleQuickCommand('clear')}
                className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-white/10 transition-all"
              >
                clear
              </button>
            </div>

            {/* Hardware Chips */}
            <div className="flex items-center gap-2 text-zinc-400 text-[10.5px]">
              <span className="flex items-center gap-1 text-cyan-300">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>{cpuCores} Cores</span>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1 text-purple-300">
                <HardDrive className="w-3 h-3 text-purple-400" />
                <span>{deviceInfo.screenSpecs}</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Terminal;
