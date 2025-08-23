import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lock, Shield, CreditCard, Smartphone } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import legacyLogo from "@/assets/legacy-builder-logo.png";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'professional';
  
  const [signupData, setSignupData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    agreeToTrial: false
  });

  const planDetails = {
    essential: { name: 'Essential', price: 500, features: ['Document vault (10GB)', 'Basic trust builder', '1 consultation/year'] },
    professional: { name: 'Professional', price: 1500, features: ['Document vault (50GB)', 'Advanced trust builder', 'Crypto verification', '4 consultations/year'] },
    enterprise: { name: 'Enterprise', price: 5000, features: ['Unlimited storage', 'Client management', 'Unlimited consultations', '5 family accounts'] }
  };

  const currentPlan = planDetails[selectedPlan as keyof typeof planDetails];
  const trialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-ZA');

  useEffect(() => {
    const data = sessionStorage.getItem('signupData');
    if (data) {
      setSignupData(JSON.parse(data));
    } else {
      navigate('/signup');
    }
  }, [navigate]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const canProceed = () => {
    return paymentData.cardNumber.replace(/\s/g, '').length >= 16 &&
           paymentData.expiryDate.length === 5 &&
           paymentData.cvv.length >= 3 &&
           paymentData.cardholderName &&
           paymentData.agreeToTrial;
  };

  const handlePayment = async () => {
    if (!canProceed()) return;

    // Simulate PayFast integration
    const payFastData = {
      merchant_id: '10000100',
      merchant_key: '46f0cd694581a',
      return_url: `${window.location.origin}/thank-you`,
      cancel_url: `${window.location.origin}/payment-cancelled`,
      notify_url: '/api/payfast-webhook',
      subscription_type: 1,
      billing_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      recurring_amount: currentPlan.price * 100, // PayFast uses cents
      frequency: 3, // Monthly
      cycles: 0, // Indefinite
      amount: 0, // No charge for trial
      item_name: `${currentPlan.name} Plan - 7 Day Trial`,
      custom_str1: signupData?.email,
      custom_str2: signupData?.userType
    };

    // Store payment data for thank you page
    sessionStorage.setItem('paymentData', JSON.stringify({
      ...signupData,
      plan: selectedPlan,
      planName: currentPlan.name,
      planAmount: currentPlan.price,
      trialEndDate
    }));

    // Simulate successful payment
    setTimeout(() => {
      navigate('/thank-you');
    }, 2000);
  };

  if (!signupData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <img src="/lovable-uploads/cc72f08d-4a6e-4679-8640-1bd71690917f.png" alt="Legacy Builder logo" className="h-10 w-auto" />
          </div>
          <Button variant="ghost" onClick={() => navigate('/signup')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Signup
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-success text-white rounded-full flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <div className="w-8 h-0.5 bg-success" />
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="w-8 h-0.5 bg-muted" />
            <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Payment Form */}
            <Card className="bg-card/80 backdrop-blur">
              <CardHeader>
                <Badge className="mb-4 bg-success/10 text-success border-success/20 w-fit">
                  <Lock className="h-3 w-3 mr-1" />
                  Secure Payment
                </Badge>
                <CardTitle className="text-2xl">Start Your 7-Day Free Trial</CardTitle>
                <p className="text-muted-foreground">
                  No charges today • Cancel anytime during trial
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Payment Method</h3>
                  
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-primary/5 border-primary">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                      <Smartphone className="h-5 w-5" />
                      <span>Instant EFT</span>
                      <Badge variant="secondary" className="ml-auto text-xs">Coming Soon</Badge>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={paymentData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        maxLength={4}
                        type="password"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name *</Label>
                    <Input
                      id="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                      placeholder="As it appears on your card"
                    />
                  </div>
                </div>

                {/* Trial Agreement */}
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="trialAgreement"
                    checked={paymentData.agreeToTrial}
                    onCheckedChange={(checked) => handleInputChange('agreeToTrial', !!checked)}
                  />
                  <div className="text-sm">
                    <Label htmlFor="trialAgreement" className="font-medium">
                      I agree to the 7-day trial terms *
                    </Label>
                    <p className="text-muted-foreground mt-1">
                      After your trial ends on {trialEndDate}, you'll be charged R {currentPlan.price}/month 
                      unless you cancel. You can cancel anytime in your account settings.
                    </p>
                  </div>
                </div>

                {/* Payment Button */}
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handlePayment}
                  disabled={!canProceed()}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Start Free Trial
                </Button>

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    SSL Secured
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    PCI Compliant
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CreditCard className="h-3 w-3" />
                    PayFast Verified
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-card/80 backdrop-blur h-fit">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* User Info */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium">{signupData.firstName} {signupData.lastName}</p>
                  <p className="text-sm text-muted-foreground">{signupData.email}</p>
                  <Badge variant="secondary" className="mt-1">
                    {signupData.userType === 'individual' ? 'Individual Account' : 'Legal Professional'}
                  </Badge>
                </div>

                {/* Plan Details */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{currentPlan.name} Plan</span>
                    <span className="font-bold">R {currentPlan.price}/month</span>
                  </div>
                  
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trial Info */}
                <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                  <h4 className="font-medium text-success mb-1">7-Day Free Trial</h4>
                  <p className="text-sm text-muted-foreground">
                    Full access to all features until {trialEndDate}
                  </p>
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Trial Period (7 days)</span>
                    <span className="text-success font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>After trial</span>
                    <span>R {currentPlan.price}/month</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Due Today</span>
                    <span className="text-success">R 0.00</span>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">What's included in your trial:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ Full access to all features</li>
                    <li>✓ Unlimited document uploads</li>
                    <li>✓ Trust creation wizard</li>
                    <li>✓ Email support</li>
                    <li>✓ 30-day money-back guarantee</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;