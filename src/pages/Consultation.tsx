import { useEffect } from "react";
import Navigation from "@/components/shared/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, Mail, MessageCircle, Clock, Users, Shield } from "lucide-react";

const Consultation = () => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const experts = [
    {
      name: "Sarah Mitchell",
      title: "CFP, Wealth Management Specialist",
      experience: "20 years in wealth management",
      rating: 4.9,
      reviews: 152,
      specialties: ["Trust Planning", "Tax Optimization", "Estate Planning"]
    },
    {
      name: "Johan van der Merwe",
      title: "Trust Law Specialist",
      experience: "Expert in SA trust law",
      rating: 4.8,
      reviews: 98,
      specialties: ["Trust Structures", "Legal Compliance", "Beneficiary Rights"]
    },
    {
      name: "Thandiwe Ngwenya",
      title: "Tax & Cross-Border Advisor",
      experience: "Cross-border wealth specialist",
      rating: 4.9,
      reviews: 76,
      specialties: ["International Tax", "Offshore Trusts", "SARS Compliance"]
    }
  ];

  const preparationItems = [
    "List of assets and current values",
    "Existing will or trust documents",
    "Recent financial statements",
    "Questions about your legacy goals",
    "Family structure information",
    "Current tax situation overview"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Book Your Wealth Management Consultation</h1>
          <p className="text-xl text-muted-foreground mb-8">Connect with our expert advisors to secure your family's financial legacy</p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">500+ Families Served</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-medium">R2B+ Assets Managed</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <span className="font-medium">15+ Years Experience</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Column - Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* What to Expect */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold mb-4">What to Expect</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Duration: 45-60 minutes</div>
                      <div className="text-sm text-muted-foreground">Comprehensive consultation</div>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-primary/20 pl-4 ml-2 space-y-2">
                    <h4 className="font-medium">Topics Covered:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Trust structure planning</li>
                      <li>• Tax optimization strategies</li>
                      <li>• Asset protection methods</li>
                      <li>• Estate planning essentials</li>
                      <li>• Crypto wealth integration</li>
                      <li>• Family succession planning</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preparation Checklist */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold mb-4">Preparation Checklist</h3>
                <p className="text-muted-foreground mb-4">Bring these to your consultation:</p>
                <ul className="space-y-2">
                  {preparationItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Expert Profiles */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold mb-4">Meet Our Experts</h3>
                <div className="space-y-4">
                  {experts.map((expert, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{expert.name}</h4>
                          <p className="text-sm text-muted-foreground">{expert.title}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{expert.rating}</span>
                          <span className="text-xs text-muted-foreground">({expert.reviews})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{expert.experience}</p>
                      <div className="flex flex-wrap gap-1">
                        {expert.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Alternative */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold mb-4">Prefer to speak with someone first?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">0800 LEGACY</div>
                      <div className="text-sm text-muted-foreground">(0800 534 229)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">consult@legacybuilder.co.za</div>
                      <div className="text-sm text-muted-foreground">Email us your questions</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">+27 82 LEGACY</div>
                      <div className="text-sm text-muted-foreground">WhatsApp support</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Calendly Widget */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardContent className="p-0">
                <div 
                  className="calendly-inline-widget w-full"
                  data-url="https://calendly.com/legacybuilder/wealth-consultation"
                  style={{ minWidth: '320px', height: '700px' }}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h2 className="font-display text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Michael Thompson",
                role: "Business Owner",
                quote: "The consultation helped us structure our family trust perfectly. Sarah's expertise saved us thousands in tax.",
                rating: 5
              },
              {
                name: "Dr. Linda Patel",
                role: "Medical Professional",
                quote: "Johan explained trust law in simple terms. We finally understood how to protect our assets properly.",
                rating: 5
              },
              {
                name: "James & Helen Foster",
                role: "Retirees",
                quote: "Thandiwe's advice on offshore planning was invaluable. Our estate is now optimally structured.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Consultation;