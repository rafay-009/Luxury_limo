import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ArrowRight, Building2, ChevronDown, MapPin, Search } from "lucide-react";
import {
  INCOMING_FLIGHT_DATE,
  INCOMING_FLIGHT_DURATION,
  INCOMING_FLIGHTS,
  INCOMING_FLIGHT_TIME,
  type IncomingFlight,
} from "@/constants";
import { cn } from "@/lib/utils";

export function IncomingFlights() {
  return (
    <section className="section section--light section-pad overflow-x-hidden" aria-label="Incoming flights">
      <div className="section-inner min-w-0">
        <header className="section-header section-header--center section-header--narrow">
          <h2 className="heading-display heading-display--dark">
            Incoming <span className="text-accent">Flights</span>
          </h2>
          <p className="section-lead">Track arrivals across Canada and book your airport pickup in advance</p>
        </header>

        <div className="section-body content-wide">
          <div className="w-full min-w-0">
            <div className="grid gap-3 lg:overflow-hidden lg:rounded-[2px] lg:bg-white lg:shadow-[0_12px_36px_rgba(0,0,0,0.04)]">
              <div className="grid gap-3 lg:grid-cols-[1fr_190px_190px] lg:border-b lg:border-zinc-200 lg:p-3">
                <label className="relative lg:col-span-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300" aria-hidden />
                  <input
                    className="focus-ring h-10 w-full rounded-xl border border-zinc-200 bg-white px-9 text-[12px] outline-none placeholder:text-zinc-400 lg:h-9 lg:rounded-md"
                    placeholder="Search flight number, city or airport"
                    type="search"
                  />
                </label>
                <div className="grid grid-cols-2 gap-3 lg:contents">
                  <FilterButton icon={<Building2 className="h-3.5 w-3.5" aria-hidden />} label="All Cities" />
                  <FilterButton icon={<MapPin className="h-3.5 w-3.5" aria-hidden />} label="All Airports" />
                </div>
              </div>

              <div className="grid gap-4 lg:gap-0">
                {INCOMING_FLIGHTS.map((flight, index) => (
                  <div key={`${flight.code}-${index}`}>
                    <FlightCardMobile flight={flight} />
                    <FlightRowDesktop flight={flight} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="focus-ring flex h-10 items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 text-[12px] font-normal text-zinc-500 lg:h-9 lg:rounded-md lg:text-zinc-400"
      type="button"
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ChevronDown className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
    </button>
  );
}

function FlightCardMobile({ flight }: { flight: IncomingFlight }) {
  return (
    <article className="overflow-visible rounded-2xl bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.06)] lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <FlightIcon icon={flight.icon} alt={`${flight.airline} ${flight.code}`} compact />
          <p className="truncate text-[15px] font-bold text-slate-950">{flight.code}</p>
        </div>
        <span className={cn("shrink-0 text-[12px] font-semibold", flight.statusTone)}>{flight.status}</span>
      </div>

      <div className="relative mt-5 pl-0.5">
        <span className="absolute bottom-3 left-[9px] top-3 w-px bg-zinc-200" aria-hidden />

        <div className="grid grid-cols-[20px_1fr] gap-x-4">
          <div className="flex justify-center pt-1">
            <span className="relative z-10 h-3 w-3 rounded-full border-2 border-zinc-300 bg-white" aria-hidden />
          </div>
          <div className="pb-5">
            <p className="text-[13px] font-bold text-slate-950">{INCOMING_FLIGHT_TIME}</p>
            <p className="mt-1 text-[13px] font-semibold text-slate-950">{flight.origin}</p>
            <p className="mt-1 text-[11px] font-normal text-zinc-500">{INCOMING_FLIGHT_DATE}</p>
          </div>

          <div aria-hidden />
          <div className="flex items-center py-3">
            <span className="relative z-10 whitespace-nowrap rounded-full border border-zinc-200 bg-[#f3f4f6] px-3 py-1.5 text-[10px] font-normal leading-none text-zinc-500">
              {INCOMING_FLIGHT_DURATION}
            </span>
          </div>

          <div className="flex justify-center pb-1">
            <span className="relative z-10 h-3 w-3 rounded-full bg-zinc-300" aria-hidden />
          </div>
          <div className="pt-1">
            <p className="text-[13px] font-bold text-slate-950">{INCOMING_FLIGHT_TIME}</p>
            <p className="mt-1 text-[13px] font-semibold text-slate-950">{flight.destination}</p>
            <p className="mt-1 text-[11px] font-normal text-zinc-500">{INCOMING_FLIGHT_DATE}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="cyan-cta focus-ring mt-5 flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#12b8d0] text-[13px] font-bold text-slate-950 transition hover:bg-cyan-300"
      >
        Book Pickup <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </button>
    </article>
  );
}

function FlightRowDesktop({ flight }: { flight: IncomingFlight }) {
  return (
    <div className="hidden items-center gap-4 border-b border-zinc-100 px-6 py-5 last:border-b-0 lg:grid lg:grid-cols-[190px_1fr_190px_auto]">
      <div className="grid grid-cols-[42px_1fr] gap-4">
        <FlightIcon icon={flight.icon} alt={`${flight.airline} ${flight.code}`} />
        <div>
          <p className="text-[12px] font-normal text-zinc-700">{INCOMING_FLIGHT_TIME}</p>
          <p className="mt-1 text-[13px] font-semibold text-slate-950">{flight.origin}</p>
          <p className="mt-1 text-[10px] font-normal text-zinc-500">{flight.code}</p>
          <p className="text-[10px] text-zinc-500">{INCOMING_FLIGHT_DATE}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <span className="h-3 w-3 rounded-full border-2 border-zinc-300 bg-white" aria-hidden />
        <span className="h-px flex-1 bg-zinc-200" />
        <span className="text-[10px] font-normal text-zinc-500">{INCOMING_FLIGHT_DURATION}</span>
        <span className="h-px flex-1 bg-zinc-200" />
        <span className="h-2 w-2 rounded-full bg-zinc-300" aria-hidden />
      </div>

      <div>
        <p className="text-[12px] font-normal text-zinc-700">
          {INCOMING_FLIGHT_TIME}{" "}
          <span className={cn("ml-2 text-[10px] font-semibold", flight.statusTone)}>{flight.status}</span>
        </p>
        <p className="mt-1 text-[13px] font-semibold text-slate-950">{flight.destination}</p>
        <p className="mt-1 text-[10px] text-zinc-500">{INCOMING_FLIGHT_DATE}</p>
      </div>

      <button
        type="button"
        className="cyan-cta focus-ring flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#12b8d0] px-4 text-[12px] font-bold text-slate-950 transition hover:bg-cyan-300"
      >
        Book Pickup <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
      </button>
    </div>
  );
}

function FlightIcon({ icon, alt, compact = false }: { icon: StaticImageData; alt: string; compact?: boolean }) {
  return (
    <Image
      src={icon}
      alt={alt}
      width={42}
      height={56}
      className={cn("object-contain object-top", compact ? "h-10 w-8" : "h-14 w-[42px]")}
    />
  );
}
