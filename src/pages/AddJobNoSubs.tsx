import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { DollarSign, MapPin, Briefcase, Paperclip, Mail, Link, CreditCard, Wallet, CheckCircle } from 'lucide-react'; 

// --- TYPE DEFINITIONS ---
type JobPostFormData = {
  title: string;
  company: string;
  logoUrl: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: string;
  tags: string;
  description: string;
  requirements: string;
  applyMethod: 'email' | 'link';
  applyEmail: string;
  applyLink: string;
  expiryDate: string;
};

// --- INITIAL STATE ---
const initialFormData: JobPostFormData = {
  title: '',
  company: '',
  logoUrl: '',
  location: '',
  type: 'full-time',
  salary: '',
  tags: '',
  description: '',
  requirements: '',
  applyMethod: 'email',
  applyEmail: '',
  applyLink: '',
  expiryDate: '',
};

// --- PAYMENT BOX COMPONENT ---

interface PaymentBoxProps {
    amount: string;
    onSuccess: () => void;
}

const PaymentBox: React.FC<PaymentBoxProps> = ({ amount, onSuccess }) => {
    const [selectedMethod, setSelectedMethod] = React.useState<'card' | 'paypal' | 'momo' | 'om' | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSimulatedPayment = () => {
        if (!selectedMethod) {
            alert("Please select a payment method.");
            return;
        }

        setIsLoading(true);
        // Simulate a real payment processing delay
        setTimeout(() => {
            setIsLoading(false);
            // In a real app, you'd check the payment status here.
            // For this example, we assume success.
            onSuccess(); 
        }, 2000);
    };

    const paymentMethods = [
        { id: 'momo', name: 'Mobile Money (MoMo)', icon: Wallet, color: 'text-pink-600' },
        { id: 'om', name: 'Orange Money', icon: Wallet, color: 'text-orange-500' },
        { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: 'text-blue-600' },
        { id: 'paypal', name: 'PayPal', icon: DollarSign, color: 'text-sky-700' },
    ];

    return (
        <Card className="max-w-md mx-auto shadow-2xl border-2 border-primary">
            <CardHeader className="text-center bg-primary/10">
                <CardTitle className="text-2xl font-bold text-primary">💰 Confirm Payment</CardTitle>
                <CardDescription>
                    Complete the payment of {amount} XAF** to unlock the job posting form.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 py-6">
                <h3 className="text-lg font-semibold border-b pb-2">Choose Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map(method => (
                        <div 
                            key={method.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 flex flex-col items-center space-y-1 
                                ${selectedMethod === method.id 
                                    ? 'border-primary ring-2 ring-primary bg-primary/5' 
                                    : 'hover:border-gray-400 bg-white'}`}
                            onClick={() => setSelectedMethod(method.id as any)}
                        >
                            <method.icon className={`w-6 h-6 ${method.color}`} />
                            <span className="text-sm font-medium">{method.name}</span>
                        </div>
                    ))}
                </div>
                {
                  selectedMethod == 'card' && (<div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-2">Card Payment Details</h4>
                    <div className="space-y-3">
                        <p className="text-sm font-medium">Card Number</p>
                        <Input className="w-full" placeholder="**** **** **** 1234"  />
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm font-medium">Expiry Date</p>
                        <Input className="w-full" placeholder="MM/YY"  />
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm font-medium">CVV</p>
                        <Input className="w-full" placeholder="***"  />
                    </div>
                </div>)
                }
                {
                  selectedMethod == 'paypal' && (<div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-2">PayPal Payment</h4>
                    <div className="space-y-3">
                        <p className="text-sm font-medium">PayPal Email</p>
                        <Input className="w-full" placeholder="your_paypal_email@example.com"  />
                    </div>
                </div>)
                }

                {
                  (selectedMethod == 'momo' || selectedMethod == 'om') && (<div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-2">Mobile Money Payment</h4>
                    <div className="space-y-3">
                        <p className="text-sm font-medium">Phone Number</p>
                        <Input className="w-full" placeholder="05xxxxxxxx"  />
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm font-medium">Amount</p>
                        <Input className="w-full" placeholder={amount}  disabled />
                    </div>
                </div>)
                }
              
          
            </CardContent>
            <CardFooter className="flex justify-center bg-gray-50 p-4 border-t">
               { selectedMethod && <Button 
                    onClick={handleSimulatedPayment} 
                    className="w-full text-lg"
                    disabled={!selectedMethod || isLoading}
                >
                    {isLoading ? 'Processing...' : `Pay ${amount} XAF`}
                </Button>}
            </CardFooter>
        </Card>
    );
};


// --- MAIN COMPONENT ---

const AddJobNoSubs = () => {
  const { amount, count, type: subType } = useParams<{ amount?: string, count?: string, type?: string }>();

  // Determine the price from params or set a default if not available
  const jobPrice = amount || '199'; 

  // STEP 1: Payment, STEP 2: Form
  const [step, setStep] = React.useState<'payment' | 'form'>(jobPrice ? 'payment' : 'form'); 
  
  const [formData, setFormData] = React.useState<JobPostFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handlePaymentSuccess = () => {
    setStep('form');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: keyof JobPostFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const resetForm = () => {
      setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // ... (Submission logic, validation, API call) ...
    
    // Simulated submission success
    try {
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        alert("Job posted successfully! Check console for data.");
        resetForm();
        setStep('payment'); // Reset to payment step after successful job posting
    } catch (error) {
        // Handle error
    } finally {
        setIsSubmitting(false);
    }
  };

  // --- RENDER LOGIC ---

  return (
    <div className="min-h-screen bg-gray-50 pb-12 px-4 pt-4 flex flex-col items-center">

        {/* Conditional Rendering based on Step */}
        {step === 'payment' && (
            <div className='w-full max-w-lg mt-10'>
                <PaymentBox amount={jobPrice} onSuccess={handlePaymentSuccess} />
            </div>
        )}

        {step === 'form' && (
            <Card className="max-w-5xl mx-auto shadow-xl w-full">
                <CardHeader className="bg-primary/5 border-b">
                    <CardTitle className="text-3xl font-bold text-primary flex items-center gap-3">
                        <CheckCircle className='w-7 h-7 text-green-500' /> Job Posting Form
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Payment of ${jobPrice} successful! Now, provide the details for your new job listing.
                    </CardDescription>
                     {/* Plan details */}
                    {count && subType && (
                        <p className="text-sm font-medium mt-2 text-primary/80">
                            Your current plan: **{subType}** plan ({count} job{parseInt(count) > 1 ? 's' : ''} left).
                        </p>
                    )}
                </CardHeader>
                
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-8 py-6">
                        
                        {/* --- 1. CORE DETAILS --- */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                                <MapPin className="w-5 h-5 text-indigo-500" /> General Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
                                    <Input id="title" value={formData.title} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company <span className="text-red-500">*</span></Label>
                                    <Input id="company" value={formData.company} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="logoUrl">Company Logo URL (Optional)</Label>
                                    <Input id="logoUrl" type="url" value={formData.logoUrl} onChange={handleChange} placeholder="https://company.com/logo.png" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                                    <Input id="location" value={formData.location} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Job Type <span className="text-red-500">*</span></Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(value) => handleSelectChange('type', value)}
                                        required
                                    >
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select job type" />
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
                                    <Label htmlFor="expiryDate">Expiry Date <span className="text-red-500">*</span></Label>
                                    <Input id="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} required />
                                </div>
                            </div>
                        </section>
                        
                        {/* --- 2. COMPENSATION & TAGS --- */}
                        <section className="space-y-4 pt-4 border-t">
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                                <DollarSign className="w-5 h-5 text-green-600" /> Salary & Skills
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="salary">Salary Range / Compensation (Optional)</Label>
                                    <Input
                                        id="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        placeholder="e.g. $50,000 - $70,000 or Competitive"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags (comma-separated for filtering)</Label>
                                    <Input
                                        id="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        placeholder="e.g., React, Node.js, AI, Remote"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* --- 3. JOB CONTENT --- */}
                        <section className="space-y-6 pt-4 border-t">
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                                <Paperclip className="w-5 h-5 text-orange-500" /> Job Content
                            </h2>
                            <div className="space-y-2">
                                <Label htmlFor="description">Job Description <span className="text-red-500">*</span></Label>
                                <Textarea id="description" value={formData.description} onChange={handleChange} rows={6} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="requirements">Requirements / Qualifications <span className="text-red-500">*</span></Label>
                                <Textarea id="requirements" value={formData.requirements} onChange={handleChange} rows={5} required />
                            </div>
                        </section>

                        {/* --- 4. APPLICATION METHOD --- */}
                        <section className="space-y-4 pt-4 border-t">
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                                <Mail className="w-5 h-5 text-blue-500" /> Application Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="applyMethod">How should applicants apply? <span className="text-red-500">*</span></Label>
                                    <Select
                                        value={formData.applyMethod}
                                        onValueChange={(value: 'email' | 'link') => handleSelectChange('applyMethod', value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select application method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="email">Via Email</SelectItem>
                                            <SelectItem value="link">Via External Link (ATS/Careers Page)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                {/* Conditional Inputs */}
                                {(formData.applyMethod === 'email' || formData.applyMethod === 'link') && (
                                    <div className="space-y-2">
                                        <Label htmlFor={formData.applyMethod === 'email' ? 'applyEmail' : 'applyLink'}>
                                            {formData.applyMethod === 'email' ? 'Application Email' : 'Application URL'}
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <div className='relative'>
                                            {formData.applyMethod === 'email' ? (
                                                <Input
                                                    id="applyEmail"
                                                    type="email"
                                                    value={formData.applyEmail}
                                                    onChange={handleChange}
                                                    placeholder="hr@company.com"
                                                    required
                                                />
                                            ) : (
                                                <Input
                                                    id="applyLink"
                                                    type="url"
                                                    value={formData.applyLink}
                                                    onChange={handleChange}
                                                    placeholder="https://company.com/apply"
                                                    required
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                    </CardContent>
                    
                    {/* --- 5. FOOTER / ACTION --- */}
                    <CardFooter className="bg-gray-50 border-t flex justify-end p-4">
                        <Button type="submit" className="min-w-[150px] transition-all duration-300" disabled={isSubmitting}>
                            {isSubmitting ? 'Posting Job...' : 'Publish Job Listing'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        )}
    </div>
  );
};

export default AddJobNoSubs;