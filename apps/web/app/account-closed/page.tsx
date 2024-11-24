"use client";

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { hasBetaKey, isVaultClosed, isVaultInitialized } from "@/utils/helpers";
import { useError } from "@/context/error-provider";
import Logo from "@/components/Logo/Logo";
import { WalletButton } from "@/context/solana/solana-provider";

export default function AccountClosed() {
  const { connection } = useConnection();
  const { showError } = useError();
  const wallet = useAnchorWallet();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = async () => {
      if (!wallet) router.push("/");
      else if (!(await hasBetaKey(wallet.publicKey, showError))) router.push("/");
      else if (!(await isVaultClosed(connection, wallet.publicKey))) {
        if (await isVaultInitialized(connection, wallet.publicKey)) router.push("/dashboard");
        else router.push("/onboarding");
      }
    };
    isLoggedIn();
  }, [wallet, connection, router, showError]);

  return (
    <main className={styles.accountClosedContainer}>
      <Logo />

      <div className={styles.messageWrapper}>
        <p className={"large-text error-text"}>This account has been closed. Please use another wallet.</p>
        <WalletButton disableCloseAccount={true} />
      </div>
    </main>
  );
}
