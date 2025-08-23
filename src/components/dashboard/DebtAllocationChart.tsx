import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Home Mortgage", value: 1.2 },
  { name: "Vehicle Finance", value: 0.3 },
  { name: "Credit Cards", value: 0.1 },
];
const colors = ["hsl(var(--destructive))", "hsl(var(--warning))", "hsl(var(--muted))"];

const DebtAllocationChart = () => (
  <section className="rounded-xl border bg-card/80 backdrop-blur p-4">
    <h2 className="font-display text-lg mb-2">Debt Allocation</h2>
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
export default DebtAllocationChart;