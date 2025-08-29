import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatedNavigation } from "./AnimatedNavigation";
import { MobileNavigation } from "./MobileNavigation";

export function ResponsiveNavigation() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? <MobileNavigation /> : <AnimatedNavigation />}
    </>
  );
}