"use client";

import dynamic from "next/dynamic";

/**
 * Lazy-loaded overlay components that are not needed on initial page load.
 * - TerminalCommandPalette (~36KB): Only shown when user presses ⌘K
 * - BlackHoleCollapseOverlay (~5KB): Only shown during easter egg animation
 * - MatrixRain (~4KB): Only shown when "matrix mode" is toggled
 *
 * Using next/dynamic with ssr:false keeps these out of the initial JS bundle
 * and prevents server-side rendering for these purely client-interactive components.
 */

const TerminalCommandPalette = dynamic(
  () =>
    import("@/components/ui/terminal-command-palette").then(
      (mod) => mod.TerminalCommandPalette
    ),
  { ssr: false }
);

const BlackHoleCollapseOverlay = dynamic(
  () =>
    import("@/components/ui/black-hole-collapse").then(
      (mod) => mod.BlackHoleCollapseOverlay
    ),
  { ssr: false }
);

const MatrixRain = dynamic(
  () =>
    import("@/components/ui/matrix-rain").then((mod) => mod.MatrixRain),
  { ssr: false }
);

export function LazyOverlays() {
  return (
    <>
      <MatrixRain />
      <BlackHoleCollapseOverlay />
      <TerminalCommandPalette />
    </>
  );
}
