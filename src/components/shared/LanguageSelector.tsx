import { create } from "zustand";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Lang = "en" | "af" | "zu" | "xh" | "st" | "tn" | "ts" | "ss" | "ve" | "nr" | "nso";

const useLang = create<{ lang: Lang; setLang: (l: Lang) => void }>((set) => ({
  lang: "en",
  setLang: (l) => set({ lang: l })
}));

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
  const { lang, setLang } = useLang();
  return (
    <Select value={lang} onValueChange={(v)=>setLang(v as Lang)}>
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
  );
};
