"use client";

import { type CSSProperties, type ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type GlassCardProps = {
  children?: ReactNode;
  /** Future manual SVG decorations — rendered in an isolated layer that does not affect blur. */
  svgElement?: ReactNode;
  /** Background white alpha (0–1). Default: 0.2 */
  bgAlpha?: number;
  /** Backdrop blur in px. Default: 25 */
  blurAmount?: number;
  /** Backdrop saturation in %. Default: 180 */
  saturation?: number;
  /** Animate scale + stronger blur on hover. Default: false */
  hoverEffect?: boolean;
  /** Corner radius in px. Default: 16 */
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
};

function glassSurfaceStyle({
  bgAlpha,
  blurAmount,
  saturation,
}: {
  bgAlpha: number;
  blurAmount: number;
  saturation: number;
}): CSSProperties {
  return {
    backgroundColor: `rgba(255, 255, 255, ${bgAlpha})`,
    backdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
  };
}

export function GlassCard({
  children,
  svgElement,
  bgAlpha = 0.2,
  blurAmount = 25,
  saturation = 180,
  hoverEffect = false,
  borderRadius = 16,
  className,
  style,
  width,
  height,
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const activeBlur = hoverEffect && isHovered ? blurAmount + 10 : blurAmount;
  const activeSaturation = hoverEffect && isHovered ? saturation + 20 : saturation;

  return (
    <motion.div
      className={cn(
        "relative isolate w-full overflow-hidden",
        "border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)]",
        "transition-[box-shadow] duration-300",
        hoverEffect && "hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)]",
        className
      )}
      style={{
        borderRadius,
        width,
        height,
        ...glassSurfaceStyle({ bgAlpha, blurAmount: activeBlur, saturation: activeSaturation }),
        ...style,
      }}
      initial={false}
      animate={hoverEffect ? { scale: isHovered ? 1.03 : 1 } : undefined}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      onHoverStart={hoverEffect ? () => setIsHovered(true) : undefined}
      onHoverEnd={hoverEffect ? () => setIsHovered(false) : undefined}
    >
      {/* SVG overlay slot — pointer-events-none, no backdrop/filter so glass stays crisp */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {svgElement ?? (
          <div
            className="flex h-full w-full items-center justify-center opacity-0"
            data-glass-svg-placeholder
          />
        )}
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
