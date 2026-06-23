"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone, Quote, Twitter } from "lucide-react";
import { complianceIcons, logo } from "@/pages/shared/assets";
import { FOOTER_AGENT_COLORS, FOOTER_COLUMNS, SITE_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";

const { company, footer } = SITE_CONFIG;
const phoneHref = `tel:${company.phone.replace(/[^\d+]/g, "")}`;
const whatsAppHref = `https://wa.me/${company.phone.replace(/\D/g, "")}`;

function FooterLinkColumn({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white">{heading}</h3>
      <div className="mt-4 grid gap-3 lg:mt-6 lg:gap-4">
        {links.map((link) => (
          <button key={link} type="button" className="text-left text-[13px] font-normal text-zinc-500 transition hover:text-cyan-300 lg:text-sm">
            {link}
          </button>
        ))}
      </div>
    </div>
  );
}

function FooterAgentsBadge() {
  return (
    <div className="glass glass-hover inline-flex items-center gap-3 rounded-2xl px-4 py-2">
      <div className="flex -space-x-2">
        {FOOTER_AGENT_COLORS.map((color) => (
          <span key={color} className="h-6 w-6 rounded-full border border-black" style={{ background: color }} />
        ))}
      </div>
      <div>
        <p className="text-[12px] font-normal">
          3 Agents <span className="text-emerald-400">Live now</span>
        </p>
        <p className="text-[10px] text-zinc-500">Average response: 2 mins</p>
      </div>
    </div>
  );
}

function FooterCtaButtons() {
  return (
    <div className="grid gap-4">
      <button
        type="button"
        className="cyan-cta focus-ring flex h-12 w-full items-center justify-center gap-3 rounded-[10px] bg-[#12b8d0] text-[14px] font-bold !text-black transition hover:bg-cyan-300 hover:!text-black"
      >
        <Quote className="h-4 w-4 !text-black" aria-hidden />
        Get Instant Quote
      </button>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <a
          className="glass glass-hover focus-ring flex h-11 items-center justify-center gap-2 text-[13px] font-normal text-zinc-300 transition hover:border-cyan-300 hover:text-cyan-300"
          href={whatsAppHref}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          WhatsApp
        </a>
        <a
          className="glass glass-hover focus-ring flex h-11 items-center justify-center gap-2 text-[13px] font-normal text-zinc-300 transition hover:border-cyan-300 hover:text-cyan-300"
          href={phoneHref}
        >
          <Phone className="h-4 w-4" aria-hidden />
          Call Now
        </a>
      </div>
    </div>
  );
}

function FooterBrand({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image src={logo} alt="Luxy Miles" width={104} height={38} className="h-9 w-auto sm:h-10" />
      <p className="mt-6 max-w-[380px] text-[14px] leading-7 text-zinc-400 lg:mt-8 lg:text-[15px]">
        Premium chauffeur rides across Canada with exceptional service and comfort for every journey.
      </p>
      <div className="mt-5 grid gap-3 text-sm text-zinc-400 lg:mt-6">
        <a className="flex items-center gap-3 transition hover:text-cyan-300" href={`mailto:${company.email}`}>
          <Mail className="h-4 w-4 shrink-0" aria-hidden />
          {company.email}
        </a>
        <a className="flex items-center gap-3 transition hover:text-cyan-300" href={phoneHref}>
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          {company.phone}
        </a>
      </div>
      <div className="mt-5 flex gap-3 lg:mt-6">
        {[
          { icon: Twitter, label: "Twitter" },
          { icon: Linkedin, label: "LinkedIn" },
          { icon: Instagram, label: "Instagram" },
          { icon: Facebook, label: "Facebook" },
        ].map((item) => (
          <a
            key={item.label}
            aria-label={item.label}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 text-zinc-400 transition hover:border-cyan-300 hover:text-cyan-300"
            href="#"
          >
            <item.icon className="h-4 w-4" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const pathname = usePathname();
  const hideCta = pathname === "/services/newyork";

  return (
    <footer className="bg-black text-white">
      {!hideCta ? (
        <div className="container py-8 lg:py-10">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_420px] lg:items-center lg:gap-10">
            <div>
              <FooterAgentsBadge />
              <h2 className="mt-5 max-w-[380px] text-[clamp(1.45rem,5vw,2rem)] font-bold leading-[1.15]">
                Get your ride
                <span className="block">confirmed in minutes</span>
              </h2>
              <p className="mt-4 text-[14px] font-normal text-zinc-400 lg:text-[16px]">
                No commitment. Fast confirmation. Best available price.
              </p>
            </div>
            <FooterCtaButtons />
          </div>
        </div>
      ) : null}

      {/* Brand + navigation */}
      <div className="border-t border-white/10">
        <div className="container py-8 lg:py-10">
          <FooterBrand className="mb-10 lg:hidden" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:hidden">
            <FooterLinkColumn heading={FOOTER_COLUMNS[0].heading} links={FOOTER_COLUMNS[0].links} />
            <FooterLinkColumn heading={FOOTER_COLUMNS[1].heading} links={FOOTER_COLUMNS[1].links} />
            <div className="col-span-2">
              <FooterLinkColumn heading={FOOTER_COLUMNS[2].heading} links={FOOTER_COLUMNS[2].links} />
            </div>
          </div>

          <div className="hidden gap-12 lg:grid lg:grid-cols-[1.35fr_repeat(3,1fr)]">
            <FooterBrand />
            {FOOTER_COLUMNS.map((column) => (
              <FooterLinkColumn key={column.heading} heading={column.heading} links={column.links} />
            ))}
          </div>
        </div>
      </div>

      {/* Compliance */}
      <div className="border-t border-white/10">
        <div
          className={cn(
            "container flex flex-col items-center gap-5 px-4 py-8 text-center",
            "lg:flex-row lg:items-center lg:justify-between lg:px-0 lg:text-left"
          )}
        >
          <p className="max-w-[320px] text-[12px] font-normal leading-6 text-zinc-500 lg:max-w-[720px] lg:text-[13px]">
            Urban Elite is registered with the Information Commissioner&apos;s Office in line with the Data Protection Act 2018.
            Supports 256-bit TLS encryption on every device
          </p>
          <Image
            src={complianceIcons}
            alt="ICO, GDPR, and CCPA compliance icons"
            width={168}
            height={40}
            className="h-[34px] w-auto shrink-0"
          />
        </div>
      </div>

      {/* Copyright + payments */}
      <div className="border-t border-white/10">
        <div
          className={cn(
            "container flex flex-col items-center gap-4 px-4 py-7 text-center text-[12px] text-zinc-500",
            "lg:flex-row lg:items-center lg:justify-between lg:px-0 lg:text-left lg:text-[13px]"
          )}
        >
          <p>{footer.bottomBar.copyright}</p>
          <div className="flex flex-col items-center gap-3 lg:flex-row">
            <span>Accepted payments:</span>
            <div className="flex items-center gap-2">
              {["VISA", "Mastercard", "Amex"].map((payment) => (
                <span
                  key={payment}
                  className="rounded-md border border-white/15 px-3 py-1.5 text-[10px] font-normal text-zinc-300 lg:px-4 lg:py-2 lg:text-[11px]"
                >
                  {payment}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
