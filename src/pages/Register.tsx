import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Lock, User, Loader2, Building } from "lucide-react";
import { 
  loginWithEmailAndPassword, 
  registerWithEmailAndPassword, 
  signInWithGoogle,
  db
} from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useToast } from '@/hooks/use-toast';

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
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State to toggle between Login and Sign Up views
  const [isLoginView, setIsLoginView] = useState(true);
  
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<'jobseeker' | 'employer'>('jobseeker');
  
  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handles the form submission for both login and registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLoginView) {
        // Handle Login
        const result = await loginWithEmailAndPassword(email, password);
        if (result.user) {
          toast({
            title: "Login successful!",
            description: "Welcome back!",
          });
          
          // Get user data to determine redirect
          const userRef = doc(db, 'users', result.user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.userType === 'jobseeker') {
              if (userData.profileComplete) {
                navigate('/job-seeker-portal');
              } else {
                navigate('/job-seeker-profile');
              }
            } else {
              navigate('/employer-dashboard');
            }
          }
        }
      } else {
        // Handle Registration
        if (!name) {
          setError("Please enter your name.");
          setIsLoading(false);
          return;
        }
        const userCredential = await registerWithEmailAndPassword(name, email, password);
        
        // Update user document with user type
        const userRef = doc(db, 'users', userCredential.user.uid);
        await updateDoc(userRef, {
          userType: userType
        });
        
        toast({
          title: "Registration successful!",
          description: "Welcome to Your Career Companion",
        });
        
        // Redirect based on user type after successful registration
        if (userType === 'jobseeker') {
          navigate('/job-seeker-profile');
        } else {
          navigate('/employer-dashboard');
        }
      }
    } catch (err: any) {
      // Map Firebase error codes to user-friendly messages
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        errorMessage = "Invalid email or password.";
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "An account with this email already exists.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handles Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithGoogle();
      
      // Update user document with user type if it's a new registration
      if (!isLoginView) {
        const userRef = doc(db, 'users', result.user.uid);
        await updateDoc(userRef, {
          userType: userType
        });
      }
      
      // Redirect based on user type
      if (userType === 'employer') {
        navigate('/employer-dashboard');
      } else {
        navigate('/jobs');
      }
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isLoginView ? "Welcome Back!" : "Create an Account"}
          </CardTitle>
          <CardDescription>
            {isLoginView ? "Sign in to continue to your dashboard." : "Enter your details to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input - Only shown in Sign Up view */}
            {!isLoginView && (
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
            )}

            {/* User Type Selection - Only shown in Sign Up view */}
            {!isLoginView && (
              <div className="space-y-2">
                <Label htmlFor="userType">I am a</Label>
                <Select value={userType} onValueChange={(value: 'jobseeker' | 'employer') => setUserType(value)}>
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
                </Select>
              </div>
            )}
            
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
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                isLoginView ? "Login" : "Create Account"
              )}
            </Button>
          </form>

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
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
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
                setIsLoginView(!isLoginView);
                setError(null); // Clear errors when switching views
              }}
            >
              {isLoginView ? "Sign Up" : "Login"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
