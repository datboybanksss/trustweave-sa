import { useState, useEffect } from "react";
import DashboardNavigation from "@/components/shared/DashboardNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Play, 
  Lock, 
  CheckCircle, 
  Clock, 
  Download, 
  Trophy,
  Calendar,
  MapPin,
  Users,
  Star
} from "lucide-react";

interface Module {
  id: number;
  title: string;
  duration: number;
  description: string;
  videoUrl?: string;
  completed: boolean;
  locked: boolean;
  quizPassed?: boolean;
}

const Education = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Introduction to Trusts",
      duration: 15,
      description: "Understanding trust basics, benefits, and types",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: true,
      locked: false,
      quizPassed: true
    },
    {
      id: 2,
      title: "Trust Structures in South Africa",
      duration: 20,
      description: "Living trusts vs testamentary trusts",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: true,
      locked: false,
      quizPassed: true
    },
    {
      id: 3,
      title: "Tax Planning with Trusts",
      duration: 25,
      description: "Minimize tax legally with proper structures",
      completed: false,
      locked: false
    },
    {
      id: 4,
      title: "Beneficiary Management",
      duration: 18,
      description: "Choosing and managing beneficiaries",
      completed: false,
      locked: true
    },
    {
      id: 5,
      title: "Asset Protection Strategies",
      duration: 22,
      description: "Safeguarding wealth from risks",
      completed: false,
      locked: true
    },
    {
      id: 6,
      title: "Estate Planning Essentials",
      duration: 30,
      description: "Complete estate planning guide",
      completed: false,
      locked: true
    }
  ]);

  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [showRSVP, setShowRSVP] = useState(false);
  const [rsvpSubmitted, setRSVPSubmitted] = useState(false);
  const [rsvpData, setRSVPData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    attendees: 1,
    requirements: ''
  });

  const completedModules = modules.filter(m => m.completed).length;
  const totalModules = modules.length;
  const progressPercentage = (completedModules / totalModules) * 100;
  const allModulesComplete = completedModules === totalModules;

  // Check if we should show RSVP (all modules completed)
  useEffect(() => {
    if (allModulesComplete) {
      setShowRSVP(true);
    }
  }, [allModulesComplete]);

  const handleModuleComplete = (moduleId: number) => {
    setModules(prev => {
      const updated = prev.map(module => 
        module.id === moduleId 
          ? { ...module, completed: true, quizPassed: true }
          : module.id === moduleId + 1
          ? { ...module, locked: false }
          : module
      );
      return updated;
    });
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRSVPSubmitted(true);
  };

  const totalDuration = modules.reduce((sum, module) => sum + module.duration, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <DashboardNavigation />
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Legacy Builder Academy</h1>
          <p className="text-xl text-muted-foreground mb-8">Master wealth planning through our comprehensive education program</p>
          
          {/* Progress Overview */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{completedModules}/{totalModules} Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">~{Math.round(totalDuration / 60 * 10) / 10} hours total</p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {modules.map((module) => (
            <Card 
              key={module.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                module.locked ? 'opacity-60' : ''
              } ${expandedModule === module.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => !module.locked && setExpandedModule(
                expandedModule === module.id ? null : module.id
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3">
                      {module.locked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : module.completed ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <Play className="h-5 w-5 text-primary" />
                      )}
                      <span className={module.locked ? 'text-muted-foreground' : ''}>
                        MODULE {module.id}: {module.title}
                      </span>
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {module.duration} minutes
                      </div>
                      {module.completed && (
                        <Badge variant="outline" className="text-success border-success">
                          ✓ Completed
                        </Badge>
                      )}
                      {module.locked && (
                        <Badge variant="outline" className="text-muted-foreground">
                          🔒 Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{module.description}</p>
              </CardHeader>

              {expandedModule === module.id && !module.locked && (
                <CardContent className="border-t">
                  {module.videoUrl && (
                    <div className="aspect-video mb-4">
                      <iframe
                        src={module.videoUrl}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                        title={module.title}
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    {!module.completed && (
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModuleComplete(module.id);
                        }}
                        className="flex-1"
                      >
                        Mark as Complete
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Resources
                    </Button>
                    
                    {module.completed && !module.quizPassed && (
                      <Button variant="outline" className="flex-1">
                        Take Quiz
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Completion Section */}
        {showRSVP && (
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-8 text-center">
                <Trophy className="h-16 w-16 text-accent mx-auto mb-4" />
                <h2 className="font-display text-3xl font-bold mb-4">🎉 Congratulations!</h2>
                <p className="text-lg text-muted-foreground mb-8">You've completed the Legacy Builder Academy!</p>
                
                {/* Certificate */}
                <div className="bg-card border rounded-lg p-6 mb-8 max-w-md mx-auto">
                  <h3 className="font-display text-xl font-semibold mb-2">Certificate of Completion</h3>
                  <div className="text-left space-y-2 text-sm">
                    <div><strong>Name:</strong> Jonathan van der Merwe</div>
                    <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                    <div><strong>Modules:</strong> {totalModules}/6 Completed</div>
                    <div><strong>Total Hours:</strong> {Math.round(totalDuration / 60 * 10) / 10}</div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </div>

                {/* Upsell Section */}
                <div className="bg-card border rounded-xl p-8">
                  <h3 className="font-display text-2xl font-bold mb-4">Take Your Knowledge to the Next Level</h3>
                  
                  <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Star className="h-6 w-6 text-accent" />
                        Legacy Builder Masterclass Seminar
                      </CardTitle>
                      <p className="text-muted-foreground">Join us at the Cape Chamber of Commerce (CCJ)</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Features */}
                      <div className="grid md:grid-cols-2 gap-4 text-left">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                            <span className="text-sm">Live interaction with experts</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                            <span className="text-sm">Advanced wealth strategies</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                            <span className="text-sm">Networking with successful families</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                            <span className="text-sm">Exclusive trust templates</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                            <span className="text-sm">Lunch and refreshments included</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                            <span className="text-sm">Certificate of advanced completion</span>
                          </div>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div className="text-sm">
                            <div className="font-medium">Saturday, March 15, 2025</div>
                            <div className="text-muted-foreground">9:00 AM - 4:00 PM</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <div className="text-sm">
                            <div className="font-medium">CCJ Conference Center</div>
                            <div className="text-muted-foreground">Cape Town CBD</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <div className="text-sm">
                            <div className="font-medium">R 2,500 per person</div>
                            <div className="text-muted-foreground">Early bird pricing</div>
                          </div>
                        </div>
                      </div>

                      {/* RSVP Form */}
                      {!rsvpSubmitted ? (
                        <form onSubmit={handleRSVPSubmit} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <Input
                              placeholder="Full Name"
                              value={rsvpData.fullName}
                              onChange={(e) => setRSVPData({...rsvpData, fullName: e.target.value})}
                              required
                            />
                            <Input
                              placeholder="Email"
                              type="email"
                              value={rsvpData.email}
                              onChange={(e) => setRSVPData({...rsvpData, email: e.target.value})}
                              required
                            />
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <Input
                              placeholder="Phone"
                              type="tel"
                              value={rsvpData.phone}
                              onChange={(e) => setRSVPData({...rsvpData, phone: e.target.value})}
                              required
                            />
                            <Select onValueChange={(value) => setRSVPData({...rsvpData, preferredDate: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Preferred Date" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="march-15">March 15, 2025</SelectItem>
                                <SelectItem value="april-19">April 19, 2025</SelectItem>
                                <SelectItem value="may-17">May 17, 2025</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <Input
                            placeholder="Number of Attendees"
                            type="number"
                            min="1"
                            max="5"
                            value={rsvpData.attendees}
                            onChange={(e) => setRSVPData({...rsvpData, attendees: parseInt(e.target.value)})}
                          />
                          
                          <Textarea
                            placeholder="Special Requirements (dietary, accessibility, etc.)"
                            value={rsvpData.requirements}
                            onChange={(e) => setRSVPData({...rsvpData, requirements: e.target.value})}
                          />
                          
                          <Button type="submit" size="lg" className="w-full">
                            Reserve Your Seat
                          </Button>
                        </form>
                      ) : (
                        <div className="text-center p-6 bg-success/10 border border-success/20 rounded-lg">
                          <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                          <h4 className="font-semibold text-success mb-2">Thank you for your RSVP!</h4>
                          <p className="text-sm text-muted-foreground">
                            We'll contact you within 24 hours to confirm your reservation and provide payment details.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Education;