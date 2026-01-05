import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from '../../assets/logo/logo2.jpeg';
import tiiblogo from "@/assets/logo/tiib-logo.png";

import { useAuth } from '@/hooks/useAuth';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Career Coaching", href: "/coaching" },
    { name: "For Employers", href: "/employers" },
    { name: "TIIB", href: "/tiib" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${location.pathname == '/tiib' ? "hidden" : location.pathname.split('/')[1] == 'employer-dashboard' ? "hidden" :location.pathname.split('/')[1] =='auth' ? 'hidden' :"block"}`}>
      <div className="container mx-auto px-4"> 
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-12 w-12 rounded bg-muted">
              {location.pathname == '/tiib' &&
                (
                  <img src={`${tiiblogo}`} alt="TIIB logo" className="rounded" />
                )
              }
              {location.pathname !== '/tiib' && (
                <img src={`${logo}`} alt="logo" className="rounded" />
              )}
            </div>
            <div className="flex flex-col justify-center h-[0px] items-start">
              {location.pathname == '/tiib' ? (
                <span className="text-xl font-bold text-secondary">TIIB</span>
              ) : (
                <span className="text-xl font-bold text-primary">YoCaCo</span>
              )}

              {location.pathname == '/tiib' ? (
                <span className=" font-[400] text-[12px] text-secondary">The Institute of Integrity Building
                </span>
              ) : (
                <span className=" font-[400] text-[12px] text-primary">Your Career Companion</span>
              )}


            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname == '/tiib' ? 'text-secondary' : location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <Link to={user.userType == 'employer' ? '/employer-dashboard' : '/job-seeker-portal'} className="py-1 px-4 rounded-sm text-white bg-primary ">Portal</Link>) :
               (<div className=" flex gap-2">

                <Link to={{pathname:'/auth', search: 'q=login'}} className="py-[2px] px-4 rounded-sm border-2 border-primary text-primary ">
              Login
            </Link>
            <Link to={{pathname:'/auth', search: 'q=register'}} className="py-1 px-4 rounded-sm text-white bg-primary ">
              Register
            </Link>
               </div>)}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/tiib' && 'text-secondary'} ${location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {user ? (<Link
                  onClick={() => setIsOpen(false)}
                  to={{
                    pathname: user.userType == 'employer' ?
                      '/employer-dashboard' :
                      '/job-seeker-portal',
                    search:`id=${user.uid}`
                  }}
                  className="py-1 px-4 rounded-sm text-white bg-primary ">
                  Portal
                </Link>)
                  : (<Link  to={{pathname:'/auth', search: 'q=register'}} className="py-1 px-4 rounded-sm text-white bg-primary ">
                    Sign In
                  </Link>)}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;