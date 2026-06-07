import { useState, useEffect, useRef } from "react";

const MISSION_PILLARS = [
  { emoji: "✨", text: "Create meaningful experiences for participants" },
  { emoji: "💡", text: "Encourage creativity and innovation" },
  { emoji: "🎪", text: "Build stronger student communities" },
  { emoji: "🤝", text: "Provide opportunities to learn and collaborate" },
  { emoji: "🚀", text: "Promote growth beyond classrooms" },
];

const SPECIAL_CARDS = [
  { emoji: "🎮", title: "Interactive Experience", desc: "Participate in engaging activities designed to keep you involved and energised throughout." },
  { emoji: "🔭", title: "Learn & Explore", desc: "Gain new knowledge, discover fresh ideas, and explore opportunities that help you grow." },
  { emoji: "🌐", title: "Connect With Others", desc: "Meet students with similar interests, expand your network, and join an active community." },
  { emoji: "⚡", title: "Challenge Yourself", desc: "Push your limits, compete, solve problems, and discover your true potential." },
  { emoji: "🏆", title: "Learn From Professionals", desc: "Gain practical knowledge and guidance from experienced industry experts and mentors." },
];

const HIGHLIGHTS = [
  {
    // Industry professional / mentor speaking to students — relevant to title
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=100&fit=crop",
    title: "Learn From Industry Professionals",
    outcomes: ["Gain hands-on project experience.", "Access to in-house and global internships.", "Develop skills in emerging technologies.", "Showcase innovation in competitions.", "Build a strong professional network."],
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=100&fit=crop",
    title: "Exciting Activities & Sessions",
    outcomes: ["Live coding sessions and workshops.", "Hands-on project-based learning.", "Guest talks from industry leaders.", "Interactive Q&A and panel discussions.", "Real-world problem solving challenges."],
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=100&fit=crop",
    title: "Challenges & Competitions",
    outcomes: ["Compete in hackathons and contests.", "Win exciting prizes and recognition.", "Test your skills under pressure.", "Collaborate with top student teams.", "Get featured on BashCraft leaderboard."],
  },
  {
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=100&fit=crop",
    title: "Networking Opportunities",
    outcomes: ["Connect with like-minded students.", "Meet recruiters and professionals.", "Expand your professional circle.", "Build relationships beyond the event.", "Join an active alumni community."],
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=100&fit=crop",
    title: "Fun & Engaging Experiences",
    outcomes: ["Enjoy games, surprises and fun zones.", "Experience a vibrant community vibe.", "Create unforgettable memories.", "Participate in cultural activities.", "Celebrate achievements together."],
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=100&fit=crop",
    title: "Collaborate & Build",
    outcomes: ["Work on shared goals with peers.", "Exchange ideas across disciplines.", "Turn collaboration into outcomes.", "Build MVPs and working prototypes.", "Pitch your ideas to mentors."],
  },
  {
    // Certificate / award ceremony — relevant to rewards title
    image: "https://images.unsplash.com/photo-1667967699372-1c26d40dec46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF3YXJkc3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Memorable Moments & Rewards",
    outcomes: ["Verified certificate for all participants.", "Walk away with lifelong connections.", "Earn rewards and special mentions.", "Take home exclusive BashCraft merch.", "Featured on official BashCraft page."],
  },
];

function useReveal(threshold = 0.08, rootMargin = "0px 0px -80px 0px") {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function PillBadge({ emoji, label }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      padding: "6px 16px", borderRadius: "999px",
      border: "1px solid var(--glass-border)",
      background: "var(--glass)", color: "var(--primary)",
      fontSize: "0.82rem", fontFamily: "var(--font-accent)", letterSpacing: "0.02em",
    }}>
      {emoji && <span>{emoji}</span>}{label}
    </span>
  );
}

function PillarCard({ emoji, text, index, visible }) {
  const [hov, setHov] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      style={{
        position: "relative", overflow: "hidden",
        background: hov ? "rgba(232,67,10,0.08)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "var(--primary)" : "var(--glass-border)"}`,
        borderRadius: "14px", padding: "20px 16px",
        display: "flex", flexDirection: "column", gap: "10px",
        fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.55,
        opacity: visible ? 1 : 0,
        transform: visible ? hov ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
        boxShadow: hov ? "0 20px 40px rgba(0,0,0,0.35)" : "0 10px 25px rgba(0,0,0,0.15)",
        transition: `opacity 0.7s ease ${400 + index * 120}ms, transform 0.8s cubic-bezier(0.25,1,0.5,1) ${400 + index * 120}ms, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease`,
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: hov ? `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232,67,10,0.18), transparent 60%)` : "none" }} />
      <span style={{ fontSize: "1.6rem", transform: hov ? "scale(1.15)" : "scale(1)", transition: "transform .25s ease" }}>{emoji}</span>
      <span style={{ position: "relative", zIndex: 2 }}>{text}</span>
    </div>
  );
}

function SpecialCard({ emoji, title, desc, index, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", overflow: "hidden",
        background: hov ? "rgba(232,67,10,0.08)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "var(--primary)" : "var(--glass-border)"}`,
        borderRadius: "16px", padding: "28px 20px",
        display: "flex", flexDirection: "column", gap: "12px",
        opacity: visible ? 1 : 0,
        transform: visible ? hov ? "translateY(-10px)" : "translateY(0)" : "translateY(50px)",
        boxShadow: hov ? "0 20px 40px rgba(0,0,0,0.35)" : "0 10px 24px rgba(0,0,0,0.15)",
        transition: `opacity 0.7s ease ${350 + index * 120}ms, transform 0.8s cubic-bezier(0.25,1,0.5,1) ${350 + index * 120}ms, border-color .25s ease, background .25s ease, box-shadow .25s ease`,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: hov ? "linear-gradient(90deg, transparent, var(--primary), transparent)" : "transparent",
        transition: "all .25s ease" }} />
      <span style={{ fontSize: "1.8rem", transform: hov ? "translateY(-2px) scale(1.1)" : "translateY(0) scale(1)", transition: "transform .25s ease" }}>{emoji}</span>
      <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>{title}</h4>
      <p style={{ fontSize: "0.84rem", lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>{desc}</p>
    </div>
  );
}

function FlipCard({ image, title, outcomes, index, visible }) {
  const [hov, setHov] = useState(false);
  const revealX = index % 3 === 0 ? -80 : index % 3 === 1 ? 0 : 80;
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? hov ? "translateY(-18px) scale(1.02)" : "translateY(0) scale(1)" : `translate(${revealX}px, 80px) scale(.9)`,
        transition: `opacity 1s ease ${500 + index * 150}ms, transform 1s cubic-bezier(.16,1,.3,1) ${500 + index * 150}ms`,
      }}
    >
      <div style={{
        position: "relative", overflow: "hidden", borderRadius: "20px",
        border: hov ? "1px solid var(--primary)" : "1px solid var(--glass-border)",
        borderBottom: "2px solid rgba(232,67,10,0.9)",
        boxShadow: hov
          ? "0 30px 70px rgba(0,0,0,.55), 0 0 0 1px rgba(232,67,10,.35), 0 0 30px rgba(232,67,10,.35), 0 0 70px rgba(232,67,10,.15), 0 12px 40px 4px rgba(232,67,10,.55)"
          : "0 8px 32px rgba(0,0,0,.45), 0 12px 36px 2px rgba(232,67,10,.38)",
        transition: "all .35s ease", minHeight: "420px",
      }}>
        <img src={image} alt={title} style={{ width: "100%", height: "420px", objectFit: "cover", transform: hov ? "scale(1.12)" : "scale(1)", transition: "transform .7s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, transparent 35%, rgba(255,255,255,.18) 50%, transparent 65%)", transform: hov ? "translateX(120%)" : "translateX(-120%)", transition: "transform .9s ease", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: hov ? "linear-gradient(to top, rgba(0,0,0,.92) 20%, rgba(0,0,0,.15) 70%)" : "linear-gradient(to top, rgba(0,0,0,.78) 22%, rgba(0,0,0,.05) 60%)", transition: "all .35s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: hov ? "radial-gradient(circle at center, rgba(232,67,10,.30) 0%, rgba(232,67,10,.15) 35%, transparent 75%)" : "radial-gradient(circle at center, rgba(232,67,10,.08) 0%, transparent 70%)", transition: ".35s ease" }} />
        <div style={{ position: "absolute", left: "22px", right: "22px", bottom: hov ? "24px" : "18px", transition: "all .35s ease" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: hov ? "16px" : "0", textShadow: "0 2px 10px rgba(0,0,0,.8)", transition: "all .35s ease" }}>{title}</h3>
          <div style={{ opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(20px)", maxHeight: hov ? "220px" : "0px", overflow: "hidden", transition: "all .35s ease" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {outcomes.map((o, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", color: "rgba(255,255,255,.88)", fontSize: ".84rem", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700, flexShrink: 0 }}>✓</span>{o}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: hov ? "linear-gradient(90deg, transparent, var(--primary), transparent)" : "transparent", transition: ".3s ease" }} />
      </div>
    </div>
  );
}

function ScannerHeading() {
  const [phase, setPhase]     = useState("idle");
  const [scanPct, setScanPct] = useState(0);
  const wrapRef  = useRef(null);
  const rafRef   = useRef(null);
  const BRACKET_W = 130;

  const startScan = () => {
    cancelAnimationFrame(rafRef.current);
    setScanPct(0);
    setPhase("scanning");
    const DURATION = 3000;
    const startTs = performance.now();
    const tick = (ts) => {
      const pct = Math.min(((ts - startTs) / DURATION) * 100, 100);
      setScanPct(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("done");
        rafRef.current = setTimeout(() => {
          setScanPct(0);
          setPhase("idle");
          requestAnimationFrame(() => startScan());
        }, 1800);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        cancelAnimationFrame(rafRef.current);
        clearTimeout(rafRef.current);
        setPhase("idle");
        setScanPct(0);
        rafRef.current = requestAnimationFrame(() => startScan());
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(rafRef.current); clearTimeout(rafRef.current); };
  }, []);

  const scanning = phase === "scanning";
  const done     = phase === "done";
  const revealRight = Math.max(0, 100 - scanPct);

  return (
    <div ref={wrapRef} style={{ position: "relative", userSelect: "none", display: "block", width: "100%", overflow: "visible", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 3 === 0 ? "3px" : "2px", height: i % 3 === 0 ? "3px" : "2px",
            borderRadius: "50%",
            background: i % 4 === 0 ? "rgba(232,67,10,0.7)" : i % 4 === 1 ? "rgba(120,80,255,0.6)" : "rgba(255,255,255,0.4)",
            left: `${(i * 17 + 5) % 100}%`, top: `${(i * 23 + 10) % 100}%`,
            animation: `bcParticle ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
          }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "120%", height: "200%", background: "radial-gradient(ellipse at center, rgba(232,67,10,0.06) 0%, rgba(100,60,255,0.04) 50%, transparent 70%)", pointerEvents: "none" }} />
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem,6vw,4.5rem)", lineHeight: 1.25, color: "var(--text-primary)", filter: done ? "blur(0px)" : "blur(16px)", opacity: done ? 1 : 0.35, transition: done ? "filter 0.9s ease, opacity 0.9s ease" : "none", margin: 0, padding: "4px 0", display: "block" }}>
        Where Innovation Meets Creativity
      </h2>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem,6vw,4.5rem)", lineHeight: 1.25, color: "var(--text-primary)", position: "absolute", top: 0, left: 0, right: 0, margin: 0, padding: "4px 0", filter: "blur(0px)", textShadow: "0 0 18px rgba(232,67,10,0.5), 0 0 36px rgba(232,67,10,0.2)", clipPath: `inset(0 ${done ? 0 : revealRight}% 0 0)`, transition: done ? "clip-path 0.5s ease" : "none", pointerEvents: "none", overflow: "visible", whiteSpace: "normal" }}>
        Where Innovation Meets Creativity
      </h2>
      {scanning && !window.matchMedia("(max-width: 768px)").matches && (() => {
        const bracketLeft = `clamp(0px, calc(${scanPct}% - ${BRACKET_W / 2}px), calc(100% - ${BRACKET_W}px))`;
        return (
          <div style={{ position: "absolute", top: "4px", bottom: "4px", left: bracketLeft, width: `${BRACKET_W}px`, pointerEvents: "none" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 10%, rgba(232,67,10,0.05) 50%, transparent 90%)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: "14px", height: "14px", borderTop: "2px solid rgba(255,255,255,0.9)", borderLeft: "2px solid rgba(255,255,255,0.9)", filter: "drop-shadow(0 0 4px rgba(255,255,255,0.7))" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: "14px", height: "14px", borderTop: "2px solid rgba(255,255,255,0.9)", borderRight: "2px solid rgba(255,255,255,0.9)", filter: "drop-shadow(0 0 4px rgba(255,255,255,0.7))" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "14px", height: "14px", borderBottom: "2px solid rgba(255,255,255,0.9)", borderLeft: "2px solid rgba(255,255,255,0.9)", filter: "drop-shadow(0 0 4px rgba(255,255,255,0.7))" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "14px", height: "14px", borderBottom: "2px solid rgba(255,255,255,0.9)", borderRight: "2px solid rgba(255,255,255,0.9)", filter: "drop-shadow(0 0 4px rgba(255,255,255,0.7))" }} />
          </div>
        );
      })()}
    </div>
  );
}

function AboutEventSection() {
  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 48px" }}>
      <div style={{ marginBottom: "20px" }}>
        <PillBadge label="About the Event" />
      </div>
      <div style={{ padding: "0 40px", marginBottom: "48px" }}>
        <ScannerHeading />
      </div>
      <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-secondary)", margin: 0 }}>
          BashCraft proudly presents an exciting event designed to bring together innovation,
          creativity, collaboration, and unforgettable experiences. Whether you're looking to
          learn something new, challenge yourself, network with like-minded people, or simply
          enjoy the experience — this event offers something for everyone.
        </p>
        <blockquote style={{ borderLeft: "3px solid var(--primary)", paddingLeft: "20px", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.7, color: "var(--primary)", fontFamily: "var(--font-accent)", margin: "0 auto", textAlign: "left" }}>
          This isn't just another event — it's a platform where ideas meet opportunities and passion turns into action.
        </blockquote>
      </div>
    </section>
  );
}

function MissionSection() {
  const [ref1, vis1] = useReveal(0.15, "0px 0px -60px 0px");
  const [ref2, vis2] = useReveal(0.15, "0px 0px -60px 0px");
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-charcoal)", padding: "96px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={ref1}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", opacity: vis1 ? 1 : 0, transform: vis1 ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 0ms, transform 0.6s ease 0ms" }}>
            <PillBadge emoji="🚀" label="Our Mission" />
          </div>
          <p style={{ maxWidth: "760px", fontSize: "1.15rem", lineHeight: 1.9, color: "var(--text-primary)", margin: "0 auto 48px", textAlign: "center", opacity: vis1 ? 1 : 0, transform: vis1 ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 200ms, transform 0.7s ease 200ms" }}>
            At Bashcraft, we believe that learning should be interactive, communities should be engaging, and opportunities should be accessible to everyone.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "72px" }}>
            {MISSION_PILLARS.map((p, i) => <PillarCard key={i} {...p} index={i} visible={vis1} />)}
          </div>
        </div>
        <div ref={ref2}>
          <div style={{ marginBottom: "32px", display: "flex", justifyContent: "center", opacity: vis2 ? 1 : 0, transform: vis2 ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 0ms, transform 0.6s ease 0ms" }}>
            <PillBadge emoji="⭐" label="What Makes This Event Special?" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {SPECIAL_CARDS.map((c, i) => <SpecialCard key={i} {...c} index={i} visible={vis2} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightsSection() {
  const [ref, visible] = useReveal(0.04);
  return (
    <section ref={ref} style={{ position: "relative", overflow: "hidden", padding: "100px 48px", maxWidth: "1300px", margin: "0 auto", textAlign: "center" }}>
      <div style={{ position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(232,67,10,.18), transparent 70%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 2, marginBottom: "60px" }}>
        <div style={{ display: "flex", justifyContent: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.5s ease 0ms, transform 0.5s ease 0ms" }}>
          <PillBadge emoji="✨" label="What's In Store" />
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,4vw,3.4rem)", margin: "18px 0 14px", color: "var(--text-primary)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.6s ease 150ms, transform 0.6s ease 150ms" }}>
          Event Highlights
        </h2>
        <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1rem", lineHeight: 1.8, color: "var(--text-secondary)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.6s ease 300ms, transform 0.6s ease 300ms" }}>
          Discover the exclusive opportunities waiting for you at this event.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px", textAlign: "left" }}>
        {HIGHLIGHTS.map((h, i) => <FlipCard key={i} {...h} index={i} visible={visible} />)}
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <style>{`
        @keyframes bcParticle {
          0%,100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50%      { transform: translateY(-10px) scale(1.4); opacity: 1; }
        }
        @media (max-width: 1100px) {
          .bc-pillars,.bc-special { grid-template-columns: repeat(3,1fr) !important; }
          .bc-highlights          { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          .bc-about-grid { grid-template-columns:1fr !important; padding:48px 24px !important; }
          .bc-mission    { padding:56px 24px !important; }
          .bc-pillars,.bc-special { grid-template-columns:repeat(2,1fr) !important; }
          .bc-highlights-wrap { padding:56px 24px !important; }
          .bc-highlights { grid-template-columns:1fr !important; }
        }
        @media (max-width:480px) {
          .bc-pillars,.bc-special { grid-template-columns:1fr !important; }
        }
      `}</style>
      <main style={{ background: "var(--bg-dark)", color: "var(--text-primary)", overflowX: "hidden" }}>
        <AboutEventSection />
        <MissionSection />
        <HighlightsSection />
      </main>
    </>
  );
}
