import React from 'react';
import { BaseWalletMultiButton } from './BaseWalletMultiButton.jsx';
import type { ButtonProps } from './Button.jsx';

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
    disableCloseAccount: boolean;
}

export function WalletMultiButton({ onCloseAccount, disableCloseAccount, ...props }: WalletMultiButtonProps) {
    return <BaseWalletMultiButton {...props} labels={LABELS} onCloseAccount={onCloseAccount} disableCloseAccount={disableCloseAccount} />;
}
