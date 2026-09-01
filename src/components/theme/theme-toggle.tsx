"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentTheme = theme || resolvedTheme || "system";

  const cycleTheme = () => {
    if (currentTheme === "dark") setTheme("light");
    else if (currentTheme === "light") setTheme("system");
    else setTheme("dark");
  };

  return (
    <button
      onClick={cycleTheme}
      type="button"
      aria-label="Pengubah Tema"
      title="Ganti tema tampilan"
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950"
    >
      <Sun className="w-4 h-4 text-emerald-600 dark:hidden" />
      <Moon className="hidden w-4 h-4 text-emerald-400 dark:block" />
    </button>
  );
}
