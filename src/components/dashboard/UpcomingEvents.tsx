import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const events = [
  { title: "Tax Planning Masterclass", time: Date.now() + 1000*60*60*24, cta: "Register" },
  { title: "Trust Review Meeting", time: Date.now() + 1000*60*60*48, cta: "Details" },
  { title: "ID Expiry Warning", time: Date.now() + 1000*60*60*24*30, cta: "Renew" },
];

const fmt = (ms:number)=>{
  const s = Math.max(0, Math.floor(ms/1000));
  const d = Math.floor(s/86400), h = Math.floor((s%86400)/3600), m = Math.floor((s%3600)/60);
  return `${d}d ${h}h ${m}m`;
};

export const UpcomingEvents = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(()=>{ const id = setInterval(()=>setNow(Date.now()), 1000); return ()=>clearInterval(id); },[]);
  return (
    <section className="rounded-xl border bg-card/80 backdrop-blur p-4">
      <h2 className="font-display text-lg mb-2">Upcoming</h2>
      <ul className="space-y-3">
        {events.map(e=> (
          <li key={e.title} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{e.title}</div>
              <div className="text-xs text-muted-foreground">Starts in {fmt(e.time - now)}</div>
            </div>
            <Button size="sm" variant="outline">{e.cta}</Button>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default UpcomingEvents;
