// Timeline page — assign to: Raunak Sharma
import { useEffect, useRef } from 'react';
import './Timeline.css';

const events = [
  // DAY 1 — 13 Jun
  { id: 'e0', side: 'L', date: 'June 13, 2026', time: '2:30 PM - 3:15 PM',  title: 'UI/UX Designer',   desc: 'Avinash Bussa shares his journey and insights on UI/UX design and crafting great user experiences.' },
  { id: 'e1', side: 'R', date: 'June 13, 2026', time: '3:30 PM - 4:15 PM',  title: 'AI + Prompt',      desc: 'Mukesh Kala shares insights on AI and prompt engineering.' },
  { id: 'e2', side: 'L', date: 'June 13, 2026', time: '4:30 PM - 5:15 PM',  title: 'Manager / VP',     desc: 'Azmina Poddar on leadership, management and career growth.' },
  { id: 'e3', side: 'R', date: 'June 13, 2026', time: '5:30 PM - 6:15 PM',  title: 'HR',               desc: 'Ashish Mittal on hiring, human resources and workplace culture.' },
  // DAY 2 — 14 Jun
  { id: 'e4', side: 'L', date: 'June 14, 2026', time: '11:00 AM - 11:45 AM', title: 'Mechanical',       desc: 'Mahesh Kumar Singh on mechanical engineering, industry applications and career opportunities in the field.' },
  { id: 'e5', side: 'R', date: 'June 14, 2026', time: '12:00 PM - 12:45 PM', title: 'Software',         desc: 'Saptarshi De on software engineering and industry trends.' },
  { id: 'e6', side: 'L', date: 'June 14, 2026', time: '1:00 PM - 1:45 PM',   title: 'Quant Finance',    desc: 'Harshil Chaudhary on quantitative finance and analytics.' },
  { id: 'e7', side: 'R', date: 'June 14, 2026', time: '3:00 PM - 3:45 PM',   title: 'Automobile',       desc: 'Parul Pradhan on the automobile industry and innovation.' },
  { id: 'e8', side: 'L', date: 'June 14, 2026', time: '4:00 PM - 4:45 PM',   title: 'Core Engineering', desc: 'Speaker to be announced. Stay tuned for updates.' },
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

  function build() {
    const W = window.innerWidth;
    const H = totalH();
    const isMobile = W <= 640;

    cardRefs.current.forEach((el, i) => {
      if (el) el.style.top = (cy(i) - CARD_H / 2) + 'px';
    });

    if (tlRef.current)  tlRef.current.style.height  = H + 'px';
    if (svgRef.current) {
      svgRef.current.setAttribute('height', H);
      svgRef.current.setAttribute('viewBox', `0 0 ${W} ${H}`);
    }

    const cx = W * 0.5;
    const y0 = cy(0);

    let d;
    if (isMobile) {
      // Straight vertical line down the centre on mobile
      d = `M ${cx} ${y0} L ${cx} ${H}`;
    } else {
      const L  = W * 0.41;
      const R  = W * 0.59;
      const fL = W * 0.02;
      const fR = W * 0.98;

      const y1=cy(1), y2=cy(2), y3=cy(3), y4=cy(4),
            y5=cy(5), y6=cy(6), y7=cy(7), y8=cy(8);

      d = `M ${L} ${y0}`;
      d += ` C ${fL} ${y0+(y1-y0)*0.3}, ${fR} ${y0+(y1-y0)*0.7}, ${R} ${y1}`;
      d += ` C ${fR} ${y1+(y2-y1)*0.3}, ${fL} ${y1+(y2-y1)*0.7}, ${L} ${y2}`;
      d += ` C ${fL} ${y2+(y3-y2)*0.3}, ${fR} ${y2+(y3-y2)*0.7}, ${R} ${y3}`;
      d += ` C ${fR} ${y3+(y4-y3)*0.3}, ${fL} ${y3+(y4-y3)*0.7}, ${L} ${y4}`;
      d += ` C ${fL} ${y4+(y5-y4)*0.3}, ${fR} ${y4+(y5-y4)*0.7}, ${R} ${y5}`;
      d += ` C ${fR} ${y5+(y6-y5)*0.3}, ${fL} ${y5+(y6-y5)*0.7}, ${L} ${y6}`;
      d += ` C ${fL} ${y6+(y7-y6)*0.3}, ${fR} ${y6+(y7-y6)*0.7}, ${R} ${y7}`;
      d += ` C ${fR} ${y7+(y8-y7)*0.3}, ${fL} ${y7+(y8-y7)*0.7}, ${L} ${y8}`;
      d += ` C ${fL} ${y8+(H-y8)*0.5}, ${cx} ${H-BOT*0.3}, ${cx} ${H}`;
    }

    if (trackRef.current) trackRef.current.setAttribute('d', d);
    if (progRef.current)  progRef.current.setAttribute('d', d);

    const pe = progRef.current;
    const pLen = pe.getTotalLength();
    pLenRef.current = pLen;
    pe.style.strokeDasharray  = pLen;
    pe.style.strokeDashoffset = pLen;

    // Performance fix: compute fracs from card Y positions instead of
    // expensive 2000-step getPointAtLength loop per card
    fracsRef.current = events.map((_, i) => {
      if (i === 0) return 0;
      const el = cardRefs.current[i];
      const cardMidY = el
        ? parseFloat(el.style.top) + CARD_H / 2
        : cy(i);
      // Approximate path fraction: path travels from y0 to H,
      // so fraction ≈ (cardMidY - y0) / (H - y0), clamped.
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

