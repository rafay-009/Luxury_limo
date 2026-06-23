"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, CalendarDays, ChevronDown, Gift, Mail, MapPin, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOOKING_TABS } from "@/constants";

export function FareCalculator() {
  const [activeTab, setActiveTab] = useState<(typeof BOOKING_TABS)[number]>(BOOKING_TABS[0]);
  const [passengers, setPassengers] = useState("1");
  const [luggage, setLuggage] = useState("1");
  const estimate = useMemo(() => {
    const base = activeTab === "Hourly" ? 110 : activeTab === "Round Trip" ? 130 : 85;
    return base + Number(passengers) * 8 + Number(luggage) * 5;
  }, [activeTab, passengers, luggage]);

  return (
    <section className="section section--black section-glow section-pad--flush-top relative overflow-hidden" aria-label="Fare calculator">
      <div className="section-inner relative z-10">
        <header className="section-header section-header--center">
          <h2 className="heading-display heading-display--accent">Calculator</h2>
          <p className="section-lead">Get an instant estimate for your trip</p>
        </header>

        <div className="section-body section-body--flush content-wide">
        <div
          id="fare-calculator"
          className="glass overflow-hidden rounded-[28px] lg:grid lg:grid-cols-2"
        >
          <div className="p-5 md:p-7 lg:p-8">
            <div className="grid grid-cols-3 rounded-full bg-white/10 p-0">
              {BOOKING_TABS.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    className={cn(
                      "focus-ring h-9 rounded-full text-[12px] transition",
                      isActive ? "bg-white !font-bold !text-black" : "font-normal text-zinc-400 hover:text-white"
                    )}
                    data-trip-active={isActive ? "" : undefined}
                    onClick={() => setActiveTab(tab)}
                    type="button"
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid gap-4">
              <Field label="Pickup Location" icon={<MapPin className="h-4 w-4" />} placeholder="Enter Pickup Address" />
              <Field label="Destination" icon={<MapPin className="h-4 w-4" />} placeholder="Enter destination" />

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Date" icon={<CalendarDays className="h-4 w-4" />} type="date" placeholder="mm/dd/yyyy" />
                <Field label="Time" icon={<Clock3 className="h-4 w-4" />} type="time" />
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <SelectField label="Vehicle" value="Any" options={["Any", "Sedan", "SUV", "Sprinter"]} />
                <SelectField label="Passenger" value={passengers} options={["1", "2", "3", "4", "5", "6"]} onChange={setPassengers} />
                <SelectField label="Luggage" value={luggage} options={["0", "1", "2", "3", "4", "5"]} onChange={setLuggage} />
              </div>

              <button
                className="cyan-cta focus-ring mt-1 flex h-11 items-center justify-center gap-3 rounded-[9px] bg-[#087786] text-[13px] !font-bold text-white transition hover:bg-cyan-400 hover:text-slate-950"
                type="button"
              >
                <Calculator className="h-5 w-5" aria-hidden />
                Calculate Fare
              </button>
            </div>
          </div>

          <div className="relative border-t border-white/12 lg:border-l lg:border-t-0">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_75%_100%,rgba(34,211,238,0.18),transparent_18rem)]"
              aria-hidden
            />
            <div className="relative flex min-h-[320px] items-center justify-center p-6 md:min-h-[360px] md:p-8">
              <EstimateWatermark estimate={estimate} />

              <div className="relative z-[1]">
                <DiscountPromoCard />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function EstimateWatermark({ estimate }: { estimate: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      aria-hidden
    >
      <div className="translate-x-[-18%] translate-y-[-6%] blur-[2px] opacity-40">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">Estimated fare</p>
        <p className="mt-3 text-[3.25rem] font-normal leading-none text-white/90">${estimate}</p>
        <ul className="mt-6 space-y-3 text-[15px] font-normal text-white/70">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
            pickup location
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
            destination
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
            vehicle class
          </li>
        </ul>
      </div>
    </div>
  );
}

function DiscountPromoCard() {
  return (
    <div className="relative w-full max-w-[304px] overflow-hidden rounded-[18px] bg-white text-slate-950 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="bg-gradient-to-r from-[#8ae8f4] via-[#5dd9ea] to-[#14b8d0] px-6 py-7 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#14b8d0]">
          <Gift className="h-5 w-5" aria-hidden />
        </div>
        <h3 className="mt-3 text-2xl font-bold leading-none text-black">20% Off</h3>
        <p className="mt-1 text-[12px] font-normal text-black">off on your first ride</p>
      </div>

      <div className="p-5">
        <p className="text-center text-[13px] font-normal leading-[1.55] text-zinc-600">
          Skip the form and share your contact info to receive an exclusive discount code
        </p>

        <label className="relative mt-5 block">
          <input
            className="focus-ring h-9 w-full rounded-xl border border-zinc-200 px-4 pr-9 text-[12px] outline-none placeholder:text-zinc-400"
            placeholder="Enter your email"
            type="email"
          />
          <Mail className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden />
        </label>

        <div className="mt-3 flex h-9 items-center overflow-hidden rounded-xl border border-zinc-200">
          <button
            className="focus-ring flex h-full shrink-0 items-center gap-1.5 border-r border-zinc-200 px-3 text-[13px] text-zinc-600"
            type="button"
            aria-label="Select country code"
          >
            <span className="text-base leading-none" aria-hidden>
              🇺🇸
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
          </button>
          <input
            className="focus-ring h-full min-w-0 flex-1 bg-transparent px-3 text-[12px] outline-none placeholder:text-zinc-400"
            placeholder="+1 555-123-4567"
            type="tel"
          />
        </div>

        <button
          className="focus-ring mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-[#14b8d0] bg-white text-[11px] font-normal text-[#14b8d0] transition hover:bg-cyan-50"
          type="button"
        >
          Claim Discount <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-[11px] font-normal text-white">{label}</span>
      <span className="relative block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</span>
        <input
          className="focus-ring h-10 w-full rounded-[7px] border border-white/20 bg-transparent px-9 text-[13px] font-normal text-white outline-none placeholder:font-normal placeholder:text-zinc-400"
          placeholder={placeholder}
          type={type}
        />
      </span>
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange?: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-2 block text-[11px] font-normal text-white">{label}</span>
      <select
        className="focus-ring h-10 w-full rounded-[7px] border border-white/20 bg-transparent px-3 text-[13px] font-normal text-white outline-none"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} className="bg-slate-950" value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
