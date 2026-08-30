'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, FileDown } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const rafScrollId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafScrollId.current) return;

      rafScrollId.current = requestAnimationFrame(() => {
        const sections = NAV_ITEMS.map((item) => item.href.substring(1));
        const scrollPos = window.scrollY + 220;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
        rafScrollId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafScrollId.current) cancelAnimationFrame(rafScrollId.current);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none transition-all duration-300 transform-gpu">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Cyber Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="group flex items-center gap-3 px-3.5 py-2 rounded-2xl backdrop-blur-xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl"
        >
          {/* Hexagonal Cyber SVG Logo */}
          <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
              <defs>
                <linearGradient id="nav-ag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <polygon
                points="50,8 88,28 88,72 50,92 12,72 12,28"
                fill="rgba(15,23,42,0.7)"
                stroke="url(#nav-ag-grad)"
                strokeWidth="4"
              />
              <text
                x="50"
                y="59"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="32"
                fill="url(#nav-ag-grad)"
                textAnchor="middle"
                letterSpacing="-1"
              >
                AG
              </text>
            </svg>
          </div>

          {/* Typography */}
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm text-white tracking-wide group-hover:text-cyan-300 transition-colors">
              Aliyan Gohar
            </span>
            <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase font-semibold">
              SYSTEMS &amp; FULL STACK
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation Links Pill */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="hidden md:flex items-center gap-1 px-4 py-2 rounded-full backdrop-blur-xl bg-zinc-950/80 border border-white/10 shadow-2xl"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  isActive ? 'text-cyan-300 font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabNav"
                    className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-500/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
        </motion.nav>

        {/* Desktop Right CTAs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="hidden md:flex items-center gap-3"
        >
          <a
            href="/Aliyan_Gohar_Software_Engineer_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Aliyan_Gohar_Software_Engineer_Resume.pdf"
            className="group px-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl text-xs font-mono text-zinc-200 hover:text-white flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/10"
          >
            <FileDown className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Download CV</span>
          </a>

          <a
            href="https://wa.me/923184321695?text=Hi%20Aliyan,%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center gap-1.5"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl text-zinc-300 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto max-w-7xl mx-auto mt-2 p-4 rounded-2xl bg-zinc-950/95 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col gap-3"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-mono text-zinc-300 hover:text-cyan-300 hover:bg-zinc-900/60 transition-colors flex items-center justify-between"
              >
                <span>{item.name}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center gap-2">
              <a
                href="/Aliyan_Gohar_Software_Engineer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Aliyan_Gohar_Software_Engineer_Resume.pdf"
                className="flex-1 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-center text-zinc-200 flex items-center justify-center gap-2"
              >
                <FileDown className="w-4 h-4 text-cyan-400" /> Download CV
              </a>
              <a
                href="https://wa.me/923184321695?text=Hi%20Aliyan,%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-zinc-950 font-bold text-xs font-mono text-center flex items-center justify-center gap-1"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
