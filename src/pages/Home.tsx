import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AdBanner from "@/components/layout/AdBanner";
import { Users, Target, Award, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { AnimatedNumber } from "@/components/ui/animate-number";
import MailChimpSubscribe from "@/components/ui/mailChimp";
import AnimatedCard from "@/components/layout/AnimatedCard";
import m1 from "@/assets/yococa-ent/m1.jpeg";
import m2 from "@/assets/yococa-ent/m2.jpeg";
import m3 from "@/assets/yococa-ent/m3.jpeg";
import m4 from "@/assets/yococa-ent/m4.jpeg";
import m5 from "@/assets/yococa-ent/m5.jpeg";
import m6 from "@/assets/yococa-ent/m6.jpeg";
import m7 from "@/assets/yococa-ent/m7.jpeg";
import m8 from "@/assets/yococa-ent/m8.jpeg";
import m9 from "@/assets/yococa-ent/m9.jpeg";
import m10 from "@/assets/yococa-ent/m10.jpeg";
import m11 from "@/assets/yococa-ent/m11.jpeg";
import m12 from "@/assets/yococa-ent/m12.jpeg";
import useContent from "@/hooks/useContent";
import ServiceCard from "@/components/ui/service_card";

const yococaEnt = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12];

const Home = () => {

  const [scrollY, setScrollY] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const { getTestimonialsState } = useContent();
  useScrollAnimation();
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % yococaEnt.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
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

  const testimonials = getTestimonialsState.data || [
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
    { label: "People Helped", value: "5,000+" },
    { label: "Job Placements", value: "5,000+" },
    { label: "Partner Companies", value: "10+" },
    { label: "Success Rate", value: "75%" }
  ];


  // Function to update the state on scroll
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    // 1. Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // 2. Clean up the event listener when the component unmounts
    // This prevents memory leaks and unintended behavior.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div className="min-h-screen flex-col">
    <div className=" w-full flex justify-center items-center ">
      <AdBanner position="top" className="py-2" />
    </div>
    <div className="flex justify-center items-start w-full">
      {/* <div className={` border-2 min-h-[70vh] max-lg:hidden ${scrollY > 100 ? 'animate-slide-in-left fixed left-0 top-50 bottom-0 z-10' : 'animate-slide-out-left'}`}>
        <AdBanner position="side" />
      </div> */}
      <div className="w-full  border-white min-h-screen">
        {/* hero section */}
        <section
          className="py-20 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(51, 31, 31, 0.4), rgba(0, 0, 0, 0.6)), url(${yococaEnt[selectedImage]})`,
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
                  Where Careers Take Shape, and Integrity Opens Doors
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
        {/* ///// */}
        {/* <ImageGrid images={yococaEnt}/> */}

        {/* Corporate Vision Section */}
        <section className="py-16 px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative lg:order-first fade-in-left">
              <img
                src={yococaEnt[selectedImage]}
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
        <section className="py-16 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center scale-in hover:shadow-lg hover:scale-105">
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
            <Card className="text-center scale-in hover:shadow-lg hover:scale-105  ">
              <CardHeader>
                <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle>Vision</CardTitle>
              </CardHeader>
              <CardContent >
                <p className="text-muted-foreground">
                  To become Africa's leading career empowerment hub, recognized for bridging talent with opportunities, transforming recruitment for organizations and inspiring professionals to grow with confidence and purpose.
                </p>
              </CardContent>
            </Card>
            <AnimatedCard />


          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12 fade-in-up">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <ServiceCard service={service} inbox={index} Icon={Icon}/>
              //  <div className="relative px-4">
              //   <div className="w-full h-10 absolute z-10 right-0 left-0 shadow-lg rounded-tr-[12px] rounded-bl-[12px]  py-[2px] top-5 bg-primary">
              //     <div className="border-y h-full border-dashed rounded-tr-[13px] rounded-bl-[13px] flex justify-center items-center text-white ">
              //      <p className=" uppercase">{service.title}</p>
              //     </div>
              //   </div>
              //   <div className="h-5 w-4 bg-primary  absolute rounded-br-lg  z-8 right-0 top-12 p-[2px]">
              //     <div className="h-full w-full border-dashed border-b rounded-br-lg  "></div>
              //   </div>
              //   <div className="h-5 w-4 bg-primary absolute rounded-tl-lg  z-8 left-0 top-2"></div>
              //    <Card key={index} className="text-center hover:shadow-lg transition-shadow fade-in-up ">

              //     <CardHeader>
              //       <Icon className="h-12 w-12 mt-10 text-primary mx-auto mb-4" />
              //       <CardTitle className="text-lg">{service.title}</CardTitle>
              //     </CardHeader>
              //     <CardContent>
              //       <p className="text-sm text-muted-foreground">{service.description}</p>
              //     </CardContent>
              //     <CardFooter className="flex justify-center items-center"><Button variant="outline" className="w-full">Request Service</Button></CardFooter>
              //   </Card>
              //  </div>
              );
            })}
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-primary/5 rounded-2xl fade-in-up ">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center scale-in">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 fade-in-up">What Our Users Say</h2>
          <div className="relative  overflow-hidden">
            <div className="flex gap-4 w-fit animate-loop-scroll">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="flex-none max-w-80  hover:shadow-lg transition-shadow">
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
          </div>
        </section>
        {/* Newsletter Signup */}
        <MailChimpSubscribe />

      </div>
      <div className={`  border-white min-h-[70vh] max-lg:hidden ${scrollY > 100 ? 'fixed animate-slide-in-right  right-0 top-50 bottom-0 z-10' : 'animate-slide-out-right'}`}>
        <AdBanner position="side"  />
      </div>

    </div>
  </div>;
}

export default Home;