"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { heroImage, worldMapMobile } from "@/page-modules/newyork/assets";
import { BookingWidget } from "@/views/shared/sections/BookingWidget";
import { DestinationStatsBar } from "@/views/newyork/sections/DestinationStatsBar";
import { fadeInVariant, fadeUpVariant, staggerContainer } from "@/lib/animations";
import { NEW_YORK_HERO_SUBHEADLINE } from "@/constants";

export function NewYorkHero() {
  const reduceMotion = useReducedMotion();

  return (
    <>
    <section className="relative overflow-hidden bg-[#05050a]" aria-label="New York chauffeur service">
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeInVariant}
      >
        <div className="absolute inset-y-0 right-0 w-full sm:w-[88%] md:w-[78%] lg:w-[62%] xl:w-[56%]">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-contain object-right object-center"
            sizes="(min-width: 1280px) 56vw, 88vw"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,#05050a_0%,#05050a_28%,#05050a_38%,rgba(5,5,10,0.97)_44%,rgba(5,5,10,0.9)_50%,rgba(5,5,10,0.78)_56%,rgba(5,5,10,0.6)_62%,rgba(5,5,10,0.42)_68%,rgba(5,5,10,0.26)_74%,rgba(5,5,10,0.12)_80%,rgba(5,5,10,0.04)_86%,transparent_92%)]" />
        <div className="absolute inset-0 bg-[#05050a]/75 lg:hidden" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#05050a] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#05050a] via-[#05050a]/90 to-transparent" />
      </motion.div>

      <div className="site-container relative z-10 pb-6 pt-[calc(var(--site-header-height,9.5rem)+0.5rem)] sm:pb-8 sm:pt-[calc(var(--site-header-height,10.5rem)+0.5rem)] lg:pb-10 lg:pt-[calc(var(--site-header-height,9.5rem)+0.75rem)]">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerContainer}
          className="w-full max-w-[520px] text-left lg:mt-4"
        >
          <motion.h1
            variants={fadeUpVariant}
            className="text-[clamp(1.65rem,5.5vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.01em] text-white"
          >
            Premium Chauffeur Service In{" "}
            <span className="text-[#12b8d0]">New York</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="mt-3 max-w-[520px] text-[14px] font-normal leading-[1.55] text-slate-300 sm:text-[15px]"
          >
            {NEW_YORK_HERO_SUBHEADLINE}
          </motion.p>

          <motion.div variants={fadeUpVariant} className="mt-5 w-full max-w-[540px] sm:mt-6">
            <BookingWidget
              variant="destination"
              alignLeft
              submitLabel="Book Your Ride"
              showSupportButton
              simplifiedSteps
            />
          </motion.div>
        </motion.div>
      </div>
    </section>

    <div className="stats-section">
      <div className="stats-section__map lg:hidden" aria-hidden>
        <Image
          src={worldMapMobile}
          alt=""
          width={566}
          height={294}
          className="h-auto w-full max-h-[220px] object-contain object-center sm:max-h-[240px]"
          sizes="100vw"
        />
      </div>
      <div className="site-container relative z-10">
        <DestinationStatsBar />
      </div>
    </div>
  </>
  );
}
