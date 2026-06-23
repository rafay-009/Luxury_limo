"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { footbalIcon, logo } from "@/page-modules/shared/assets";
import { AudienceBar } from "@/components/layout/AudienceBar";
import { NAV_DESKTOP_LINKS, SITE_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showFifaBar, setShowFifaBar] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const nav = SITE_CONFIG.navigation;
  const phone = SITE_CONFIG.company.phone;
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > nav.scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [nav.scrollThreshold]);

  useEffect(() => {
    if (!open) return;

    const closeMenu = () => setOpen(false);

    const onScroll = () => closeMenu();

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (mobileMenuRef.current?.contains(target)) return;
      if (menuToggleRef.current?.contains(target)) return;
      closeMenu();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty("--site-header-height", `${header.offsetHeight}px`);
    };

    syncHeaderHeight();

    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);

    return () => observer.disconnect();
  }, [showFifaBar, open]);

  return (
    <header ref={headerRef} className="site-header">
      <AudienceBar />
      <nav
        aria-label="Primary navigation"
        className={cn("site-nav", scrolled ? "site-nav--scrolled" : "site-nav--transparent")}
      >
        <div className="site-container site-nav__inner">
          <Link className="site-nav__logo-link focus-ring flex shrink-0 items-center" href="/" aria-label="Luxy Miles home">
            <Image src={logo} alt="Luxy Miles" width={104} height={38} className="site-nav__logo" priority />
          </Link>

          <div className="site-nav__desktop">
            {NAV_DESKTOP_LINKS.map((link) =>
              link.dropdown && link.items ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className="btn btn--nav-link focus-ring"
                    aria-expanded={openDropdown === link.label}
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown((current) => (current === link.label ? null : link.label))}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition", openDropdown === link.label && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={cn(
                      "absolute left-0 top-full z-50 pt-2 transition-all duration-200",
                      openDropdown === link.label ? "visible opacity-100" : "invisible opacity-0"
                    )}
                  >
                    <div className="site-nav__dropdown">
                      {link.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="site-nav__dropdown-link focus-ring block px-4 py-2.5 text-[13px] font-normal transition hover:bg-white/5"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span className="site-nav__dropdown-label">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button key={link.label} type="button" className="btn btn--nav-link focus-ring">
                  {link.label}
                  {link.dropdown ? <ChevronDown className="h-3.5 w-3.5" aria-hidden /> : null}
                </button>
              )
            )}
          </div>

          <div className="site-nav__actions">
            <a
              href={phoneHref}
              className="focus-ring inline-flex items-center gap-2 text-[13px] font-normal text-white transition hover:text-cyan-300"
            >
              <Phone className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {phone}
            </a>
            <Link href={nav.cta.href} className="btn btn--cta focus-ring">
              {nav.cta.label}
            </Link>
          </div>

          <div className="site-nav__mobile">
            <a
              href={phoneHref}
              className="focus-ring hidden items-center gap-1.5 text-[12px] font-normal text-white transition hover:text-cyan-300 sm:inline-flex"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
              <span className="max-w-[9.5rem] truncate sm:max-w-none">{phone}</span>
            </a>
            <Link href={nav.cta.href} className="btn btn--cta btn--cta-sm focus-ring">
              {nav.cta.label}
            </Link>
            <button
              ref={menuToggleRef}
              aria-label="Toggle navigation"
              aria-expanded={open}
              className="btn btn--ghost focus-ring shrink-0"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div ref={mobileMenuRef} className="site-nav__menu">
            <div className="grid gap-1">
              {NAV_DESKTOP_LINKS.map((link) =>
                link.dropdown && link.items ? (
                  <div key={link.label} className="py-1">
                    <p className="px-3 py-2 text-[12px] font-normal text-slate-400">{link.label}</p>
                    {link.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="site-nav__dropdown-link focus-ring block rounded-lg px-3 py-2 text-[15px] font-normal transition hover:bg-white/5"
                        onClick={() => setOpen(false)}
                      >
                        <span className="site-nav__dropdown-label">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <button
                    key={link.label}
                    type="button"
                    className="rounded-lg px-3 py-2 text-left font-normal text-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </button>
                )
              )}
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-left font-normal text-slate-100"
                onClick={() => setOpen(false)}
              >
                About
              </button>
              <Link
                href={nav.cta.href}
                className="btn btn--cta focus-ring mt-2 block w-full text-center"
                onClick={() => setOpen(false)}
              >
                {nav.cta.label}
              </Link>
            </div>
          </div>
        ) : null}
      </nav>

      {showFifaBar ? (
        <div className="fifa-bar">
          <div className="site-container fifa-bar__inner">
            <p className="flex min-w-0 items-center gap-2.5 text-[11px] font-normal sm:text-[13px]">
              <Image
                src={footbalIcon}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 shrink-0 object-contain"
                aria-hidden
              />
              <span className="truncate">FIFA World Cup 2026 is coming - Book your stadium transfers in Canada, USA & Mexico</span>
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                className="hidden items-center gap-1 rounded-full bg-white/22 px-4 py-1.5 text-[12px] font-normal text-slate-950 transition hover:bg-white/35 sm:inline-flex"
              >
                Explore FIFA Services <ArrowRight className="h-3 w-3" aria-hidden />
              </button>
              <button
                aria-label="Dismiss FIFA announcement"
                className="focus-ring rounded-full p-1 text-slate-950 transition hover:bg-white/20"
                onClick={() => setShowFifaBar(false)}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
