

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdBanner from "@/components/layout/AdBanner";
import { Link } from "react-router-dom";
import { Target, Heart, Award, Users, BookOpen, Share2, Clock, User } from "lucide-react";
import MailchimpSubscribe from "@/components/ui/mailChimp";
import logo from "@/assets/logo/tiib-logo.png";

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
  const services = [
    {
      icon: Heart,
      title: "Ethics Training",
      description:
        "Comprehensive programs on professional ethics and moral decision-making in the workplace.",
    },
    {
      icon: Award,
      title: "Integrity Certification",
      description:
        "Industry-recognized certifications that validate your commitment to ethical practices.",
    },
    {
      icon: Users,
      title: "Leadership Development",
      description:
        "Building ethical leaders who inspire trust and drive positive organizational change.",
    },
    {
      icon: BookOpen,
      title: "Research & Publications",
      description:
        "Cutting-edge research on integrity, ethics, and their impact on business success.",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Building Trust in the Digital Age",
      excerpt:
        "Exploring how organizations can maintain integrity and build trust in an increasingly digital world.",
      author: "Dr. Adebayo Ogundimu",
      readTime: "7 min read",
      date: "August 12, 2024",
      category: "Digital Ethics",
    },
    {
      id: 2,
      title: "The ROI of Ethical Leadership",
      excerpt:
        "Research findings on how ethical leadership practices directly impact organizational performance and profitability.",
      author: "Prof. Ngozi Okafor",
      readTime: "10 min read",
      date: "August 8, 2024",
      category: "Leadership",
    },
    {
      id: 3,
      title: "Implementing Integrity in SMEs",
      excerpt:
        "Practical strategies for small and medium enterprises to embed integrity into their business operations.",
      author: "Dr. Kemi Adeleke",
      readTime: "6 min read",
      date: "August 5, 2024",
      category: "Business Strategy",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-20 md:pb-0">
      {/* Top Banner Ad */}
      <div className="w-full flex justify-center pb-4 bg-green-50">
        <AdBanner width={970} height={90} position="top" />
      </div>

      <div className="flex w-full bg-white justify-center">
        <img src={logo} alt="tiib-logo" className="h-40 w-40 mx-auto my-4" />
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-400">
            The Institute of Integrity Building
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fostering ethical leadership and building integrity in professional environments across
            Africa and beyond.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-white text-gray-800 border-green-200 shadow-md">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-blue-400">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To develop and promote integrity-based leadership practices that transform
                  organizations and communities across Africa, creating sustainable positive impact.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center bg-white text-gray-800 border-green-200 shadow-md">
              <CardHeader>
                <Users className="h-12 w-12 text-teal-500 mx-auto mb-4" />
                <CardTitle className="text-blue-400">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To be the leading institute for integrity building in Africa, recognized globally
                  for excellence in ethical leadership development and organizational transformation.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center bg-white text-gray-800 border-green-200 shadow-md">
              <CardHeader>
                <Award className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-blue-400">Our Values</CardTitle>
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
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow bg-white text-gray-800 border-green-200 shadow-md"
                >
                  <CardHeader>
                    <Icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <CardTitle className="text-lg text-blue-400">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{service.description}</p>
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
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">Latest Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-lg transition-shadow bg-white text-gray-800 border-green-200 shadow-md"
              >
                <div className="h-48 bg-green-50 flex items-center justify-center">
                  <span className="text-gray-400">Research Image</span>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="outline"
                      className="text-blue-600 border-green-400"
                    >
                      {post.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:bg-green-50"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg leading-tight text-blue-400">{post.title}</CardTitle>
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
                      className="w-full text-blue-600 border-green-500 hover:bg-green-500 hover:text-white"
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
          <Card className="max-w-4xl mx-auto bg-white text-gray-800 border-green-200 shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-400">Get Involved with TIIB</CardTitle>
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
                  <Button className="text-blue-600 border-green-500 hover:bg-green-500 hover:text-white">
                    Learn More
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Research Collaboration</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Partner with us on groundbreaking integrity research projects.
                  </p>
                  <Button className="text-blue-600 border-green-500 hover:bg-green-500 hover:text-white">
                    Partner With Us
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Speaking Engagements</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Invite our experts to speak at your events and conferences.
                  </p>
                  <Button className="text-blue-600 border-green-500 hover:bg-green-500 hover:text-white">
                    Book Speaker
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Social Media Links */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">Connect with TIIB</h2>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="lg"
              className="text-blue-600 border-green-500 hover:bg-green-500 hover:text-white"
            >
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-blue-600 border-green-500 hover:bg-green-500 hover:text-white"
            >
              Twitter
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-blue-600 border-green-500 hover:bg-green-500 hover:text-white"
            >
              YouTube
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-blue-600 border-green-500 hover:bg-green-500 hover:text-white"
            >
              Newsletter
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TIIB;
