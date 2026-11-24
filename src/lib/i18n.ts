export type LanguageCode = "en" | "af" | "zu" | "xh" | "nr" | "ss" | "nso" | "st" | "tn" | "ve" | "ts";

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "af", label: "Afrikaans", flag: "🇿🇦" },
  { code: "zu", label: "isiZulu", flag: "🇿🇦" },
  { code: "xh", label: "isiXhosa", flag: "🇿🇦" },
  { code: "nr", label: "isiNdebele", flag: "🇿🇦" },
  { code: "ss", label: "siSwati", flag: "🇿🇦" },
  { code: "nso", label: "Sepedi", flag: "🇿🇦" },
  { code: "st", label: "Sesotho", flag: "🇿🇦" },
  { code: "tn", label: "Setswana", flag: "🇿🇦" },
  { code: "ve", label: "Tshivenda", flag: "🇿🇦" },
  { code: "ts", label: "Xitsonga", flag: "🇿🇦" },
] as const satisfies ReadonlyArray<{ code: LanguageCode; label: string; flag: string }>;

export const LANGUAGE_TAGS: Record<LanguageCode, string> = {
  en: "en",
  af: "af",
  zu: "zu",
  xh: "xh",
  nr: "nr",
  ss: "ss",
  nso: "nso",
  st: "st",
  tn: "tn",
  ve: "ve",
  ts: "ts",
};

export const LANGUAGE_STORAGE_KEY = "lang";

export function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === "string" && LANGUAGES.some((language) => language.code === value);
}

export function readStoredLanguage(storage?: Pick<Storage, "getItem"> | null): LanguageCode {
  try {
    const saved = storage?.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguageCode(saved) ? saved : "en";
  } catch {
    return "en";
  }
}

export function saveStoredLanguage(storage: Pick<Storage, "setItem"> | null | undefined, lang: LanguageCode) {
  try {
    storage?.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // The selected language still works for this session when storage is unavailable.
  }
}

export function interpolate(template: string, variables: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => variables[key]?.toString() ?? match);
}

export function getNestedValue(obj: unknown, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[key];
  }, obj);
  return typeof value === "string" ? value : undefined;
}

// Existing dashboard components continue to have an English fallback while the
// current public journey uses the complete bundled dictionaries above.
export const legacyEnglishTranslations = {
  app: { brand: "LegacyBuilder" },
  nav: {
    home: "Home", dashboard: "Dashboard", education: "Education", login: "Sign in", signup: "Sign up",
    platform: "Platform", solutions: "Solutions", resources: "Resources", consultation: "Consultation", pricing: "Pricing",
  },
  greeting: { goodDay: "Good day, {name}", yourLegacy: "Your legacy at a glance" },
  cta: {
    getStarted: "Get Started", goToDashboard: "Go to Dashboard", startLearning: "Start Learning",
    createTrust: "Create New Trust", uploadDocument: "Upload Document", bookConsultation: "Book Consultation",
  },
  thankyou: {
    partnerMsg: "Your partner account has been created successfully. You can now manage multiple client portfolios.",
    individualMsg: "Your personal account has been created successfully. Start building your legacy today.",
    trial: "Your 7-day free trial has started! You have full access to all features until {date}.",
  },
  partner: { portal: "Partner Portal", totalAUM: "Total AUM", allClients: "All Clients Overview", addNewClient: "Add New Client" },
  individual: { netWorth: "Net Worth", assets: "Total Assets", debts: "Total Debts", trusts: "Active Trusts", compliance: "Compliance", totalPortfolio: "Total portfolio" },
  actions: {
    createTrust: "Create Trust", uploadDocument: "Upload Document", bookConsultation: "Book Consultation",
    connectBank: "Connect Bank", generateReport: "Generate Report", scheduleMeeting: "Schedule Meeting",
  },
  dashboard: { recentActivity: "Recent Activity", assetAllocation: "Asset Allocation", upcomingEvents: "Upcoming Events", quickStats: "Quick Statistics" },
  platform: {
    trustBuilder: "Trust Builder", trustBuilderDesc: "Create and manage family trusts with guided workflows",
    wealthTracking: "Wealth Tracking", wealthTrackingDesc: "Monitor your assets and portfolio performance",
    documentVault: "Document Vault", documentVaultDesc: "Secure storage for all your important documents",
    compliance: "Compliance", complianceDesc: "Stay compliant with regulatory requirements",
  },
} as const;
