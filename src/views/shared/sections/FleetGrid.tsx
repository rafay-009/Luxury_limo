"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE_CONFIG } from "@/constants";
import { FleetCard } from "@/views/shared/sections/FleetCard";
import { cn } from "@/lib/utils";

export function FleetGrid({ preview = false }: { preview?: boolean }) {
  const { fleet } = SITE_CONFIG;
  const [activeCategory, setActiveCategory] = useState(fleet.categories[0].id);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const vehicles = useMemo(() => {
    const filtered = fleet.vehicles.filter((vehicle) => vehicle.category === activeCategory);
    return preview ? filtered.slice(0, 3) : filtered;
  }, [activeCategory, fleet.vehicles, preview]);

  useEffect(() => {
    setCarouselIndex(0);
  }, [activeCategory]);

  function goPrev() {
    setCarouselIndex((index) => (index - 1 + vehicles.length) % vehicles.length);
  }

  function goNext() {
    setCarouselIndex((index) => (index + 1) % vehicles.length);
  }

  return (
    <section className="section section--light section-pad" aria-label="Fleet">
      <div className="section-inner">
        <header className="section-header section-header--center">
          <h2 className="heading-display heading-display--dark">
            Our <span className="text-accent">Fleet</span>
          </h2>
          <p className="section-lead">{fleet.page.subtitle}</p>
        </header>

        <div className="section-body content-wide">
        <div className="scrollbar-hide -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:mt-16 sm:justify-center sm:overflow-visible sm:px-0 md:hidden">
          {fleet.categories.map((category) => (
            <button
              key={category.id}
              className={cn(
                "focus-ring shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-[13px] transition",
                activeCategory === category.id
                  ? "bg-black font-semibold text-white shadow-[0_5px_14px_rgba(0,0,0,0.35)]"
                  : "font-normal text-zinc-600 hover:bg-zinc-100"
              )}
              onClick={() => setActiveCategory(category.id)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-6 hidden w-fit max-w-full items-center justify-center gap-1 rounded-full border border-zinc-200 bg-white p-1 shadow-[0_10px_28px_rgba(0,0,0,0.06)] md:mt-16 md:flex">
          {fleet.categories.map((category) => (
            <button
              key={category.id}
              className={cn(
                "focus-ring h-10 shrink-0 whitespace-nowrap rounded-full px-4 text-[13px] transition",
                activeCategory === category.id ? "bg-black font-semibold text-white shadow-[0_5px_14px_rgba(0,0,0,0.35)]" : "font-normal text-zinc-700 hover:bg-zinc-100"
              )}
              onClick={() => setActiveCategory(category.id)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>

        {vehicles.length > 0 ? (
          <div className="relative mx-auto mt-8 max-w-[420px] md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={vehicles[carouselIndex].id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                <FleetCard vehicle={vehicles[carouselIndex]} onPrev={goPrev} onNext={goNext} />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : null}

        <motion.div layout className="content-wide mx-auto mt-10 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {vehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
              >
                <FleetCard vehicle={vehicle} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
