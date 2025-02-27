"use client";

import Dashboard from "@/src/components/Dashboard/Dashboard";
import Nav from "@/src/components/Nav/Nav";
import ClosedAccount from "@/src/components/OtherViews/ClosedAccount";
import NoBetaKey from "@/src/components/OtherViews/NoBetaKey";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountStatus } from "@/src/types/enums/AccountStatus.enum";
import styles from "./page.module.css";
import { useStore } from "@/src/utils/store";
import { useEffect } from 'react';
import config from "@/src/config/config";
import Unavailable from "@/src/components/OtherViews/Unavailable";
import { QuartzCardAccountStatus } from "../types/enums/QuartzCardAccountStatus.enum";
import { useAccountStatusQuery, useWithdrawLimitsQuery, useBalancesQuery, useRatesQuery, usePricesQuery, useHealthQuery, useBorrowLimitsQuery, useSpendLimitQuery, useDepositLimitsQuery } from "../utils/queries/protocol.queries";
import { useProviderCardUserQuery, useQuartzCardUserQuery, useCardDetailsQuery, useTxHistoryQuery } from "../utils/queries/internalApi.queries";
import { ModalVariation } from "../types/enums/ModalVariation.enum";
import UpgradeRequired from "../components/OtherViews/UpgradeRequired";
import Disconnected from "../components/OtherViews/Disconnected";
import Background from "../components/Background/Background";
import Onboarding from "../components/OtherViews/Onboarding/Onboarding";

export default function Page() {
  const wallet = useWallet();
  const { 
    setIsInitialized, 
    jwtToken, 
    setModalVariation, 
    setSpendLimitRefreshing,
    isSigningLoginMessage
  } = useStore();


  // Quartz account status
  const { data: accountStatus, isLoading: isAccountStatusLoading } = useAccountStatusQuery(wallet.publicKey);
  const isInitialized = (accountStatus === AccountStatus.INITIALIZED && !isAccountStatusLoading && !config.NEXT_PUBLIC_UNAVAILABLE_TIME);
  useEffect(() => {
    setIsInitialized(isInitialized);
  }, [setIsInitialized, isInitialized]);
  

  // Quartz protocol account data
  usePricesQuery();
  useRatesQuery();
  useBalancesQuery(isInitialized ? wallet.publicKey : null);
  useWithdrawLimitsQuery(isInitialized ? wallet.publicKey : null);
  useBorrowLimitsQuery(isInitialized ? wallet.publicKey : null);
  useDepositLimitsQuery(isInitialized ? wallet.publicKey : null);
  useHealthQuery(isInitialized ? wallet.publicKey : null);
  const { isStale  } = useSpendLimitQuery(isInitialized ? wallet.publicKey : null);
  useEffect(() => {
    setSpendLimitRefreshing(isStale);
  }, [isStale, setSpendLimitRefreshing]);
  

  // Card data
  const { data: quartzCardUser } = useQuartzCardUserQuery(wallet.publicKey);
  useProviderCardUserQuery(quartzCardUser?.card_api_user_id ?? null);
  useCardDetailsQuery(
    quartzCardUser?.card_api_user_id ?? null,
    isInitialized && quartzCardUser?.account_status === QuartzCardAccountStatus.CARD
  );
  useTxHistoryQuery(
    quartzCardUser?.card_api_user_id ?? null, 
    isInitialized && quartzCardUser?.account_status === QuartzCardAccountStatus.CARD
  );


  // Log in card user
  useEffect(() => {
    if (
      isInitialized 
      && quartzCardUser?.account_status === QuartzCardAccountStatus.CARD 
      && jwtToken === undefined
      && !isSigningLoginMessage
    ) {
      setModalVariation(ModalVariation.ACCEPT_TANDCS)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps	
  }, [isInitialized, quartzCardUser?.account_status, jwtToken, isSigningLoginMessage]);
  


  if (config.NEXT_PUBLIC_UNAVAILABLE_TIME) {
    return (
      <main className={styles.container}>
        <Background />

        <Nav 
          isAccountInitialized={isInitialized} 
          isAccountStatusLoading={isAccountStatusLoading}
        />
        <div className={styles.content}>
          <Unavailable />
        </div>
      </main>
    );
  }

  if (!wallet.publicKey) {
    return (
      <main className={styles.container}>
        <Background />
        
        <Nav 
          isAccountInitialized={isInitialized} 
          isAccountStatusLoading={isAccountStatusLoading}
        />

        <div className={styles.content}>
          <Disconnected />
        </div>
      </main>
    );
  }

  if (quartzCardUser === undefined || isAccountStatusLoading) {
    return (
      <main className={styles.container}>
        <Background />
  
        <Nav 
          isAccountInitialized={false} 
          isAccountStatusLoading={true}
        />
  
        <div className={styles.content}>
            <Dashboard isLoading={true} />
        </div>
      </main>
    );
  }

  if (quartzCardUser?.account_status === QuartzCardAccountStatus.CARD) {
    return (
      <main className={styles.container}>
        <Background />
  
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
  
                  case AccountStatus.UPGRADE_REQUIRED:
                    return <UpgradeRequired />;
  
                  default:
                    return <Dashboard />;
                  }
              })()
            }
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <Background />
      
      <Nav 
        isAccountInitialized={isInitialized} 
        isAccountStatusLoading={isAccountStatusLoading}
      />

      <div className={styles.content}>
        <Onboarding />
      </div>
    </main>
  );
}
