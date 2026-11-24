import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  LANGUAGE_TAGS,
  getNestedValue,
  interpolate,
  isLanguageCode,
  legacyEnglishTranslations,
  readStoredLanguage,
  saveStoredLanguage,
  type LanguageCode,
} from "@/lib/i18n";
import { publicDictionaries, publicEnglish, type PublicDictionary, type PublicTranslationKey } from "@/lib/public-translations";

interface I18nContextType {
  lang: LanguageCode;
  translations: PublicDictionary;
  setLang: (lang: LanguageCode) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function initialLanguage(): LanguageCode {
  try {
    return readStoredLanguage(window.localStorage);
  } catch {
    return "en";
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(initialLanguage);

  const setLang = useCallback((newLang: LanguageCode) => {
    if (!isLanguageCode(newLang)) return;
    setLangState(newLang);
    try {
      saveStoredLanguage(window.localStorage, newLang);
    } catch {
      // The in-memory choice still applies when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = LANGUAGE_TAGS[lang];
  }, [lang]);

  const t = useCallback((key: string, variables?: Record<string, string | number>): string => {
    let value: string | undefined;
    if (key in publicEnglish) {
      const publicKey = key as PublicTranslationKey;
      value = publicDictionaries[lang][publicKey] || publicEnglish[publicKey];
    } else {
      // Safe compatibility for legacy dashboard keys, never used as a public placeholder.
      value = getNestedValue(legacyEnglishTranslations, key);
    }
    if (!value) return key;
    return variables ? interpolate(value, variables) : value;
  }, [lang]);

  const value = useMemo<I18nContextType>(() => ({
    lang,
    translations: publicDictionaries[lang],
    setLang,
    t,
    isLoading: false,
  }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within an I18nProvider");
  return context;
}
