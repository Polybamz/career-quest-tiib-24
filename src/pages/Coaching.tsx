import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdBanner from "@/components/layout/AdBanner";
import { Clock, User, Share2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Coaching = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Ace Your Next Job Interview",
      excerpt: "Master the art of interviewing with these proven strategies and techniques that will set you apart from other candidates.",
      author: "Dr. Sarah Johnson",
      readTime: "8 min read",
      date: "August 10, 2024",
      category: "Interview Tips",
      image: "/placeholder.svg",
      tags: ["Interview", "Career Tips", "Professional Development"]
    },
    {
      id: 2,
      title: "Building a Standout Resume in 2024",
      excerpt: "Learn how to craft a resume that catches recruiters' attention in today's competitive job market.",
      author: "Michael Chen",
      readTime: "6 min read",
      date: "August 8, 2024",
      category: "Resume Writing",
      image: "/placeholder.svg",
      tags: ["Resume", "Job Search", "Career"]
    },
    {
      id: 3,
      title: "Networking: Your Secret Weapon for Career Growth",
      excerpt: "Discover how to build meaningful professional relationships that can accelerate your career advancement.",
      author: "Emily Rodriguez",
      readTime: "10 min read",
      date: "August 5, 2024",
      category: "Networking",
      image: "/placeholder.svg",
      tags: ["Networking", "Career Growth", "Professional Relationships"]
    },
    {
      id: 4,
      title: "Transitioning to a New Career: A Complete Guide",
      excerpt: "Navigate career changes successfully with our comprehensive roadmap for professional transitions.",
      author: "David Kim",
      readTime: "12 min read",
      date: "August 2, 2024",
      category: "Career Change",
      image: "/placeholder.svg",
      tags: ["Career Change", "Professional Development", "Strategy"]
    },
    {
      id: 5,
      title: "Salary Negotiation: Getting What You're Worth",
      excerpt: "Master the art of salary negotiation with confidence-building techniques and proven strategies.",
      author: "Lisa Thompson",
      readTime: "7 min read",
      date: "July 30, 2024",
      category: "Salary",
      image: "/placeholder.svg",
      tags: ["Salary", "Negotiation", "Career Advancement"]
    },
    {
      id: 6,
      title: "Remote Work Best Practices for Career Success",
      excerpt: "Thrive in remote work environments with tips for productivity, communication, and career development.",
      author: "James Wilson",
      readTime: "9 min read",
      date: "July 28, 2024",
      category: "Remote Work",
      image: "/placeholder.svg",
      tags: ["Remote Work", "Productivity", "Work-Life Balance"]
    }
  ];

  const categories = ["All", "Interview Tips", "Resume Writing", "Networking", "Career Change", "Salary", "Remote Work"];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Banner Ad */}
      <div className="w-full flex justify-center py-4 bg-muted/30">
        <AdBanner width={970} height={90} position="top" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Career Coaching & Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert guidance and insights to help you navigate your career journey,
            develop new skills, and achieve your professional goals.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Inline Ad */}
        <div className="flex justify-center mb-8">
          <AdBanner width={728} height={90} position="inline" />
        </div>

        {/* Featured Article */}
        <Card className="mb-12 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className="h-64 md:h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Featured Image</span>
              </div>
            </div>
            <div className="md:w-2/3 p-6">
              <Badge className="mb-3">{blogPosts[0].category}</Badge>
              <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-muted-foreground mb-4 text-lg">{blogPosts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <Button>
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Article Image</span>
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
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link to={`/coaching/article/${post.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Read Article                                    </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-12 text-center">
          <CardHeader>
            <CardTitle>Stay Updated with Career Tips</CardTitle>
            <CardDescription>
              Get weekly career insights, job market trends, and professional development tips delivered to your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-input rounded-md"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Coaching;