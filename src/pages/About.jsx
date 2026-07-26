import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import logo from '../assets/bsclogo.png'
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
 *   --bg:        #000000   (Pitch Black)
 *   --card:      #0a0a0a
 *   --text:      #FFFFFF   (Stark White)
 *   --secondary: #A0A0A0
 *   --border:    #222222
 *   --accent:    #FF0000   (Vibrant Scarlet — hover-only, never a resting fill)
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
 * thin white border — the scarlet accent appears ONLY on hover, never as a
 * resting fill, alongside a slight lift and the arrow sliding right.
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
      className="group relative w-full bg-black border border-white/25 transition-colors duration-300 hover:bg-[#FF0000] hover:border-[#FF0000]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 px-6 md:px-10 py-12 md:py-16">
        <div className="flex items-baseline gap-6 md:gap-10">
          <span className="font-mono text-xs tracking-[0.3em] text-white/40 transition-colors duration-300 group-hover:text-black/50">
            {index}
          </span>
          <h3 className="font-display font-bold text-5xl md:text-7xl tracking-tight text-white transition-colors duration-300 group-hover:text-black">
            {title}
          </h3>
        </div>

        <div className="flex items-center md:pl-10">
          <div className="max-w-sm">
            <p className="font-body text-sm md:text-base leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-black/70">
              {description}
            </p>
            <p className="mt-2 font-mono text-xs md:text-sm leading-relaxed text-white/35 transition-colors duration-300 group-hover:text-black/50">
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
const ACCENT_COLOR = "#FF0000";
const HERO_LINE_1 = "NO FLUFF.\n";
const HERO_WHITE_TAIL = "ONLY ";
const HERO_ACCENT_WORD = "ASLI ENGINEERING.";
const HERO_FULL_TEXT = HERO_LINE_1 + HERO_WHITE_TAIL + HERO_ACCENT_WORD;
const HERO_WHITE_LEN = (HERO_LINE_1 + HERO_WHITE_TAIL).length;

// -----------------------------------------------------------------------
// Swap in your own YouTube video ID — copy the part of the share URL after
// "v=" (e.g. https://youtu.be/dQw4w9WgXcQ -> "dQw4w9WgXcQ"). Everything
// else (autoplay, mute, loop, hiding controls/branding, scaling to fully
// cover the Hero regardless of viewport shape) is already wired up below.
// -----------------------------------------------------------------------
const HERO_YOUTUBE_ID = "Ae80XUIr7Mc";

// -----------------------------------------------------------------------
// Loads the YouTube IFrame API script once and resolves when window.YT is
// ready. Safe to call from multiple components — later calls reuse the
// same in-flight/resolved promise instead of injecting the script twice.
// -----------------------------------------------------------------------
let youTubeApiPromise = null;
function loadYouTubeApi() {
  if (youTubeApiPromise) return youTubeApiPromise;

  youTubeApiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === "function") previousReady();
      resolve(window.YT);
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });

  return youTubeApiPromise;
}

/**
 * Full-bleed YouTube background for the Hero. Muted, chromeless,
 * desaturated to match the monochrome brand, and dimmed under a dark scrim
 * so the terminal headline stays legible on top of it. Autoplay is skipped
 * for people who've asked their OS for reduced motion.
 *
 * Looping is handled via the IFrame API rather than the `loop` URL param:
 * a short poll rewinds the video to 0 a fraction of a second before it
 * would actually finish, so it never reaches the native "ended" state and
 * YouTube's own paused/replay/skip overlay never has a chance to flash.
 */
function HeroVideoBackground() {
  const mountRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let pollId = null;
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return;

      playerRef.current = new YT.Player(mountRef.current, {
        videoId: HERO_YOUTUBE_ID,
        playerVars: {
          autoplay: reduceMotion ? 0 : 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            if (!reduceMotion) e.target.playVideo();
          },
          onStateChange: (e) => {
            // Belt-and-suspenders: if it ever does reach "ended" (a stray
            // frame drop in the poll below, a slow tab, etc.) snap it back
            // to the start immediately rather than showing the end screen.
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(0, true);
              e.target.playVideo();
            }
          },
        },
      });
    });

    // Rewind slightly before the natural end, every 250ms — the video
    // effectively loops seamlessly and never technically "ends".
    pollId = window.setInterval(() => {
      const player = playerRef.current;
      if (
        !player ||
        typeof player.getCurrentTime !== "function" ||
        typeof player.getDuration !== "function"
      ) {
        return;
      }
      const duration = player.getDuration();
      const current = player.getCurrentTime();
      if (duration > 0 && duration - current < 0.4) {
        player.seekTo(0, true);
      }
    }, 250);

    return () => {
      cancelled = true;
      if (pollId) window.clearInterval(pollId);
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
      }
      playerRef.current = null;
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Classic 16:9-cover trick: oversize on whichever axis the viewport
          is short on, so the frame always fills the section with no
          letterboxing, then re-center it. */}
      <div
        className="absolute top-1/2 left-1/2 w-screen h-[56.25vw] min-h-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2"
        style={{ filter: "grayscale(1) contrast(1.15) brightness(0.55)" }}
      >
        <div ref={mountRef} className="absolute inset-0 h-full w-full" />
      </div>
      {/* Dark scrim — keeps the copy legible over the reel */}
      <div className="absolute inset-0 bg-black/70" />
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
      className="h-screen flex flex-col items-center justify-center overflow-hidden bg-[#000000]"
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
          <span ref={whiteRef} aria-hidden="true" className="text-white">
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
  const watermarkRef = useRef(null); // giant background mark — scroll scale
  const eyebrowRef = useRef(null); // "01 — Vision" — first to reveal
  const headingRef = useRef(null); // "VISION" — slides from left
  const paraGroupRef = useRef(null); // paragraphs — fade upward
  const logoCardRef = useRef(null); // bordered card — fades in
  const logoRef = useRef(null); // real logo image inside the card — spin + tilt

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        hasMouse: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { reduceMotion, hasMouse } = context.conditions;

        if (reduceMotion) {
          // Show the finished layout immediately — no slide, no spin,
          // no scroll-tied scale, no tilt.
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

        // Watermark — very slow, subtle scale tied directly to scroll
        // position as the section passes through the viewport.
        gsap.fromTo(
          watermarkRef.current,
          { scale: 1 },
          {
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // Main logo — continuous, very slow rotation (one turn / 20s max).
        const spin = gsap.to(logoRef.current, {
          rotate: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });

        // Mouse tilt — only on pointer-fine devices. A quickTo setter per
        // axis avoids allocating a new tween on every mousemove event.
        if (hasMouse) {
          const MAX_TILT = 8; // degrees, kept subtle
          const setRotationY = gsap.quickTo(logoRef.current, "rotationY", {
            duration: 0.7,
            ease: "power3.out",
          });
          const setRotationX = gsap.quickTo(logoRef.current, "rotationX", {
            duration: 0.7,
            ease: "power3.out",
          });
          gsap.set(logoRef.current, { transformPerspective: 600 });

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
            spin.kill();
          };
        }

        return () => spin.kill();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="vision"
      className="flex items-center bg-[#000000] py-24 md:py-28 overflow-hidden"
    >
      {/* Giant low-opacity watermark — the real Bashcraft logo, desaturated
          so it reads as a faint mark rather than a colored graphic */}
      <img
        ref={watermarkRef}
        src={logo}
        alt=""
        aria-hidden="true"
        className="will-change-transform pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 w-[110vw] max-w-[1200px] opacity-[0.05] object-contain"
        style={{ filter: "grayscale(1) brightness(2)" }}
      />

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-10 px-6 md:px-10">
        {/* Left — narrative */}
        <div className="flex flex-col justify-center">
          <span ref={eyebrowRef} className="inline-block">
            <Eyebrow>01 — Vision</Eyebrow>
          </span>
          <h2
            ref={headingRef}
            className="mt-8 font-display font-bold text-7xl md:text-9xl leading-[0.92] tracking-tight text-white"
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

        {/* Right — logo mark */}
        <div className="flex items-center justify-center">
          <div
            ref={logoCardRef}
            className="relative flex items-center justify-center w-full aspect-square max-w-[760px] rounded-2xl border border-[#222222] bg-[#101010] p-16"
          >
            <img
              ref={logoRef}
              src={logo}
              alt="Bashcraft logo"
              className="will-change-transform w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

// Stand-in for the real photograph — an abstract, monochrome silhouette of a
// long workspace table with laptop glow, evoking the hackathon/engineering
// scene the section is about. Swap COMMUNITY_IMAGE_SRC for actual photography
// once it's available; the lazy-load gate, native `loading="lazy"`, and
// `decoding="async"` below are already wired up for it.
const COMMUNITY_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
  <defs>
    <radialGradient id="vignette" cx="50%" cy="32%" r="78%">
      <stop offset="0%" stop-color="#1c1c1c"/>
      <stop offset="100%" stop-color="#050505"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e9e9e9" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#e9e9e9" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#vignette)"/>
  <rect x="0" y="642" width="1600" height="3" fill="#2a2a2a"/>
  ${[190, 440, 690, 940, 1190, 1430]
    .map(
      (x, i) => `
    <ellipse cx="${x}" cy="565" rx="95" ry="58" fill="url(#glow)" opacity="${
        i % 2 === 0 ? 0.5 : 0.32
      }"/>
    <rect x="${x - 58}" y="560" width="116" height="66" rx="6" fill="#111111"/>
    <circle cx="${x}" cy="498" r="34" fill="#0b0b0b"/>
    <rect x="${x - 62}" y="618" width="124" height="190" rx="20" fill="#090909"/>
  `
    )
    .join("")}
</svg>`;
const COMMUNITY_IMAGE_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(
  COMMUNITY_SVG
)}`;

function CommunitySection() {
  const sectionRef = useRef(null); // ScrollTrigger root for this section
  const imageWrapRef = useRef(null); // stable target for zoom + parallax
  const textRef = useRef(null); // overlay copy wrapper — slower parallax
  const wordRefs = useRef([]); // BUILD / CREATE / INSPIRE — individual fade reveals
  wordRefs.current = [];
  const registerWordRef = (el) => {
    if (el) wordRefs.current.push(el);
  };
  const [shouldLoadImage, setShouldLoadImage] = useState(false);

  // Lazy-load gate: only mount the real <img> once the section is close
  // to the viewport, instead of paying for it on initial page load.
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadImage(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { reduceMotion } = context.conditions;

        if (reduceMotion) {
          gsap.set(imageWrapRef.current, { scale: 1, y: 0 });
          gsap.set(textRef.current, { y: 0 });
          gsap.set(wordRefs.current, { opacity: 1, y: 0 });
          return;
        }

        // One shared, scrubbed timeline drives both the slow entry zoom and
        // the full-scroll parallax, instead of separate ScrollTriggers —
        // fewer scroll listeners means less work per frame.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.fromTo(
          imageWrapRef.current,
          { scale: 1 },
          { scale: 1.08, duration: 1, ease: "none" },
          0
        ).fromTo(
          textRef.current,
          { y: -22 },
          { y: 22, duration: 1, ease: "none" },
          0
        );

        // Words reveal one at a time as the section scrolls into view;
        // earlier words stay dimly visible rather than disappearing.
        gsap.set(wordRefs.current, { opacity: 0, y: 26 });
        gsap.to(wordRefs.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.22,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
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
      id="community"
      className="h-[100svh] w-full bg-[#000000]"
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* Stable wrapper — zoom + parallax target never changes identity,
            even as the placeholder is swapped for the lazy-loaded image. */}
        <div
          ref={imageWrapRef}
          className="will-change-transform absolute inset-0 origin-center"
        >
          {shouldLoadImage ? (
            <img
              src={COMMUNITY_IMAGE_SRC}
              alt="Bashcraft members collaborating during a build session"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: "grayscale(1) contrast(1.1)" }}
            />
          ) : (
            <div className="absolute inset-0 bg-[#0c0c0c]" />
          )}
        </div>

        {/* Subtle dark overlay — keeps the image visible while the copy stays readable */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Editorial overlay copy — clean, generously spaced, words don't overlap */}
        <div
          ref={textRef}
          className="will-change-transform relative h-full w-full flex flex-col items-center justify-center gap-5 md:gap-7 px-6"
        >
          {["BUILD.", "CREATE.", "INSPIRE."].map((word) => (
            <span
              key={word}
              ref={registerWordRef}
              className="font-display font-bold uppercase leading-[0.95] text-[clamp(2.75rem,9vw,7rem)] text-white text-center tracking-tight"
            >
              {word}
            </span>
          ))}
        </div>

        <span className="absolute bottom-8 left-6 md:left-10 font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">
          The Community
        </span>
      </div>
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
      className="bg-[#000000] py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <span ref={eyebrowRef} className="inline-block">
          <Eyebrow>02 — Membership</Eyebrow>
        </span>
        <h2
          ref={headingRef}
          className="mt-6 font-display font-bold text-6xl md:text-7xl tracking-tight text-white max-w-2xl"
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
      <main className="bg-[#000000] text-white font-body">
        <HeroSection />
        <VisionSection />
        <CommunitySection />
        <WhyJoinSection />
      </main>
    </>
  );
}
