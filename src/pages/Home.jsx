import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import IntroLoader from '../components/IntroLoader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fadeInUp, viewportReveal } from '../lib/motion';
import { FEATURED_TEAM } from '../constants/team';
import { UPCOMING_EVENTS, ARCHIVED_EVENTS } from '../constants/events';
import { SOCIAL_LINKS, GOOGLE_FORM_URL, SUBSTACK_URL, CONTACT_EMAIL } from '../constants/socials';

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const sampleProjects = [
    {
      id: '001',
      tag: 'PROJECT_001',
      title: 'DESIGN SYSTEM // OBSIDIAN',
      category: 'UI/UX ARCHITECTURE',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: '002',
      tag: 'PROJECT_002',
      title: 'CREATIVE LABS PLATFORM',
      category: 'FULL-STACK DEVELOPMENT',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    },
  ];

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
                EST. 2025 // INITIATION PROTOCOL
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
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// 001 // SYSTEM OVERVIEW</span>
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
                  READ THE MANIFESTO →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            3. ARCHIVE / PROJECTS GRID
           ========================================== */}
        <section id="projects" className="section-divider space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// 002 // CREATIVE ARCHIVE</span>
              <h2 className="font-display-xl text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase">
                ARCHIVE <span className="text-vibrant-scarlet font-mono-label text-2xl">0_19</span>
              </h2>
            </div>
            <span className="font-mono-label text-xs text-stark-white/50 uppercase">
              SELECTED WORKS & LAB EXPERIMENTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleProjects.map((proj) => (
              <motion.div
                key={proj.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="relative border-2 border-stark-white bg-surface-container group cursor-pointer"
              >
                {/* Hanging Mono Tag */}
                <div className="hanging-label">
                  [ {proj.tag} ]
                </div>

                {/* Project Image (grayscale -> color) */}
                <div className="h-[320px] overflow-hidden border-b border-stark-white">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-2 group-hover:bg-vibrant-scarlet group-hover:text-pitch-black transition-none">
                  <span className="font-mono-label text-xs text-vibrant-scarlet group-hover:text-pitch-black uppercase">
                    {proj.category}
                  </span>
                  <div className="flex justify-between items-center">
                    <h3 className="font-display-xl text-xl sm:text-2xl font-bold uppercase">
                      {proj.title}
                    </h3>
                    <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==========================================
            4. EVENTS PREVIEW
           ========================================== */}
        <section className="section-divider space-y-12">
          <div className="flex justify-between items-end">
            <div>
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// 003 // PROTOCOLS & SESSIONS</span>
              <h2 className="font-display-xl text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase">
                EVENTS <Link to="/events" className="text-vibrant-scarlet hover:underline">↗</Link>
              </h2>
            </div>
            <Link to="/events" className="hidden sm:inline-block font-mono-label text-xs text-stark-white/70 hover:text-vibrant-scarlet uppercase border-b border-stark-white/40 pb-1">
              VIEW FULL ARCHIVE →
            </Link>
          </div>

          {/* Upcoming Events List */}
          <div className="space-y-4">
            <span className="font-mono-label text-xs text-stark-white/50 uppercase tracking-widest">
              [ UPCOMING_PROTOCOLS ]
            </span>
            {UPCOMING_EVENTS.map((evt) => (
              <motion.div
                key={evt.id}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.15 }}
                className="border-2 border-stark-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-vibrant-scarlet hover:border-vibrant-scarlet hover:text-pitch-black transition-none"
              >
                <div className="space-y-2">
                  <span className="font-mono-label text-xs text-vibrant-scarlet group-hover:text-pitch-black uppercase">
                    {evt.displayDate} // {evt.location}
                  </span>
                  <h3 className="font-display-xl text-2xl md:text-3xl font-extrabold uppercase">
                    {evt.title}
                  </h3>
                  <p className="font-body-md text-sm text-stark-white/70 group-hover:text-pitch-black/80 max-w-2xl">
                    {evt.description}
                  </p>
                </div>
                <a
                  href={evt.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-stark-white group-hover:border-pitch-black px-6 py-3 font-mono-label text-xs font-bold uppercase shrink-0 text-center"
                >
                  REGISTER →
                </a>
              </motion.div>
            ))}
          </div>

          {/* Archived Events Short Table */}
          <div className="space-y-4 pt-6">
            <span className="font-mono-label text-xs text-stark-white/50 uppercase tracking-widest">
              [ RECENTLY_ARCHIVED ]
            </span>
            <div className="divide-y divide-stark-white/20 border-y border-stark-white/20">
              {ARCHIVED_EVENTS.slice(0, 2).map((evt) => (
                <div key={evt.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:text-vibrant-scarlet transition-none">
                  <div className="flex items-center space-x-4">
                    <span className="font-mono-label text-xs text-vibrant-scarlet">{evt.index}</span>
                    <span className="font-display-xl text-lg font-bold uppercase">{evt.title}</span>
                  </div>
                  <span className="font-mono-label text-xs text-stark-white/60 uppercase">{evt.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            5. TEAM PREVIEW
           ========================================== */}
        <section className="section-divider space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// 004 // OPERATIVES</span>
              <h2 className="font-display-xl text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase">
                CREATIVE <span className="text-outline">COLLECTIVE</span>
              </h2>
            </div>
            <Link to="/team" className="font-mono-label text-xs text-vibrant-scarlet hover:underline uppercase">
              MEET ALL 15 OPERATIVES →
            </Link>
          </div>

          {/* 4-col Featured Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_TEAM.map((member) => (
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
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
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
                    [ {member.role} ]
                  </span>
                  <h3 className="font-display-xl text-xl font-bold uppercase">
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

        {/* ==========================================
            6. NEWSLETTER STRIP
           ========================================== */}
        <section className="section-divider bg-surface-container-lowest">
          <div className="max-w-4xl mx-auto text-center space-y-8 py-8">
            <span className="font-mono-label text-xs text-vibrant-scarlet uppercase tracking-widest">
              [ SIGNAL_SUBSCRIBE ]
            </span>
            <h2 className="font-display-xl text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase">
              JOIN THE TRANSMISSION
            </h2>
            <p className="font-body-md text-base text-stark-white/70 max-w-xl mx-auto">
              Subscribe to our Substack for club announcements, design teardowns, engineering insights, and event drops.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) window.open(SUBSTACK_URL, '_blank');
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto pt-4"
            >
              <input
                type="email"
                required
                placeholder="ENTER_YOUR_EMAIL@DOMAIN.COM"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-stark-white focus:border-vibrant-scarlet px-4 py-3 font-mono-label text-sm text-stark-white placeholder-stark-white/40 outline-none transition-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto border-2 border-stark-white px-8 py-3 font-mono-label text-sm font-bold text-stark-white uppercase border-box-hover glitch-hover shrink-0"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </section>

        {/* ==========================================
            7. CONTACT CTA
           ========================================== */}
        <section className="section-divider space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">// 005 // DIRECT_COMMUNICATION</span>
              <h2 className="font-display-xl text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase">
                GET IN TOUCH
              </h2>
              <p className="font-mono-label text-sm text-vibrant-scarlet uppercase">
                INITIATE A LINK WITH OUR CREATIVE LEADS
              </p>

              {/* Stacked Social Buttons */}
              <div className="space-y-3 pt-4">
                {SOCIAL_LINKS.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.15 }}
                    className="flex justify-between items-center border-2 border-stark-white p-4 font-mono-label text-sm font-bold uppercase text-stark-white glitch-hover"
                  >
                    <span>{s.label}</span>
                    <span className="material-symbols-outlined">arrow_outward</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Giant Mailto Headline */}
            <div className="lg:col-span-7 flex flex-col items-start lg:items-end justify-center">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-display-xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-stark-white hover:text-vibrant-scarlet transition-none break-all text-left lg:text-right uppercase leading-none"
              >
                {CONTACT_EMAIL}
              </a>
              <span className="font-mono-label text-xs text-stark-white/40 uppercase mt-4">
                CLICK TO INITIATE MAIL PROTOCOL
              </span>
            </div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </>
  );
}
