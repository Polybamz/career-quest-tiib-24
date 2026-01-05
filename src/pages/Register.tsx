import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Lock, User, Loader2, Building, ChevronLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import logo from '@/assets/logo/logo2.jpeg';
import { motion, AnimatePresence } from "framer-motion";



// A simple SVG for the Google icon
const GoogleIcon = (props) => (
    <svg viewBox="0 0 48 48" {...props}>
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.922C34.785 5.234 29.722 3 24 3C12.43 3 3 12.43 3 24s9.43 21 21 21s21-9.43 21-21c0-1.472-.149-2.903-.422-4.298z" />
        <path fill="#FF3D00" d="M6.306 14.691c2.242-4.333 6.521-7.394 11.455-8.225L10.92 12.72C8.583 13.342 6.84 13.919 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238c-2.008 1.521-4.51 2.43-7.219 2.43c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.447-2.275 4.485-4.244 5.964l6.19 5.238C42.018 36.372 44 30.659 44 24c0-1.472-.149-2.903-.422-4.298z" />
    </svg>
);


const AuthPage = () => {
    // Hooks remain at the top
    const navigate = useNavigate();
    const { redirect } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const { toast } = useToast();
    const { user, login, register, loginState, registerState } = useAuth(); // Keeping this for potential future user context integration
    const [steps, setSteps] = useState<'userType' | 'authStep'>('userType')
    const [direction, setDirection] = useState(1)


    // State to toggle between Login and Sign Up views
    const [isLoginView, setIsLoginView] = useState(searchParams.get('q') == 'login');

    // State for form inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState<'jobseeker' | 'employer' | null>(null);

    // State for loading and error handling
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    // Helper function for redirection logic, reusable for both login and registration responses
    const handleRedirect = (userData) => {
        if (userData.userType === 'jobseeker') {
            if (userData.profileComplete) {              
                    navigate('/job-seeker-portal');
            } else {
                navigate('/job-seeker-profile');
            }
        } else {
            if (redirect) {
                navigate(`/${redirect}`)
            } else {
                navigate('/employer-dashboard');
            }
        }
    };
    //
    useEffect(() => {
        if (user) {
            handleRedirect(user)
        }

    })

    // Handles the form submission for both login and registration
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoginView) {
            await login(email, password)
        } else {
            await register(name, email, password, userType, false)
        }

    };


    // Handles Google Sign-In using the API
    const handleGoogleSignIn = async () => {
        toast({
            title: 'Alert ',
            description: 'No'
        })
    };
    const nextStep = () => {
        setDirection(1)
        setSteps('authStep');
    }
    const prevStep = () => {
        setDirection(-1)
        setSteps('userType');
    }

    // The render section remains largely the same
    return (
        <div className="min-h-screen bg-muted/30 flex flex-col max-lg:justify-center justify-start items-center p-4">
            <Button variant="outline" className="fixed top-10 left-5" onClick={()=>{
                navigate('/')
            }}> <ChevronLeft size={24}/> <span className="max-lg:hidden">Go Back To Home</span></Button>
            {!isLoginView && <div className="flex fixed bottom-0 p-4 w-full border-t">
                <Button onClick={prevStep} variant='ghost' className={`${steps == 'authStep' ? 'block' : 'hidden'}`} disabled={!userType}>Back</Button>
                {steps == 'userType' ?
                    <Button onClick={nextStep} className="ml-auto" disabled={!userType}>Continue</Button> :
                    <Button className="ml-auto" disabled={registerState.loading} onClick={handleSubmit}>
                        {
                            registerState.loading ?
                                (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) :
                                'Submit'
                        }
                    </Button>
                }            </div>}
            {!isLoginView &&

                <div className="w-full flex justify-center items-center h-4 gap-1 max-lg:max-lg:fixed max-lg:mt-2 top-0">
                    <div className={`w-full bg-primary/30 max-md:h-6 max-md:w-6 max-md:rounded-full h-full rounded-[5px]`} />
                    <div className={`w-full ${steps == 'authStep' ? 'bg-primary/30' : 'bg-muted'} max-md:h-6 max-md:w-6 max-md:rounded-full   h-full rounded-[5px]`} />
                    <strong>  {steps == 'authStep' ? 2 : 1}/<span className="text-[10px]">2</span></strong>
                </div>}
            <div className="w-full flex justify-center items-center">
                <Card className="w-full max-w-md border-0">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">
                            {isLoginView ? "Welcome Back!" : "Create an Account"}
                        </CardTitle>
                        <CardDescription>
                            {isLoginView ? "Sign in to continue to your dashboard." : "Join YoCaCo, Connect, Create and Succeed"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!isLoginView && <form onSubmit={handleSubmit}>
                            <AnimatePresence
                                custom={direction}
                                mode="wait"
                            >
                                <motion.div
                                    key={steps}
                                    custom={direction}
                                    variants={
                                        {
                                            emter: (direction) => ({
                                                x: direction > 0 ? -300 : 300,
                                                opacity: 0
                                            }),
                                            center: {
                                                x: 0,
                                                opacity: 1
                                            },
                                            exit: (direction) => ({
                                                x: direction > 0 ? -300 : 300,
                                                opacity: 0
                                            })
                                        }
                                    }
                                >
                                    {
                                        steps == 'userType' ? <div className=" flex-1 ">
                                            <div className="space-y-2 lg:mb-12">
                                                <Label htmlFor="userType">Sellect your profile type</Label>
                                                <Card onClick={()=>setUserType('jobseeker')} className={`w-full min-h-16 p-2 border-2 border-primary cursor-pointer ${userType == 'jobseeker' && 'bg-primary/10'}`}>
                                                    <div className={`h-5 w-5 border-2 rounded-full ${userType == 'jobseeker' && 'bg-primary'} `}></div>
                                                    <div className="pl-4">
                                                        <p className="text-2xl font-bold">Job Seeker</p>
                                                        <p>I'm looking a job or freelance gig. </p>
                                                    </div>
                                                </Card>
                                                <Card onClick={()=> setUserType('employer')} className={`w-full min-h-16 p-2 border-2 border-primary cursor-pointer ${userType == 'employer' && 'bg-primary/10'}`}>
                                                    <div className={`h-5 w-5 border-2 rounded-full ${userType == 'employer' && 'bg-primary'} `}></div>
                                                    <div className="pl-4">
                                                        <p className="text-2xl font-bold">Employer</p>
                                                        <p>I'm hiring! Post a job and find top talent</p>
                                                    </div>
                                                </Card>
                                                {/* <Select value={userType} onValueChange={(value) => setUserType(value as 'jobseeker' | 'employer')}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="jobseeker">
                                                            <div className="flex items-center">
                                                                <User className="mr-2 h-4 w-4" />
                                                                Job Seeker
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="employer">
                                                            <div className="flex items-center">
                                                                <Building className="mr-2 h-4 w-4" />
                                                                Employer
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select> */}
                                            </div>
                                        </div> : <div className="gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Name</Label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        placeholder="John Doe"
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>
                                            {/* Email Input */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>
                                            {/* Password Input */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password">Password</Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    }
                                </motion.div>

                            </AnimatePresence>
                            {registerState.error && <p className="text-sm text-red-500 text-center">{registerState.error}</p>}

                        </form>}
                        {isLoginView && <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Input - Only shown in Sign Up view */}

                            {/* Email Input */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Error Message Display */}
                            {loginState.error && <p className="text-sm text-red-500 text-center">{loginState.error}</p>}


                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={registerState.loading || loginState.loading}>
                                {registerState.loading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : loginState.loading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    isLoginView ? "Login" : "Create Account"
                                )}
                            </Button>
                        </form>}

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Google Sign-In Button */}
                        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={true}>
                            <GoogleIcon className="mr-2 h-5 w-5" />
                            Google
                        </Button>

                    </CardContent>
                    <CardFooter className="flex justify-center text-sm">
                        <p>
                            {isLoginView ? "Don't have an account?" : "Already have an account?"}
                            <Button
                                variant="link"
                                className="pl-2"
                                onClick={() => {
                                    setSearchParams((prev)=>{prev.set('q',searchParams.get('q') == 'login' ? 'register' : 'login') ; return prev;})
                                    setIsLoginView(searchParams.get('q') == 'login')
                                }}
                            >
                                {isLoginView ? "Sign Up" : "Login"}
                            </Button>
                        </p>
                    </CardFooter>
                </Card>
                {isLoginView && <div className=" h-screen  flex justify-center items-center max-lg:hidden">
                    <img src={`${logo}`} alt="logo" className="rounded" />
                </div>}
            </div>
        </div>
    );
};

export default AuthPage;