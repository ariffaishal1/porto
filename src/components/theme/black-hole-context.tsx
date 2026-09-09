"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export type CollapseState = "idle" | "warning" | "sucking" | "collapsed";

interface BlackHoleContextType {
  collapseState: CollapseState;
  triggerCollapse: () => void;
  rebootUniverse: () => void;
  isBigBanging: boolean;
  countdown: number;
}

const BlackHoleContext = createContext<BlackHoleContextType | undefined>(
  undefined
);

export function BlackHoleProvider({ children }: { children: React.ReactNode }) {
  const [collapseState, setCollapseState] = useState<CollapseState>("idle");
  const [isBigBanging, setIsBigBanging] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const triggerCollapse = useCallback(() => {
    if (collapseState !== "idle") return;

    // Trigger device vibration on supported mobile devices for intense panic/surprise
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([100, 50, 150, 50, 200, 50, 300, 50, 400]);
      } catch {}
    }

    // Step 1: Warning & Violent Screen Earthquake
    setCollapseState("warning");
    setCountdown(3);

    const timer1 = setTimeout(() => {
      setCountdown(2);
    }, 500);

    const timer2 = setTimeout(() => {
      setCountdown(1);
    }, 1000);

    // Step 2: Gravitational Vortex Implosion (Sucking entire web into singularity)
    const suckTimer = setTimeout(() => {
      setCollapseState("sucking");
    }, 1500);

    // Step 3: Total Singularity - only ASCII black hole remains in deep space void
    const collapseTimer = setTimeout(() => {
      setCollapseState("collapsed");
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(suckTimer);
      clearTimeout(collapseTimer);
    };
  }, [collapseState]);

  const rebootUniverse = useCallback(() => {
    setIsBigBanging(true);
    setCollapseState("idle");

    // Big Bang cosmic expansion flash
    setTimeout(() => {
      setIsBigBanging(false);
    }, 900);
  }, []);

  // Listen to Escape key to reboot universe when collapsed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && collapseState === "collapsed") {
        e.preventDefault();
        rebootUniverse();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [collapseState, rebootUniverse]);

  return (
    <BlackHoleContext.Provider
      value={{
        collapseState,
        triggerCollapse,
        rebootUniverse,
        isBigBanging,
        countdown,
      }}
    >
      {children}
    </BlackHoleContext.Provider>
  );
}

export function useBlackHole() {
  const context = useContext(BlackHoleContext);
  if (!context) {
    throw new Error("useBlackHole must be used within a BlackHoleProvider");
  }
  return context;
}
