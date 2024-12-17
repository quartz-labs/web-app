import React from 'react';
import { Button } from './Button.js';
import { WalletIcon } from './WalletIcon.js';
export function BaseWalletConnectionButton({ walletIcon, walletName, ...props }) {
    return (React.createElement(Button, { ...props, className: "wallet-adapter-button-trigger", endIcon: walletIcon && walletName ? (React.createElement(WalletIcon, { wallet: { adapter: { icon: "wallet.svg", name: walletName } } })) : undefined }));
}
//# sourceMappingURL=BaseWalletConnectionButton.js.map