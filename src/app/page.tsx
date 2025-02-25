"use client";

import Dashboard from "@/src/components/Dashboard/Dashboard";
import Nav from "@/src/components/Nav/Nav";
import Onboarding from "@/src/components/OtherViews/Onboarding/Onboarding";
import ClosedAccount from "@/src/components/OtherViews/ClosedAccount";
import NoBetaKey from "@/src/components/OtherViews/NoBetaKey";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountStatus } from "@/src/types/enums/AccountStatus.enum";
import styles from "./page.module.css";
import { useStore } from "@/src/utils/store";
import { useEffect, useState } from 'react';
import config from "@/src/config/config";
import Unavailable from "@/src/components/OtherViews/Unavailable";
import { useRefetchCardUser } from "../utils/hooks";
import { AuthLevel } from "../types/enums/AuthLevel.enum";
import { fetchAndParse } from "../utils/helpers";
import { useAccountStatusQuery, useWithdrawLimitsQuery, useBalancesQuery, useRatesQuery, usePricesQuery, useHealthQuery, useBorrowLimitsQuery, useSpendLimitQuery, useDepositLimitsQuery } from "../utils/queries/protocol.queries";
import { useProviderCardUserQuery, useQuartzCardUserQuery, useCardDetailsQuery, useTxHistoryQuery } from "../utils/queries/internalApi.queries";
import { ModalVariation } from "../types/enums/ModalVariation.enum";
import UpgradeRequired from "../components/OtherViews/UpgradeRequired";
import Disconnected from "../components/OtherViews/Disconnected";
import Background from "../components/Background/Background";

export default function Page() {
  const wallet = useWallet();
  const { setIsInitialized, jwtToken, setModalVariation, setSpendLimitRefreshing } = useStore();
  const refetchCardUser = useRefetchCardUser();

  const [limitsSet, setLimitsSet] = useState(true);

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
  const { data: quartzCardUser, isLoading: isQuartzCardUserLoading } = useQuartzCardUserQuery(isInitialized ? wallet.publicKey : null);
  const { data: providerCardUser, isLoading: isProviderCardUserLoading } = useProviderCardUserQuery(
    quartzCardUser?.card_api_user_id ?? null,
    isInitialized && (quartzCardUser?.auth_level === AuthLevel.BASE || quartzCardUser?.auth_level === AuthLevel.KYC_PENDING)
  );
  useCardDetailsQuery(
    quartzCardUser?.card_api_user_id ?? null,
    isInitialized && quartzCardUser?.auth_level === AuthLevel.CARD
  );
  useTxHistoryQuery(quartzCardUser?.card_api_user_id ?? null, isInitialized && quartzCardUser?.auth_level === AuthLevel.CARD);

  const doneLoading = !isAccountStatusLoading && !isQuartzCardUserLoading && !isProviderCardUserLoading;
  const requireOnboarding = (doneLoading && (accountStatus !== undefined && accountStatus === AccountStatus.NOT_INITIALIZED) || (quartzCardUser?.auth_level !== AuthLevel.CARD && quartzCardUser?.auth_level !== undefined));
  useEffect(() => {
    if (requireOnboarding && limitsSet && doneLoading) {
      setLimitsSet(false);
    }
  }, [requireOnboarding, limitsSet, doneLoading]);

  // Update QuartzCardUser status if ProviderCardUser status differs
  useEffect(() => {
    if (!providerCardUser || !quartzCardUser || !wallet.publicKey) return;

    let providerCardUserStatus: AuthLevel;
    if (providerCardUser?.applicationStatus === "approved") {
      providerCardUserStatus = AuthLevel.CARD;
    } else if (providerCardUser?.applicationStatus === "pending") {
      providerCardUserStatus = AuthLevel.KYC_PENDING;
    } else {
      providerCardUserStatus = AuthLevel.BASE;
    }

    if (quartzCardUser?.auth_level !== providerCardUserStatus) {
      fetchAndParse(`${config.NEXT_PUBLIC_INTERNAL_API_URL}/auth/auth-level?publicKey=${wallet.publicKey}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authLevel: providerCardUserStatus
        })
      });
      refetchCardUser();
    }
  }, [quartzCardUser, providerCardUser, wallet.publicKey, refetchCardUser]);


  // Log in card user
  useEffect(() => {
    if (isInitialized && quartzCardUser?.auth_level === AuthLevel.CARD && jwtToken === undefined) {
      setModalVariation(ModalVariation.ACCEPT_TANDCS)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps	
  }, [isInitialized, quartzCardUser?.auth_level, jwtToken]);

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

  if (requireOnboarding || !limitsSet) {
    return (
      <main className={styles.container}>
        <Background />
        
        <Nav 
          isAccountInitialized={isInitialized} 
          isAccountStatusLoading={isAccountStatusLoading}
        />

        <div className={styles.content}>
          <Onboarding
            onCompleteOnboarding={() => setLimitsSet(true)}
          />
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
