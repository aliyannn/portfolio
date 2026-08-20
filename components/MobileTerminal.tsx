'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Server,
  ShieldCheck,
} from 'lucide-react';

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

export interface DeviceInfoResult {
  deviceType: 'Desktop' | 'Tablet' | 'Mobile';
  exactModel: string;
  osName: string;
  gpuName: string;
  screenSpecs: string;
}

// Client-Side Enhanced Device & Hardware Parser
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

  // 1. iOS / iPhone Specs Matcher
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

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
  }
  // 2. Android Device Matcher
  else if (/Android/i.test(ua)) {
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
  }
  // 3. Desktop / Laptop Matcher
  else {
    deviceType = 'Desktop';
    if (/Win/i.test(ua)) {
      osName = 'Windows 11';
      exactModel = 'Custom PC / Laptop';
    } else if (/Mac/i.test(ua)) {
      osName = 'macOS Sonoma';
      exactModel = 'MacBook Pro / Mac';
    } else if (/Linux/i.test(ua)) {
      osName = 'Linux';
      exactModel = 'Linux Workstation';
    }
  }

  // 4. WebGL GPU Extraction
  let gpuName = 'High-Performance WebGL';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const unmasked = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
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
    // Fallback
  }

  return {
    deviceType,
    exactModel,
    osName,
    gpuName,
    screenSpecs: `${window.innerWidth}x${window.innerHeight}px`,
  };
}

export const MobileTerminal: React.FC = () => {
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoResult>({
    deviceType: 'Mobile',
    exactModel: 'Detecting Device...',
    osName: 'Detecting OS...',
    gpuName: 'WebGL Graphics',
    screenSpecs: '390x844px',
  });

  const [cpuCores, setCpuCores] = useState<number>(8);
  const [batteryInfo, setBatteryInfo] = useState<string>('Detecting...');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [sessionSeconds, setSessionSeconds] = useState<number>(1);
  const [terminalHistory, setTerminalHistory] = useState<
    { id: string; type: 'cmd' | 'info' | 'success' | 'warn'; text: string }[]
  >([]);

  // Detect Client Telemetry on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const info = getDeviceInfo();
    setDeviceInfo(info);

    const nav = navigator as CustomNavigator;
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

  // Populate Telemetry Terminal History
  useEffect(() => {
    const initialLines = [
      { id: '1', type: 'cmd' as const, text: '$ system-diag --client-node' },
      {
        id: '2',
        type: 'info' as const,
        text: `[DEVICE] Visitor Node: ${deviceInfo.exactModel} (${deviceInfo.osName})`,
      },
      {
        id: '3',
        type: 'info' as const,
        text: `[HARDWARE] CPU: ${cpuCores} Cores | GPU: ${deviceInfo.gpuName}`,
      },
      { id: '4', type: 'info' as const, text: `[POWER] Energy State: ${batteryInfo} | Viewport: ${deviceInfo.screenSpecs}` },
      { id: '5', type: 'success' as const, text: `[NETWORK] Status: ${isOnline ? 'Online (TLS 1.3)' : 'Offline'}` },
      { id: '6', type: 'success' as const, text: `[STATUS] 200 OK - Connected to Aliyan's Cluster` },
    ];
    setTerminalHistory(initialLines);
  }, [deviceInfo, cpuCores, batteryInfo, isOnline]);

  const handleRunDiagnostic = () => {
    const newId = Math.random().toString();
    setTerminalHistory((prev) => [
      ...prev,
      { id: newId + '-cmd', type: 'cmd', text: '$ system-diag --refresh' },
      {
        id: newId + '-res',
        type: 'success',
        text: `✔ Node Active: ${deviceInfo.exactModel} | Uptime ${formatUptime(sessionSeconds)}`,
      },
    ]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto py-2 transform-gpu">
      {/* Outer Glow Container */}
      <div className="relative w-full rounded-2xl p-1 bg-gradient-to-b from-white/10 via-white/5 to-cyan-500/15 backdrop-blur-md border border-white/10 shadow-xl">
        {/* Ambient CSS Graphic Accent */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent flex items-center justify-center opacity-30">
          <Server className="w-20 h-20 text-cyan-400/20" />
        </div>

        {/* Status Pills */}
        <div className="flex items-center justify-between gap-2 mb-2 px-1 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/90 border border-emerald-500/40 text-emerald-300 shadow overflow-hidden max-w-[70%]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-medium truncate flex items-center gap-1">
              {deviceInfo.deviceType === 'Mobile' ? (
                <Smartphone className="w-3 h-3 text-emerald-400 shrink-0" />
              ) : (
                <Laptop className="w-3 h-3 text-emerald-400 shrink-0" />
              )}
              {deviceInfo.exactModel} ({deviceInfo.osName})
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/90 border border-purple-500/40 text-purple-300 shadow shrink-0">
            <Clock className="w-3 h-3 text-purple-400" />
            <span className="font-medium">{formatUptime(sessionSeconds)}</span>
          </div>
        </div>

        {/* Main Terminal Body */}
        <div className="relative z-20 rounded-xl bg-zinc-950/95 border border-white/10 overflow-hidden shadow-xl">
          {/* CRT Scanline Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 z-30" />

          {/* Window Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-zinc-900/90 border-b border-white/10 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] font-mono text-zinc-400 ml-1.5 flex items-center gap-1">
                <TerminalIcon className="w-3 h-3 text-cyan-400" /> visitor-telemetry.sh
              </span>
            </div>

            <button
              onClick={handleRunDiagnostic}
              aria-label="Refresh telemetry"
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {/* Terminal Console Output */}
          <div
            ref={terminalBodyRef}
            className="p-3.5 h-[210px] overflow-y-auto font-mono text-xs space-y-1.5 bg-zinc-950/90 text-zinc-300"
          >
            {terminalHistory.map((line) => (
              <div key={line.id} className="leading-relaxed">
                {line.type === 'cmd' && <span className="text-cyan-400 font-bold">{line.text}</span>}
                {line.type === 'info' && <span className="text-zinc-300">{line.text}</span>}
                {line.type === 'success' && <span className="text-emerald-400">{line.text}</span>}
                {line.type === 'warn' && <span className="text-amber-400">{line.text}</span>}
              </div>
            ))}

            <div className="flex items-center gap-1 text-cyan-400 pt-1">
              <span>$</span>
              <span className="w-2 h-4 bg-cyan-400 animate-pulse rounded-sm" />
            </div>
          </div>

          {/* Footer Status Bar */}
          <div className="px-3.5 py-1.5 bg-zinc-900/80 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Node Verified
            </span>
            <span className="text-zinc-500 truncate max-w-[160px]">{deviceInfo.gpuName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTerminal;
