"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavShortcut {
  key: string;
  numKey: string;
  label: string;
  href: string;
}

const navShortcuts: NavShortcut[] = [
  { key: "F1", numKey: "1", label: "Beranda", href: "#hero" },
  { key: "F2", numKey: "2", label: "Tentang", href: "#about" },
  { key: "F3", numKey: "3", label: "Keahlian", href: "#skills" },
  { key: "F4", numKey: "4", label: "Proyek", href: "#projects" },
  { key: "F5", numKey: "5", label: "Pengalaman", href: "#experience" },
  { key: "F6", numKey: "6", label: "Kontak", href: "#contact" },
];

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const navigateToSection = useCallback(
    (href: string, keyName?: string) => {
      if (keyName) {
        setActiveKey(keyName);
        setTimeout(() => setActiveKey(null), 350);
      }

      if (pathname === "/") {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
          return;
        }
      }

      router.push(`/${href}`);
    },
    [pathname, router]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      // Check Function keys (F1 - F6)
      const shortcutByFKey = navShortcuts.find(
        (item) => item.key.toLowerCase() === e.key.toLowerCase()
      );

      if (shortcutByFKey) {
        e.preventDefault();
        navigateToSection(shortcutByFKey.href, shortcutByFKey.key);
        return;
      }

      // Check number keys 1 - 6 when not typing in an input
      if (!isTyping && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const shortcutByNum = navShortcuts.find(
          (item) => item.numKey === e.key
        );
        if (shortcutByNum) {
          e.preventDefault();
          navigateToSection(shortcutByNum.href, shortcutByNum.key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateToSection]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    key: string
  ) => {
    e.preventDefault();
    navigateToSection(href, key);
  };

  return (
    <footer className="mt-auto">
      {/* Bottom Command Nav Bar */}
      <nav
        aria-label="Terminal Navigation Shortcuts"
        className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--terminal-bg-elevated)] border-t border-[var(--terminal-border)] py-2 px-3 flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap backdrop-blur-md select-none"
      >
        {navShortcuts.map((item) => {
          const isActive = activeKey === item.key;
          return (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => handleClick(e, item.href, item.key)}
              className={`flex items-center gap-1.5 text-xs px-2 sm:px-2.5 py-1 rounded transition-all duration-150 ${
                isActive
                  ? "bg-[var(--terminal-accent-dim)] text-[var(--terminal-accent)] scale-105"
                  : "text-[var(--terminal-text-dim)] hover:text-[var(--terminal-text)] hover:bg-[var(--terminal-bg-panel)]"
              }`}
              title={`Shortcut: ${item.key} atau ${item.numKey}`}
            >
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors ${
                  isActive
                    ? "bg-[var(--terminal-accent)] text-[var(--terminal-bg)] border-[var(--terminal-accent)]"
                    : "bg-[var(--terminal-bg-panel)] text-[var(--terminal-accent)] border-[var(--terminal-border)]"
                }`}
              >
                {item.key}
              </span>
              <span className="font-medium text-[11px] sm:text-xs">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </footer>
  );
}

