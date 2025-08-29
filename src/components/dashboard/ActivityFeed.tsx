import { useI18n } from "@/components/i18n/I18nProvider";

const items = [
  { t: "Updated beneficiaries for Family Trust", ts: "2h ago" },
  { t: "Uploaded 2024 Tax Returns", ts: "Yesterday" },
  { t: "Completed Estate Planning Course", ts: "2 days ago" },
  { t: "Scheduled consultation with Sarah Mitchell", ts: "3 days ago" },
  { t: "Added business valuation document", ts: "1 week ago" },
];

export const ActivityFeed = () => {
  const { t } = useI18n();
  
  return (
    <section className="rounded-xl border bg-card/80 backdrop-blur p-4">
      <h2 className="font-display text-lg mb-2">{t('dashboard.recentActivity')}</h2>
      <ul className="space-y-2">
        {items.map((i)=> (
          <li key={i.t} className="flex items-center justify-between">
            <span>{i.t}</span>
            <span className="text-xs text-muted-foreground">{i.ts}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default ActivityFeed;
