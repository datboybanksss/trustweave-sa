import { NavLink } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";
import { CALCULATOR_URL, WILL_URL } from "@/lib/trust-enquiry";

export const PublicNavigation = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/favicon.png" alt="LegacyBuilder" className="h-10 w-10 rounded-lg object-contain" />
          <span className="text-lg font-bold">LegacyBuilder</span>
        </NavLink>

        <div className="hidden items-center gap-5 md:flex">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : "transition-colors hover:text-primary"}>
            Home
          </NavLink>
          <a href={WILL_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
            Will creation
          </a>
          <NavLink to="/trust-enquiry" className={({ isActive }) => isActive ? "text-primary" : "transition-colors hover:text-primary"}>
            Trust enquiry
          </NavLink>
          <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
            Estate calculator
          </a>
          <a href="/#how-it-works" className="hidden transition-colors hover:text-primary lg:block">
            How it works
          </a>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default PublicNavigation;
