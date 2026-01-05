import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, MapPin, Calendar, DollarSign, Building, BarChart3, TrendingUp, Users, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { db, getJobAnalytics } from '../../firebase';
import { useToast } from '@/hooks/use-toast';
import { useJobs } from "@/context/useJobContext";
import SubscriptionPlans from '@/components/ui/subscriptions_plan';
import { PLAN_PRE, hasPermission, SubsPlan } from '@/types/subs_type';
import useSubscription from '@/hooks/useSubscribe';
interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  postedDate: string;
  applyType: 'internal' | 'external' | 'email';
  salary: string;
  tags: string[];
  description: string;
  requirements: string;
  applyLink?: string;
  applyEmail?: string;
  expiryDate: string;
  status: 'active' |'pending' | 'closed';
  createdAt: any;
  employerId: string;
}

const EmployerDashboard = () => {
  const { user, logout } = useAuth();
  const {getSubsState } = useSubscription()
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const { getJobByEmployerId, employerJobState, addJob,deleteJob, addJobState,updateJob,updateJobState, deleteJobState } = useJobs();
  // derive subscription plan from user object if available
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  // Form state, updated to match Job interface
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    logoUrl: '', // New field
    location: '',
    type: 'full-time' as Job['type'],
    salary: '',
    tags: '', // New field, will be converted to an array
    description: '',
    requirements: '',
    applyEmail: '',
    applyLink: '',
    expiryDate: '',
  });

  useEffect(() => {
    if (user) {
     // fetchJobs();
      fetchAnalytics();
      getJobByEmployerId(user.uid)
        .then((res) => {
          console.log("Employer Jobs fetched:", res);
        })
        .catch((er) => {
          console.log("Error fetching employer jobs:", er);
        });
    }
  }, [user]);

  // Determine the user's plan safely (fall back to Starter)
  const getUserPlan = (): SubsPlan => {
    const asAny = (user || {}) as any;
    const plan = asAny?.plan || asAny?.role || asAny?.subscriptionPlan || 'Starter';
    if (plan === 'Starter' || plan === 'Professional' || plan === 'Enterprise') return plan;
    return 'Starter';
  };
  const userPlan = getUserPlan();

  const allowedPostsFromPlan = (plan: SubsPlan) => {
    const arr = PLAN_PRE[plan];
    const postLimitString = arr.find((s) => /post up to/i.test(s) || /unlimited job postings/i.test(s));
    if (!postLimitString) return 0;
    if (/unlimited/i.test(postLimitString)) return Infinity;
    const m = postLimitString.match(/post up to (\d+)/i);
    return m ? Number(m[1]) : 0;
  };
  const allowedPosts = allowedPostsFromPlan(userPlan);

  // const fetchJobs = async () => {
  //   if (!user) return;
    
  //   try {
  //     const jobsRef = collection(db, 'jobs');
  //     const q = query(jobsRef, where('employerId', '==', user.uid));
  //     const querySnapshot = await getDocs(q);
      
  //     const jobsData = querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     })) as Job[];
      
  //     setJobs(jobsData);
  //   } catch (error) {
  //     console.error('Error fetching jobs:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to fetch jobs",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchAnalytics = async () => {
    if (!user) return;
    
    try {
      const analyticsData = await getJobAnalytics(user.uid);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Determine applyType based on form data
    let applyType: Job['applyType'] = 'internal';
    if (formData.applyLink) {
      applyType = 'external';
    } else if (formData.applyEmail) {
      applyType = 'email';
    }

    // Split tags string into an array
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    const commonJobData = {
      title: formData.title,
      company: formData.company,
      logoUrl: formData.logoUrl,
      location: formData.location,
      type: formData.type,
      salary: formData.salary,
      tags: tagsArray,
      description: formData.description,
      requirements: formData.requirements,
      applyType: applyType,
      applyEmail: formData.applyEmail,
      applyLink: formData.applyLink,
      expiryDate: formData.expiryDate,
      status: 'pending' as const,
    };

    await addJob(commonJobData);

    // try {
    //   if (editingJob) {
    //     const jobRef = doc(db, 'jobs', editingJob.id);
    //     await updateDoc(jobRef, { ...commonJobData });
    //     toast({
    //       title: "Success",
    //       description: "Job updated successfully",
    //     });
    //   } else {
    //     const jobData = {
    //       ...commonJobData,
    //       employerId: user.uid,
    //       createdAt: serverTimestamp(),
    //       postedDate: new Date().toISOString(), // Add postedDate
    //     };
    //     await addDoc(collection(db, 'jobs'), jobData);
    //     toast({
    //       title: "Success",
    //       description: "Job posted successfully",
    //     });
    //   }

    //   setIsDialogOpen(false);
    //   setEditingJob(null);
    //   resetForm();
    //  // fetchJobs();
    // } catch (error) {
    //   console.error('Error saving job:', error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to save job",
    //     variant: "destructive",
    //   });
    // }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      logoUrl: job.logoUrl,
      location: job.location,
      type: job.type,
      salary: job.salary,
      tags: job.tags.join(', '), // Convert array back to string
      description: job.description,
      requirements: job.requirements,
      applyEmail: job.applyEmail || '',
      applyLink: job.applyLink || '',
      expiryDate: job.expiryDate,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      // await deleteDoc(doc(db, 'jobs', jobId));
      // toast({
      //   title: "Success",
      //   description: "Job deleted successfully",
      // });
      //fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      logoUrl: '',
      location: '',
      type: 'full-time',
      salary: '',
      tags: '',
      description: '',
      requirements: '',
      applyEmail: '',
      applyLink: '',
      expiryDate: '',
    });
  };

  const handleNewJob = () => {
    setEditingJob(null);
    resetForm();
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (employerJobState.success) {
      setJobs(employerJobState['data'])
      //fetchJobs();
    }
  },[employerJobState.success, employerJobState['data']])

  // if (!user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Card>
  //         <CardContent className="p-6">
  //           <p>Please log in to access the employer dashboard.</p>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          <div className="mt-2 flex items-center gap-3">
            <Badge variant="outline">Plan: {userPlan}</Badge>
            {/* <Button size="sm" variant="ghost" onClick={() => setIsSubscribed(false)}>Manage Plan</Button> */}
          </div>
        </div>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      </div>
   {!isSubscribed && (<SubscriptionPlans/>)}
    {isSubscribed && (  <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="jobs">My Jobs</TabsTrigger>
          {/* Analytics only available on Professional and Enterprise */}
          {hasPermission(userPlan, 'Analytics and reporting') ? (
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          ) : (
            <TabsTrigger value="analytics" disabled>Analytics (Upgrade)</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Job Postings</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleNewJob} disabled={allowedPosts !== Infinity && jobs.length >= allowedPosts}>
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingJob ? 'Edit Job' : 'Post New Job'}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details for your job posting.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="logoUrl">Company Logo URL</Label>
                      <Input
                        id="logoUrl"
                        type="url"
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                        placeholder="https://company.com/logo.png"
                        
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Select value={formData.type} onValueChange={(value: Job['type']) => setFormData({...formData, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary</Label>
                      <Input
                        id="salary"
                        value={formData.salary}
                        onChange={(e) => setFormData({...formData, salary: e.target.value})}
                        placeholder="e.g. $50,000 - $70,000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="e.g., React, Node.js, AI, Remote"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="applicationEmail">Application Email</Label>
                      <Input
                        id="applicationEmail"
                        type="email"
                        value={formData.applyEmail}
                        onChange={(e) => setFormData({...formData, applyEmail: e.target.value})}
                        placeholder="hr@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="applicationUrl">Application URL</Label>
                      <Input
                        id="applicationUrl"
                        type="url"
                        value={formData.applyLink}
                        onChange={(e) => setFormData({...formData, applyLink: e.target.value})}
                        placeholder="https://company.com/apply"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingJob ? 'Update Job' : 'Post Job'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {/* Quick action: Browse candidates if plan allows */}
            <div>
              {hasPermission(userPlan, 'Access to candidate profiles') ? (
                <Button size="sm" variant="outline" onClick={() => {/* TODO: open candidate modal */}}>
                  Browse Candidates
                </Button>
              ) : (
                <Button size="sm" variant="ghost" onClick={() => setIsSubscribed(false)}>
                  Upgrade to Browse Candidates
                </Button>
              )}
            </div>
          </div>

          {employerJobState.loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No jobs posted yet. Create your first job posting!
                        </TableCell>
                      </TableRow>
                    ) : (
                      jobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                              {job.company}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                              {job.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {job.type.replace('-', ' ').toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                              {job.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {job.expiryDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(job)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(job.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button>Promote</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {analyticsLoading ? (
            <div className="text-center py-8">Loading analytics...</div>
          ) : (
            // If user has analytics permission show analytics (or no-data), otherwise prompt upgrade
            hasPermission(userPlan, 'Analytics and reporting') ? (
              analytics ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                            <p className="text-3xl font-bold">{analytics.totalJobs}</p>
                          </div>
                          <Building className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                            <p className="text-3xl font-bold text-primary">{analytics.activeJobs}</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                            <p className="text-3xl font-bold text-secondary">{analytics.applicationStats.totalApplications}</p>
                          </div>
                          <Users className="h-8 w-8 text-secondary" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Avg per Job</p>
                            <p className="text-3xl font-bold text-accent">{analytics.applicationStats.averagePerJob}</p>
                          </div>
                          <BarChart3 className="h-8 w-8 text-accent" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Job Postings</CardTitle>
                        <CardDescription>Number of jobs posted each month</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={analytics.monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="jobs" fill="hsl(var(--primary))" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Job Types Distribution</CardTitle>
                        <CardDescription>Breakdown of job types posted</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={analytics.typeData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ type, count }) => `${type}: ${count}`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="count"
                            >
                              {analytics.typeData.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Job Status Overview</CardTitle>
                      <CardDescription>Current status of all your job postings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{analytics.activeJobs}</p>
                          <p className="text-sm text-muted-foreground">Active Jobs</p>
                        </div>
                        <div className="text-center p-4 bg-secondary/10 rounded-lg">
                          <p className="text-2xl font-bold text-secondary">{analytics.pendingJobs}</p>
                          <p className="text-sm text-muted-foreground">Pending Jobs</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <p className="text-2xl font-bold text-muted-foreground">{analytics.closedJobs}</p>
                          <p className="text-sm text-muted-foreground">Closed Jobs</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <p>No analytics data available.</p>
                  </CardContent>
                </Card>
              )
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Upgrade for Analytics</h3>
                  <p className="text-muted-foreground mb-4">Your current plan does not include analytics and reporting. Upgrade to Professional or Enterprise to access full analytics.</p>
                  <Button onClick={() => setIsSubscribed(false)}>View Plans</Button>
                </CardContent>
              </Card>
            )
          )}
        </TabsContent>
      </Tabs>)}
    </div>
  );
};

export default EmployerDashboard;
