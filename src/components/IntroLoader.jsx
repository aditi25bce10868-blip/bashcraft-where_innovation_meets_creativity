import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [showLoader, setShowLoader] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check if intro seen in current session
    const seen = sessionStorage.getItem('bc_intro_seen');
    if (seen === '1') {
      if (onComplete) onComplete();
      return;
    }

    setShowLoader(true);

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setLogoVisible(true);
      const timer = setTimeout(() => {
        finishIntro();
      }, 700);
      return () => clearTimeout(timer);
    }

    // Timeline phases
    // Phase B (logo pop) at 1.4s
    const timerB = setTimeout(() => {
      setLogoVisible(true);
    }, 1400);

    // Phase D (exit reveal) at 2.4s
    const timerD = setTimeout(() => {
      finishIntro();
    }, 2400);

    return () => {
      clearTimeout(timerB);
      clearTimeout(timerD);
    };
  }, []);

  const finishIntro = () => {
    sessionStorage.setItem('bc_intro_seen', '1');
    setShowLoader(false);
    if (onComplete) onComplete();
  };

  if (!showLoader) return null;

  // Architectural / geometric brutalist wireframe paths
  const paths = [
    "M 10 50 H 790 V 550 H 10 Z",
    "M 50 100 L 750 100 M 50 500 L 750 500",
    "M 150 50 V 550 M 650 50 V 550",
    "M 50 200 L 400 350 L 750 200",
    "M 400 50 V 550",
    "M 200 150 H 600 V 450 H 200 Z",
    "M 300 250 H 500 V 350 H 300 Z",
    "M 50 50 L 150 150 M 750 50 L 650 150 M 50 550 L 150 450 M 750 550 L 650 450"
  ];

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="intro-loader"
          className="fixed inset-0 z-[100] bg-pitch-black flex flex-col items-center justify-center overflow-hidden border-b-4 border-vibrant-scarlet"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Phase A: Wireframe SVG line-draw */}
          {!reducedMotion && (
            <svg
              viewBox="0 0 800 600"
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
            >
              {paths.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0.8 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1.2, ease: 'easeInOut', delay: i * 0.06 }}
                />
              ))}
            </svg>
          )}

          {/* Phase B: Logo spring-pop */}
          <div className="relative z-10 text-center px-4">
            <AnimatePresence>
              {logoVisible && (
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                  }}
                  className="space-y-4 flex flex-col items-center"
                >
                  <span className="font-mono-label text-xs tracking-widest text-vibrant-scarlet uppercase">
                    [ INITIATION_SEQUENCE // ACTIVE ]
                  </span>
                  <h1 className="font-display-xl text-5xl sm:text-7xl md:text-8xl font-extrabold text-stark-white tracking-tighter uppercase">
                    BASHCRAFT<span className="text-vibrant-scarlet">.</span>
                  </h1>
                  {/* Scarlet underline flash */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="h-1 bg-vibrant-scarlet w-full max-w-xs"
                  />
                  <p className="font-mono-label text-xs text-stark-white/60 uppercase">
                    no fluff; just engineering
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SKIP button */}
          <button
            onClick={finishIntro}
            className="absolute bottom-8 right-8 z-20 font-mono-label text-xs text-stark-white/60 hover:text-vibrant-scarlet border border-stark-white/30 hover:border-vibrant-scarlet px-4 py-2 uppercase transition-none"
          >
            SKIP_INTRO [ESC]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
