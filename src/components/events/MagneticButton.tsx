import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  intensity?: number;
  variant?: "flame" | "ghost";
};

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MB(
  {
    children,
    intensity = 0.35,
    variant = "flame",
    className = "",
    onMouseMove,
    onMouseLeave,
    onClick,
    ...rest
  },
  ref,
) {
  const inner = useRef<HTMLSpanElement>(null);
  const rippleHost = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(e);
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
    if (inner.current)
      inner.current.style.transform = `translate(${x * intensity * 0.4}px, ${y * intensity * 0.4}px)`;
  };
  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e);
    e.currentTarget.style.transform = "";
    if (inner.current) inner.current.style.transform = "";
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const host = rippleHost.current;
    if (host) {
      const r = e.currentTarget.getBoundingClientRect();
      const d = document.createElement("span");
      const size = Math.max(r.width, r.height);
      d.style.cssText = `position:absolute;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px;width:${size}px;height:${size}px;border-radius:9999px;background:rgba(255,255,255,0.25);transform:scale(0);opacity:1;transition:transform 600ms ease,opacity 800ms ease;pointer-events:none;`;
      host.appendChild(d);
      requestAnimationFrame(() => {
        d.style.transform = "scale(1)";
        d.style.opacity = "0";
      });
      setTimeout(() => d.remove(), 900);
    }
    onClick?.(e);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-[background,color,box-shadow] duration-300 will-change-transform";
  const styles =
    variant === "flame"
      ? "bg-flame text-black hover:shadow-[0_20px_60px_-15px_rgba(255,106,0,0.6)]"
      : "border hairline text-stark-white hover:border-flame hover:text-flame";

  return (
    <button
      ref={ref}
      className={`${base} ${styles} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      {...rest}
    >
      <span
        ref={rippleHost}
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      />
      <span ref={inner} className="relative z-[1] inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
});
