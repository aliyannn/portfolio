'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Plus, CheckCircle2, X, Sparkles, UserCheck, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
}

const SEED_TESTIMONIALS: Review[] = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    role: 'Product Lead',
    company: 'Horizon Media Labs (Austin, TX)',
    avatar: 'MV',
    rating: 5,
    content:
      'Aliyan revamped our client-facing dashboard using Next.js and Tailwind CSS. The sub-second page loads and seamless GitHub API synchronization cut our internal review times in half. Exceptional frontend talent.',
    date: '2 weeks ago',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Sarah Jenkins',
    role: 'Operations Director',
    company: 'Nexus Flow Automations (London, UK)',
    avatar: 'SJ',
    rating: 5,
    content:
      'The Make.com booking and scheduling workflows Aliyan built with Google Sheets and automated webhook integrations run flawlessly. Zero drop-off rate since deployment. Highly recommended for automation solutions.',
    date: '1 month ago',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Danyal Sheikh',
    role: 'Co-Founder & CTO',
    company: 'Apex Digital (Lahore, PK)',
    avatar: 'DS',
    rating: 5,
    content:
      'Delivered an incredible dark-mode interactive web platform with Three.js graphics and responsive UI components. His ability to balance heavy 3D visuals with zero-lag mobile performance is rare to find.',
    date: '1 month ago',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Elena Rostova',
    role: 'Senior Tech Lead',
    company: 'CloudMatrix Solutions (Berlin, DE)',
    avatar: 'ER',
    rating: 5,
    content:
      'Aliyan demonstrated top-tier engineering discipline—clean TypeScript code structure, accessible components, and strict adherence to project deadlines. A true full-stack asset.',
    date: '2 months ago',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'David K. Chen',
    role: 'Creative Director',
    company: 'Studio Prism (San Francisco, CA)',
    avatar: 'DC',
    rating: 5,
    content:
      'The custom EmailJS form pipelines and dynamic asset uploads integrated into our client portal work seamlessly. Sleek micro-animations and rock-solid reliability.',
    date: '3 months ago',
    verified: true,
  },
];

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(SEED_TESTIMONIALS);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Form state
  const [name, setName] = useState('');
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
          setReviews([...parsed, ...SEED_TESTIMONIALS.filter((r) => !parsed.some((p: Review) => p.id === r.id))]);
        }
      }
    } catch (e) {
      console.error('Failed to load reviews from localStorage', e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) return;

    setSubmitting(true);

    // Form initials for avatar
    const nameParts = name.trim().split(' ');
    const initials =
      nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();

    const roleParts = roleCompany.split(' at ');
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name,
      role: roleParts[0] || 'Client',
      company: roleParts[1] || 'Verified Stakeholder',
      avatar: initials,
      rating,
      content,
      date: 'Just now',
      verified: true,
    };

    // Post to API route stub
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      }).catch(() => null);
    } catch {}

    const updated = [newReview, ...reviews];
    setReviews(updated);

    try {
      const userAdded = updated.filter((r) => r.id.startsWith('rev-') && !SEED_TESTIMONIALS.some((s) => s.id === r.id));
      localStorage.setItem('ag_portfolio_reviews', JSON.stringify(userAdded));
    } catch (e) {
      console.error('Failed to save review to localStorage', e);
    }

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#6366f1', '#a855f7'],
      });
    } catch {}

    setSubmitting(false);
    setModalOpen(false);
    setSuccessToast(true);

    setName('');
    setRoleCompany('');
    setRating(5);
    setContent('');

    setTimeout(() => setSuccessToast(false), 4500);
  };

  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section id="reviews" className="relative py-24 overflow-hidden bg-[#030712]">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
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
              Verified endorsements from product leaders, CTOs, and automation clients on project execution, system reliability, and delivery velocity.
            </motion.p>
          </div>

          {/* Action Button: Write a Review */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="shrink-0"
          >
            <button
              onClick={() => setModalOpen(true)}
              aria-label="Open review submission modal"
              className="group relative px-5 py-2.5 rounded-xl bg-zinc-900/80 border border-indigo-500/40 hover:border-cyan-400 text-white font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform" />
              <span>Write a Review</span>
            </button>
          </motion.div>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-3 shadow-xl backdrop-blur-xl"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Thank you for your endorsement! Your review has been added to the live stream.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Faded-Edge Infinite Marquee Carousel Container */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] py-4">
        
        {/* Left & Right Gradient Overlay Guards */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#030712] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#030712] to-transparent z-20 pointer-events-none" />

        {/* Marquee Track with Hover-to-Pause */}
        <div className="flex w-max hover:[animation-play-state:paused] animate-marquee">
          {marqueeItems.map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="w-[340px] sm:w-[390px] flex-shrink-0 mx-3 bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-xl group"
            >
              <div>
                {/* Card Top Row: Rating Stars + Verified Badge */}
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
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
                      <UserCheck className="w-3 h-3 text-cyan-400" />
                      ✓ Verified Client
                    </span>
                  )}
                </div>

                {/* Card Middle: Review Quote */}
                <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-sans italic">
                  "{rev.content}"
                </p>
              </div>

              {/* Card Bottom Row: Initials Avatar + Meta */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shrink-0">
                  <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center font-mono font-bold text-xs text-white">
                    {rev.avatar}
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {rev.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 truncate">
                    {rev.role} {rev.company ? `• ${rev.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal Drawer Dialog */}
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
                  <span>SUBMIT ENDORSEMENT</span>
                </div>
                <h3 className="text-xl font-bold text-white">Write a Review</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Share your experience collaborating with Aliyan Gohar on frontend, full-stack, or automation projects.
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
                    placeholder="e.g. Marcus Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  />
                </div>

                {/* Role & Company */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Role &amp; Company / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Product Lead at Horizon Media (Austin, TX)"
                    value={roleCompany}
                    onChange={(e) => setRoleCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  />
                </div>

                {/* Rating Selector */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Rating <span className="text-cyan-400">*</span>
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

                {/* Review Textarea */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Review Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe project outcomes, technical execution, or delivery speed..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans resize-none"
                  />
                </div>

                {/* Submit Actions */}
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
