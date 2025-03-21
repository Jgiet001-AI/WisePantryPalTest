import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  isDarkMode: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return (savedMode as ThemeMode) || 'system';
  });
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Update theme based on system preference or user choice
  useEffect(() => {
    const updateTheme = () => {
      if (mode === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
        document.documentElement.classList.toggle('dark-mode', prefersDark);
      } else {
        const isDark = mode === 'dark';
        setIsDarkMode(isDark);
        document.documentElement.classList.toggle('dark-mode', isDark);
      }
    };
    
    updateTheme();
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (mode === 'system') {
        updateTheme();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [mode]);
  
  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);
  
  // Add CSS variables for theme
  useEffect(() => {
    // Create and add theme styles
    const style = document.createElement('style');
    style.id = 'theme-styles';
    style.textContent = `
      :root {
        --color-background: #ffffff;
        --color-surface: #f8f9fa;
        --color-surface-variant: #f0f1f2;
        --color-text-primary: #212529;
        --color-text-secondary: #6c757d;
        --color-border: #dee2e6;
        --color-shadow: rgba(0, 0, 0, 0.1);
        --color-shadow-strong: rgba(0, 0, 0, 0.15);
      }
      
      .dark-mode {
        --color-background: #121212;
        --color-surface: #1e1e1e;
        --color-surface-variant: #2c2c2c;
        --color-text-primary: #e9ecef;
        --color-text-secondary: #adb5bd;
        --color-border: #343a40;
        --color-shadow: rgba(0, 0, 0, 0.3);
        --color-shadow-strong: rgba(0, 0, 0, 0.5);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      const existingStyle = document.getElementById('theme-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);
  
  const toggleMode = () => {
    setMode(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  };
  
  return (
    <ThemeContext.Provider value={{ mode, isDarkMode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
