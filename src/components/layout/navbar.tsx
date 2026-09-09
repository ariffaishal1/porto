"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Download, Terminal } from "lucide-react";
import { profileData } from "@/data/profile";
import { useCommandPalette } from "@/components/layout/command-palette-context";

export function Navbar() {
  const { openPalette } = useCommandPalette();

  return (
    <header className="sticky top-0 z-50 bg-[var(--terminal-bg-elevated)] border-b border-[var(--terminal-border)] px-4 py-2.5 flex items-center justify-between backdrop-blur-md">
      {/* Traffic light buttons & Tabs */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 items-center">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block shadow-sm" />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <Link
            href="/"
            className="bg-[var(--terminal-bg-panel)] text-[var(--terminal-text)] px-3 py-1 rounded-md font-medium border border-[var(--terminal-border)]/50"
          >
            arif@portfolio: ~
          </Link>
          <span className="hidden sm:inline-block text-[var(--terminal-text-dim)] px-1.5 py-1">
            zsh
          </span>
        </div>
      </div>

      {/* Meta info & actions */}
      <div className="flex items-center gap-2">
        {/* Terminal Command Palette Trigger */}
        <button
          onClick={openPalette}
          className="flex items-center gap-1.5 text-xs text-[var(--terminal-text-dim)] hover:text-[var(--terminal-accent)] bg-[var(--terminal-bg-panel)] hover:bg-[var(--terminal-bg-selection)] border border-[var(--terminal-border)] px-2.5 py-1 rounded transition-colors group cursor-pointer"
          title="Buka Terminal CLI Interaktif (Ctrl+K / Cmd+K)"
        >
          <Terminal className="w-3.5 h-3.5 text-[var(--terminal-accent)]" />
          <span className="hidden sm:inline font-mono text-[11px] text-[var(--terminal-text)] group-hover:text-[var(--terminal-accent)]">
            prompt
          </span>
          <kbd className="text-[10px] bg-[var(--terminal-bg-elevated)] border border-[var(--terminal-border)] px-1 py-0.2 rounded font-mono text-[var(--terminal-amber)]">
            ⌘K
          </kbd>
        </button>

        <a
          href={profileData.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-xs text-[var(--terminal-accent)] hover:underline border border-[var(--terminal-border)] px-2.5 py-1 rounded bg-[var(--terminal-bg-panel)]"
        >
          <Download className="w-3 h-3" /> CV
        </a>
        <ThemeToggle />
        <span className="text-[11px] text-[var(--terminal-text-dim)] hidden md:inline">
          utf-8
        </span>
      </div>
    </header>
  );
}

