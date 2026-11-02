"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export function WhatsappClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (!/wa\.me|api\.whatsapp\.com|wa\.link/.test(href)) return;

      sendGAEvent("event", "whatsapp_click", {
        page_path: window.location.pathname,
        link_text: (link.textContent ?? "").trim().slice(0, 80),
        link_url: href.split("?")[0],
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
