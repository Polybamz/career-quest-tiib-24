import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useRouteTransition = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const body = document.body;
    body.style.transition = "opacity 0.3s ease";
    body.style.opacity = "0";

    // Wait for fade-out before scrolling
    const timeout = setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        body.style.opacity = "1";
      });
    }, 150); // brief delay to let content mount

    return () => clearTimeout(timeout);
  }, [pathname]);
};

export default useRouteTransition;
