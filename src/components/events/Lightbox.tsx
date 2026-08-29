import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onClose, onIndex]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            className="absolute right-4 top-4 z-10 rounded-full border hairline p-3 text-stark-white/80 hover:text-flame"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border hairline p-3 text-stark-white/80 hover:text-flame"
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index - 1 + images.length) % images.length);
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border hairline p-3 text-stark-white/80 hover:text-flame"
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index + 1) % images.length);
            }}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <motion.img
            key={index}
            src={images[index].src}
            alt={images[index].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="mono-label absolute bottom-6 left-1/2 -translate-x-1/2">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
