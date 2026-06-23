import Image from "next/image";
import Link from "next/link";
import { arriveImage, arriveStatusCard } from "@/page-modules/newyork/assets";
import { NEW_YORK_ARRIVE_FEATURES } from "@/constants";

export function NewYorkArriveSection() {
  return (
    <section className="section section--light section-pad" aria-label="Arrive in New York">
      <div className="section-inner">
        <div className="section-body content-wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <div className="mx-auto max-w-[560px] text-center lg:mx-0 lg:text-left">
              <header className="section-header section-header--center lg:text-left">
                <h2 className="heading-display heading-display--dark">
                  Arrive in <span className="text-accent">New York</span>
                  <span className="block sm:inline"> the right way</span>
                </h2>
                <p className="section-lead">
                  New York is busy, fast-moving, and full of moments where timing matters. Whether you are landing at JFK,
                  heading to Manhattan, attending an event at Madison Square Garden, or spending the evening in Broadway, our
                  chauffeur service gives you a smooth, private, and premium way to move around the city.
                </p>
              </header>

              <ul className="mt-8 space-y-6 text-left sm:mt-10">
                {NEW_YORK_ARRIVE_FEATURES.map((feature) => (
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

            <div className="mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <Image
                  src={arriveImage}
                  alt="Chauffeur opening the door of a black Escalade on a New York street at dusk"
                  width={620}
                  height={600}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 620px, 100vw"
                />

                <Image
                  src={arriveStatusCard}
                  alt="Chauffeur arriving in 15 minutes — NYC-X7, black Escalade, Michael"
                  width={390}
                  height={248}
                  className="pointer-events-none absolute right-3 top-3 z-10 h-auto w-[min(58%,280px)] sm:right-4 sm:top-4 md:right-5 md:top-5"
                  sizes="280px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
