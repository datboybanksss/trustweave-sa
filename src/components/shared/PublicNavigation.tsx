import { NavLink } from "react-router-dom";
import legacyLogo from "@/assets/legacy-builder-logo.png";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";

export const PublicNavigation = () => (
  <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <nav className="container mx-auto flex h-16 items-center justify-between">
      <div className="flex items-center">
        <img src={legacyLogo} alt="Legacy Builder logo - tree with roots" className="h-10 w-auto" loading="eager"/>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <NavLink to="/" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>Home</NavLink>
        <NavLink to="/pricing" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>Pricing</NavLink>
        <NavLink to="/consultation" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>Consultation</NavLink>
        <NavLink to="/education" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>Education</NavLink>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSelector />
        <Button variant="premium" size="sm" className="hidden md:inline-flex" onClick={() => window.location.href = '/signup'}>
          Get Started
        </Button>
      </div>
    </nav>
  </header>
);

export default PublicNavigation;