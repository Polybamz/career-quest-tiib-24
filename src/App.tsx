import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Coaching from "./pages/Coaching";
import Employers from "./pages/Employers";
import Contact from "./pages/Contact";
import TIIB from "./pages/TIIB";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MobileNav from "./components/layout/MobileNav";
import Register from "./pages/Register";
import ArticlePage from "./pages/Article";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobSeekerProfile from "./pages/JobSeekerProfile";
import JobSeekerPortal from "./pages/JobSeekerPortal";
import CookieConsentBanner from "./components/ui/cookies_concent";
import AppRouter from "./AppRouter";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <AppRouter/>   
            </main>
            <Footer />
            <MobileNav />
          </div>
        </BrowserRouter>
        <CookieConsentBanner/>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
