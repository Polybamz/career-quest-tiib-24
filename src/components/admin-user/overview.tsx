import React from "react";
import { Badge } from "../ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Plus, Edit, Trash2, MapPin, Calendar, DollarSign, Building, BarChart3, TrendingUp, Users, Eye } from 'lucide-react';
import { hasPermission, PLAN_PRE, SubsPlan } from "@/types/subs_type";
import { useJobs } from "@/context/useJobContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useSubscription from "@/hooks/useSubscribe";
import { useSearchParams } from "react-router-dom";
import SubscribeBanna from "../ui/subscribe_banna";
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
  status: 'active' | 'pending' | 'closed';
  createdAt: any;
  employerId: string;
}

const Overview = () => {
  const [searchParams] = useSearchParams();
  console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',searchParams.get('id'))
  const { user, } = useAuth()
  const [isSubscribed, setIsSubscribed] = React.useState<boolean>( false)
  const { getJobByEmployerId, employerJobState, getEmployerJobAnalytics, employerJobAnalisticsState: { loading: analyticsLoading, data: analytics, error: analyticsError } } = useJobs();
  const { getSubsState,
     } = useSubscription()
  const [jobs, setJobs] = React.useState<Job[]>([]);
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',getSubsState)
  React.useEffect(() => {
    if (user) {
      // fetchJobs();
      // fetchAnalytics();
      setIsSubscribed(user.isSubscribed)
      getEmployerJobAnalytics(user.uid)
      getJobByEmployerId(user.uid)
        .then((res) => {
          console.log("Employer Jobs fetched:", res);
        })
        .catch((er) => {
          console.log("Error fetching employer jobs:", er);
        });
    }
  }, [user]);

  React.useEffect(() => {
    if (employerJobState.success) {
      setJobs(employerJobState['data'])
      //fetchJobs();
    }
    
  }, [employerJobState.success, employerJobState['data']])


  console.log('kkkkkkkkkkkkkkkkkkkkk', user)

  // Determine the user's plan safely (fall back to Starter)
  const getUserPlan = (): SubsPlan => {
    const asAny = (user || {}) as any;
    const plan = asAny?.plan || asAny?.role || asAny?.subscriptionPlan || 'Professional';
    if (plan === 'Starter' || plan === 'Professional' || plan === 'Enterprise') return plan;
    return 'Starter';
  };
  const userPlan = getUserPlan();

  return (
    <div className="min-h-screen">
      {!isSubscribed &&      <SubscribeBanna/>
  }
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        {isSubscribed &&  <div className="mt-2 flex items-center gap-3">
            <Badge variant="outline">Plan: {userPlan}</Badge>
            {/* <Button size="sm" variant="ghost" onClick={() => setIsSubscribed(false)}>Manage Plan</Button> */}
          </div>}
        </div>

      </div>


      <Card className="space-y-6 border-0">
        {analyticsLoading ? (
          <div className="text-center py-8">Loading analytics...</div>
        ) : (
          // If user has analytics permission show analytics (or no-data), otherwise prompt upgrade
          hasPermission(userPlan, 'Analytics and reporting') ? (
            //   !analytics ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                        <p className="text-3xl font-bold">{analytics?.totalJobs}</p>
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
                        <p className="text-3xl font-bold text-primary">{analytics?.activeJobs}</p>
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
                        <p className="text-3xl font-bold text-secondary">{analytics?.applicationStats.totalApplications}</p>
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
                        <p className="text-3xl font-bold text-accent">{analytics?.applicationStats.averagePerJob}</p>
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
                      <BarChart data={analytics?.monthlyData}>
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
                          data={analytics?.typeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ type, count }) => `${type}: ${count}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {analytics?.typeData.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="">
                <CardHeader>
                  <CardTitle>Job Status Overview</CardTitle>
                  <CardDescription>Current status of all your job postings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{analytics?.activeJobs}</p>
                      <p className="text-sm text-muted-foreground">Active Jobs</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                      <p className="text-2xl font-bold text-secondary">{analytics?.pendingJobs}</p>
                      <p className="text-sm text-muted-foreground">Pending Jobs</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-muted-foreground">{analytics?.closedJobs}</p>
                      <p className="text-sm text-muted-foreground">Closed Jobs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="max-lg:h-16"></div>
            </>
            //   ) : (
            //     <Card>
            //       <CardContent className="p-6">
            //         <p>No analytics data available.</p>
            //       </CardContent>
            //     </Card>
            //   )
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
      </Card>

      <Card className="space-y-6">

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
                            {/* <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(job)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button> */}
                            {/* <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(job.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button> */}
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
      </Card>
    </div>
  )

}

export default Overview;