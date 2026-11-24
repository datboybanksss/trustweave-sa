"use client";
import { useState } from "react";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LANGUAGES } from "@/lib/i18n";
import { Link } from "react-router-dom";
import legacyLogo from "@/assets/legacy-builder-logo-transparent.png";
import { CALCULATOR_URL, WILL_URL } from "@/lib/trust-enquiry";

export function AnimatedNavigation() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { lang, setLang } = useI18n();
  const linkClassName = "whitespace-nowrap text-sm text-foreground transition-colors hover:text-primary";

  return (
    <div className={cn("fixed inset-x-0 top-10 z-[100] mx-auto max-w-5xl", className)}>
      <Menu setActive={setActive}>
        <Link to="/" className="mr-2 flex items-center" aria-label="LegacyBuilder home">
          <span className="flex items-center rounded-full bg-[#1a2e1f] px-4 py-2">
            <img src={legacyLogo} alt="LegacyBuilder" className="h-6 w-auto" />
          </span>
        </Link>
        <Link to="/" className={linkClassName} onMouseEnter={() => setActive(null)}>Home</Link>
        <a href={WILL_URL} target="_blank" rel="noopener noreferrer" className={linkClassName} onMouseEnter={() => setActive(null)}>
          Will creation
        </a>
        <Link to="/trust-enquiry" className={linkClassName} onMouseEnter={() => setActive(null)}>Trust enquiry</Link>
        <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className={linkClassName} onMouseEnter={() => setActive(null)}>
          Estate calculator
        </a>
        <a href="/#how-it-works" className={cn(linkClassName, "hidden lg:block")} onMouseEnter={() => setActive(null)}>
          How it works
        </a>
        <MenuItem setActive={setActive} active={active} item="Language">
          <div className="min-w-[180px] p-2 text-sm">
            <div className="mb-2 flex items-center gap-2 border-b border-muted px-3 py-2">
              <Globe className="h-4 w-4" />
              <span className="font-medium">Select Language</span>
            </div>
            <div className="flex flex-col space-y-2">
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  onClick={() => setLang(language.code)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted/50",
                    lang === language.code && "bg-muted font-medium text-primary",
                  )}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.label}</span>
                  {lang === language.code && <span className="ml-auto text-xs text-primary">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
