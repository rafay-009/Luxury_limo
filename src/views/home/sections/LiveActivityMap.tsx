"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { LIVE_ACTIVITY_MARKERS } from "@/constants";

type MapDot = { x: number; y: number };

function addEllipseDots(dots: MapDot[], cx: number, cy: number, rx: number, ry: number, step: number, seed = 0) {
  for (let x = cx - rx; x <= cx + rx; x += step) {
    for (let y = cy - ry; y <= cy + ry; y += step) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const noise = Math.sin(x * 0.31 + seed) * Math.cos(y * 0.27 + seed) * 0.08;
      if (dx * dx + dy * dy <= 1 + noise) {
        dots.push({ x, y });
      }
    }
  }
}

function buildWorldDots(): MapDot[] {
  const dots: MapDot[] = [];

  // North America
  addEllipseDots(dots, 195, 145, 95, 58, 5.2, 1.2);
  addEllipseDots(dots, 168, 118, 42, 28, 5.5, 2.1);
  addEllipseDots(dots, 248, 132, 38, 34, 5.4, 3.4);

  // Greenland / Arctic
  addEllipseDots(dots, 318, 72, 28, 18, 6, 4.2);

  // South America
  addEllipseDots(dots, 298, 268, 52, 78, 5.3, 5.1);
  addEllipseDots(dots, 318, 228, 28, 22, 5.8, 6.2);

  // Europe
  addEllipseDots(dots, 488, 128, 58, 38, 5.1, 7.3);
  addEllipseDots(dots, 528, 108, 24, 16, 6.2, 8.1);

  // Africa
  addEllipseDots(dots, 518, 218, 48, 72, 5.4, 9.2);
  addEllipseDots(dots, 548, 168, 22, 18, 6, 10.5);

  // Middle East / India
  addEllipseDots(dots, 578, 178, 38, 32, 5.6, 11.4);
  addEllipseDots(dots, 638, 198, 32, 38, 5.5, 12.2);

  // Asia
  addEllipseDots(dots, 698, 148, 78, 52, 5.2, 13.1);
  addEllipseDots(dots, 748, 118, 42, 28, 5.8, 14.3);
  addEllipseDots(dots, 668, 198, 48, 34, 5.4, 15.2);

  // Southeast Asia / Indonesia
  addEllipseDots(dots, 718, 228, 38, 22, 5.6, 16.1);

  // Australia
  addEllipseDots(dots, 808, 278, 42, 28, 5.3, 17.4);

  // Japan
  addEllipseDots(dots, 798, 158, 14, 22, 6.2, 18.2);

  return dots;
}

function ActiveMarkerDot({ marker }: { marker: ActiveMarker }) {
  return (
    <g>
      <motion.circle
        cx={marker.x}
        cy={marker.y}
        r="14"
        fill="rgba(255,255,255,0.12)"
        animate={{ r: [10, 18, 10], opacity: [0.35, 0.08, 0.35] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: marker.delay }}
      />
      <motion.circle
        cx={marker.x}
        cy={marker.y}
        r="8"
        fill="rgba(255,255,255,0.2)"
        animate={{ r: [6, 11, 6], opacity: [0.5, 0.15, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: (marker.delay ?? 0) + 0.4 }}
      />
      <circle
        cx={marker.x}
        cy={marker.y}
        r="3.5"
        fill="#FFFFFF"
        style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.95)) drop-shadow(0 0 14px rgba(255,255,255,0.45))" }}
      />
    </g>
  );
}

export function LiveActivityMap() {
  const worldDots = useMemo(() => buildWorldDots(), []);
  const activeRides = 37;

  return (
    <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden bg-black sm:aspect-[16/10] sm:min-h-[330px]">
      <svg
        viewBox="0 0 960 400"
        className="h-full w-full min-w-0"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {worldDots.map((dot, index) => (
          <circle key={`${dot.x}-${dot.y}-${index}`} cx={dot.x} cy={dot.y} r="1.35" fill="#3a3a3a" />
        ))}

        {LIVE_ACTIVITY_MARKERS.map((marker) => (
          <ActiveMarkerDot key={marker.id} marker={marker} />
        ))}
      </svg>

      <motion.div
        className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-xl border border-white/10 bg-black/80 px-3 py-2.5 backdrop-blur-sm sm:left-5 sm:top-5 sm:px-5 sm:py-4"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
            <span className="absolute h-3 w-3 rounded-full bg-emerald-400/30" />
            <motion.span
              className="relative h-2 w-2 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.45, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 0 2px rgba(16,185,129,0.35), 0 0 10px rgba(16,185,129,0.65)" }}
            />
          </span>
          <p className="text-[clamp(1.5rem,6vw,2.25rem)] font-bold leading-none text-white">{activeRides}</p>
        </div>
        <p className="mt-1 text-[10px] font-normal text-white/85 sm:mt-1.5 sm:text-[12px]">rides active right now</p>
      </motion.div>
    </div>
  );
}
