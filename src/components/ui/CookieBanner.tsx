"use client";

import { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/constants";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const config = SITE_CONFIG.globalComponents.cookieBanner;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(config.show && window.localStorage.getItem("luxy-cookie-choice") === null);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [config.show]);

  if (!visible) return null;

  function choose(value: string) {
    window.localStorage.setItem("luxy-cookie-choice", value);
    setVisible(false);
  }

  return (
    <div className="glass glass-hover fixed bottom-5 left-5 z-50 max-w-sm p-4 text-sm text-slate-200">
      <p>{config.message}</p>
      <div className="mt-4 flex gap-2">
        <button
          className="cyan-cta focus-ring rounded-lg bg-cyan-300 px-4 py-2 font-bold text-slate-950"
          onClick={() => choose("accepted")}
          type="button"
        >
          {config.acceptLabel}
        </button>
        <button
          className="focus-ring rounded-lg border border-white/10 px-4 py-2 font-normal text-white"
          onClick={() => choose("declined")}
          type="button"
        >
          {config.declineLabel}
        </button>
      </div>
    </div>
  );
}
