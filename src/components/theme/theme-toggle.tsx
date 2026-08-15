"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // React 19 pattern to safely detect client hydration without cascading useEffect setState
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
    );
  }

  const currentTheme = theme || resolvedTheme || "system";

  const cycleTheme = () => {
    if (currentTheme === "dark") setTheme("light");
    else if (currentTheme === "light") setTheme("system");
    else setTheme("dark");
  };

  const getThemeTitle = () => {
    if (theme === "system") {
      return `Tema: Sistem (${resolvedTheme === "dark" ? "Gelap" : "Terang"})`;
    }
    return `Tema: ${theme === "dark" ? "Gelap" : "Terang"}`;
  };

  return (
    <button
      onClick={cycleTheme}
      type="button"
      aria-label="Pengubah Tema"
      title={getThemeTitle()}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      {theme === "dark" && <Moon className="w-4 h-4 text-emerald-400" />}
      {theme === "light" && <Sun className="w-4 h-4 text-amber-500" />}
      {theme === "system" && <Laptop className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />}
    </button>
  );
}
