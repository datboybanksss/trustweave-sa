import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LANGUAGES, type LanguageCode } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const LanguageSelector = ({ className }: { className?: string }) => {
  const { lang, setLang, t } = useI18n();
  const currentLanguage = LANGUAGES.find((language) => language.code === lang) ?? LANGUAGES[0];

  const selectLanguage = (code: LanguageCode) => {
    if (code !== lang) setLang(code);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-10 max-w-full items-center justify-center gap-2 rounded-full border border-forest/20 bg-background px-3 text-sm font-medium text-foreground shadow-sm outline-none transition-colors hover:bg-sand/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        aria-label={`${t("nav.languageSelector")}: ${currentLanguage.label}`}
      >
        <Globe className="h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
        <span className="max-w-28 truncate">{currentLanguage.label}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        collisionPadding={8}
        className="z-[140] max-h-[min(26rem,calc(100dvh-1rem))] w-[min(18rem,calc(100vw-1rem))] overflow-y-auto overscroll-contain border-forest/20 bg-background p-1.5 text-foreground opacity-100 shadow-elegant"
        aria-label={t("nav.selectLanguage")}
      >
        <DropdownMenuLabel className="px-3 py-2 text-forest">{t("nav.selectLanguage")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((language) => {
          const selected = language.code === lang;
          return (
            <DropdownMenuItem
              key={language.code}
              onSelect={() => selectLanguage(language.code)}
              aria-current={selected ? "true" : undefined}
              className={cn(
                "flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 text-foreground focus:bg-sand/50 focus:text-foreground",
                selected && "bg-sand/60 font-semibold text-forest",
              )}
            >
              <span lang={language.code}>{language.label}</span>
              {selected && <Check className="h-4 w-4 shrink-0 text-forest" aria-hidden="true" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
