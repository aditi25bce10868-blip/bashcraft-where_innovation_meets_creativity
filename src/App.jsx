import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Team from './pages/Team';
import TeamDetail from './pages/TeamDetail';
import Contact from './pages/Contact';
import { initLenis } from './lib/lenis';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = initLenis();
    return () => {
      // Lenis cleanup
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/team/:teamId" element={<TeamDetail />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-pitch-black text-stark-white flex items-center justify-center p-gutter text-center">
              <div className="space-y-6">
                <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// 404_ERROR</span>
                <h1 className="font-display-xl text-8xl font-extrabold text-outline">404</h1>
                <p className="font-mono-label text-sm text-stark-white/70 uppercase">
                  RESOURCE_NOT_FOUND // THE VOID CLAIMS THIS LINK
                </p>
                <a
                  href="/"
                  className="inline-block border-2 border-stark-white px-6 py-3 font-mono-label text-xs font-bold uppercase border-box-hover glitch-hover"
                >
                  ← RETURN TO TERMINAL
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
