"use client";

import Dashboard from "@/src/components/Dashboard/Dashboard";
import Nav from "@/src/components/Nav/Nav";
import Onboarding from "@/src/components/OtherViews/Onboarding";
import ClosedAccount from "@/src/components/OtherViews/ClosedAccount";
import NoBetaKey from "@/src/components/OtherViews/NoBetaKey";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountStatus } from "@/src/types/enums/AccountStatus.enum";
import styles from "./page.module.css";
import { useAccountStatusQuery, useBalancesQuery, useCardDetailsQuery, useProviderCardUserQuery, useHealthQuery, usePricesQuery, useRatesQuery, useQuartzCardUserQuery, useWithdrawLimitsQuery } from "@/src/utils/queries";
import { useStore } from "@/src/utils/store";
import { useEffect, useState } from 'react';
import config from "@/src/config/config";
import Unavailable from "@/src/components/OtherViews/Unavailable";
import { fetchAndParse } from "../utils/helpers";
import { useRefetchCardDetails, useLoginCardUser } from "../utils/hooks";
import { useError } from "../context/error-provider";
import { captureError } from "../utils/errors";
import { TxStatus, useTxStatus } from "../context/tx-status-provider";

export default function Page() {
  const wallet = useWallet();
  const {
    setIsInitialized,
    setPendingCardTopup,
    setTopupSignature,
    pendingCardTopup,
    topupSignature,
    jwtToken
  } = useStore();

  const { showError } = useError();
  const { showTxStatus } = useTxStatus();
  
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
  useHealthQuery(isInitialized ? wallet.publicKey : null);
  
  // Card account data
  const { data: quartzCardUser } = useQuartzCardUserQuery(isInitialized ? wallet.publicKey : null);
  const { data: providerCardUser } = useProviderCardUserQuery(
    quartzCardUser?.card_api_user_id ?? null,
    quartzCardUser?.auth_level === "Base"
  );
  const { data: cardDetails } = useCardDetailsQuery(quartzCardUser?.card_api_user_id ?? null);

  // Log in card user
  const loginCardUser = useLoginCardUser(wallet);
  useEffect(() => {
    if (isInitialized && quartzCardUser?.auth_level === "Card") {
      loginCardUser.mutate();
    }
  }, [isInitialized, quartzCardUser, loginCardUser]);
  
  const [kycApplicationStatus, setKycApplicationStatus] = useState<string | null>(null);
  


  // Topup Card
  const refetchCardDetails = useRefetchCardDetails();
  useEffect(() => {
    if (!pendingCardTopup || !topupSignature) return;

    const cardInfo = cardDetails?.find(card => card !== null);
    if (!cardInfo) return;

    showTxStatus({ status: TxStatus.TOPUP_IN_PROGRESS, signature: topupSignature, walletAddress: wallet.publicKey?.toBase58() });

    const startTime = Date.now();
    const TIMEOUT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

    const processCardTopup = async () => {
      // Check if we've exceeded the timeout
      if (Date.now() - startTime > TIMEOUT_DURATION) {
        clearInterval(interval);
        captureError(showError, "Card topup process timed out after 5 minutes, please notify support", "/page.tsx", null, wallet.publicKey);
        showTxStatus({ status: TxStatus.TOPUP_FAILED, signature: topupSignature, walletAddress: wallet.publicKey?.toBase58() });
        setPendingCardTopup(false);
        setTopupSignature(undefined);
        return;
      }
      //call the card topup POST endpoint
      const response = await fetch(`/api/card-topup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signature: topupSignature,
          cardId: cardInfo.id,
          jwtToken: jwtToken
        })
      });

      let responseBody;
      try {
        responseBody = await response.json();

        if (response.status === 404) {
          return;
        }

        if (response.status === 500) {
          return;
        }

        if (!responseBody) {
          console.log("Didn't update the card limit, response is undefined: ", responseBody);
          return;
        }

      } catch (error) {
        showTxStatus({ status: TxStatus.TOPUP_FAILED, signature: topupSignature, walletAddress: wallet.publicKey?.toBase58() });
        captureError(showError, "Failed to update the card limit after topup", "/page.tsx", error, wallet.publicKey);
        return;
      }

      refetchCardDetails();
      setPendingCardTopup(false);
      setTopupSignature(undefined);
      showTxStatus({ status: TxStatus.TOPUP_SUCCESS, signature: topupSignature, walletAddress: wallet.publicKey?.toBase58() });
    };

    // Set up interval to run every 3 seconds
    const interval = setInterval(processCardTopup, 3000);

    // Cleanup function to clear interval when component unmounts
    // or when pendingCardTopup/topupSignature changes
    return () => clearInterval(interval);

  }, [cardDetails, jwtToken, pendingCardTopup, topupSignature, setTopupSignature, setPendingCardTopup, refetchCardDetails, showTxStatus, showError, wallet.publicKey]);

  // Handle approve KYC application
  useEffect(() => {
    console.log("userFromDb", quartzCardUser);
    console.log("kycApplicationStatus", kycApplicationStatus);
    console.log("wallet.publicKey", wallet.publicKey);
    console.log("cardUserInfo", providerCardUser);

    if (kycApplicationStatus === "approved" && quartzCardUser?.auth_level !== "Card") {
      console.log("kycApplicationStatus is approved, updating user in database to have auth level 'Card'");
      //update user in database to have auth level "Card"
      fetchAndParse(`${config.NEXT_PUBLIC_INTERNAL_API_URL}/auth/auth-level?publicKey=${wallet.publicKey}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authLevel: "Card"
        })
      });

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kycApplicationStatus, wallet.publicKey, quartzCardUser]);

  // Set kyc application status
  useEffect(() => {
    if (providerCardUser) {
      setKycApplicationStatus(providerCardUser.applicationStatus);
    }
  }, [providerCardUser]);

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
