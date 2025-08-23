import { Translation } from "./Translation";
import { Card } from "@/components/ui/card";

// Example component showing how to use translations in your dashboard components
export const TranslationExample = () => {
  return (
    <Card className="p-4">
      <Translation as="h2" className="font-display text-lg mb-2">
        Welcome to your Dashboard
      </Translation>
      <Translation as="p" className="text-muted-foreground">
        Here you can manage your wealth, trusts, and financial planning.
      </Translation>
      <div className="mt-4 space-y-2">
        <Translation as="p">Total Assets: R 12.5M</Translation>
        <Translation as="p">Active Trusts: 3</Translation>
        <Translation as="p">Portfolio Growth: +15.2%</Translation>
      </div>
    </Card>
  );
};

// Usage instructions for implementing in your existing components:
/*
1. Wrap any text with <Translation> component:
   <Translation>Your text here</Translation>

2. For headings or specific elements:
   <Translation as="h1" className="text-2xl">Dashboard</Translation>

3. For programmatic translation (in functions):
   import { useT } from "@/components/shared/Translation";
   
   const { t, tSync } = useT();
   
   // Async translation (will fetch if not cached)
   const translatedText = await t("Hello World");
   
   // Sync translation (returns cached or original)
   const quickTranslation = tSync("Hello World");

4. Replace existing text in your components:
   
   Before:
   <h2 className="font-display text-lg mb-2">Recent Activity</h2>
   
   After:
   <Translation as="h2" className="font-display text-lg mb-2">Recent Activity</Translation>
*/