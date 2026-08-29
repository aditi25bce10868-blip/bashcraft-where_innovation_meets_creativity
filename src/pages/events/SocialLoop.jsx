import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Clock, Mail, Users, Sparkles, Bell } from "lucide-react";
import { EventPageShell } from "@/components/events/EventPageShell";
import { Reveal } from "@/components/events/Reveal";
import { MagneticButton } from "@/components/events/MagneticButton";
import cover from "@/assets/events/social-loop-cover.jpeg";

// Event date/time — 13 September 2026, 2:00 PM IST (UTC+5:30)
const EVENT_TARGET = new Date("2026-09-13T14:00:00+05:30").getTime();

const FORMATS = ["Solo", "Duo", "Trio", "Squad", "Squad+"];

const CATEGORIES = [
  "Singing",
  "Dance",
  "Stand-up",
  "Acting",
  "Storytelling",
  "Poetry",
  "Beatboxing",
  "and More!",
];

export default function SocialLoop() {
  const [{ d, h, m, s }, setC] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [ended, setEnded] = useState(false);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = EVENT_TARGET - Date.now();
      if (diff <= 0) {
        setC({ d: 0, h: 0, m: 0, s: 0 });
        setEnded(true);
        return;
      }
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
    <EventPageShell
      eyebrow="UPCOMING · FRESHERS' NIGHT"
      title="SOCIAL LOOP"
      date="13 SEP 2026"
      tag="AB-1 AUDI-1"
      cover={cover}
      coverAlt="Social Loop — BashCraft Freshers' Talent Show poster"
      readingMinutes={2}
    >
      {/* Countdown */}
      <Reveal className="mb-16">
        <div className="mono-label mb-4 text-flame">// COUNTDOWN</div>
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {[
            { l: "DAYS", v: d },
            { l: "HRS", v: h },
            { l: "MIN", v: m },
            { l: "SEC", v: s },
          ].map((c) => (
            <div
              key={c.l}
              className="glass-card rounded-xl px-3 py-4 text-center sm:px-6 sm:py-5"
            >
              <div className="font-display text-3xl font-bold tabular-nums text-stark-white sm:text-5xl">
                {String(c.v).padStart(2, "0")}
              </div>
              <div className="mono-label mt-1 text-stark-white/50">{c.l}</div>
            </div>
          ))}
        </div>
        {ended && (
          <p className="mono-label mt-4 text-flame">
            // THE SPOTLIGHT IS LIVE — SEE YOU AT AB-1 AUDI-1
          </p>
        )}
      </Reveal>

      {/* Intro */}
      <Reveal className="mb-16" delay={0.05}>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          The spotlight is waiting.{" "}
          <span className="text-flame">Will you take it?</span>
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-stark-white/60 sm:text-lg">
          Presented by BashCraft Club, Social Loop is VIT Bhopal's freshers' talent show —
          an open stage to unleash whatever you've got. Singing, dance,
          stand-up, acting, storytelling, poetry, beatboxing, and more — come
          solo or bring your whole crew.
        </p>
      </Reveal>

      {/* Details grid */}
      <Reveal className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3" delay={0.1}>
        <DetailCard icon={CalendarDays} label="Date" value="13th September, 2026" />
        <DetailCard icon={MapPin} label="Venue" value="AB-1 AUDI-1, VIT Bhopal" />
        <DetailCard icon={Clock} label="Time" value="2:00 PM – 7:00 PM" />
      </Reveal>

      {/* Categories */}
      <Reveal className="mb-16" delay={0.15}>
        <div className="mono-label mb-4 flex items-center gap-2 text-flame">
          <Sparkles className="h-3.5 w-3.5" /> UNLEASH YOUR TALENT
        </div>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="glass-card rounded-full px-4 py-2 text-sm text-stark-white/80 sm:text-base"
            >
              {c}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Formats */}
      <Reveal className="mb-16" delay={0.2}>
        <div className="mono-label mb-4 flex items-center gap-2 text-flame">
          <Users className="h-3.5 w-3.5" /> PARTICIPATION FORMATS
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {FORMATS.map((f, i) => (
            <span key={f} className="flex items-center gap-3">
              <span className="font-display text-lg font-semibold uppercase tracking-tight text-stark-white sm:text-xl">
                {f}
              </span>
              {i < FORMATS.length - 1 && <span className="text-vibrant-scarlet">|</span>}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Registration */}
      <Reveal delay={0.25}>
        <div className="glass-card flex flex-col items-start gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="mono-label mb-2 flex items-center gap-2 text-stark-white/60">
              <Mail className="h-3.5 w-3.5" /> REGISTRATION
            </div>
            <p className="max-w-md text-stark-white/80">
              The registration mail will be shared soon — keep an eye on your
              inbox. We'll be waiting for you!
            </p>
          </div>
          <MagneticButton onClick={() => setNotified(true)} disabled={notified}>
            <Bell className="h-4 w-4" />
            {notified ? "You'll be the first to know" : "Notify Me"}
          </MagneticButton>
        </div>
      </Reveal>
    </EventPageShell>
  );
}

function DetailCard({ icon: Icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-5 transition-colors hover:border-flame/60"
    >
      <Icon className="h-5 w-5 text-flame" />
      <div className="mono-label mt-3 text-stark-white/50">{label}</div>
      <div className="mt-1 font-display text-lg font-semibold text-stark-white">{value}</div>
    </motion.div>
  );
}

