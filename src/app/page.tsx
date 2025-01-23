"use client";

import Dashboard from "@/src/components/Dashboard/Dashboard";
import Nav from "@/src/components/Nav/Nav";
import Onboarding from "@/src/components/OtherViews/Onboarding";
import ClosedAccount from "@/src/components/OtherViews/ClosedAccount";
import NoBetaKey from "@/src/components/OtherViews/NoBetaKey";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountStatus } from "@/src/types/enums/AccountStatus.enum";
import styles from "./page.module.css";
import { useAccountStatusQuery, useBalancesQuery, useHasCardQuery, useHealthQuery, usePricesQuery, useRatesQuery, useUserFromDatabaseQuery, useWithdrawLimitsQuery } from "@/src/utils/queries";
import { useSignMessage, useStore } from "@/src/utils/store";
import { useEffect, useCallback } from 'react';
import config from "@/src/config/config";
import Unavailable from "@/src/components/OtherViews/Unavailable";
import bs58 from 'bs58';

export default function Page() {
  const wallet = useWallet();
  const { 
    setIsInitialized,
    setPrices, 
    setRates, 
    setBalances, 
    setWithdrawLimits, 
    setHealth,
    setJwtToken,
    setUserFromDb
  } = useStore();

  const { data: accountStatus, isLoading: isAccountStatusLoading } = useAccountStatusQuery(wallet.publicKey);
  const isInitialized = (accountStatus === AccountStatus.INITIALIZED && !isAccountStatusLoading && !config.NEXT_PUBLIC_UNAVAILABLE_TIME);

  const { data: hasCardAccount } = useHasCardQuery(isInitialized ? wallet.publicKey : null);
  const { data: prices } = usePricesQuery();
  const { data: rates } = useRatesQuery();
  const { data: balances } = useBalancesQuery(isInitialized ? wallet.publicKey : null);
  const { data: withdrawLimits } = useWithdrawLimitsQuery(isInitialized ? wallet.publicKey : null);
  const { data: health } = useHealthQuery(isInitialized ? wallet.publicKey : null);
  const { data: userFromDb } = useUserFromDatabaseQuery(isInitialized ? wallet.publicKey : null);
  

  useEffect(() => {
    setPrices(prices);
    setRates(rates);
    setBalances(balances);
    setWithdrawLimits(withdrawLimits);
    setHealth(health);
    setIsInitialized(isInitialized);
    setUserFromDb(userFromDb);
  }, [
    isInitialized, prices, rates, balances, withdrawLimits, health, userFromDb,
    setPrices, setRates, setBalances, setWithdrawLimits, setHealth, setIsInitialized, setUserFromDb
  ]);

  const signMessage = useSignMessage({
    address: wallet.publicKey! // Note: Make sure to handle the case where publicKey is null
  })

  const handleSignClick = useCallback(async () => {
    try {
      // The message you want to sign
      const timestamp = Date.now();
      const message = `Sign this message to authenticate with our service\nWallet address: ${wallet.publicKey}\nDomain: ${config.NEXT_PUBLIC_INTERNAL_API_URL}\nTimestamp: ${timestamp}\nThis signature will not trigger any blockchain transaction or cost any gas fees.`;

      const signature = await signMessage.mutateAsync(message);
      const bytes = Buffer.from(signature, 'base64');
      const signatureString = bs58.encode(bytes);

      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          accept: 'application/json'
        },
        body: JSON.stringify({
          publicKey: wallet.publicKey,
          signature: signatureString,
          message: message
        })
      };
      const response = await fetch(`${config.NEXT_PUBLIC_INTERNAL_API_URL}/auth/user`, options);
      const body = await response.json();
      console.log('Body:', body);
      return body;
    } catch (error) {
      console.error('Failed to sign message:', error);
    }
  }, [wallet.publicKey, signMessage]);

  useEffect(() => {
    if (isInitialized && hasCardAccount) {
      console.log("get users to sign message to get JWT");
      handleSignClick().then(setJwtToken);
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, hasCardAccount]);

  return (
    <main className={styles.container}>
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
              case AccountStatus.CLOSED:
              return <ClosedAccount />;

            case AccountStatus.NO_BETA_KEY:
              return <NoBetaKey />;

            case AccountStatus.NOT_INITIALIZED:
              return <Onboarding />;
              
            default:
              return <Dashboard />;
            }
          })()
        }
      </div>
    </main>
  );
}
