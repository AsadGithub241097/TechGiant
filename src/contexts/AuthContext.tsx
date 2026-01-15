import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sendWorkingEmailNotification } from '../services/workingEmailService';

// Types for our authentication system
export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  status: 'pending' | 'approved' | 'denied';
  createdAt: string;
  approvedAt?: string;
  loginMethod: 'manual' | 'google' | 'facebook';
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: SignupData) => Promise<{ success: boolean; message: string }>;
  socialLogin: (provider: 'google' | 'facebook') => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  checkAuthStatus: () => void;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock API functions - In production, replace with actual API calls
const mockAPI = {
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('techgiant_users') || '[]');
    const user = users.find((u: User) => u.email === email);
    
    if (!user) {
      return { success: false, message: 'User not found. Please sign up first.' };
    }
    
    // Check stored password (in production, this would be hashed)
    const passwords = JSON.parse(localStorage.getItem('techgiant_passwords') || '{}');
    if (passwords[email] !== password) {
      return { success: false, message: 'Invalid password.' };
    }
    
    if (user.status === 'pending') {
      return { success: false, message: 'Your account is pending approval. Please wait for admin approval.' };
    }
    
    if (user.status === 'denied') {
      return { success: false, message: 'Your account has been denied. Please contact support at +91 8008771893.' };
    }
    
    return { success: true, user, message: 'Login successful!' };
  },

  async signup(userData: SignupData): Promise<{ success: boolean; message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('techgiant_users') || '[]');
    const passwords = JSON.parse(localStorage.getItem('techgiant_passwords') || '{}');
    
    // Check if user already exists
    if (users.find((u: User) => u.email === userData.email)) {
      return { success: false, message: 'User already exists with this email.' };
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      status: 'pending',
      createdAt: new Date().toISOString(),
      loginMethod: 'manual'
    };
    
    // Save user and password
    users.push(newUser);
    passwords[userData.email] = userData.password;
    
    localStorage.setItem('techgiant_users', JSON.stringify(users));
    localStorage.setItem('techgiant_passwords', JSON.stringify(passwords));
    
    // Send email notification to admin
    await this.sendAdminNotification(newUser);
    
    return { success: true, message: 'Account created successfully! Please wait for admin approval.' };
  },

  async socialLogin(provider: 'google' | 'facebook', userData: { email: string; name: string; profilePicture?: string }): Promise<{ success: boolean; user?: User; message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('techgiant_users') || '[]');
    let user = users.find((u: User) => u.email === userData.email);
    
    if (!user) {
      // Create new social user
      user = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        profilePicture: userData.profilePicture,
        status: 'pending',
        createdAt: new Date().toISOString(),
        loginMethod: provider
      };
      
      users.push(user);
      localStorage.setItem('techgiant_users', JSON.stringify(users));
      
      // Send email notification to admin
      await this.sendAdminNotification(user);
      
      return { success: false, message: 'Account created! Please wait for admin approval.' };
    }
    
    if (user.status === 'pending') {
      return { success: false, message: 'Your account is pending approval. Please wait for admin approval.' };
    }
    
    if (user.status === 'denied') {
      return { success: false, message: 'Your account has been denied. Please contact support at +91 8008771893.' };
    }
    
    return { success: true, user, message: 'Login successful!' };
  },

  async sendAdminNotification(user: User) {
    try {
      // Send notification using working email service (no 403 errors)
      const emailSent = await sendWorkingEmailNotification(user);
      
      if (emailSent) {
        console.log(`✅ Admin notification process completed for user: ${user.name}`);
      } else {
        console.log(`❌ Admin notification process failed for user: ${user.name}`);
      }
      
    } catch (error) {
      console.error('Error in admin notification process:', error);
      // Still continue with registration even if email fails
    }
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = user !== null && user.status === 'approved';

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    setIsLoading(true);
    const savedUser = localStorage.getItem('techgiant_current_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Verify user still exists and is approved
      const users = JSON.parse(localStorage.getItem('techgiant_users') || '[]');
      const currentUser = users.find((u: User) => u.id === userData.id);
      if (currentUser && currentUser.status === 'approved') {
        setUser(currentUser);
      } else {
        localStorage.removeItem('techgiant_current_user');
        setUser(null);
      }
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await mockAPI.login(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('techgiant_current_user', JSON.stringify(result.user));
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      return await mockAPI.signup(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      // Mock social login data - in production, this would come from the OAuth provider
      const mockSocialData = {
        google: {
          email: 'user@gmail.com',
          name: 'John Doe',
          profilePicture: 'https://via.placeholder.com/150'
        },
        facebook: {
          email: 'user@facebook.com',
          name: 'Jane Smith',
          profilePicture: 'https://via.placeholder.com/150'
        }
      };

      const result = await mockAPI.socialLogin(provider, mockSocialData[provider]);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('techgiant_current_user', JSON.stringify(result.user));
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('techgiant_current_user');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    socialLogin,
    logout,
    checkAuthStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
