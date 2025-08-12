import { create } from "zustand";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Lang = "en" | "af" | "zu" | "xh";

const useLang = create<{ lang: Lang; setLang: (l: Lang) => void }>((set) => ({
  lang: "en",
  setLang: (l) => set({ lang: l })
}));

export const LanguageSelector = () => {
  const { lang, setLang } = useLang();
  return (
    <Select value={lang} onValueChange={(v)=>setLang(v as Lang)}>
      <SelectTrigger className="w-28">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="af">Afrikaans</SelectItem>
        <SelectItem value="zu">Zulu</SelectItem>
        <SelectItem value="xh">Xhosa</SelectItem>
      </SelectContent>
    </Select>
  );
};
