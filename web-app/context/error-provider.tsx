'use client';

import React, { createContext, useContext, useState } from 'react';

interface ErrorContextProps {
  showError: (message: string) => void;
  hideError: () => void;
  message: string | null;
  enabled: boolean;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  const showError = (message: string) => {
    setMessage(message);
    setEnabled(true);
  };

  const hideError = () => {
    setEnabled(false);
    setMessage(null);
  };

  return (
    <ErrorContext.Provider value={{ showError, hideError, message, enabled }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}
