import Link from "next/link";
import { SITE_CONFIG } from "@/constants";

export function CTABanner() {
  const banner = SITE_CONFIG.globalComponents.bookingCTABanner;
  if (!banner.show) return null;

  return (
    <section className="relative overflow-hidden py-20" style={{ background: "var(--gradient-cta)" }}>
      <div className="absolute inset-0 bg-slate-950/10" aria-hidden />
      <div className="container relative z-10 text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">{banner.text}</h2>
        <Link className="focus-ring mt-8 inline-flex rounded-lg bg-white px-6 py-3 font-bold text-slate-950 shadow-xl" href={banner.cta.href}>
          {banner.cta.label}
        </Link>
      </div>
    </section>
  );
}
