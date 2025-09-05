import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdBanner from "@/components/layout/AdBanner";
import { Check, Users, Target, Award, TrendingUp, Building2, Briefcase } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animate-number";


const Employers = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "$50,000",
      period: "per month",
      description: "Perfect for small businesses and startups",
      features: [
        "Post up to 5 jobs per month",
        "Access to candidate profiles",
        "Basic applicant tracking",
        "Email support",
        "30-day job listing duration"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$150,000",
      period: "per month",
      description: "Ideal for growing companies",
      features: [
        "Post up to 20 jobs per month",
        "Advanced candidate search filters",
        "Priority job placement",
        "Dedicated account manager",
        "60-day job listing duration",
        "Analytics and reporting",
        "Phone & email support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$300,000",
      period: "per month",
      description: "For large organizations with high-volume hiring",
      features: [
        "Unlimited job postings",
        "Premium candidate database access",
        "Custom branding on job posts",
        "API integration",
        "90-day job listing duration",
        "Advanced analytics dashboard",
        "24/7 priority support",
        "Dedicated recruitment consultant"
      ],
      popular: false
    }
  ];

  const yearlyDiscount = 0.2; // 20% discount for yearly plans

  const services = [
    {
      icon: Users,
      title: "Talent Acquisition",
      description: "Access our extensive database of qualified professionals across various industries."
    },
    {
      icon: Target,
      title: "Targeted Recruitment",
      description: "Use advanced filters to find candidates that match your specific requirements."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "All candidates are pre-screened for qualifications and experience levels."
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track your hiring performance with detailed analytics and market insights."
    }
  ];

  const stats = [
    { label: "Active Candidates", value: "25,000+" },
    { label: "Successful Placements", value: "5,000+" },
    { label: "Partner Companies", value: "500+" },
    { label: "Average Time to Hire", value: "14 days" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Banner Ad */}
      <div className="w-full flex justify-center py-4 bg-muted/30">
        <AdBanner width={970} height={90} position="top" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Employer Solutions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find the perfect talent for your organization with our comprehensive recruitment platform. 
            Connect with pre-qualified candidates and streamline your hiring process.
          </p>
        </div>

        {/* Services Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Career Companion?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-primary/5 rounded-2xl p-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2"> <AnimatedNumber value={stat.value} /></div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Inline Ad */}
        <div className="flex justify-center mb-12">
          <AdBanner width={728} height={90} position="inline" />
        </div>

        {/* Pricing Plans */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
          
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly 
                <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="yearly" className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => {
                const yearlyPrice = Math.round(parseInt(plan.price.replace(/[^\d]/g, '')) * 12 * (1 - yearlyDiscount));
                return (
                  <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">${yearlyPrice.toLocaleString()}</span>
                        <span className="text-muted-foreground">/year</span>
                        <div className="text-sm text-primary">Save 20%</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full" 
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-12">
              <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Star Employee?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of successful companies that have found their perfect candidates through our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Start Hiring Today
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Schedule a Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Employers;