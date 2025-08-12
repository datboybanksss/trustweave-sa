import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { m: "Jan", v: 11.2 }, { m: "Feb", v: 11.6 }, { m: "Mar", v: 12.1 },
  { m: "Apr", v: 12.0 }, { m: "May", v: 12.3 }, { m: "Jun", v: 12.5 },
];

const WealthGrowthChart = () => (
  <section className="rounded-xl border bg-card/80 backdrop-blur p-4">
    <h2 className="font-display text-lg mb-2">Wealth Growth</h2>
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v)=>`R ${v}m`} />
          <Tooltip formatter={(v:number)=>`R ${v}m`} />
          <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);
export default WealthGrowthChart;
