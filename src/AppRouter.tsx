import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Coaching from "./pages/Coaching";
import Employers from "./pages/Employers";
import Contact from "./pages/Contact";
import TIIB from "./pages/TIIB";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import ArticlePage from "./pages/Article";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobSeekerProfile from "./pages/JobSeekerProfile";
import JobSeekerPortal from "./pages/JobSeekerPortal";
import { Routes, Route } from "react-router-dom";
import useRouteTransition from "./hooks/useRouteransition";

const AppRouter = () => {
    useRouteTransition();
    return (<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/employers" element={<Employers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tiib" element={<TIIB />} />
        <Route path="/auth" element={<Register />} />
        <Route path="/auth/:redirect" element={<Register />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/job-seeker-profile" element={<JobSeekerProfile />} />
        <Route path="/job-seeker-portal" element={<JobSeekerPortal />} />
        <Route path="/:type/article/:id" element={<ArticlePage />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
    </Routes>)
}


export default AppRouter;