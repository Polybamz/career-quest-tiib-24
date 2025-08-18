import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdBanner from "@/components/layout/AdBanner";
import { MapPin, Briefcase, DollarSign, ExternalLink, Mail, Search, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// --- Helper function for relative time ---
const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return `${Math.floor(interval)} years ago`;
  interval = seconds / 2592000;
  if (interval > 1) return `${Math.floor(interval)} months ago`;
  interval = seconds / 86400;
  if (interval > 1) return `${Math.floor(interval)} days ago`;
  interval = seconds / 3600;
  if (interval > 1) return `${Math.floor(interval)} hours ago`;
  interval = seconds / 60;
  if (interval > 1) return `${Math.floor(interval)} minutes ago`;
  return `${Math.floor(seconds)} seconds ago`;
};


const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  
   useScrollAnimation();
  // --- Enriched Mock Job Data ---
  // Added logoUrl and postedDate for a more realistic and user-friendly experience
  const jobs = useMemo(() => [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      logoUrl: "/placeholder.svg",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "Join our dynamic team as a Senior Software Engineer. We're looking for someone with 5+ years experience in React, Node.js, and cloud technologies. You will be responsible for building and maintaining our core platform, ensuring scalability and performance.",
      postedDate: "2025-08-10T10:00:00Z",
      applyType: "external",
      applyLink: "https://techcorp.com/careers/senior-engineer",
      salary: "$8,000,000 - $12,000,000 Annually",
      tags: ["React", "Node.js", "AWS", "Senior Level", "Backend"]
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Growth Marketing Ltd",
      logoUrl: "/placeholder.svg",
      location: "Abuja, Nigeria",
      type: "Full-time",
      description: "Lead our marketing initiatives and drive brand growth. Experience in digital marketing, content strategy, and team leadership required. You will develop and execute marketing campaigns across various channels.",
      postedDate: "2025-08-12T14:30:00Z",
      applyType: "email",
      email: "careers@growthmarketing.com",
      salary: "$6,000,000 - $9,000,000 Annually",
      tags: ["Marketing", "Digital Marketing", "Leadership", "Mid Level", "SEO"]
    },
    {
      id: 3,
      title: "Data Analyst (Contract)",
      company: "Analytics Pro",
      logoUrl: "/placeholder.svg",
      location: "Port Harcourt, Nigeria",
      type: "Contract",
      description: "Analyze complex datasets and provide actionable insights. Strong skills in Python, SQL, and data visualization tools like Tableau are required for this 6-month contract role.",
      postedDate: "2025-08-15T09:00:00Z",
      applyType: "external",
      applyLink: "https://analyticspro.com/careers/data-analyst",
      salary: "$500,000 - $700,000 Monthly",
      tags: ["Python", "SQL", "Data Analysis", "Tableau", "Contract"]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Design Studios",
      logoUrl: "/placeholder.svg",
      location: "Lagos, Nigeria",
      type: "Remote",
      description: "Create stunning and intuitive user experiences. A strong portfolio showcasing mobile and web design expertise is required. You will work closely with product managers and engineers.",
      postedDate: "2025-08-05T11:00:00Z",
      applyType: "email",
      email: "hello@designstudios.com",
      salary: "$5,000,000 - $8,000,000 Annually",
      tags: ["UI/UX", "Figma", "Web Design", "Mobile App Design", "Creative"]
    },
     {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      logoUrl: "/placeholder.svg",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "Join our dynamic team as a Senior Software Engineer. We're looking for someone with 5+ years experience in React, Node.js, and cloud technologies. You will be responsible for building and maintaining our core platform, ensuring scalability and performance.",
      postedDate: "2025-08-10T10:00:00Z",
      applyType: "external",
      applyLink: "https://techcorp.com/careers/senior-engineer",
      salary: "$8,000,000 - $12,000,000 Annually",
      tags: ["React", "Node.js", "AWS", "Senior Level", "Backend"]
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Growth Marketing Ltd",
      logoUrl: "/placeholder.svg",
      location: "Abuja, Nigeria",
      type: "Full-time",
      description: "Lead our marketing initiatives and drive brand growth. Experience in digital marketing, content strategy, and team leadership required. You will develop and execute marketing campaigns across various channels.",
      postedDate: "2025-08-12T14:30:00Z",
      applyType: "email",
      email: "careers@growthmarketing.com",
      salary: "$6,000,000 - $9,000,000 Annually",
      tags: ["Marketing", "Digital Marketing", "Leadership", "Mid Level", "SEO"]
    },
    {
      id: 3,
      title: "Data Analyst (Contract)",
      company: "Analytics Pro",
      logoUrl: "/placeholder.svg",
      location: "Port Harcourt, Nigeria",
      type: "Contract",
      description: "Analyze complex datasets and provide actionable insights. Strong skills in Python, SQL, and data visualization tools like Tableau are required for this 6-month contract role.",
      postedDate: "2025-08-15T09:00:00Z",
      applyType: "external",
      applyLink: "https://analyticspro.com/careers/data-analyst",
      salary: "$500,000 - $700,000 Monthly",
      tags: ["Python", "SQL", "Data Analysis", "Tableau", "Contract"]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Design Studios",
      logoUrl: "/placeholder.svg",
      location: "Lagos, Nigeria",
      type: "Remote",
      description: "Create stunning and intuitive user experiences. A strong portfolio showcasing mobile and web design expertise is required. You will work closely with product managers and engineers.",
      postedDate: "2025-08-05T11:00:00Z",
      applyType: "email",
      email: "hello@designstudios.com",
      salary: "$5,000,000 - $8,000,000 Annually",
      tags: ["UI/UX", "Figma", "Web Design", "Mobile App Design", "Creative"]
    }, {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      logoUrl: "/placeholder.svg",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "Join our dynamic team as a Senior Software Engineer. We're looking for someone with 5+ years experience in React, Node.js, and cloud technologies. You will be responsible for building and maintaining our core platform, ensuring scalability and performance.",
      postedDate: "2025-08-10T10:00:00Z",
      applyType: "external",
      applyLink: "https://techcorp.com/careers/senior-engineer",
      salary: "$8,000,000 - $12,000,000 Annually",
      tags: ["React", "Node.js", "AWS", "Senior Level", "Backend"]
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Growth Marketing Ltd",
      logoUrl: "/placeholder.svg",
      location: "Abuja, Nigeria",
      type: "Full-time",
      description: "Lead our marketing initiatives and drive brand growth. Experience in digital marketing, content strategy, and team leadership required. You will develop and execute marketing campaigns across various channels.",
      postedDate: "2025-08-12T14:30:00Z",
      applyType: "email",
      email: "careers@growthmarketing.com",
      salary: "$6,000,000 - $9,000,000 Annually",
      tags: ["Marketing", "Digital Marketing", "Leadership", "Mid Level", "SEO"]
    },
    {
      id: 3,
      title: "Data Analyst (Contract)",
      company: "Analytics Pro",
      logoUrl: "/placeholder.svg",
      location: "Port Harcourt, Nigeria",
      type: "Contract",
      description: "Analyze complex datasets and provide actionable insights. Strong skills in Python, SQL, and data visualization tools like Tableau are required for this 6-month contract role.",
      postedDate: "2025-08-15T09:00:00Z",
      applyType: "external",
      applyLink: "https://analyticspro.com/careers/data-analyst",
      salary: "$500,000 - $700,000 Monthly",
      tags: ["Python", "SQL", "Data Analysis", "Tableau", "Contract"]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Design Studios",
      logoUrl: "/placeholder.svg",
      location: "Lagos, Nigeria",
      type: "Remote",
      description: "Create stunning and intuitive user experiences. A strong portfolio showcasing mobile and web design expertise is required. You will work closely with product managers and engineers.",
      postedDate: "2025-08-05T11:00:00Z",
      applyType: "email",
      email: "hello@designstudios.com",
      salary: "$5,000,000 - $8,000,000 Annually",
      tags: ["UI/UX", "Figma", "Web Design", "Mobile App Design", "Creative"]
    }
  ], []);

  // --- Filtering Logic ---
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const searchTermLower = searchTerm.toLowerCase();
      const locationLower = location.toLowerCase();
      
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTermLower) ||
        job.company.toLowerCase().includes(searchTermLower) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTermLower));
        
      const matchesLocation = !location || job.location.toLowerCase().includes(locationLower);
      const matchesType = !jobType || job.type === jobType;
      
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, searchTerm, location, jobType]);

  // --- Set initial selected job ---
  if (!selectedJob && filteredJobs.length > 0) {
    setSelectedJob(filteredJobs[0]);
  } else if (filteredJobs.length === 0 && selectedJob) {
    setSelectedJob(null);
  }

  // --- Application Handler ---
  const handleApply = (job: Job) => {
    if (job.applyType === "external" && job.applyLink) {
      window.open(job.applyLink, "_blank");
    } else if (job.applyType === "email" && job.email) {
      // In a real app, this might open a pre-filled email client or an in-app application form.
      window.location.href = `mailto:${job.email}?subject=Application for ${job.title}`;
    }
  };

  type Job = typeof jobs[0];

  return (
    <div className="min-h-screen bg-muted/20 w-full">
      {/* --- Top Banner Ad --- */}
        <AdBanner width={970} height={90} position="top" isHidden={false}/>
    

      <div className="container mx-auto px-4 py-8">
        {/* --- Header --- */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Find Your Next Opportunity</h1>
          <p className="text-lg text-muted-foreground">
            Search through {jobs.length} open positions.
          </p>
        </div>

        {/* --- Search & Filters Bar --- */}
        <Card className="mb-6 shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="md:col-span-2">
                <Input
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Input
                  placeholder="City or location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
              <div>
                {/* <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- Main Content: Two-Column Layout --- */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- Left Column: Job List --- */}
          <div className="lg:col-span-5 xl:col-span-4">
            <h2 className="text-xl font-semibold mb-4">
              {filteredJobs.length} Job{filteredJobs.length !== 1 && 's'} Found
            </h2>
            <div className="space-y-3  pr-2">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card 
                    key={job.id} 
                    onClick={() => setSelectedJob(job)}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary",
                      selectedJob?.id === job.id && "border-primary bg-primary/5 shadow-md"
                    )}
                  >
                    <CardContent className="p-4 flex gap-4">
                      <img src={job.logoUrl} alt={`${job.company} logo`} className="h-12 w-12 rounded-md bg-muted" />
                      <div className="flex-grow">
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <h3 className="font-semibold text-base leading-tight">{job.title}</h3>
                        <div className="text-xs text-muted-foreground mt-2 flex flex-wrap gap-x-3 gap-y-1">
                           <div className="flex items-center gap-1"><MapPin size={12} /> {job.location}</div>
                           <div className="flex items-center gap-1"><DollarSign size={12} /> {job.salary.split(' ')[0]}</div>
                           <div className="flex items-center gap-1"><Briefcase size={12} /> {job.type}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                 <div className="text-center py-12">
                   <p className="text-lg text-muted-foreground">No jobs found.</p>
                   <p className="text-sm text-muted-foreground mt-1">Try adjusting your search filters.</p>
                 </div>
              )}
            </div>
          </div>

          {/* --- Right Column: Job Details --- */}
          <div className="lg:col-span-7 xl:col-span-8">
            {selectedJob ? (
              <Card className="sticky top-24 h-[70vh] overflow-y-auto shadow-sm">
                <CardHeader>
                  <div className="flex gap-4 items-start">
                    <img src={selectedJob.logoUrl} alt={`${selectedJob.company} logo`} className="h-16 w-16 rounded-lg bg-muted" />
                    <div>
                      <CardTitle className="text-2xl mb-1">{selectedJob.title}</CardTitle>
                      <CardDescription className="text-base">
                        {selectedJob.company} &middot; {selectedJob.location}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">
                        Posted {timeAgo(selectedJob.postedDate)} &middot; <Badge variant="secondary">{selectedJob.type}</Badge>
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-6">
                    <Button onClick={() => handleApply(selectedJob)} className="flex-1 h-11 text-base">
                      {selectedJob.applyType === 'external' ? <ExternalLink className="h-4 w-4 mr-2"/> : <Mail className="h-4 w-4 mr-2"/>}
                      Apply Now
                    </Button>
                    <Button variant="outline" className="h-11">Save Job</Button>
                  </div>

                  <div className="space-y-6">
                     <div>
                        <h4 className="font-semibold text-lg mb-2">Salary Range</h4>
                        <p className="text-primary font-medium bg-primary/10 px-3 py-2 rounded-md inline-block">{selectedJob.salary}</p>
                     </div>
                     <div>
                        <h4 className="font-semibold text-lg mb-2">Job Description</h4>
                        <p className="text-muted-foreground whitespace-pre-line">{selectedJob.description}</p>
                     </div>
                     <div>
                        <h4 className="font-semibold text-lg mb-2">Skills & Requirements</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                     </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-[70vh] shadow-sm">
                <div className="text-center">
                  <p className="text-xl text-muted-foreground">Select a job to see details</p>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Jobs;