"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useTheme } from "next-themes";

export interface AccentColor {
  id: string;
  name: string;
  darkHex: string;
  lightHex: string;
  dimDark: string;
  dimLight: string;
}

export const ACCENT_COLORS: AccentColor[] = [
  {
    id: "rose",
    name: "Rose",
    darkHex: "#e06c75",
    lightHex: "#e11d48",
    dimDark: "rgba(224, 108, 117, 0.2)",
    dimLight: "rgba(225, 29, 72, 0.15)",
  },
  {
    id: "amber",
    name: "Amber",
    darkHex: "#f0c674",
    lightHex: "#d97706",
    dimDark: "rgba(240, 198, 116, 0.2)",
    dimLight: "rgba(217, 119, 6, 0.15)",
  },
  {
    id: "sage",
    name: "Sage",
    darkHex: "#a3be8c",
    lightHex: "#16a34a",
    dimDark: "rgba(163, 190, 140, 0.2)",
    dimLight: "rgba(22, 163, 74, 0.15)",
  },
  {
    id: "emerald",
    name: "Emerald",
    darkHex: "#22d3a7",
    lightHex: "#059669",
    dimDark: "rgba(34, 211, 167, 0.2)",
    dimLight: "rgba(5, 150, 105, 0.15)",
  },
  {
    id: "cyan",
    name: "Cyan",
    darkHex: "#88c0d0",
    lightHex: "#0891b2",
    dimDark: "rgba(136, 192, 208, 0.2)",
    dimLight: "rgba(8, 145, 178, 0.15)",
  },
  {
    id: "blue",
    name: "Blue",
    darkHex: "#81a1c1",
    lightHex: "#2563eb",
    dimDark: "rgba(129, 161, 193, 0.2)",
    dimLight: "rgba(37, 99, 235, 0.15)",
  },
  {
    id: "purple",
    name: "Purple",
    darkHex: "#b48ead",
    lightHex: "#9333ea",
    dimDark: "rgba(180, 142, 173, 0.2)",
    dimLight: "rgba(147, 51, 234, 0.15)",
  },
  {
    id: "silver",
    name: "Silver",
    darkHex: "#c5cad3",
    lightHex: "#475569",
    dimDark: "rgba(197, 202, 211, 0.2)",
    dimLight: "rgba(71, 85, 105, 0.15)",
  },
];

interface AccentColorContextType {
  activeAccent: string;
  setAccentColor: (id: string) => void;
  resetAccentColor: () => void;
  colors: AccentColor[];
}

const AccentColorContext = createContext<AccentColorContextType | undefined>(
  undefined
);

export function AccentColorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeAccent, setActiveAccent] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("portfolio-accent-color");
        if (saved && ACCENT_COLORS.some((c) => c.id === saved)) {
          return saved;
        }
      } catch {}
    }
    return "emerald";
  });
  const { resolvedTheme, theme } = useTheme();

  const applyColor = useCallback((colorId: string, isDark: boolean) => {
    const color =
      ACCENT_COLORS.find((c) => c.id === colorId) || ACCENT_COLORS[3];
    const root = document.documentElement;

    if (colorId === "emerald") {
      // Default: clean inline styles to allow default theme CSS
      root.style.removeProperty("--terminal-accent");
      root.style.removeProperty("--terminal-accent-dim");
    } else {
      const hex = isDark ? color.darkHex : color.lightHex;
      const dim = isDark ? color.dimDark : color.dimLight;
      root.style.setProperty("--terminal-accent", hex);
      root.style.setProperty("--terminal-accent-dim", dim);
    }
  }, []);

  const setAccentColor = useCallback(
    (id: string) => {
      setActiveAccent(id);
      try {
        localStorage.setItem("portfolio-accent-color", id);
      } catch {}
      const isDark = (resolvedTheme || theme || "dark") === "dark";
      applyColor(id, isDark);
    },
    [resolvedTheme, theme, applyColor]
  );

  const resetAccentColor = useCallback(() => {
    setAccentColor("emerald");
  }, [setAccentColor]);

  // Sync with DOM when activeAccent or light/dark theme changes
  useEffect(() => {
    const isDark = (resolvedTheme || theme || "dark") === "dark";
    applyColor(activeAccent, isDark);
  }, [resolvedTheme, theme, activeAccent, applyColor]);

  return (
    <AccentColorContext.Provider
      value={{
        activeAccent,
        setAccentColor,
        resetAccentColor,
        colors: ACCENT_COLORS,
      }}
    >
      {children}
    </AccentColorContext.Provider>
  );
}

export function useAccentColor() {
  const context = useContext(AccentColorContext);
  if (!context) {
    throw new Error("useAccentColor must be used within an AccentColorProvider");
  }
  return context;
}
