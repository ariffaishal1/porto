"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";
import { dictionaries, type Language, type Dictionary } from "@/lib/i18n/dictionaries";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio_lang";
const LANG_CHANGE_EVENT = "portfolio-lang-change";

let currentMemoryLanguage: Language = "id";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener(LANG_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_CHANGE_EVENT, callback);
  };
}

function getSnapshot(): Language {
  if (typeof window === "undefined") return "id";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "id" || saved === "en") {
      return saved;
    }
  } catch {
    // Ignore localStorage access errors
  }
  return currentMemoryLanguage;
}

function getServerSnapshot(): Language {
  return "id";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    currentMemoryLanguage = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "id" ? "en" : "id");
  }, [language, setLanguage]);

  // Dictionary for current active language
  const t = dictionaries[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
