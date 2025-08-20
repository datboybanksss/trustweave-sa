import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, Users, FileText, Calculator, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TrustBuilderSectionProps {
  activeTrusts: number;
  onTrustCreated: () => void;
}

export const TrustBuilderSection = ({ activeTrusts, onTrustCreated }: TrustBuilderSectionProps) => {
  const [showTrustWizard, setShowTrustWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [trustData, setTrustData] = useState({
    name: '',
    type: '',
    purpose: '',
    initialAssets: '',
    trustees: [''],
    beneficiaries: ['']
  });

  const trustTypes = [
    { value: 'living', label: 'Living Trust', description: 'Manages assets during your lifetime' },
    { value: 'testamentary', label: 'Testamentary Trust', description: 'Created through your will' },
    { value: 'discretionary', label: 'Discretionary Trust', description: 'Trustees have discretion over distributions' },
    { value: 'vesting', label: 'Vesting Trust', description: 'Beneficiaries have definite rights' }
  ];

  const handleNextStep = () => {
    if (wizardStep < 4) {
      setWizardStep(wizardStep + 1);
    } else {
      // Complete trust creation
      onTrustCreated();
      setShowTrustWizard(false);
      setWizardStep(1);
      setTrustData({
        name: '',
        type: '',
        purpose: '',
        initialAssets: '',
        trustees: [''],
        beneficiaries: ['']
      });
      toast({
        title: "✓ Trust Created Successfully",
        description: `${trustData.name} has been created and saved to your dashboard.`
      });
    }
  };

  const addTrustee = () => {
    setTrustData(prev => ({
      ...prev,
      trustees: [...prev.trustees, '']
    }));
  };

  const addBeneficiary = () => {
    setTrustData(prev => ({
      ...prev,
      beneficiaries: [...prev.beneficiaries, '']
    }));
  };

  const updateTrustee = (index: number, value: string) => {
    setTrustData(prev => ({
      ...prev,
      trustees: prev.trustees.map((t, i) => i === index ? value : t)
    }));
  };

  const updateBeneficiary = (index: number, value: string) => {
    setTrustData(prev => ({
      ...prev,
      beneficiaries: prev.beneficiaries.map((b, i) => i === index ? value : b)
    }));
  };

  const getStepTitle = () => {
    switch (wizardStep) {
      case 1: return "Trust Basics";
      case 2: return "Trust Type & Purpose";
      case 3: return "Trustees & Beneficiaries";
      case 4: return "Review & Create";
      default: return "Trust Setup";
    }
  };

  return (
    <>
      {/* Trust Management Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => setShowTrustWizard(true)}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Trusts</p>
                <p className="text-2xl font-bold">{activeTrusts}</p>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Trust Assets</p>
                <p className="text-2xl font-bold">R 12.5M</p>
              </div>
              <Calculator className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Beneficiaries</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance</p>
                <p className="text-2xl font-bold text-success">98%</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Existing Trusts */}
      {activeTrusts > 0 && (
        <Card className="bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Your Active Trusts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">Van der Merwe Family Trust</h3>
                    <Badge variant="default" className="bg-success text-white">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Living Trust • Created 2023 • R 8.5M assets
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-muted-foreground">5 Beneficiaries</span>
                    <span className="text-xs text-muted-foreground">2 Trustees</span>
                    <span className="text-xs text-muted-foreground">Last reviewed: Jan 2024</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">Business Investment Trust</h3>
                    <Badge variant="default" className="bg-success text-white">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Discretionary Trust • Created 2022 • R 3.2M assets
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-muted-foreground">3 Beneficiaries</span>
                    <span className="text-xs text-muted-foreground">3 Trustees</span>
                    <span className="text-xs text-muted-foreground">Last reviewed: Nov 2023</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg opacity-75">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">Education Trust</h3>
                    <Badge variant="secondary">Pending Setup</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vesting Trust • In progress • R 800K planned
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Setup Progress</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trust Creation Wizard Modal */}
      <Dialog open={showTrustWizard} onOpenChange={setShowTrustWizard}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Create New Trust - {getStepTitle()}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step <= wizardStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && <div className={`w-8 h-0.5 ${step < wizardStep ? 'bg-primary' : 'bg-muted'}`} />}
                </div>
              ))}
            </div>

            {/* Step Content */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="trust-name">Trust Name *</Label>
                  <Input
                    id="trust-name"
                    value={trustData.name}
                    onChange={(e) => setTrustData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Smith Family Trust"
                  />
                </div>
                
                <div>
                  <Label htmlFor="initial-assets">Initial Assets (ZAR)</Label>
                  <Input
                    id="initial-assets"
                    type="number"
                    value={trustData.initialAssets}
                    onChange={(e) => setTrustData(prev => ({ ...prev, initialAssets: e.target.value }))}
                    placeholder="1000000"
                  />
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Trust Type *</Label>
                  <RadioGroup 
                    value={trustData.type} 
                    onValueChange={(value) => setTrustData(prev => ({ ...prev, type: value }))}
                    className="mt-2"
                  >
                    {trustTypes.map((type) => (
                      <div key={type.value} className="flex items-start space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={type.value} className="font-medium">{type.label}</Label>
                          <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="purpose">Trust Purpose</Label>
                  <Textarea
                    id="purpose"
                    value={trustData.purpose}
                    onChange={(e) => setTrustData(prev => ({ ...prev, purpose: e.target.value }))}
                    placeholder="Describe the main purpose and objectives of this trust..."
                    className="min-h-20"
                  />
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Trustees *</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add the people who will manage the trust
                  </p>
                  <div className="space-y-2">
                    {trustData.trustees.map((trustee, index) => (
                      <Input
                        key={index}
                        value={trustee}
                        onChange={(e) => updateTrustee(index, e.target.value)}
                        placeholder="Full name of trustee"
                      />
                    ))}
                    <Button type="button" variant="outline" onClick={addTrustee}>
                      Add Another Trustee
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Beneficiaries *</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add the people who will benefit from the trust
                  </p>
                  <div className="space-y-2">
                    {trustData.beneficiaries.map((beneficiary, index) => (
                      <Input
                        key={index}
                        value={beneficiary}
                        onChange={(e) => updateBeneficiary(index, e.target.value)}
                        placeholder="Full name of beneficiary"
                      />
                    ))}
                    <Button type="button" variant="outline" onClick={addBeneficiary}>
                      Add Another Beneficiary
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Review Your Trust Details</h3>
                
                <div className="grid gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <span className="font-medium">Trust Name:</span>
                    <span className="ml-2">{trustData.name}</span>
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>
                    <span className="ml-2">{trustTypes.find(t => t.value === trustData.type)?.label}</span>
                  </div>
                  <div>
                    <span className="font-medium">Initial Assets:</span>
                    <span className="ml-2">R {parseInt(trustData.initialAssets || '0').toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium">Trustees:</span>
                    <span className="ml-2">{trustData.trustees.filter(t => t).length}</span>
                  </div>
                  <div>
                    <span className="font-medium">Beneficiaries:</span>
                    <span className="ml-2">{trustData.beneficiaries.filter(b => b).length}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  By creating this trust, you agree to our terms and conditions. 
                  Professional legal review is recommended before finalizing.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => wizardStep > 1 ? setWizardStep(wizardStep - 1) : setShowTrustWizard(false)}
              >
                {wizardStep > 1 ? 'Previous' : 'Cancel'}
              </Button>
              
              <Button 
                onClick={handleNextStep}
                disabled={
                  (wizardStep === 1 && !trustData.name) ||
                  (wizardStep === 2 && !trustData.type) ||
                  (wizardStep === 3 && (!trustData.trustees.some(t => t) || !trustData.beneficiaries.some(b => b)))
                }
              >
                {wizardStep === 4 ? 'Create Trust' : 'Next'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
