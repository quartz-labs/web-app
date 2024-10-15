"use client";

import styles from './page.module.css';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isVaultInitialized } from "@/utils/utils";
import { WalletButton } from "@/components/solana/solana-provider";
import Logo from "@/components/Logo/Logo";

export default function Page() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = async () => {
      if (wallet) {
        if (await isVaultInitialized(wallet, connection)) router.push("/dashboard");
        else router.push("/onboarding");
      }
    }
    isLoggedIn();
  }, [wallet, connection, router]);

  return (
    <main className={"two-col-grid login-grid"}>
      <div className={styles.title}>
        <Logo />

        <h1 className={styles.subheading}>Off-ramp without selling <span className="no-wrap">your assets</span></h1>
      </div>
      
      <div>
        <WalletButton />
      </div>
    </main>
  );
}
