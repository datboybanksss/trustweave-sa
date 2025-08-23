import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Users, FileText, TrendingUp, Star, ChevronRight } from "lucide-react";
import legacyLogo from "@/assets/legacy-builder-logo.png";
import PublicNavigation from "@/components/shared/PublicNavigation";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and redirect to dashboard
    const userType = localStorage.getItem('userType');
    
    if (userType) {
      // User is logged in, redirect to dashboard
      navigate('/dashboard');
    }
    // If not logged in, stay on this page (home/landing)
  }, [navigate]);

  // If user is logged in, show loading while redirecting
  const userType = localStorage.getItem('userType');
  if (userType) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show landing page content for non-logged-in users
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <PublicNavigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          🚀 7-Day Free Trial • No Credit Card Required
        </Badge>
        
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
          Build Your Family's
          <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Legacy</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The complete platform for South African families and legal professionals 
          to create trusts, manage wealth, and secure generational prosperity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="min-w-48" onClick={() => navigate('/signup')}>
            Start Your Free Trial
          </Button>
          <Button variant="outline" size="lg" className="min-w-48">
            Watch Demo Video
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-success" />
            Bank-Grade Security
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-success" />
            500+ Families Served
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-success" />
            Legal Compliance
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive wealth management and trust planning tools designed for South African families
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card/80 backdrop-blur">
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Trust Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Step-by-step trust creation wizard with legal templates and compliance checks.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Living & Testamentary Trusts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Legal Document Generation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Compliance Monitoring
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardHeader>
              <FileText className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Document Vault</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Secure storage for all your wealth documents with automatic value extraction.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Crypto Wallet Verification
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Property & Investment Tracking
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Automated Calculations
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-success mb-2" />
              <CardTitle>Wealth Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Real-time portfolio monitoring with professional-grade analytics and reporting.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Net Worth Calculations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Asset Allocation Charts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Growth Projections
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Client Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For legal professionals: manage multiple clients from one powerful dashboard.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Client Portfolios
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  AUM Tracking
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Professional Reports
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <FileText className="h-8 w-8 text-crypto-bitcoin mb-2" />
                <Badge className="bg-crypto-bitcoin/10 text-crypto-bitcoin">New</Badge>
              </div>
              <CardTitle>Crypto Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Advanced cryptocurrency holdings verification to prevent fraud and ensure accuracy.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Wallet Address Validation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  KYC Integration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Ownership Proof
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardHeader>
              <Star className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Education Academy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comprehensive learning modules to master wealth planning and trust management.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  6 Video Modules
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Interactive Quizzes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Completion Certificates
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground">Choose the plan that fits your needs</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <Card className="bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Essential</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">R 500</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Perfect for individuals starting their wealth journey</p>
              <Button variant="outline" className="w-full mb-4" onClick={() => navigate('/signup?plan=essential')}>
                Start Free Trial
              </Button>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Document vault (10GB)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Basic trust builder
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  1 consultation/year
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-primary relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle>Professional</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">R 1,500</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Complete solution for serious wealth builders</p>
              <Button className="w-full mb-4" onClick={() => navigate('/signup?plan=professional')}>
                Start Free Trial
              </Button>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Document vault (50GB)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Advanced trust builder
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Crypto verification
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  4 consultations/year
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">R 5,000</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">For legal professionals managing multiple clients</p>
              <Button variant="outline" className="w-full mb-4" onClick={() => navigate('/signup?plan=enterprise')}>
                Start Free Trial
              </Button>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Unlimited storage
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Client management
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Unlimited consultations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  5 family accounts
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Trusted by South African Families</h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 fill-accent text-accent" />)}
            <span className="ml-2 text-muted-foreground">4.9/5 from 500+ reviews</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <p className="text-muted-foreground mb-4">
                "Legacy Builder helped us create a comprehensive family trust structure. 
                The crypto verification feature gave us confidence in our digital assets."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">JS</span>
                </div>
                <div>
                  <p className="font-semibold">Jan Smith</p>
                  <p className="text-sm text-muted-foreground">Cape Town</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <p className="text-muted-foreground mb-4">
                "As a legal professional, the client management features are exceptional. 
                I can handle multiple families efficiently with professional reporting."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">MP</span>
                </div>
                <div>
                  <p className="font-semibold">Maria Pretorius</p>
                  <p className="text-sm text-muted-foreground">Johannesburg Attorney</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <p className="text-muted-foreground mb-4">
                "The education modules were invaluable. I learned so much about trust planning 
                and felt confident making informed decisions about our family's future."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">TM</span>
                </div>
                <div>
                  <p className="font-semibold">Thabo Mthembu</p>
                  <p className="text-sm text-muted-foreground">Durban</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Secure Your Family's Legacy?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of South African families who trust Legacy Builder 
              to protect and grow their generational wealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/signup')}>
                Start Your Free Trial Today
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/consultation')}>
                Book a Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
      <div className="flex items-center">
        <img src="/lovable-uploads/cc72f08d-4a6e-4679-8640-1bd71690917f.png" alt="Legacy Builder" className="h-10 w-auto" />
      </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Empowering South African families and legal professionals to build, 
                protect, and transfer generational wealth through innovative trust and wealth management solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Trust Builder</li>
                <li>Document Vault</li>
                <li>Wealth Tracking</li>
                <li>Crypto Verification</li>
                <li>Education Academy</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Contact Support</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Legacy Builder. All rights reserved. | Company Registration: 2024/123456/07</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;