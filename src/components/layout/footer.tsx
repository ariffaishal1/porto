"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
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
  { key: "F5", numKey: "5", label: "GitHub", href: "#github" },
  { key: "F6", numKey: "6", label: "Pengalaman", href: "#experience" },
  { key: "F7", numKey: "7", label: "Kontak", href: "#contact" },
];

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navigateToSection = useCallback(
    (href: string, keyName?: string) => {
      // Ensure footer is visible when navigating
      setIsVisible(true);

      if (keyName) {
        setActiveKey(keyName);
        setTimeout(() => setActiveKey(null), 400);
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

  // Auto-hide on scroll down, reveal on scroll up or at page boundaries
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;
          const isAtBottom =
            window.innerHeight + currentScrollY >=
            document.documentElement.scrollHeight - 60;
          const isAtTop = currentScrollY < 60;

          if (isAtTop || isAtBottom) {
            setIsVisible(true);
          } else if (scrollDelta > 15) {
            // Scrolling down -> auto-hide
            setIsVisible(false);
          } else if (scrollDelta < -15) {
            // Scrolling up -> auto-reveal
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reveal footer when mouse hovers near the bottom of the screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY >= window.innerHeight - 45) {
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard shortcut listener (F1 - F7 and numbers 1 - 7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      // Check Function keys (F1 - F7)
      const shortcutByFKey = navShortcuts.find(
        (item) => item.key.toLowerCase() === e.key.toLowerCase()
      );

      if (shortcutByFKey) {
        e.preventDefault();
        setIsVisible(true);
        navigateToSection(shortcutByFKey.href, shortcutByFKey.key);
        return;
      }

      // Check number keys 1 - 7 when not typing in an input
      if (!isTyping && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const shortcutByNum = navShortcuts.find(
          (item) => item.numKey === e.key
        );
        if (shortcutByNum) {
          e.preventDefault();
          setIsVisible(true);
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
      {/* Floating mini trigger when bar is hidden */}
      <button
        type="button"
        onClick={() => setIsVisible(true)}
        aria-label="Tampilkan shortcut navigasi"
        className={`fixed bottom-2.5 right-4 z-40 bg-[var(--terminal-bg-elevated)]/90 backdrop-blur-md border border-[var(--terminal-border)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-accent)] hover:border-[var(--terminal-accent)] text-[11px] font-mono px-2.5 py-1 rounded-full shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
          isVisible
            ? "opacity-0 pointer-events-none translate-y-3"
            : "opacity-100 pointer-events-auto translate-y-0 hover:scale-105"
        }`}
        title="Tampilkan Shortcut Navigasi (F1-F7)"
      >
        <span className="text-[var(--terminal-accent)] font-bold">⌨</span>
        <span className="hidden sm:inline">Shortcuts</span>
        <span className="text-[10px] text-[var(--terminal-amber)]">▲</span>
      </button>

      {/* Bottom Command Nav Bar with smooth auto-hide transition */}
      <nav
        aria-label="Terminal Navigation Shortcuts"
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[var(--terminal-bg-elevated)] border-t border-[var(--terminal-border)] py-2 px-3 flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap backdrop-blur-md select-none transition-all duration-300 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100 shadow-[0_-4px_20px_rgba(0,0,0,0.25)]"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
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

        {/* Manual collapse/hide button */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Sembunyikan shortcut bar"
          className="text-[var(--terminal-text-dim)] hover:text-[var(--terminal-accent)] px-1.5 py-0.5 rounded text-xs transition-colors cursor-pointer ml-1"
          title="Sembunyikan shortcut (akan muncul kembali saat scroll ke atas atau arahkan mouse ke bawah layar)"
        >
          ▼
        </button>
      </nav>
    </footer>
  );
}

