import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isOnboardingCompleted: boolean;
  user: {
    name?: string;
    email?: string;
    authProvider?: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  socialLogin: (provider: string) => Promise<boolean>;
  biometricLogin: () => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => void;
  completeOnboarding: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(false);
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated');
      const onboarding = localStorage.getItem('onboardingCompleted');
      
      if (auth === 'true') {
        setIsAuthenticated(true);
        
        // Get user info from localStorage
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const authProvider = localStorage.getItem('authProvider');
        
        setUser({
          name: userName || undefined,
          email: userEmail || undefined,
          authProvider: authProvider || undefined,
        });
      } else {
        // For development purposes, auto-authenticate
        setIsAuthenticated(true);
        setUser({
          name: "Demo User",
          email: "demo@example.com",
          authProvider: "demo"
        });
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', 'Demo User');
        localStorage.setItem('userEmail', 'demo@example.com');
        localStorage.setItem('authProvider', 'demo');
      }
      
      if (onboarding === 'true') {
        setIsOnboardingCompleted(true);
      }
    };
    
    checkAuth();
  }, []);

  // Login with email and password
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's simulate a successful login for a specific email/password
      if (email === 'demo@example.com' && password === 'password123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        
        setIsAuthenticated(true);
        setUser({
          email,
          authProvider: 'email',
        });
        
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with social provider
  const socialLogin = async (provider: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, always succeed with social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('authProvider', provider);
      
      setIsAuthenticated(true);
      setUser({
        authProvider: provider,
      });
      
      return true;
    } catch (err) {
      setError(`Failed to login with ${provider}. Please try again.`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with biometric authentication
  const biometricLogin = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate biometric authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if browser supports WebAuthn
      if (window.PublicKeyCredential) {
        // In a real app, you would implement WebAuthn here
        // For demo purposes, just simulate success
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authProvider', 'biometric');
        
        setIsAuthenticated(true);
        setUser({
          authProvider: 'biometric',
        });
        
        return true;
      } else {
        setError('Biometric authentication is not supported on this device.');
        return false;
      }
    } catch (err) {
      setError('Biometric authentication failed. Please try again or use another method.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email and password
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's simulate a successful signup
      // In a real app, you would call your API to create a user account
      
      // Simulate email already exists error for a specific email
      if (email === 'existing@example.com') {
        setError('This email is already registered. Please use a different email or login.');
        return false;
      }
      
      // If we get here, signup was successful
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('authProvider', 'email');
      
      setIsAuthenticated(true);
      setUser({
        name,
        email,
        authProvider: 'email',
      });
      
      return true;
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always succeed with password reset
      // In a real app, you would call your API to send a password reset email
      
      // You could simulate a failure for a specific email if needed
      // if (email === 'nonexistent@example.com') {
      //   setError('Email not found. Please check your email or create an account.');
      //   return false;
      // }
      
      return true;
    } catch (err) {
      setError('An error occurred. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authProvider');
    
    setIsAuthenticated(false);
    setUser(null);
  };

  // Complete onboarding
  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setIsOnboardingCompleted(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isOnboardingCompleted,
        user,
        login,
        socialLogin,
        biometricLogin,
        signup,
        resetPassword,
        logout,
        completeOnboarding,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
