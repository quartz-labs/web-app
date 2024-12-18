"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import Nav from "@/components/Nav/Nav";
import Onboarding from "@/components/OtherViews/Onboarding";
import ClosedAccount from "@/components/OtherViews/ClosedAccount";
import NoBetaKey from "@/components/OtherViews/NoBetaKey";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountStatus } from "@/types/enums/accountStatus.enum";
import styles from "./page.module.css";
import { useAccountStatusQuery, useBalancesQuery, useHealthQuery, usePricesQuery, useRatesQuery, useWithdrawLimitsQuery } from "@/utils/queries";
import { useStore } from "@/utils/store";
import { useEffect } from 'react';

export default function Page() {
  const wallet = useWallet();
  const { 
    setIsInitialized,
    setPrices, 
    setRates, 
    setBalances, 
    setWithdrawLimits, 
    setHealth 
  } = useStore();

  const { data: accountStatus, isLoading: isAccountStatusLoading } = useAccountStatusQuery(wallet.publicKey);
  const isInitialized = (accountStatus === AccountStatus.INITIALIZED && !isAccountStatusLoading);

  const { data: prices } = usePricesQuery();
  const { data: rates } = useRatesQuery();
  const { data: balances } = useBalancesQuery(isInitialized ? wallet.publicKey : null);
  const { data: withdrawLimits } = useWithdrawLimitsQuery(isInitialized ? wallet.publicKey : null);
  const { data: health } = useHealthQuery(isInitialized ? wallet.publicKey : null);

  useEffect(() => {
    setPrices(prices);
    setRates(rates);
    setBalances(balances);
    setWithdrawLimits(withdrawLimits);
    setHealth(health);
    setIsInitialized(isInitialized);
  }, [
    isInitialized, prices, rates, balances, withdrawLimits, health, 
    setPrices, setRates, setBalances, setWithdrawLimits, setHealth, setIsInitialized
  ]);

  return (
    <main className={styles.container}>
      <Nav 
        isAccountInitialized={isInitialized} 
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
