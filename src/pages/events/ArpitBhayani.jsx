import { EventPageShell } from "@/components/events/EventPageShell";
import { Reveal } from "@/components/events/Reveal";
import { SmoothScroll } from "@/components/events/SmoothScroll";
import cover from "@/assets/arpit-cover.png";
import inside from "@/assets/arpit-inside.png";

export default function ArpitBhayani() {
  return (
    <>
      <SmoothScroll />
      <EventPageShell
        eyebrow="TECHTALK · 003"
        title="TechTalk with Arpit Bhayani"
        tag="Guest Session"
        date="ARCHIVED"
        cover={cover}
        coverAlt="Arpit Bhayani speaking at BashCraft"
        readingMinutes={3}
      >
        <Reveal>
          <div className="mono-label mb-6 text-flame">// SESSION</div>
          <p className="text-lg leading-relaxed text-stark-white/85 sm:text-2xl">
            BashCraft recently hosted a captivating session with{" "}
            <span className="text-stark-white">Arpit Bhayani</span>, Google's Senior Staff Software
            Engineer, diving deep into the latest tech trends and essential skills for future
            innovators. Attendees engaged in lively discussions about AI, software development, and
            the future of technology, which sparked their curiosity in the ever-evolving tech
            landscape.
          </p>
        </Reveal>

        <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-stark-white/20 to-transparent" />

        <Reveal>
          <div className="overflow-hidden rounded-3xl border hairline">
            <img
              src={inside}
              alt="Arpit Bhayani session"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
            />
          </div>
        </Reveal>
      </EventPageShell>
    </>
  );
}
