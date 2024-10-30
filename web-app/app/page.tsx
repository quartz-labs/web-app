"use client";

import styles from './page.module.css';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasBetaKey, isVaultInitialized } from "@/utils/helpers";
import { WalletButton } from "@/context/solana/solana-provider";
import Logo from "@/components/Logo/Logo";
import { useError } from '@/context/error-provider';

export default function Page() {
  const { connection } = useConnection();
  const { showError } = useError();
  const wallet = useAnchorWallet();
  const router = useRouter();

  const [ missingBetaKey, setMissingBetaKey ] = useState(false);

  useEffect(() => {
    const isLoggedIn = async () => {
      if (wallet) {
        
        if (!await hasBetaKey(wallet.publicKey, showError)) {
          setMissingBetaKey(true);
          return;
        }

        if (await isVaultInitialized(connection, wallet.publicKey)) router.push("/dashboard");
        else router.push("/onboarding");
      }
    }
    isLoggedIn();
  }, [wallet, connection, router, showError]);

  return (
    <main className={"two-col-grid login-grid"}>
      <div className={styles.title}>
        <Logo />

        <h1 className={styles.subheading}>Off-ramp without selling <span className="no-wrap">your assets</span></h1>
      </div>
      
      <div>
        <WalletButton disableCloseAccount={true} />

        {(missingBetaKey && wallet) &&
          <div className={`${styles.serviceAnnouncement} ${styles.authPadding}`}>
            <h2>No Quartz Pin beta key found in wallet</h2>
            <p>The private beta is currently only available to a handful of members from our <a href="https://discord.gg/K3byNmnKNm" target="_blank">Discord community</a>.</p>
          </div>
        }

        {/* <div className={styles.serviceAnnouncement}>
          <h2>We&apos;re currently deploying a new program upgrade. The website will be offline until 12:30 UTC</h2>
          <p>
            Click <a href="https://earn.superteam.fun/listings/hackathon/best-consumer-use-cases/submission/90c99fc7-e3e6-4fad-b743-42d7e4cf88f8/#details" target='_blank'>
              here
            </a> to view a demo of our Radar submission.</p>
          <p>You can find more info on our <a href="https://x.com/quartzpay" target="_blank">X</a> and <a href="https://quartzpay.io/">main website</a>.</p>
        </div> */}
      </div>
    </main>
  );
}
