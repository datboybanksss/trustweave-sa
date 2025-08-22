import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Users, Building } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import legacyLogo from "@/assets/legacy-logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'professional';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userType: 'individual',
    firmName: '',
    agreeToTerms: false
  });

  const planDetails = {
    essential: { name: 'Essential', price: 500 },
    professional: { name: 'Professional', price: 1500 },
    enterprise: { name: 'Enterprise', price: 5000 }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.phone && 
           formData.agreeToTerms &&
           (formData.userType === 'individual' || formData.firmName);
  };

  const handleContinue = () => {
    if (canProceed()) {
      // Store signup data in sessionStorage for payment page
      sessionStorage.setItem('signupData', JSON.stringify({
        ...formData,
        selectedPlan
      }));
      navigate(`/payment?plan=${selectedPlan}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src={legacyLogo} alt="Legacy Builder logo" className="h-8 w-8" />
            <span className="font-display text-lg">Legacy Builder</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div className="w-8 h-0.5 bg-muted" />
            <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="w-8 h-0.5 bg-muted" />
            <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
          </div>

          <Card className="bg-card/80 backdrop-blur">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-4 bg-primary/10 text-primary border-primary/20 w-fit">
                Step 1: Account Setup
              </Badge>
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <p className="text-muted-foreground">
                Join Legacy Builder and start your 7-day free trial of the {planDetails[selectedPlan as keyof typeof planDetails].name} plan
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personal Information
                </h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+27 82 123 4567"
                    required
                  />
                </div>
              </div>

              {/* Account Type */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Type
                </h3>
                
                <RadioGroup 
                  value={formData.userType} 
                  onValueChange={(value) => handleInputChange('userType', value)}
                >
                  <div className="flex items-start space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="individual" id="individual" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="individual" className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Individual/Family
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Personal wealth management and family trust planning
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="partner" id="partner" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="partner" className="font-medium flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Legal Professional/Firm
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Manage multiple clients and provide professional services
                      </p>
                    </div>
                  </div>
                </RadioGroup>

                {formData.userType === 'partner' && (
                  <div>
                    <Label htmlFor="firmName">Firm Name *</Label>
                    <Input
                      id="firmName"
                      value={formData.firmName}
                      onChange={(e) => handleInputChange('firmName', e.target.value)}
                      placeholder="Your law firm or practice name"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Plan Summary */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Selected Plan</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{planDetails[selectedPlan as keyof typeof planDetails].name} Plan</p>
                    <p className="text-sm text-muted-foreground">7-day free trial, then R {planDetails[selectedPlan as keyof typeof planDetails].price}/month</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/#pricing')}>
                    Change Plan
                  </Button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', !!checked)}
                />
                <div className="text-sm">
                  <Label htmlFor="terms" className="font-medium">
                    I agree to the Terms of Service and Privacy Policy *
                  </Label>
                  <p className="text-muted-foreground mt-1">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    You can cancel your trial anytime within 7 days.
                  </p>
                </div>
              </div>

              {/* Continue Button */}
              <Button 
                size="lg" 
                className="w-full" 
                onClick={handleContinue}
                disabled={!canProceed()}
              >
                Continue to Payment →
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <a href="#" className="text-primary hover:underline">Sign in here</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;