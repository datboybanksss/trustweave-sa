import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useI18n } from "@/components/i18n/I18nProvider";

const data = [
  { name: "Family Trust", value: 8.5 },
  { name: "Business Trust", value: 3.2 },
  { name: "Education Trust", value: 0.8 },
];
const colors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--success))"];

const AssetAllocationChart = () => {
  const { t } = useI18n();
  
  return (
    <section className="rounded-xl border bg-card/80 backdrop-blur p-4">
      <h2 className="font-display text-lg mb-2">{t('dashboard.assetAllocation')}</h2>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
              {data.map((_, i) => (<Cell key={i} fill={colors[i % colors.length]} />))}
            </Pie>
            <Tooltip formatter={(v:number)=>`R ${v}m`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
export default AssetAllocationChart;
