import { useEffect, useRef, useState } from "react";

const tags = [
  "🎓 All College Students",
  "💻 Tech Enthusiasts",
  "🧠 Creative Minds",
  "🌱 Beginners Welcome",
  "🏆 Competitive Spirits",
];

const flipCards = [
  { icon: "📝", title: "Register", backTitle: "What you need", backDesc: "Name, college, email, and your area of interest. Takes under 2 minutes." },
  { icon: "📬", title: "Verify Email", backTitle: "Check your inbox", backDesc: "Confirmation email sent right away. Event link lands 24 hrs before the session." },
  { icon: "⏰", title: "Join On Time", backTitle: "Pro tip", backDesc: "Log in 10 min early. Test your mic, camera, and connection beforehand." },
  { icon: "🚀", title: "Engage", backTitle: "Make it count", backDesc: "Ask boldly, network actively, and absorb every insight the mentors share." },
];

const checklist = [
  { num: 1, title: "Registration done", sub: "Form submitted, spot confirmed.", tag: "Step 1" },
  { num: 2, title: "Email verified", sub: "Confirmation mail received & saved.", tag: "Step 2" },
  { num: 3, title: "Tech ready", sub: "Stable internet, mic & camera tested.", tag: "Step 3" },
  { num: 4, title: "Mindset set", sub: "Curious, open, and ready to engage.", tag: "Step 4" },
];

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const dots = [];
    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = canvas.parentElement?.offsetWidth || 680;
      H = canvas.height = canvas.parentElement?.offsetHeight || 900;
    };
    resize();
    for (let i = 0; i < 36; i++) {
      dots.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        vy: -(Math.random() * 0.5 + 0.12),
        vx: (Math.random() - 0.5) * 0.25,
        life: Math.random(), maxLife: Math.random() * 0.5 + 0.5,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach((d) => {
        d.life += 0.004;
        if (d.life > d.maxLife) { d.life = 0; d.x = Math.random() * W; d.y = H + 10; }
        d.x += d.vx; d.y += d.vy;
        const alpha = Math.sin((d.life / d.maxLife) * Math.PI) * 0.38;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,71,${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />
  );
}

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Glow divider ── */
function GlowDivider({ delay = "0s" }) {
  const line = { flex: 1, height: 1, background: "repeating-linear-gradient(90deg,rgba(255,107,71,.35) 0,rgba(255,107,71,.35) 6px,transparent 6px,transparent 12px)" };
  return (
    <div style={{ maxWidth: 860, margin: "0 auto 56px", display: "flex", alignItems: "center", gap: 20, animation: `fadeIn .7s ${delay} ease both` }}>
      <div style={line} />
      <div style={{ width: 10, height: 10, background: "#FF6B47", borderRadius: "50%", animation: "pulseRing 1.8s ease-in-out infinite", flexShrink: 0 }} />
      <div style={line} />
    </div>
  );
}

/* ── Flip card with click-to-flip on mobile ── */
function FlipCard({ card, delay }) {
  const [flipped, setFlipped] = useState(false);
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="flip-wrap"
      onClick={() => setFlipped(f => !f)}
      style={{
        height: 170,
        perspective: 900,
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .6s ${delay}s ease, transform .6s ${delay}s ease`,
      }}
    >
      <div
        className="flip-inner"
        style={{
          width: "100%", height: "100%", position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform .6s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="flip-front" style={{ position: "absolute", inset: 0, borderRadius: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 18, border: "1px solid #272727", textAlign: "center", background: "#141414" }}>
          <div style={{ fontSize: 30, marginBottom: 10, animation: "floatIcon 3s ease-in-out infinite" }}>{card.icon}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{card.title}</div>
          <div style={{ fontSize: 11, color: "#444", marginTop: 6 }}>tap / hover</div>
        </div>
        <div className="flip-back" style={{ position: "absolute", inset: 0, borderRadius: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 18, border: "1px solid #FF6B47", textAlign: "center", background: "#1c1410", transform: "rotateY(180deg)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#FF8C6B", marginBottom: 8 }}>{card.backTitle}</div>
          <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6 }}>{card.backDesc}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Checklist item with scroll reveal ── */
function CheckItem({ item, delay }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="check-item"
      style={{
        display: "flex", alignItems: "flex-start", gap: 14,
        background: "#141414", border: "1px solid #1e1e1e",
        borderRadius: 14, padding: "16px 20px",
        transition: `opacity .5s ${delay}s ease, transform .5s ${delay}s ease, border-color .25s, transform .2s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-28px)",
      }}
    >
      <div className="check-circle" style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid #FF6B47", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .3s, transform .3s" }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#FF6B47" }}>{item.num}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{item.title}</div>
        <div style={{ fontSize: 12.5, color: "#666", lineHeight: 1.5 }}>{item.sub}</div>
      </div>
      <div style={{ fontSize: 10, background: "rgba(255,107,71,.1)", color: "#FF8C6B", borderRadius: 999, padding: "2px 10px", marginLeft: "auto", flexShrink: 0, border: "1px solid rgba(255,107,71,.2)" }}>{item.tag}</div>
    </div>
  );
}

/* ── Registration Fee Card ── */
function FeeCard() {
  const [ref, visible] = useReveal(0.1);
  const perks = [
    "Full event access — all sessions included",
    "Certificate of participation",
    "Networking with mentors & peers",
  ];
  return (
    <section ref={ref} style={{ maxWidth: 560, margin: "0 auto 64px", position: "relative", zIndex: 1, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: "opacity .7s ease, transform .7s ease" }}>
      <div style={{
        background: "#181818", border: "1.5px solid #FF6B47", borderRadius: 20,
        padding: "36px 32px 30px", position: "relative", overflow: "hidden",
        animation: "shimmer 4s ease-in-out infinite",
      }}>
        {/* corner stamp */}
        <div style={{ position: "absolute", top: 18, right: 20, background: "rgba(255,107,71,.1)", border: "1px solid rgba(255,107,71,.3)", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "#FF8C6B", fontWeight: 600, letterSpacing: ".04em" }}>
          LIMITED SEATS
        </div>

        {/* badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,107,71,.12)", border: "1px solid rgba(255,107,71,.35)", borderRadius: 999, padding: "5px 14px", fontSize: 12, color: "#FF8C6B", marginBottom: 22 }}>
          <span style={{ width: 7, height: 7, background: "#FF6B47", borderRadius: "50%", display: "inline-block", animation: "pulseRing 1.8s ease-in-out infinite" }} />
          Registration Fee
        </div>

        {/* big price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4, animation: "floatIcon 3.5s ease-in-out infinite" }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#FF6B47", lineHeight: 1 }}>₹</span>
          <span style={{ fontSize: 72, fontWeight: 800, color: "#fff", letterSpacing: "-.04em", lineHeight: 1 }}>29</span>
        </div>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>
          one-time · <span style={{ color: "#FF8C6B", fontWeight: 600 }}>fully worth it</span>
        </p>

        <hr style={{ border: "none", borderTop: "1px solid #272727", margin: "18px 0" }} />

        {/* perks */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
          {perks.map((p, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#bbb", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-14px)", transition: `opacity .5s ${0.1 + i * 0.1}s ease, transform .5s ${0.1 + i * 0.1}s ease` }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,107,71,.12)", border: "1px solid rgba(255,107,71,.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, color: "#FF6B47" }}>✓</span>
              {p}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          style={{ width: "100%", background: "#FF6B47", color: "#fff", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: ".01em", transition: "background .2s, transform .15s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#e85a36"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#FF6B47"; e.currentTarget.style.transform = "translateY(0)"; }}
          onMouseDown={e => { e.currentTarget.style.transform = "scale(.98)"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSd85y98TEpgxMvsAgo74sDCuXnaOPfb2nJCsnSBGsxu8-Ib3A/viewform?usp=header", "_blank")}
        >
          Register Now — ₹29 only
        </button>
      </div>
    </section>
  );
}

/* ── Main component ── */
export default function InstructionsPage() {
  const [heroRef, heroVisible] = useReveal(0.05);
  const [whoRef, whoVisible] = useReveal(0.1);
  const [flipRef, flipVisible] = useReveal(0.1);

  return (
    <div style={{ background: "#0d0d0d", color: "#fff", fontFamily: "'Inter', sans-serif", minHeight: "100vh", padding: "60px 24px 80px", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes badgePop    { 0%{opacity:0;transform:scale(.85)} 70%{transform:scale(1.04)} 100%{opacity:1;transform:scale(1)} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn      { from{opacity:0} to{opacity:1} }
        @keyframes slideDown   { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer     { 0%{box-shadow:0 0 40px rgba(255,107,71,.08)} 50%{box-shadow:0 0 60px rgba(255,107,71,.2)} 100%{box-shadow:0 0 40px rgba(255,107,71,.08)} }
        @keyframes pulseRing   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
        @keyframes floatIcon   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes borderGlow  { 0%,100%{border-color:rgba(255,107,71,.22)} 50%{border-color:rgba(255,107,71,.7)} }
        @keyframes scanLine    { from{top:-60px} to{top:110%} }
        @keyframes heroGlow    { 0%,100%{text-shadow:0 0 0 transparent} 50%{text-shadow:0 2px 40px rgba(255,107,71,.18)} }
        @keyframes floatIcon   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

        .badge-dot       { animation: pulseRing 1.8s ease-in-out infinite; }

        /* tag hover */
        .tag             { transition: border-color .2s, color .2s, background .2s, transform .18s !important; }
        .tag:hover       { border-color:#FF6B47 !important; color:#fff !important; background:rgba(255,107,71,.18) !important; transform:scale(1.07) !important; }

        /* flip */
        .flip-front, .flip-back { backface-visibility:hidden; -webkit-backface-visibility:hidden; }
        .flip-wrap:hover .flip-inner { transform:rotateY(180deg); }

        /* flip card icon stagger */
        .flip-wrap:nth-child(1) .flip-front div:first-child { animation-delay: 0s; }
        .flip-wrap:nth-child(2) .flip-front div:first-child { animation-delay: .4s; }
        .flip-wrap:nth-child(3) .flip-front div:first-child { animation-delay: .8s; }
        .flip-wrap:nth-child(4) .flip-front div:first-child { animation-delay: 1.2s; }

        /* checklist hover */
        .check-item:hover               { border-color:rgba(255,107,71,.45) !important; transform:translateX(8px) !important; }
        .check-item:hover .check-circle { background:rgba(255,107,71,.14) !important; transform:scale(1.1); }

        /* who-card scan line effect */
        .who-card { position:relative; overflow:hidden; }
        .who-card::after {
          content:'';
          position:absolute;
          left:0; right:0;
          height:60px;
          background:linear-gradient(to bottom, transparent, rgba(255,107,71,.04), transparent);
          animation: scanLine 4s linear infinite;
          pointer-events:none;
        }

        /* flip card border pulse */
        .flip-front { animation: borderGlow 3s ease-in-out infinite; }

        /* h1 glow */
        h1.hero-title { animation: fadeUp .7s .15s ease both, heroGlow 4s 1s ease-in-out infinite; }

        @media(max-width:600px){
          .flip-grid { grid-template-columns:1fr 1fr !important; }
          .who-card  { padding:28px 20px 24px !important; }
        }
      `}</style>

      <ParticleCanvas />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{ textAlign: "center", marginBottom: 64, position: "relative", zIndex: 1 }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#1a1a1a", border: "1px solid #2e2e2e",
          borderRadius: 999, padding: "8px 18px", fontSize: 13, color: "#ccc",
          marginBottom: 28,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "scale(1)" : "scale(0.85)",
          transition: "opacity .6s ease, transform .6s cubic-bezier(.34,1.56,.64,1)",
        }}>
          <span className="badge-dot" style={{ width: 8, height: 8, background: "#FF6B47", borderRadius: "50%", display: "inline-block" }} />
          How To Join
        </div>

        <h1 className="hero-title" style={{
          fontSize: "clamp(42px,8vw,72px)", fontWeight: 800,
          letterSpacing: "-.03em", color: "#fff", marginBottom: 16,
        }}>
          Instructions
        </h1>

        <p style={{
          fontSize: 16, color: "#888", maxWidth: 420,
          margin: "0 auto 28px", lineHeight: 1.6,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity .7s .28s ease, transform .7s .28s ease",
        }}>
          Everything you need to know to participate in this event.
        </p>
      </section>

      {/* ── WHO CARD ── */}
      <div
        ref={whoRef}
        className="who-card"
        style={{
          background: "#181818", border: "1px solid #FF6B47",
          borderRadius: 20, padding: "36px 40px 32px",
          maxWidth: 860, margin: "0 auto 64px",
          animation: "shimmer 4s 1.2s ease-in-out infinite",
          zIndex: 1,
          opacity: whoVisible ? 1 : 0,
          transform: whoVisible ? "translateY(0)" : "translateY(36px)",
          transition: "opacity .75s .1s ease, transform .75s .1s ease",
        }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,107,71,.12)", border: "1px solid rgba(255,107,71,.35)",
          borderRadius: 999, padding: "6px 16px", fontSize: 13, color: "#FF8C6B",
          marginBottom: 20,
          opacity: whoVisible ? 1 : 0,
          transform: whoVisible ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity .5s .35s ease, transform .5s .35s ease",
        }}>
          👥 Who Can Participate?
        </div>

        <p style={{ fontSize: 15, color: "#bbb", lineHeight: 1.7, marginBottom: 10 }}>
          This event is open for students who are{" "}
          <strong style={{ color: "#fff", fontWeight: 700 }}>curious, enthusiastic, creative</strong>
          , and ready to explore new experiences.
        </p>
        <p style={{ fontSize: 15, color: "#bbb", lineHeight: 1.7, marginBottom: 10 }}>
          Whether you're a beginner or experienced —{" "}
          <span style={{ color: "#FF6B47", fontWeight: 600 }}>everyone is welcome.</span>
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
          {tags.map((tag, i) => (
            <span
              key={i}
              className="tag"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(255,107,71,.08)", border: "1px solid rgba(255,107,71,.22)",
                borderRadius: 999, padding: "8px 18px", fontSize: 13, color: "#FF8C6B",
                cursor: "default",
                opacity: whoVisible ? 1 : 0,
                transform: whoVisible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity .5s ${0.45 + i * 0.08}s ease, transform .5s ${0.45 + i * 0.08}s ease`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <GlowDivider delay="0s" />

      {/* ── FLIP CARDS ── */}
      <section ref={flipRef} style={{ maxWidth: 900, margin: "0 auto 64px", position: "relative", zIndex: 1 }}>
        <div style={{
          textAlign: "center", marginBottom: 32,
          opacity: flipVisible ? 1 : 0,
          transform: flipVisible ? "translateY(0)" : "translateY(-14px)",
          transition: "opacity .6s .05s ease, transform .6s .05s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,107,71,.12)", border: "1px solid rgba(255,107,71,.35)",
            borderRadius: 999, padding: "6px 16px", fontSize: 13, color: "#FF8C6B",
          }}>
            ✨ Hover to explore each step
          </div>
        </div>

        <div className="flip-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
          {flipCards.map((card, i) => (
            <FlipCard key={i} card={card} delay={0.1 + i * 0.12} />
          ))}
        </div>
      </section>

      <GlowDivider delay="0s" />

      {/* ── REGISTRATION FEE ── */}
      <FeeCard />

      <GlowDivider delay="0s" />

      {/* ── CHECKLIST ── */}
      <section style={{ maxWidth: 600, margin: "0 auto 64px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,107,71,.12)", border: "1px solid rgba(255,107,71,.35)",
            borderRadius: 999, padding: "6px 16px", fontSize: 13, color: "#FF8C6B",
            animation: "fadeIn .6s ease both",
          }}>
            ✅ Quick checklist before the event
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {checklist.map((item, i) => (
            <CheckItem key={i} item={item} delay={i * 0.12} />
          ))}
        </div>
      </section>
    </div>
  );
}
