"use client";

import Dashboard from "@/src/components/Dashboard/Dashboard";
import Nav from "@/src/components/Nav/Nav";
import Onboarding from "@/src/components/OtherViews/Onboarding";
import ClosedAccount from "@/src/components/OtherViews/ClosedAccount";
import NoBetaKey from "@/src/components/OtherViews/NoBetaKey";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountStatus } from "@/src/types/enums/accountStatus.enum";
import styles from "./page.module.css";
import { useAccountStatusQuery, useBalancesQuery, useHealthQuery, usePricesQuery, useRatesQuery, useWithdrawLimitsQuery } from "@/src/utils/queries";
import { useStore } from "@/src/utils/store";
import { useEffect } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import { waitForSignature } from "@/src/utils/helpers";

export default function Page() {
  const wallet = useWallet();
  const queryClient = useQueryClient();
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

  const refetchAccountData = async (signature?: string) => {
    if (signature) await waitForSignature(signature);
    queryClient.invalidateQueries({ queryKey: ["user"], refetchType: "all" });
  };

  const refetchAccountStatus = async (signature?: string) => {
    if (signature) await waitForSignature(signature);
    queryClient.invalidateQueries({ 
      predicate: (query) => query.queryKey.includes(wallet.publicKey?.toBase58()), 
      refetchType: "all" 
    });
  };

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
