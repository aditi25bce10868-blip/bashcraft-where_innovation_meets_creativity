import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UPCOMING_EVENTS, ARCHIVED_EVENTS } from '../constants/events';

export default function Events() {
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
        <section className="section-divider space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stark-white pb-6">
            <span className="font-mono-label text-xs sm:text-sm text-vibrant-scarlet uppercase tracking-widest">
              [ SYS.PROTOCOL.ACTIVE ]
            </span>
            <span className="font-mono-label text-xs text-stark-white/50 uppercase">
              STATUS: ONLINE // ACCEPTING_REGISTRATIONS
            </span>
          </div>

          <h1 className="font-display-xl text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-extrabold tracking-tighter uppercase leading-[0.95]">
            EVENTS_<span className="text-vibrant-scarlet">ARCHIVE</span>
          </h1>
        </section>

        {/* ==========================================
            2. UPCOMING PROTOCOLS
           ========================================== */}
        <section className="section-divider space-y-12">
          <div className="space-y-2">
            <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// 001 // ACTIVE REGISTRATIONS</span>
            <h2 className="font-display-xl text-3xl sm:text-5xl font-extrabold uppercase">
              UPCOMING PROTOCOLS
            </h2>
          </div>

          {/* 2-Col Grid of Bordered Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UPCOMING_EVENTS.map((evt) => (
              <motion.div
                key={evt.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className="relative border-2 border-stark-white bg-surface-container p-8 flex flex-col justify-between space-y-8 group"
              >
                {/* Date Tag Pinned Top-Right */}
                <div className="absolute top-0 right-0 bg-stark-white text-pitch-black font-mono-label text-xs font-bold px-4 py-2 uppercase group-hover:bg-vibrant-scarlet group-hover:text-pitch-black transition-none">
                  {evt.displayDate}
                </div>

                <div className="space-y-4 pt-6">
                  <span className="font-mono-label text-xs text-vibrant-scarlet uppercase block">
                    LOCATION: {evt.location}
                  </span>
                  <h3 className="font-display-xl text-2xl sm:text-4xl font-extrabold uppercase">
                    {evt.title}
                  </h3>
                  <p className="font-body-md text-sm text-stark-white/80 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                {/* Full-width REGISTER_ACCESS button */}
                <a
                  href={evt.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center border-2 border-stark-white py-4 font-mono-label text-sm font-bold text-stark-white uppercase glitch-hover"
                >
                  REGISTER_ACCESS ↗
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==========================================
            3. ARCHIVED EVENTS TABLE
           ========================================== */}
        <section className="section-divider space-y-12">
          <div className="space-y-2">
            <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// 002 // HISTORICAL LOGS</span>
            <h2 className="font-display-xl text-3xl sm:text-5xl font-extrabold uppercase">
              ARCHIVED EVENTS
            </h2>
          </div>

          <div className="border-t-2 border-b-2 border-stark-white divide-y divide-stark-white/20">
            {ARCHIVED_EVENTS.map((evt) => (
              <div
                key={evt.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 px-4 items-center hover:bg-surface-container transition-none cursor-pointer group"
              >
                <div className="md:col-span-1 font-mono-label text-sm text-vibrant-scarlet font-bold">
                  {evt.index}
                </div>
                <div className="md:col-span-6 font-display-xl text-xl sm:text-2xl font-bold uppercase group-hover:text-vibrant-scarlet transition-none">
                  {evt.title}
                </div>
                <div className="md:col-span-4 font-mono-label text-xs text-stark-white/60 uppercase">
                  {evt.date} // {evt.location}
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <span className="material-symbols-outlined text-2xl text-stark-white/40 group-hover:text-vibrant-scarlet transition-none">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.main>

      <Footer />
    </>
  );
}
