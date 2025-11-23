// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   // For your real app, use logic to track user.
//   const [user, setUser] = useState(null); 
//   const login = (u) => setUser(u);
//   const logout = () => setUser(null);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
// export function useAuth() {
//   return useContext(AuthContext);
// }


import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      // Call backend login API
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      
      // Save token
      localStorage.setItem('token', response.data.token);
      
      // Set user
      setUser(response.data.user);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
