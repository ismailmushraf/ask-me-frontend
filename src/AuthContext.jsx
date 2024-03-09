import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
  });

  const login = (token) => {
    Cookies.set('jwtToken', token);  
    setIsAuthenticated(true);
  }

  const logout = () => {
    Cookies.remove('jwtToken');
    setIsAuthenticated(false);
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
    {children}
  </AuthContext.Provider>
};

export const useAuth = () => {
  return useContext(AuthContext);
};
