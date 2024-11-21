// hooks/authContext.tsx

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser } from '@/services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string, role?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const role = await AsyncStorage.getItem('userRole');

      if (accessToken && role) {
        setIsAuthenticated(true);
        setUserRole(role);
      }
    };

    checkAuthStatus();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const role = await loginUser(email, password);
      setIsAuthenticated(true);
      setUserRole(role);
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  }, []);

  const register = useCallback(async (username: string, email: string, password: string, role: string = 'athlete') => {
    try {
      await registerUser(username, email, password, role);
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};