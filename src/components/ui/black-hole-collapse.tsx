"use client";

import React from "react";
import { useBlackHole } from "@/components/theme/black-hole-context";
import { AsciiBlackHole } from "@/components/ui/ascii-black-hole";
import { AlertTriangle, Sparkles, RefreshCw } from "lucide-react";

export function BlackHoleCollapseOverlay() {
  const { collapseState, rebootUniverse, isBigBanging, countdown } =
    useBlackHole();

  return (
    <>
      {/* ── PHASE 1: ALARM & WARNING HUD ── */}
      {collapseState === "warning" && (
        <div
          role="alert"
          className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex flex-col items-center p-3 animate-in fade-in duration-150"
        >
          <div className="bg-[#ef4444] text-black font-mono font-bold px-4 py-2.5 rounded-md shadow-[0_0_30px_rgba(239,68,68,0.8)] flex items-center gap-3 border-2 border-white animate-bounce text-xs sm:text-sm text-center">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-spin" />
            <span>
              🚨 PERINGATAN KRITIS: SINGULARITAS TERDETEKSI! SELURUH WEB AKAN
              DISEDOT DALAM {countdown}s...
            </span>
            <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-spin" />
          </div>
        </div>
      )}

      {/* ── PHASE 3: TOTAL SINGULARITY (ONLY BLACK HOLE REMAINS IN VOID) ── */}
      {collapseState === "collapsed" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none animate-in fade-in duration-700"
        >
          {/* Subtle cosmic vignette & gravitational lens ring */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.12)_0%,rgba(0,0,0,1)_70%)] pointer-events-none" />

          {/* Centered hyper-spinning ASCII Black Hole in the void */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-w-2xl w-full text-center">
            <div className="scale-105 sm:scale-125 transition-transform duration-500">
              <AsciiBlackHole
                isHyperSpin
                className="drop-shadow-[0_0_35px_rgba(239,68,68,0.85)]"
              />
            </div>

            {/* Cosmic singularity terminal status */}
            <div className="flex flex-col gap-2 font-mono text-xs sm:text-sm bg-neutral-950/80 border border-red-500/40 p-4 sm:p-5 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.2)] max-w-lg backdrop-blur-md">
              <div className="text-red-400 font-bold tracking-wider flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>TITIK SINGULARITAS TERCAPAI</span>
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>

              <p className="text-neutral-300 leading-relaxed text-[11px] sm:text-xs">
                Selamat! Anda baru saja memicu keruntuhan gravitasi ekstrem.
                Seluruh halaman, proyek, teks, dan kode web telah tersedot ke
                dalam singularitas massa tak hingga.
              </p>

              <div className="text-[10px] text-neutral-500 border-t border-neutral-800 pt-2 flex justify-between items-center">
                <span>Massa: ∞ kg</span>
                <span>Radius: 0 m</span>
                <span>Waktu: t = 0</span>
              </div>
            </div>

            {/* Big Bang Reboot Button */}
            <button
              onClick={rebootUniverse}
              type="button"
              className="mt-2 group inline-flex items-center gap-2.5 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 hover:from-red-500 hover:to-emerald-400 text-black font-mono font-extrabold px-6 py-3 rounded-full text-xs sm:text-sm shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span>BIG BANG: REBOOT UNIVERSE</span>
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>

            <span className="text-[11px] font-mono text-neutral-400 select-none">
              Tekan <kbd className="text-white bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">ESC</kbd> atau klik tombol di atas untuk membangkitkan kembali semesta web.
            </span>
          </div>
        </div>
      )}

      {/* ── PHASE 4: BIG BANG BURST FLASH ── */}
      {isBigBanging && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 bg-white big-bang-burst pointer-events-none"
        />
      )}
    </>
  );
}
