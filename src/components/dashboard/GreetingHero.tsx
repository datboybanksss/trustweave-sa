import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCountUp } from "@/hooks/useCountUp";
import { DateRangePicker } from "@/components/shared/DateRangePicker";

export const GreetingHero = () => {
  const portfolio = useCountUp(12500000, 1200);
  return (
    <section className="relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur shadow-lg p-6">
      <div className="absolute inset-0 -z-10 opacity-20" style={{background:"var(--gradient-primary)"}} />
      <h1 className="font-display text-2xl mb-1">Good day, Jonathan van der Merwe</h1>
      <p className="text-muted-foreground mb-4">Your legacy at a glance</p>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="text-3xl font-semibold">R {portfolio.toLocaleString()}</div>
        <span className="text-sm text-muted-foreground">Total portfolio</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="hero" onClick={()=>toast({title:"Create New Trust", description:"Wizard opening..."})}>Create New Trust</Button>
        <Button variant="outline" onClick={()=>toast({title:"Upload Document"})}>Upload Document</Button>
        <DateRangePicker />
      </div>
    </section>
  );
};
export default GreetingHero;
