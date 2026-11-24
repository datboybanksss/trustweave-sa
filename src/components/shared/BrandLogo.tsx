import legacyLogo from "@/assets/legacy-builder-logo-transparent.png";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  tone?: "forest" | "sand";
};

export function BrandLogo({ className, tone = "forest" }: BrandLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block w-[150px] shrink-0 sm:w-[160px] xl:w-[180px]",
        tone === "forest" ? "bg-forest" : "bg-sand",
        className,
      )}
      style={{
        aspectRatio: "1533 / 428",
        WebkitMaskImage: `url(${legacyLogo})`,
        maskImage: `url(${legacyLogo})`,
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
