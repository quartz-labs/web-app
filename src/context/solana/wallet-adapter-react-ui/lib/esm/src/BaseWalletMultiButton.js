import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BaseWalletConnectionButton } from './BaseWalletConnectionButton';
import { useWalletModal } from './useWalletModal';
export function BaseWalletMultiButton({ children, labels, ...props }) {
    const { setVisible: setModalVisible } = useWalletModal();
    const { buttonState, onConnect, onDisconnect, publicKey, walletIcon, walletName } = useWalletMultiButton({
        onSelectWallet() {
            setModalVisible(true);
        },
    });
    const [copied, setCopied] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const listener = (event) => {
            const node = ref.current;
            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target))
                return;
            setMenuOpen(false);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, []);
    const content = useMemo(() => {
        if (children) {
            return children;
        }
        else if (publicKey) {
            const base58 = publicKey.toBase58();
            return base58.slice(0, 4) + '..' + base58.slice(-4);
        }
        else if (buttonState === 'connecting' || buttonState === 'has-wallet') {
            return labels[buttonState];
        }
        else {
            return labels['no-wallet'];
        }
    }, [buttonState, children, labels, publicKey]);
    return (React.createElement("div", { className: "wallet-adapter-dropdown" },
        React.createElement(BaseWalletConnectionButton, { ...props, "aria-expanded": menuOpen, style: { pointerEvents: menuOpen ? 'none' : 'auto', ...props.style }, onClick: () => {
                switch (buttonState) {
                    case 'no-wallet':
                        setModalVisible(true);
                        break;
                    case 'has-wallet':
                        if (onConnect) {
                            onConnect();
                        }
                        break;
                    case 'connected':
                        setMenuOpen(true);
                        break;
                }
            }, walletIcon: walletIcon, walletName: walletName }, content),
        React.createElement("ul", { "aria-label": "dropdown-list", className: `wallet-adapter-dropdown-list ${menuOpen && 'wallet-adapter-dropdown-list-active'}`, ref: ref, role: "menu" },
            publicKey ? (React.createElement("li", { className: "wallet-adapter-dropdown-list-item", onClick: async () => {
                    await navigator.clipboard.writeText(publicKey.toBase58());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 400);
                }, role: "menuitem" }, copied ? labels['copied'] : labels['copy-address'])) : null,
            React.createElement("li", { className: "wallet-adapter-dropdown-list-item", onClick: () => {
                    setMenuOpen(false);
                }, role: "menuitem" }, "Close account"),
            onDisconnect ? (React.createElement("li", { className: "wallet-adapter-dropdown-list-item", onClick: () => {
                    onDisconnect();
                    setMenuOpen(false);
                }, role: "menuitem" }, labels['disconnect'])) : null)));
}
//# sourceMappingURL=BaseWalletMultiButton.js.map