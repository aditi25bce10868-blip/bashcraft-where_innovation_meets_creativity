import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbox } from "./Lightbox";
import { TiltCard } from "./TiltCard";

export function Gallery({
  images,
}: {
  images: { src: string; alt: string; span?: "wide" | "tall" | "std" }[];
}) {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className=""
          >
            <TiltCard intensity={5}>
              <button
                onClick={() => setIdx(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border hairline bg-[color:var(--surface-elev)]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                  style={{ aspectRatio: "4/3" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="mono-label absolute bottom-3 left-3 text-stark-white/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {String(i + 1).padStart(2, "0")} · VIEW
                </span>
              </button>
            </TiltCard>
          </motion.div>
        ))}
      </div>
      <Lightbox images={images} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </div>
  );
}
