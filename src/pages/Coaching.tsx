import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdBanner from "@/components/layout/AdBanner";
import { Clock, User, Share2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ImageGrid from "@/components/ui/image_grid";
import useArticle from "@/hooks/useArticle";

const Coaching = () => {
  const { articleState } = useArticle();
  const [activeCategory, setActiveCategory] = useState("All");
 const [showModel, setShowModel] = useState<boolean>(false)
  const loading = articleState.loading; // assuming your hook exposes this

  const fallbackArticles = [
    {
      id: 1,
      title: "How to Ace Your Next Job Interview",
      excerpt:
        "Master the art of interviewing with these proven strategies and techniques that will set you apart from other candidates.",
      author: "Dr. Sarah Johnson",
      readTime: "8 min read",
      date: "August 10, 2024",
      category: "Interview Tips",
      image: ["/placeholder.svg"],
      tags: ["Interview", "Career Tips", "Professional Development"],
    },
    {
      id: 2,
      title: "Building a Standout Resume in 2024",
      excerpt:
        "Learn how to craft a resume that catches recruiters' attention in today's competitive job market.",
      author: "Michael Chen",
      readTime: "6 min read",
      date: "August 8, 2024",
      category: "Resume Writing",
      image: ["/placeholder.svg"],
      tags: ["Resume", "Job Search", "Career"],
    },
    {
      id: 3,
      title: "Networking: Your Secret Weapon for Career Growth",
      excerpt:
        "Discover how to build meaningful professional relationships that can accelerate your career advancement.",
      author: "Emily Rodriguez",
      readTime: "10 min read",
      date: "August 5, 2024",
      category: "Networking",
      image: ["/placeholder.svg"],
      tags: ["Networking", "Career Growth", "Professional Relationships"],
    },
  ];

  const articles = articleState?.data?.length ? articleState.data : fallbackArticles;
  const categories = ["All", ...new Set(articles.map((a) => a.category))];
  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featured = articles[0];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* === Top Banner === */}
      <div className="w-full flex justify-center py-4 bg-muted/30">
        <AdBanner position="top" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* === Page Header === */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Career Coaching & Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert guidance and insights to help you navigate your career journey, develop
            new skills, and achieve your professional goals.
          </p>
        </header>

        {/* === Category Filter === */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((category) => (
            <Badge
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* === Inline Ad === */}
        <div className="flex justify-center mb-8">
          <AdBanner position="inline" />
        </div>

        {/* === Featured Article or Shimmer === */}
        {loading ? (
          <FeaturedSkeleton />
        ) : (
          featured && (
            <Card className="mb-12 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <ImageGrid images={featured.image} />
                </div>
                <div className="md:w-2/3 p-6">
                  <Badge className="mb-3">{featured.category}</Badge>
                  <h2 className="text-3xl font-bold mb-4">{featured.title}</h2>
                  <p className="text-muted-foreground mb-4 text-lg">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" /> {featured.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {featured.readTime}
                      </span>
                    </div>
                    <Link to={`/coaching/article/${featured.id}`}>
                      <Button>
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          )
        )}

        {/* === Article Grid or Shimmer === */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, i) => <CardSkeleton key={i} />)
            : filteredArticles.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
                >
                  <div className="min-h-32 bg-muted flex items-center justify-center p-2">
                    <ImageGrid images={post.image} />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg leading-tight line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" /> {post.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {post.readTime}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link to={`/coaching/article/${post.id}`} className="block">
                      <Button variant="outline" className="w-full">
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* === Newsletter === */}
        <Card className="mt-16 text-center">
          <CardHeader>
            <CardTitle>Stay Updated with Career Tips</CardTitle>
            <CardDescription>
              Get weekly insights, job market trends, and professional development tips
              delivered straight to your inbox.
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

//
// --- Shimmer Components ---
//

const shimmer = "animate-pulse bg-muted rounded-md";

const FeaturedSkeleton = () => (
  <Card className="mb-12 overflow-hidden">
    <div className="md:flex">
      <div className="md:w-1/3 h-64 bg-muted animate-pulse" />
      <div className="md:w-2/3 p-6 space-y-4">
        <div className={`w-24 h-5 ${shimmer}`} />
        <div className={`w-3/4 h-8 ${shimmer}`} />
        <div className={`w-full h-4 ${shimmer}`} />
        <div className={`w-1/2 h-4 ${shimmer}`} />
        <div className="flex justify-between mt-6">
          <div className="flex space-x-4">
            <div className={`w-20 h-4 ${shimmer}`} />
            <div className={`w-20 h-4 ${shimmer}`} />
          </div>
          <div className={`w-24 h-9 ${shimmer}`} />
        </div>
      </div>
    </div>
  </Card>
);

export const CardSkeleton = () => (
  <Card className="flex flex-col">
    <div className="h-40 bg-muted animate-pulse" />
    <CardHeader>
      <div className="flex items-center justify-between mb-2">
        <div className={`w-20 h-5 ${shimmer}`} />
        <div className={`w-6 h-6 ${shimmer}`} />
      </div>
      <div className={`w-3/4 h-5 ${shimmer}`} />
      <div className={`w-full h-4 ${shimmer}`} />
    </CardHeader>
    <CardContent className="mt-auto space-y-3">
      <div className="flex justify-between">
        <div className={`w-20 h-4 ${shimmer}`} />
        <div className={`w-20 h-4 ${shimmer}`} />
      </div>
      <div className="flex flex-wrap gap-1">
        <div className={`w-10 h-4 ${shimmer}`} />
        <div className={`w-12 h-4 ${shimmer}`} />
        <div className={`w-8 h-4 ${shimmer}`} />
      </div>
      <div className={`w-full h-9 ${shimmer}`} />
    </CardContent>
  </Card>
);
