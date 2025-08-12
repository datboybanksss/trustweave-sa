import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type DateRange = { from?: Date; to?: Date };

export const DateRangePicker = ({ value, onChange }: { value?: DateRange; onChange?: (r: DateRange)=>void }) => {
  const [range, setRange] = React.useState<DateRange>(value || {});
  React.useEffect(()=>{ onChange?.(range); }, [range, onChange]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("h-10 justify-start font-normal w-[260px]", !range.from && "text-muted-foreground")}> 
          <CalendarIcon className="mr-2" />
          {range.from ? `${format(range.from, "PPP")} — ${range.to ? format(range.to, "PPP") : "..."}` : <span>Select date range</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="range" selected={range as any} onSelect={(r:any)=>setRange(r)} initialFocus className={cn("p-3 pointer-events-auto")} />
      </PopoverContent>
    </Popover>
  );
};
