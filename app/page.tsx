"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import Nav from "@/components/Nav/Nav";
import Onboarding from "@/components/OtherViews/Onboarding";
import ClosedAccount from "@/components/OtherViews/ClosedAccount";
import NoBetaKey from "@/components/OtherViews/NoBetaKey";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountStatus } from "@/types/enums/accountStatus.enum";
import styles from "./page.module.css";
import { useAccountStatusQuery } from "@/utils/queries";

export default function Page() {
  const wallet = useWallet();

  const { data: accountStatus, isLoading: isAccountStatusLoading } = useAccountStatusQuery(wallet.publicKey);

  return (
    <main className={styles.container}>
      <Nav 
        isAccountInitialized={accountStatus === AccountStatus.INITIALIZED} 
        isAccountStatusLoading={isAccountStatusLoading}
      />

      <div className={styles.content}>
        {(() => {
          switch (accountStatus) {
            case AccountStatus.CLOSED:
              return <ClosedAccount />;

            case AccountStatus.NO_BETA_KEY:
              return <NoBetaKey />;

            case AccountStatus.NOT_INITIALIZED:
              return <Onboarding />;
              
            default:
              return <Dashboard />;
          }
        })()}
      </div>
    </main>
  );
}
