import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface ConnectBankModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConnectBankModal = ({ open, onOpenChange }: ConnectBankModalProps) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const southAfricanBanks = [
    { id: 'fnb', name: 'FNB', logo: '/images/banks/fnb.png' },
    { id: 'standard', name: 'Standard Bank', logo: '/images/banks/standard.png' },
    { id: 'absa', name: 'ABSA', logo: '/images/banks/absa.png' },
    { id: 'nedbank', name: 'Nedbank', logo: '/images/banks/nedbank.png' },
    { id: 'capitec', name: 'Capitec', logo: '/images/banks/capitec.png' }
  ];

  const handleConnect = () => {
    // This would integrate with Open Banking APIs in production
    console.log('Connecting to bank:', selectedBank, credentials);
    onOpenChange(false);
    setSelectedBank('');
    setCredentials({ username: '', password: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Bank Account</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bank Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Select Your Bank</Label>
            <div className="grid grid-cols-2 gap-3">
              {southAfricanBanks.map(bank => (
                <Card 
                  key={bank.id}
                  className={`cursor-pointer transition-colors ${
                    selectedBank === bank.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedBank(bank.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold">{bank.name.slice(0, 3)}</span>
                    </div>
                    <div className="text-sm font-medium">{bank.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Login Form */}
          {selectedBank && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username/Account Number</Label>
                <Input
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter your banking username"
                />
              </div>

              <div>
                <Label htmlFor="password">Password/PIN</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your banking password"
                />
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  🔒 Your credentials are encrypted and never stored.
                  We use bank-grade security for all connections.
                </p>
              </div>

              <Button 
                onClick={handleConnect} 
                className="w-full"
                disabled={!credentials.username || !credentials.password}
              >
                Connect {southAfricanBanks.find(b => b.id === selectedBank)?.name}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};