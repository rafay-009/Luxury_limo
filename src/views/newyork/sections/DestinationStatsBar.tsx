"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { worldMapDesktop } from "@/page-modules/newyork/assets";
import { DESTINATION_STATS } from "@/constants";
import { parseCountTarget } from "@/lib/utils";

function AnimatedStat({ value }: { value: string }) {
  const reduceMotion = useReducedMotion();
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 55, damping: 18, mass: 0.8 });
  const target = parseCountTarget(value);

  const display = useTransform(spring, (latest) => {
    if (value.includes("/")) {
      if (target === 24) return latest >= 23.5 ? "24/7" : `${Math.round(latest)}/7`;
      return `${latest.toFixed(1)}/5`;
    }
    const formatted = target % 1 === 0 ? Math.round(latest).toLocaleString() : latest.toFixed(1);
    if (value.includes("%")) return `${formatted}%`;
    if (value.includes("+")) return `${formatted}+`;
    return formatted;
  });

  useEffect(() => {
    raw.set(target);
  }, [raw, target]);

  if (reduceMotion) {
    return <span>{value}</span>;
  }

  return <motion.span>{display}</motion.span>;
}

export function DestinationStatsBar() {
  return (
    <div className="card-stats">
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-[0.14] lg:flex" aria-hidden>
        <Image
          src={worldMapDesktop}
          alt=""
          width={566}
          height={294}
          className="h-full w-full object-cover object-center opacity-80"
          sizes="100vw"
        />
      </div>

      <div className="stats-grid">
        {DESTINATION_STATS.map((stat) => (
          <div key={stat.label} className="stats-cell">
            <p className="stats-cell__value">
              <AnimatedStat value={stat.value} />
            </p>
            <p className="stats-cell__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
