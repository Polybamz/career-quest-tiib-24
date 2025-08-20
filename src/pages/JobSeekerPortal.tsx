import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { getJobSeekerProfile, getJobs } from '../../firebase';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Search,
  BookmarkPlus,
  ExternalLink,
  Calendar,
  Building,
  DollarSign
} from 'lucide-react';

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
  applyType: 'internal' | 'external' | 'email';
  applyLink?: string;
  applyEmail?: string;
  expiryDate: string;
  status: string;
}

const JobSeekerPortal = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchJobs();
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchQuery, jobs]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const profileData = await getJobSeekerProfile(user.uid);
      if (!profileData) {
        navigate('/job-seeker-profile');
        return;
      }
      setProfile(profileData as JobSeekerProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to fetch profile",
        variant: "destructive",
      });
    }
  };

  const fetchJobs = async () => {
    try {
      const jobsData = await getJobs();
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job: Job) => {
    if (job.applyType === 'external' && job.applyLink) {
      window.open(job.applyLink, '_blank');
    } else if (job.applyType === 'email' && job.applyEmail) {
      window.location.href = `mailto:${job.applyEmail}?subject=Application for ${job.title}`;
    } else {
      toast({
        title: "Application Information",
        description: "Please contact the employer directly for this position.",
      });
    }
  };

  const saveJob = (jobId: string) => {
    toast({
      title: "Job Saved",
      description: "Job has been added to your saved list",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please log in to access your portal.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Job Seeker Portal</h1>
          <p className="text-muted-foreground">Welcome back, {profile?.fullName}</p>
        </div>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Search</CardTitle>
              <CardDescription>
                Search through verified job opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs by title, company, location, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No jobs found matching your search.</p>
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {job.logoUrl && (
                                <img 
                                  src={job.logoUrl} 
                                  alt={`${job.company} logo`}
                                  className="w-12 h-12 rounded object-cover"
                                />
                              )}
                              <div>
                                <h3 className="text-lg font-semibold">{job.title}</h3>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Building className="h-4 w-4" />
                                  <span>{job.company}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{job.salary}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline">{job.type.replace('-', ' ').toUpperCase()}</Badge>
                              {job.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="secondary">{tag}</Badge>
                              ))}
                              {job.tags.length > 3 && (
                                <Badge variant="secondary">+{job.tags.length - 3} more</Badge>
                              )}
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {job.description}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2 ml-4">
                            <Button onClick={() => handleApply(job)} size="sm">
                              Apply Now
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                            <Button 
                              onClick={() => saveJob(job.id)} 
                              variant="outline" 
                              size="sm"
                            >
                              <BookmarkPlus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="pt-3 border-t">
                          <p className="text-xs text-muted-foreground">
                            Expires: {new Date(job.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          {profile && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Your professional profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{profile.fullName}</p>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{profile.email}</p>
                        <p className="text-sm text-muted-foreground">Email</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{profile.phone}</p>
                        <p className="text-sm text-muted-foreground">Phone</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{profile.location}</p>
                        <p className="text-sm text-muted-foreground">Location</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{profile.education}</p>
                        <p className="text-sm text-muted-foreground">Education</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{profile.university}</p>
                        <p className="text-sm text-muted-foreground">University ({profile.graduationYear})</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{profile.experience} years</p>
                        <p className="text-sm text-muted-foreground">Experience</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Professional Summary</h4>
                    <p className="text-sm text-muted-foreground">{profile.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <p className="text-sm text-muted-foreground">{profile.skills}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Certifications</h4>
                    <p className="text-sm text-muted-foreground">{profile.certifications}</p>
                  </div>
                </div>

                {(profile.linkedinUrl || profile.portfolioUrl) && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Professional Links</h4>
                    <div className="flex gap-4">
                      {profile.linkedinUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                            LinkedIn Profile
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {profile.portfolioUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer">
                            Portfolio
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Jobs</CardTitle>
              <CardDescription>
                Jobs you've bookmarked for later
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookmarkPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No saved jobs yet. Start bookmarking jobs you're interested in!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobSeekerPortal;