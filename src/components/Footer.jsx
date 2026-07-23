import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, FOOTER_SITEMAP } from '../constants/socials';

export default function Footer() {
  return (
    <footer className="w-full bg-pitch-black border-t-2 border-stark-white pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-gutter space-y-16">
        {/* Main Footer Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Wordmark & Tagline */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display-xl text-4xl md:text-6xl font-extrabold tracking-tighter text-stark-white uppercase">
              BASHCRAFT<br />
              <span className="text-vibrant-scarlet">CLUB</span>
            </h2>
            <p className="font-mono-label text-sm text-stark-white/70 uppercase">
              no fluff; just engineering
            </p>
            <p className="font-body-md text-base text-stark-white/60 max-w-md">
              A high-impact creative community focused on building elite UX/UI design, product thinking, and digital creativity skills.
            </p>
            <div className="font-mono-label text-xs text-stark-white/50 pt-4">
              © 2025 BASHCRAFT CLUB. ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* Right Column: Giant Social Links */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <span className="font-mono-label text-xs text-vibrant-scarlet uppercase mb-2">
              // TRANSMISSION_CHANNELS
            </span>
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-stark-white/20 pb-4 pt-2 font-display-xl text-3xl sm:text-5xl md:text-6xl font-extrabold text-stark-white hover:text-vibrant-scarlet transition-none"
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-3xl sm:text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-vibrant-scarlet">
                  arrow_forward
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Sitemap Row */}
        <div className="border-t border-stark-white/20 pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_SITEMAP.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="font-mono-label text-xs text-vibrant-scarlet uppercase tracking-wider">
                [ {col.title} ]
              </h4>
              <ul className="space-y-2 font-body-md text-sm text-stark-white/70">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-vibrant-scarlet transition-none flex items-center gap-1"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="hover:text-vibrant-scarlet transition-none"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Location / Status Column */}
          <div className="space-y-4">
            <h4 className="font-mono-label text-xs text-vibrant-scarlet uppercase tracking-wider">
              [ LOCATION ]
            </h4>
            <p className="font-mono-label text-xs text-stark-white/70 leading-relaxed uppercase">
              VIT BHOPAL UNIVERSITY<br />
              KOTRI KALAN, ASHTA<br />
              MADHYA PRADESH 466114
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
