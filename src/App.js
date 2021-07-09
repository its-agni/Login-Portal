import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import UserHomepage from "./pages/UserHomepage";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        {!ctx.isLoggedIn && (
          <Route path="/" exact>
            <HomePage />
          </Route>
        )}
        {!ctx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {ctx.isLoggedIn && (
          <Route path="/user">
            <UserHomepage />
          </Route>
        )}
        <Route path="/settings">
          {ctx.isLoggedIn && <UserProfile />}
          {!ctx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          {!ctx.isLoggedIn && <Redirect to="/" />}
          {ctx.isLoggedIn && <Redirect to="user" />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
