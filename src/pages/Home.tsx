import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AdBanner from "@/components/layout/AdBanner";
import { Users, Target, Award, Briefcase, GraduationCap, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import officeTeamImage from "@/assets/office-team.jpg";
import officeMeetingImage from "@/assets/office-meeting.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useScrollAnimation();

  const services = [
    {
      icon: Briefcase,
      title: "Professional Writing Services",
      description: "ATS-compliant CVs, cover letters, and professional documents for national and international applications."
    },
    {
      icon: GraduationCap,
      title: "Personal Statements & Scholarship Applications",
      description: "Academic admissions, scholarships, fellowships and visa application documents crafted professionally."
    },
    {
      icon: Building2,
      title: "LinkedIn Profile Creation & Optimization",
      description: "Professional LinkedIn profiles that attract recruiters and strengthen personal brands globally."
    },
    {
      icon: Award,
      title: "Job Coaching & Career Counseling",
      description: "Personalized coaching, career orientation, mock interviews, and career growth strategies."
    },
    {
      icon: Target,
      title: "Recruitment & Job Search Assistance",
      description: "Connect with verified opportunities and trusted recruitment services for employers."
    },
    {
      icon: Users,
      title: "Job Profiles Creation",
      description: "Professional profiles for INSPIRA, UNvi, Canadian Express Entry and other platforms."
    }
  ];

  const testimonials = [
    {
      name: "A satisfied client",
      role: "International Development Policy Specialist",
      company: "Ministry of External Relations, Cameroon",
      content: "Thanks very much for your patience and good work. The reason why so many of my friends will be recommended to you as well for their CVs. I am satisfied with your work."
    },
    {
      name: "Satisfied client",
      role: "Accountant",
      company: "PNDP, SWR Cameroon",
      content: "I was able to secure the job I applied for. You really put your heart in what you do. I must say you exceed the expectations!"
    },
    {
      name: "Satisfied client",
      role: "Mathematics Teacher",
      company: "USA",
      content: "The Lord Jesus Christ finally opened me and my husband a door to the USA. We are currently teaching maths in the USA."
    },
    {
      name: "Satisfied client",
      role: "Bank and Loan Manager",
      company: "UK",
      content: "The LinkedIn you made me is amazing. It started helping me get so many jobs while I was still in Cameroon. And finally I travelled to the UK."
    },
    {
      name: "Satisfied client",
      role: "Postgraduate Student",
      company: "Canada",
      content: "I want to thank you so much for the CV, cover letter and personal statement. I am pleased to say my admission was granted."
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
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background flex pb-20 md:pb-0">
      <div className="w-[200px]"></div>

      <div className="container mx-auto px-4">
                <AdBanner width={1000} height={150} position="top" isHidden={true} />

        <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-[5]">
          <AdBanner width={160} height={400} position="side" isHidden={true} />
        </div>
        <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-[5]">
          <AdBanner width={160} height={400} position="side" isHidden={true} />
        </div>

        {/* Hero Section */}
        <section 
          className="py-20 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${officeTeamImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left fade-in-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                  Your Career Companion – Where Careers Take Shape, and Integrity Opens Doors
                </h1>
                <p className="text-xl text-white/90 mb-8 drop-shadow-md">
                  We are more than just a job board – we are a career growth ecosystem committed to connecting ambitious job seekers with verified opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to={'/jobs'}>
                    <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90 text-white shadow-lg">
                    Find Jobs
                  </Button>
                  </Link>
                    <Link to={'/coaching'}>
                    <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary shadow-lg">
                    Get Coaching
                  </Button>
                    </Link>
                  
                </div>
              </div>
              <div className="relative fade-in-right">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Career?</h3>
                  <p className="text-white/90 mb-6">Join thousands of professionals who have found their dream jobs through our platform.</p>
                  <div className="space-y-3">
                    <div className="flex items-center text-white/90">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span>Personalized job matching</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span>Expert career coaching</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span>Access to top employers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Vision Section */}
        <section className="py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative lg:order-first fade-in-left">
              <img 
                src={officeMeetingImage} 
                alt="Corporate meeting with professionals discussing strategy" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="text-center lg:text-left fade-in-right">
              <h2 className="text-3xl font-bold mb-6">Building Tomorrow's Workforce Today</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We connect ambitious professionals with forward-thinking companies, creating partnerships that drive innovation and growth across industries.
              </p>
              <p className="text-muted-foreground mb-8">
                Our comprehensive approach combines cutting-edge technology with personalized human insight to ensure every career move is a step toward success.
              </p>
              <Link to={'/'}>
               <Button variant="outline" size="lg">
                Learn About Our Approach
              </Button>
              </Link>
             
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center scale-in">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To empower job seekers and professionals with integrity and excellence by providing trusted recruitment solutions, world-class career services and personalized coaching that open doors to national and international opportunities.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center scale-in ">
              <CardHeader>
                <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle>Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become Africa's leading career empowerment hub, recognized for bridging talent with opportunities, transforming recruitment for organizations and inspiring professionals to grow with confidence and purpose.
                </p>
              </CardContent>
            </Card>
            <Card className=" scale-in max-h-[400px] overflow-scroll">
              <CardHeader>
                <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle className="text-center">Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-start">
                  <strong>Integrity – </strong> We stay true to honesty and transparency in all we do.
                </p>
                <p className="text-muted-foreground text-start">
                  <strong>Excellence – </strong> We deliver results that meet global standards.
                </p>
                <p className="text-muted-foreground text-start">
                  <strong>Empowerment – </strong> We equip individuals and businesses with tools for success.
                </p>
                <p className="text-muted-foreground text-start">
                  <strong>Growth – </strong> We promote continuous learning and career development.
                </p>
                <p className="text-muted-foreground text-start">
                  <strong>Impact – </strong> We measure success by the lives transformed and opportunities created.
                </p>
                <p className="text-muted-foreground text-start">
                  <strong>Availability – </strong> We are known for our ever-present nature, always ready to respond to you and provide assistance when you need it.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 fade-in-up">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow fade-in-up">
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
        <section className="py-16 bg-primary/5 rounded-2xl fade-in-up">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center scale-in">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 fade-in-up">What Our Users Say</h2>
          <div className="max-w-6xl mx-auto fade-in-up">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <p className="text-sm italic mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {testimonials.length > 3 && (
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {testimonials.slice(3, 5).map((testimonial, index) => (
                  <Card key={index + 3} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <p className="text-sm italic mb-4">"{testimonial.content}"</p>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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

        
      </div>
    </div>
  );
};

export default Home;