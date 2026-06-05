// Timeline page — assign to: Raunak Sharma
import { useEffect, useRef } from 'react';
import './Timeline.css';

const events = [
  {
    id: 1,
    date: 'June 1, 2026',
    time: null,
    title: 'Registration Opens',
    description: 'Sign up early to secure your spot. Limited seats available for this exclusive session.',
    side: 'right',
  },
  {
    id: 2,
    date: 'June 10, 2026',
    time: '10:00 AM',
    title: 'Opening Ceremony',
    description: 'Welcome address and introduction to our distinguished panel of speakers.',
    side: 'left',
  },
  {
    id: 3,
    date: 'June 10, 2026',
    time: '11:00 AM',
    title: 'Speaker Sessions',
    description: 'In-depth presentations from industry experts sharing their experiences and insights.',
    side: 'right',
  },
  {
    id: 4,
    date: 'June 10, 2026',
    time: '2:00 PM',
    title: 'Live Q&A',
    description: 'Interactive session where you can ask questions directly to our speakers.',
    side: 'left',
  },
  {
    id: 5,
    date: 'June 10, 2026',
    time: '4:00 PM',
    title: 'Closing & Networking',
    description: 'Wrap-up, key takeaways, and virtual networking opportunities.',
    side: 'right',
  },
];

function buildTitle(text) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="tl-word-wrap">
      <span className="tl-word">{word}</span>
    </span>
  ));
}

export default function Timeline() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="tl-page">

      {/* ── Hero ── */}
      <section className="tl-hero">
        <span className="tl-badge">📅 Schedule</span>
        <h1 className="tl-heading">Event Timeline</h1>
        <p className="tl-subheading">
          Mark your calendar and don't miss any part of this exciting event.
        </p>
      </section>

      {/* ── Timeline ── */}
      <section className="tl-timeline">
        <div className="tl-line" />

        {events.map((event, i) => (
          <div
            key={event.id}
            className={`tl-row ${event.side}`}
          >
            <div className="tl-spacer" />
            <div className="tl-dot" />
            <div
              className="tl-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <p className="tl-card-date">
                {event.date}{event.time ? ` | ${event.time}` : ''}
              </p>
              <h3 className="tl-card-title">
                {buildTitle(event.title)}
              </h3>
              <p className="tl-card-desc">{event.description}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
