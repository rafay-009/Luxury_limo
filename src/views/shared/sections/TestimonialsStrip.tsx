"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { accreditedBadge, googleLogo, trustpilotLogo } from "@/pages/shared/assets";
import { REVIEW_TABS, SITE_CONFIG, type ReviewFilter } from "@/constants";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

const testimonialItems = SITE_CONFIG.testimonials.items;

function filterReviews(filter: ReviewFilter): Testimonial[] {
  if (filter === "google") return testimonialItems.filter((item) => item.platform === "Google");
  if (filter === "trustpilot") return testimonialItems.filter((item) => item.platform === "Trustpilot");
  return testimonialItems;
}

export function TestimonialsStrip() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>("all");

  const filteredItems = useMemo(() => filterReviews(activeFilter), [activeFilter]);
  const marqueeItems = useMemo(
    () => (filteredItems.length > 0 ? [...filteredItems, ...filteredItems] : []),
    [filteredItems]
  );

  return (
    <section className="section section--light section-pad overflow-hidden" aria-label="Client reviews">
      <div className="section-inner content-wide">
        <div className="rounded-[14px] bg-white px-5 py-7 shadow-[0_10px_32px_rgba(0,0,0,0.06)] sm:rounded-[6px] sm:px-7 sm:py-8 lg:relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.65fr]">
            <header className="section-header section-header--center lg:text-left">
                <h2 className="heading-display heading-display--dark lg:whitespace-nowrap">
                  Hear What Our <span className="text-accent">Clients</span> Say
                </h2>
                <p className="section-lead mx-auto max-w-md lg:mx-0">
                  At enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </header>

              <div className="grid grid-cols-3 gap-1 sm:gap-4">
                <RatingSummary logo={googleLogo} rating="4.8" detail="2400 Reviews" starClassName="text-yellow-400" />
                <RatingSummary logo={trustpilotLogo} rating="4.9" detail="1800 Reviews" starClassName="text-emerald-500" />
                <BbbBadge />
              </div>
          </div>
        </div>

        <div className="section-body">
          <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {REVIEW_TABS.map((tab) => {
              const isActive = activeFilter === tab.filter;

              return (
                <button
                  key={tab.label}
                  className={cn(
                    "focus-ring flex h-9 shrink-0 items-center gap-2 rounded-full px-5 text-[12px] transition sm:h-8",
                    isActive ? "bg-black font-bold text-white" : "bg-white font-normal text-zinc-600 shadow-sm hover:bg-zinc-100"
                  )}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(tab.filter)}
                >
                  {tab.icon ? <Image src={tab.icon} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" /> : null}
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="testimonial-marquee-group mt-6 sm:mt-7">
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#f7f7f7] to-transparent sm:w-10"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[#f7f7f7] to-transparent sm:w-10"
                aria-hidden
              />

              <div className="overflow-hidden">
                <div
                  key={activeFilter}
                  className={cn(
                    "flex w-max gap-3 sm:gap-4",
                    !reduceMotion && marqueeItems.length > 0 && "animate-testimonial-marquee"
                  )}
                >
                  {marqueeItems.map((item, index) => (
                    <TestimonialCard key={`${item.id}-${index}`} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-zinc-200 sm:mt-6">
              <div
                className={cn(
                  "h-full w-1/4 rounded-full bg-zinc-500",
                  !reduceMotion && marqueeItems.length > 0 && "animate-testimonial-progress"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const platformLogo = item.platform === "Google" ? googleLogo : trustpilotLogo;
  const ridesCompleted = item.ridesCompleted ?? 24;

  return (
    <article className="w-[min(76vw,248px)] shrink-0 rounded-[12px] bg-white p-3.5 shadow-[0_8px_22px_rgba(0,0,0,0.05)] sm:w-[232px]">
      <div className="flex items-center gap-2.5">
        <Image
          src={item.avatar}
          alt={item.name}
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold leading-tight text-slate-950">{item.name}</p>
          <p className="text-[10px] font-normal text-zinc-500">{ridesCompleted} rides completed</p>
        </div>
      </div>

      <p className="mt-2.5 line-clamp-3 text-[11px] font-normal leading-[1.45] text-zinc-500">{item.text}</p>

      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-normal text-zinc-500">
        <Image src={platformLogo} alt="" width={12} height={12} className="h-3 w-3 object-contain" />
        {item.rating}.0 star reviews
      </div>
    </article>
  );
}

function RatingSummary({
  logo,
  rating,
  detail,
  starClassName,
}: {
  logo: StaticImageData;
  rating: string;
  detail: string;
  starClassName: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center border-l border-zinc-200 px-1 text-center first:border-l-0 sm:px-0">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Image src={logo} alt="" width={18} height={18} className="h-4 w-4 object-contain sm:h-[18px] sm:w-[18px]" />
        <span className="text-lg font-bold text-slate-950 sm:text-xl">{rating}</span>
      </div>
      <div className={cn("mt-1.5 flex gap-0.5 sm:mt-2 sm:gap-1", starClassName)}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-2.5 w-2.5 fill-current sm:h-3 sm:w-3" aria-hidden />
        ))}
      </div>
      <p className="mt-1.5 text-[10px] font-normal text-zinc-400 sm:mt-2 sm:text-[11px]">{detail}</p>
    </div>
  );
}

function BbbBadge() {
  return (
    <div className="flex flex-col items-center justify-center border-l border-zinc-200 px-1 text-center sm:px-0">
      <Image
        src={accreditedBadge}
        alt="BBB Accredited Business"
        width={52}
        height={52}
        className="h-11 w-11 object-contain sm:h-12 sm:w-12"
      />
      <p className="mt-1.5 text-[10px] font-normal text-zinc-400 sm:mt-2 sm:text-[11px]">Accredited</p>
    </div>
  );
}
