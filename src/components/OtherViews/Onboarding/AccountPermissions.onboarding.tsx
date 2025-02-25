import { useEffect, useState } from "react";
import type { OnboardingPageProps } from "./Onboarding";
import styles from "./Onboarding.module.css";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/src/context/error-provider";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { useStore } from "@/src/utils/store";
import { useRefetchSpendLimits } from "@/src/utils/hooks";
import { baseUnitToDecimal, decimalToBaseUnit, MARKET_INDEX_USDC } from "@quartz-labs/sdk";
import { displayToTimeframe, SpendLimitTimeframe, SpendLimitTimeframeDisplay, timeframeToDisplay } from "@/src/types/enums/SpendLimitTimeframe.enum";
import { buildEndpointURL, deserializeTransaction, fetchAndParse, signAndSendTransaction } from "@/src/utils/helpers";
import { DEFAULT_CARD_TRANSACTION_LIMIT } from "@/src/config/constants";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { captureError } from "@/src/utils/errors";
import { TailSpin } from "react-loader-spinner";

export interface AccountPermissionsProps extends OnboardingPageProps {
    onCompleteOnboarding: () => void;
}

export default function AccountPermissions({ onCompleteOnboarding }: AccountPermissionsProps) {
    const wallet = useAnchorWallet();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();

    const { 
        spendLimitTimeframeBaseUnits,
        spendLimitTimeframeLength,
        spendLimitRefreshing
    } = useStore();
    const refetchSpendLimits = useRefetchSpendLimits();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");

    
    let existingSpendLimitDollars = spendLimitTimeframeBaseUnits 
        ? baseUnitToDecimal(spendLimitTimeframeBaseUnits, MARKET_INDEX_USDC) 
        : 0;
    if (spendLimitTimeframeLength === 0) existingSpendLimitDollars = 0; // If timeframe is 0, limit is 0

    const [newLimitTimeframeDollarsStr, setNewLimitTimeframeDollarsStr] = useState<string>(
        existingSpendLimitDollars.toFixed(2)
    );

    let existingSpendLimitTimeframe = spendLimitTimeframeLength;
    const isValidSpendLimitTimeframe = (existingSpendLimitTimeframe === undefined)
        ? false
        : Object.values(SpendLimitTimeframe).filter(v => typeof v === 'number').includes(existingSpendLimitTimeframe);

    if (
        !isValidSpendLimitTimeframe 
        || existingSpendLimitTimeframe === undefined 
        || existingSpendLimitTimeframe === SpendLimitTimeframe.UNKNOWN
    ) {
        existingSpendLimitTimeframe = SpendLimitTimeframe.DAY;
    }
    const [newLimitTimeframeLength, setNewLimitTimeframeLength] = useState<SpendLimitTimeframe>(existingSpendLimitTimeframe);


    useEffect(() => {
        refetchSpendLimits();
    }, [refetchSpendLimits]);


    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");

        // TODO: Set error text if invalid
        const limitTimeframeDollarsNum = Number(newLimitTimeframeDollarsStr);
        if (Number.isNaN(limitTimeframeDollarsNum)) return setErrorText("Invalid spend limit");
        if (limitTimeframeDollarsNum < 0) return setErrorText("Spend limit cannot be negative");

        const limitTimeframeBaseUnits = decimalToBaseUnit(limitTimeframeDollarsNum, MARKET_INDEX_USDC);

        setAwaitingSign(true);
        try {
            const endpoint = buildEndpointURL("/api/build-tx/adjust-spend-limits", {
                address: wallet.publicKey.toBase58(),
                spendLimitTransactionBaseUnits: DEFAULT_CARD_TRANSACTION_LIMIT.toNumber(),
                spendLimitTimeframeBaseUnits: limitTimeframeBaseUnits,
                spendLimitTimeframe: newLimitTimeframeLength
            });
            const response = await fetchAndParse(endpoint, undefined, 3);
            const transaction = deserializeTransaction(response.transaction);
            const signature = await signAndSendTransaction(transaction, wallet, showTxStatus);
            
            setAwaitingSign(false);
            if (signature) {
                refetchSpendLimits();
                onCompleteOnboarding();
            }
        } catch (error) {
            if (error instanceof WalletSignTransactionError) showTxStatus({ status: TxStatus.SIGN_REJECTED });
            else {
                showTxStatus({ status: TxStatus.NONE });
                captureError(showError, "Failed to adjust spend limit", "/AccountPermissions.onboarding.tsx", error, wallet.publicKey);
            }
        } finally {
            setAwaitingSign(false);
        }
    }

    const showLoading = (spendLimitTimeframeBaseUnits === undefined) || spendLimitRefreshing;

    return (
        <div className={`${styles.contentWrapper} ${styles.textContent}`}>
            <div className={styles.heading}>
                <h1 className={styles.title}>Account Permissions</h1>
                <div className={styles.textBody}>
                    <p className={styles.subtitle}>
                        Quartz is fully self-custody. This means that no-one, not even Quartz, can access your funds without <span className={"no-wrap"}>your permission.</span>
                    </p>
                    <p className={styles.subtitle}>
                        In order to spend funds with your card, you must authorize a spend limit that Quartz can charge <span className={"no-wrap"}>to your account.</span>
                    </p>
                </div>
            </div>

            <div className={styles.spendLimitsContainer}>
                <div className={styles.inputSection}>
                    <p className={styles.inputLabel}>Spend Limit:</p>
                    <div className={styles.inputContainer}>
                        {!showLoading &&
                            <input 
                                className={`${styles.inputField}`}
                                type="text" 
                                placeholder={"0.0"} 
                                value={
                                    newLimitTimeframeDollarsStr.startsWith("$")
                                    ? newLimitTimeframeDollarsStr
                                    : `$${newLimitTimeframeDollarsStr}`
                                } 
                                onChange={(e) => 
                                    setNewLimitTimeframeDollarsStr(
                                        e.target.value.replace("$", "").replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
                                    )
                                }
                            />
                        }
                        {showLoading &&
                            <div className={`${styles.inputField}`}>
                                <TailSpin
                                    height="100%"
                                    width="100%"
                                    color="#ffffff"
                                    ariaLabel="loading-spinner"
                                    wrapperClass={styles.loadingSpinner}
                                />
                            </div>
                        }
                    </div>
                </div>

                <div className={styles.inputSection}>
                    <p className={styles.inputLabel}>Each:</p>
                    <div className={styles.inputContainer}>
                        <select
                            className={`${styles.inputField} ${styles.inputSelect}`}
                            value={timeframeToDisplay(newLimitTimeframeLength)}
                            onChange={(e) => 
                                setNewLimitTimeframeLength(displayToTimeframe(e.target.value as SpendLimitTimeframeDisplay))
                            }
                        >
                            {Object.values(SpendLimitTimeframeDisplay)
                                .filter(display => display !== SpendLimitTimeframeDisplay.UNKNOWN)
                                .map((display) => (
                                    <option key={display} value={display}>
                                        {display}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                
                {errorText &&
                    <div className={styles.messageTextWrapper}>
                        <p className={"error-text"}>{errorText}</p>
                    </div>
                } 
            </div>

            <div className={styles.buttonContainer}>
                <button 
                    className={`glass-button ${styles.mainButton}`}
                    onClick={handleConfirm}
                >
                    {awaitingSign ? "..." : "Done"}
                </button>
            </div>
        </div>
    );
}