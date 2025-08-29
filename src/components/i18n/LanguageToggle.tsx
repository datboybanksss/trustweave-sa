import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from './I18nProvider';
import { LANGUAGES } from '@/lib/i18n';

export function LanguageToggle() {
  const { lang, setLang, isLoading } = useI18n();

  return (
    <Select value={lang} onValueChange={setLang} disabled={isLoading}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map(language => (
          <SelectItem key={language.code} value={language.code}>
            <span className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}