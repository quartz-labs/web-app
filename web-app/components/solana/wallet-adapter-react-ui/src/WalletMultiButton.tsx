import React from 'react';
import { BaseWalletMultiButton } from './BaseWalletMultiButton.js';
import type { ButtonProps } from './Button.js';

const LABELS = {
    'change-wallet': 'Close account',
    connecting: 'Connecting ...',
    'copy-address': 'Copy address',
    copied: 'Copied',
    disconnect: 'Disconnect',
    'has-wallet': 'Connect',
    'no-wallet': 'Select Wallet',
} as const;

interface WalletMultiButtonProps extends ButtonProps {
    onCloseAccount: () => void;
}

export function WalletMultiButton({ onCloseAccount, ...props }: WalletMultiButtonProps) {
    return <BaseWalletMultiButton {...props} labels={LABELS} onCloseAccount={onCloseAccount} />;
}
