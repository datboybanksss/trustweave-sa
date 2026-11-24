import { NavLink } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";
import { CALCULATOR_URL, WILL_URL } from "@/lib/trust-enquiry";
import { useI18n } from "@/components/i18n/I18nProvider";

export const Navigation = () => {
  const { t } = useI18n();
  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <NavLink to="/" className="flex items-center gap-2" aria-label={t("nav.homeAria")}>
          <img src="/favicon.png" alt="LegacyBuilder" className="h-10 w-10 rounded-lg object-contain" />
          <span className="text-lg font-bold">LegacyBuilder</span>
        </NavLink>
        <div className="hidden items-center gap-5 md:flex">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : "transition-colors hover:text-primary"}>{t("nav.home")}</NavLink>
          <a href={WILL_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">{t("nav.willCreation")}</a>
          <NavLink to="/trust-enquiry" className={({ isActive }) => isActive ? "text-primary" : "transition-colors hover:text-primary"}>{t("nav.trustEnquiry")}</NavLink>
          <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">{t("nav.estateCalculator")}</a>
          <a href="/#how-it-works" className="hidden transition-colors hover:text-primary lg:block">{t("nav.howItWorks")}</a>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
