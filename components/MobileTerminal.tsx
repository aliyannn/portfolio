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

export const MobileTerminal: React.FC = () => {
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const [deviceType, setDeviceType] = useState<'Desktop' | 'Tablet' | 'Mobile'>('Mobile');
  const [osName, setOsName] = useState<string>('Detecting...');
  const [cpuCores, setCpuCores] = useState<number>(4);
  const [viewport, setViewport] = useState<string>('390x844');
  const [batteryInfo, setBatteryInfo] = useState<string>('Detecting...');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [networkType, setNetworkType] = useState<string>('Fast (HTTP/2)');
  const [sessionSeconds, setSessionSeconds] = useState<number>(1);
  const [terminalHistory, setTerminalHistory] = useState<
    { id: string; type: 'cmd' | 'info' | 'success' | 'warn'; text: string }[]
  >([]);

  // Detect Client Telemetry via Web APIs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const nav = navigator as CustomNavigator;
    const ua = nav.userAgent || '';

    let device: 'Desktop' | 'Tablet' | 'Mobile' = 'Mobile';
    if (/iPad|tablet/i.test(ua) || (window.innerWidth >= 640 && window.innerWidth <= 1024 && 'ontouchstart' in window)) {
      device = 'Tablet';
    } else if (/Mobile|Android|iPhone|iPod/i.test(ua) || window.innerWidth < 640) {
      device = 'Mobile';
    }
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

  // Strict 1000ms Session Uptime Clock
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

  // Populate Initial Telemetry Logs
  useEffect(() => {
    const initialLines = [
      { id: '1', type: 'cmd' as const, text: '$ mobile-diag --init-scan' },
      { id: '2', type: 'info' as const, text: `[DEVICE] Node: ${deviceType} (${osName})` },
      { id: '3', type: 'info' as const, text: `[HARDWARE] CPU Cores: ${cpuCores} | Viewport: ${viewport}` },
      { id: '4', type: 'info' as const, text: `[POWER] Energy State: ${batteryInfo}` },
      { id: '5', type: 'success' as const, text: `[NETWORK] Status: ${isOnline ? 'Online (TLS 1.3)' : 'Offline'}` },
      { id: '6', type: 'success' as const, text: `[STATUS] 200 OK - Connected to Aliyan's Cluster` },
    ];
    setTerminalHistory(initialLines);
  }, [deviceType, osName, cpuCores, viewport, batteryInfo, isOnline]);

  const handleRunDiagnostic = () => {
    const newId = Math.random().toString();
    setTerminalHistory((prev) => [
      ...prev,
      { id: newId + '-cmd', type: 'cmd', text: '$ mobile-diag --refresh' },
      {
        id: newId + '-res',
        type: 'success',
        text: `✔ Diag Refreshed: Uptime ${formatUptime(sessionSeconds)} | ${viewport}`,
      },
    ]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto py-2 transform-gpu">
      {/* Container */}
      <div className="relative w-full rounded-2xl p-1 bg-gradient-to-b from-white/10 via-white/5 to-cyan-500/15 backdrop-blur-md border border-white/10 shadow-xl">
        {/* Subtle CSS Graphic Background Accent */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent flex items-center justify-center opacity-30">
          <Server className="w-20 h-20 text-cyan-400/20" />
        </div>

        {/* Status Badges */}
        <div className="flex items-center justify-between gap-2 mb-2 px-1 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/90 border border-emerald-500/40 text-emerald-300 shadow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="flex items-center gap-1 font-medium">
              {deviceType === 'Mobile' ? <Smartphone className="w-3 h-3 text-emerald-400" /> : <Laptop className="w-3 h-3 text-emerald-400" />}
              {deviceType} ({osName})
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/90 border border-purple-500/40 text-purple-300 shadow">
            <Clock className="w-3 h-3 text-purple-400" />
            <span className="font-medium">{formatUptime(sessionSeconds)}</span>
          </div>
        </div>

        {/* Main Terminal Window Body */}
        <div className="relative z-20 rounded-xl bg-zinc-950/95 border border-white/10 overflow-hidden shadow-xl">
          {/* Scanline CRT Texture */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 z-30" />

          {/* Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-zinc-900/90 border-b border-white/10 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 font-medium">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>mobile@guest:~ (Mobile Node)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              STABLE 60FPS
            </span>
          </div>

          {/* Console Text Area */}
          <div
            ref={terminalBodyRef}
            className="p-3.5 min-h-[200px] max-h-[240px] overflow-y-auto font-mono text-xs leading-relaxed space-y-1.5 text-zinc-300 scrollbar-thin"
          >
            <div className="text-zinc-500 text-[10px] pb-1.5 border-b border-zinc-800/60 mb-2 flex items-center justify-between">
              <span>Mobile Client Telemetry v2.4.0</span>
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
                $ uptime: <span className="text-purple-300 font-semibold">{formatUptime(sessionSeconds)}</span> | battery: <span className="text-emerald-300">{batteryInfo}</span>
              </span>
              <span className="w-1.5 h-3.5 bg-cyan-400 animate-pulse inline-block" />
            </div>
          </div>

          {/* Footer Stats Bar */}
          <div className="px-3 py-2 bg-zinc-900/90 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
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
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTerminal;
