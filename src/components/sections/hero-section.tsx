"use client";

import React, { useState, useEffect } from "react";
import { profileData } from "@/data/profile";

const FULL_CMD = "cat welcome.txt";
const CAT_LENGTH = 3;

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout;

    const startDelay = setTimeout(() => {
      // Check if user prefers reduced motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setDisplayedText(FULL_CMD);
        setIsTypingDone(true);
        setIsOutputVisible(true);
        return;
      }

      const typeNextChar = () => {
        if (index < FULL_CMD.length) {
          index++;
          setDisplayedText(FULL_CMD.slice(0, index));
          const delay = 45 + Math.random() * 30;
          timer = setTimeout(typeNextChar, delay);
        } else {
          setIsTypingDone(true);
          setTimeout(() => {
            setIsOutputVisible(true);
          }, 240);
        }
      };

      typeNextChar();
    }, 180);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timer);
    };
  }, [replayKey]);

  const handleSkip = () => {
    if (!isOutputVisible) {
      setDisplayedText(FULL_CMD);
      setIsTypingDone(true);
      setIsOutputVisible(true);
    }
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDisplayedText("");
    setIsTypingDone(false);
    setIsOutputVisible(false);
    setReplayKey((prev) => prev + 1);
  };

  const catPart = displayedText.slice(0, CAT_LENGTH);
  const filePart = displayedText.length > 4 ? displayedText.slice(4) : "";
  const hasSpace = displayedText.length > 3;

  return (
    <section
      id="hero"
      onClick={handleSkip}
      className="flex flex-col gap-2 cursor-default"
      aria-label="Hero Section"
    >
      {/* Command prompt with live typewriter */}
      <div className="group flex items-baseline flex-wrap gap-0 text-sm font-medium">
        <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
        <span className="text-[var(--terminal-text-dim)]">@</span>
        <span className="text-[var(--terminal-blue)]">portfolio</span>
        <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>

        {/* Live typed command characters */}
        <span className="text-[var(--terminal-text-bright)]">{catPart}</span>
        {hasSpace && <span>&nbsp;</span>}
        {filePart && (
          <span className="text-[var(--terminal-green)]">{filePart}</span>
        )}

        {/* Blinking cursor while typing or executing */}
        {(!isOutputVisible || !isTypingDone) && (
          <span className="terminal-cursor inline-block" aria-hidden="true" />
        )}

        {/* Subtle replay button when finished */}
        {isOutputVisible && (
          <button
            type="button"
            onClick={handleReplay}
            title="Ketik ulang perintah (Replay)"
            aria-label="Ketik ulang perintah cat welcome.txt"
            className="opacity-50 hover:opacity-100 transition-opacity duration-150 ml-2 text-[10px] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-accent)] border border-[var(--terminal-border)] hover:border-[var(--terminal-accent)] px-1.5 py-0.5 rounded flex items-center gap-1 cursor-pointer select-none"
          >
            <span>↻</span>
            <span>replay</span>
          </button>
        )}
      </div>

      {/* Output block (Smoothly reveals when command executes) */}
      <div
        className={`flex flex-col gap-3 pt-1 transition-all duration-500 ${
          isOutputVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <pre className="text-[var(--terminal-accent)] text-[7px] sm:text-[9px] md:text-[10px] leading-[1.1] font-normal overflow-x-auto whitespace-pre">
{` █████╗ ██████╗ ██╗███████╗    ███████╗ █████╗ ██╗███████╗██╗  ██╗ █████╗ ██╗         ███╗   ██╗
██╔══██╗██╔══██╗██║██╔════╝    ██╔════╝██╔══██╗██║██╔════╝██║  ██║██╔══██╗██║         ████╗  ██║
███████║██████╔╝██║█████╗      █████╗  ███████║██║███████╗███████║███████║██║         ██╔██╗ ██║
██╔══██║██╔══██╗██║██╔══╝      ██╔══╝  ██╔══██║██║╚════██║██╔══██║██╔══██║██║         ██║╚██╗██║
██║  ██║██║  ██║██║██║         ██║     ██║  ██║██║███████║██║  ██║██║  ██║███████╗    ██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝         ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═══╝`}
        </pre>

        <div className="text-[13.5px] leading-relaxed text-[var(--terminal-text)]">
          Halo! Saya{" "}
          <span className="text-[var(--terminal-accent)] font-semibold">
            {profileData.name}
          </span>{" "}
          — {profileData.role}.
          <br />
          {profileData.headline}
        </div>

        <div className="text-xs text-[var(--terminal-text-dim)] italic">
          &quot;Write clean code. Build real things.&quot;
        </div>
      </div>
    </section>
  );
}

