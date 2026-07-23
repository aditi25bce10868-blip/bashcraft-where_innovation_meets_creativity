# BashCraft Club — Website

A high-impact, brutalist-themed website for **BashCraft Club**, built with React, Tailwind CSS, and Framer Motion. Features a full sketch-draw intro sequence, smooth-scroll (Lenis), and a strict "Obsidian Scarlet" design system (pitch black / vibrant scarlet / stark white — no gradients, no rounded corners, instant hover states).

> This repo is intended for event/demo purposes but built to production quality.

---

## Contents

```
├── BASHCRAFT_CLUB_BUILD_PROMPT.md   # Full build spec for AI IDEs (Cursor/Windsurf/Claude Code)
├── src/
│   ├── components/                  # Navbar, Footer, IntroLoader, shared UI
│   ├── pages/                       # Home, About, Events, Team, Contact
│   ├── constants/                   # events.js, team.js, socials.js — single source of truth for content
│   ├── lib/
│   │   ├── motion.js                 # Shared Framer Motion variants (fadeInUp, staggerContainer, popOnHover)
│   │   └── lenis.js                  # Smooth-scroll init
│   └── App.jsx                       # Router + route transitions + Lenis lifecycle
├── index.html
├── tailwind.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm (or pnpm/yarn — adjust commands accordingly)

### Install
```bash
npm install
```

### Run locally
```bash
npm run dev
```
Opens at `http://localhost:5173` by default (Vite).

### Build for production
```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Design System — "Obsidian Scarlet"

| Token | Value |
|---|---|
| Pitch Black | `#000000` |
| Vibrant Scarlet | `#FF0000` |
| Stark White | `#FFFFFF` |
| Display font | Anybody (700/800) |
| Body font | Hanken Grotesk |
| Mono/label font | Space Mono |

Rules:
- **Sharp corners only** — `border-radius: 0` everywhere except functional circles (status dots).
- **No gradients, no shadows, no blur.** Depth = tonal layering + 1–2px borders.
- **Hover states are instant**, not eased — color/background swaps happen with `transition: none`. Only scale, opacity, and scroll-reveal animations are eased.
- Full token reference and component rules live in `BASHCRAFT_CLUB_BUILD_PROMPT.md` (Section 2).

---

## The Intro Sequence

On first load of `/` in a session, an SVG wireframe sketch draws itself (stroke animation), the BashCraft Club logo pops in with a spring animation, then the loader wipes away to reveal the homepage. It only plays once per session (`sessionStorage`) and respects `prefers-reduced-motion`. Full implementation spec is in the build prompt, Section 5.

---

## Content Management

All editable content lives in `src/constants/`, not hardcoded in components:
- `team.js` — full roster (name, role, photo, bio)
- `events.js` — upcoming + archived events
- `socials.js` — Instagram / GitHub / LinkedIn URLs, contact email, newsletter link

Update these files to change site content without touching layout/markup.


---

## Tech Stack

- **React 18 + Vite**
- **Tailwind CSS** — utility classes, custom design tokens
- **Framer Motion** — component animation, hover pops, scroll reveals, page transitions
- **Lenis** — smooth scrolling
- **react-router-dom** — routing across Home / About / Events / Team / Contact

---

## Known TODOs

- [ ] Replace placeholder contact email (`HELLO@BASHCRAFT.CLUB`) with the real club email
- [ ] Add real photos for team members (currently using the bordered-icon fallback avatar)
- [ ] Confirm/replace sample events in `events.js` with current club events
- [ ] Confirm final footer sitemap column labels against club structure

---

## License

Internal club project — all rights reserved, BashCraft Club.
