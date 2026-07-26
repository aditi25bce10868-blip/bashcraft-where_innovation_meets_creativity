import { EventPageShell } from "@/components/events/EventPageShell";
import { Reveal } from "@/components/events/Reveal";
import { Gallery } from "@/components/events/Gallery";
import { SmoothScroll } from "@/components/events/SmoothScroll";
import cover from "@/assets/investathon-cover.jpeg";
import g1 from "@/assets/investathon-1.jpeg";
import g2 from "@/assets/investathon-2.jpeg";

export default function Investathon() {
  return (
    <>
      <SmoothScroll />
      <EventPageShell
        eyebrow="HACKATHON · 004"
        title="Investathon"
        tag="× Zerodha"
        date="26 · MAR"
        cover={cover}
        coverAlt="Investathon finance hackathon"
        readingMinutes={3}
      >
        <Reveal>
          <div className="mono-label mb-6 text-flame">// STORY</div>
          <p className="text-lg leading-relaxed text-white/85 sm:text-2xl">
            On March 26th, BashCraft hosted an engaging finance event in collaboration with{" "}
            <span className="text-white">Zerodha</span>, where participants learned to build
            personal portfolios and gained valuable financial insights. Following the workshop,
            attendees took part in an exciting Finance Hackathon aimed at creating a finance
            platform from scratch. Participants faced UI/UX and development challenges, showcasing
            their skills and creativity while tackling real-world finance problems.
          </p>
        </Reveal>

        <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <Reveal>
          <div className="mono-label mb-4 text-flame">// MOMENTS</div>
          <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
            The build.
            <br />
            <span className="text-[color:var(--ink-muted)]">The win.</span>
          </h2>
        </Reveal>

        <div className="mt-12">
          <Gallery
            images={[
              { src: g1, alt: "Investathon team collaborating" },
              { src: g2, alt: "Investathon winners on stage" },
            ]}
          />
        </div>
      </EventPageShell>
    </>
  );
}
