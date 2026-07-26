export function Marquee({ words }: { words: string[] }) {
  const list = [...words, ...words];
  return (
    <div className="relative w-full overflow-hidden border-y hairline bg-[color:var(--surface)] py-6">
      <div className="flex whitespace-nowrap animate-marquee">
        {list.map((w, i) => (
          <span
            key={i}
            className="mx-8 font-display text-3xl font-semibold uppercase tracking-tight text-white/40 sm:text-5xl"
          >
            {w}
            <span className="mx-8 text-flame">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
