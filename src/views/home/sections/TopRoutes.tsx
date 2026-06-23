"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import {
  TOP_ROUTES_BY_COUNTRY,
  TOP_ROUTES_COUNTRIES,
  TOP_ROUTE_TYPES,
} from "@/constants";
import { cn } from "@/lib/utils";

export function TopRoutes() {
  const [activeCountry, setActiveCountry] = useState(TOP_ROUTES_COUNTRIES[0].id);
  const [activeType, setActiveType] = useState(TOP_ROUTE_TYPES[2].id);
  const routes = useMemo(() => TOP_ROUTES_BY_COUNTRY[activeCountry], [activeCountry]);
  const activeCountryIndex = TOP_ROUTES_COUNTRIES.findIndex((country) => country.id === activeCountry);

  return (
    <section
      className="section section--black section-glow section-pad relative overflow-hidden"
      aria-label="Top routes"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,transparent_22%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[min(420px,55%)] w-[min(520px,50%)] bg-[radial-gradient(ellipse_at_100%_100%,rgba(18,184,208,0.16)_0%,transparent_68%)]"
        aria-hidden
      />
      <div className="section-inner relative z-10 min-w-0">
        <header className="section-header section-header--center">
          <h2 className="heading-display heading-display--light lg:whitespace-nowrap">
            Top Routes In Your <span className="text-accent">Country</span>
          </h2>
          <p className="section-lead">Most booked routes by our riders</p>
        </header>

        <div className="section-body content-wide">
          <div className="flex min-w-0 flex-col gap-3 md:gap-5">
            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
              {TOP_ROUTES_COUNTRIES.map((country) => {
                const isActive = activeCountry === country.id;

                return (
                  <button
                    key={country.id}
                    className={cn(
                      "focus-ring flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[12px] transition",
                      isActive ? "bg-white font-bold text-slate-950" : "font-normal text-zinc-400"
                    )}
                    onClick={() => setActiveCountry(country.id)}
                    type="button"
                  >
                    <Image src={country.flag} alt="" width={16} height={16} className="h-3.5 w-3.5 rounded-full object-cover" />
                    {country.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden rounded-full border border-white/15 bg-black p-1 lg:block">
              <div className="relative flex h-11 items-stretch">
                <span
                  aria-hidden
                  className="absolute top-1 bottom-1 rounded-full bg-white transition-[left] duration-300 ease-out"
                  style={{
                    width: `${100 / TOP_ROUTES_COUNTRIES.length}%`,
                    left: `${(activeCountryIndex * 100) / TOP_ROUTES_COUNTRIES.length}%`,
                  }}
                />
                {TOP_ROUTES_COUNTRIES.map((country) => {
                  const isActive = activeCountry === country.id;

                  return (
                    <button
                      key={country.id}
                      className={cn(
                        "focus-ring relative z-10 flex flex-1 items-center justify-center gap-2 px-2 text-[13px] transition-colors sm:px-4",
                        isActive ? "font-bold text-slate-950" : "font-normal text-zinc-400 hover:text-white"
                      )}
                      onClick={() => setActiveCountry(country.id)}
                      type="button"
                    >
                      <Image src={country.flag} alt="" width={16} height={16} className="h-4 w-4 rounded-full object-cover" />
                      <span className="truncate">{country.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-2.5 md:gap-5 lg:grid-cols-3">
              {TOP_ROUTE_TYPES.map((type) => {
                const isActive = activeType === type.id;

                return (
                  <article
                    key={type.title}
                    className={cn(
                      "relative rounded-[12px] border bg-black p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:rounded-[14px] md:p-5",
                      isActive
                        ? "border-cyan-500/45 shadow-[0_0_0_1px_rgba(18,184,208,0.2)]"
                        : "border-white/10"
                    )}
                  >
                    <button
                      className="focus-ring w-full text-left"
                      onClick={() => setActiveType(type.id)}
                      type="button"
                    >
                      <span className="absolute right-3 top-3 text-[9px] font-normal uppercase tracking-wide text-zinc-500 md:right-4 md:top-4 md:text-[11px]">
                        {type.badge}
                      </span>

                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg md:h-12 md:w-12 md:rounded-xl lg:h-14 lg:w-14",
                          isActive ? "bg-cyan-500/20 text-cyan-300 shadow-[0_0_18px_rgba(18,184,208,0.25)]" : "bg-white/12 text-white"
                        )}
                      >
                        <type.icon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" aria-hidden />
                      </span>

                      <div className="mt-4 md:mt-5 lg:mt-8">
                        <h3 className="text-[15px] font-semibold leading-tight text-white md:text-[18px] lg:text-2xl">{type.title}</h3>
                        <p className="mt-0.5 text-[11px] font-normal text-zinc-500 md:mt-1 md:text-[13px] lg:mt-3 lg:text-sm">{type.count}</p>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="overflow-hidden rounded-[12px] border border-white/10 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              {routes.map((route) => (
                <div
                  key={route}
                  className="flex min-w-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5 last:border-b-0 md:gap-4 md:px-5 md:py-4 lg:grid lg:grid-cols-[1fr_auto]"
                >
                  <p className="flex min-w-0 flex-1 items-center gap-2.5 text-[13px] font-normal leading-snug text-zinc-300 md:gap-4 md:text-[13px]">
                    <MapPin className="h-4 w-4 shrink-0 text-zinc-500 md:h-3.5 md:w-3.5" aria-hidden />
                    <span className="truncate">{route}</span>
                  </p>
                  <button
                    type="button"
                    className="focus-ring flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[12px] font-bold text-accent md:gap-2 md:text-[13px]"
                  >
                    Book Now <ArrowRight className="h-3.5 w-3.5 md:h-3.5 md:w-3.5" aria-hidden />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
