import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/shared/Navigation";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: "Essential",
      price: billingCycle === 'monthly' ? 500 : 5000,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      badge: null,
      color: 'border-muted',
      features: [
        { text: "Document vault (10GB)", included: true },
        { text: "Basic trust builder", included: true },
        { text: "Email support", included: true },
        { text: "1 consultation per year", included: true },
        { text: "Basic reporting", included: true },
        { text: "Crypto verification", included: false },
        { text: "Education modules", included: false },
        { text: "Family accounts", included: false }
      ],
      cta: "Start Essential",
      variant: "outline" as const
    },
    {
      name: "Professional",
      price: billingCycle === 'monthly' ? 1500 : 15000,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      badge: "MOST POPULAR",
      color: 'border-primary ring-2 ring-primary/20',
      features: [
        { text: "Document vault (50GB)", included: true },
        { text: "Advanced trust builder", included: true },
        { text: "Priority support", included: true },
        { text: "4 consultations per year", included: true },
        { text: "All education modules", included: true },
        { text: "Crypto verification included", included: true },
        { text: "Advanced reporting", included: true },
        { text: "2 family accounts", included: true }
      ],
      cta: "Start Professional",
      variant: "default" as const
    },
    {
      name: "Enterprise",
      price: billingCycle === 'monthly' ? 5000 : 50000,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      badge: "BEST VALUE",
      color: 'border-accent ring-2 ring-accent/20',
      features: [
        { text: "Unlimited document storage", included: true },
        { text: "Full platform access", included: true },
        { text: "Dedicated advisor", included: true },
        { text: "Unlimited consultations", included: true },
        { text: "VIP seminar invitations", included: true },
        { text: "Advanced crypto portfolio tools", included: true },
        { text: "5 family accounts", included: true },
        { text: "White-glove onboarding", included: true },
        { text: "Custom reporting", included: true },
        { text: "API access", included: true }
      ],
      cta: "Contact Sales",
      variant: "premium" as const
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and EFT payments through our secure PayFast integration for South African customers."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-grade encryption, comply with POPIA regulations, and store all data in secure South African data centers."
    },
    {
      question: "What's included in consultations?",
      answer: "Each consultation includes 45-60 minutes with a qualified wealth advisor covering trust planning, tax strategies, and estate planning specific to your situation."
    },
    {
      question: "How does crypto verification work?",
      answer: "We verify crypto holdings through KYC checks for exchange wallets or ownership proof for cold wallets, ensuring accurate wealth calculations."
    },
    {
      question: "Can I add more family members?",
      answer: "Yes, you can add additional family members to any plan. Each additional user is R 200/month on Essential and Professional plans."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl font-bold mb-4">Choose Your Legacy Builder Plan</h1>
          <p className="text-xl text-muted-foreground mb-8">Secure your family's future with the right plan for your needs</p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center rounded-lg border p-1 bg-card">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'annual' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <Badge variant="secondary" className="ml-2">Save 17%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.color} hover:shadow-lg transition-shadow`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant={plan.name === 'Professional' ? 'default' : 'secondary'} className="px-3 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R {plan.price.toLocaleString()}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-success flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.variant} 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.location.href = `/payment?plan=${plan.name.toLowerCase()}`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-card border rounded-lg px-6 py-4">
            <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="h-4 w-4 text-success" />
            </div>
            <span className="font-medium">30-day money-back guarantee on all plans</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default Pricing;