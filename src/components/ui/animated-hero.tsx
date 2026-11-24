import { MoveRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WILL_URL } from "@/lib/trust-enquiry";
import { useI18n } from "@/components/i18n/I18nProvider";

function Hero() {
  const { t } = useI18n();
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-8 lg:py-24">
          <div className="flex flex-col gap-4 px-2">
            <h1 className="max-w-3xl text-center font-regular text-5xl tracking-tighter md:text-7xl">
              <span className="block text-foreground">{t("hero.titleToday")}</span>
              <span className="block font-semibold text-primary md:pb-4 md:pt-1">{t("hero.titleLegacy")}</span>
            </h1>
            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">{t("hero.subtitle")}</p>
          </div>
          <div className="flex w-full flex-col gap-3 px-4 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="w-full gap-4 sm:w-auto" variant="hero">
              <Link to="/trust-enquiry">
                {t("common.enquireTrust")} <ShieldCheck className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full gap-4 sm:w-auto">
              <a href={WILL_URL} target="_blank" rel="noopener noreferrer">
                {t("common.createMyWill")} <MoveRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
