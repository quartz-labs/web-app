import React from 'react';
import { Button } from './Button';
import { WalletIcon } from './WalletIcon';
export function BaseWalletConnectionButton({ walletIcon, walletName, ...props }) {
    return (React.createElement(Button, { ...props, className: "wallet-adapter-button-trigger", startIcon: walletIcon && walletName ? (React.createElement(WalletIcon, { wallet: { adapter: { icon: walletIcon, name: walletName } } })) : undefined }));
}
//# sourceMappingURL=BaseWalletConnectionButton.js.map