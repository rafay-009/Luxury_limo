"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CheckSquare, Shield, Users } from "lucide-react";
import { heroBg } from "@/page-modules/home/assets";
import { HERO_COUNTRIES, HERO_PROOF, SITE_CONFIG } from "@/constants";
import { BookingWidget } from "@/views/shared/sections/BookingWidget";
import { Icon } from "@/components/ui/Icon";
import { fadeInVariant, fadeUpVariant, staggerContainer } from "@/lib/animations";

export function HeroSection() {
  const { hero } = SITE_CONFIG;
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05050a]">
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeInVariant}
      >
        <Image src={heroBg} alt={hero.backgroundImage.alt} fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,4,10,0.58)_0%,rgba(5,5,12,0.72)_38%,rgba(5,5,10,0.82)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,4,10,0.88)_0%,rgba(5,5,12,0.54)_47%,rgba(5,5,10,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(255,52,183,0.22),transparent_20rem)] lg:bg-[radial-gradient(circle_at_48%_62%,rgba(255,52,183,0.18),transparent_26rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#05050a] to-transparent" />
      </motion.div>

      <div className="site-container relative z-10 flex min-h-screen flex-col items-center gap-5 pb-6 pt-[7.5rem] sm:gap-6 sm:pt-[8.5rem] lg:grid lg:min-h-screen lg:grid-cols-[minmax(0,520px)_420px] lg:items-center lg:justify-between lg:gap-8 lg:pb-10 lg:pt-[6.5rem]">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerContainer}
          className="w-full max-w-[520px] text-center lg:max-w-none lg:-translate-x-2 lg:text-left"
        >
          <motion.div
            variants={fadeUpVariant}
            className="mb-7 hidden items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-[15px] font-normal text-white shadow-2xl backdrop-blur-xl lg:inline-flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            1,284 rides completed in the last 24 hours
          </motion.div>

          <motion.div variants={fadeUpVariant} className="mb-6 hidden flex-wrap gap-x-8 gap-y-3 text-[15px] font-normal text-slate-100 lg:flex">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" aria-hidden />
              Licensed & insured
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" aria-hidden />
              Professional chauffeurs
            </span>
            <span className="flex items-center gap-2">
              <Icon name="Clock" className="h-4 w-4" />
              24/7 match-day support
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            className="heading-hero-home mx-auto text-white lg:max-w-none"
          >
            <span className="block lg:whitespace-nowrap">
              <span className="text-cyan-400">Premium</span>
              <span className="lg:hidden"> chauffeur</span>
              <span className="hidden lg:inline"> Chauffeur</span>
            </span>
            <span className="block lg:whitespace-nowrap">
              <span className="lg:hidden">rides across Canada</span>
              <span className="hidden lg:inline">Rides Across Canada</span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="mx-auto mt-4 max-w-[340px] text-[clamp(0.875rem,0.8rem+0.35vw,1.3125rem)] font-normal leading-[1.55] text-slate-200 sm:mt-6 sm:max-w-[660px] sm:leading-[1.45] sm:text-slate-100 lg:mx-0"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div variants={fadeUpVariant} className="mt-10 hidden flex-nowrap items-center gap-2 lg:flex">
            {HERO_COUNTRIES.map((country) => (
              <span
                key={country.label}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-normal text-white shadow-xl backdrop-blur-xl"
              >
                <Image src={country.logo} alt="" className="h-5 w-5 shrink-0 rounded-full object-cover" width={20} height={20} />
                {country.label === "United Kingdom" ? (
                  <>
                    <span className="xl:hidden">UK</span>
                    <span className="hidden xl:inline">United Kingdom</span>
                  </>
                ) : (
                  country.label
                )}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUpVariant} className="mt-9 hidden flex-wrap gap-7 text-[15px] font-normal text-slate-100 lg:flex">
            {HERO_PROOF.map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <Image src={item.logo} alt="" className="h-4 w-4 object-contain" width={16} height={16} />
                {item.label}
              </span>
            ))}
            <span className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-emerald-300" aria-hidden />
              Licensed
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-booking-form w-full self-center lg:translate-x-4 lg:translate-y-5 xl:translate-x-8"
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65 }}
        >
          <BookingWidget />
        </motion.div>
      </div>
    </section>
  );
}
