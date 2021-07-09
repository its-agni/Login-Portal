import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const timeCal = (timeout) => {
  const timeNow = new Date().getTime();
  const timeAdj = new Date(timeout).getTime();

  const timeLeft = timeAdj - timeNow;
  return timeLeft;
};

const storedToken = () => {
  const initialStoredToken = localStorage.getItem("token");
  const storedTime = localStorage.getItem("expireTime");
  const leftTime = timeCal(storedTime);
  if (leftTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    return null;
  }

  return {
    token: initialStoredToken,
    timeLeft: leftTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = storedToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, timeout) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expireTime", timeout);

    const timeoutTime = timeCal(timeout);
    logoutTimer = setTimeout(logoutHandler, timeoutTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.timeLeft);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
