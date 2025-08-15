import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdBanner from "@/components/layout/AdBanner";
import { MapPin, Calendar, ExternalLink, Mail } from "lucide-react";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  // Mock job data
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "Join our dynamic team as a Senior Software Engineer. We're looking for someone with 5+ years experience in React, Node.js, and cloud technologies.",
      expiryDate: "2024-09-15",
      applyType: "external",
      applyLink: "https://techcorp.com/careers/senior-engineer",
      salary: "₦8,000,000 - ₦12,000,000",
      tags: ["React", "Node.js", "AWS", "Senior Level"]
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Growth Marketing Ltd",
      location: "Abuja, Nigeria",
      type: "Full-time",
      description: "Lead our marketing initiatives and drive brand growth. Experience in digital marketing, content strategy, and team leadership required.",
      expiryDate: "2024-09-20",
      applyType: "email",
      email: "careers@growthmarketing.com",
      salary: "₦6,000,000 - ₦9,000,000",
      tags: ["Marketing", "Digital Marketing", "Leadership", "Mid Level"]
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Analytics Pro",
      location: "Port Harcourt, Nigeria",
      type: "Contract",
      description: "Analyze complex datasets and provide actionable insights. Strong skills in Python, SQL, and data visualization tools required.",
      expiryDate: "2024-09-25",
      applyType: "external",
      applyLink: "https://analyticspro.com/careers/data-analyst",
      salary: "₦4,500,000 - ₦7,000,000",
      tags: ["Python", "SQL", "Data Analysis", "Contract"]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Design Studios",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "Create stunning user experiences and interfaces. Portfolio showcasing mobile and web design expertise required.",
      expiryDate: "2024-09-30",
      applyType: "email",
      email: "hello@designstudios.com",
      salary: "₦5,000,000 - ₦8,000,000",
      tags: ["UI/UX", "Figma", "Design", "Creative"]
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = !jobType || job.type === jobType;
    return matchesSearch && matchesLocation && matchesType;
  });

  const handleApply = (job: typeof jobs[0]) => {
    if (job.applyType === "external" && job.applyLink) {
      window.open(job.applyLink, "_blank");
    } else if (job.applyType === "email" && job.email) {
      // In a real app, this would redirect to a job detail page
      alert(`To apply for this position, please send your CV to: ${job.email}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Banner Ad */}
      <div className="w-full flex justify-center py-4 bg-muted/30">
        <AdBanner width={970} height={90} position="top" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Desktop Side Ads */}
        <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-10">
          <AdBanner width={160} height={600} position="side" />
        </div>
        <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
          <AdBanner width={160} height={600} position="side" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-muted-foreground">
            Discover opportunities that match your skills and aspirations
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">Search Jobs</Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-foreground">
                      {job.company}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Expires: {new Date(job.expiryDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{job.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-primary">{job.salary}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleApply(job)} className="flex-1">
                      {job.applyType === "external" ? (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply Now
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Apply via Email
                        </>
                      )}
                    </Button>
                    <Button variant="outline">Save Job</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-xl text-muted-foreground">
                No jobs found matching your criteria.
              </p>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search filters or check back later for new opportunities.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Inline Ad between job listings */}
        <div className="flex justify-center py-8">
          <AdBanner width={728} height={90} position="inline" />
        </div>
      </div>
    </div>
  );
};

export default Jobs;