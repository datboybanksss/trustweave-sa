import { create } from "zustand";
import { persist } from "zustand/middleware";

type Lang = "en" | "af" | "zu" | "xh" | "st" | "tn" | "ts" | "ss" | "ve" | "nr" | "nso";

interface TranslationStore {
  lang: Lang;
  apiKey: string;
  translations: Record<string, Record<Lang, string>>;
  isTranslating: boolean;
  setLang: (lang: Lang) => void;
  setApiKey: (key: string) => void;
  translateText: (text: string, targetLang: Lang) => Promise<string>;
  getTranslation: (text: string) => string;
  setTranslating: (status: boolean) => void;
}

const languageCodes: Record<Lang, string> = {
  en: "en",
  af: "af",
  zu: "zu",
  xh: "xh", 
  st: "st",
  tn: "tn", 
  ts: "ts",
  ss: "ss",
  ve: "ve",
  nr: "nr",
  nso: "nso"
};

export const useTranslation = create<TranslationStore>()(
  persist(
    (set, get) => ({
      lang: "en",
      apiKey: "",
      translations: {},
      isTranslating: false,
      
      setLang: (lang: Lang) => set({ lang }),
      setApiKey: (key: string) => set({ apiKey: key }),
      setTranslating: (status: boolean) => set({ isTranslating: status }),
      
      translateText: async (text: string, targetLang: Lang): Promise<string> => {
        const { apiKey, translations } = get();
        
        // Return original text if English or no API key
        if (targetLang === "en" || !apiKey.trim()) {
          return text;
        }

        // Return cached translation if available
        if (translations[text]?.[targetLang]) {
          return translations[text][targetLang];
        }

        try {
          set({ isTranslating: true });
          
          // Using Google Translate API
          const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                q: text,
                target: languageCodes[targetLang],
                source: "en",
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Translation failed");
          }

          const data = await response.json();
          const translatedText = data.data.translations[0].translatedText;

          // Cache the translation
          set((state) => ({
            translations: {
              ...state.translations,
              [text]: {
                ...state.translations[text],
                [targetLang]: translatedText,
              },
            },
          }));

          return translatedText;
        } catch (error) {
          console.error("Translation error:", error);
          return text; // Fallback to original text
        } finally {
          set({ isTranslating: false });
        }
      },

      getTranslation: (text: string): string => {
        const { lang, translations } = get();
        
        if (lang === "en") {
          return text;
        }

        return translations[text]?.[lang] || text;
      },
    }),
    {
      name: "translation-storage",
      partialize: (state) => ({
        lang: state.lang,
        apiKey: state.apiKey,
        translations: state.translations,
      }),
    }
  )
);