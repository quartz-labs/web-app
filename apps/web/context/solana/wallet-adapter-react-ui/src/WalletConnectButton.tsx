import React from 'react';
import { BaseWalletConnectButton } from './BaseWalletConnectButton.jsx';
import type { ButtonProps } from './Button.jsx';

const LABELS = {
    connecting: 'Connecting ...',
    connected: 'Connected',
    'has-wallet': 'Connect',
    'no-wallet': 'Connect Wallet',
} as const;

export function WalletConnectButton(props: ButtonProps) {
    return <BaseWalletConnectButton {...props} labels={LABELS} />;
}
