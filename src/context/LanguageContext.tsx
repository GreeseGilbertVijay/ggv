import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import en from "../lang/en.json";
import ta from "../lang/ta.json";

const STORAGE_KEY = "ggv-language";

type Language = "en" | "ta";

type Translations = Record<string, unknown>;

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === "en" || stored === "ta") return stored;
  return "en";
}

const translationsByLanguage: Record<Language, Translations> = {
  en,
  ta,
};

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (!acc || typeof acc !== "object") return undefined;
    const rec = acc as Record<string, unknown>;
    return rec[key];
  }, obj);
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => setLanguageState(lang), []);

  const t = useCallback(
    (key: string) => {
      const value = getByPath(translationsByLanguage[language], key);
      return typeof value === "string" ? value : key;
    },
    [language]
  );

  const tArray = useCallback(
    (key: string) => {
      const value = getByPath(translationsByLanguage[language], key);
      if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
        return value as string[];
      }
      return [];
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
