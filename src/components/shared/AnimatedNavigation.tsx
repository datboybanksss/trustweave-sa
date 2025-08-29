"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import legacyLogo from "@/assets/legacy-builder-logo.png";

export function AnimatedNavigation() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-4xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Platform">
          <div className="text-sm grid grid-cols-2 gap-6 p-4">
            <ProductItem
              title="Trust Builder"
              href="/trust-builder"
              src="/lovable-uploads/cc72f08d-4a6e-4679-8640-1bd71690917f.png"
              description="Create comprehensive family trusts with legal templates and compliance checks."
            />
            <ProductItem
              title="Wealth Tracking"
              href="/dashboard"
              src="/lovable-uploads/b4acf58a-1d8d-4777-a1f1-120bc08963b2.png"
              description="Real-time portfolio monitoring with professional analytics and growth projections."
            />
            <ProductItem
              title="Document Vault"
              href="/documents"
              src="/lovable-uploads/e348a56f-53ab-4ea7-bb34-5bf685035918.png"
              description="Secure storage with automatic value extraction and crypto verification."
            />
            <ProductItem
              title="Education Academy"
              href="/education"
              src="/lovable-uploads/e5f9ed14-62be-4a1f-87aa-59845dddbf5f.png"
              description="Master wealth planning with comprehensive video modules and certificates."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Solutions">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/individual">Individual Families</HoveredLink>
            <HoveredLink to="/partner">Legal Professionals</HoveredLink>
            <HoveredLink to="/consultation">Wealth Consultation</HoveredLink>
            <HoveredLink to="/crypto">Crypto Verification</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/education">Education Center</HoveredLink>
            <HoveredLink to="/pricing">Pricing Plans</HoveredLink>
            <HoveredLink to="/consultation">Book Consultation</HoveredLink>
            <HoveredLink to="/support">Help & Support</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}