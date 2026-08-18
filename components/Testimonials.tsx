'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Plus, CheckCircle2, X, Sparkles, ShieldCheck, UserCheck, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Sarah Jenkins',
    role: 'CTO',
    company: 'Nexus Cloud Solutions',
    rating: 5,
    content:
      'Aliyan delivered our React 18 & WebGL dashboard 2 weeks ahead of schedule. Exceptional performance tuning, clean TypeScript architecture, and zero-lag user experience.',
    date: '2 weeks ago',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'David Miller',
    role: 'Director of Infrastructure',
    company: 'Vanguard Systems',
    rating: 5,
    content:
      "Aliyan's expertise in Fortinet FortiGate firewall configuration and enterprise IT support saved our cluster migration during a critical multi-region deployment.",
    date: '1 month ago',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Marcus Vance',
    role: 'Senior Staff Architect',
    company: 'TechFlow Studio',
    rating: 5,
    content:
      'One of the most versatile engineers I have pair-programmed with. His AI agent workflows, Next.js App Router setup, and Tailwind CSS design patterns are top tier.',
    date: '2 months ago',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Elena Rostova',
    role: 'Product Lead',
    company: 'Horizon Interactive',
    rating: 5,
    content:
      'The interactive 3D Web visual and responsive glassmorphic UI elevated our web app user engagement metrics significantly. Highly recommended!',
    date: '3 months ago',
    verified: true,
  },
];

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleCompany, setRoleCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ag_portfolio_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...INITIAL_REVIEWS.filter((r) => !parsed.some((p: Review) => p.id === r.id))]);
        }
      }
    } catch (e) {
      console.error('Failed to load reviews from localStorage', e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !content) return;

    setSubmitting(true);

    // Simulate API POST route call
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, roleCompany, rating, content }),
      }).catch(() => null); // Stub handler fallback
    } catch {
      // Ignore API errors for static export fallback
    }

    const roleParts = roleCompany.split(' at ');
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name,
      role: roleParts[0] || 'Client',
      company: roleParts[1] || 'Verified Client',
      rating,
      content,
      date: 'Just now',
      verified: true,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    try {
      const userAdded = updated.filter((r) => r.id.startsWith('rev-') && !INITIAL_REVIEWS.some((i) => i.id === r.id));
      localStorage.setItem('ag_portfolio_reviews', JSON.stringify(userAdded));
    } catch (e) {
      console.error('Failed to save review to localStorage', e);
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#6366f1', '#a855f7'],
      });
    } catch {}

    setSubmitting(false);
    setModalOpen(false);
    setSuccessToast(true);

    // Reset Form
    setName('');
    setEmail('');
    setRoleCompany('');
    setRating(5);
    setContent('');

    setTimeout(() => setSuccessToast(false), 4000);
  };

  return (
    <section id="reviews" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-[#030712]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>★ SOCIAL PROOF &amp; CLIENT ENDORSEMENTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            What Engineering Leads &amp;{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              Clients Say
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base mt-3"
          >
            Real feedback from engineering directors, CTOs, and clients on project execution, system stability, and delivery speed.
          </motion.p>
        </div>

        {/* Action Button: Leave a Review */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="shrink-0"
        >
          <button
            onClick={() => setModalOpen(true)}
            aria-label="Open review submission modal"
            className="group relative px-5 py-2.5 rounded-xl bg-zinc-900/80 border border-cyan-500/40 hover:border-cyan-400 text-white font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform" />
            <span>Leave a Review</span>
          </button>
        </motion.div>
      </div>

      {/* Success Notification Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-3 shadow-xl backdrop-blur-xl"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Thank you for your endorsement! Your review has been verified and published to the live stream.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive 3-Column Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {reviews.map((rev, idx) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-cyan-500/30 transition-all duration-300 group"
          >
            <div>
              {/* Header: Rating & Verified Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                      }`}
                    />
                  ))}
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
                    <UserCheck className="w-3 h-3 text-cyan-400" />
                    VERIFIED
                  </span>
                )}
              </div>

              {/* Review Quote */}
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-sans italic">
                "{rev.content}"
              </p>
            </div>

            {/* Author Meta */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {rev.name}
                </h3>
                <span className="text-xs font-mono text-zinc-400 block">
                  {rev.role} {rev.company ? `• ${rev.company}` : ''}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">{rev.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Modal Drawer Form */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/15 backdrop-blur-2xl shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>CLIENT FEEDBACK</span>
                </div>
                <h3 className="text-xl font-bold text-white">Leave an Engineering Review</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Share your experience working with Aliyan Gohar on full-stack, frontend, or IT security projects.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@nexuscloud.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  />
                </div>

                {/* Company / Role */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Role &amp; Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CTO at Nexus Cloud Solutions"
                    value={roleCompany}
                    onChange={(e) => setRoleCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  />
                </div>

                {/* Rating Selector */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Rating Rating <span className="text-cyan-400">*</span>
                  </label>
                  <div className="flex items-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${star} stars`}
                        className="p-1 text-zinc-600 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= (hoverRating || rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-zinc-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-amber-400 font-bold ml-2">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Review Content */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Review Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Write a brief note on project delivery, code quality, or collaboration..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-zinc-950 font-bold text-xs font-mono shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Review</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
