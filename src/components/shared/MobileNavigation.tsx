import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X, Globe, Shield, TrendingUp, FileText, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LANGUAGES } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import legacyLogo from "@/assets/legacy-builder-logo.png";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const navigate = useNavigate();
  const { t, lang, setLang } = useI18n();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLanguageChange = (languageCode: any) => {
    setLang(languageCode);
    setShowLanguages(false);
  };

  const platformItems = [
    { title: "Trust Builder", href: "/trust-builder", icon: Shield },
    { title: "Wealth Tracking", href: "/wealth", icon: TrendingUp },
    { title: "Document Vault", href: "/documents", icon: FileText },
    { title: "Education Academy", href: "/education", icon: Star },
  ];

  const solutionItems = [
    { title: "For Individuals", href: "/individuals" },
    { title: "For Families", href: "/families" },
    { title: "For Legal Professionals", href: "/partner" },
    { title: "For Financial Advisors", href: "/advisors" },
  ];

  const resourceItems = [
    { title: "Knowledge Base", href: "/knowledge" },
    { title: "Documentation", href: "/docs" },
    { title: "Blog & Insights", href: "/blog" },
    { title: "Help & Support", href: "/support" },
  ];

  const currentLanguage = LANGUAGES.find(l => l.code === lang);

  return (
    <div className="flex items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      {/* Logo */}
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => handleNavigation('/')}
      >
        <img src={legacyLogo} alt="Legacy Builder" className="h-8 w-auto" />
      </div>

      {/* Mobile Menu */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DrawerTrigger>
        
        <DrawerContent className="max-h-[90vh]">
          <div className="px-4 py-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <img src={legacyLogo} alt="Legacy Builder" className="h-8 w-auto" />
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <X className="h-6 w-6" />
                </Button>
              </DrawerClose>
            </div>

            {/* Navigation Content */}
            <div className="space-y-6">
              {!showLanguages ? (
                <>
                  {/* Platform Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 px-2">{t('nav.platform')}</h3>
                    <div className="space-y-2">
                      {platformItems.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleNavigation(item.href)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        >
                          <item.icon className="h-5 w-5 text-primary" />
                          <span className="font-medium">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Solutions Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 px-2">{t('nav.solutions')}</h3>
                    <div className="space-y-2">
                      {solutionItems.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleNavigation(item.href)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        >
                          <Users className="h-5 w-5 text-primary" />
                          <span className="font-medium">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resources Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 px-2">{t('nav.resources')}</h3>
                    <div className="space-y-2">
                      {resourceItems.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleNavigation(item.href)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        >
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div>
                    <button
                      onClick={() => setShowLanguages(true)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-primary" />
                        <span className="font-medium">Language</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{currentLanguage?.flag}</span>
                        <span className="text-sm text-muted-foreground">{currentLanguage?.label}</span>
                      </div>
                    </button>
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-6 space-y-3 border-t">
                    <Button 
                      className="w-full h-12" 
                      onClick={() => handleNavigation('/signup')}
                    >
                      Start Free Trial
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-12"
                      onClick={() => handleNavigation('/consultation')}
                    >
                      Book Consultation
                    </Button>
                  </div>
                </>
              ) : (
                /* Language Selection View */
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={() => setShowLanguages(false)}
                      className="p-2 hover:bg-muted rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <h3 className="font-semibold text-lg">Select Language</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {LANGUAGES.map(language => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={cn(
                          "w-full flex items-center gap-3 p-4 rounded-lg transition-colors text-left",
                          lang === language.code 
                            ? "bg-muted text-primary font-medium" 
                            : "hover:bg-muted/50"
                        )}
                      >
                        <span className="text-2xl">{language.flag}</span>
                        <span className="font-medium">{language.label}</span>
                        {lang === language.code && (
                          <span className="ml-auto text-primary">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}