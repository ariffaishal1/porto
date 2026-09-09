"use client";

import React from "react";
import { useBlackHole } from "@/components/theme/black-hole-context";

export function CollapseLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapseState } = useBlackHole();

  let collapseClass = "";
  if (collapseState === "warning") {
    collapseClass = "black-hole-warning";
  } else if (collapseState === "sucking") {
    collapseClass = "black-hole-sucking";
  } else if (collapseState === "collapsed") {
    collapseClass = "opacity-0 pointer-events-none invisible";
  }

  return (
    <div
      className={`max-w-[960px] w-full mx-auto min-h-screen flex flex-col border-x border-[var(--terminal-border)] shadow-2xl relative z-10 transition-opacity duration-300 ${collapseClass}`}
    >
      {children}
    </div>
  );
}
