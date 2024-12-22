"use client";

import { useRefetchAccountData } from "@/src/utils/hooks";
import { useEffect, useState } from "react";
import InputSection from "../Input.ModuleComponent";
import Buttons from "../Buttons.ModalComponent";
import styles from "../Modal.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useStore } from "@/src/utils/store";
import type { MarketIndex } from "@/src/config/constants";
import { SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useError } from "@/src/context/error-provider";
import { useDepositLimitsQuery } from "@/src/utils/queries";
import { baseUnitToDecimal, buildAndSendTransaction, decimalToBaseUnit } from "@/src/utils/helpers";
import { makeDepositIxs } from "@/src/utils/instructions";
import { captureError } from "@/src/utils/errors";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";

export default function AddFundsModal() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const { prices, rates, setModalVariation } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const refetchAccountData = useRefetchAccountData();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const [ marketIndex, setMarketIndex ] = useState<MarketIndex>(SUPPORTED_DRIFT_MARKETS[0]);
    const [ available, setAvailable ] = useState(0);

    useEffect(() => {
        refetchAccountData();
    }, [refetchAccountData]);

    const { data: depositLimit } = useDepositLimitsQuery(wallet?.publicKey ?? null, marketIndex);
    useEffect(() => {
        if (depositLimit) setAvailable(baseUnitToDecimal(depositLimit, marketIndex));
    }, [depositLimit]);

    const handleConfirm = async () => {
        const minAmount = baseUnitToDecimal(1, marketIndex);

        if (!wallet?.publicKey) return setErrorText("Wallet not connected");
        if (isNaN(amount)) return setErrorText("Invalid input");
        if (amount > available) return setErrorText(`Maximum amount: ${available}`);
        if (amount < minAmount) return setErrorText(`Minimum amount: ${minAmount}`);
        setErrorText("");

        setAwaitingSign(true);
        try {
            const amountBaseUnits = decimalToBaseUnit(amount, marketIndex);
            const instructions = await makeDepositIxs(connection, wallet, amountBaseUnits, marketIndex);
            const signature = await buildAndSendTransaction(instructions, wallet, connection, showTxStatus);
            if (signature) setModalVariation(ModalVariation.DISABLED);
        } catch (error) {
            showTxStatus({ status: TxStatus.NONE });
            captureError(showError, "Failed to add funds", "/AddFundsModal.tsx", error, wallet.publicKey);
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
                available={available}
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(depositLimit ? baseUnitToDecimal(depositLimit, marketIndex).toString() : "0")}
                setHalfAmount={() => setAmountStr(depositLimit ? baseUnitToDecimal(Math.trunc(depositLimit / 2), marketIndex).toString() : "0")}
                marketIndex={marketIndex}
                setMarketIndex={setMarketIndex}
            />

            {errorText &&
                <div className={styles.errorTextWrapper}>
                    <p>{errorText}</p>
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