import type { Variants } from "framer-motion";
import { SITE_CONFIG } from "@/constants";

const reveal = SITE_CONFIG.animations.scrollReveal;

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: reveal.yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reveal.duration, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: reveal.staggerChildren,
      delayChildren: reveal.defaultDelay,
    },
  },
};

export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
