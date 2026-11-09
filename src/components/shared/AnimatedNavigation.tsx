"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, IconProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Shield, TrendingUp, FileText, Star, Globe } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LANGUAGES } from "@/lib/i18n";
import { Link } from "react-router-dom";
import legacyLogo from "@/assets/legacy-builder-logo-transparent.png";

export function AnimatedNavigation() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { t, lang, setLang } = useI18n();
  
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-4xl mx-auto z-[100]", className)}
    >
      <Menu setActive={setActive}>
        <Link to="/" className="flex items-center mr-2" aria-label="Legacy Builder home">
          <span className="flex items-center rounded-full bg-[#1a2e1f] px-4 py-2">
            <img src={legacyLogo} alt="Legacy Builder" className="h-6 w-auto" />
          </span>
        </Link>
        <MenuItem setActive={setActive} active={active} item={t('nav.platform')}>
          <div className="text-sm grid grid-cols-2 gap-6 p-4">
            <IconProductItem
              title={t('platform.trustBuilder')}
              href="/trust-builder"
              Icon={Shield}
              description={t('platform.trustBuilderDesc')}
            />
            <IconProductItem
              title={t('platform.wealthTracking')}
              href="/dashboard"
              Icon={TrendingUp}
              description={t('platform.wealthTrackingDesc')}
            />
            <IconProductItem
              title={t('platform.documentVault')}
              href="/documents"
              Icon={FileText}
              description={t('platform.documentVaultDesc')}
            />
            <IconProductItem
              title="Education Academy"
              href="/education"
              Icon={Star}
              description="Master wealth planning with comprehensive video modules and certificates."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item={t('nav.solutions')}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/individual">Individual Families</HoveredLink>
            <HoveredLink to="/partner">Legal Professionals</HoveredLink>
            <HoveredLink to="/consultation">Wealth Consultation</HoveredLink>
            <HoveredLink to="/crypto">Crypto Verification</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item={t('nav.resources')}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/education">{t('nav.education')}</HoveredLink>
            <HoveredLink to="/pricing">{t('nav.pricing')}</HoveredLink>
            <HoveredLink to="/consultation">{t('nav.consultation')}</HoveredLink>
            <HoveredLink to="/support">Help & Support</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Language">
          <div className="flex flex-col space-y-2 text-sm p-2 min-w-[180px]">
            <div className="flex items-center gap-2 px-3 py-2 mb-2 border-b border-muted">
              <Globe className="h-4 w-4" />
              <span className="font-medium">Select Language</span>
            </div>
            {LANGUAGES.map(language => (
              <button
                key={language.code}
                onClick={() => setLang(language.code)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-muted/50 transition-colors",
                  lang === language.code && "bg-muted text-primary font-medium"
                )}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.label}</span>
                {lang === language.code && (
                  <span className="ml-auto text-xs text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}