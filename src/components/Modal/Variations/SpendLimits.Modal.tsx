import styles from "../Modal.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useStore } from "@/src/utils/store";
import { useState, useEffect } from "react";
import { useRefetchSpendLimits } from "@/src/utils/hooks";
import { DEFAULT_CARD_TRANSACTION_LIMIT } from "@/src/config/constants";
import { buildEndpointURL, deserializeTransaction, fetchAndParse, signAndSendTransaction } from "@/src/utils/helpers";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/src/context/error-provider";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { captureError } from "@/src/utils/errors";
import Buttons from "../Components/Buttons.ModalComponent";
import { timeframeToDisplay, displayToTimeframe, SpendLimitTimeframe, SpendLimitTimeframeDisplay } from "@/src/types/enums/SpendLimitTimeframe.enum";
import { baseUnitToDecimal, decimalToBaseUnit, MARKET_INDEX_USDC } from "@quartz-labs/sdk";

export default function SpendLimitsModal() {
    const wallet = useAnchorWallet();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();

    const { 
        setModalVariation,
        spendLimitTimeframeBaseUnits,
        spendLimitTimeframeLength
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
    const [newLimitTimeframeLength, setNewLimitTimeframeLength] = useState<SpendLimitTimeframe>(
        spendLimitTimeframeLength ?? SpendLimitTimeframe.UNKNOWN
    );


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
                setModalVariation(ModalVariation.DISABLED);
            }
        } catch (error) {
            if (error instanceof WalletSignTransactionError) showTxStatus({ status: TxStatus.SIGN_REJECTED });
            else {
                showTxStatus({ status: TxStatus.NONE });
                captureError(showError, "Failed to add funds", "/AddFundsModal.tsx", error, wallet.publicKey);
            }
        } finally {
            setAwaitingSign(false);
        }
    }

    return (
        <div className={styles.contentWrapper}>
            <h2 
                className={styles.heading}
                style={{marginBottom: "15px"}}
            >Card Spend Limits</h2>
        
            <p style={{marginBottom: "50px"}}>Set the maximum limit the Quartz card can debit from <span className={"no-wrap"}>your account.</span></p>

            <div 
                className={styles.inputSection}
                style={{marginBottom: "5px"}}
            >
                <p>Spend Limit:</p>

                <div className={styles.inputFieldWrapper}>
                    <input 
                        className={`${styles.inputField} ${styles.inputFieldAmount} ${styles.inputFieldSpendLimits}`}
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
                </div>
            </div>

            <div 
                className={styles.inputSection}
                style={{marginBottom: "20px"}}
            >
                <p>Each:</p>

                <div className={styles.inputFieldWrapper}>
                    <div className={styles.inputGroup}>
                        <select
                            className={styles.selectSpendLimits}
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
            </div>
            
            {errorText &&
                <div className={styles.messageTextWrapper}>
                    <p className={"error-text"}>{errorText}</p>
                </div>
            } 

            <Buttons 
                label="Confirm" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={() => setModalVariation(ModalVariation.DISABLED)}
            />
        </div>
    )
}