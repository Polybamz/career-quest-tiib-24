import { Outlet, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Menu, Bell, LayoutDashboard, Briefcase, Users, Building2, CreditCard, FileText, Settings, User , LogOut, Settings2} from "lucide-react";
interface NavItem {
    id: string;
    label: string;
    icon: any;
    href: string;
    badge?: string;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

const navigation: NavSection[] = [
    {
        title: "Overview",
        items: [
            { id: "dashboard", label: "Overview", icon: LayoutDashboard, href: "/employer-dashboard" }
        ]
    },
    {
        title: "Jobs Management",
        items: [
            { id: "jobs", label: "Job Management", icon: Briefcase, href: "/employer-dashboard/jobs_listing" },

        ]
    },
    {
        title: "Use Management",
        items: [
            { id: "setting", label: "Settings", icon: Settings, href: "/employer-dashboard/settings" },

        ]
    },


];

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const {user, logout} = useAuth()
    const    [isActive, setIsActive] = useState<boolean>(false)
    return (
        <div className="w-full min-h-screen flex border">
            <aside className=" fixed left-0 top-0 z-40 h-screen  border-red-200 transition-all duration-300 ease-smooth w-64 max-lg:w-16">
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center  px-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary"></div>
                            {sidebarOpen && (
                                <div className="flex flex-col max-lg:hidden">
                                    <span className="text-sm font-semibold">Employer Portal</span>
                                    <span className="text-xs text-muted-foreground">///</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 p-4">
                        {navigation.map((section) => (
                            <div key={section.title} className="space-y-1 flex-1">
                                {sidebarOpen && (
                                    <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wide max-lg:hidden">
                                        {section.title}
                                    </p>
                                )}
                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                   
                                     const isActive = `${location.pathname}` === item.href;
                                    //   setIsActive( Active )
                                    return (
                                        <Button
                                            key={item.id}
                                            variant={isActive ? "default" : "ghost"}
                                            className={`w-full justify-center md:justify-start items-center gap-3 ${!sidebarOpen && "px-3"}`}
                                            asChild
                                        >
                                            <Link to={{pathname:item.href, search: `id=${user?.uid}`}} title={item.label}>
                                                <Icon className="h-4 w-4 flex-shrink-0" />

                                                <div className={`max-lg:hidden`}>
                                                    <span className="flex-1 text-left">{item.label}</span>
                                                    {item.badge && (
                                                        <span className="ml-auto rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>

                                            </Link>
                                        </Button>
                                    );
                                })}

                            </div>

                        ))}
                        <div className="flex-1"></div>
                        <Button variant="link"   onClick={() => {logout}}><LogOut/> <span className="text-black max-lg:hidden">Log Out</span></Button>
                    </nav>
                    
                </div>
            </aside>
            {/* Main Content */}
            <div className={`transition-all w-full duration-300 ease-smooth border-l  lg:ml-64 ml-16`}>
                <header className="sticky top-0 z-30 flex h-16 items-center shadow-sm bg-background/95 backdrop-blur-sm px-6">
                    <div className="flex items-center gap-4 mr-auto">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden"
                        >
                            <Menu className="h-4 w-4" />
                        </Button>
                        <h1 className="text-lg font-semibold">Employer Dashboard</h1>
                    </div>
                     <p>{user?.name}</p>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="relative">
                            <Bell className="h-4 w-4" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary"></span>
                        </Button>


                    </div>
                </header>

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )

}

export default AdminLayout;