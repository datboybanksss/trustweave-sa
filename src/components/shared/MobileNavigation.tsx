import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { BookOpen, Calculator, FileText, Home, Menu, Shield, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "@/components/i18n/I18nProvider";
import { CALCULATOR_URL, WILL_URL } from "@/lib/trust-enquiry";
import { LanguageSelector } from "./LanguageSelector";
import { BrandLogo } from "./BrandLogo";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const linkClassName = "flex w-full items-center gap-3 rounded-lg p-3 text-left font-medium transition-colors hover:bg-muted/50";

  return (
    <div className="flex items-center justify-between border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        to="/"
        className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={t("nav.homeAria")}
      >
        <BrandLogo />
      </Link>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2" aria-label={t("nav.openMenu")}>
            <Menu className="h-6 w-6" />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="max-h-[90vh]">
          <div className="overflow-y-auto px-4 py-6">
            <div className="mb-8 flex items-center justify-between gap-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={t("nav.homeAria")}
              >
                <BrandLogo />
              </Link>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm" className="p-2" aria-label={t("nav.closeMenu")}>
                  <X className="h-6 w-6" />
                </Button>
              </DrawerClose>
            </div>

            <div className="space-y-6">
              <nav aria-label={t("nav.mobileNavigation")} className="space-y-2">
                <button type="button" onClick={() => handleNavigation("/")} className={linkClassName}>
                  <Home className="h-5 w-5 text-primary" aria-hidden="true" />
                  {t("nav.home")}
                </button>
                <a href={WILL_URL} target="_blank" rel="noopener noreferrer" className={linkClassName} onClick={() => setIsOpen(false)}>
                  <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                  {t("nav.willCreation")}
                </a>
                <button type="button" onClick={() => handleNavigation("/trust-enquiry")} className={linkClassName}>
                  <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
                  {t("nav.trustEnquiry")}
                </button>
                <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className={linkClassName} onClick={() => setIsOpen(false)}>
                  <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
                  {t("nav.estateCalculator")}
                </a>
                <a href="/#how-it-works" className={linkClassName} onClick={() => setIsOpen(false)}>
                  <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                  {t("nav.howItWorks")}
                </a>
              </nav>

              <div className="border-t pt-4">
                <p className="mb-2 px-3 text-sm font-medium text-muted-foreground">{t("nav.language")}</p>
                <LanguageSelector className="h-12 w-full justify-between rounded-lg px-4" />
              </div>

              <div className="border-t pt-6">
                <Button className="h-12 w-full" onClick={() => handleNavigation("/trust-enquiry")}>
                  {t("common.enquireTrust")}
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
