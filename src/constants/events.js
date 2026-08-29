// ============================================================
// BashCraft Club — Events Data
// Single source of truth for all event content.
// ============================================================

import techtalkImg from '../assets/events/techtalk-arpit-bhayani.png';
import investathonImg from '../assets/events/investathon.png';
import socialLoopImg from '../assets/events/social-loop-cover.jpeg';

export const UPCOMING_EVENTS = [
  {
    id: 'evt-001',
    slug: '/events/social-loop',
    title: 'SOCIAL LOOP',
    date: '2026-09-13T14:00:00+05:30',
    displayDate: '13 SEP · 2026',
    location: 'AB-1 AUDI-1, VIT BHOPAL',
    tentative: false,
    description: "Presented by BashCraft Club — VIT Bhopal's freshers' talent show. Singing, dance, stand-up, acting, storytelling, poetry, beatboxing, and more. Solo, Duo, Trio, Squad, or Squad+. 2 PM – 7 PM at AB-1 Audi-1. Registration mail will be shared soon.",
    image: socialLoopImg,
    registrationUrl: null,
  },
];

export const PAST_EVENTS = [
  {
    id: 'evt-p01',
    index: '001',
    title: "BASHNEX'26 — THE SPECTRUM OF TECH",
    date: 'JUN 13–14, 2026',
    location: 'ONLINE',
    description: 'A two-day online mentorship event featuring speakers from JPMorgan Chase, Amazon, Morgan Stanley, Ericsson, Mercedes-Benz R&D, and more. Students got direct access to industry leaders across engineering, AI, finance, and design.',
    image: null,
  },
  {
    id: 'evt-p02',
    index: '002',
    title: 'TECHTALK WITH ARPIT BHAYANI',
    date: '2025',
    location: 'ONLINE',
    description: 'BashCraft hosted a live session with Arpit Bhayani, Co-founder and CTO at Duggup, exploring current trends in software development and what it takes for students to break into the industry. The conversation covered AI, engineering careers, and where the tech landscape is heading.',
    image: techtalkImg,
  },
  {
    id: 'evt-p03',
    index: '003',
    title: 'INVESTATHON',
    date: 'MAR 26, 2025',
    location: 'VIT BHOPAL',
    description: 'Held in partnership with Zerodha, Investathon combined a hands-on workshop on building personal investment portfolios with a follow-up finance hackathon. Teams designed and built a finance platform from scratch, tackling real UI/UX and technical challenges within a set time limit.',
    image: investathonImg,
  },
];
