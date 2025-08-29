import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { LanguageCode, TranslationData, loadTranslations, interpolate, getNestedValue } from '@/lib/i18n';

interface I18nContextType {
  lang: LanguageCode;
  translations: TranslationData | null;
  setLang: (lang: LanguageCode) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    // Only read from localStorage, no auto-detect
    const saved = localStorage.getItem('lang') as LanguageCode;
    return saved || 'en';
  });
  
  const [translations, setTranslations] = useState<TranslationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setLang = async (newLang: LanguageCode) => {
    setIsLoading(true);
    try {
      const newTranslations = await loadTranslations(newLang);
      setTranslations(newTranslations);
      setLangState(newLang);
      localStorage.setItem('lang', newLang);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    if (!translations) return key;
    
    const value = getNestedValue(translations, key);
    if (value === key) {
      // Key not found, return the key itself
      return key;
    }
    
    return variables ? interpolate(value, variables) : value;
  };

  // Load initial translations
  useEffect(() => {
    const loadInitial = async () => {
      try {
        const initialTranslations = await loadTranslations(lang);
        setTranslations(initialTranslations);
      } catch (error) {
        console.error('Failed to load initial translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitial();
  }, []);

  return (
    <I18nContext.Provider value={{ lang, translations, setLang, t, isLoading }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}