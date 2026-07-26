import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX: width, transformOrigin: "0% 50%" }}
      className="fixed left-0 top-0 z-[70] h-[2px] w-full bg-flame"
      aria-hidden
    />
  );
}
