import React, { useState } from 'react';
import { WalletModalContext } from './useWalletModal';
import { WalletModal } from './WalletModal';
export const WalletModalProvider = ({ children, ...props }) => {
    const [visible, setVisible] = useState(false);
    return (React.createElement(WalletModalContext.Provider, { value: {
            visible,
            setVisible,
        } },
        children,
        visible && React.createElement(WalletModal, { ...props })));
};
//# sourceMappingURL=WalletModalProvider.js.map