"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, IconProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Shield, TrendingUp, FileText, Star } from "lucide-react";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { useI18n } from "@/components/i18n/I18nProvider";

export function AnimatedNavigation() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { t } = useI18n();
  
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-4xl mx-auto z-[100]", className)}
    >
      <Menu setActive={setActive}>
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
        <div className="flex items-center ml-6">
          <LanguageToggle />
        </div>
      </Menu>
    </div>
  );
}