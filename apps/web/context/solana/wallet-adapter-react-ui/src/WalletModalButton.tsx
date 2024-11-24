import type { FC, MouseEvent } from "react";
import React, { useCallback } from "react";
import type { ButtonProps } from "./Button.jsx";
import { Button as BaseWalletConnectionButton } from "./Button.jsx";
import { useWalletModal } from "./useWalletModal.jsx";

export const WalletModalButton: FC<ButtonProps> = ({ children = "Select Wallet", onClick, ...props }) => {
  const { visible, setVisible } = useWalletModal();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) setVisible(!visible);
    },
    [onClick, setVisible, visible],
  );

  return (
    <BaseWalletConnectionButton {...props} className="wallet-adapter-button-trigger" onClick={handleClick}>
      {children}
    </BaseWalletConnectionButton>
  );
};
