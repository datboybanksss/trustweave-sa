import { NavLink } from "react-router-dom";
import legacyLogo from "@/assets/legacy-logo.png";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";

export const Navigation = () => (
  <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <nav className="container mx-auto flex h-16 items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={legacyLogo} alt="Legacy Builder logo - tree with roots" className="h-8 w-8" loading="eager"/>
        <span className="font-display text-lg">Legacy Builder</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <NavLink to="/" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>Home</NavLink>
        <NavLink to="/dashboard" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>Dashboard</NavLink>
        <NavLink to="/trust-builder" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>Trust Builder</NavLink>
        <NavLink to="/education" className="hover:text-primary transition-colors">Education</NavLink>
        <NavLink to="/consultation" className="hover:text-primary transition-colors">Consultation</NavLink>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSelector />
        <Button variant="premium" size="sm" className="hidden md:inline-flex">Get Started</Button>
      </div>
    </nav>
  </header>
);

export default Navigation;
