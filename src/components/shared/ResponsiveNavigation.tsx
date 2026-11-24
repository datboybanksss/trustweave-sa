import { AnimatedNavigation } from "./AnimatedNavigation";
import { MobileNavigation } from "./MobileNavigation";

export function ResponsiveNavigation() {
  return (
    <>
      <div className="xl:hidden">
        <MobileNavigation />
      </div>
      <div className="hidden xl:block">
        <AnimatedNavigation />
      </div>
    </>
  );
}
