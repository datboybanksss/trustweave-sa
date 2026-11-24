import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Loader2, Mail, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_METHODS,
  PRIMARY_GOALS,
  TIMEFRAMES,
  WILL_URL,
  trustEnquiryDefaults,
  trustEnquirySchema,
  type TrustEnquiryFormValues,
} from "@/lib/trust-enquiry";
import legacyLogo from "@/assets/legacy-builder-logo-transparent.png";

const PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
  "Outside South Africa",
];

const fieldClassName =
  "mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

function campaignValue(value: string | null) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return /^[A-Za-z0-9_.:-]{1,120}$/.test(trimmed) ? trimmed : undefined;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

export default function TrustEnquiry() {
  const [saved, setSaved] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submissionKey = useRef(crypto.randomUUID());
  const submissionInFlight = useRef(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TrustEnquiryFormValues>({
    resolver: zodResolver(trustEnquirySchema),
    defaultValues: trustEnquiryDefaults,
    shouldFocusError: true,
  });
  const messageLength = watch("message")?.length ?? 0;

  const onSubmit = async (values: TrustEnquiryFormValues) => {
    if (submissionInFlight.current) return;
    submissionInFlight.current = true;
    setSubmitError("");

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const { data, error } = await supabase.functions.invoke("submit-trust-enquiry", {
        body: {
          ...values,
          submissionKey: submissionKey.current,
          sourcePage: window.location.pathname === "/trust-builder" ? "/trust-builder" : "/trust-enquiry",
          utmSource: campaignValue(searchParams.get("utm_source")),
          utmMedium: campaignValue(searchParams.get("utm_medium")),
          utmCampaign: campaignValue(searchParams.get("utm_campaign")),
        },
      });

      if (error || !data?.success) {
        throw new Error("The enquiry could not be saved.");
      }

      setSaved(true);
      reset(trustEnquiryDefaults);
      submissionKey.current = crypto.randomUUID();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError(
        "We could not send your enquiry right now. Your details are still in the form; please try again or email mylegacy@legacybuilder.co.za.",
      );
    } finally {
      submissionInFlight.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-forest/10 bg-sand/35">
        <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
          <Link to="/" aria-label="LegacyBuilder home" className="inline-flex rounded-full bg-forest px-4 py-2">
            <img src={legacyLogo} alt="LegacyBuilder" className="h-7 w-auto" />
          </Link>
          <Button asChild variant="ghost" className="gap-2 text-forest hover:bg-sand hover:text-forest">
            <Link to="/">
              <ArrowLeft aria-hidden="true" /> Back home
            </Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="border-b border-forest/10 bg-sand/20">
          <div className="container mx-auto max-w-3xl px-4 py-12 text-center md:py-16">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-sand">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="font-regular text-4xl tracking-tight text-forest md:text-5xl">Let’s plan your trust</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Tell us what you would like to arrange. Leave your details and the LegacyBuilder team will contact you to discuss a suitable trust and the next steps.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-3xl px-4 py-10 md:py-14" aria-label="Trust enquiry form">
          {saved ? (
            <Card className="border-forest/20 bg-sand/20" role="status" aria-live="polite">
              <CardContent className="p-8 text-center md:p-12">
                <CheckCircle2 className="mx-auto h-14 w-14 text-forest" aria-hidden="true" />
                <h2 className="mt-6 font-regular text-3xl text-forest">Enquiry received</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Thank you, your enquiry has been received. The LegacyBuilder team will contact you using your preferred method.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild className="bg-forest text-sand hover:bg-forest/90">
                    <a href={WILL_URL} target="_blank" rel="noopener noreferrer">
                      Create my will <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-forest/30 text-forest hover:bg-sand hover:text-forest">
                    <Link to="/">Return home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-forest/15 shadow-elegant">
              <CardContent className="p-5 sm:p-8 md:p-10">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="font-medium">Full name <span className="text-destructive" aria-hidden="true">*</span></label>
                      <Input
                        id="fullName"
                        autoComplete="name"
                        className="mt-2 h-11"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        {...register("fullName")}
                      />
                      <FieldError id="fullName-error" message={errors.fullName?.message} />
                    </div>

                    <div>
                      <label htmlFor="email" className="font-medium">Email address <span className="text-destructive" aria-hidden="true">*</span></label>
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        className="mt-2 h-11"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                      />
                      <FieldError id="email-error" message={errors.email?.message} />
                    </div>

                    <div>
                      <label htmlFor="phone" className="font-medium">Phone number <span className="text-destructive" aria-hidden="true">*</span></label>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="e.g. +27 82 123 4567"
                        className="mt-2 h-11"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        {...register("phone")}
                      />
                      <FieldError id="phone-error" message={errors.phone?.message} />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="primaryGoal" className="font-medium">What is your primary goal? <span className="text-destructive" aria-hidden="true">*</span></label>
                      <select
                        id="primaryGoal"
                        className={fieldClassName}
                        aria-invalid={Boolean(errors.primaryGoal)}
                        aria-describedby={errors.primaryGoal ? "primaryGoal-error" : undefined}
                        {...register("primaryGoal")}
                      >
                        <option value="">Choose one</option>
                        {PRIMARY_GOALS.map((goal) => <option key={goal.value} value={goal.value}>{goal.label}</option>)}
                      </select>
                      <FieldError id="primaryGoal-error" message={errors.primaryGoal?.message} />
                    </div>

                    <fieldset className="sm:col-span-2" aria-describedby={errors.preferredContact ? "preferredContact-error" : undefined}>
                      <legend className="font-medium">Preferred contact method <span className="text-destructive" aria-hidden="true">*</span></legend>
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {CONTACT_METHODS.map((method) => (
                          <label key={method.value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-input px-4 py-3 transition-colors hover:bg-sand/30">
                            <input type="radio" value={method.value} className="h-4 w-4 accent-forest" {...register("preferredContact")} />
                            <span>{method.label}</span>
                          </label>
                        ))}
                      </div>
                      <FieldError id="preferredContact-error" message={errors.preferredContact?.message} />
                    </fieldset>

                    <div>
                      <label htmlFor="province" className="font-medium">Province <span className="font-normal text-muted-foreground">(optional)</span></label>
                      <select id="province" className={fieldClassName} {...register("province")}>
                        <option value="">Choose a province</option>
                        {PROVINCES.map((province) => <option key={province} value={province}>{province}</option>)}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="intendedTimeframe" className="font-medium">Intended timeframe <span className="font-normal text-muted-foreground">(optional)</span></label>
                      <select id="intendedTimeframe" className={fieldClassName} {...register("intendedTimeframe")}>
                        <option value="">Choose a timeframe</option>
                        {TIMEFRAMES.map((timeframe) => <option key={timeframe.value} value={timeframe.value}>{timeframe.label}</option>)}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-end justify-between gap-4">
                        <label htmlFor="message" className="font-medium">Anything else we should know? <span className="font-normal text-muted-foreground">(optional)</span></label>
                        <span className="text-xs text-muted-foreground" aria-live="polite">{messageLength}/2000</span>
                      </div>
                      <Textarea
                        id="message"
                        rows={5}
                        maxLength={2000}
                        className="mt-2"
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby="message-guidance message-error"
                        {...register("message")}
                      />
                      <p id="message-guidance" className="mt-2 text-sm text-muted-foreground">
                        Please do not include ID numbers, banking details, passwords, or documents in this form.
                      </p>
                      <FieldError id="message-error" message={errors.message?.message} />
                    </div>
                  </div>

                  <div className="mt-7 rounded-lg bg-sand/35 p-4 text-sm leading-relaxed text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Your privacy:</strong> LegacyBuilder will use these details only to respond to your enquiry and arrange the contact you requested. Read the <a href="#privacy-information" className="font-medium text-forest underline underline-offset-4">privacy information below</a> or email <a href="mailto:mylegacy@legacybuilder.co.za" className="font-medium text-forest underline underline-offset-4">mylegacy@legacybuilder.co.za</a>.
                    </p>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                      <input
                        id="consent"
                        type="checkbox"
                        className="mt-0.5 h-5 w-5 shrink-0 accent-forest"
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        {...register("consent")}
                      />
                      <span>I agree that LegacyBuilder may use these details to contact me about my enquiry. <span className="text-destructive" aria-hidden="true">*</span></span>
                    </label>
                    <FieldError id="consent-error" message={errors.consent?.message} />
                  </div>

                  <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                  </div>

                  <div aria-live="polite" aria-atomic="true">
                    {submitError && <p role="alert" className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{submitError}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="mt-8 w-full bg-forest text-sand hover:bg-forest/90"
                  >
                    {isSubmitting ? <><Loader2 className="animate-spin" aria-hidden="true" /> Sending your enquiry…</> : "Send my enquiry"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </section>

        <section id="privacy-information" className="border-t border-forest/10 bg-sand/20 scroll-mt-8" aria-labelledby="privacy-heading">
          <div className="container mx-auto max-w-3xl px-4 py-10 md:py-12">
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-6 w-6 shrink-0 text-forest" aria-hidden="true" />
              <div>
                <h2 id="privacy-heading" className="font-regular text-2xl text-forest">Privacy information</h2>
                <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
                  <p>We collect the details you enter so the LegacyBuilder team can understand and respond to your trust enquiry using your preferred contact method.</p>
                  <p>Please share only what is relevant. Do not send ID numbers, banking details, passwords, or documents through this form.</p>
                  <p>To ask about, correct, or request deletion of the information in your enquiry, contact <a href="mailto:mylegacy@legacybuilder.co.za" className="font-medium text-forest underline underline-offset-4">mylegacy@legacybuilder.co.za</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
