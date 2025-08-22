import { Button } from "@/components/ui/button";
import { CalendarDays, FileUp, PlayCircle, Plus } from "lucide-react";

interface ActionItemsProps {
  onCreateTrust: () => void;
  onUploadDocument: () => void;
  onBookConsultation: () => void;
  onStartLearning: () => void;
}

export const ActionItems = ({ onCreateTrust, onUploadDocument, onBookConsultation, onStartLearning }: ActionItemsProps) => (
  <section className="rounded-xl border bg-card/80 backdrop-blur p-4">
    <h2 className="font-display text-lg mb-3">Quick Actions</h2>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Button variant="hero" onClick={onCreateTrust}><Plus />Create New Trust</Button>
      <Button variant="outline" onClick={onUploadDocument}><FileUp />Upload Document</Button>
      <Button variant="outline" onClick={onBookConsultation}><CalendarDays />Book Consultation</Button>
      <Button variant="premium" onClick={onStartLearning}><PlayCircle />Start Learning</Button>
    </div>
  </section>
);
export default ActionItems;
