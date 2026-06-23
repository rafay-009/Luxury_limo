import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NEW_YORK_RIDE_OPTIONS } from "@/constants";

export function NewYorkRideOptionsSection() {
  return (
    <section className="section section--light section-pad" aria-label="Choose the right ride for your trip">
      <div className="section-inner">
        <header className="section-header section-header--center">
          <h2 className="heading-display heading-display--dark lg:whitespace-nowrap">
            Choose The Right Ride For Your Trip In <span className="text-accent">New York</span>
          </h2>
          <p className="section-lead">Private rides. Professional chauffeurs. Premium vehicles.</p>
        </header>

        <div className="section-body content-wide">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {NEW_YORK_RIDE_OPTIONS.map((option) => (
              <article
                key={option.title}
                className="rounded-xl border border-zinc-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_14px_36px_rgba(0,0,0,0.1)] sm:p-7"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-black">
                  <option.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-4 text-[15px] font-bold text-black sm:text-[16px]">{option.title}</h3>
                <p className="mt-2 min-h-[4.5rem] text-[13px] font-normal leading-[1.6] text-zinc-500 sm:text-[14px]">
                  {option.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href="#booking"
              className="cyan-cta focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#12b8d0] px-8 text-[14px] !font-bold !text-black transition hover:bg-cyan-300 hover:!text-black"
            >
              Search Your Ride
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
