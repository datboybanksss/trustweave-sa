import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApiKeyModal = ({ open, onOpenChange }: ApiKeyModalProps) => {
  const { apiKey, setApiKey } = useTranslation();
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(tempKey);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Google Translate API Key</DialogTitle>
          <DialogDescription>
            Enter your Google Translate API key to enable automatic translations. 
            You can get one from Google Cloud Console.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Your Google Translate API Key"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Note: Your API key is stored locally in your browser and never sent to our servers.</p>
            <p className="mt-1">
              <a 
                href="https://cloud.google.com/translate/docs/setup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Get your API key here →
              </a>
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};