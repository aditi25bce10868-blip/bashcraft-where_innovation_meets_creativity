// Timeline page — assign to: Raunak Sharma
import { useEffect, useRef } from 'react';
import './Timeline.css';

const events = [
  // DAY 1 — 13 Jun
  { id: 'e0', side: 'L', date: 'June 13, 2026', time: '2:30 PM - 3:15 PM',   title: 'UI/UX Designer',   desc: 'Avinash Bussa shares his journey and insights on UI/UX design and crafting great user experiences.' },
  { id: 'e1', side: 'R', date: 'June 13, 2026', time: '3:30 PM - 4:15 PM',   title: 'AI + Prompt',      desc: 'Mukesh Kala shares insights on AI and prompt engineering.' },
  { id: 'e2', side: 'L', date: 'June 13, 2026', time: '4:30 PM - 5:15 PM',   title: 'Manager / VP',     desc: 'Azmina Poddar on leadership, management and career growth.' },
  { id: 'e3', side: 'R', date: 'June 13, 2026', time: '5:30 PM - 6:15 PM',   title: 'HR',               desc: 'Ashish Mittal on hiring, human resources and workplace culture.' },
  // DAY 2 — 14 Jun
  { id: 'e4', side: 'L', date: 'June 14, 2026', time: '11:00 AM - 11:45 AM', title: 'Mechanical',       desc: 'Mahesh Kumar Singh on mechanical engineering, industry applications and career opportunities in the field.' },
  { id: 'e5', side: 'R', date: 'June 14, 2026', time: '12:00 PM - 12:45 PM', title: 'Software',         desc: 'Saptarshi De on software engineering and industry trends.' },
  { id: 'e6', side: 'L', date: 'June 14, 2026', time: '1:00 PM - 1:45 PM',   title: 'Quant Finance',    desc: 'Harshil Chaudhary on quantitative finance and analytics.' },
  { id: 'e7', side: 'R', date: 'June 14, 2026', time: '3:00 PM - 3:45 PM',   title: 'Automobile',       desc: 'Parul Pradhan on the automobile industry and innovation.' },
];

function buildTitle(text) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="tl-ww">
      <span className="tl-w">{word}</span>
    </span>
  ));
}

export default function Timeline() {
  const tlRef    = useRef(null);
  const svgRef   = useRef(null);
  const trackRef = useRef(null);
  const progRef  = useRef(null);
  const cardRefs = useRef([]);
  const fracsRef = useRef([]);
  const doneRef  = useRef(new Set());
  const pLenRef  = useRef(0);

  const CARD_H = 148;
  const SLOT   = 300;
  const TOP    = 30;
  const BOT    = 80;

  function cy(i) { return TOP + i * SLOT + CARD_H / 2; }
  function totalH() { return TOP + events.length * SLOT + BOT; }

  function buildPath(W, H) {
    const n   = events.length;
    const cx  = W * 0.5;
    const isMobile = W <= 640;

    if (isMobile) {
      return `M ${cx} ${cy(0)} L ${cx} ${H}`;
    }

    const L  = W * 0.41;
    const R  = W * 0.59;
    const fL = W * 0.02;
    const fR = W * 0.98;

    // Build path dynamically for however many events exist
    const ys = events.map((_, i) => cy(i));
    let d = `M ${ys[0] === cy(0) && events[0].side === 'L' ? L : R} ${ys[0]}`;

    for (let i = 0; i < n - 1; i++) {
      const fromX = events[i].side === 'L' ? L : R;
      const toX   = events[i + 1].side === 'L' ? L : R;
      const c1x   = events[i].side === 'L' ? fL : fR;
      const c2x   = events[i + 1].side === 'L' ? fR : fL;
      d += ` C ${c1x} ${ys[i] + (ys[i+1]-ys[i])*0.3}, ${c2x} ${ys[i] + (ys[i+1]-ys[i])*0.7}, ${toX} ${ys[i+1]}`;
    }

    // Tail to bottom
    const lastY = ys[n - 1];
    const lastSideX = events[n - 1].side === 'L' ? L : R;
    d += ` C ${lastSideX > cx ? fR : fL} ${lastY + (H - lastY) * 0.5}, ${cx} ${H - BOT * 0.3}, ${cx} ${H}`;

    return d;
  }

  function build() {
    const W = window.innerWidth;
    const H = totalH();

    cardRefs.current.forEach((el, i) => {
      if (el) el.style.top = (cy(i) - CARD_H / 2) + 'px';
    });

    if (tlRef.current)  tlRef.current.style.height  = H + 'px';
    if (svgRef.current) {
      svgRef.current.setAttribute('height', H);
      svgRef.current.setAttribute('viewBox', `0 0 ${W} ${H}`);
    }

    const d = buildPath(W, H);
    if (trackRef.current) trackRef.current.setAttribute('d', d);
    if (progRef.current)  progRef.current.setAttribute('d', d);

    const pe   = progRef.current;
    const pLen = pe.getTotalLength();
    pLenRef.current          = pLen;
    pe.style.strokeDasharray  = pLen;
    pe.style.strokeDashoffset = pLen;

    const y0 = cy(0);
    fracsRef.current = events.map((_, i) => {
      if (i === 0) return 0;
      const el       = cardRefs.current[i];
      const cardMidY = el ? parseFloat(el.style.top) + CARD_H / 2 : cy(i);
      return Math.min(1, Math.max(0, (cardMidY - y0) / (H - y0)));
    });
  }

  function onScroll() {
    const tl   = tlRef.current;
    const prog = progRef.current;
    if (!tl || !prog) return;

    const rect      = tl.getBoundingClientRect();
    const scrolled  = -rect.top;
    const available = tl.offsetHeight - window.innerHeight;
    const p         = Math.min(1, Math.max(0, scrolled / Math.max(1, available)));
    const pLen      = pLenRef.current;

    prog.style.strokeDashoffset = pLen - p * pLen;

    fracsRef.current.forEach((frac, i) => {
      if (!doneRef.current.has(i) && p >= frac) {
        doneRef.current.add(i);
        cardRefs.current[i]?.classList.add('tl-on');
      }
    });
  }

  useEffect(() => {
    build();
    const handleScroll = () => onScroll();
    const handleResize = () => {
      doneRef.current.clear();
      cardRefs.current.forEach(el => el?.classList.remove('tl-on'));
      build();
      onScroll();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <section className="tl-hero">
        <span className="tl-badge">📅 Schedule</span>
        <h1 className="tl-hero-title">
          Event<br /><span>Timeline.</span>
        </h1>
        <p className="tl-hero-sub">
          Mark your calendar and don't miss any part of this exciting event.
        </p>
        <div className="tl-scroll-hint">
          <div className="tl-mouse"><div className="tl-wheel" /></div>
          scroll
        </div>
      </section>

      <div className="tl-wrap" ref={tlRef}>
        <svg className="tl-svg" ref={svgRef} xmlns="http://www.w3.org/2000/svg">
          <path id="tl-track" ref={trackRef} fill="none" stroke="rgba(242,100,25,0.12)" strokeWidth="7" strokeLinecap="round" />
          <path id="tl-prog"  ref={progRef}  fill="none" stroke="#F26419" strokeWidth="7" strokeLinecap="round" />
        </svg>

        {events.map((ev, i) => (
          <div
            key={ev.id}
            className={`tl-card ${ev.side === 'L' ? 'tl-L' : 'tl-R'}`}
            ref={el => (cardRefs.current[i] = el)}
          >
            <p className="tl-date">{ev.date}{ev.time ? ` | ${ev.time}` : ''}</p>
            <h3 className="tl-title">{buildTitle(ev.title)}</h3>
            <p className="tl-desc">{ev.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}