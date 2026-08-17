'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowUpRight, Github, Linkedin, FileDown } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills & Exp', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none transition-all duration-300 transform-gpu">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md bg-black/40 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 shadow-2xl"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            AG
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm text-white tracking-wide group-hover:text-indigo-400 transition-colors">
              ALIYAN GOHAR<span className="text-indigo-400">.</span>
            </span>
            <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-mono">Software Engineer</span>
          </div>
        </motion.a>

        {/* Floating Desktop Glass Pill Header */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/10 shadow-2xl"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive ? 'text-indigo-300 font-semibold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            );
          })}
        </motion.nav>

        {/* CTA & Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-3"
        >
          {/* Social Links */}
          <a
            href={PORTFOLIO_DATA.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full backdrop-blur-md bg-black/40 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PORTFOLIO_DATA.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full backdrop-blur-md bg-black/40 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Download Resume / CV Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Aliyan_Gohar_Resume.pdf"
            className="group px-4 py-2 rounded-full backdrop-blur-md bg-black/40 border border-white/10 hover:border-indigo-500/40 text-neutral-200 hover:text-white font-medium text-xs transition-all duration-300 flex items-center gap-2"
          >
            <FileDown className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>CV</span>
          </a>

          {/* Let's Connect CTA */}
          <a
            href="#contact"
            className="group relative px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-xs shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
              Let's Connect
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full backdrop-blur-md bg-black/40 border border-white/10 flex items-center justify-center text-neutral-200 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-indigo-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-3 pointer-events-auto rounded-2xl backdrop-blur-xl bg-neutral-900/90 border border-white/10 p-6 overflow-hidden shadow-2xl space-y-4"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-display font-medium text-neutral-200 hover:text-indigo-400 transition-colors py-1 flex items-center justify-between border-b border-white/5"
                >
                  {item.name}
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </a>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Aliyan_Gohar_Resume.pdf"
                  className="w-full py-2.5 rounded-xl bg-neutral-900 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <FileDown className="w-4 h-4 text-indigo-400" /> Download Resume (PDF)
                </a>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    <a
                      href={PORTFOLIO_DATA.personalInfo.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 hover:text-indigo-400"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={PORTFOLIO_DATA.personalInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 hover:text-indigo-400"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-xs"
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
