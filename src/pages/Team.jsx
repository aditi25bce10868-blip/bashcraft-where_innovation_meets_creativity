import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TEAM_MEMBERS } from '../constants/team';
import { GOOGLE_FORM_URL } from '../constants/socials';

export default function Team() {
  const faculty = TEAM_MEMBERS.find((m) => m.isFaculty);
  const studentTeam = TEAM_MEMBERS.filter((m) => !m.isFaculty);

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
          <div className="flex items-center space-x-4 border-b border-stark-white pb-6">
            <span className="font-mono-label text-xs sm:text-sm text-vibrant-scarlet uppercase tracking-widest">
              MEET THE TEAM
            </span>
          </div>

          <h1 className="font-display-xl text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-extrabold tracking-tighter uppercase leading-[0.95]">
            CLUB <span className="text-outline">TEAM</span>
          </h1>
          <p className="font-body-md text-lg text-stark-white/70 max-w-2xl">
            Meet the 15 team leads and coordinators driving design, tech, events, and community at BashCraft Club.
          </p>
        </section>

        {/* ==========================================
            2. FACULTY COORDINATOR FEATURED CARD
           ========================================== */}
        {faculty && (
          <section className="max-w-[1440px] mx-auto px-gutter pb-12">
            <div className="border-2 border-vibrant-scarlet bg-surface-container p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">
              <div className="md:col-span-4 h-72 bg-surface-container-high border-2 border-stark-white flex items-center justify-center overflow-hidden relative">
                {faculty.photo ? (
                  <img
                    src={faculty.photo}
                    alt={faculty.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <span className="material-symbols-outlined text-8xl text-stark-white/20 group-hover:text-vibrant-scarlet transition-colors duration-200">
                    person
                  </span>
                )}
              </div>

              <div className="md:col-span-8 space-y-4">
                <span className="font-mono-label text-xs text-vibrant-scarlet uppercase border border-vibrant-scarlet px-3 py-1 bg-pitch-black inline-block font-bold">
                  {faculty.role}
                </span>
                <h2 className="font-display-xl text-3xl sm:text-5xl font-extrabold uppercase">
                  {faculty.name}
                </h2>
                <p className="font-body-md text-base text-stark-white/80 max-w-xl">
                  {faculty.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ==========================================
            3. STUDENT TEAM GRID (Border-Collapsed)
           ========================================== */}
        <section className="max-w-[1440px] mx-auto px-gutter py-section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t-2 border-l-2 border-stark-white">
            {studentTeam.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className="border-b-2 border-r-2 border-stark-white bg-surface-container p-6 flex flex-col justify-between space-y-6 group cursor-pointer hover:bg-vibrant-scarlet hover:border-vibrant-scarlet hover:text-pitch-black transition-none min-h-[360px]"
              >
                {/* Frame / Avatar */}
                <div className="h-56 bg-surface-container-high border border-stark-white group-hover:border-pitch-black flex items-center justify-center overflow-hidden relative">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-7xl text-stark-white/20 group-hover:text-pitch-black transition-colors duration-200">
                      person
                    </span>
                  )}
                  {/* Scarlet multiply overlay on hover */}
                  <div className="absolute inset-0 bg-vibrant-scarlet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <span className="font-mono-label text-xs text-vibrant-scarlet group-hover:text-pitch-black font-bold uppercase block">
                    {member.role}
                  </span>
                  <h3 className="font-display-xl text-xl sm:text-2xl font-bold uppercase">
                    {member.name}
                  </h3>
                  <p className="font-body-md text-xs text-stark-white/70 group-hover:text-pitch-black/80">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* OPEN ROLES CARD */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="border-b-2 border-r-2 border-stark-white bg-surface-container-low p-6 flex flex-col justify-between space-y-6 group min-h-[360px]"
            >
              <div className="space-y-4 pt-4">
                <span className="font-mono-label text-xs text-vibrant-scarlet uppercase font-bold block">
                  OPEN ROLES
                </span>
                <h3 className="font-display-xl text-2xl font-extrabold uppercase">
                  THIS COULD BE YOU
                </h3>
                <p className="font-body-md text-sm text-stark-white/70">
                  We will be hiring new team leads and executive members soon across design, tech, content, and events.
                </p>
              </div>

              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center border-2 border-vibrant-scarlet py-4 font-mono-label text-sm font-bold text-vibrant-scarlet uppercase glitch-hover"
              >
                APPLY NOW ↗
              </a>
            </motion.div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </>
  );
}
