import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LABELS = ["SYSTEM ACTIVE", "EVENT LOG", "PROTOCOLS", "LIVE"];

export function HeroArchive() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[color:var(--surface)]"
    >
      <div className="absolute inset-0 grid-noise opacity-50" aria-hidden />
      <div className="absolute inset-0 scanlines opacity-40" aria-hidden />
      <div className="pointer-events-none absolute inset-0 spotlight" aria-hidden />
      <div
        className="pointer-events-none absolute left-0 right-0 top-[38%] h-px bg-gradient-to-r from-transparent via-flame to-transparent opacity-70 animate-flame-pulse"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-stark-white/30 to-transparent"
        aria-hidden
      />

      <Particles />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mb-16 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="mono-label flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-flame animate-flame-pulse" />
            SYSTEM ACTIVE
          </div>
          <div className="mono-label hidden sm:block">BASHCRAFT / CLUB / VIT BHOPAL</div>
          <div className="mono-label flex items-center gap-2">
            <span className="tabular-nums">v.2026</span>
            <span className="text-stark-white/30">/</span>
            <span className="text-flame">LIVE</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mono-label mb-4 text-flame"
        >
          — EVENT LOG · 004 ENTRIES ARCHIVED
        </motion.div>

        <h1 className="font-display font-bold uppercase leading-[0.85] tracking-tight text-[clamp(4rem,18vw,14rem)]">
          <TitleLine text="EVENTS" delay={0.2} />
          <TitleLine text="ARCHIVE" delay={0.5} accent />
        </h1>

        <div className="mt-12 grid grid-cols-1 items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="max-w-md text-sm leading-relaxed text-[color:var(--ink-muted)] sm:text-base"
          >
            An index of every gathering, hackathon, and conversation. Each entry a signal from a
            moment that pushed the club forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {LABELS.map((l) => (
              <div key={l} className="mono-label flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-flame" />
                {l}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="mono-label absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <span className="inline-block animate-float-slow">↓ SCROLL TO ENTER</span>
      </motion.div>
    </section>
  );
}

function TitleLine({
  text,
  delay = 0,
  accent = false,
}: {
  text: string;
  delay?: number;
  accent?: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`block ${accent ? "text-stark-white [text-shadow:0_0_60px_rgba(255,106,0,0.35)]" : "text-stark-white"}`}
      >
        {text}
      </motion.span>
    </span>
  );
}

function Particles() {
  const items = Array.from({ length: 22 }).map((_, i) => ({
    left: (i * 37) % 100,
    top: (i * 53) % 100,
    dur: 8 + ((i * 3) % 10),
    delay: (i % 6) * 0.4,
    size: 1 + ((i * 11) % 3),
    i,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {items.map((p) => (
        <motion.span
          key={p.i}
          className="absolute rounded-full bg-flame/70"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            filter: "blur(0.5px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0], y: [-10, -60] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
