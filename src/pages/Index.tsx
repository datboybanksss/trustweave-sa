import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, BookOpen, Calculator, ChevronRight, FileText, Shield, UsersRound } from "lucide-react";
import { ResponsiveNavigation } from "@/components/shared/ResponsiveNavigation";
import { Hero } from "@/components/ui/animated-hero";
import { Link } from "react-router-dom";
import { CALCULATOR_URL, WILL_URL } from "@/lib/trust-enquiry";
import { useI18n } from "@/components/i18n/I18nProvider";
import { usePublicPageTitle } from "@/hooks/usePublicPageTitle";

const Index = () => {
  const { t } = useI18n();
  usePublicPageTitle("meta.homeTitle");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <ResponsiveNavigation />
      <Hero />

      <section className="container mx-auto px-4 pb-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Card className="border-forest/15 bg-sand/25 shadow-elegant">
            <CardContent className="flex h-full flex-col p-8">
              <FileText className="h-8 w-8 text-forest" aria-hidden="true" />
              <h2 className="mt-5 font-regular text-2xl font-bold text-forest">{t("paths.willTitle")}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{t("paths.willBody")}</p>
              <Button asChild className="mt-6 w-fit bg-forest text-sand hover:bg-forest/90">
                <a href={WILL_URL} target="_blank" rel="noopener noreferrer">
                  {t("common.createMyWill")} <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-forest bg-forest shadow-elegant">
            <CardContent className="flex h-full flex-col p-8">
              <Shield className="h-8 w-8 text-sand" aria-hidden="true" />
              <h2 className="mt-5 font-regular text-2xl font-bold text-sand">{t("paths.trustTitle")}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-sand/80">{t("paths.trustBody")}</p>
              <Button asChild className="mt-6 w-fit bg-sand text-forest hover:bg-sand/90">
                <Link to="/trust-enquiry">
                  {t("common.enquireTrust")} <ChevronRight aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="services" className="container mx-auto scroll-mt-28 px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-regular text-3xl font-bold">{t("services.heading")}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{t("services.intro")}</p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Card className="bg-card/80">
            <CardContent className="flex h-full flex-col p-7">
              <FileText className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-regular text-2xl font-semibold">{t("services.willTitle")}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{t("services.willBody")}</p>
              <a href={WILL_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline">
                {t("common.createMyWill")} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </CardContent>
          </Card>
          <Card className="bg-card/80">
            <CardContent className="flex h-full flex-col p-7">
              <Shield className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-regular text-2xl font-semibold">{t("services.trustTitle")}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{t("services.trustBody")}</p>
              <Link to="/trust-enquiry" className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline">
                {t("common.enquireTrust")} <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
          <Card id="education" className="scroll-mt-28 bg-card/80">
            <CardContent className="flex h-full flex-col p-7">
              <BookOpen className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-regular text-2xl font-semibold">{t("services.educationTitle")}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{t("services.educationBody")}</p>
              <a href="#how-it-works" className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline">
                {t("services.educationLink")} <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto scroll-mt-28 px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-regular text-3xl font-bold">{t("how.heading")}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{t("how.intro")}</p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Card className="border-forest/15 bg-sand/20">
            <CardContent className="p-7">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t("how.step1")}</span>
              <h3 className="mt-3 font-regular text-2xl font-semibold">{t("how.step1Title")}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t("how.step1Body")}</p>
            </CardContent>
          </Card>
          <Card className="border-forest/15 bg-sand/20">
            <CardContent className="p-7">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t("how.step2")}</span>
              <h3 className="mt-3 font-regular text-2xl font-semibold">{t("how.step2Title")}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t("how.step2Body")}</p>
            </CardContent>
          </Card>
          <Card className="border-forest/15 bg-sand/20">
            <CardContent className="p-7">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t("how.step3")}</span>
              <h3 className="mt-3 font-regular text-2xl font-semibold">{t("how.step3Title")}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t("how.step3Body")}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="estate-calculator" className="container mx-auto scroll-mt-28 px-4 py-20">
        <Card className="mx-auto max-w-5xl overflow-hidden border-forest/15 bg-sand/25 shadow-elegant">
          <CardContent className="flex flex-col gap-7 p-8 md:flex-row md:items-center md:p-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest text-sand">
              <Calculator className="h-7 w-7" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 className="font-regular text-3xl font-bold text-forest">{t("calculator.title")}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{t("calculator.body")}</p>
            </div>
            <Button asChild className="w-fit bg-forest text-sand hover:bg-forest/90">
              <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer">
                {t("calculator.cta")} <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-20">
        <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8 text-center md:p-12">
            <UsersRound className="mx-auto mb-5 h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="mb-4 font-regular text-3xl font-bold md:text-4xl">{t("closing.title")}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">{t("closing.body")}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <a href={WILL_URL} target="_blank" rel="noopener noreferrer">
                  {t("common.createMyWill")} <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/trust-enquiry">{t("common.enquireTrust")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="md:col-span-2">
              <p className="mb-3 font-regular text-xl font-semibold text-forest">LegacyBuilder</p>
              <p className="mb-4 max-w-md text-muted-foreground">{t("footer.description")}</p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">{t("footer.estatePlanning")}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a className="hover:text-primary" href={WILL_URL} target="_blank" rel="noopener noreferrer">{t("nav.willCreation")}</a></li>
                <li><Link className="hover:text-primary" to="/trust-enquiry">{t("nav.trustEnquiry")}</Link></li>
                <li><a className="hover:text-primary" href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer">{t("nav.estateCalculator")}</a></li>
                <li><a className="hover:text-primary" href="#how-it-works">{t("nav.howItWorks")}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">{t("footer.contactInfo")}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a className="break-all hover:text-primary" href="mailto:mylegacy@legacybuilder.co.za">mylegacy@legacybuilder.co.za</a></li>
                <li><Link className="hover:text-primary" to="/trust-enquiry#privacy-information">{t("footer.privacy")}</Link></li>
                <li><a className="hover:text-primary" href="#education">{t("footer.education")}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
            <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
