"use client";

import { ArrowRight } from "lucide-react";
import { SERVICES_BENTO_ITEMS } from "@/constants";

export function ServicesBentoGrid() {
  return (
    <section className="section section--black section-glow section-pad" aria-label="Services">
      <div className="section-inner">
        <header className="section-header section-header--center">
          <h2 className="heading-display heading-display--light">
            Our <span className="text-accent">Services</span>
          </h2>
          <p className="section-lead">Comprehensive premium transportation solutions</p>
        </header>

        <div className="section-body content-medium">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_BENTO_ITEMS.map((service) => (
              <article
                key={service.title}
                className="glass glass-hover group rounded-2xl p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/12 text-white">
                  <service.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-8 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 min-h-[64px] text-[12px] leading-5 text-zinc-500">{service.text}</p>
                <button type="button" className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase text-white transition group-hover:text-cyan-300">
                  Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
