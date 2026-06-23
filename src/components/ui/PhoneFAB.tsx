"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/constants";

export function PhoneFAB() {
  const fab = SITE_CONFIG.globalComponents.phoneFAB;
  if (!fab.show) return null;

  return (
    <motion.a
      href={`tel:${fab.number}`}
      aria-label={fab.label}
      className="glass glass-hover fixed bottom-5 right-5 z-50 hidden h-14 items-center gap-3 overflow-hidden rounded-full px-4 text-sm font-bold text-white shadow-cyan-500/20 transition-all hover:w-36 lg:flex"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", delay: 2, stiffness: 160, damping: 18 }}
    >
      <Phone className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden />
      <span className="whitespace-nowrap">{fab.label}</span>
    </motion.a>
  );
}
