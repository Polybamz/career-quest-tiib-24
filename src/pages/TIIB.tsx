import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdBanner from "@/components/layout/AdBanner";
import { Link } from "react-router-dom";
import { Target, Heart, Award, Users, BookOpen, Share2, Clock, User } from "lucide-react";
import MailchimpSubscribe from "@/components/ui/mailChimp";


interface Blogs {
  id:string;
  title:string;
  excerpt:string;
  body: string;
  author:string;
  readTime:string;
  catigory:string;
  createdAt: Date;

}

const TIIB = () => {
  const services = [
    {
      icon: Heart,
      title: "Ethics Training",
      description: "Comprehensive programs on professional ethics and moral decision-making in the workplace."
    },
    {
      icon: Award,
      title: "Integrity Certification",
      description: "Industry-recognized certifications that validate your commitment to ethical practices."
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "Building ethical leaders who inspire trust and drive positive organizational change."
    },
    {
      icon: BookOpen,
      title: "Research & Publications",
      description: "Cutting-edge research on integrity, ethics, and their impact on business success."
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Building Trust in the Digital Age",
      excerpt: "Exploring how organizations can maintain integrity and build trust in an increasingly digital world.",
      author: "Dr. Adebayo Ogundimu",
      readTime: "7 min read",
      date: "August 12, 2024",
      category: "Digital Ethics"
    },
    {
      id: 2,
      title: "The ROI of Ethical Leadership",
      excerpt: "Research findings on how ethical leadership practices directly impact organizational performance and profitability.",
      author: "Prof. Ngozi Okafor",
      readTime: "10 min read",
      date: "August 8, 2024",
      category: "Leadership"
    },
    {
      id: 3,
      title: "Implementing Integrity in SMEs",
      excerpt: "Practical strategies for small and medium enterprises to embed integrity into their business operations.",
      author: "Dr. Kemi Adeleke",
      readTime: "6 min read",
      date: "August 5, 2024",
      category: "Business Strategy"
    }
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
          <h1 className="text-4xl font-bold mb-4">The Institute of Integrity Building</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fostering ethical leadership and building integrity in professional environments
            across Africa and beyond.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To develop and promote integrity-based leadership practices that transform
                  organizations and communities across Africa, creating sustainable positive impact.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the leading institute for integrity building in Africa, recognized globally
                  for excellence in ethical leadership development and organizational transformation.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Integrity, Excellence, Innovation, Collaboration, and Impact guide our approach
                  to building ethical leaders and sustainable organizations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
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

        {/* Inline Ad */}
        <div className="flex justify-center mb-12">
          <AdBanner width={728} height={90} position="inline" />
        </div>

        {/* Blog Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow ">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Research Image</span>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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
                    <Button variant="outline" className="w-full">
                      Read More
                    </Button>
                  </Link>

                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <MailchimpSubscribe/>
            

        {/* Contact Section */}
        <section className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Get Involved with TIIB</CardTitle>
              <CardDescription>
                Partner with us to build integrity in your organization or community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold mb-2">Training Programs</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customized integrity and ethics training for your organization.
                  </p>
                  <Button variant="outline">Learn More</Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Research Collaboration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Partner with us on groundbreaking integrity research projects.
                  </p>
                  <Button variant="outline">Partner With Us</Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Speaking Engagements</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Invite our experts to speak at your events and conferences.
                  </p>
                  <Button variant="outline">Book Speaker</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Social Media Links */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6">Connect with TIIB</h2>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="lg">
              LinkedIn
            </Button>
            <Button variant="outline" size="lg">
              Twitter
            </Button>
            <Button variant="outline" size="lg">
              YouTube
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

export default TIIB;