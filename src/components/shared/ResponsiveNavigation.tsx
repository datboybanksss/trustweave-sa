import { AnimatedNavigation } from "./AnimatedNavigation";
import { MobileNavigation } from "./MobileNavigation";

export function ResponsiveNavigation() {
  return (
    <>
      <div className="lg:hidden">
        <MobileNavigation />
      </div>
      <div className="hidden lg:block">
        <AnimatedNavigation />
      </div>
    </>
  );
}
