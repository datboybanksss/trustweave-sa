import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCountUp } from "@/hooks/useCountUp";
import { DateRangePicker } from "@/components/shared/DateRangePicker";
import { useI18n } from "@/components/i18n/I18nProvider";

export const GreetingHero = () => {
  const portfolio = useCountUp(12500000, 1200);
  const { t } = useI18n();
  const name = "Jonathan van der Merwe"; // This would come from user data
  
  return (
    <section className="relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur shadow-lg p-6">
      <div className="absolute inset-0 -z-10 opacity-20" style={{background:"var(--gradient-primary)"}} />
      <h1 className="font-display text-2xl mb-1">{t('greeting.goodDay', { name })}</h1>
      <p className="text-muted-foreground mb-4">{t('greeting.yourLegacy')}</p>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="text-3xl font-semibold">R {portfolio.toLocaleString()}</div>
        <span className="text-sm text-muted-foreground">{t('individual.totalPortfolio')}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="hero" onClick={()=>toast({title:t('cta.createTrust'), description:"Wizard opening..."})}>{t('cta.createTrust')}</Button>
        <Button variant="outline" onClick={()=>toast({title:t('cta.uploadDocument')})}>{t('cta.uploadDocument')}</Button>
        <DateRangePicker />
      </div>
    </section>
  );
};
export default GreetingHero;
