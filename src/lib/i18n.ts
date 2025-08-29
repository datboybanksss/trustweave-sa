export type LanguageCode = 'en' | 'af' | 'zu' | 'xh' | 'nr' | 'ss' | 'nso' | 'st' | 'tn' | 've' | 'ts';

export interface TranslationData {
  app: {
    brand: string;
  };
  nav: {
    home: string;
    dashboard: string;
    education: string;
    login: string;
    signup: string;
    platform: string;
    solutions: string;
    resources: string;
    consultation: string;
    pricing: string;
  };
  greeting: {
    goodDay: string;
    yourLegacy: string;
  };
  cta: {
    getStarted: string;
    goToDashboard: string;
    startLearning: string;
    createTrust: string;
    uploadDocument: string;
    bookConsultation: string;
  };
  thankyou: {
    partnerMsg: string;
    individualMsg: string;
    trial: string;
  };
  partner: {
    portal: string;
    totalAUM: string;
    allClients: string;
    addNewClient: string;
  };
  individual: {
    netWorth: string;
    assets: string;
    debts: string;
    trusts: string;
    compliance: string;
    totalPortfolio: string;
  };
  actions: {
    createTrust: string;
    uploadDocument: string;
    bookConsultation: string;
    connectBank: string;
    generateReport: string;
    scheduleMeeting: string;
  };
  dashboard: {
    recentActivity: string;
    assetAllocation: string;
    upcomingEvents: string;
    quickStats: string;
  };
  platform: {
    trustBuilder: string;
    trustBuilderDesc: string;
    wealthTracking: string;
    wealthTrackingDesc: string;
    documentVault: string;
    documentVaultDesc: string;
    compliance: string;
    complianceDesc: string;
  };
}

export const LANGUAGES = [
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
  { code: 'af' as const, label: 'Afrikaans', flag: '🇿🇦' },
  { code: 'zu' as const, label: 'isiZulu', flag: '🇿🇦' },
  { code: 'xh' as const, label: 'isiXhosa', flag: '🇿🇦' },
  { code: 'nr' as const, label: 'isiNdebele', flag: '🇿🇦' },
  { code: 'ss' as const, label: 'siSwati', flag: '🇿🇦' },
  { code: 'nso' as const, label: 'Sepedi', flag: '🇿🇦' },
  { code: 'st' as const, label: 'Sesotho', flag: '🇿🇦' },
  { code: 'tn' as const, label: 'Setswana', flag: '🇿🇦' },
  { code: 've' as const, label: 'Tshivenda', flag: '🇿🇦' },
  { code: 'ts' as const, label: 'Xitsonga', flag: '🇿🇦' },
] as const;

// Translation cache
const translationCache = new Map<LanguageCode, TranslationData>();

export async function loadTranslations(lang: LanguageCode): Promise<TranslationData> {
  if (translationCache.has(lang)) {
    return translationCache.get(lang)!;
  }

  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    const translations = await response.json();
    translationCache.set(lang, translations);
    return translations;
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
    // Fallback to English
    if (lang !== 'en') {
      return loadTranslations('en');
    }
    throw error;
  }
}

export function interpolate(template: string, variables: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}