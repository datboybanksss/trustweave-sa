"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, IconProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Shield, TrendingUp, FileText, Star } from "lucide-react";

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
      className={cn("fixed top-10 inset-x-0 max-w-4xl mx-auto z-[100]", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Platform">
          <div className="text-sm flex flex-col space-y-2 p-4 min-w-[300px]">
            <IconProductItem
              title="Trust Builder"
              href="/trust-builder"
              Icon={Shield}
              description="Create comprehensive family trusts with legal templates and compliance checks."
            />
            <IconProductItem
              title="Wealth Tracking"
              href="/dashboard"
              Icon={TrendingUp}
              description="Real-time portfolio monitoring with professional analytics and growth projections."
            />
            <IconProductItem
              title="Document Vault"
              href="/documents"
              Icon={FileText}
              description="Secure storage with automatic value extraction and crypto verification."
            />
            <IconProductItem
              title="Education Academy"
              href="/education"
              Icon={Star}
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