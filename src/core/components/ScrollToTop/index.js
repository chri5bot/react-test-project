import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
