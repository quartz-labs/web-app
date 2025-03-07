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
import { useEffect, useState } from "react";
import styles from "./Onboarding.module.css";
import { PuffLoader } from "react-spinners";
import type { OnboardingPageProps } from "./Onboarding";
import { useStore } from "@/src/utils/store";
import { MARKET_INDEX_SOL } from "@quartz-labs/sdk";

export default function AccountCreation({
    incrementPage,
    handleTermsChange
}: OnboardingPageProps) {
    const wallet = useAnchorWallet();
    const refetchAccountStatus = useRefetchAccountStatus();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const { prices, isInitialized } = useStore();

    const [checkboxes, setCheckboxes] = useState([false, false, false]);
    const [missingCheckboxes, setMissingCheckboxes] = useState([false, false, false]);
    const [attemptFailed, setAttemptFailed] = useState(false);
    const [awaitingSign, setAwaitingSign] = useState(false);

    const ACCOUNT_CREATION_COST = 0.035;
    const costUsd = prices ? prices[MARKET_INDEX_SOL] * ACCOUNT_CREATION_COST : undefined;

    useEffect(() => {
        if (isInitialized) {
            incrementPage();
        }
    }, [isInitialized, incrementPage]);

    const handleCheckboxChange = (index: number): void => {
        const newCheckboxes = [...checkboxes]; 
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
    };

    const handleCreateAccount = async () => {
        if (!wallet || awaitingSign) return;

        setMissingCheckboxes(checkboxes.map(checked => !checked));
        if (!checkboxes.every(checked => checked)) {
            setAttemptFailed(true);
            return;
        }

        setAttemptFailed(false);
        setAwaitingSign(true);
        refetchAccountStatus();
        try {
            const endpoint = buildEndpointURL("/api/build-tx/init-account", { 
                address: wallet.publicKey.toBase58() 
            });
            const response = await fetchAndParse(endpoint);
            const transaction = deserializeTransaction(response.transaction);
            const signature = await signAndSendTransaction(transaction, wallet, showTxStatus);
            
            setAwaitingSign(false);
            if (signature) {
                handleTermsChange("isTermsOfServiceAccepted", true);
                handleTermsChange("privacyPolicy", true);
                refetchAccountStatus(signature);
            }
        } catch (error) {
            if (error instanceof WalletSignTransactionError) showTxStatus({ status: TxStatus.SIGN_REJECTED });
            else {
                showTxStatus({ status: TxStatus.NONE });
                captureError(showError, "Failed to create account", "/Onboarding.tsx", error, wallet.publicKey);
            }
            setAwaitingSign(false);
        }
    };

    return (
        <div className={`${styles.contentWrapper} ${styles.textContent}`}>
            <div className={styles.heading}>
                <h1 className={styles.title}>Account Creation</h1>
                <p className={styles.subtitle}>
                    Creating an account requires <span className={styles.highlight}>0.035 SOL</span> {costUsd !== undefined ? `(~$${costUsd.toFixed(2)})` : ""} for account rent which can be reclaimed if you ever decide to close your account.
                </p>
            </div>

            <ul className={styles.checkboxes}>
                <li>
                    <label className={missingCheckboxes[0] ? styles.missingLabel : ""}>
                        <input 
                            type="checkbox" 
                            checked={checkboxes[0]} 
                            onChange={() => handleCheckboxChange(0)} 
                        />
                        <span className={styles.checkboxText}>
                            I accept the <a href="https://docs.quartzpay.io/terms-and-conditions" target="_blank" rel="noopener noreferrer">terms of use</a>
                            , and <a href="https://docs.quartzpay.io/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a>.
                        </span>
                    </label>
                </li>

                <li>
                    <label className={missingCheckboxes[1] ? styles.missingLabel : ""}>
                        <input 
                            type="checkbox" 
                            checked={checkboxes[1]} 
                            onChange={() => handleCheckboxChange(1)} 
                        />
                        <span className={styles.checkboxText}>
                            I have read and understood the <a href="https://docs.quartzpay.io/risks" target="_blank" rel="noopener noreferrer">protocol disclaimer</a>.
                        </span>
                    </label>
                </li>

                <li>
                    <label className={missingCheckboxes[2] ? styles.missingLabel : ""}>
                        <input 
                            type="checkbox" 
                            checked={checkboxes[2]} 
                            onChange={() => handleCheckboxChange(2)} 
                        />
                        <span className={styles.checkboxText}>
                            I understand that redeeming my Quartz card will require KYC.
                        </span>
                    </label>
                </li>
            </ul>

            <div className={styles.buttonContainer}>
                <button onClick={handleCreateAccount} className={`glass-button`}>
                    {awaitingSign &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={30}
                            aria-label="Loading"
                            data-testid="loader"
                        />
                    }

                    {!awaitingSign &&
                        <p>Create Account</p>
                    }
                </button>

                {attemptFailed && 
                    <p className={`error-text`}>You must agree to all terms</p>
                }
            </div>
        </div>
    );
}