"use client";

import type { ComponentType } from "react";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.8 }: IconProps) {
  const LucideIcon = Icons[name as IconName] as ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean;
  }>;

  if (!LucideIcon) {
    return <Icons.CircleDot className={className} strokeWidth={strokeWidth} aria-hidden />;
  }

  return <LucideIcon className={className} strokeWidth={strokeWidth} aria-hidden />;
}
