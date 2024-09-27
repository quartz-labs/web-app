"use client";

import Image from "next/image";
import styles from './page.module.css';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isPdaInitialized } from "@/utils/utils";
import { web3 } from "@coral-xyz/anchor";
import { FUNDS_PROGRAM_ID, USDC_MINT } from "@/utils/constants";
import { initAccount } from "@/utils/instructions";

export default function Page() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = async () => {
      if (wallet) {
        if (await isPdaInitialized(wallet, connection)) {
          router.push("/dashboard");
        } else {
          initAccount(wallet, connection);
        }
      }
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
      </div>
    </main>
  );
}
