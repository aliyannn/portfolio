'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  MessageSquare,
  Download,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      // Direct POST to Next.js API Route (/api/send) powered by Resend
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setStatus('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#06B6D4', '#8B5CF6', '#10B981', '#38BDF8'],
        });
      } catch {}

      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus('idle');
      }, 5000);
    } catch (error: any) {
      console.error('Contact submission error:', error);
      setStatus('error');
      setErrorMessage(error?.message || 'Something went wrong. Please try again or email directly.');
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-sm"
        >
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>LET&apos;S CONNECT</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Have a Project or Role in Mind? <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
            Let&apos;s Build Together
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-xl text-sm sm:text-base"
        >
          Reach out for software engineering opportunities, network infrastructure support, or custom web applications.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        {/* Left Column: Direct Contact Details & Links */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="p-7 sm:p-8 rounded-3xl space-y-6 bg-zinc-900/40 border border-white/10 backdrop-blur-xl shadow-xl">
            <h3 className="font-display text-2xl font-bold text-white">Direct Contact</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Based in {PORTFOLIO_DATA.personalInfo.location}. Open for hybrid and full-time remote engineering roles worldwide.
            </p>

            <div className="space-y-3.5 pt-2">
              {/* Email */}
              <a
                href={`mailto:${PORTFOLIO_DATA.personalInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Direct Email</span>
                  <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors font-mono">
                    {PORTFOLIO_DATA.personalInfo.email}
                  </span>
                </div>
              </a>

              {/* Direct Phone */}
              <a
                href="tel:+923184321695"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Direct Call (SIM)</span>
                  <span className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors font-mono">
                    +92 318 4321695
                  </span>
                </div>
              </a>

              {/* WhatsApp Direct Messaging */}
              <a
                href="https://wa.me/923184321695?text=Hi%20Aliyan,%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">WhatsApp Chat</span>
                  <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors font-mono">
                    +92 318 4321695
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Location</span>
                  <span className="text-sm font-semibold text-white">{PORTFOLIO_DATA.personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social Buttons & Resume */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase text-slate-400 block">Profiles &amp; Resume</span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={PORTFOLIO_DATA.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={PORTFOLIO_DATA.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href="/Aliyan_Gohar_Software_Engineer_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Aliyan_Gohar_Software_Engineer_Resume.pdf"
                  className="px-4 py-2 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <Download className="w-4 h-4 text-cyan-400" /> Download CV
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Glassmorphic Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden bg-zinc-900/40 border border-white/10 backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-300 tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm font-sans"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-300 tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm font-sans"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-slate-300 tracking-wider">Subject</label>
              <input
                type="text"
                placeholder="Software Engineering Role / Project Inquiry"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm font-sans"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-slate-300 tracking-wider">Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project, timeline, or engineering opportunity..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm resize-none font-sans"
              />
            </div>

            {/* Error Notification Banner */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing Dynamic Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                status === 'success'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                  : status === 'sending'
                  ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-white/10'
                  : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.01]'
              }`}
            >
              {status === 'sending' && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                  <span>Sending Message...</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle2 className="w-5 h-5 text-zinc-950" />
                  <span className="font-bold">✓ Message Sent Successfully!</span>
                </>
              )}
              {status === 'idle' && (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
              {status === 'error' && (
                <>
                  <span>Try Again</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
