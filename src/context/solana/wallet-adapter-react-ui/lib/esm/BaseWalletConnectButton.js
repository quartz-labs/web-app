import { useWalletConnectButton } from '@solana/wallet-adapter-base-ui';
import React from 'react';
import { BaseWalletConnectionButton } from './BaseWalletConnectionButton.js';
export function BaseWalletConnectButton({ children, disabled, labels, onClick, ...props }) {
    const { buttonDisabled, buttonState, onButtonClick, walletIcon, walletName } = useWalletConnectButton();
    return (React.createElement(BaseWalletConnectionButton, { ...props, disabled: disabled || buttonDisabled, onClick: (e) => {
            if (onClick) {
                onClick(e);
            }
            if (e.defaultPrevented) {
                return;
            }
            if (onButtonClick) {
                onButtonClick();
            }
        }, walletIcon: "wallet.svg", walletName: walletName }, children ? children : labels[buttonState]));
}
//# sourceMappingURL=BaseWalletConnectButton.js.map