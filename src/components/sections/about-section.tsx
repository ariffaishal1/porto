"use client";

import React from "react";
import { getProfileData } from "@/data/profile";
import { useLanguage } from "@/components/theme/language-context";
import { AsciiBlackHole } from "@/components/ui/ascii-black-hole";
import { useAccentColor } from "@/components/theme/accent-color-context";
import { useBlackHole } from "@/components/theme/black-hole-context";

export function AboutSection() {
  const { setAccentColor, colors } = useAccentColor();
  const { triggerCollapse, collapseState } = useBlackHole();
  const { language, t } = useLanguage();
  const profile = getProfileData(language);

  return (
    <section id="about" className="flex flex-col gap-2 pt-4 border-t border-[var(--terminal-border)]">
      {/* Command prompt */}
      <div className="flex items-baseline flex-wrap gap-0 text-sm font-medium">
        <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
        <span className="text-[var(--terminal-text-dim)]">@</span>
        <span className="text-[var(--terminal-blue)]">portfolio</span>
        <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>
        <span className="text-[var(--terminal-text-bright)]">neofetch</span>
      </div>

      {/* Neofetch grid */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start pt-2">
        {/* Left: 3D Animated ASCII Black Hole (Clickable Easter Egg) */}
        <div
          onClick={triggerCollapse}
          className="flex items-center justify-start min-w-[240px] cursor-pointer group transition-transform duration-200 hover:scale-[1.02] active:scale-95"
          title={t.about.easterEggTooltip}
        >
          <AsciiBlackHole
            isHyperSpin={collapseState === "warning" || collapseState === "sucking"}
          />
        </div>

        {/* Right: Info Lines */}
        <div className="flex flex-col gap-1 text-[13px] leading-relaxed">
          <div className="text-[var(--terminal-accent)] font-bold text-sm">
            arif@portfolio
          </div>
          <div className="text-[var(--terminal-text-dim)] -mt-0.5 mb-1 select-none">
            ──────────────────────
          </div>

          <div>
            <span className="text-[var(--terminal-accent)] font-semibold">Name:</span>{" "}
            <span className="text-[var(--terminal-text-bright)]">{profile.name}</span>
          </div>

          <div>
            <span className="text-[var(--terminal-accent)] font-semibold">{t.about.roleLabel}:</span>{" "}
            <span className="text-[var(--terminal-text)]">{profile.role}</span>
          </div>

          <div>
            <span className="text-[var(--terminal-accent)] font-semibold">Education:</span>{" "}
            <span className="text-[var(--terminal-text)]">
              {language === "en"
                ? "B.S. Informatics (Widyatama Univ, 2025) • A.S. Computer Engineering (Telkom Univ, 2022)"
                : "S1 Informatika (Univ. Widyatama, 2025) • D3 Teknik Komputer (Telkom Univ, 2022)"}
            </span>
          </div>

          <div>
            <span className="text-[var(--terminal-accent)] font-semibold">{t.about.locationLabel}:</span>{" "}
            <span className="text-[var(--terminal-text)]">{profile.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[var(--terminal-accent)] font-semibold">{t.about.statusLabel}:</span>{" "}
            <span className="inline-flex items-center gap-1.5 text-[var(--terminal-green)]">
              <span className="w-2 h-2 rounded-full bg-[var(--terminal-green)] status-pulse" />
              {profile.availability}
            </span>
          </div>

          <div>
            <span className="text-[var(--terminal-accent)] font-semibold">Email:</span>{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-[var(--terminal-blue)] hover:underline"
            >
              {profile.email}
            </a>
          </div>

          <div className="mt-1">
            <span className="text-[var(--terminal-accent)] font-semibold">Bio:</span>{" "}
            <span className="text-[var(--terminal-text)]">{profile.shortBio}</span>
          </div>

          {/* Color palette blocks (Linux neofetch easter egg) */}
          <div className="flex gap-1.5 mt-3">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setAccentColor(color.id)}
                type="button"
                aria-label={`Color swatch ${color.name}`}
                className="w-6 h-3 rounded-sm transition-transform hover:scale-110 active:scale-95 cursor-pointer outline-none"
                style={{ backgroundColor: color.darkHex }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
