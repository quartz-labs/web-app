"use client";

import Image from "next/image";
import styles from './page.module.css';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnchorWallet, useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isVaultInitialized } from "@/utils/utils";
import { AnchorError, web3 } from "@coral-xyz/anchor";
import { FUNDS_PROGRAM_ID, USDC_MINT } from "@/utils/constants";
import { initAccount } from "@/utils/instructions";

export default function Page() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const router = useRouter();

  const [uninitialized, setUninitialized] = useState(false);

  const login = async () => {
    if (!wallet) return;

    const signature = await initAccount(wallet, connection);
    if (signature) router.push("/dashboard");
    else setUninitialized(true);
  }

  useEffect(() => {
    const isLoggedIn = async () => {
      if (wallet) {
        if (await isVaultInitialized(wallet, connection)) router.push("/dashboard");
        else setUninitialized(true);
      } else setUninitialized(false);
    }
    isLoggedIn();
  }, [wallet]);

  return (
    <main className={"container"}>
      <div className={styles.landingWrapper}>
        <Image 
          className={styles.mainLogo}
          src="/logo.svg" 
          alt="Quartz" 
          width={360} 
          height={125}
        />

        <h1 className={styles.subheading}>Off-ramp without selling your assets</h1>

        <WalletMultiButton />

        {uninitialized && (
          <button className={styles.initButton} onClick={() => login()}>Initialize Account</button>
        )}
      </div>
    </main>
  );
}
