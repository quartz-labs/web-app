"use client";

import Image from "next/image";
import styles from './page.module.css';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (publicKey) router.push("/dashboard");
  }, [publicKey]);

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
