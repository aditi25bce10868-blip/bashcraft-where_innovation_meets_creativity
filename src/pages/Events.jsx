import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/events/Reveal";
import { HeroArchive } from "@/components/events/HeroArchive";
import { SmoothScroll } from "@/components/events/SmoothScroll";
import { CursorGlow } from "@/components/events/CursorGlow";
import { ScrollProgress } from "@/components/events/ScrollProgress";
import { BackToTop } from "@/components/events/BackToTop";
import { Marquee } from "@/components/events/Marquee";

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
    slug: "/events/talent-show",
    index: "01",
    title: "Talent Show",
    category: "Stage · Community Night",
    date: "TBA",
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
    <div className="relative min-h-screen bg-[color:var(--surface)] text-white">
      <SmoothScroll />
      <ScrollProgress />
      <CursorGlow />
      <HeroArchive />
      <EventList
        eyebrow="// 01 · UPCOMING"
        heading="Upcoming"
        empty="Nothing on the calendar yet — stay tuned."
        items={upcoming}
      />
      <EventList
        eyebrow="// 02 · ARCHIVE"
        heading="Archived"
        empty="No archived events."
        items={archived}
      />
      <Marquee words={["TALKS", "HACKATHONS", "COMMUNITY", "BUILD", "SHIP", "REPEAT", "SIGNAL", "BASHCRAFT"]} />
      <BackToTop />
    </div>
  );
}

function EventList({ eyebrow, heading, items, empty }) {
  return (
    <section className="relative border-t hairline bg-[color:var(--surface)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10">
          <div className="mono-label mb-3 text-flame">{eyebrow}</div>
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
            {heading}
          </h2>
        </Reveal>

        {items.length === 0 ? (
          <p className="mono-label text-white/50">{empty}</p>
        ) : (
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {items.map((it, i) => (
              <li key={it.slug}>
                <Reveal delay={i * 0.05}>
                  <Link
                    to={it.slug}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition sm:grid-cols-[3rem_1fr_auto_auto] sm:gap-8 sm:py-8"
                  >
                    <span className="mono-label text-flame">{it.index}</span>
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight transition group-hover:text-flame sm:text-4xl">
                        {it.title}
                      </h3>
                      <div className="mono-label mt-2 text-white/50">{it.category}</div>
                    </div>
                    <span className="mono-label hidden text-white/60 sm:inline">{it.date}</span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border hairline transition-all duration-500 group-hover:border-flame group-hover:bg-flame group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-45" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
