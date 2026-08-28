import { EventPageShell } from "@/components/events/EventPageShell";
import { Reveal } from "@/components/events/Reveal";
import { TiltCard } from "@/components/events/TiltCard";
import { Gallery } from "@/components/events/Gallery";
import { SmoothScroll } from "@/components/events/SmoothScroll";
import { Trophy, Medal, Award } from "lucide-react";
import cover from "@/assets/bashnex-poster.jpeg";
import g1 from "@/assets/bashnex-gallery-1.png";
import g2 from "@/assets/bashnex-gallery-2.png";
import g3 from "@/assets/bashnex-gallery-3.png";
import g4 from "@/assets/bashnex-gallery-4.jpeg";

const speakers = [
  { name: "Avinash Bussa", domain: "UI / UX Design", code: "UX" },
  { name: "Mukesh Kala", domain: "AI + Prompt Engineering", code: "AI" },
  { name: "Azmina Poddar", domain: "Manager / VP / PIS", code: "MG" },
  { name: "Dr. Ashish Mittal", domain: "Human Resources", code: "HR" },
  { name: "Mahesh Kumar Singh", domain: "Mechanical Engineering", code: "ME" },
  { name: "Saptarshi De", domain: "Software Engineering", code: "SW" },
  { name: "Harshil Chaudhary", domain: "Quant Finance", code: "QF" },
  { name: "Parul Pradhan", domain: "Automobile Industry", code: "AU" },
];

export default function BashNex26() {
  return (
    <>
      <SmoothScroll />
      <EventPageShell
        eyebrow="FLAGSHIP · 002"
        title="BashNex'26"
        tag="The Spectrum Of Tech"
        date="13 – 14 JUN · 2026"
        cover={cover}
        coverAlt="BashNex'26 poster"
        readingMinutes={5}
      >
        <Reveal>
          <div className="mono-label mb-6 text-flame">|| STORY</div>
          <p className="text-lg leading-relaxed text-white/85 sm:text-2xl">
            <span className="text-white">BashNex'26</span>, the flagship event of BashCraft Club,
            was successfully conducted on 13th and 14th June 2026 at VIT Bhopal University. Designed
            to bridge the gap between academics and industry, the two-day event brought together
            students and professionals for insightful sessions, meaningful discussions, and
            practical learning experiences.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-base leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
            The event featured <span className="text-flame">8 distinguished speakers</span> across 8
            diverse domains, including Artificial Intelligence &amp; Prompt Engineering, Quant
            Finance, UI/UX Design, Core Engineering, Human Resources, the Automobile Industry, and
            other emerging technology fields. Through interactive sessions and engaging Q&amp;A
            discussions, participants gained valuable industry insights and career guidance.
          </p>
        </Reveal>

        <Divider />

        <Reveal>
          <div className="mono-label mb-4 text-flame">|| GUEST SPEAKERS</div>
          <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
            Eight speakers.
            <br />
            <span className="text-[color:var(--ink-muted)]">Eight industries.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
            From AI and quant finance to design, HR and the automobile floor — each session mapped
            one slice of the modern tech spectrum. Below: the voices that carried the room.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {speakers.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <TiltCard intensity={6}>
                <div className="group relative h-full overflow-hidden rounded-2xl border hairline bg-[color:var(--surface-elev)] p-6 transition-all duration-500 hover:border-flame/60 hover:shadow-[0_20px_60px_-20px_rgba(239,29,42,0.45)]">
                  <div className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[7rem] font-black leading-none text-white/[0.05] transition-all duration-700 group-hover:text-flame/25 group-hover:-translate-y-1">
                    {s.code}
                  </div>
                  <div className="mono-label relative mb-6 flex items-center justify-between">
                    <span className="text-flame">SPK · {String(i + 1).padStart(2, "0")}</span>
                    <span className="text-white/40">{s.domain.toUpperCase()}</span>
                  </div>
                  <div className="relative font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    {s.name}
                  </div>
                  <div className="relative mono-label mt-4 flex items-center gap-3 text-white/70">
                    <span className="h-[2px] w-6 bg-flame transition-all duration-500 group-hover:w-12" />
                    <span>{s.domain}</span>
                  </div>
                  <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-flame to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Divider />

        <Reveal>
          <div className="mono-label mb-4 text-flame">|| COMPETITION WINNERS</div>
          <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
            Podium.
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 items-end gap-3">
          <Podium
            place={2}
            name="Annanya"
            id="13470"
            icon={<Medal className="h-5 w-5" />}
            height="h-24"
            delay={0.1}
          />
          <Podium
            place={1}
            name="Mohd Suhaib Khan"
            id="13540"
            icon={<Trophy className="h-5 w-5" />}
            height="h-32"
            delay={0}
            accent
          />
          <Podium
            place={3}
            name="Ayushi Pandey"
            id="12490"
            icon={<Award className="h-5 w-5" />}
            height="h-20"
            delay={0.2}
          />
        </div>

        <Divider />

        <Reveal>
          <div className="mono-label mb-4 text-flame">|| ACKNOWLEDGEMENT</div>
          <p className="text-lg leading-relaxed text-white/85 sm:text-xl">
            The success of BashNex'26 was made possible through the guidance and support of{" "}
            <span className="text-white">Dr. Dheresh Soni</span> (Faculty Coordinator) and{" "}
            <span className="text-white">Aditya Joshi</span> (Ex-President &amp; Mentor). We also
            extend our sincere gratitude to all the guest speakers and participants whose enthusiasm
            and active involvement made the event a memorable experience.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 border-l-2 border-flame pl-6 text-base italic leading-relaxed text-[color:var(--ink-muted)] sm:text-lg">
            BashNex'26 stands as another milestone in BashCraft Club's journey of empowering
            students through industry exposure, collaborative learning, and opportunities for
            personal and professional growth.
          </p>
        </Reveal>

        <Divider />

        <Reveal>
          <div className="mono-label mb-4 text-flame">|| PHOTO GALLERY</div>
          <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
            The room.
          </h2>
        </Reveal>
        <div className="mt-12">
          <Gallery
            images={[
              { src: g1, alt: "BashNex'26 auditorium wide shot", span: "wide" },
              { src: g2, alt: "Speaker on stage" },
              { src: g3, alt: "Panel discussion" },
              { src: g4, alt: "Parul Pradhan session — Software Defined Vehicles", span: "wide" },
            ]}
          />
        </div>
      </EventPageShell>
    </>
  );
}

function Divider() {
  return (
    <div className="my-24 flex items-center gap-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <span className="h-1.5 w-1.5 rounded-full bg-flame animate-flame-pulse" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

function Podium({ place, name, id, icon, height, delay, accent }) {
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col items-center">
        <div className={`mono-label mb-3 ${accent ? "text-flame" : "text-white/60"}`}>0{place}</div>
        <div className={`${accent ? "text-flame" : "text-white/80"} mb-4`}>{icon}</div>
        <div className="text-center">
          <div
            className={`font-display text-xl font-semibold leading-tight ${accent ? "text-white" : "text-white/90"}`}
          >
            {name}
          </div>
          <div className="mono-label mt-1 text-white/50">#{id}</div>
        </div>
        <div
          className={`mt-6 w-full rounded-t-xl border-t hairline bg-[color:var(--surface-elev)] ${height} ${accent ? "flame-glow" : ""}`}
        />
      </div>
    </Reveal>
  );
}
