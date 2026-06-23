"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Car, CircleDot, MapPin } from "lucide-react";
import { LiveActivityMap } from "@/views/home/sections/LiveActivityMap";
import { LIVE_ACTIVITY_BOOKINGS } from "@/constants";

export function LiveActivity() {
  return (
    <section className="section section--black section-pad overflow-x-hidden" aria-label="Live activity">
      <div className="section-inner min-w-0">
        <header className="section-header section-header--center">
          <h2 className="heading-display heading-display--light">
            Live <span className="text-accent">Activity</span>
          </h2>
          <p className="section-lead">Real rides happening right now across Canada</p>
        </header>

        <div className="section-body content-medium">
          <div className="w-full min-w-0 overflow-hidden rounded-[14px] border-4 border-white bg-[#f7f7f7] shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:rounded-[16px] md:border-8 lg:grid lg:grid-cols-[1.14fr_1fr]">
            <div className="min-w-0 bg-black">
              <LiveActivityMap />
            </div>

            <div className="min-w-0 p-4 md:p-6">
              <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-950 md:text-[17px]">
                <CircleDot className="h-4 w-4 shrink-0 fill-zinc-300 text-zinc-500" aria-hidden />
                Live Bookings
              </h3>

              <div className="relative mt-4 md:mt-5">
                <div className="grid max-h-[300px] gap-2.5 overflow-y-auto pr-0.5 [-ms-overflow-style:none] [scrollbar-width:none] md:max-h-none md:gap-3 md:overflow-visible [&::-webkit-scrollbar]:hidden">
                  {LIVE_ACTIVITY_BOOKINGS.map((booking, index) => (
                    <BookingRow key={`${booking.from}-${booking.to}-${index}`} booking={booking} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type LiveActivityBooking = (typeof LIVE_ACTIVITY_BOOKINGS)[number];

function BookingRow({ booking, index }: { booking: LiveActivityBooking; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.04,
              y: -3,
              boxShadow: "0 14px 32px rgba(0,0,0,0.14)",
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.98, y: 0 }}
      transition={{
        opacity: { duration: 0.35, delay: index * 0.06 },
        x: { duration: 0.35, delay: index * 0.06 },
        default: { type: "spring", stiffness: 460, damping: 24 },
      }}
      className="group flex min-w-0 cursor-pointer items-center gap-2 rounded-full bg-white/60 px-3 py-2.5 text-[10px] font-normal text-zinc-700 shadow-none md:gap-3 md:rounded-lg md:px-4 md:py-2 md:text-[11px] hover:bg-white hover:font-bold hover:text-slate-950"
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 opacity-0 shadow-[0_0_0_2px_rgba(16,185,129,0.25)] transition-opacity duration-200 group-hover:opacity-100"
      />

      <span className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden md:gap-2">
        <MapPin className="h-3 w-3 shrink-0 text-zinc-500" aria-hidden />
        <span className="truncate">{booking.from}</span>
        <span className="shrink-0 text-zinc-400" aria-hidden>
          →
        </span>
        <span className="truncate">{booking.to}</span>
      </span>

      <span className="flex max-w-[34%] shrink-0 items-center gap-1 overflow-hidden text-slate-950 md:max-w-none">
        <Car className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" aria-hidden />
        <span className="truncate">{booking.vehicle}</span>
      </span>
    </motion.div>
  );
}
