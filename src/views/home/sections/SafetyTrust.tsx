import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { SAFETY_COMPLIANCE_ITEMS, SAFETY_TRUST_ITEMS } from "@/constants";

export function SafetyTrust() {
  return (
    <>
      <section className="section section--light section-pad" aria-label="Safety and trust">
        <div className="section-inner">
          <header className="section-header section-header--center">
            <h2 className="heading-display heading-display--dark">
              Safety & <span className="text-accent">Trust</span>
            </h2>
            <p className="section-lead">Every standard verified. Every ride protected.</p>
          </header>

          <div className="section-body content-medium">
            <div className="grid gap-x-20 gap-y-9 md:grid-cols-2">
              {SAFETY_TRUST_ITEMS.map((item) => (
                <article key={item.title} className="grid grid-cols-[28px_1fr] gap-4">
                  <item.icon className="mt-1 h-5 w-5 text-zinc-400" strokeWidth={1.8} aria-hidden />
                  <div>
                    <h3 className="text-[16px] font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-5 text-zinc-500">{item.text}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10px] font-normal text-zinc-500">
                      <CheckCircle2 className="h-3 w-3" aria-hidden />
                      {item.badge}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--black section-pad overflow-x-hidden border-t border-white/10" aria-label="Security and compliance">
        <div className="section-inner min-w-0">
          <header className="section-header section-header--center">
            <h2 className="heading-display heading-display--light">
              Full Security & <span className="text-accent">Compliance</span>
            </h2>
            <p className="section-lead">Every standard verified. Every ride protected.</p>
          </header>

          <div className="section-body content-wide">
            <div className="grid w-full gap-3 md:grid-cols-3 md:gap-4">
              {SAFETY_COMPLIANCE_ITEMS.map((item) => (
                <article
                  key={item.title}
                  className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 md:gap-4 md:px-5 md:py-3.5"
                >
                  <Image
                    src={item.logo}
                    alt=""
                    width={56}
                    height={56}
                    className="h-11 w-11 shrink-0 md:h-12 md:w-12"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold leading-tight text-white md:text-[15px]">{item.title}</h3>
                    <p className="mt-1 text-[11px] leading-[1.4] text-zinc-400 md:text-[12px]">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
