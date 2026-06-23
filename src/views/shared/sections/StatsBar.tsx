"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { SITE_CONFIG } from "@/constants";
import { Icon } from "@/components/ui/Icon";
import { parseCountTarget } from "@/lib/utils";

function Count({ value }: { value: string }) {
  const target = parseCountTarget(value);
  const spring = useSpring(0, { duration: 1800, bounce: 0 });
  const rounded = useTransform(spring, (latest) => {
    const display = target % 1 === 0 ? Math.round(latest).toLocaleString() : latest.toFixed(1);
    if (value.includes("+")) return `${display}+`;
    if (value.includes("/")) return value;
    return display;
  });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  if (inView) spring.set(target);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function StatsBar() {
  return (
    <section className="border-y border-white/10 bg-slate-950/70 py-8 backdrop-blur-xl" aria-label="Company statistics">
      <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SITE_CONFIG.company.stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 lg:border-r lg:border-white/10 lg:last:border-r-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
              <Icon name={stat.icon} className="h-6 w-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                <Count value={stat.value} />
              </div>
              <p className="text-sm font-normal text-slate-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
