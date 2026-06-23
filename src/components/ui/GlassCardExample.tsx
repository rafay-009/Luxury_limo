"use client";

import { GlassCard } from "@/components/ui/GlassCard";

/**
 * Drop-in demo: sharp retina background + CSS glass card (no PNG blur layers).
 * Use on any page while migrating Figma exports to GlassCard.
 */
export function GlassCardExample() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Sharp, high-res background — never apply blur here */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[#05050a]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(ellipse 70% 50% at 80% 70%, rgba(14,165,233,0.18), transparent 50%)",
        }}
      />

      <div className="container relative z-10 flex justify-center px-4">
        <GlassCard
          hoverEffect
          bgAlpha={0.2}
          blurAmount={25}
          borderRadius={16}
          className="max-w-md p-8"
          svgElement={
            <svg
              className="absolute -right-6 -top-6 h-24 w-24 text-white/10"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
            </svg>
          }
        >
          <p className="text-xs font-normal uppercase tracking-widest text-white/70">Premium transfer</p>
          <h3 className="mt-2 text-2xl font-bold text-white">CSS Glass Card</h3>
          <p className="mt-3 text-sm font-normal leading-relaxed text-white/85">
            Retina-ready glassmorphism with backdrop blur — replace low-res Figma PNG layers with this component.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
