import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { BookOpen, Calculator, FileText, Globe, Home, Menu, Shield, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LANGUAGES } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import legacyLogo from "@/assets/legacy-builder-logo-transparent.png";
import { CALCULATOR_URL, WILL_URL } from "@/lib/trust-enquiry";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const navigate = useNavigate();
  const { lang, setLang } = useI18n();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLanguageChange = (languageCode: (typeof LANGUAGES)[number]["code"]) => {
    setLang(languageCode);
    setShowLanguages(false);
  };

  const currentLanguage = LANGUAGES.find((language) => language.code === lang);
  const linkClassName = "flex w-full items-center gap-3 rounded-lg p-3 text-left font-medium transition-colors hover:bg-muted/50";

  return (
    <div className="flex items-center justify-between border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <button type="button" className="flex items-center" onClick={() => handleNavigation("/")} aria-label="LegacyBuilder home">
        <span className="flex items-center rounded-full bg-[#1a2e1f] px-3 py-1.5">
          <img src={legacyLogo} alt="LegacyBuilder" className="h-6 w-auto" />
        </span>
      </button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DrawerTrigger>

        <DrawerContent className="max-h-[90vh]">
          <div className="overflow-y-auto px-4 py-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="flex items-center rounded-full bg-[#1a2e1f] px-3 py-1.5">
                <img src={legacyLogo} alt="LegacyBuilder" className="h-6 w-auto" />
              </span>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </DrawerClose>
            </div>

            {!showLanguages ? (
              <div className="space-y-6">
                <nav aria-label="Mobile navigation" className="space-y-2">
                  <button type="button" onClick={() => handleNavigation("/")} className={linkClassName}>
                    <Home className="h-5 w-5 text-primary" aria-hidden="true" />
                    Home
                  </button>
                  <a href={WILL_URL} target="_blank" rel="noopener noreferrer" className={linkClassName} onClick={() => setIsOpen(false)}>
                    <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                    Will creation
                  </a>
                  <button type="button" onClick={() => handleNavigation("/trust-enquiry")} className={linkClassName}>
                    <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
                    Trust enquiry
                  </button>
                  <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className={linkClassName} onClick={() => setIsOpen(false)}>
                    <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
                    Estate calculator
                  </a>
                  <a href="/#how-it-works" className={linkClassName} onClick={() => setIsOpen(false)}>
                    <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                    How it works
                  </a>
                </nav>

                <div className="border-t pt-4">
                  <button
                    type="button"
                    onClick={() => setShowLanguages(true)}
                    className="flex w-full items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
                  >
                    <span className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="font-medium">Language</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{currentLanguage?.flag}</span>
                      <span className="text-sm text-muted-foreground">{currentLanguage?.label}</span>
                    </span>
                  </button>
                </div>

                <div className="border-t pt-6">
                  <Button className="h-12 w-full" onClick={() => handleNavigation("/trust-enquiry")}>
                    Enquire about a trust
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <button type="button" onClick={() => setShowLanguages(false)} className="rounded-lg p-2 hover:bg-muted" aria-label="Back to navigation">
                    <X className="h-5 w-5" />
                  </button>
                  <h2 className="text-lg font-semibold">Select Language</h2>
                </div>

                <div className="space-y-2">
                  {LANGUAGES.map((language) => (
                    <button
                      type="button"
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg p-4 text-left transition-colors",
                        lang === language.code ? "bg-muted font-medium text-primary" : "hover:bg-muted/50",
                      )}
                    >
                      <span className="text-2xl">{language.flag}</span>
                      <span className="font-medium">{language.label}</span>
                      {lang === language.code && <span className="ml-auto text-primary">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
