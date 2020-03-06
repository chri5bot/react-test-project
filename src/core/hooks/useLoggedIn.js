import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth, ROOT_ROUTE, LOGIN_ROUTE } from "..";

export const useLoggedIn = () => {
  const {
    state: { isAuth }
  } = useAuth();
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuth && pathname !== LOGIN_ROUTE) history.push(LOGIN_ROUTE);
    if (isAuth && pathname === LOGIN_ROUTE) history.push(ROOT_ROUTE);
  }, [pathname, isAuth, history]);
};
