import React from "react";
import { BaseWalletDisconnectButton } from "./BaseWalletDisconnectButton.jsx";
import type { ButtonProps } from "./Button.jsx";

const LABELS = {
  disconnecting: "Disconnecting ...",
  "has-wallet": "Disconnect",
  "no-wallet": "Disconnect Wallet",
} as const;

export function WalletDisconnectButton(props: ButtonProps) {
  return <BaseWalletDisconnectButton {...props} labels={LABELS} />;
}
