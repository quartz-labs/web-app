"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import styles from './page.module.css';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isVaultInitialized } from "@/utils/utils";
import { WalletButton } from "@/components/solana/solana-provider";

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
  }, [wallet]);

  return (
    <main className={"two-col-grid"}>
      <div className={styles.title}>
        <Image 
          src="/logo.svg" 
          alt="Quartz" 
          width={360} 
          height={125}
        />

        <h1 className={styles.subheading}>Off-ramp without selling your assets</h1>
      </div>
      
      <div>
        <WalletButton />
      </div>
    </main>
  );
}
