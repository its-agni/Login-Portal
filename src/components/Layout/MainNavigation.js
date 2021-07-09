import { Link } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  const isLoggedIn = ctx.isLoggedIn;

  const onLogout = () => {
    ctx.logout();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Portal</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/user">Dashboard</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
