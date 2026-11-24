import { useEffect, useRef, useState } from "react";
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
  PROVINCES,
  TIMEFRAMES,
  WILL_URL,
  trustEnquiryDefaults,
  trustEnquirySchema,
  type TrustEnquiryFormValues,
} from "@/lib/trust-enquiry";
import legacyLogo from "@/assets/legacy-builder-logo-transparent.png";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { usePublicPageTitle } from "@/hooks/usePublicPageTitle";

const fieldClassName = "mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

const validationKeys: Record<string, string> = {
  "Please enter your full name.": "validation.fullNameRequired",
  "Please use 120 characters or fewer.": "validation.fullNameMax",
  "Please enter a valid email address.": "validation.emailInvalid",
  "Please use 254 characters or fewer.": "validation.emailMax",
  "Please use 40 characters or fewer.": "validation.phoneMax",
  "Use digits, spaces, and an optional international + prefix.": "validation.phoneCharacters",
  "Enter a valid phone number with 7 to 15 digits.": "validation.phoneDigits",
  "Please choose your primary goal.": "validation.primaryGoalRequired",
  "Please choose how you would like us to contact you.": "validation.contactRequired",
  "Please use 100 characters or fewer.": "validation.provinceMax",
  "Please use 2,000 characters or fewer.": "validation.messageMax",
  "Please agree so that LegacyBuilder can respond to your enquiry.": "validation.consentRequired",
  "Please choose a valid timeframe.": "validation.timeframeInvalid",
};

function campaignValue(value: string | null) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return /^[A-Za-z0-9_.:-]{1,120}$/.test(trimmed) ? trimmed : undefined;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  const { t } = useI18n();
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {t(validationKeys[message] ?? "validation.generic")}
    </p>
  );
}

type SubmissionErrorKey = "status.genericError" | "status.networkError" | "status.rateLimitError";

export default function TrustEnquiry() {
  const [saved, setSaved] = useState(false);
  const [submitErrorKey, setSubmitErrorKey] = useState<SubmissionErrorKey | null>(null);
  const submissionKey = useRef(crypto.randomUUID());
  const submissionInFlight = useRef(false);
  const { lang, t } = useI18n();
  usePublicPageTitle("meta.trustTitle");
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

  useEffect(() => {
    if (window.location.hash !== "#privacy-information") return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("privacy-information")?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const onSubmit = async (values: TrustEnquiryFormValues) => {
    if (submissionInFlight.current) return;
    submissionInFlight.current = true;
    setSubmitErrorKey(null);

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const { data, error } = await supabase.functions.invoke("submit-trust-enquiry", {
        body: {
          ...values,
          preferredLanguage: lang,
          submissionKey: submissionKey.current,
          sourcePage: window.location.pathname === "/trust-builder" ? "/trust-builder" : "/trust-enquiry",
          utmSource: campaignValue(searchParams.get("utm_source")),
          utmMedium: campaignValue(searchParams.get("utm_medium")),
          utmCampaign: campaignValue(searchParams.get("utm_campaign")),
        },
      });

      if (error) {
        const status = (error as { context?: { status?: number } }).context?.status;
        setSubmitErrorKey(status === 429 ? "status.rateLimitError" : status ? "status.genericError" : "status.networkError");
        return;
      }
      if (!data?.success) {
        setSubmitErrorKey("status.genericError");
        return;
      }

      setSaved(true);
      reset(trustEnquiryDefaults);
      submissionKey.current = crypto.randomUUID();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitErrorKey("status.networkError");
    } finally {
      submissionInFlight.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-forest/10 bg-sand/35">
        <div className="container mx-auto flex min-h-20 flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" aria-label={t("nav.homeAria")} className="inline-flex rounded-full bg-forest px-4 py-2">
            <img src={legacyLogo} alt="LegacyBuilder" className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSelector className="px-3" />
            <Button asChild variant="ghost" className="h-10 gap-2 px-3 text-forest hover:bg-sand hover:text-forest">
              <Link to="/" aria-label={t("nav.backHome")}>
                <ArrowLeft aria-hidden="true" /> <span className="hidden sm:inline">{t("nav.backHome")}</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-forest/10 bg-sand/20">
          <div className="container mx-auto max-w-3xl px-4 py-12 text-center md:py-16">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-sand">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="font-regular text-4xl tracking-tight text-forest md:text-5xl">{t("form.title")}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("form.intro")}</p>
          </div>
        </section>

        <section className="container mx-auto max-w-3xl px-4 py-10 md:py-14" aria-label={t("form.sectionAria")}>
          {saved ? (
            <Card className="border-forest/20 bg-sand/20" role="status" aria-live="polite">
              <CardContent className="p-8 text-center md:p-12">
                <CheckCircle2 className="mx-auto h-14 w-14 text-forest" aria-hidden="true" />
                <h2 className="mt-6 font-regular text-3xl text-forest">{t("status.successTitle")}</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("status.successBody")}</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild className="bg-forest text-sand hover:bg-forest/90">
                    <a href={WILL_URL} target="_blank" rel="noopener noreferrer">
                      {t("common.createMyWill")} <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-forest/30 text-forest hover:bg-sand hover:text-forest">
                    <Link to="/">{t("common.returnHome")}</Link>
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
                      <label htmlFor="fullName" className="font-medium">{t("form.fullName")} <span className="text-destructive" aria-hidden="true">*</span></label>
                      <Input id="fullName" autoComplete="name" className="mt-2 h-11" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} {...register("fullName")} />
                      <FieldError id="fullName-error" message={errors.fullName?.message} />
                    </div>
                    <div>
                      <label htmlFor="email" className="font-medium">{t("form.email")} <span className="text-destructive" aria-hidden="true">*</span></label>
                      <Input id="email" type="email" inputMode="email" autoComplete="email" className="mt-2 h-11" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
                      <FieldError id="email-error" message={errors.email?.message} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="font-medium">{t("form.phone")} <span className="text-destructive" aria-hidden="true">*</span></label>
                      <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={t("form.phonePlaceholder")} className="mt-2 h-11" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
                      <FieldError id="phone-error" message={errors.phone?.message} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="primaryGoal" className="font-medium">{t("form.primaryGoal")} <span className="text-destructive" aria-hidden="true">*</span></label>
                      <select id="primaryGoal" className={fieldClassName} aria-invalid={Boolean(errors.primaryGoal)} aria-describedby={errors.primaryGoal ? "primaryGoal-error" : undefined} {...register("primaryGoal")}>
                        <option value="">{t("form.chooseOne")}</option>
                        {PRIMARY_GOALS.map((goal) => <option key={goal.value} value={goal.value}>{t(goal.translationKey)}</option>)}
                      </select>
                      <FieldError id="primaryGoal-error" message={errors.primaryGoal?.message} />
                    </div>
                    <fieldset className="sm:col-span-2" aria-describedby={errors.preferredContact ? "preferredContact-error" : undefined}>
                      <legend className="font-medium">{t("form.preferredContact")} <span className="text-destructive" aria-hidden="true">*</span></legend>
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {CONTACT_METHODS.map((method) => (
                          <label key={method.value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-input px-4 py-3 transition-colors hover:bg-sand/30">
                            <input type="radio" value={method.value} className="h-4 w-4 accent-forest" {...register("preferredContact")} />
                            <span>{t(method.translationKey)}</span>
                          </label>
                        ))}
                      </div>
                      <FieldError id="preferredContact-error" message={errors.preferredContact?.message} />
                    </fieldset>
                    <div>
                      <label htmlFor="province" className="font-medium">{t("form.province")} <span className="font-normal text-muted-foreground">{t("common.optional")}</span></label>
                      <select id="province" className={fieldClassName} {...register("province")}>
                        <option value="">{t("form.chooseProvince")}</option>
                        {PROVINCES.map((province) => <option key={province.value} value={province.value}>{t(province.translationKey)}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="intendedTimeframe" className="font-medium">{t("form.intendedTimeframe")} <span className="font-normal text-muted-foreground">{t("common.optional")}</span></label>
                      <select id="intendedTimeframe" className={fieldClassName} {...register("intendedTimeframe")}>
                        <option value="">{t("form.chooseTimeframe")}</option>
                        {TIMEFRAMES.map((timeframe) => <option key={timeframe.value} value={timeframe.value}>{t(timeframe.translationKey)}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex items-end justify-between gap-4">
                        <label htmlFor="message" className="font-medium">{t("form.message")} <span className="font-normal text-muted-foreground">{t("common.optional")}</span></label>
                        <span className="shrink-0 text-xs text-muted-foreground" aria-live="polite">{t("form.messageCounter", { count: messageLength, max: 2000 })}</span>
                      </div>
                      <Textarea id="message" rows={5} maxLength={2000} className="mt-2" aria-invalid={Boolean(errors.message)} aria-describedby="message-guidance message-error" {...register("message")} />
                      <p id="message-guidance" className="mt-2 text-sm text-muted-foreground">{t("form.messageGuidance")}</p>
                      <FieldError id="message-error" message={errors.message?.message} />
                    </div>
                  </div>

                  <div className="mt-7 rounded-lg bg-sand/35 p-4 text-sm leading-relaxed text-muted-foreground">
                    <p>
                      <strong className="text-foreground">{t("form.privacyPrefix")}</strong> {t("form.privacyBody")}{" "}
                      <a href="#privacy-information" className="font-medium text-forest underline underline-offset-4">{t("form.privacyLink")}</a> {t("form.privacyOrEmail")}{" "}
                      <a href="mailto:mylegacy@legacybuilder.co.za" className="break-all font-medium text-forest underline underline-offset-4">mylegacy@legacybuilder.co.za</a>.
                    </p>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                      <input id="consent" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-forest" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} {...register("consent")} />
                      <span>{t("form.consent")} <span className="text-destructive" aria-hidden="true">*</span></span>
                    </label>
                    <FieldError id="consent-error" message={errors.consent?.message} />
                  </div>

                  <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">{t("form.website")}</label>
                    <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                  </div>

                  <div aria-live="polite" aria-atomic="true">
                    {submitErrorKey && <p role="alert" className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{t(submitErrorKey)}</p>}
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} className="mt-8 w-full bg-forest text-sand hover:bg-forest/90">
                    {isSubmitting ? <><Loader2 className="animate-spin" aria-hidden="true" /> {t("form.sending")}</> : t("form.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </section>

        <section id="privacy-information" className="scroll-mt-8 border-t border-forest/10 bg-sand/20" aria-labelledby="privacy-heading">
          <div className="container mx-auto max-w-3xl px-4 py-10 md:py-12">
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-6 w-6 shrink-0 text-forest" aria-hidden="true" />
              <div>
                <h2 id="privacy-heading" className="font-regular text-2xl text-forest">{t("privacy.heading")}</h2>
                <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
                  <p>{t("privacy.body1")}</p>
                  <p>{t("privacy.body2")}</p>
                  <p>{t("privacy.body3")} <a href="mailto:mylegacy@legacybuilder.co.za" className="break-all font-medium text-forest underline underline-offset-4">mylegacy@legacybuilder.co.za</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
