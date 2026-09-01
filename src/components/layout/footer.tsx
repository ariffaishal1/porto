"use client";

import React from "react";
import { profileData } from "@/data/profile";

const navShortcuts = [
  { key: "F1", label: "Beranda", href: "#hero" },
  { key: "F2", label: "Tentang", href: "#about" },
  { key: "F3", label: "Keahlian", href: "#skills" },
  { key: "F4", label: "Proyek", href: "#projects" },
  { key: "F5", label: "Pengalaman", href: "#experience" },
  { key: "F6", label: "Kontak", href: "#contact" },
];

export function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Bottom Command Nav Bar */}
      <nav
        aria-label="Terminal Navigation Shortcuts"
        className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--terminal-bg-elevated)] border-t border-[var(--terminal-border)] py-2 px-3 flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap backdrop-blur-md"
      >
        {navShortcuts.map((item) => (
          <a
            key={item.key}
            href={item.href}
            onClick={(e) => handleScroll(e, item.href)}
            className="flex items-center gap-1.5 text-xs text-[var(--terminal-text-dim)] hover:text-[var(--terminal-text)] hover:bg-[var(--terminal-bg-panel)] px-2 sm:px-2.5 py-1 rounded transition-colors"
          >
            <span className="bg-[var(--terminal-bg-panel)] text-[var(--terminal-accent)] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[var(--terminal-border)]">
              {item.key}
            </span>
            <span className="font-medium text-[11px] sm:text-xs">{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
