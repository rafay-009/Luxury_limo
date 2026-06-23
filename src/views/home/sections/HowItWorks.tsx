"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { tripDetailsMockup } from "@/page-modules/home/assets";
import { SITE_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const config = SITE_CONFIG.howItWorks;
  const [activeStep, setActiveStep] = useState(config.steps[0].step);

  return (
    <section className="section section--black section-pad" aria-label="How it works">
      <div className="section-inner">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)] lg:gap-12 xl:gap-16">
          <div className="flex flex-col">
            <header className="section-header section-header--left lg:text-left">
              <h2 className="heading-display heading-display--light">
                How It <span className="text-accent-bright">Works</span>
              </h2>
              <p className="section-lead mx-auto max-w-[520px] lg:mx-0">{config.subheading}</p>
            </header>

            <div className="mt-8 grid max-w-[760px] gap-3 sm:mt-10 sm:gap-4 lg:max-w-none">
              {config.steps.map((step) => {
              const isOpen = step.step === activeStep;

              return (
                <button
                  key={step.step}
                  aria-expanded={isOpen}
                  className={cn(
                    "focus-ring rounded-[18px] border text-left transition duration-300 sm:rounded-[22px]",
                    isOpen
                      ? "border-white/25 bg-black px-5 py-5 shadow-[0_28px_70px_rgba(0,0,0,0.8)] sm:px-7 sm:py-7"
                      : "border-white/5 bg-[#121212] px-5 py-5 hover:border-white/15 hover:bg-[#171717] sm:px-7 sm:py-6"
                  )}
                  onClick={() => setActiveStep(step.step)}
                  type="button"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="w-8 shrink-0 text-xl font-semibold text-cyan-400 sm:w-10 sm:text-2xl">
                      {String(step.step).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className={cn("text-base sm:text-xl", isOpen ? "font-bold text-white" : "font-normal text-zinc-500")}>
                          {step.title}
                        </h3>
                        {isOpen ? (
                          <Minus className="h-5 w-5 shrink-0 text-zinc-300" aria-hidden />
                        ) : (
                          <Plus className="h-5 w-5 shrink-0 text-zinc-500" aria-hidden />
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.p
                            className="mt-2 text-[14px] font-normal leading-6 text-slate-200 sm:text-[15px] sm:leading-7"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            {step.description}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
              })}
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[320px] w-full max-w-[300px] items-center justify-center sm:max-w-[380px] lg:min-h-[540px] lg:max-w-[470px]">
            <div
              className="pointer-events-none absolute left-1/2 top-[54%] z-0 aspect-square w-[108%] max-w-[400px] -translate-x-1/2 -translate-y-1/2"
              aria-hidden
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14)_0%,rgba(34,211,238,0.05)_36%,transparent_54%)]" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_55%,rgba(34,211,238,0.18)_56.8%,rgba(34,211,238,0.06)_60%,transparent_62.5%)] blur-[0.5px]" />
            </div>
            <motion.div
              className="relative z-10 w-full"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="block rounded-[32px] transition duration-300 sm:rounded-[42px]">
                <Image
                  src={tripDetailsMockup}
                  alt="Trip details preview with estimated fare and Get Quote button"
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 430px, 85vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
