'use client';

import React, { createContext, useContext, useState } from 'react';

export enum TxStatus {
  NONE,
  SIGNING,
  SIGN_REJECTED,
  SENT,
  SENT_TIME_WARNING,
  CONFIRMED,
  TIMEOUT,
  FAILED,
  BLOCKHASH_EXPIRED,
  ERROR
}

export interface TxStatusProps {
  signature?: string;
  walletAddress?: string;
  status: TxStatus;
}

interface TxStatusContextProps {
  showTxStatus: (props: TxStatusProps) => void;
  hideTxStatus: () => void;
  props: TxStatusProps | null;
  enabled: boolean;
}

const TxStatusContext = createContext<TxStatusContextProps | undefined>(undefined);

export function TxStatusProvider({ children }: { children: React.ReactNode }) {
  const [props, setProps] = useState<TxStatusProps | null>(null);
  const [enabled, setEnabled] = useState(false);

  const showTxStatus = (props: TxStatusProps) => {
    if (props.status === TxStatus.NONE) return hideTxStatus();

    setProps(props);
    setEnabled(true);
  };

  const hideTxStatus = () => {
    setEnabled(false);
    setProps(null);
  };

  return (
    <TxStatusContext.Provider value={{ showTxStatus, hideTxStatus, props, enabled }}>
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
