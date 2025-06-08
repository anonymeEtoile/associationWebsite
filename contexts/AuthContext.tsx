
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { User, AuthContextType } from '../types';
import { loginUser, logoutUser, getStoredUser, storeUser, clearStoredUser, checkAuthStatus } from '../services/dataService'; // Renamed from authService

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      setLoading(true);
      const user = await getStoredUser();
      const authStatus = await checkAuthStatus(); // This could check a mock token validity
      if (user && authStatus) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
        // Ensure local storage is cleared if auth status is false
        // This is important if a token becomes invalid or user explicitly logged out elsewhere
        await clearStoredUser(); 
      }
      setLoading(false);
    };
    checkUserStatus();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    const user = await loginUser(email, password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      await storeUser(user); // Store user info and mock token
      setLoading(false);
      return true;
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    return false;
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    await logoutUser();
    setCurrentUser(null);
    setIsAuthenticated(false);
    await clearStoredUser();
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
    