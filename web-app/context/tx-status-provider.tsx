'use client';

import React, { createContext, useContext, useState } from 'react';

export interface TxStatusProps {
  signature: string;
}

interface TxStatusContextProps {
  show: (props: TxStatusProps) => void;
  hide: () => void;
  props: TxStatusProps | null;
  enabled: boolean;
}

const TxStatusContext = createContext<TxStatusContextProps | undefined>(undefined);

export function TxStatusProvider({ children }: { children: React.ReactNode }) {
  const [props, setProps] = useState<TxStatusProps | null>(null);
  const [enabled, setEnabled] = useState(false);

  const show = (props: TxStatusProps) => {
    setProps(props);
    setEnabled(true);
  };

  const hide = () => {
    setEnabled(false);
    setProps(null);
  };

  return (
    <TxStatusContext.Provider value={{ show, hide, props, enabled }}>
      {children}
    </TxStatusContext.Provider>
  );
}

export function useTxStatus() {
  const context = useContext(TxStatusContext);
  if (context === undefined) {
    throw new Error('useTxStatus must be used within an TxStatusProvider');
  }
  return context;
}
