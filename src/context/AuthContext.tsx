import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => false,
  register: async () => false,
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
        setAuthState({ ...initialState, isLoading: false });
      }
    } else {
      setAuthState({ ...initialState, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulating API call with setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, using mock data and accepting any password
        const user = users.find(u => u.email === email);
        
        if (user) {
          // Store user in local storage
          localStorage.setItem('user', JSON.stringify(user));
          
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulating API call with setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user with this email already exists
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
          resolve(false);
        } else {
          // Create a new user
          const newUser: User = {
            id: `user_${Date.now()}`,
            name,
            email,
            role: 'user',
            registeredEvents: []
          };
          
          // In a real app, this would be handled by the backend
          users.push(newUser);
          
          // Store user in local storage
          localStorage.setItem('user', JSON.stringify(newUser));
          
          setAuthState({
            user: newUser,
            isAuthenticated: true,
            isLoading: false
          });
          resolve(true);
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};