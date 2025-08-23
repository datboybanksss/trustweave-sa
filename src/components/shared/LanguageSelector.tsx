import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ApiKeyModal } from "./ApiKeyModal";

type Lang = "en" | "af" | "zu" | "xh" | "st" | "tn" | "ts" | "ss" | "ve" | "nr" | "nso";

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
  { code: 'xh', name: 'isiXhosa', flag: '🇿🇦' },
  { code: 'st', name: 'Sesotho', flag: '🇿🇦' },
  { code: 'tn', name: 'Setswana', flag: '🇿🇦' },
  { code: 'ts', name: 'Xitsonga', flag: '🇿🇦' },
  { code: 'ss', name: 'siSwati', flag: '🇿🇦' },
  { code: 've', name: 'Tshivenda', flag: '🇿🇦' },
  { code: 'nr', name: 'isiNdebele', flag: '🇿🇦' },
  { code: 'nso', name: 'Sepedi', flag: '🇿🇦' }
] as const;

export const LanguageSelector = () => {
  const { lang, setLang, apiKey } = useTranslation();
  const [showApiModal, setShowApiModal] = useState(false);

  const handleLanguageChange = (newLang: Lang) => {
    if (newLang !== "en" && !apiKey.trim()) {
      setShowApiModal(true);
      return;
    }
    setLang(newLang);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Select value={lang} onValueChange={(v) => handleLanguageChange(v as Lang)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map(language => (
              <SelectItem key={language.code} value={language.code}>
                <span className="flex items-center gap-2">
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {lang !== "en" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiModal(true)}
            className="p-2 h-8 w-8"
            title="Translation Settings"
          >
            <Settings className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <ApiKeyModal 
        open={showApiModal} 
        onOpenChange={setShowApiModal} 
      />
    </>
  );
};
