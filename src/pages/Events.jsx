import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/events/Reveal";
import { HeroArchive } from "@/components/events/HeroArchive";
import { SmoothScroll } from "@/components/events/SmoothScroll";
import { CursorGlow } from "@/components/events/CursorGlow";
import { ScrollProgress } from "@/components/events/ScrollProgress";
import { BackToTop } from "@/components/events/BackToTop";
import { Marquee } from "@/components/events/Marquee";
import Navbar from "@/components/Navbar";

/**
 * Events.jsx — Final consolidated Events page for BashCraft Club.
 * Renders the hero + Upcoming / Archive typographic lists.
 *
 * Speakers (BashNex'26) with domains:
 *   UI/UX             → Avinash Bussa
 *   AI + Prompt       → Mukesh Kala
 *   Manager/VP/PIS    → Azmina Poddar
 *   HR                → Dr. Ashish Mittal
 *   Mechanical        → Mahesh Kumar Singh
 *   Software          → Saptarshi De
 *   Quant Finance     → Harshil Chaudhary
 *   Automobile        → Parul Pradhan
 */

const upcoming = [
  {
    slug: "/events/social-loop",
    index: "01",
    title: "Social Loop",
    category: "Stage · Freshers' Talent Show",
    date: "13 SEP · 2026",
  },
];

const archived = [
  {
    slug: "/events/bashnex26",
    index: "01",
    title: "BashNex'26",
    category: "Flagship · The Spectrum Of Tech",
    date: "13 – 14 JUN · 2026",
  },
  {
    slug: "/events/arpit-bhayani",
    index: "02",
    title: "TechTalk with Arpit Bhayani",
    category: "Guest Session",
    date: "ARCHIVED",
  },
  {
    slug: "/events/investathon",
    index: "03",
    title: "Investathon",
    category: "Finance Hackathon × Zerodha",
    date: "26 · MAR",
  },
];

export default function Events() {
  return (
    <div
      className="relative min-h-screen bg-[#0D0D0D] text-[#F5F5F0]"
      style={{
        "--surface": "#0D0D0D",
        "--surface-light": "#F5F5F0",
        "--flame": "#FF6A00",
        "--crimson": "#8A0F1A",
        "--crimson-bright": "#B00020",
      }}
    >
      <SmoothScroll />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <HeroArchive />

      <EventList
        eyebrow="// 01 · UPCOMING"
        heading="Upcoming"
        empty="Nothing on the calendar yet — stay tuned."
        items={upcoming}
        accent="orange"
      />

      <EventList
        eyebrow="// 02 · ARCHIVE"
        heading="Archived"
        empty="No archived events."
        items={archived}
        accent="crimson"
      />

      <Marquee
        words={[
          "TALKS",
          "HACKATHONS",
          "COMMUNITY",
          "BUILD",
          "SHIP",
          "REPEAT",
          "SIGNAL",
          "BASHCRAFT",
        ]}
      />

      <BackToTop />
    </div>
  );
}

function EventList({ eyebrow, heading, items, empty, accent }) {
  const isOrange = accent === "orange";

  const accentColor = isOrange ? "#FF6A00" : "#B00020";

  return (
    <section className="relative border-t border-[#F5F5F0]/10 bg-[#0D0D0D] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10">
          <div
            className="mono-label mb-3"
            style={{ color: accentColor }}
          >
            {eyebrow}
          </div>

          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-[#F5F5F0] sm:text-6xl">
            {heading}
          </h2>
        </Reveal>

        {items.length === 0 ? (
          <p className="mono-label text-[#F5F5F0]/50">
            {empty}
          </p>
        ) : (
          <ul className="divide-y divide-[#F5F5F0]/10 border-y border-[#F5F5F0]/10">
            {items.map((it, i) => (
              <li key={it.slug}>
                <Reveal delay={i * 0.05}>
                  <Link
                    to={it.slug}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition sm:grid-cols-[3rem_1fr_auto_auto] sm:gap-8 sm:py-8"
                  >
                    <span
                      className="mono-label"
                      style={{ color: accentColor }}
                    >
                      {it.index}
                    </span>

                    <div className="min-w-0">
                      <h3
                        className="font-display text-2xl font-semibold leading-tight tracking-tight text-[#F5F5F0] transition sm:text-4xl"
                        style={{
                          "--accent-hover": accentColor,
                        }}
                      >
                        {it.title}
                      </h3>

                      <div className="mono-label mt-2 text-[#F5F5F0]/50">
                        {it.category}
                      </div>
                    </div>

                    <span className="mono-label hidden text-[#F5F5F0]/60 sm:inline">
                      {it.date}
                    </span>

                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#F5F5F0]/20 text-[#F5F5F0]/70 transition-all duration-500"
                      style={{
                        "--accent-color": accentColor,
                      }}
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-45" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Color-only hover rules */}
      <style>{`
        .group:hover h3 {
          color: ${accentColor};
        }

        .group:hover span:last-child {
          border-color: ${accentColor};
          background-color: ${accentColor};
          color: #0D0D0D;
        }
      `}</style>
    </section>
  );
}