import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseCountTarget(value: string): number {
  const match = value.replace(/,/g, "").match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

export function generateJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    ...data,
  });
}

export function highlightText(text: string, highlight: string) {
  if (!highlight || !text.includes(highlight)) return { before: text, match: "", after: "" };
  const [before, after = ""] = text.split(highlight);
  return { before, match: highlight, after };
}
