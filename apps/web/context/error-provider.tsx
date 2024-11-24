"use client";

import React, { createContext, useContext, useState } from "react";

export interface ShowErrorProps {
  message: string;
  body: string;
  errorId: string;
}

interface ErrorContextProps {
  showError: (props: ShowErrorProps) => void;
  hideError: () => void;
  showDetails: (props: ShowErrorProps) => void;
  hideDetails: () => void;
  propsError: ShowErrorProps | null;
  propsDetails: ShowErrorProps | null;
  errorEnabled: boolean;
  detailsEnabled: boolean;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [propsError, setPropsError] = useState<ShowErrorProps | null>(null);
  const [propsDetails, setPropsDetails] = useState<ShowErrorProps | null>(null);
  const [errorEnabled, setErrorEnabled] = useState(false);
  const [detailsEnabled, setDetailsEnabled] = useState(false);

  const showError = (props: ShowErrorProps) => {
    setPropsError(props);
    setErrorEnabled(true);
  };

  const hideError = () => {
    setErrorEnabled(false);
    setPropsError(null);
  };

  const showDetails = (props: ShowErrorProps) => {
    hideError();
    setPropsDetails(props);
    setDetailsEnabled(true);
  };

  const hideDetails = () => {
    setDetailsEnabled(false);
    setPropsDetails(null);
  };

  return (
    <ErrorContext.Provider
      value={{ showError, hideError, showDetails, hideDetails, propsError, propsDetails, errorEnabled, detailsEnabled }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
}
