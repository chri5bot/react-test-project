import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {
  useAuth,
  ROOT_ROUTE,
  LOGIN_ROUTE,
  USER_PROFILE_ROUTE,
  ScrollToTop,
  AppHeader,
  Footer
} from "./core";
import Login from "./containers/Login";
import Home from "./containers/Home";
import UserProfile from "./containers/UserProfile";

const Routes = () => {
  const {
    state: { isAuth }
  } = useAuth();

  return (
    <Router>
      <ScrollToTop />
      {isAuth && <AppHeader />}
      <Switch>
        <Route exact path={LOGIN_ROUTE} component={Login} />
        <Route exact path={ROOT_ROUTE} component={Home} />
        <Route path={USER_PROFILE_ROUTE} component={UserProfile} />
        <Redirect to={ROOT_ROUTE} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Routes;
