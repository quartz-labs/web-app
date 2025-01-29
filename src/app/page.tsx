"use client";

import Dashboard from "@/src/components/Dashboard/Dashboard";
import Nav from "@/src/components/Nav/Nav";
import Onboarding from "@/src/components/OtherViews/Onboarding";
import ClosedAccount from "@/src/components/OtherViews/ClosedAccount";
import NoBetaKey from "@/src/components/OtherViews/NoBetaKey";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountStatus } from "@/src/types/enums/AccountStatus.enum";
import styles from "./page.module.css";
import { useAccountStatusQuery, useBalancesQuery, useCardsForUserQuery, useCardUserInfoQuery, useHealthQuery, usePricesQuery, useRatesQuery, useUserFromDatabaseQuery, useWithdrawLimitsQuery } from "@/src/utils/queries";
import { useSignMessage, useStore } from "@/src/utils/store";
import { useEffect, useCallback, useState } from 'react';
import config from "@/src/config/config";
import Unavailable from "@/src/components/OtherViews/Unavailable";
import bs58 from 'bs58';
import { fetchAndParse } from "../utils/helpers";
import { useRefetchCardDetails } from "../utils/hooks";
import { useError } from "../context/error-provider";
import { captureError } from "../utils/errors";

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
    setUserFromDb,
    setCardUserInfo,
    setCardDetails,
    setPendingCardTopup,
    setTopupSignature,
    pendingCardTopup,
    topupSignature,
    jwtToken
  } = useStore();

  const { showError } = useError();

  const { data: accountStatus, isLoading: isAccountStatusLoading } = useAccountStatusQuery(wallet.publicKey);
  const isInitialized = (accountStatus === AccountStatus.INITIALIZED && !isAccountStatusLoading && !config.NEXT_PUBLIC_UNAVAILABLE_TIME);

  const { data: prices } = usePricesQuery();
  const { data: rates } = useRatesQuery();
  const { data: balances } = useBalancesQuery(isInitialized ? wallet.publicKey : null);
  const { data: withdrawLimits } = useWithdrawLimitsQuery(isInitialized ? wallet.publicKey : null);
  const { data: health } = useHealthQuery(isInitialized ? wallet.publicKey : null);
  const { data: userFromDb } = useUserFromDatabaseQuery(isInitialized ? wallet.publicKey : null);
  const hasCardAccount = userFromDb?.auth_level === "Card" ? true : false;

  const { data: cardDetails } = useCardsForUserQuery(userFromDb?.card_api_user_id ?? null);

  const [kycApplicationStatus, setKycApplicationStatus] = useState<string | null>(null);
  const { data: cardUserInfo } = useCardUserInfoQuery(
    userFromDb?.card_api_user_id ?? null,
    userFromDb?.auth_level === "Base"
  );

  const refetchCardDetails = useRefetchCardDetails();

  useEffect(() => {
    if (!pendingCardTopup || !topupSignature) return;

    const cardInfo = cardDetails?.find(card => card !== null);
    if (!cardInfo) return;

    const startTime = Date.now();
    const TIMEOUT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

    const processCardTopup = async () => {
      // Check if we've exceeded the timeout
      if (Date.now() - startTime > TIMEOUT_DURATION) {
        clearInterval(interval);
        captureError(showError, "Card topup process timed out after 5 minutes, please notify support", "/page.tsx", null, wallet.publicKey);
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
          captureError(showError, "Failed to update the card limit after topup", "/page.tsx", responseBody, wallet.publicKey);
          return;
        }

        if (!responseBody) {
          console.log("Didn't update the card limit, response is undefined: ", responseBody);
          return;
        }

      } catch (error) {
        captureError(showError, "Failed to update the card limit after topup", "/page.tsx", error, wallet.publicKey);
        return;
      }

      refetchCardDetails();
      setPendingCardTopup(false);
      setTopupSignature(undefined);
    };

    // Set up interval to run every 3 seconds
    const interval = setInterval(processCardTopup, 3000);

    // Cleanup function to clear interval when component unmounts
    // or when pendingCardTopup/topupSignature changes
    return () => clearInterval(interval);

  }, [cardDetails, jwtToken, pendingCardTopup, topupSignature, setTopupSignature, setPendingCardTopup, refetchCardDetails]);

  useEffect(() => {
    console.log("userFromDb", userFromDb);
    console.log("kycApplicationStatus", kycApplicationStatus);
    console.log("wallet.publicKey", wallet.publicKey);
    console.log("cardUserInfo", cardUserInfo);

    if (kycApplicationStatus === "approved" && userFromDb?.auth_level !== "Card") {
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
  }, [kycApplicationStatus, wallet.publicKey, userFromDb]);

  useEffect(() => {
    if (cardUserInfo) {
      setKycApplicationStatus(cardUserInfo.applicationStatus);
    }
  }, [cardUserInfo]);

  useEffect(() => {
    setPrices(prices);
    setRates(rates);
    setBalances(balances);
    setWithdrawLimits(withdrawLimits);
    setHealth(health);
    setIsInitialized(isInitialized);
    setUserFromDb(userFromDb);
    setCardUserInfo(cardUserInfo);
    setCardDetails(cardDetails);
    setPendingCardTopup(pendingCardTopup);
  }, [
    isInitialized, prices, rates, balances, withdrawLimits, health, userFromDb, cardUserInfo, cardDetails, pendingCardTopup,
    setPrices, setRates, setBalances, setWithdrawLimits, setHealth, setIsInitialized, setUserFromDb, setCardUserInfo, setCardDetails, setPendingCardTopup
  ]);

  const signMessage = useSignMessage({
    address: wallet.publicKey! // Note: Make sure to handle the case where publicKey is null
  })

  const handleSignClick = useCallback(async () => {
    try {
      // The message you want to sign
      const timestamp = Date.now();
      const message = `Sign this message to authenticate ownership. This signature will not trigger any blockchain transaction or cost any gas fees. \n\nWallet address: ${wallet.publicKey}\nTimestamp: ${timestamp}\n`;

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
