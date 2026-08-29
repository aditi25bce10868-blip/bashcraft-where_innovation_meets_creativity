import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Share2, Clock } from "lucide-react";
import { ScrollProgress } from "./ScrollProgress";
import { BackToTop } from "./BackToTop";
import { CursorGlow } from "./CursorGlow";

type Props = {
  eyebrow: string;
  title: string;
  date?: string;
  tag?: string;
  cover: string;
  coverAlt: string;
  readingMinutes?: number;
  children: ReactNode;
};

export function EventPageShell({
  eyebrow,
  title,
  date,
  tag,
  cover,
  coverAlt,
  readingMinutes = 3,
  children,
}: Props) {
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    const key = `scroll:${window.location.pathname}`;
    const saved = sessionStorage.getItem(key);
    if (saved) window.scrollTo({ top: parseInt(saved, 10) });
    const onScroll = () => sessionStorage.setItem(key, String(window.scrollY));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch {
      // User dismissed the native share sheet or clipboard access was denied — nothing to recover.
    }
  };

  return (
    <div className="relative min-h-screen bg-[color:var(--surface)] text-stark-white">
      <ScrollProgress />
      <CursorGlow />

      <div className="fixed left-4 top-4 z-[65] sm:left-6 sm:top-6">
        <Link
          to="/events"
          className="glass-card mono-label inline-flex items-center gap-2 rounded-full px-3 py-2 text-stark-white/80 transition hover:text-flame"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Archive</span>
        </Link>
      </div>

      <div className="fixed right-4 top-4 z-[65] flex items-center gap-2 sm:right-6 sm:top-6">
        <div className="glass-card mono-label hidden items-center gap-2 rounded-full px-3 py-2 text-stark-white/70 sm:inline-flex">
          <Clock className="h-3.5 w-3.5" />
          <span>{readingMinutes} min read</span>
        </div>
        <button
          onClick={share}
          className="glass-card mono-label inline-flex items-center gap-2 rounded-full px-3 py-2 text-stark-white/80 transition hover:text-flame"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>{copied ? "Copied" : "Share"}</span>
        </button>
      </div>

      <section ref={heroRef} className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
        <motion.img
          src={cover}
          alt={coverAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ y }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--surface)] via-[color:var(--surface)]/40 to-transparent" />
        <div className="absolute inset-0 grid-noise opacity-20" />
        <div className="absolute inset-0 scanlines opacity-15" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mono-label mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-flame animate-flame-pulse" />
              {eyebrow}
            </span>
            {date && <span className="hidden sm:inline text-stark-white/40">/</span>}
            {date && <span>{date}</span>}
            {tag && <span className="hidden sm:inline text-stark-white/40">/</span>}
            {tag && <span className="text-flame">{tag}</span>}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl"
          >
            {title}
          </motion.h1>
        </div>
      </section>

      <main className="relative mx-auto max-w-4xl px-6 py-20 sm:px-10 sm:py-32">{children}</main>

      <footer className="border-t hairline px-6 py-10 text-center sm:px-10">
        <p className="mono-label">BashCraft Club · VIT Bhopal · Event Archive</p>
      </footer>

      <BackToTop />
    </div>
  );
}
