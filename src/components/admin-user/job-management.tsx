import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, MapPin, Calendar, DollarSign, Building, BarChart3, TrendingUp, Users, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useJobs } from '@/context/useJobContext';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { hasPermission, PLAN_PRE, SubsPlan } from '@/types/subs_type';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { uploadToCloudinary } from '../../../utils';

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
    applyLink?: string | null;
    applyEmail?: string | null;
    expiryDate: string;
    status: 'active' | 'pending' | 'closed';
    createdAt: any;
    employerId: string;
}

const JobManagement = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const { toast } = useToast();
    const { user } = useAuth()
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
    const [applyMethod, setApplyMethod] = useState<'email' | 'link'>('email')
    const [fileToUpload, setFileToUpload] = useState(null)

    const { getJobByEmployerId, employerJobState, addJob, deleteJob, addJobState, updateJob, updateJobState, deleteJobState } = useJobs();
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
        applyEmail:  null,
        applyLink:  null,
        expiryDate: '',
    });

    const handleNewJob = () => {
        setEditingJob(null);
        // resetForm();
        setIsDialogOpen(true);
    };

    useEffect(() => {
        if (employerJobState.success) {
            setJobs(employerJobState['data'])
            //fetchJobs();
        }
    }, [employerJobState.success, employerJobState['data']])
    console.log(employerJobState)

    useEffect(() => {
        if (user) {
            // fetchJobs();
            setIsSubscribed(user.isSubscribed )
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
        const [uploadedUrl] = await uploadToCloudinary([fileToUpload], 'dwqq8vtgj', 'yocaco-presets');
       
        const commonJobData = {
            title: formData.title,
            company: formData.company,
            logoUrl: uploadedUrl,
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
            applyEmail: job.applyEmail || null,
            applyLink: job.applyLink || null,
            expiryDate: job.expiryDate,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (jobId: string) => {
        try {
            await deleteJob(jobId);
        } catch (error) {
            console.error('Error deleting job:', error);
            toast({
                title: "Error",
                description: "Failed to delete job",
                variant: "destructive",
            });
        }
    };
    return (<div className="min-h-screen">
        <Card className="space-y-6 p-2">
            <div className="flex  items-center gap-4">
                <h2 className="text-2xl font-semibold mr-auto">Job Postings</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleNewJob} disabled={allowedPosts !== Infinity && jobs.length >= allowedPosts || !isSubscribed}>
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
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="logoUrl">Company Logo</Label>
                                    <Input
                                        id="logoUrl"
                                        type="file"
                                        accept='image/*'
                                        value={fileToUpload}
                                        onChange={(e) => setFileToUpload( e.target.value )}
                                        placeholder="https://company.com/logo.png"

                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Job Type</Label>
                                    <Select value={formData.type} onValueChange={(value: Job['type']) => setFormData({ ...formData, type: value })}>
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
                                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
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
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="e.g., React, Node.js, AI, Remote"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="expiryDate">Expiry Date</Label>
                                    <Input
                                        id="expiryDate"
                                        type="date"
                                        value={formData.expiryDate}
                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Job Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="requirements">Requirements</Label>
                                <Textarea
                                    id="requirements"
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="applicationMethod">Application Method <span className='text-red-400'>*</span></Label>
                                    <Select value={applyMethod} onValueChange={(value: 'email' | 'link') => setApplyMethod(value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="email">Email</SelectItem>
                                            <SelectItem value="link"> Link</SelectItem>
                                           
                                        </SelectContent>
                                    </Select>
                                    {/* <Input
                                        id="applicationEmail"
                                        type="email"
                                        value={formData.applyEmail}
                                        onChange={(e) => setFormData({ ...formData, applyEmail: e.target.value })}
                                        placeholder="hr@company.com"
                                    /> */}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="applicationUrl"> {applyMethod == 'link' ? 'Application URL' :' Application Email'} <span className='text-red-400'>*</span></Label>
                                    <Input
                                        id="applicationUrl"
                                        type={applyMethod == 'link' ? "url" : 'email'}
                                        value={applyMethod == 'link' ? formData.applyLink : formData.applyEmail}
                                        onChange={(e) => applyMethod == 'link' ? setFormData({ ...formData, applyLink: e.target.value }) : setFormData({ ...formData, applyEmail: e.target.value }) }
                                        placeholder= {applyMethod == 'link' ? "https://company.com/apply" : 'example@gmail.com'}
                                        required
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
                <div className=''>
                    {hasPermission(userPlan, 'Access to candidate profiles') ? (
                        <Button size="sm" variant="outline" onClick={() => {/* TODO: open candidate modal */ }}>
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
        </Card>
    </div>)
}
export default JobManagement;