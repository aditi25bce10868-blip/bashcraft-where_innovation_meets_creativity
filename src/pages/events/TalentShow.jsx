import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, ArrowLeft } from "lucide-react";
import { MagneticButton } from "@/components/events/MagneticButton";
import { CursorGlow } from "@/components/events/CursorGlow";
import { ScrollProgress } from "@/components/events/ScrollProgress";
import { SmoothScroll } from "@/components/events/SmoothScroll";

export default function TalentShow() {
  const [notified, setNotified] = useState(false);
  const [{ d, h, m, s }, setC] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = Date.now() + 60 * 86400_000;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setC({
        d: Math.floor(diff / 86400_000),
        h: Math.floor((diff / 3600_000) % 24),
        m: Math.floor((diff / 60_000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--surface)] text-white">
      <SmoothScroll />
      <ScrollProgress />
      <CursorGlow />

      <div className="fixed left-4 top-4 z-[65] sm:left-6 sm:top-6">
        <Link
          to="/"
          className="glass-card mono-label inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/80 transition hover:text-flame"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Archive
        </Link>
      </div>

      <div className="absolute inset-0 grid-noise opacity-40" />
      <div className="absolute inset-0 scanlines opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/10 blur-[120px] animate-flame-pulse" />

      <FloatingSparks />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mono-label mb-8 flex items-center gap-3 text-flame"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-flame animate-flame-pulse" />
          UNDISCLOSED · ENTRY 01
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold uppercase leading-[0.85] tracking-tighter text-[clamp(4rem,16vw,13rem)]"
        >
          <span className="block animate-glitch">COMING</span>
          <span className="block text-flame [text-shadow:0_0_60px_rgba(249,115,22,0.6)]">SOON</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-white/40 sm:gap-6"
        >
          {["?", "?", "?", "?", "?"].map((q, i) => (
            <span
              key={i}
              className="font-display text-5xl font-bold animate-float-slow"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {q}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-4 gap-2 sm:gap-4"
        >
          {[
            { l: "DAYS", v: d },
            { l: "HRS", v: h },
            { l: "MIN", v: m },
            { l: "SEC", v: s },
          ].map((c) => (
            <div
              key={c.l}
              className="glass-card min-w-[70px] rounded-xl px-4 py-4 sm:min-w-[110px] sm:px-6 sm:py-5"
            >
              <div className="font-display text-3xl font-bold tabular-nums text-white sm:text-5xl">
                {String(c.v).padStart(2, "0")}
              </div>
              <div className="mono-label mt-1 text-white/50">{c.l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <MagneticButton onClick={() => setNotified(true)}>
            <Bell className="h-4 w-4" />
            {notified ? "You'll be the first to know" : "Notify Me"}
          </MagneticButton>
        </motion.div>

        <div className="mono-label mt-14 text-white/40">// NO OTHER INFORMATION AVAILABLE</div>
      </section>
    </div>
  );
}

function FloatingSparks() {
  const items = Array.from({ length: 30 }).map((_, i) => ({
    left: (i * 41) % 100,
    top: (i * 67) % 100,
    dur: 4 + ((i * 7) % 8),
    delay: (i % 8) * 0.35,
    size: 1 + ((i * 13) % 3),
    i,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {items.map((p) => (
        <motion.span
          key={p.i}
          className="absolute rounded-full bg-flame"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 10px rgba(249,115,22,0.8)",
          }}
          animate={{ opacity: [0, 1, 0], y: [0, -80] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
