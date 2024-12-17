"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import Nav from "@/components/Nav/Nav";
import Onboarding from "@/components/OtherViews/Onboarding/Onboarding";
import ClosedAccount from "@/components/OtherViews/ClosedAccount/ClosedAccount";
import NoBetaKey from "@/components/OtherViews/NoBetaKey/NoBetaKey";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { isMissingBetaKey, isVaultClosed, isVaultInitialized } from "@/utils/helpers";
import { useError } from "@/context/error-provider";
import { AccountStatus } from "@/types/enums/accountStatus.enum";
import styles from "./page.module.css";

export default function Page() {
  const { showError } = useError();
  const { connection } = useConnection();
  const wallet = useWallet();

  const [accountStatus, setAccountStatus] = useState(AccountStatus.DISCONNECTED);
  useEffect(() => {
    const fetchAccountStatus = async () => {
      if (!wallet.publicKey) setAccountStatus(AccountStatus.DISCONNECTED);
      else if (await isVaultClosed(connection, wallet.publicKey)) setAccountStatus(AccountStatus.CLOSED);
      else if (await isMissingBetaKey(wallet.publicKey, showError)) setAccountStatus(AccountStatus.NO_BETA_KEY);
      else if (await isVaultInitialized(connection, wallet.publicKey)) setAccountStatus(AccountStatus.INITIALIZED);
      else setAccountStatus(AccountStatus.NOT_INITIALIZED);
    }
    fetchAccountStatus();
  }, [wallet.publicKey, connection, showError])
  
  return (
    <main className={styles.container}>
      <Nav 
        isAccountInitialized={accountStatus === AccountStatus.INITIALIZED} 
      />

      <div className={styles.content}>
        {accountStatus === AccountStatus.CLOSED && 
          <ClosedAccount />
        }
        {accountStatus === AccountStatus.NO_BETA_KEY && 
          <NoBetaKey />
        }
        {accountStatus === AccountStatus.NOT_INITIALIZED && 
          <Onboarding />
        }
        {(accountStatus === AccountStatus.INITIALIZED || accountStatus === AccountStatus.DISCONNECTED) && 
          <Dashboard />
        }
      </div>
    </main>
  );
}
