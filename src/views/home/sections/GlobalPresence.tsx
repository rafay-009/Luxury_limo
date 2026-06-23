"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Car, Clock, Headphones, MapPin, Star, TrendingUp } from "lucide-react";
import { worldMapVector } from "@/pages/home/assets";
import { GLOBAL_PRESENCE_DESKTOP_STATS, GLOBAL_PRESENCE_MOBILE_STATS } from "@/constants";
import { parseCountTarget } from "@/lib/utils";

export function GlobalPresence() {
  return (
    <section className="section section--black section-pad section-pad--compact relative overflow-hidden" aria-label="Global presence">
      <WorldMapBackground />

      <div className="section-inner relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-14">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="section-header section-header--left text-center lg:text-left"
          >
            <h2 className="heading-display heading-display--light">
              <span className="block text-accent-bright">Global</span>
              <span className="block">Presence</span>
            </h2>
            <p className="section-lead mx-auto max-w-[300px] lg:mx-0">Operating and expanding across key markets</p>
          </motion.header>

          {/* Mobile / tablet: 2×3 */}
          <div className="relative grid grid-cols-2 lg:hidden">
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
            {GLOBAL_PRESENCE_MOBILE_STATS.map((stat, index) => (
              <StatCell key={stat.label} stat={stat} index={index} mobile />
            ))}
          </div>

          {/* Desktop: 3×2 — matches reference */}
          <div className="hidden lg:grid lg:grid-cols-3">
            {GLOBAL_PRESENCE_DESKTOP_STATS.map((stat, index) => (
              <StatCell key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCell({
  stat,
  index,
  mobile = false,
}: {
  stat: { label: string; value: string; icon: typeof Car };
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={
        mobile
          ? "flex min-h-[96px] flex-col items-center justify-center px-3 py-4 text-center sm:min-h-[104px] sm:px-4 [&:nth-child(-n+4)]:border-b [&:nth-child(-n+4)]:border-white/10"
          : "flex min-h-[108px] flex-col justify-center border-white/10 px-5 py-4 xl:px-6 [&:nth-child(3n+2)]:border-l [&:nth-child(3n+3)]:border-l [&:nth-child(n+4)]:border-t"
      }
    >
      <stat.icon className="h-5 w-5 text-white" strokeWidth={1.6} aria-hidden />
      <p className="mt-2.5 text-[clamp(1.25rem,2.2vw,1.65rem)] font-bold leading-none text-white">
        <AnimatedStat value={stat.value} />
      </p>
      <p className="mt-1.5 text-[11px] font-normal text-zinc-500 sm:text-[12px]">{stat.label}</p>
    </motion.div>
  );
}

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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
    if (inView) raw.set(target);
  }, [inView, raw, target]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

function WorldMapBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.14] lg:opacity-[0.11]"
      aria-hidden
    >
      <Image
        src={worldMapVector}
        alt=""
        width={1360}
        height={301}
        className="h-auto w-[min(110%,900px)] max-h-[55%] object-contain object-center"
        sizes="900px"
        priority={false}
      />
    </div>
  );
}
