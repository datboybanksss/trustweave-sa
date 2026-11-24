"use client";
import { useState } from "react";
import { Menu } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/I18nProvider";
import { Link } from "react-router-dom";
import legacyLogo from "@/assets/legacy-builder-logo-transparent.png";
import { CALCULATOR_URL, WILL_URL } from "@/lib/trust-enquiry";
import { LanguageSelector } from "./LanguageSelector";

export function AnimatedNavigation() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [, setActive] = useState<string | null>(null);
  const { t } = useI18n();
  const linkClassName = "whitespace-nowrap text-sm text-foreground transition-colors hover:text-primary";

  return (
    <div className={cn("fixed inset-x-0 top-10 z-[100] mx-auto max-w-5xl", className)}>
      <Menu setActive={setActive}>
        <Link to="/" className="mr-2 flex items-center" aria-label={t("nav.homeAria")} onMouseEnter={() => setActive(null)}>
          <span className="flex items-center rounded-full bg-[#1a2e1f] px-4 py-2">
            <img src={legacyLogo} alt="LegacyBuilder" className="h-6 w-auto" />
          </span>
        </Link>
        <Link to="/" className={linkClassName} onMouseEnter={() => setActive(null)}>{t("nav.home")}</Link>
        <a href={WILL_URL} target="_blank" rel="noopener noreferrer" className={linkClassName} onMouseEnter={() => setActive(null)}>
          {t("nav.willCreation")}
        </a>
        <Link to="/trust-enquiry" className={linkClassName} onMouseEnter={() => setActive(null)}>{t("nav.trustEnquiry")}</Link>
        <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className={linkClassName} onMouseEnter={() => setActive(null)}>
          {t("nav.estateCalculator")}
        </a>
        <a href="/#how-it-works" className={cn(linkClassName, "hidden xl:block")} onMouseEnter={() => setActive(null)}>
          {t("nav.howItWorks")}
        </a>
        <div onMouseEnter={() => setActive(null)}>
          <LanguageSelector />
        </div>
      </Menu>
    </div>
  );
}
