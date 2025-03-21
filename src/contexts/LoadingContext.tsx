import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: Record<string, boolean>;
  startLoading: (key: string) => void;
  stopLoading: (key: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const startLoading = (key: string) => {
    setIsLoading(prev => ({ ...prev, [key]: true }));
  };

  const stopLoading = (key: string) => {
    setIsLoading(prev => ({ ...prev, [key]: false }));
  };

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
