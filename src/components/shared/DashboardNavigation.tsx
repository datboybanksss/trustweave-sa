import { NavLink } from "react-router-dom";
import legacyLogo from "@/assets/legacy-builder-logo.png";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User, CreditCard, LogOut, ChevronDown } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { getUserType, getGreetingName, getUserData } from "@/lib/userSession";

export const DashboardNavigation = () => {
  const userType = getUserType() || 'individual';
  const userData = getUserData();
  const userName = userData?.fullName || 'User';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={legacyLogo} alt="Legacy Vault logo - tree with roots" className="h-10 w-auto" loading="eager"/>
          <span className="font-display text-xl font-bold text-primary">Legacy Vault 🌳</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/dashboard" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>
            Dashboard
          </NavLink>
          <NavLink to="/documents" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>
            Documents
          </NavLink>
          <NavLink to="/trusts" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>
            Trusts
          </NavLink>
          <NavLink to="/education" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>
            Education
          </NavLink>
          {userType === 'partner' && (
            <NavLink to="/clients" className={({isActive})=>isActive?"text-primary": "hover:text-primary transition-colors"}>
              Clients
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">3</Badge>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm">{userName}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/billing'}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavigation;