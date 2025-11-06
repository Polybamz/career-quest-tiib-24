import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { createJobSeekerProfile, getJobSeekerProfile } from '../../firebase';
import { useToast } from '@/hooks/use-toast';
import { User, GraduationCap, MapPin, Phone, Mail, FileText, Award } from 'lucide-react';

const JobSeekerProfile = () => {
  const { user, updateUserProfile, createJSState:{ loading, error, success}, createUpdateJSProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileExists, setProfileExists] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    education: '',
    university: '',
    graduationYear: '',
    experience: '',
    skills: '',
    certifications: '',
    linkedinUrl: '',
    portfolioUrl: '',
    summary: '',
    hasMinimumRequirements: false
  });

  useEffect(() => {
    if (user) {
      checkExistingProfile();
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const checkExistingProfile = async () => {
    if (!user) return;
    
    try {
      const existingProfile = await getJobSeekerProfile(user.uid);
      if (existingProfile) {
        setProfileExists(true);
        navigate('/job-seeker-portal');
      }
    } catch (error) {
      console.error('Error checking profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.hasMinimumRequirements) {
      toast({
        title: "Requirements not met",
        description: "Please confirm you meet the minimum requirements (BSc degree, 5+ years experience, relevant certifications)",
        variant: "destructive",
      });
      return;
    }

      await createUpdateJSProfile({...formData, graduationYear: parseInt(formData.graduationYear)}, user.uuid)
   
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  useEffect(()=>{
    if(success){
      navigate('/job-seeker-portal');

    }
    // if(error){
    //   toast({
    //     title:'Error',
    //     description: error
    //   })
    // }
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please log in to complete your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  //console.log(user)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Complete Your Job Seeker Profile</CardTitle>
          <CardDescription>
            Fill in your details to access verified job opportunities. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Education</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="education">Highest Degree *</Label>
                  <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bsc">Bachelor's Degree (BSc)</SelectItem>
                      <SelectItem value="msc">Master's Degree (MSc)</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="university">University/Institution *</Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Graduation Year *</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    min="1980"
                    max="2030"
                    value={formData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Professional Experience</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-7">5-7 years</SelectItem>
                      <SelectItem value="8-10">8-10 years</SelectItem>
                      <SelectItem value="11-15">11-15 years</SelectItem>
                      <SelectItem value="15+">15+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Key Skills *</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder="List your key professional skills separated by commas"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">Professional Certifications *</Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => handleInputChange('certifications', e.target.value)}
                    placeholder="List relevant certifications, licenses, or professional qualifications"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Links */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Professional Links</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">Portfolio/Website</Label>
                  <Input
                    id="portfolioUrl"
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary *</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  placeholder="Write a brief professional summary highlighting your experience and career goals"
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Requirements Confirmation */}
            <div className="space-y-4 p-4 bg-primary/10 rounded-lg">
              <h3 className="text-lg font-semibold text-primary">Eligibility Requirements</h3>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="requirements"
                  checked={formData.hasMinimumRequirements}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, hasMinimumRequirements: checked as boolean }))
                  }
                />
                <Label htmlFor="requirements" className="text-sm leading-relaxed">
                  I confirm that I meet the minimum requirements: I have at least a BSc degree, 
                  5+ years of professional experience, and relevant certifications in my field. 
                  I understand that this platform maintains a curated database of qualified professionals.
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Profile...' : 'Complete Profile & Access Portal'}
            </Button>
          </form>
          {error && <p className='text-red-400'>{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobSeekerProfile;