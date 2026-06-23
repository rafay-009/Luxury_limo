"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { type Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CalendarDays, CheckCircle2, Clock, CreditCard, Headphones, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";

type BookingValues = Record<string, string | number | undefined>;

type BookingWidgetProps = {
  compact?: boolean;
  alignLeft?: boolean;
  variant?: "default" | "destination";
  submitLabel?: string;
  showSupportButton?: boolean;
  simplifiedSteps?: boolean;
};

export function BookingWidget({
  compact = false,
  alignLeft = false,
  variant = "default",
  submitLabel = "Get Instant Rate",
  showSupportButton = false,
  simplifiedSteps = false,
}: BookingWidgetProps) {
  const isDestination = variant === "destination";
  const { bookingWidget } = SITE_CONFIG;
  const [activeTab, setActiveTab] = useState(bookingWidget.tabs[0].id);
  const [sent, setSent] = useState(false);

  const schema = useMemo(() => {
    const shape = Object.fromEntries(
      bookingWidget.fields.map((field) => [
        field.name,
        field.required ? z.coerce.string().min(1, `${field.label} is required`) : z.coerce.string().optional(),
      ])
    );
    return z.object(shape);
  }, [bookingWidget.fields]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(schema) as unknown as Resolver<BookingValues>,
    defaultValues: { passengers: isDestination ? 1 : 2, luggage: 1 },
  });

  function onSubmit() {
    setSent(true);
  }

  const inputClass =
    "focus-ring h-[39px] w-full rounded-[7px] border border-white/20 bg-white/[0.025] px-9 text-[13px] font-normal text-white outline-none transition placeholder:font-normal placeholder:text-slate-300/75 focus:border-cyan-300";
  const selectClass =
    "focus-ring h-[39px] w-full rounded-[7px] border border-white/20 bg-white/[0.025] px-3 text-[13px] font-normal text-white outline-none transition focus:border-cyan-300";
  const labelClass = "mb-1.5 block text-[11px] font-normal text-white/90";

  return (
    <div
      id="booking"
      className={cn(
        "glass glass-hover font-normal rounded-[20px] p-4 sm:rounded-[22px] sm:p-6",
        isDestination && "p-3.5 sm:p-4 lg:p-6",
        compact ? "w-full" : alignLeft ? (isDestination ? "w-full max-w-[480px]" : "w-full max-w-[440px]") : "w-full max-w-[440px] lg:ml-auto"
      )}
    >
      <div className={cn("mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4", isDestination && "mb-3 pb-3")}>
        <div>
          <p className={cn("text-[17px] font-bold leading-none text-white", !isDestination && "lg:font-normal")}>{bookingWidget.title}</p>
          <p className="mt-2 text-[13px] font-normal text-slate-300">{bookingWidget.subtitle}</p>
        </div>
        {!isDestination ? (
          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <div>
              <p className="text-[12px] font-bold leading-tight text-white sm:text-[13px]">3 Agents</p>
              <p className="text-[12px] font-bold leading-tight text-[#12b8d0] sm:text-[13px]">Live now</p>
            </div>
            <div className="flex -space-x-2.5">
              {SITE_CONFIG.testimonials.items.slice(0, 3).map((agent) => (
                <Image
                  key={agent.id}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-[#17151a] object-cover"
                  src={agent.avatar}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <p className={cn("mb-3 text-[12px] font-bold text-white", !isDestination && "lg:font-normal")}>Trip Type</p>
      <div className="mb-5 grid grid-cols-3 rounded-full bg-white/10 p-0">
        {bookingWidget.tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={cn(
                "focus-ring h-9 rounded-full px-2 text-[11px] transition sm:h-10 sm:px-3 sm:text-[13px]",
                isActive ? "bg-white !font-bold !text-black" : "font-normal text-slate-300 hover:text-white"
              )}
              data-trip-active={isActive ? "" : undefined}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {sent ? (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-emerald-100">
          <CheckCircle2 className="mb-3 h-8 w-8 text-emerald-300" aria-hidden />
          <p className="font-normal">Quote request received.</p>
          <p className="mt-1 text-sm font-normal text-emerald-100/80">A concierge will confirm your {activeTab.replace("-", " ")} details shortly.</p>
        </div>
      ) : (
        <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={cn(
              "mb-1 grid items-center gap-2 text-[10px] font-normal sm:gap-3 sm:text-[12px]",
              simplifiedSteps ? "grid-cols-[auto_1fr_auto]" : "grid-cols-[auto_1fr_auto_1fr_auto]"
            )}
          >
            <span className="flex items-center gap-1.5 text-white sm:gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-normal text-slate-950">1</span>
              Trip Details
            </span>
            <span className="h-px bg-white/40" />
            <span className="flex items-center gap-1.5 text-slate-200 sm:gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/70 text-[10px] font-normal text-slate-950">2</span>
              Your Info
            </span>
            {!simplifiedSteps ? (
              <>
                <span className="h-px bg-white/40" />
                <span className="flex items-center gap-1.5 text-slate-400 sm:gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/35 text-[10px] font-normal text-slate-950">3</span>
                  Card Info
                </span>
              </>
            ) : null}
          </div>

          <div className={cn("grid gap-3", isDestination ? "sm:grid-cols-2" : "grid-cols-1")}>
            <label>
              <span className={labelClass}>Pickup Location</span>
              <span className="relative block">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-200" aria-hidden />
                <input className={inputClass} placeholder="Enter Pickup Address" type="text" {...register("pickupAddress")} />
              </span>
              {errors.pickupAddress ? <span className="text-xs font-normal text-red-300">{String(errors.pickupAddress.message)}</span> : null}
            </label>

            <label>
              <span className={labelClass}>Destination</span>
              <span className="relative block">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-200" aria-hidden />
                <input className={inputClass} placeholder="Enter destination" type="text" {...register("dropoffAddress")} />
              </span>
              {errors.dropoffAddress ? <span className="text-xs font-normal text-red-300">{String(errors.dropoffAddress.message)}</span> : null}
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className={labelClass}>Date</span>
              <span className="relative block">
                <input className={cn(inputClass, "pr-9")} type="date" {...register("pickupDate")} />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-200" aria-hidden />
              </span>
            </label>
            <label>
              <span className={labelClass}>Time</span>
              <span className="relative block">
                <input className={cn(inputClass, "pr-9")} type="time" {...register("pickupTime")} />
                <Clock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-200" aria-hidden />
              </span>
            </label>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
            <label>
              <span className={cn(labelClass, isDestination && "mb-1 text-[10px] sm:mb-1.5 sm:text-[11px]")}>Vehicle</span>
              <select className={cn(selectClass, isDestination && "h-[34px] px-2 text-[12px] sm:h-[39px] sm:px-3 sm:text-[13px]")} {...register("tripType")}>
                <option value="">Any</option>
                {bookingWidget.fields[0].options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={cn(labelClass, isDestination && "mb-1 text-[10px] sm:mb-1.5 sm:text-[11px]")}>Passenger</span>
              <select className={cn(selectClass, isDestination && "h-[34px] px-2 text-[12px] sm:h-[39px] sm:px-3 sm:text-[13px]")} {...register("passengers")}>
                {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={cn(labelClass, isDestination && "mb-1 text-[10px] sm:mb-1.5 sm:text-[11px]")}>Luggage</span>
              <select className={cn(selectClass, isDestination && "h-[34px] px-2 text-[12px] sm:h-[39px] sm:px-3 sm:text-[13px]")} {...register("luggage")}>
                {Array.from({ length: 7 }, (_, index) => index).map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {showSupportButton ? (
            <div className={cn("mt-2 grid gap-3", isDestination ? "grid-cols-1" : "sm:grid-cols-2")}>
              <button
                className="cyan-cta focus-ring flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#14b8d0] px-4 text-[13px] !font-bold text-black transition hover:bg-cyan-300"
                type="submit"
              >
                {submitLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <a
                className="focus-ring flex h-10 items-center justify-center gap-2 rounded-[8px] border border-white/20 bg-white/5 px-4 text-[13px] font-normal text-white transition hover:bg-white/10"
                href={`tel:${SITE_CONFIG.company.phone.replace(/[^\d+]/g, "")}`}
              >
                <Headphones className="h-4 w-4" aria-hidden />
                Call 24/7 Support
              </a>
            </div>
          ) : (
            <button
              className="cyan-cta focus-ring mt-2 flex h-10 items-center justify-center gap-3 rounded-[8px] bg-[#14b8d0] px-5 text-[13px] !font-bold text-black transition hover:bg-cyan-300"
              type="submit"
            >
              {submitLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          )}
        </form>
      )}
      {!isDestination ? (
      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 text-[10.5px] font-normal text-slate-300 sm:grid-cols-3 sm:text-[11.5px]">
        <span className="flex items-center gap-2">
          <CreditCard className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
          No payment required
        </span>
        <span className="flex items-center justify-end gap-2 sm:justify-center">
          <Headphones className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
          Live agent quote
        </span>
        <span className="col-span-2 flex items-center justify-center gap-2 sm:col-span-1 sm:justify-end">
          <Mail className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
          Fast response
        </span>
      </div>
      ) : null}
    </div>
  );
}
