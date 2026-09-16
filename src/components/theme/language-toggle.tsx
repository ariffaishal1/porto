"use client";

import React from "react";
import { useLanguage } from "./language-context";
import { playKeyClick } from "@/lib/sound";
import { Languages } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
  showIcon?: boolean;
}

export function LanguageToggle({ className = "", showIcon = true }: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();

  const handleSelect = (lang: "id" | "en") => {
    if (language !== lang) {
      playKeyClick();
      setLanguage(lang);
    }
  };

  return (
    <div
      role="group"
      aria-label="Language switch"
      className={`inline-flex items-center rounded border border-[var(--terminal-border)] bg-[var(--terminal-bg-panel)] p-0.5 text-xs font-mono select-none ${className}`}
      title={t.nav.switchLang}
    >
      {showIcon && (
        <span className="pl-1.5 pr-1 text-[var(--terminal-text-dim)] flex items-center">
          <Languages className="w-3 h-3" />
        </span>
      )}
      <button
        type="button"
        onClick={() => handleSelect("id")}
        className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
          language === "id"
            ? "bg-[var(--terminal-bg-selection)] text-[var(--terminal-accent)] font-bold shadow-xs"
            : "text-[var(--terminal-text-dim)] hover:text-[var(--terminal-text)]"
        }`}
        aria-pressed={language === "id"}
      >
        ID
      </button>
      <span className="text-[var(--terminal-border)] px-0.5">/</span>
      <button
        type="button"
        onClick={() => handleSelect("en")}
        className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
          language === "en"
            ? "bg-[var(--terminal-bg-selection)] text-[var(--terminal-accent)] font-bold shadow-xs"
            : "text-[var(--terminal-text-dim)] hover:text-[var(--terminal-text)]"
        }`}
        aria-pressed={language === "en"}
      >
        EN
      </button>
    </div>
  );
}
