import Image from "next/image";
import Link from "next/link";
import { airportImage, airportStatusCard } from "@/pages/newyork/assets";
import { NEW_YORK_AIRPORT_FEATURES } from "@/constants";

export function NewYorkAirportTransferSection() {
  return (
    <section className="section section--light section-pad" aria-label="NYC airport transfer">
      <div className="section-inner">
        <div className="section-body content-wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <div className="order-2 mx-auto w-full max-w-[520px] lg:order-1 lg:mx-0 lg:max-w-none">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <Image
                  src={airportImage}
                  alt="Chauffeur welcoming a passenger into a luxury sedan for a private airport transfer in New York City"
                  width={620}
                  height={600}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 620px, 100vw"
                />
                <Image
                  src={airportStatusCard}
                  alt="Chauffeur arriving in 15 minutes — airport transfer status"
                  width={384}
                  height={236}
                  className="pointer-events-none absolute left-3 top-3 z-10 h-auto w-[min(58%,280px)] sm:left-4 sm:top-4 md:left-5 md:top-5"
                  sizes="280px"
                />
              </div>
            </div>

            <div className="order-1 mx-auto max-w-[560px] text-center lg:order-2 lg:mx-0 lg:text-left">
              <header className="section-header section-header--center lg:text-left">
                <h2 className="heading-display heading-display--dark">
                  Your reliable <span className="text-accent">NYC airport</span>
                  <span className="block sm:inline"> transfer</span>
                </h2>
                <p className="section-lead">
                  Whether you&apos;re traveling to New York City for business or pleasure, having your ground transportation
                  organized in advance will improve your entire trip. After hours or days in a cramped airplane, the last
                  thing you want is to wait in line for your rental car or begin hailing taxis.
                </p>
              </header>

              <ul className="mt-8 space-y-6 text-left sm:mt-10">
                {NEW_YORK_AIRPORT_FEATURES.map((feature) => (
                  <li key={feature.title} className="flex gap-4">
                    <feature.icon className="mt-0.5 h-5 w-5 shrink-0 text-black" strokeWidth={1.6} aria-hidden />
                    <div>
                      <p className="text-[15px] font-bold leading-snug text-black sm:text-[16px]">{feature.title}</p>
                      <p className="mt-1 text-[13px] font-normal leading-relaxed text-zinc-500 sm:text-[14px]">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="#booking"
                className="cyan-cta focus-ring mt-8 inline-flex h-9 items-center justify-center rounded-lg bg-[#12b8d0] px-5 text-[13px] !font-bold !text-black transition hover:bg-cyan-300 hover:!text-black sm:mt-10"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
