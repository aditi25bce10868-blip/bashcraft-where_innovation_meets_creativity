// ============================================================
// BashCraft Club — Lenis Smooth Scroll Manager
// ============================================================

import Lenis from 'lenis';

let lenisInstance = null;

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });

  function raf(time) {
    if (lenisInstance) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
  }

  requestAnimationFrame(raf);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}
