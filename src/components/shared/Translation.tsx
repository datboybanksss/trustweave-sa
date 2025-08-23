import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface TranslationProps {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const Translation = ({ children, as: Component = "span", className }: TranslationProps) => {
  const { lang, getTranslation, translateText } = useTranslation();
  const [translatedText, setTranslatedText] = useState(children);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translate = async () => {
      if (lang === "en") {
        setTranslatedText(children);
        return;
      }

      // Check if translation is already cached
      const cached = getTranslation(children);
      if (cached !== children) {
        setTranslatedText(cached);
        return;
      }

      // Translate if not cached
      setIsLoading(true);
      try {
        const translated = await translateText(children, lang);
        setTranslatedText(translated);
      } catch (error) {
        console.error("Translation failed:", error);
        setTranslatedText(children);
      } finally {
        setIsLoading(false);
      }
    };

    translate();
  }, [children, lang, getTranslation, translateText]);

  return (
    <Component className={className}>
      {isLoading ? children : translatedText}
    </Component>
  );
};

// Hook for programmatic translation
export const useT = () => {
  const { lang, getTranslation, translateText } = useTranslation();

  const t = async (text: string): Promise<string> => {
    if (lang === "en") return text;
    
    const cached = getTranslation(text);
    if (cached !== text) return cached;
    
    return await translateText(text, lang);
  };

  const tSync = (text: string): string => {
    if (lang === "en") return text;
    return getTranslation(text);
  };

  return { t, tSync, lang };
};