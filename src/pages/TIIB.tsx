

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdBanner from "@/components/layout/AdBanner";
import { Target, Users, Globe, Building2, Share2, Clock, User, Facebook, X, Youtube, Newspaper, Linkedin, Twitter, Instagram } from "lucide-react";
import MailchimpSubscribe from "@/components/ui/mailChimp";
import logo from "@/assets/logo/tiib1.png";
import useArticle from "@/hooks/useArticle";
import { useEffect, useState } from "react";
import { CardSkeleton } from "./Coaching";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Award } from "lucide-react";
import ImageGrid from "@/components/ui/image_grid";
import img from '../assets/tiib-img.jpeg'
import ContactButton from "@/components/ui/support";




interface Blogs {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  readTime: string;
  catigory: string;
  createdAt: Date;
}

const TIIB = () => {
  const [article, setArticls] = useState<Blogs[]>([]);
  const { articleState } = useArticle();
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);




  // Function to update the state on scroll
  const handleScroll = () => {
    setScrollY(window.scrollY);
    // console.log('Croooooooooooooooooooooooool',window.PageTransitionEvent )
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
  const services = [
    {
      icon: Building2,
      title: "For Organizations",
      description:
        "Training, consulting, assessments, and certifications to enhance ethical practices in your organization.",
    },
    {
      icon: Users,
      title: "For Youth",
      description:
        "Leadership programs, mentorship, community service, and workshops focused on integrity development.",
    },
    {
      icon: Globe,
      title: "For Society",
      description:
        "Public awareness campaigns, policy advocacy, research, and collaborative initiatives with NGOs.",
    },
  ];


  const navigation = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Career Coaching", href: "/coaching" },
    { name: "For Employers", href: "/employers" },
    { name: "TIIB", href: "/tiib" },
    { name: "Contact", href: "/contact" },
  ];
  useEffect(() => {
    // Only update local articles when articleState.data changes
    if (articleState?.data && Array.isArray(articleState.data)) {
      const data = articleState.data as any[];
      const filter = data.filter((a) => a.type === 'tiib');
      setArticls(filter as Blogs[]);
    } else if (!articleState?.loading) {
      // No data and not loading -> ensure empty list
      setArticls([]);
    }
  }, [articleState?.data, articleState?.loading]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-20 md:pb-0">
    {scrollY > 100 && <ContactButton/>}
      <div className="w-full h-8 bg-secondary gap-2 text-white flex justify-end items-center p-2">
        <Linkedin size={18} /><Facebook size={18} /><Twitter size={18} /><Instagram size={18} /> </div>
      <div className="h-[90vh]  w-full" style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // filter: 'blur(5px)',
      }}>
        <div className="w-full flex flex-col justify-evenly items-center h-full bg-secondary/20">
          <img src={logo} alt="tiib-logo" className="h-40 w-40 mx-auto my-4 hover:bg-secondary hover:scale-105" />
          {/* Header */}
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl font-bold mb-4">
              The Institute of Integrity Building (TIIB)
            </h1>
            <p className="text-xl  max-w-3xl mx-auto">
              TIIB promotes integrity across organizations, youth, and society. A nonprofit organization
              aimed at bringing forth men and women who can learn and adhere to sound moral and ethical values.
            </p>
            {/* <p className="text-lg max-w-3xl mx-auto mt-4">
              Contact us: <a href="tel:+237679116511" className="text-primary bg-white hover:underline">+237 679 116 511</a>
            </p> */}
          </div>
          {/* Na bar */}
          <div className="flex w-full justify-center items-center">
            <div className={` py-2  border-b  flex justify-between items-center ${scrollY > 250 ? 'fixed transition-all duration-600 top-0 bg-white  right-0 left-0 w-full rounded-2 seft-center  px-4' : 'w-[80%] bg-secondary/20 text-white mb-2  animate-slide-in   rounded-full px-6'}`}>
              <div className="h-10 w-10 rounded bg-muted">
                <img src={`${logo}`} alt="logo" className="rounded" />


              </div>
              <nav className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.href
                      ? "text-secondary underline"
                      : "text-whitesmoke"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (<Link to={user.userType == 'employer' ? '/employer-dashboard' : '/job-seeker-portal'} className="py-1 px-4  hover:text-secondary ">Portal</Link>) : (<Link to={'/auth'} className="py-1 px-4 rounded-sm hover:text-primary ">
                  Sign In
                </Link>)}
              </nav>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 mt-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/tiib' && 'text-secondary'} ${location.pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                          }`}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {user ? (<Link onClick={() => setIsOpen(false)} to={user.userType == 'employer' ? '/employer-dashboard' : '/job-seeker-portal'} className="py-1 px-4 rounded-sm text-white bg-primary ">Portal</Link>) : (<Link to={'/auth'} className="py-1 px-4 rounded-sm text-white bg-primary ">
                      Sign In
                    </Link>)}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>

        </div>

      </div>

      <div className="w-full flex justify-center pb-4 ">
        <AdBanner position="inline" />
      </div>

      <div className="container mt-16 mx-auto px-4 pb-8">


        {/* Mission, Vision, Values */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative  hover:scale-105 hover:shadow-lg hover:transition-all hover:duration-600 pr-2">
              <div className="h-10 w-[140px] bg-secondary  rotate-45 absolute top-2 right-[-2px] p-[2px]">
                <div className="border border-dashed border-white flex justify-center items-center h-full w-full">
                  <p className="text-white">Our Mission</p>

                </div>

              </div>
              <Card className="text-center bg-white text-gray-800 border-secondary shadow-md ">
                <CardHeader>
                  <Target className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle className="text-secondary">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    To promote peace, justice, and transparency at all levels to ease conflict resolutions
                    in organizations, countries, and the world at large, leading to a better peaceful,
                    secure and war-free world tomorrow.
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card className="text-center bg-white text-gray-800 border-secondary  hover:scale-105 hover:shadow-lg  hover:transition-all hover:duration-600 shadow-md ">
              <div className="w-full flex justify-center mt-[-30px] items-center">
                <div className=" bg-white  border flex justify-center items-center h-16 w-16 border-secondary rounded-full">
                  <Users className="h-10 w-10 text-teal-500 mx-auto " />
                </div>
              </div>
              <CardHeader>

                <CardTitle className="text-secondary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <Users className="h-12 w-12 text-teal-500 mx-auto mb-4" /> */}

                <p className="text-gray-600">
                  To be Africa's leading institute for integrity building, fostering a generation that
                  adheres to sound moral and ethical values without fear of ridicule, creating lasting
                  positive change across organizations, youth, and society.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center bg-white text-gray-800 border-secondary hover:scale-105 hover:shadow-lg  hover:transition-all hover:duration-600 shadow-md">
              <div className="w-full flex justify-center mt-[-30px] items-center">
                <div className=" bg-white  border flex justify-center items-center h-16 w-16 border-secondary rounded-full">
                <Award className="h-10 w-10 text-secondary mx-auto " />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-secondary">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Integrity, Excellence, Innovation, Collaboration, and Impact guide our approach to
                  building ethical leaders and sustainable organizations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services */}
        <section className="mb-16 " >
          <h2 className="text-3xl font-bold text-center mb-12 ">Our Services</h2>
          <div className="flex flex-col lg:flex-row gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                //  <ServiceCard service={service} Icon={Icon} index={index}/>
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow bg-white text-gray-800 border-0 border-secondary shadow-md"
                >
                  <CardHeader>
                    <Icon className="h-12 w-12 text-secondary mx-auto mb-4" />
                    <CardTitle className="text-lg text-secondary">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
        {/* Social  Impact */}
        <section className="mb-16 min-h-[300px] flex flex-col justify-center rounded-sm items-center bg-secondary/50">
          <h2 className="text-3xl text-white font-bold text-center mb-12 ">Social Impacts</h2>

        </section>
        {/* Inline Ad */}
        <div className="flex justify-center mb-12">
          <AdBanner position="inline" />
        </div>

        {/* Blog Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Latest Insights</h2>
          {
            article.length == 0 && (
              <Card className="flex justify-center items-center">
                <CardContent>
                  <CardHeader>No Articles</CardHeader>
                </CardContent>
              </Card>
            )
          }
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              articleState.loading && Array(3)
                .fill(0)
                .map((_, i) => <CardSkeleton key={i} />)
            }

            {article.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-lg transition-shadow bg-white text-gray-800 border-secondary shadow-md"
              >
                <div className="h-48 bg-secondary flex items-center justify-center">
                  <ImageGrid images={post['image']} />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="outline"
                      className="text-secondary border-secondary"
                    >
                      {post['category']}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-secondary hover:bg-secondary"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg leading-tight text-secondary">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3 text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <Link to={`/tiib/article/${post.id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full text-secondary border-secondary0 hover:bg-secondary0 hover:text-white"
                    >
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <MailchimpSubscribe />

        {/* Contact Section */}
        <section className="mb-16">
          <Card className="max-w-4xl mx-auto bg-white text-gray-800 border-secondary shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-secondary">Get Involved with TIIB</CardTitle>
              <CardDescription className="text-gray-600">
                Partner with us to build integrity in your organization or community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold mb-2">Training Programs</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Customized integrity and ethics training for your organization.
                  </p>
                  <Button className="bg-secondary border-secondary0 hover:bg-secondary0 hover:text-white">
                    Learn More
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Research Collaboration</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Partner with us on groundbreaking integrity research projects.
                  </p>
                  <Button className="bg-secondary  border-secondary0 hover:bg-secondary0 hover:text-white">
                    Partner With Us
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Speaking Engagements</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Invite our experts to speak at your events and conferences.
                  </p>
                  <Button className="bg-secondary border-secondary0 hover:bg-secondary0 hover:text-white">
                    Book Speaker
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Social Media Links */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-secondary">Connect with TIIB</h2>
          <div className="flex justify-center space-x-4">
            <Button
              variant="ghost"
              size="lg"
              className="text-secondary rounded-full border-secondary0 hover:bg-secondary0 hover:text-white"
            >
              <Facebook />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-secondary border-secondary0 hover:bg-secondary0 hover:text-white"
            >
              <X />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-secondary border-secondary0 hover:bg-secondary0 hover:text-white"
            >
              <Youtube />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-secondary border-secondary0 hover:bg-secondary0 hover:text-white"
            >
              <Newspaper />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TIIB;
