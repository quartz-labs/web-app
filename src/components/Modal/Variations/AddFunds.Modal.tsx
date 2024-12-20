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
import { useWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/src/context/error-provider";
import { useDepositLimitsQuery } from "@/src/utils/queries";
import { baseUnitToDecimal, decimalToBaseUnit } from "@/src/utils/helpers";

export default function AddFundsModal() {
    const { prices, rates, setModalVariation } = useStore();
    const wallet = useWallet();
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

    const { data: depositLimit } = useDepositLimitsQuery(wallet.publicKey, marketIndex);
    useEffect(() => {
        if (depositLimit) setAvailable(baseUnitToDecimal(depositLimit, marketIndex));
    }, [depositLimit]);

    const value = prices?.[marketIndex] ?? 0;
    const rate = rates?.[marketIndex]?.depositRate ?? 0;

    const handleConfirm = async () => {
        const minAmount = baseUnitToDecimal(1, marketIndex);

        if (isNaN(amount)) return setErrorText("Invalid input");
        if (amount > available) return setErrorText(`Maximum amount: ${available}`);
        if (amount < minAmount) return setErrorText(`Minimum amount: ${minAmount}`);
        if (!wallet.publicKey) return setErrorText("Wallet not connected");
        setErrorText("");

        setAwaitingSign(true);
        // TODO - Implement
        const signature = ""; // await depositUsdc(wallet, connection, decimaltoBaseUnits(amount), showError, showTxStatus);
        setAwaitingSign(false);

        if (signature) setModalVariation(ModalVariation.DISABLED);
    }
    
    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>Add Funds</h2>

            <InputSection
                borrowing={false}
                value={value * amount}
                rate={rate * 100}
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