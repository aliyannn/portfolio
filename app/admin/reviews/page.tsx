'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
  isApproved?: boolean;
  isVisible?: boolean;
}

const DEFAULT_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || 'admin123';

export default function AdminReviewsPage() {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string>('');

  // Check auth session on mount
  useEffect(() => {
    const session = sessionStorage.getItem('ag_admin_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
      fetchReviews();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ag_admin_auth', 'true');
      setAuthError('');
      fetchReviews();
    } else {
      setAuthError('Invalid Admin Passphrase. Access Denied.');
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Fetch from API
      const res = await fetch('/api/reviews?admin=true');
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch {
      // LocalStorage fallback
      const saved = localStorage.getItem('ag_portfolio_reviews');
      if (saved) setReviews(JSON.parse(saved));
    }
    setLoading(false);
  };

  // Toggle Visibility
  const toggleVisibility = async (id: string, currentVal: boolean) => {
    const newVal = !currentVal;
    
    // Update state locally
    const updated = reviews.map((r) => (r.id === id ? { ...r, isVisible: newVal } : r));
    setReviews(updated);
    saveLocal(updated);

    try {
      await fetch('/api/reviews', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pinInput || DEFAULT_PIN,
        },
        body: JSON.stringify({ id, isVisible: newVal }),
      });
    } catch {}

    triggerSuccess(`Review visibility updated to ${newVal ? 'Visible' : 'Hidden'}`);
  };

  // Delete Review
  const deleteReview = async (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    saveLocal(updated);
    setDeleteConfirmId(null);

    try {
      await fetch(`/api/reviews?id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-pin': pinInput || DEFAULT_PIN,
        },
      });
    } catch {}

    triggerSuccess('Review deleted permanently.');
  };

  const saveLocal = (items: ReviewItem[]) => {
    try {
      localStorage.setItem('ag_portfolio_reviews', JSON.stringify(items));
    } catch {}
  };

  const triggerSuccess = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 3500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ag_admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl backdrop-blur-2xl text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">Admin Moderation Auth</h1>
          <p className="text-xs text-zinc-400 mb-6 font-mono">
            Enter your secret passphrase to access the Testimonials command center.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter Admin PIN..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-sm text-center focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 font-mono flex items-center justify-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" /> {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-zinc-950 font-bold text-xs font-mono shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-zinc-950" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5">
            <Link
              href="/"
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Admin Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h1 className="text-xl font-bold text-white">Testimonials Moderation Panel</h1>
              </div>
              <p className="text-xs font-mono text-zinc-400">
                Manage live review visibility, delete spam, and moderate endorsements.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchReviews}
              className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-mono hover:bg-rose-900/60 transition-colors"
            >
              Lock Session
            </button>
          </div>
        </div>

        {/* Action Alert Notification */}
        <AnimatePresence>
          {actionSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{actionSuccess}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Total Reviews</span>
            <span className="text-xl font-bold font-mono text-white">{reviews.length}</span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400">Visible on Marquee</span>
            <span className="text-xl font-bold font-mono text-emerald-400">
              {reviews.filter((r) => r.isVisible !== false).length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-amber-400">Hidden / Moderated</span>
            <span className="text-xl font-bold font-mono text-amber-400">
              {reviews.filter((r) => r.isVisible === false).length}
            </span>
          </div>
        </div>

        {/* Reviews Moderation Table / Cards List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Active Review Stream
          </h2>

          {reviews.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-zinc-900/30 border border-white/10 text-zinc-500 font-mono text-sm">
              No reviews found in repository.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {reviews.map((rev) => {
                const isVis = rev.isVisible !== false;
                return (
                  <div
                    key={rev.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl ${
                      isVis
                        ? 'bg-zinc-900/40 border-white/10 hover:border-white/20'
                        : 'bg-zinc-950/80 border-amber-500/30 opacity-75'
                    }`}
                  >
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{rev.name}</span>
                        <span className="text-xs font-mono text-zinc-400">
                          {rev.role} {rev.company ? `• ${rev.company}` : ''}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isVis
                              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                              : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                          }`}
                        >
                          {isVis ? 'VISIBLE' : 'HIDDEN'}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 italic font-sans">"{rev.content}"</p>
                      <span className="text-[10px] font-mono text-zinc-500 block">{rev.date}</span>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                      {/* Visibility Toggle Button */}
                      <button
                        onClick={() => toggleVisibility(rev.id, isVis)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-all ${
                          isVis
                            ? 'bg-zinc-800/80 text-zinc-300 border-white/10 hover:bg-zinc-800'
                            : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {isVis ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-amber-400" /> Hide
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-400" /> Show Live
                          </>
                        )}
                      </button>

                      {/* Delete Button */}
                      {deleteConfirmId === rev.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => deleteReview(rev.id)}
                            className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-mono text-xs font-bold hover:bg-rose-500 shadow-lg shadow-rose-600/30"
                          >
                            Confirm Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-mono"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(rev.id)}
                          className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-400 hover:bg-rose-900/60 transition-colors"
                          title="Delete review permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
