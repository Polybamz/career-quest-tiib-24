
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useJobs } from "@/context/useJobContext";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, MapPin, Phone, Mail, GraduationCap, Award, Briefcase,
  Search, BookmarkPlus, ExternalLink, Calendar, Building, DollarSign, Loader2
} from "lucide-react";

interface JobSeekerProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  university: string;
  graduationYear: string;
  experience: string;
  skills: string;
  certifications: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  summary: string;
  savedJobs?: string[];
}

interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl: string;
  location: string;
  type: string;
  postedDate: string;
  salary: string;
  tags: string[];
  description: string;
  requirements: string;
  applyType: "internal" | "external" | "email";
  applyLink?: string;
  applyEmail?: string;
  expiryDate: string;
  status: string;
}

// === Custom hook to manage portal state ===
const useJobSeekerPortal = (user: any, getJSProfile: Function, getJSState: any, joblist: any, loading: boolean) => {
  const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    if (user && joblist?.length) {
      setJobs(joblist);
    }
    if (user && !getJSState.loading && !getJSState.error) {
      setProfile(getJSState.data);
    }
  }, [user, joblist, getJSState]);

  useEffect(() => {
    if (user) getJSProfile(user["uuid"]);
  }, [user, getJSProfile]);

  const filteredJobs = useMemo(() => {
    if (!searchQuery) return jobs;
    const q = searchQuery.toLowerCase();
    return jobs.filter(
      job =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }, [searchQuery, jobs]);

  return { profile, setProfile, searchQuery, setSearchQuery, filteredJobs };
};

// === Job Card Component ===
const JobCard = ({ job, onApply, onSave }: { job: Job; onApply: any; onSave: any }) => (
  <Card className="hover:shadow-lg transition-all duration-200 border border-muted/30">
    <CardContent className="p-6">
      <div className="flex justify-between gap-4 flex-wrap">
        <div className="flex gap-4 flex-1">
          {job.logoUrl && (
            <img
              src={job.logoUrl}
              alt={`${job.company} logo`}
              className="w-14 h-14 rounded-md object-cover border border-muted/20"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(job.postedDate).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{job.salary}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline">{job.type.toUpperCase()}</Badge>
              {job.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="secondary">{tag}</Badge>
              ))}
              {job.tags.length > 3 && (
                <Badge variant="secondary">+{job.tags.length - 3} more</Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end gap-2">
          <Button onClick={() => onApply(job)} size="sm" className="w-full">
            Apply <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={() => onSave(job.id)} variant="outline" size="sm" className="w-full">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{job.description}</p>
      <p className="text-xs text-muted-foreground mt-2">Expires: {new Date(job.expiryDate).toLocaleDateString()}</p>
    </CardContent>
  </Card>
);

// === Main Component ===
const JobSeekerPortal = () => {
  const { user, logout, getJSState, getJSProfile } = useAuth();
  const { jobs: joblist, isLoading: loading } = useJobs();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { profile, searchQuery, setSearchQuery, filteredJobs } = useJobSeekerPortal(
    user, getJSProfile, getJSState, joblist, loading
  );

  const handleApply = (job: Job) => {
    if (job.applyType === "external" && job.applyLink) window.open(job.applyLink, "_blank");
    else if (job.applyType === "email" && job.applyEmail)
      window.location.href = `mailto:${job.applyEmail}?subject=Application for ${job.title}`;
    else toast({ title: "Application Info", description: "Please contact the employer directly." });
  };

  const saveJob = (id: string) =>
    toast({ title: "Job Saved", description: "Job added to your saved list." });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card><CardContent className="p-6 text-center">Please log in to access your portal.</CardContent></Card>
      </div>
    );
  }

  if (!getJSState.loading && !getJSState.data) {
    return <Navigate to="/job-seeker-profile" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12 mb-4 text-primary" />
        <p>Loading your portal...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Job Seeker Portal</h1>
          <p className="text-muted-foreground">Welcome back, {profile?.fullName}</p>
        </div>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
        </TabsList>

        {/* JOBS TAB */}
        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Search</CardTitle>
              <CardDescription>Explore verified job listings tailored for you.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title, company, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {filteredJobs.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <BookmarkPlus className="w-10 h-10 mx-auto mb-4" />
                  No jobs found matching your search.
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} onApply={handleApply} onSave={saveJob} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PROFILE TAB */}
        <TabsContent value="profile">
          {profile && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your professional details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p><strong>Name:</strong> {profile.fullName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Location:</strong> {profile.location}</p>
                  </div>
                  <div>
                    <p><strong>Education:</strong> {profile.education}</p>
                    <p><strong>University:</strong> {profile.university}</p>
                    <p><strong>Experience:</strong> {profile.experience} years</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <p><strong>Skills:</strong> {profile.skills}</p>
                  <p><strong>Certifications:</strong> {profile.certifications}</p>
                  <p><strong>Summary:</strong> {profile.summary}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* SAVED JOBS TAB */}
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Jobs</CardTitle>
              <CardDescription>Jobs you've bookmarked for later.</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-10 text-muted-foreground">
              <BookmarkPlus className="h-12 w-12 mx-auto mb-4" />
              You haven’t saved any jobs yet.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobSeekerPortal;
