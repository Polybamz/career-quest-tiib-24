import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useRouteTransition = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); // optional smooth scroll
  }, [pathname]);
};

export default useRouteTransition;
