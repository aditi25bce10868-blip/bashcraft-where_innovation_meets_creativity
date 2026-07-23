import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  const pillars = [
    {
      num: '01',
      icon: 'palette',
      title: 'ELITE UX/UI',
      desc: 'Crafting pixel-perfect, high-contrast, brutalist user interfaces and seamless user flows that set new industry standards.',
    },
    {
      num: '02',
      icon: 'lightbulb',
      title: 'DESIGN THINKING',
      desc: 'Approaching real-world problems with structured product strategy, rapid user research, and iterative prototyping.',
    },
    {
      num: '03',
      icon: 'terminal',
      title: 'DIGITAL SKILLS',
      desc: 'Empowering engineers and designers with advanced technical toolsets, code architecture, and digital craftsmanship.',
    },
  ];

  return (
    <>
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-pitch-black text-stark-white pt-[68px]"
      >
        {/* ==========================================
            1. HERO HEADER
           ========================================== */}
        <section className="relative min-h-[716px] flex flex-col justify-end p-gutter border-b-2 border-stark-white overflow-hidden group">
          {/* Background image (grayscale -> color on hover) */}
          <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80"
              alt="About Background"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pitch-black via-pitch-black/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1440px] w-full mx-auto space-y-6 pb-12">
            <span className="font-mono-label text-xs sm:text-sm text-vibrant-scarlet uppercase tracking-widest border border-vibrant-scarlet px-4 py-1.5 bg-pitch-black/80 inline-block">
              SYSTEM_INIT // 001
            </span>
            <h1 className="font-display-xl text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-extrabold tracking-tighter uppercase leading-[0.95]">
              SYSTEM <span className="text-vibrant-scarlet">OVERVIEW</span>
            </h1>
            <p className="font-mono-label text-sm sm:text-base text-stark-white/70 max-w-xl uppercase">
              // DECODING THE ARCHITECTURE OF CREATIVITY & ENGINEERING
            </p>
          </div>
        </section>

        {/* ==========================================
            2. MANIFESTO STRIP
           ========================================== */}
        <section className="section-divider">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// 002 // MANIFESTO</span>
              <h2 className="font-display-xl text-3xl sm:text-4xl font-extrabold uppercase">
                THE_DIRECTIVE
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <h3 className="font-display-xl text-3xl sm:text-5xl font-extrabold uppercase leading-tight">
                NO FLUFF. <span className="text-vibrant-scarlet">JUST ENGINEERING.</span>
              </h3>
              <p className="font-body-md text-xl text-stark-white/90 leading-relaxed">
                Bashcraft Club is a high-impact creative community focused on building elite UX/UI design, product thinking, and digital creativity skills — bringing together developers, designers, and innovators through workshops, design sprints, hackathons, and speaker sessions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stark-white/20 font-mono-label text-xs text-stark-white/60 uppercase">
                <div>
                  [ CORE_MOTTO ]<br />
                  <span className="text-stark-white text-sm font-bold">PRECISION OVER POPULARITY</span>
                </div>
                <div>
                  [ TARGET_OUTCOME ]<br />
                  <span className="text-stark-white text-sm font-bold">WORLD-CLASS DIGITAL CRAFTSMANSHIP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            3. 3-PILLAR BENTO GRID
           ========================================== */}
        <section className="section-divider space-y-12">
          <div className="space-y-2">
            <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// 003 // FOUNDATIONAL PILLARS</span>
            <h2 className="font-display-xl text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase">
              THE <span className="text-outline">TRINITY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.num}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.15 }}
                className="border-2 border-stark-white bg-surface-container p-8 flex flex-col justify-between min-h-[360px] group hover:bg-vibrant-scarlet hover:border-vibrant-scarlet hover:text-pitch-black transition-none cursor-pointer"
              >
                {/* Top Row: Numbered Tag + Icon */}
                <div className="flex justify-between items-center">
                  <span className="font-mono-label text-sm text-vibrant-scarlet group-hover:text-pitch-black font-bold">
                    [ {pillar.num} ]
                  </span>
                  <span className="material-symbols-outlined text-4xl text-stark-white group-hover:text-pitch-black">
                    {pillar.icon}
                  </span>
                </div>

                {/* Bottom: Heading + Body */}
                <div className="space-y-4 pt-12">
                  <h3 className="font-display-xl text-2xl sm:text-3xl font-extrabold uppercase">
                    {pillar.title}
                  </h3>
                  <p className="font-body-md text-sm text-stark-white/70 group-hover:text-pitch-black/90">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==========================================
            4. FULL-WIDTH IMAGE BREAKOUT (EXECUTE)
           ========================================== */}
        <section className="relative h-[614px] w-full border-y-2 border-stark-white overflow-hidden flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80"
            alt="Execute Breakout"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-pitch-black/50" />
          <h2 className="relative z-10 font-display-xl text-7xl sm:text-9xl md:text-[180px] font-extrabold text-stark-white uppercase tracking-tighter mix-blend-difference select-none">
            EXECUTE
          </h2>
        </section>
      </motion.main>

      <Footer />
    </>
  );
}
