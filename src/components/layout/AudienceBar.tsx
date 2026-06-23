"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { AUDIENCES } from "@/constants";
import { cn } from "@/lib/utils";

export function AudienceBar() {
  const [active, setActive] = useState<(typeof AUDIENCES)[number]>("Individual");

  return (
    <div className="border-b border-white/10 bg-black" aria-label="Audience selector">
      <div className="mx-auto flex h-9 w-[calc(100%-1.25rem)] max-w-[1140px] items-center justify-between sm:w-[calc(100%-2rem)]">
        <div className="flex items-center gap-2 text-[12px] font-normal text-white">
          {AUDIENCES.map((item, index) => (
            <span key={item} className="flex items-center gap-2">
              {index > 0 ? <span className="text-white/35" aria-hidden>|</span> : null}
              <button
                type="button"
                className={cn(
                  "focus-ring transition hover:text-cyan-300",
                  active === item ? "text-white" : "text-white/55"
                )}
                onClick={() => setActive(item)}
              >
                {item}
              </button>
            </span>
          ))}
        </div>

        <button
          type="button"
          className="focus-ring flex items-center gap-1.5 text-[12px] font-normal text-white transition hover:text-cyan-300"
          aria-label="Language and region"
        >
          <Globe className="h-3.5 w-3.5" aria-hidden />
          <ChevronDown className="h-3 w-3 opacity-80" aria-hidden />
        </button>
      </div>
    </div>
  );
}
