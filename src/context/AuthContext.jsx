// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // 1. Initialize state from localStorage (for persistence on refresh)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  // 2. Define the logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login'); 
  };

  const isLoggedIn = !!user;

  // 3. Provide the state and functions to the application
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};