import Image from "next/image";
import Link from "next/link";
import { needImage } from "@/pages/newyork/assets";

export function NewYorkBookingHelpSection() {
  return (
    <section className="section section--light section-pad" aria-label="Booking help in New York">
      <div className="section-inner">
        <div className="section-body content-wide">
          <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-[21/9]">
              <Image
                src={needImage}
                alt="Chauffeur welcoming a passenger to a luxury sedan with the New York skyline at dusk"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1280px) 1240px, 100vw"
                priority={false}
              />

              <div className="absolute inset-0 flex items-center p-5 sm:p-6 lg:p-8 xl:p-10">
                <div className="w-full rounded-2xl border border-white/20 bg-white/22 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-6 lg:max-w-[520px] lg:p-8">
                  <header className="section-header section-header--left">
                    <h2 className="heading-display heading-display--light">
                      Need help booking transportation in
                      <br className="lg:hidden" />
                      <span className="whitespace-nowrap text-accent lg:ml-1">New York</span>?
                    </h2>
                    <p className="section-lead text-white/90">
                      Our support team is available to help with airport transfers, hourly rides, event transportation, group
                      travel, and custom route requests.
                    </p>
                  </header>

                  <Link
                    href="#booking"
                    className="cyan-cta focus-ring mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-[#12b8d0] px-5 text-[13px] !font-bold !text-black transition hover:bg-cyan-300 hover:!text-black sm:mt-8"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
