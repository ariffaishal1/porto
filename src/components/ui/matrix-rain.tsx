"use client";

import React, { useEffect, useRef } from "react";
import { useCommandPalette } from "@/components/layout/command-palette-context";
import { X } from "lucide-react";

const MATRIX_CHARS =
  "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEF:・.\"=*+-<>¦｜010101";

export function MatrixRain() {
  const { isMatrixMode, toggleMatrixMode } = useCommandPalette();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isMatrixMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 16;
    const columns = Math.ceil(width / fontSize);
    // Initialize drops with scattered starting positions
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -50)
    );

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initial background fill
    ctx.fillStyle = "#020703";
    ctx.fillRect(0, 0, width, height);

    let lastTime = 0;
    const fps = 32;
    const interval = 1000 / fps;

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      // Semi-transparent fade layer to create cascading rain trails
      ctx.fillStyle = "rgba(2, 7, 3, 0.07)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char =
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Randomly highlight head character with glowing white-green
        const isHead = Math.random() > 0.88;
        if (isHead) {
          ctx.fillStyle = "#e8ffe8";
          ctx.shadowColor = "#00ff66";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = Math.random() > 0.5 ? "#00ff66" : "#00dd55";
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        // Reset drop when it reaches bottom with random delay
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMatrixMode]);

  if (!isMatrixMode) return null;

  return (
    <>
      {/* Full-screen running Matrix digital rain canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-30 pointer-events-none opacity-45 mix-blend-screen transition-opacity duration-500"
      />

      {/* Floating Exit Badge */}
      <div className="fixed top-3 sm:top-4 right-3 sm:right-4 z-50 pointer-events-auto animate-in fade-in duration-300">
        <button
          onClick={toggleMatrixMode}
          className="flex items-center gap-2 bg-[#031407]/90 hover:bg-[#07240c] text-[#00ff66] border border-[#00ff66]/50 hover:border-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.35)] px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer backdrop-blur-md group"
          title="Matikan Mode Matrix (Tekan ESC)"
        >
          <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
          <span className="font-bold tracking-wider">MATRIX ACTIVE</span>
          <X className="w-3.5 h-3.5 text-[#00ff66] group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>
    </>
  );
}
