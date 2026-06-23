"use client";

import Image from "next/image";
import { chauffeurImage } from "@/pages/home/assets";
import { Play } from "lucide-react";
import {
  PROFESSIONAL_CHAUFFEUR_FEATURES,
  PROFESSIONAL_CHAUFFEUR_MOBILE_FEATURES,
} from "@/constants";
import { cn } from "@/lib/utils";

export function ProfessionalChauffeurs() {
  return (
    <section className="section section--light section-pad" aria-label="Professional chauffeurs">
      <div className="lg:hidden">
        <div className="section-inner bg-white pb-8 pt-12">
          <header className="section-header section-header--center">
            <h2 className="heading-display heading-display--dark lg:whitespace-nowrap">
              Our Professional <span className="text-accent">Chauffeurs</span>
            </h2>
            <p className="section-lead">
              Every ride is led by a trained professional committed to safety, punctuality, and premium service
            </p>
          </header>

          <div className="section-body">
            <ChauffeurMedia className="rounded-[20px]" />
          </div>
        </div>

        <div className="section-inner space-y-3 pb-8">
          {PROFESSIONAL_CHAUFFEUR_MOBILE_FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} mobile />
          ))}
        </div>
      </div>

      <div className="section-inner hidden items-center gap-10 lg:grid lg:grid-cols-[0.9fr_1.2fr]">
        <ChauffeurMedia className="mx-auto aspect-[0.88] w-full max-w-[390px] rounded-[72px]" />

        <div>
          <header className="section-header section-header--left">
            <h2 className="heading-display heading-display--dark lg:whitespace-nowrap">
              Our Professional <span className="text-accent">Chauffeurs</span>
            </h2>
            <p className="section-lead max-w-[560px]">
              Every ride is led by a trained professional committed to safety, punctuality, and premium service
            </p>
          </header>

          <div className="section-body grid gap-4 md:grid-cols-2">
            {PROFESSIONAL_CHAUFFEUR_FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChauffeurMedia({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[390px] overflow-hidden bg-black shadow-[0_22px_70px_rgba(0,0,0,0.18)]", className)}>
      <div className="relative aspect-[1.05] w-full lg:aspect-[0.88]">
        <Image
          src={chauffeurImage}
          alt="Professional chauffeur opening a luxury car door"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 390px, 100vw"
          priority
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-slate-950 shadow-lg lg:h-16 lg:w-16">
          <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden />
        </span>
      </div>
    </div>
  );
}

function FeatureCard({
  feature,
  mobile = false,
}: {
  feature: (typeof PROFESSIONAL_CHAUFFEUR_FEATURES)[number];
  mobile?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex items-center gap-4 rounded-[16px] border border-zinc-200 bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.035)]",
        mobile ? "gap-4 p-4" : "gap-5 bg-white/70 p-5"
      )}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl bg-white text-slate-950 shadow-sm",
          mobile ? "h-14 w-14" : "h-16 w-16"
        )}
      >
        <feature.icon className={mobile ? "h-6 w-6" : "h-7 w-7"} strokeWidth={1.8} aria-hidden />
      </span>
      <div className="min-w-0">
        <h3 className={cn("font-semibold text-slate-950", mobile ? "text-[14px]" : "text-[13px]")}>{feature.title}</h3>
        <p className={cn("mt-1.5 leading-5 text-zinc-500", mobile ? "text-[12px]" : "mt-2 text-[12px]")}>{feature.text}</p>
      </div>
    </article>
  );
}
