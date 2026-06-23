"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, Clock3 } from "lucide-react";
import { QUICK_BOOKING_COUNTRIES, QUICK_BOOKING_ROUTES_BY_COUNTRY } from "@/constants";
import { cn } from "@/lib/utils";

export function QuickBookingRoutes() {
  const [activeCountry, setActiveCountry] = useState(QUICK_BOOKING_COUNTRIES[0].id);
  const routes = useMemo(() => QUICK_BOOKING_ROUTES_BY_COUNTRY[activeCountry], [activeCountry]);
  const mobileCountries = QUICK_BOOKING_COUNTRIES.filter((country) => !country.desktopOnly);
  const desktopCountries = QUICK_BOOKING_COUNTRIES;

  return (
    <section className="section section--light section-pad" aria-label="Quick booking routes">
      <div className="section-inner">
        <header className="section-header section-header--center section-header--narrow">
          <h2 className="heading-display heading-display--dark">
            Quick Booking <span className="text-accent">Routes</span>
          </h2>
          <p className="section-lead">Popular routes with estimated fares</p>
        </header>

        <div className="section-body content-wide">
        <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
          {mobileCountries.map((country) => {
            const isActive = activeCountry === country.id;

            return (
              <button
                key={country.id}
                className={cn(
                  "focus-ring flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13px] transition",
                  isActive ? "bg-black font-bold text-white shadow-[0_6px_16px_rgba(0,0,0,0.28)]" : "font-normal text-zinc-500"
                )}
                onClick={() => setActiveCountry(country.id)}
                type="button"
              >
                <Image src={country.flag} alt="" width={18} height={18} className="h-[18px] w-[18px] rounded-full object-cover" />
                {country.label}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-14 hidden w-fit max-w-full grid-cols-4 rounded-full border border-zinc-200 bg-white p-1 shadow-sm md:grid">
          {desktopCountries.map((country) => {
            const isActive = activeCountry === country.id;

            return (
              <button
                key={country.id}
                className={cn(
                  "focus-ring flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-sm transition",
                  isActive ? "bg-black font-bold text-white shadow-[0_8px_18px_rgba(0,0,0,0.35)]" : "font-normal text-zinc-700 hover:bg-zinc-100"
                )}
                onClick={() => setActiveCountry(country.id)}
                type="button"
              >
                <Image src={country.flag} alt="" width={18} height={18} className="h-[18px] w-[18px] rounded-full object-cover" />
                {country.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex max-w-[480px] flex-col gap-3 md:mt-8 md:grid md:grid-cols-2 md:gap-4 lg:max-w-none lg:grid-cols-3">
          {routes.map((route, index) => (
            <RouteCard key={`${route.from}-${route.to}-${index}`} {...route} />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

function RouteCard({ from, to, fare, time }: { from: string; to: string; fare: string; time: string }) {
  return (
    <article className="rounded-[12px] border border-zinc-200/80 bg-white px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.05)] md:rounded-[10px] md:px-6 md:py-5 md:shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
      <p className="text-[14px] font-bold leading-snug text-black md:flex md:items-center md:gap-2 md:text-[15px]">
        <span className="md:inline">{from}</span>
        <span className="mx-1.5 text-zinc-400 md:hidden" aria-hidden>→</span>
        <ArrowRight className="hidden h-4 w-4 text-zinc-500 md:block" aria-hidden />
        <span className="md:inline">{to}</span>
      </p>
      <div className="mt-3 flex items-center justify-between gap-4 md:mt-4">
        <div className="flex items-center gap-4 text-[13px] font-normal text-zinc-500">
          <span>$ {fare}</span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
            {time}
          </span>
        </div>
        <button type="button" className="focus-ring flex shrink-0 items-center gap-1.5 text-[13px] font-bold text-[#12b8d0]">
          Book <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </article>
  );
}
