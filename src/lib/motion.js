// ============================================================
// BashCraft Club — Framer Motion Variants & Helpers
// ============================================================

export const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] }
  })
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

export const popOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.15, ease: 'easeOut' } }
};

export const viewportReveal = {
  once: true,
  amount: 0.2
};
