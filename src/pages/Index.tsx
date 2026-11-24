import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  BookOpen,
  Calculator,
  ChevronRight,
  FileText,
  Shield,
  UsersRound,
} from "lucide-react";
import { ResponsiveNavigation } from "@/components/shared/ResponsiveNavigation";
import { Hero } from "@/components/ui/animated-hero";
import { Link } from "react-router-dom";
import { CALCULATOR_URL, WILL_URL } from "@/lib/trust-enquiry";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <ResponsiveNavigation />

      <Hero />

      <section aria-label="Will and trust options" className="container mx-auto px-4 pb-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Card className="border-forest/15 bg-sand/25 shadow-elegant">
            <CardContent className="flex h-full flex-col p-8">
              <FileText className="h-8 w-8 text-forest" aria-hidden="true" />
              <h2 className="mt-5 font-regular text-2xl font-bold text-forest">Create your will online</h2>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                Continue to the SmartWill online will service to create your will. The service opens in a new tab.
              </p>
              <Button asChild className="mt-6 w-fit bg-forest text-sand hover:bg-forest/90">
                <a href={WILL_URL} target="_blank" rel="noopener noreferrer">
                  Create my will <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-forest bg-forest shadow-elegant">
            <CardContent className="flex h-full flex-col p-8">
              <Shield className="h-8 w-8 text-sand" aria-hidden="true" />
              <h2 className="mt-5 font-regular text-2xl font-bold text-sand">Enquire about a trust</h2>
              <p className="mt-3 flex-1 leading-relaxed text-sand/80">
                Share your details and goals for personal follow-up. The LegacyBuilder team can discuss your trust planning needs and, where appropriate, help you connect with relevant professionals.
              </p>
              <Button asChild className="mt-6 w-fit bg-sand text-forest hover:bg-sand/90">
                <Link to="/trust-enquiry">
                  Enquire about a trust <ChevronRight aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="services" className="container mx-auto scroll-mt-28 px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-regular text-3xl font-bold">Estate planning guidance for your next step</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Practical education and guidance for South African families and business owners, with clear ways to begin.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Card className="bg-card/80">
            <CardContent className="flex h-full flex-col p-7">
              <FileText className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-regular text-2xl font-semibold">Will creation</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                Use the SmartWill online service to create your will and record your wishes.
              </p>
              <a
                href={WILL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline"
              >
                Create my will <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card/80">
            <CardContent className="flex h-full flex-col p-7">
              <Shield className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-regular text-2xl font-semibold">Trust planning</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                Tell us what you would like to explore. We will follow up to discuss your needs and relevant professional support.
              </p>
              <Link to="/trust-enquiry" className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline">
                Enquire about a trust <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>

          <Card id="education" className="scroll-mt-28 bg-card/80">
            <CardContent className="flex h-full flex-col p-7">
              <BookOpen className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-regular text-2xl font-semibold">Estate planning education</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                Learn about the roles of wills and trusts so you can prepare for informed conversations about your family or business.
              </p>
              <a href="#how-it-works" className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline">
                See how it works <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto scroll-mt-28 px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-regular text-3xl font-bold">How it works</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose the path that matches what you want to do today.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Card className="border-forest/15 bg-sand/20">
            <CardContent className="p-7">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Step 1</span>
              <h3 className="mt-3 font-regular text-2xl font-semibold">Choose your path</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Create a will through SmartWill, or submit a trust enquiry for personal follow-up.
              </p>
            </CardContent>
          </Card>
          <Card className="border-forest/15 bg-sand/20">
            <CardContent className="p-7">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Step 2</span>
              <h3 className="mt-3 font-regular text-2xl font-semibold">Take the first practical step</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Complete your will through the online SmartWill service, or share a few brief details about your trust planning goals.
              </p>
            </CardContent>
          </Card>
          <Card className="border-forest/15 bg-sand/20">
            <CardContent className="p-7">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Step 3</span>
              <h3 className="mt-3 font-regular text-2xl font-semibold">Discuss your trust needs</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                For trust enquiries, the LegacyBuilder team will discuss your goals and help connect you with relevant professionals where appropriate.
              </p>
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
              <h2 className="font-regular text-3xl font-bold text-forest">Estate calculator</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                Use the online calculator to explore your current estate planning position and consider your next steps. The calculator opens in a new tab.
              </p>
            </div>
            <Button asChild className="w-fit bg-forest text-sand hover:bg-forest/90">
              <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer">
                Open estate calculator <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-20">
        <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8 text-center md:p-12">
            <UsersRound className="mx-auto mb-5 h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="mb-4 font-regular text-3xl font-bold md:text-4xl">Ready to take the next step?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              Create your will online or tell us what you would like to explore through trust planning.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <a href={WILL_URL} target="_blank" rel="noopener noreferrer">
                  Create my will <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/trust-enquiry">Enquire about a trust</Link>
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
              <p className="mb-4 max-w-md text-muted-foreground">
                Estate planning education and guidance for South African families and business owners.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Estate planning</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a className="hover:text-primary" href={WILL_URL} target="_blank" rel="noopener noreferrer">Will creation</a></li>
                <li><Link className="hover:text-primary" to="/trust-enquiry">Trust enquiry</Link></li>
                <li><a className="hover:text-primary" href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer">Estate calculator</a></li>
                <li><a className="hover:text-primary" href="#how-it-works">How it works</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Contact & information</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a className="hover:text-primary" href="mailto:mylegacy@legacybuilder.co.za">mylegacy@legacybuilder.co.za</a></li>
                <li><Link className="hover:text-primary" to="/trust-enquiry#privacy-information">Privacy information</Link></li>
                <li><a className="hover:text-primary" href="#education">Estate planning education</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2026 LegacyBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
