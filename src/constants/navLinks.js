// ============================================================
// BashCraft — Navigation Links
// Used by: Navbar component (desktop + mobile menu)
// If you add a new page, add its entry here — nowhere else.
// ============================================================

export const NAV_LINKS = [
  { label: "Home",        path: "/"          },
  { label: "About",       path: "/about"     },
  { label: "Speakers",    path: "/speakers"  },
  { label: "Schedule",    path: "/schedule"  },
  { label: "Contact",     path: "/contact"   },
];

// Anchor links used on the Home page hero buttons
// (these scroll within the page, not React Router routes)
export const ANCHOR_LINKS = [
  { label: "About",       href: "#about"       },
  { label: "Speakers",    href: "#speakers"    },
  { label: "Highlights",  href: "#highlights"  },
  { label: "Timeline",    href: "#timeline"    },
  { label: "Instructions",href: "#instructions"},
  { label: "Contact",     href: "#contact"     },
];
