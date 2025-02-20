"use client";

import Dashboard from "@/src/components/Dashboard/Dashboard";
import Nav from "@/src/components/Nav/Nav";
import Onboarding from "@/src/components/OtherViews/Onboarding";
import ClosedAccount from "@/src/components/OtherViews/ClosedAccount";
import NoBetaKey from "@/src/components/OtherViews/NoBetaKey";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountStatus } from "@/src/types/enums/AccountStatus.enum";
import styles from "./page.module.css";
import { useStore } from "@/src/utils/store";
import { useEffect } from 'react';
import config from "@/src/config/config";
import Unavailable from "@/src/components/OtherViews/Unavailable";
import { useRefetchCardUser } from "../utils/hooks";
import { AuthLevel } from "../types/enums/AuthLevel.enum";
import { fetchAndParse } from "../utils/helpers";
import { useAccountStatusQuery, useWithdrawLimitsQuery, useBalancesQuery, useRatesQuery, usePricesQuery, useHealthQuery, useBorrowLimitsQuery, useSpendLimitQuery } from "../utils/queries/protocol.queries";
import { useProviderCardUserQuery, useQuartzCardUserQuery, useCardDetailsQuery, useProviderCardSpendableBalanceQuery } from "../utils/queries/internalApi.queries";
import { ModalVariation } from "../types/enums/ModalVariation.enum";
import { TxStatus, useTxStatus } from "../context/tx-status-provider";
import UpgradeRequired from "../components/OtherViews/UpgradeRequired";

export default function Page() {
  const wallet = useWallet();
  const { setIsInitialized, jwtToken, cardDetails, setModalVariation, topupPending, setTopupPending } = useStore();
  const { props: txStatusProps } = useTxStatus();
  const refetchCardUser = useRefetchCardUser();


  // Quartz account status
  const { data: accountStatus, isLoading: isAccountStatusLoading } = useAccountStatusQuery(wallet.publicKey);
  const isInitialized = (accountStatus === AccountStatus.INITIALIZED && !isAccountStatusLoading && !config.NEXT_PUBLIC_UNAVAILABLE_TIME);
  useEffect(() => {
    setIsInitialized(isInitialized);
  }, [setIsInitialized, isInitialized]);
  

  // Quartz account data
  usePricesQuery();
  useRatesQuery();
  useBalancesQuery(isInitialized ? wallet.publicKey : null);
  useWithdrawLimitsQuery(isInitialized ? wallet.publicKey : null);
  useBorrowLimitsQuery(isInitialized ? wallet.publicKey : null);
  useHealthQuery(isInitialized ? wallet.publicKey : null);
  useSpendLimitQuery(isInitialized ? wallet.publicKey : null);
  

  // Quartz Card User data
  const { data: quartzCardUser } = useQuartzCardUserQuery(
    isInitialized ? wallet.publicKey : null,
    isInitialized && topupPending && txStatusProps?.status !== TxStatus.TOPUP_PROCESSING
  );
  useEffect(() => {
    const txStatusPending = txStatusProps?.status === TxStatus.TOPUP_PROCESSING;
    const displayPendingInBalance = (quartzCardUser?.topup_pending ?? false) && !txStatusPending;
    setTopupPending(displayPendingInBalance);
  }, [quartzCardUser?.topup_pending, setTopupPending, txStatusProps?.status]);


  // Provider Card User data
  const { data: providerCardUser } = useProviderCardUserQuery(
    quartzCardUser?.card_api_user_id ?? null,
    isInitialized && (quartzCardUser?.auth_level === AuthLevel.BASE || quartzCardUser?.auth_level === AuthLevel.KYC_PENDING)
  );
  useCardDetailsQuery(
    quartzCardUser?.card_api_user_id ?? null,
    isInitialized && quartzCardUser?.auth_level === AuthLevel.CARD
  );
  useProviderCardSpendableBalanceQuery(
    quartzCardUser?.card_api_user_id ?? null,
    cardDetails?.id ?? null,
    isInitialized && (quartzCardUser?.auth_level === AuthLevel.CARD)
  );


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
