import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AdBanner from "@/components/layout/AdBanner";
import { Users, Target, Award, Briefcase, GraduationCap, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const services = [
    {
      icon: Briefcase,
      title: "Job Placement",
      description: "Connect with top employers and find your dream career opportunities."
    },
    {
      icon: GraduationCap,
      title: "Career Coaching",
      description: "Professional guidance to accelerate your career growth and development."
    },
    {
      icon: Building2,
      title: "Employer Solutions",
      description: "Comprehensive recruitment services for businesses of all sizes."
    },
    {
      icon: Award,
      title: "Skills Development",
      description: "Training programs to enhance your professional capabilities."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Tech Solutions Ltd",
      content: "Career Companion helped me transition from marketing to tech. Their coaching program was invaluable!"
    },
    {
      name: "Michael Chen",
      role: "Project Manager",
      company: "Global Industries",
      content: "Found my dream job within 3 weeks. The platform's job matching is incredibly accurate."
    },
    {
      name: "Emily Rodriguez",
      role: "Data Analyst",
      company: "Analytics Pro",
      content: "The career guidance and interview preparation made all the difference in landing my role."
    }
  ];

  const stats = [
    { label: "People Helped", value: "10,000+" },
    { label: "Job Placements", value: "5,000+" },
    { label: "Partner Companies", value: "500+" },
    { label: "Success Rate", value: "95%" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Banner Ad */}
      <div className="w-full flex justify-center py-4 bg-muted/30">
        <AdBanner width={970} height={90} position="top" />
      </div>

      <div className="container mx-auto px-4">
        {/* Desktop Side Ads */}
        <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-10">
          <AdBanner width={160} height={600} position="side" />
        </div>
        <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
          <AdBanner width={160} height={600} position="side" />
        </div>

        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Career Journey Starts Here
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Empowering professionals with the tools, connections, and guidance needed to achieve career excellence and personal growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Find Jobs
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Get Coaching
            </Button>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To bridge the gap between talented professionals and exceptional career opportunities through innovative solutions.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle>Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become the leading platform where careers flourish and businesses find their perfect talent matches.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Integrity, Excellence, Innovation, and Empowerment guide everything we do in serving our community.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
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
        </section>

        {/* Statistics */}
        <section className="py-16 bg-primary/5 rounded-2xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="relative">
              <CardContent className="p-8">
                <div className="text-center">
                  <p className="text-lg italic mb-6">"{testimonials[currentTestimonial].content}"</p>
                  <div>
                    <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Button variant="ghost" size="icon" onClick={prevTestimonial}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Button variant="ghost" size="icon" onClick={nextTestimonial}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentTestimonial ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>
                Get the latest job opportunities and career tips delivered to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="Enter your email address" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Quick Links */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            <Button variant="outline" size="lg">
              LinkedIn
            </Button>
            <Button variant="outline" size="lg">
              Facebook
            </Button>
            <Button variant="outline" size="lg">
              Newsletter
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;