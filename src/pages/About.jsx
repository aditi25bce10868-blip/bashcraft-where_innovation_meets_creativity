import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import logo from '../assets/bsclogo.png'
import heroVideo from '../assets/hero_video5.mp4'
import pillarBuildImage from '../assets/pillar-build.jpg'
import pillarCreateImage from '../assets/pillar-create.jpg'
import pillarInspireImage from '../assets/pillar-inspire.jpg'
import Navbar from '../components/Navbar'

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * BASHCRAFT — About Us
 * -----------------------------------------------------------------------
 * Stack: React + Tailwind CSS only. Layout, typography, and restrained
 * motion carry the design — no decoration for its own sake.
 *
 * Palette (use as Tailwind arbitrary values or wire into tailwind.config):
 *   --bg:        #0D0D0D   (Black — primary background)
 *   --text:      #F5F5F0   (White — primary text/light surfaces)
 *   --accent:    #FF6A00   (Orange — primary accent: CTAs, highlights, active states)
 *   --accent-2:  #8A0F1A → #B00020 (Crimson Red — secondary accent: hover states, backgrounds, emphasis)
 *
 * Rules of thumb:
 *   - Black + white cover ~85-90% of any screen; orange/red are accents only.
 *   - Never mix orange and red at equal weight in the same element.
 *   - No blue, purple, green, or any other hue anywhere.
 *
 * Fonts (load in index.html or via @font-face):
 *   Display:    "Anybody"        (700/800 — headings)
 *   Body:       "Hanken Grotesk" (paragraphs)
 *   Mono/label: "Space Mono"     (eyebrows, indices, terminal text)
 * -----------------------------------------------------------------------
 */

/* ----------------------------- Building blocks ---------------------------- */

/** Reusable section wrapper — keeps vertical rhythm and max-width consistent. */
const Section = React.forwardRef(function Section(
  { id, className = "", children },
  ref
) {
  return (
    <section ref={ref} id={id} className={`relative w-full ${className}`}>
      {children}
    </section>
  );
});

/** Small uppercase eyebrow label, used sparingly to mark section identity. */
function Eyebrow({ children }) {
  return (
    <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#A0A0A0]">
      {children}
    </span>
  );
}

/**
 * One full-width editorial row in the "Why Join" section, styled after the
 * event cards in the brand reference. Default state is always black with a
 * thin off-white border — the crimson accent appears ONLY on hover, never as
 * a resting fill, alongside a slight lift and the arrow sliding right.
 */
const JoinPanel = React.memo(function JoinPanel({
  index,
  title,
  description,
  reveal,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full bg-[#0D0D0D] border border-[#F5F5F0]/25 transition-colors duration-300 hover:bg-[#B00020] hover:border-[#B00020]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 px-6 md:px-10 py-12 md:py-16">
        <div className="flex items-baseline gap-6 md:gap-10">
          <span className="font-mono text-xs tracking-[0.3em] text-[#F5F5F0]/40 transition-colors duration-300 group-hover:text-[#F5F5F0]/60">
            {index}
          </span>
          <h3 className="font-display font-bold text-5xl md:text-7xl tracking-tight text-[#F5F5F0] transition-colors duration-300">
            {title}
          </h3>
        </div>

        <div className="flex items-center md:pl-10">
          <div className="max-w-sm">
            <p className="font-body text-sm md:text-base leading-relaxed text-[#F5F5F0]/60 transition-colors duration-300 group-hover:text-[#F5F5F0]/80">
              {description}
            </p>
            <p className="mt-2 font-mono text-xs md:text-sm leading-relaxed text-[#F5F5F0]/35 transition-colors duration-300 group-hover:text-[#F5F5F0]/60">
              {reveal}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* --------------------------------- Hero ------------------------------------
 * Typing animation constants + HeroVideoBackground + HeroSection.
 * -------------------------------------------------------------------------*/

// Club motto, typed as one continuous sentence across two lines. The first
// HERO_WHITE_LEN characters (both lines, including "ONLY ") stay white; the
// remainder ("ASLI ENGINEERING.") types in the accent color. A pause lands
// right after line one, before "ONLY " begins.
const ACCENT_COLOR = "#FF6A00";
const HERO_LINE_1 = "NO FLUFF.\n";
const HERO_WHITE_TAIL = "ONLY ";
const HERO_ACCENT_WORD = "ASLI ENGINEERING.";
const HERO_FULL_TEXT = HERO_LINE_1 + HERO_WHITE_TAIL + HERO_ACCENT_WORD;
const HERO_WHITE_LEN = (HERO_LINE_1 + HERO_WHITE_TAIL).length;

/**
 * Full-bleed, self-hosted background video for the Hero. Muted, chromeless,
 * desaturated to match the monochrome brand, and dimmed under a dark scrim
 * so the terminal headline stays legible on top of it.
 *
 * Using a plain <video> tag (instead of an embedded YouTube iframe) means:
 *   - no native play/pause button can ever flash on top of it,
 *   - no external API script or postMessage handshake to wait on, so it
 *     starts as soon as the file itself has enough data buffered,
 *   - looping is native (`loop`) and gapless — no polling/rewind hack
 *     needed to avoid an "ended" state.
 *
 * Autoplay is skipped (video stays paused on its first frame) for people
 * who've asked their OS for reduced motion.
 */
function HeroVideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark scrim — keeps the copy legible over the reel */}
      <div className="absolute inset-0 bg-[#0D0D0D]/70" />
    </div>
  );
}

function HeroSection() {
  const whiteRef = useRef(null); // white portion of the typed line
  const accentRef = useRef(null); // accent-colored portion ("ASLI ENGINEERING.")
  const cursorRef = useRef(null); // blinking terminal cursor
  const subtitleRef = useRef(null); // fades in shortly after mount

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.set(subtitleRef.current, {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 16,
    });
    gsap.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
      delay: reduceMotion ? 0 : 0.5,
    });

    if (reduceMotion) {
      // JSX default already shows the finished sentence — just hide the cursor.
      gsap.set(cursorRef.current, { opacity: 0 });
      return;
    }

    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });

    const TYPE_SPEED = 0.072;
    const BACK_SPEED = 0.032;
    const MID_PAUSE = 0.5;
    const HOLD = 2;
    const LOOP_PAUSE = 0.6;

    const setTypedText = (n) => {
      const shown = HERO_FULL_TEXT.slice(0, Math.round(n));
      if (whiteRef.current) whiteRef.current.textContent = shown.slice(0, HERO_WHITE_LEN);
      if (accentRef.current) {
        accentRef.current.textContent =
          shown.length > HERO_WHITE_LEN ? shown.slice(HERO_WHITE_LEN) : "";
      }
    };

    let cycleTimeline = null;
    let cancelled = false;

    // Rebuilds a fresh timeline every pass instead of relying on
    // repeat: -1 across a shared proxy — every cycle guaranteed to
    // start clean at n = 0.
    const playCycle = () => {
      if (cancelled) return;
      const proxy = { n: 0 };
      setTypedText(0);

      cycleTimeline = gsap
        .timeline({ onComplete: playCycle })
        .to(proxy, {
          n: HERO_LINE_1.length,
          duration: HERO_LINE_1.length * TYPE_SPEED,
          ease: "none",
          onUpdate: () => setTypedText(proxy.n),
        })
        .to({}, { duration: MID_PAUSE })
        .to(proxy, {
          n: HERO_FULL_TEXT.length,
          duration: (HERO_FULL_TEXT.length - HERO_LINE_1.length) * TYPE_SPEED,
          ease: "none",
          onUpdate: () => setTypedText(proxy.n),
        })
        .to({}, { duration: HOLD })
        .to(proxy, {
          n: 0,
          duration: HERO_FULL_TEXT.length * BACK_SPEED,
          ease: "none",
          onUpdate: () => setTypedText(proxy.n),
        })
        .to({}, { duration: LOOP_PAUSE });
    };

    const start = gsap.delayedCall(0.4, playCycle);

    return () => {
      cancelled = true;
      start.kill();
      if (cycleTimeline) cycleTimeline.kill();
    };
  }, []);

  return (
    <Section
      id="hero"
      className="h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0D0D0D]"
    >
      <HeroVideoBackground />

      {/* Faint corner coordinates — reinforces the "blueprint" feel */}
      <span className="absolute top-24 md:top-20 left-6 md:left-10 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-[#c9c9c9] uppercase">
        <img src={logo} alt="Bashcraft" className="h-5 w-5 object-contain" />
        Bashcraft / Dev Club
      </span>
      <span className="hidden md:block absolute top-20 right-6 md:right-10 font-mono text-[11px] tracking-[0.25em] text-[#c9c9c9] uppercase">
        Est. Community
      </span>

      <div className="relative flex flex-col items-center text-center px-6">
        <Eyebrow>About the club</Eyebrow>

        {/* Premium headline scale, not a giant banner — the terminal motto
            is the focal point, but it stays elegant and restrained. */}
        <h1
          aria-label="No fluff. Only asli engineering."
          className="mt-7 font-mono font-bold text-[clamp(1.75rem,5.2vw,3.5rem)] leading-[1.35] tracking-tight whitespace-pre-line"
        >
          <span ref={whiteRef} aria-hidden="true" className="text-[#F5F5F0]">
            {HERO_LINE_1 + HERO_WHITE_TAIL}
          </span>
          <span ref={accentRef} aria-hidden="true" style={{ color: ACCENT_COLOR }}>
            {HERO_ACCENT_WORD}
          </span>
          <span
            ref={cursorRef}
            aria-hidden="true"
            className="inline-block w-[0.5ch] -mb-1 ml-1"
            style={{ height: "0.85em", backgroundColor: ACCENT_COLOR }}
          />
        </h1>

        <p
          ref={subtitleRef}
          className="mt-8 max-w-md font-body text-sm md:text-base text-[#A0A0A0] leading-relaxed"
        >
          Engineering ideas into impactful products and empowering the next
          generation of innovators.
        </p>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.25em] text-[#3a3a3a] uppercase">
          Scroll
        </span>
        <span className="h-9 w-px bg-gradient-to-b from-[#3a3a3a] to-transparent" />
      </div>
    </Section>
  );
}

/* --------------------------------- Sections -------------------------------- */

function VisionSection() {
  const sectionRef = useRef(null); // ScrollTrigger root + mouse-tilt target
  const eyebrowRef = useRef(null); // "01 — Vision" — first to reveal
  const headingRef = useRef(null); // "VISION" — slides from left
  const paraGroupRef = useRef(null); // paragraphs — fade upward
  const logoCardRef = useRef(null); // disc wrapper — fades in
  const logoRef = useRef(null); // the spinning vinyl disc itself — spin + tilt

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        hasMouse: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { reduceMotion, hasMouse } = context.conditions;

        // NOTE: the disc's continuous spin is NOT driven from here anymore —
        // it's a plain CSS animation (see the `animate-[spin_12s_linear_infinite]`
        // class on the disc element below). CSS keyframe animations run on
        // the compositor thread, so they keep playing regardless of JS
        // timing, requestAnimationFrame throttling, or matchMedia quirks in
        // in-app/WebView browsers — which is what was causing the spin to
        // silently never start on some mobile browsers when it was a GSAP
        // tween. This effect now only handles the enter reveal and the
        // desktop-only mouse tilt, both of which are fine to skip outright
        // under reduced motion.

        if (reduceMotion) {
          // Skip the slide-in reveal and mouse-tilt — those are the
          // motion patterns that can genuinely bother reduced-motion
          // users. Show the finished layout immediately. The disc still
          // spins via its own CSS animation regardless of this branch.
          gsap.set(
            [
              eyebrowRef.current,
              headingRef.current,
              paraGroupRef.current,
              logoCardRef.current,
            ],
            { clearProps: "all" }
          );
          return;
        }

        // Starting states for the staggered enter reveal.
        gsap.set(eyebrowRef.current, { y: 14, opacity: 0 });
        gsap.set(headingRef.current, { x: -60, opacity: 0 });
        gsap.set(paraGroupRef.current, { y: 28, opacity: 0 });
        gsap.set(logoCardRef.current, { opacity: 0 });

        // Enter animation — plays once, staggered top-to-bottom, when the
        // section reaches the viewport.
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })
          .to(eyebrowRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          })
          .to(
            headingRef.current,
            { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            "-=0.35"
          )
          .to(
            paraGroupRef.current,
            { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
            "-=0.6"
          )
          .to(
            logoCardRef.current,
            { opacity: 1, duration: 1, ease: "power2.out" },
            "-=0.6"
          );

        // Mouse tilt — only on pointer-fine devices. Applied to the OUTER
        // wrapper (logoCardRef), not the disc itself (logoRef), so it
        // doesn't fight with the disc's own CSS spin animation over the
        // `transform` property. A quickTo setter per axis avoids
        // allocating a new tween on every mousemove event.
        if (hasMouse) {
          const MAX_TILT = 8; // degrees, kept subtle
          const setRotationY = gsap.quickTo(logoCardRef.current, "rotationY", {
            duration: 0.7,
            ease: "power3.out",
          });
          const setRotationX = gsap.quickTo(logoCardRef.current, "rotationX", {
            duration: 0.7,
            ease: "power3.out",
          });
          gsap.set(logoCardRef.current, { transformPerspective: 600 });

          const handlePointerMove = (e) => {
            const bounds = sectionRef.current.getBoundingClientRect();
            const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
            const relY = (e.clientY - bounds.top) / bounds.height - 0.5;
            setRotationY(relX * MAX_TILT * 2);
            setRotationX(-relY * MAX_TILT * 2);
          };

          const section = sectionRef.current;
          section.addEventListener("mousemove", handlePointerMove, {
            passive: true,
          });

          return () => {
            section.removeEventListener("mousemove", handlePointerMove);
          };
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="vision"
      className="flex items-center bg-[#0D0D0D] py-24 md:py-28 overflow-hidden"
    >
      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] md:items-center gap-14 md:gap-10 px-6 md:px-10">
        {/* Left — narrative */}
        <div className="flex flex-col justify-center">
          <span ref={eyebrowRef} className="inline-block">
            <Eyebrow>01 — Vision</Eyebrow>
          </span>
          <h2
            ref={headingRef}
            className="mt-8 font-display font-bold text-7xl md:text-9xl leading-[0.92] tracking-tight text-[#F5F5F0]"
          >
            VISION
          </h2>
          <div ref={paraGroupRef}>
            <p className="mt-12 font-body text-sm md:text-base leading-relaxed text-[#A0A0A0] max-w-md">
              Welcome to Bashcraft, a community of engineering students
              following the path of Asli Engineering. Our motto "no fluff,
              only asli engineering" resonates through the work of all our
              members, as we come up with a community of innovators ready
              to take on the world.
            </p>
            <p className="mt-6 font-body text-sm md:text-base leading-relaxed text-[#A0A0A0] max-w-md">
              With a focus on passion, productivity, and perseverance, we
              as a community introduce engineering enthusiasts to this
              domain and everything it has to offer. Bringing a realistic
              touch to our pedagogy makes us stand apart from the cliché.
            </p>
          </div>
        </div>

        {/* Right — spinning vinyl disc mark, centered cleanly in its
            column with no external tonearm, so it reads as a self
            contained record rather than a turntable rig. */}
        <div className="flex items-center justify-center">
          <div
            ref={logoCardRef}
            className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] aspect-square mx-auto"
          >
            {/* Soft ambient glow behind the disc — primary orange accent,
                used sparingly as a glow rather than a fill */}
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, #FF6A00 0%, transparent 70%)" }}
            />

            {/* The disc itself — grooves via a repeating radial gradient,
                a dark vinyl base, and a slim rim highlight. */}
            <div
              ref={logoRef}
              className="will-change-transform relative h-full w-full rounded-full animate-[spin_12s_linear_infinite]"
              style={{
                background:
                  "repeating-radial-gradient(circle at 50% 50%, #1c1c1c 0px, #1c1c1c 2px, #0a0a0a 2px, #0a0a0a 5px)",
                boxShadow:
                  "inset 0 0 3px rgba(245,245,240,0.06), inset 0 0 50px rgba(0,0,0,0.9), 0 25px 70px -25px rgba(0,0,0,0.85), 0 0 0 1px #222222",
              }}
            >
              {/* Rim highlight */}
              <div className="absolute inset-0 rounded-full border border-[#F5F5F0]/5 pointer-events-none" />

              {/* Center label — crimson red, like a record's paper label —
                  carrying the real logo, with a couple of faint concentric
                  rings in the orange accent for authenticity. */}
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="relative h-[38%] w-[38%] rounded-full grid place-items-center overflow-hidden border-2 border-[#FF6A00]/40"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #B00020 0%, #8A0F1A 55%, #2b0409 100%)",
                    boxShadow: "inset 0 0 16px rgba(0,0,0,0.65)",
                  }}
                >
                  <span className="absolute inset-[12%] rounded-full border border-[#FF6A00]/25 pointer-events-none" />
                  <span className="absolute inset-[20%] rounded-full border border-[#FF6A00]/15 pointer-events-none" />
                  <img
                    src={logo}
                    alt="Bashcraft logo"
                    className="relative w-full h-full object-cover drop-shadow-[0_2px_5px_rgba(0,0,0,0.55)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Stand-in visuals for the three pillars — abstract, monochrome/accent
// vector art generated at build time, standing in for real photography
// until it's available. Swap BUILD_IMAGE_SRC / CREATE_IMAGE_SRC /
// INSPIRE_IMAGE_SRC for actual photos later; the panel layout, hover
// caption, and lazy-load gate below all stay exactly the same.
// Left-to-right order matters here — it drives the grid below directly.
// These are your real photos, imported like the logo/hero video above —
// drop pillar-build.jpg / pillar-create.jpg / pillar-inspire.jpg into
// src/assets/ (or update the import paths at the top of this file to
// match whatever filenames you actually used).
const COMMUNITY_PILLARS = [
  {
    index: "01",
    word: "BUILD.",
    description: "Real products, real deadlines — no fluff, just asli engineering.",
    src: pillarBuildImage,
  },
  {
    index: "02",
    word: "CREATE.",
    description: "Design systems, reels, and tools members actually reach for.",
    src: pillarCreateImage,
  },
  {
    index: "03",
    word: "INSPIRE.",
    description: "Mentor the next builder — zero gatekeeping, always sharper.",
    src: pillarInspireImage,
  },
];


function CommunitySection() {
  const sectionRef = useRef(null); // ScrollTrigger root — entrance reveal
  const panelRefs = useRef([]);
  panelRefs.current = [];
  const registerPanelRef = (el) => {
    if (el) panelRefs.current.push(el);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions.reduceMotion) {
        gsap.set(panelRefs.current, { opacity: 1, y: 0 });
        return;
      }

      // Panels fade/slide in left-to-right as the row scrolls into view.
      // The hover reveal on each word is pure CSS (group-hover), so it
      // works immediately, independent of this entrance animation.
      gsap.set(panelRefs.current, { opacity: 0, y: 30 });
      gsap.to(panelRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="community"
      className="w-full bg-[#0D0D0D]"
    >
      {/* Left to right, one panel per pillar. Stacks on small screens
          (three narrow columns don't read well on a phone) and sits as a
          single row from the md breakpoint up. */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {COMMUNITY_PILLARS.map((pillar) => (
          <div
            key={pillar.word}
            ref={registerPanelRef}
            className="group relative h-[55vh] md:h-[85vh] w-full overflow-hidden border-b md:border-b-0 md:border-r border-[#F5F5F0]/10 last:border-none"
          >
            <img
              src={pillar.src}
              alt={pillar.word}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ filter: "grayscale(1) contrast(1.1)" }}
            />

            {/* Dark overlay — darkens further on hover so the crimson
                word reads clearly against the image. */}
            <div className="absolute inset-0 bg-[#0D0D0D]/55 transition-colors duration-500 group-hover:bg-[#0D0D0D]/75" />

            {/* Hover reveal — a small "01 — Build" style eyebrow above the
                word (matching the Vision/Membership section labels),
                the word itself in crimson, then a one-line "no fluff"
                description. Each rises in with a slightly longer delay
                than the one before it, so they cascade rather than pop
                in all at once. */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
              <span
                className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#F5F5F0]/70 opacity-0 -translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
                style={{ transitionDelay: "0ms" }}
              >
                {pillar.index} — {pillar.word.replace(".", "")}
              </span>
              <span
                className="font-display font-bold uppercase tracking-tight text-[clamp(2rem,5vw,3.75rem)] opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
                style={{ color: "#B00020", transitionDelay: "80ms" }}
              >
                {pillar.word}
              </span>
              <p
                className="max-w-[230px] font-body text-sm leading-relaxed text-[#F5F5F0]/75 opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
                style={{ transitionDelay: "150ms" }}
              >
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <span className="absolute bottom-4 left-6 md:left-10 font-mono text-[11px] tracking-[0.25em] text-[#F5F5F0]/40 uppercase">
        The Community
      </span>
    </Section>
  );
}

// Static content — defined once at module scope so it never gets
// recreated on re-render (e.g. every hover state change).
const WHY_JOIN_PANELS = [
  {
    title: "LEARN",
    description:
      "Workshops and pairing sessions that trade theory for hands-on, production-grade practice.",
    reveal:
      "Weekly sessions on real stacks, taught by members already shipping with them.",
  },
  {
    title: "BUILD",
    description:
      "Ship real products in focused sprints, from first commit to a live, working release.",
    reveal:
      "Team sprints with a real deadline, a real repo, and a real audience at the end.",
  },
  {
    title: "NETWORK",
    description:
      "Meet engineers, founders, and alumni already working on the problems you care about.",
    reveal: "Small-group intros over demo nights, not conference-hall small talk.",
  },
  {
    title: "LEAD",
    description:
      "Run a project, mentor a cohort, and grow into the engineer other members look up to.",
    reveal: "Own a track, mentor newer members, and shape what the club builds next.",
  },
];

function WhyJoinSection() {
  const sectionRef = useRef(null); // scroll-reveal trigger for the intro copy
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const introParaRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const targets = [
          eyebrowRef.current,
          headingRef.current,
          introParaRef.current,
        ];

        if (context.conditions.reduceMotion) {
          gsap.set(targets, { clearProps: "all" });
          return;
        }

        gsap.set(targets, { y: 20, opacity: 0 });

        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="why-join"
      className="bg-[#0D0D0D] py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <span ref={eyebrowRef} className="inline-block">
          <Eyebrow>02 — Membership</Eyebrow>
        </span>
        <h2
          ref={headingRef}
          className="mt-6 font-display font-bold text-6xl md:text-7xl tracking-tight text-[#F5F5F0] max-w-2xl"
        >
          WHY JOIN BASHCRAFT
        </h2>
        <p
          ref={introParaRef}
          className="mt-6 font-body text-sm md:text-base text-[#7a7a7a] max-w-xl"
        >
          Four reasons members stay long after their first semester.
        </p>
      </div>

      <div className="mt-14 md:mt-16 flex flex-col gap-3 md:gap-4">
        {WHY_JOIN_PANELS.map((panel, i) => (
          <JoinPanel
            key={panel.title}
            index={`0${i + 1}`}
            title={panel.title}
            description={panel.description}
            reveal={panel.reveal}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------- Page ----------------------------------- */

export default function AboutBashcraft() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0D0D0D] text-[#F5F5F0] font-body">
        <HeroSection />
        <VisionSection />
        <CommunitySection />
        <WhyJoinSection />
      </main>
    </>
  );
}
