"use client";

import styles from './page.module.css';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isVaultInitialized } from "@/utils/helpers";
import { WalletButton } from "@/components/solana/solana-provider";
import Logo from "@/components/Logo/Logo";

export default function Page() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = async () => {
      if (wallet) {
        return; // TODO - remove tmp redirect
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
        {/* <WalletButton disableCloseAccount={true} /> */}

        <div className={styles.serviceDown}>
          <h2>We&apos;re currently deploying a new program upgrade. The website will be offline until 12:30 UTC</h2>
          <p>
            Click <a href="https://earn.superteam.fun/listings/hackathon/best-consumer-use-cases/submission/90c99fc7-e3e6-4fad-b743-42d7e4cf88f8/#details" target='_blank'>
              here
            </a> to view a demo of our Radar submission.</p>
          <p>You can find more info on our <a href="https://x.com/quartzpay" target="_blank">X</a> and <a href="https://quartzpay.io/">main website</a>.</p>
        </div>
      </div>
    </main>
  );
}
