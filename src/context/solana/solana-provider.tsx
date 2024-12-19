'use client';

import dynamic from 'next/dynamic';

import { WalletError } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from './wallet-adapter-react-ui';
import { type ReactNode, useCallback, useMemo } from 'react';
import { ClusterProvider, useCluster } from './cluster-data-access';

import './wallet-adapter-react-ui/styles.css';

type WalletButtonProps = React.ComponentProps<typeof WalletMultiButton> & {
  onCloseAccount?: () => void;
  disableCloseAccount: boolean;
};

export const WalletButton = dynamic(
  async () => {
    const { WalletMultiButton } = await import('./wallet-adapter-react-ui');
    const WalletButtonWrapper = (props: WalletButtonProps) => (
      <WalletMultiButton {...props} />
    );
    WalletButtonWrapper.displayName = 'WalletButton';
    return WalletButtonWrapper;
  },
  { ssr: false }
);

export function SolanaProvider({ children }: { children: ReactNode }) {
  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  );
}
