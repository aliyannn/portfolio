'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[WebGL ErrorBoundary Caught]:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-950/60 border border-red-500/20 text-center backdrop-blur-xl">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">
            {this.props.fallbackTitle || '3D WebGL Scene Unavailable'}
          </h4>
          <p className="text-xs text-zinc-400 max-w-sm mb-4">
            WebGL hardware acceleration may be disabled or unsupported in this browser session.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry 3D Scene</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;
