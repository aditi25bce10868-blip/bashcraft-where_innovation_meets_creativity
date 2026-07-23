import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants/navLinks';
import { GOOGLE_FORM_URL } from '../constants/socials';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[68px] z-50 bg-pitch-black/70 backdrop-blur-md border-b-2 border-stark-white flex items-center justify-between px-4 md:px-gutter">
        {/* Left Side: Brand Wordmark */}
        <Link
          to="/"
          className="font-display-xl text-2xl md:text-3xl font-extrabold tracking-tighter text-stark-white hover:text-vibrant-scarlet transition-none shrink-0"
        >
          BASHCRAFT<span className="text-vibrant-scarlet">.</span>
        </Link>

        {/* Right Side: Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 font-mono-label text-sm uppercase">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`transition-none hover:text-vibrant-scarlet hover:opacity-100 ${
                  active
                    ? 'text-vibrant-scarlet border-b-2 border-vibrant-scarlet pb-1 opacity-100 font-bold'
                    : 'text-stark-white opacity-70'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-stark-white p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Brutalist Fullscreen Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-pitch-black/95 backdrop-blur-lg border-b-4 border-vibrant-scarlet pt-24 pb-12 px-6 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// NAVIGATION_MATRIX</span>
              <div className="flex flex-col space-y-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-display-xl text-4xl font-extrabold uppercase transition-none ${
                      isActive(link.path) ? 'text-vibrant-scarlet' : 'text-stark-white hover:text-vibrant-scarlet'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-stark-white/20 pt-6 space-y-4">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full border-2 border-vibrant-scarlet py-4 font-mono-label font-bold text-vibrant-scarlet uppercase glitch-hover"
              >
                JOIN US NOW ↗
              </a>
              <div className="text-center font-mono-label text-xs text-stark-white/50">
                © 2025 BASHCRAFT CLUB. ALL RIGHTS RESERVED.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
