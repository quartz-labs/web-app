import { useError } from "@/src/context/error-provider";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { captureError } from "@/src/utils/errors";
import { signAndSendTransaction } from "@/src/utils/helpers";
import { deserializeTransaction } from "@/src/utils/helpers";
import { fetchAndParse } from "@/src/utils/helpers";
import { buildEndpointURL } from "@/src/utils/helpers";
import { useRefetchAccountStatus } from "@/src/utils/hooks";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import styles from "./Onboarding.module.css";
import { PuffLoader } from "react-spinners";
import type { OnboardingPageProps } from "./Onboarding";

export default function IdPhoto({
    incrementPage, 
    decrementPage 
}: OnboardingPageProps) {
    const handleSubmit = () => {
        throw new Error("Not implemented");
    }

    return (
        <div className={`${styles.contentWrapper} ${styles.textContent}`}>
            <div className={styles.heading}>
                <h1 className={styles.title}>Time to take a photo of your ID</h1>
                <p className={styles.textBody}>
                    <p className={styles.subtitle}>
                        Clicking the button below will redirect you to Sumsub to complete KYC. Make sure your ID hasn&apos;t expired, and is clear and fully visible <span className={"no-wrap"}>in the photo</span>.
                    </p>
                    <p className={styles.subtitle}>
                        Return to this page after submitting your document to finish creating your account.
                    </p>
                </p>
            </div>

            <div className={styles.buttonContainer}>
                <button 
                    className={`glass-button ghost ${styles.mainButton}`}
                    onClick={decrementPage}
                >
                    Back
                </button>

                <button 
                    className={`glass-button ${styles.mainButton}`}
                    onClick={handleSubmit}
                >
                    Complete KYC
                </button>
            </div>
        </div>
    );
}