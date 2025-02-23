"use client";

import Dashboard from "@/src/components/Dashboard/Dashboard";
import Nav from "@/src/components/Nav/Nav";
import Onboarding from "@/src/components/OtherViews/Onboarding";
import ClosedAccount from "@/src/components/OtherViews/ClosedAccount";
import NoBetaKey from "@/src/components/OtherViews/NoBetaKey";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountStatus } from "@/src/types/enums/AccountStatus.enum";
import styles from "./page.module.css";
import { useAccountStatusQuery, useBalancesQuery, useBorrowLimitsQuery, useDepositLimitsQuery, useHealthQuery, usePricesQuery, useRatesQuery, useWithdrawLimitsQuery } from "@/src/utils/queries";
import { useStore } from "@/src/utils/store";
import { useEffect } from 'react';
import config from "@/src/config/config";
import Unavailable from "@/src/components/OtherViews/Unavailable";
import UpgradeRequired from "../components/OtherViews/UpgradeRequired";
import Disconnected from "../components/OtherViews/Disconnected";
import Background from "../components/Background/Background";

export default function Page() {
  const wallet = useWallet();
  const { 
    setIsInitialized,
    setPrices, 
    setRates, 
    setBalances, 
    setWithdrawLimits, 
    setBorrowLimits,
    setHealth,
    setDepositLimits
  } = useStore();

  const { data: accountStatus, isLoading: isAccountStatusLoading } = useAccountStatusQuery(wallet.publicKey);
  const isInitialized = (accountStatus === AccountStatus.INITIALIZED && !isAccountStatusLoading && !config.NEXT_PUBLIC_UNAVAILABLE_TIME);

  const { data: prices } = usePricesQuery();
  const { data: rates } = useRatesQuery();
  const { data: balances } = useBalancesQuery(isInitialized ? wallet.publicKey : null);
  const { data: withdrawLimits } = useWithdrawLimitsQuery(isInitialized ? wallet.publicKey : null);
  const { data: borrowLimits } = useBorrowLimitsQuery(isInitialized ? wallet.publicKey : null);
  const { data: health } = useHealthQuery(isInitialized ? wallet.publicKey : null);
  const { data: depositLimits } = useDepositLimitsQuery(isInitialized ? wallet.publicKey : null);

  useEffect(() => {
    setPrices(prices);
    setRates(rates);
    setBalances(balances);
    setWithdrawLimits(withdrawLimits);
    setBorrowLimits(borrowLimits);
    setHealth(health);
    setIsInitialized(isInitialized);
    setDepositLimits(depositLimits);
  }, [
    isInitialized, prices, rates, balances, withdrawLimits, borrowLimits, health, depositLimits,
    setPrices, setRates, setBalances, setWithdrawLimits, setBorrowLimits, setHealth, setIsInitialized, setDepositLimits
  ]);

  return (
    <main className={styles.container}>
      {/* <Background /> */}

      <Nav 
        isAccountInitialized={isInitialized} 
        isAccountStatusLoading={isAccountStatusLoading}
      />

      <div className={styles.content}>
        {config.NEXT_PUBLIC_UNAVAILABLE_TIME && (
          <Unavailable />
        )}
        
        {!config.NEXT_PUBLIC_UNAVAILABLE_TIME && (
          () => {
            switch (accountStatus) {
              case AccountStatus.INITIALIZED:
                return <Dashboard />;

              case AccountStatus.CLOSED:
                return <ClosedAccount />;

              case AccountStatus.NO_BETA_KEY:
                return <NoBetaKey />;

              case AccountStatus.NOT_INITIALIZED:
                return <Onboarding />;

              case AccountStatus.UPGRADE_REQUIRED:
                return <UpgradeRequired />;

              default:
                return <Disconnected />;
            }
          })()
        }
      </div>
    </main>
  );
}
