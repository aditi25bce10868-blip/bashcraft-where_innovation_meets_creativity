import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SOCIAL_LINKS, CONTACT_EMAIL } from '../constants/socials';

export default function Contact() {
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
            1. HERO TYPOGRAPHIC HOOK
           ========================================== */}
        <section className="section-divider space-y-8">
          <div className="flex items-center space-x-4 border-b border-stark-white pb-6">
            <span className="font-mono-label text-xs sm:text-sm text-vibrant-scarlet uppercase tracking-widest">
              [ COMM_LINK // ONLINE ]
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-extrabold tracking-tighter uppercase leading-none">
              TRANSMIT TO<br />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-vibrant-scarlet hover:underline break-all"
              >
                {CONTACT_EMAIL}
              </a>
            </h1>
          </div>
        </section>

        {/* ==========================================
            2. 12-COL SPLIT: LEFT PANEL + RIGHT SOCIAL CARDS
           ========================================== */}
        <section className="section-divider">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (4-col) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <span className="font-mono-label text-xs text-vibrant-scarlet uppercase">
                  // INITIATE CONTACT SEQUENCE
                </span>
                <h2 className="font-display-xl text-3xl sm:text-4xl font-extrabold uppercase">
                  DIRECT TRANSMISSION
                </h2>
                <p className="font-body-md text-sm text-stark-white/80 leading-relaxed">
                  Have a question, collaboration idea, or sponsorship inquiry? Connect directly with our team leads via email or our official social channels.
                </p>
              </div>

              {/* Square Image / Art Panel */}
              <div className="relative border-2 border-stark-white h-64 overflow-hidden group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
                  alt="Contact Art Panel"
                  className="w-full h-full object-cover grayscale group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-vibrant-scarlet/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-4 left-4 font-mono-label text-xs text-stark-white uppercase bg-pitch-black px-2 py-1 border border-stark-white">
                  [ BASHCRAFT_HQ ]
                </div>
              </div>
            </div>

            {/* Right Column (8-col): 3 Bordered Social Cards */}
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono-label text-xs text-vibrant-scarlet uppercase block">
                // EXTERNAL_COMMUNICATION_CHANNELS
              </span>

              <div className="space-y-4">
                {SOCIAL_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.15 }}
                    className="border-2 border-stark-white p-6 md:p-8 flex items-center justify-between group hover:bg-vibrant-scarlet hover:border-vibrant-scarlet hover:text-pitch-black transition-none cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="font-mono-label text-xs text-vibrant-scarlet group-hover:text-pitch-black font-bold uppercase block">
                        [ {link.tag} ]
                      </span>
                      <h3 className="font-display-xl text-3xl sm:text-5xl font-extrabold uppercase">
                        {link.label}
                      </h3>
                    </div>
                    <span className="material-symbols-outlined text-4xl group-hover:text-pitch-black transition-none">
                      arrow_outward
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </>
  );
}