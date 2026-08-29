import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    let raf = 0;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[400px] w-[400px] rounded-full opacity-70 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(255,106,0,0.22) 0%, rgba(255,106,0,0.08) 30%, transparent 70%)",
        filter: "blur(20px)",
      }}
    />
  );
}
