import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, CreditCard, DollarSign, ArrowRight, BookOpen, HelpCircle, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import legacyLogo from "@/assets/legacy-builder-logo.png";
import { getUserType, getUserData } from "@/lib/userSession";

const ThankYou = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('paymentData');
    const userType = getUserType();
    const userData = getUserData();
    
    if (data) {
      setPaymentData({...JSON.parse(data), userType, userData});
    } else {
      navigate('/');
    }

    // Check if animation was already shown
    const animationShown = sessionStorage.getItem('thankYouAnimationShown');
    if (!animationShown) {
      // Slight delay to ensure page is ready
      setTimeout(() => {
        setShowAnimation(true);
        sessionStorage.setItem('thankYouAnimationShown', 'true');
        
        // Mark animation as complete after it finishes
        setTimeout(() => {
          setAnimationComplete(true);
          setShowAnimation(false);
        }, 2000);
      }, 100);
    } else {
      setAnimationComplete(true);
    }
  }, [navigate]);

  if (!paymentData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const nextSteps = paymentData.userType === 'partner' 
    ? [
        { number: 1, text: "Check your email for login credentials" },
        { number: 2, text: "Complete your firm profile setup" },
        { number: 3, text: "Add your first client to get started" },
        { number: 4, text: "Book an onboarding consultation" }
      ]
    : [
        { number: 1, text: "Check your email for login credentials" },
        { number: 2, text: "Complete your personal profile setup" },
        { number: 3, text: "Upload your first wealth documents" },
        { number: 4, text: "Book your onboarding consultation" }
      ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Success Animation - Shows only once */}
      {showAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-fade-in"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--accent))' : 'hsl(var(--success))',
                  animationDelay: `${Math.random() * 1.5}s`,
                  animationDuration: '1.5s',
                  animationFillMode: 'both'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌳</span>
            <span className="font-bold text-lg">Legacy Vault</span>
          </div>
          <Badge className="bg-success text-white">
            Account Created Successfully
          </Badge>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-12">
            <div className="relative mb-6">
              <CheckCircle className={`h-20 w-20 text-success mx-auto ${!animationComplete ? 'animate-scale-in' : ''}`} />
              {!animationComplete && (
                <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" 
                     style={{ animationDuration: '1s', animationIterationCount: '2' }} />
              )}
            </div>
            
            <h1 className="font-display text-4xl font-bold mb-4">
              Welcome to Legacy Vault!
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Your {paymentData.planName} trial has been activated
            </p>
            <Badge className="bg-success/10 text-success border-success/20">
              Trial expires on {paymentData.trialEndDate}
            </Badge>
          </div>

          {/* Trial Details */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card className="bg-card/80 backdrop-blur text-center">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">Trial Period</p>
                <p className="text-2xl font-bold text-primary">7 Days</p>
                <p className="text-sm text-muted-foreground">Full access to all features</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur text-center">
              <CardContent className="pt-6">
                <CreditCard className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="font-semibold">First Billing</p>
                <p className="text-2xl font-bold text-accent">{paymentData.trialEndDate}</p>
                <p className="text-sm text-muted-foreground">Cancel anytime before then</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur text-center">
              <CardContent className="pt-6">
                <DollarSign className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="font-semibold">Monthly Amount</p>
                <p className="text-2xl font-bold text-success">R {paymentData.planAmount}</p>
                <p className="text-sm text-muted-foreground">After free trial</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Next Steps */}
            <Card className="bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Here's what happens next:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nextSteps.map((step) => (
                    <div key={step.number} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <p className="text-sm pt-1">{step.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button className="flex-1" onClick={() => navigate('/dashboard')}>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => navigate('/education')}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support & Resources */}
            <Card className="bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Need help getting started?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Help Center</p>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive guides and tutorials
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Calendar className="h-6 w-6 text-accent" />
                    <div>
                      <p className="font-medium">Onboarding Consultation</p>
                      <p className="text-sm text-muted-foreground">
                        Free 30-minute setup call
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Phone className="h-6 w-6 text-success" />
                    <div>
                      <p className="font-medium">Call Support</p>
                      <p className="text-sm text-muted-foreground">
                        0800 LEGACY (0800 534 229)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">
                        support@legacybuilder.co.za
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/consultation')}>
                  Book Your Onboarding Call
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Account Summary */}
          <Card className="bg-primary/5 border-primary/20 mt-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold mb-4">Account Summary</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{paymentData.firstName} {paymentData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{paymentData.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Account Type</p>
                    <p className="font-medium">
                      {paymentData.userType === 'individual' ? 'Individual' : 'Legal Professional'}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Plan</p>
                    <p className="font-medium">{paymentData.planName}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Message */}
          <div className="text-center mt-8 text-muted-foreground">
            <p className="mb-2">
              Remember: You can cancel your trial anytime before {paymentData.trialEndDate} 
              without being charged.
            </p>
            <p className="text-sm">
              We're excited to help you build and protect your family's legacy! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;