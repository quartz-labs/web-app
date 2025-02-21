"use client";

import { useRefetchAccountData, useRefetchDepositLimits } from "@/src/utils/hooks";
import { useEffect, useState } from "react";
import InputSection from "../Input.ModalComponent";
import Buttons from "../Buttons.ModalComponent";
import styles from "../Modal.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useStore } from "@/src/utils/store";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/src/context/error-provider";
import { validateAmount, fetchAndParse, deserializeTransaction, signAndSendTransaction, buildEndpointURL, formatPreciseDecimal } from "@/src/utils/helpers";
import { captureError } from "@/src/utils/errors";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { MarketIndex, baseUnitToDecimal, decimalToBaseUnit } from "@quartz-labs/sdk/browser";

export default function AddFundsModal() {
    const wallet = useAnchorWallet();

    const { prices, rates, setModalVariation, depositLimits } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const refetchAccountData = useRefetchAccountData();
    const refetchDepositLimits = useRefetchDepositLimits();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amountDecimals = Number(amountStr);

    const [ marketIndex, setMarketIndex ] = useState<MarketIndex>(MarketIndex[0]);
    const depositLimitDecimal = depositLimits ? baseUnitToDecimal(depositLimits[marketIndex], marketIndex) : undefined;

    useEffect(() => {
        refetchAccountData();
        refetchDepositLimits();
    }, [refetchAccountData, refetchDepositLimits]);

    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");
        
        if (depositLimitDecimal !== undefined) {
            const errorText = validateAmount(marketIndex, amountDecimals, depositLimits?.[marketIndex] ?? 0);
            setErrorText(errorText);
            if (errorText) return;
        }

        setAwaitingSign(true);
        try {
            const endpoint = buildEndpointURL("/api/build-tx/deposit", {
                address: wallet.publicKey.toBase58(),
                amountBaseUnits: decimalToBaseUnit(amountDecimals, marketIndex),
                repayingLoan: false,
                marketIndex
            });
            const response = await fetchAndParse(endpoint, undefined, 3);
            const transaction = deserializeTransaction(response.transaction);
            const signature = await signAndSendTransaction(transaction, wallet, showTxStatus);
            
            setAwaitingSign(false);
            if (signature) setModalVariation(ModalVariation.DISABLED);
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
            <h2 className={styles.heading}>Add Funds</h2>

            <InputSection
                borrowing={false}
                price={prices?.[marketIndex]}
                rate={rates?.[marketIndex]?.depositRate}
                available={depositLimitDecimal}
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(
                    depositLimitDecimal ? formatPreciseDecimal(depositLimitDecimal) : "0"
                )}
                setHalfAmount={() => setAmountStr(
                    depositLimitDecimal ? formatPreciseDecimal(depositLimitDecimal / 2) : "0"
                )}
                marketIndex={marketIndex}
                setMarketIndex={setMarketIndex}
            />

            {errorText &&
                <div className={styles.messageTextWrapper}>
                    <p className={"error-text"}>{errorText}</p>
                </div>
            } 

            <Buttons 
                label="Add" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={() => setModalVariation(ModalVariation.DISABLED)}
            />
        </div>
    )
}