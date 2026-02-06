import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_BASE_URL = 'https://store-flow-api.vercel.app';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            },
            timeout: 5000 // 5 second timeout
          });

          if (response.data.success) {
            setUser(response.data.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          // Only log in development
          if (process.env.NODE_ENV === 'development') {
            console.warn('Token verification skipped - API unavailable:', error.message);
          }

          // Don't clear token on server errors - might be temporary
          if (error.response?.status === 500) {
            // Server error - keep token, user can try again
            console.warn('Server error during verification - keeping existing token');
          } else {
            // Other errors (401, 403) - clear invalid token
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        }
      }

      setLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        setUser(user);
        return { success: true, message: response.data.message };
      }

      return {
        success: false,
        message: response.data.message || 'Login failed'
      };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);

      // Provide user-friendly error messages
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          message: 'Request timeout. Please check your internet connection.'
        };
      }

      if (error.response?.status === 500) {
        return {
          success: false,
          message: 'Server error. Please try again later or contact support.'
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.'
      };
    }
  };

  const register = async (shopData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, shopData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        setUser(user);
        return { success: true, message: response.data.message };
      }

      return {
        success: false,
        message: response.data.message || 'Registration failed'
      };
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);

      if (error.response?.status === 500) {
        return {
          success: false,
          message: 'Server error. Please try again later or contact support.'
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};