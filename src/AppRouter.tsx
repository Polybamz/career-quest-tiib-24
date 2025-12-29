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
import AdminLayout from "./components/layout/Adminlayout";
import AddJobNoSubs from "./pages/AddJobNoSubs";
import Overview from "./components/admin-user/overview";
import JobManagement from "./components/admin-user/job-management";

const AppRouter = () => {
  useRouteTransition();
  return (<Routes>
    <Route path="/" element={<Home />} />
      <Route path="/employer-dashboard" element={<AdminLayout />}>
              <Route path="/employer-dashboard/" element={<Overview />} />
              <Route path="/employer-dashboard/jobs_listing" element={<JobManagement/>} />
              <Route path="/employer-dashboard/settings" element={<div>Comming soon .......</div>} />
            </Route>
    <Route path="/jobs" element={<Jobs />} />
    <Route path="/coaching" element={<Coaching />} />
    <Route path="/employers" element={<Employers />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/tiib" element={<TIIB />} />
    <Route path="/auth" element={<Register />} />
    <Route path="/auth/:redirect" element={<Register />} />
    <Route path="/auth/:redirect" element={<Register />} />
{/* ///////////////////////////////////    <Route path="/job-seeker-profile" element={<JobSeekerProfile />} /> */}
    <Route path="/job-seeker-portal" element={<JobSeekerPortal />} />
    <Route path="/:type/article/:id" element={<ArticlePage />} />
    <Route path="/add-job/:amount/:count/:type" element={<AddJobNoSubs />} />

    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>)
}


export default AppRouter;