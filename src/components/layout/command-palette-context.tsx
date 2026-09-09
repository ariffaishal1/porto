"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface CommandPaletteContextType {
  isOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
  isMatrixMode: boolean;
  setIsMatrixMode: (active: boolean) => void;
  toggleMatrixMode: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(
  undefined
);

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  const openPalette = useCallback(() => setIsOpen(true), []);
  const closePalette = useCallback(() => setIsOpen(false), []);
  const togglePalette = useCallback(() => setIsOpen((prev) => !prev), []);
  const toggleMatrixMode = useCallback(() => setIsMatrixMode((prev) => !prev), []);

  // Sync documentElement class when matrix mode changes
  useEffect(() => {
    if (isMatrixMode) {
      document.documentElement.classList.add("matrix-mode");
    } else {
      document.documentElement.classList.remove("matrix-mode");
    }
  }, [isMatrixMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePalette();
        return;
      }

      // Check if user is typing in form fields
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      // Open on ` (backtick) when not typing
      if (!isTyping && e.key === "`") {
        e.preventDefault();
        openPalette();
        return;
      }

      // Handle Escape: close palette if open, or turn off matrix mode if palette closed
      if (e.key === "Escape") {
        if (isOpen) {
          e.preventDefault();
          closePalette();
        } else if (isMatrixMode) {
          e.preventDefault();
          setIsMatrixMode(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isMatrixMode, togglePalette, openPalette, closePalette]);

  return (
    <CommandPaletteContext.Provider
      value={{
        isOpen,
        openPalette,
        closePalette,
        togglePalette,
        isMatrixMode,
        setIsMatrixMode,
        toggleMatrixMode,
      }}
    >
      {children}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error(
      "useCommandPalette must be used within a CommandPaletteProvider"
    );
  }
  return context;
}
