import { useWalletDisconnectButton } from '@solana/wallet-adapter-base-ui';
import React from 'react';
import type { ButtonProps } from './Button';
type Props = ButtonProps & {
    labels: {
        [TButtonState in ReturnType<typeof useWalletDisconnectButton>['buttonState']]: string;
    };
};
export declare function BaseWalletDisconnectButton({ children, disabled, labels, onClick, ...props }: Props): React.JSX.Element;
export {};
