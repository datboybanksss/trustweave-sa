import { ShieldCheck, BookOpenCheck, CalendarDays, Files } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  { title: "Active Trusts", value: 3, Icon: ShieldCheck },
  { title: "Documents", value: 47, Icon: Files },
  { title: "Consultations", value: 2, Icon: CalendarDays },
  { title: "Learning Progress", value: 68, Icon: BookOpenCheck },
];

export const QuickStats = () => (
  <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {items.map(({ title, value, Icon }) => (
      <Card key={title} className="bg-card/80 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {title === "Learning Progress" ? (
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10 rounded-full" style={{background:`conic-gradient(hsl(var(--success)) ${value*3.6}deg, hsl(var(--muted)) 0)`}}>
                <div className="absolute inset-1 rounded-full bg-card" />
              </div>
              <div className="text-2xl font-bold">{value}%</div>
            </div>
          ) : (
            <div className="text-2xl font-bold">{value.toLocaleString()}</div>
          )}
        </CardContent>
      </Card>
    ))}
  </section>
);
export default QuickStats;
