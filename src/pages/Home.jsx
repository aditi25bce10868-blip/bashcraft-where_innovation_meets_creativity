import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import IntroLoader from '../components/IntroLoader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fadeInUp, viewportReveal } from '../lib/motion';
import { HOME_TEAM_PREVIEW } from '../constants/team';
import { UPCOMING_EVENTS, PAST_EVENTS } from '../constants/events';
import { GOOGLE_FORM_URL } from '../constants/socials';
import groupPhoto from '../assets/community/group-photo.jpg';

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState(null);

  const toggleEventExpand = (id) => {
    setExpandedEventId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <IntroLoader onComplete={() => setIntroDone(true)} />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-pitch-black text-stark-white pt-[68px]"
      >
        {/* ==========================================
            1. HERO SECTION
           ========================================== */}
        <section className="relative min-h-[calc(100vh-68px)] flex flex-col justify-center items-center text-center px-gutter py-16 overflow-hidden border-b border-stark-white">
          {/* Faint Wireframe Backdrop */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 1000 1000" className="w-full h-full stroke-stark-white fill-none stroke-[1]">
              <circle cx="500" cy="500" r="400" />
              <circle cx="500" cy="500" r="250" strokeDasharray="5 5" />
              <line x1="100" y1="500" x2="900" y2="500" />
              <line x1="500" y1="100" x2="500" y2="900" />
              <rect x="250" y="250" width="500" height="500" />
            </svg>
          </div>

          <div className="relative z-10 max-w-[1200px] space-y-8">
            {/* Eyebrow Label */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={0.1}
              viewport={viewportReveal}
              className="inline-block"
            >
              <span className="font-mono-label text-xs sm:text-sm text-vibrant-scarlet uppercase tracking-widest border border-vibrant-scarlet/40 px-4 py-1.5 bg-pitch-black">
                BASHCRAFT CLUB // VIT BHOPAL
              </span>
            </motion.div>

            {/* Giant Headline */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={0.3}
              viewport={viewportReveal}
              className="font-display-xl text-5xl sm:text-7xl md:text-8xl lg:text-[130px] font-extrabold tracking-tighter uppercase leading-[0.95]"
            >
              WELCOME TO<br />
              <span className="text-outline">BASHCRAFT CLUB</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={0.5}
              viewport={viewportReveal}
              className="font-body-md text-lg sm:text-2xl text-stark-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              The place to collaborate, create, and push the boundaries of what's possible.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={0.7}
              viewport={viewportReveal}
              className="pt-4"
            >
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-vibrant-scarlet bg-pitch-black text-vibrant-scarlet px-10 py-5 font-mono-label text-base font-bold uppercase tracking-wider border-box-hover glitch-hover"
              >
                JOIN US NOW ↗
              </a>
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            2. ABOUT TEASER
           ========================================== */}
        <section className="section-divider">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// ABOUT US</span>
              <h2 className="font-display-xl text-4xl sm:text-5xl font-extrabold tracking-tighter uppercase">
                ENGINEERING<br />
                <span className="text-outline">EXCELLENCE</span>
              </h2>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-2 border-vibrant-scarlet pl-6 space-y-4">
                <p className="font-body-md text-lg text-stark-white/90 leading-relaxed">
                  Bashcraft Club is a high-impact creative community focused on building elite UX/UI design, product thinking, and digital creativity skills.
                </p>
              </div>
              <div className="space-y-4 font-mono-label text-sm text-stark-white/60 leading-relaxed">
                <p>
                  We bring together developers, designers, and innovators through workshops, design sprints, hackathons, and speaker sessions.
                </p>
                <Link to="/about" className="inline-block text-vibrant-scarlet hover:underline font-bold uppercase pt-2">
                  READ OUR STORY →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            3. OUR COMMUNITY (Group Photo cropped from top)
           ========================================== */}
        <section className="section-divider space-y-12">
          <div className="space-y-2">
            <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// OUR COMMUNITY</span>
            <h2 className="font-display-xl text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase">
              THE PEOPLE BEHIND BASHCRAFT
            </h2>
            <p className="font-body-md text-base text-stark-white/70 max-w-2xl">
              A community of engineering students who build, ship, and learn together.
            </p>
          </div>

          <div className="border-2 border-stark-white overflow-hidden bg-surface-container">
            <img
              src={groupPhoto}
              alt="BashCraft Club Community"
              className="w-full h-[320px] sm:h-[450px] md:h-[550px] object-cover object-top"
            />
          </div>
        </section>

        {/* ==========================================
            4. EVENTS SECTION (Restructured + Expandable Cards)
           ========================================== */}
        <section className="section-divider space-y-12">
          <div className="flex justify-between items-end">
            <div>
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// EVENTS</span>
              <h2 className="font-display-xl text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase">
                EVENTS
              </h2>
            </div>
            <Link to="/events" className="hidden sm:inline-block font-mono-label text-xs text-stark-white/70 hover:text-vibrant-scarlet uppercase border-b border-stark-white/40 pb-1">
              VIEW ALL EVENTS →
            </Link>
          </div>

          {/* Sub-section A: Upcoming Events */}
          <div className="space-y-6">
            <span className="font-mono-label text-xs text-stark-white/50 uppercase tracking-widest block">
              [ UPCOMING EVENTS ]
            </span>
            <div className="space-y-4">
              {UPCOMING_EVENTS.map((evt) => {
                const isExpanded = expandedEventId === evt.id;
                return (
                  <motion.div
                    key={evt.id}
                    layout
                    onClick={() => toggleEventExpand(evt.id)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleEventExpand(evt.id);
                      }
                    }}
                    className="border-2 border-stark-white p-6 md:p-8 bg-surface-container cursor-pointer select-none space-y-4 hover:border-vibrant-scarlet transition-colors duration-200 outline-none"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          {evt.tentative && (
                            <span className="font-mono-label text-xs text-vibrant-scarlet border border-vibrant-scarlet px-2 py-0.5 uppercase font-bold">
                              TENTATIVE
                            </span>
                          )}
                          <span className="font-mono-label text-xs text-stark-white/60 uppercase">
                            {evt.location}
                          </span>
                        </div>
                        <h3 className="font-display-xl text-2xl md:text-3xl font-extrabold uppercase">
                          {evt.title}
                        </h3>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="inline-block border border-stark-white/40 opacity-50 px-6 py-3 font-mono-label text-xs font-bold uppercase text-stark-white/70 text-center cursor-not-allowed">
                          REGISTRATION OPENS SOON
                        </span>
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="material-symbols-outlined text-3xl text-vibrant-scarlet"
                        >
                          expand_more
                        </motion.span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-stark-white/20 space-y-4 overflow-hidden"
                        >
                          <p className="font-body-md text-base text-stark-white/80 leading-relaxed">
                            {evt.description}
                          </p>
                          {evt.image && (
                            <div className="border border-stark-white/30 max-h-80 overflow-hidden">
                              <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sub-section B: Past Events */}
          <div className="space-y-6 pt-4">
            <span className="font-mono-label text-xs text-stark-white/50 uppercase tracking-widest block">
              [ PAST EVENTS ]
            </span>
            <div className="space-y-4">
              {PAST_EVENTS.map((evt) => {
                const isExpanded = expandedEventId === evt.id;
                return (
                  <motion.div
                    key={evt.id}
                    layout
                    onClick={() => toggleEventExpand(evt.id)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleEventExpand(evt.id);
                      }
                    }}
                    className="border-2 border-stark-white p-6 md:p-8 bg-surface-container cursor-pointer select-none space-y-4 hover:border-vibrant-scarlet transition-colors duration-200 outline-none"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <span className="font-mono-label text-xs text-vibrant-scarlet font-bold">{evt.index}</span>
                        <div>
                          <span className="font-mono-label text-xs text-stark-white/60 uppercase block">
                            {evt.date} // {evt.location}
                          </span>
                          <h3 className="font-display-xl text-xl sm:text-2xl font-extrabold uppercase">
                            {evt.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="font-mono-label text-xs text-stark-white/50 uppercase">
                          {isExpanded ? 'LESS' : 'DETAILS'}
                        </span>
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="material-symbols-outlined text-3xl text-vibrant-scarlet"
                        >
                          expand_more
                        </motion.span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-stark-white/20 space-y-4 overflow-hidden"
                        >
                          <p className="font-body-md text-base text-stark-white/80 leading-relaxed max-w-4xl">
                            {evt.description}
                          </p>
                          {evt.image && (
                            <div className="border border-stark-white/30 max-h-96 overflow-hidden max-w-3xl">
                              <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            5. MEET THE TEAM (5 Members with Photos)
           ========================================== */}
        <section className="section-divider space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// MEET THE TEAM</span>
              <h2 className="font-display-xl text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase">
                MEET THE TEAM
              </h2>
            </div>
            <Link to="/team" className="font-mono-label text-xs text-vibrant-scarlet hover:underline uppercase">
              VIEW FULL 15-MEMBER ROSTER →
            </Link>
          </div>

          {/* 5-col Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {HOME_TEAM_PREVIEW.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.15 }}
                className="border-2 border-stark-white bg-surface-container overflow-hidden group cursor-pointer"
              >
                {/* Image / Fallback frame */}
                <div className="h-64 bg-surface-container-high border-b border-stark-white flex items-center justify-center overflow-hidden">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-7xl text-stark-white/20 group-hover:text-vibrant-scarlet transition-colors duration-200">
                      person
                    </span>
                  )}
                </div>

                {/* Text Content */}
                <div className="p-5 space-y-2 group-hover:bg-vibrant-scarlet group-hover:text-pitch-black transition-none">
                  <span className="font-mono-label text-xs text-vibrant-scarlet group-hover:text-pitch-black uppercase font-bold block">
                    {member.role}
                  </span>
                  <h3 className="font-display-xl text-lg font-bold uppercase">
                    {member.name}
                  </h3>
                  <p className="font-body-md text-xs text-stark-white/70 group-hover:text-pitch-black/80">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.main>

      <Footer />
    </>
  );
}
