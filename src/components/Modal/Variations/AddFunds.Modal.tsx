import { useRefetchAccountData } from "@/src/utils/hooks";
import { useEffect, useState } from "react";
import InputSection from "../Input.ModuleComponent";
import Buttons from "../Buttons.ModalComponent";
import styles from "../Modal.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useStore } from "@/src/utils/store";
import type { MarketIndex } from "@/src/config/constants";
import { SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";

export default function AddFundsModal() {
    const { prices, rates, setModalVariation } = useStore();
    const refetchAccountData = useRefetchAccountData();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const [ marketIndex, setMarketIndex ] = useState<MarketIndex>(SUPPORTED_DRIFT_MARKETS[0]);

    useEffect(() => {
        refetchAccountData();
    }, [refetchAccountData]);

    const value = prices?.[marketIndex] ?? 0;
    const rate = rates?.[marketIndex]?.depositRate ?? 0;
    
    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>Add Funds</h2>

            <InputSection
                borrowing={false}
                value={value * amount}
                rate={rate * 100}
                available={0}
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => {throw new Error("Not implemented")}} // TODO: Implement
                setHalfAmount={() => {throw new Error("Not implemented")}} // TODO: Implement
                marketIndex={marketIndex}
                setMarketIndex={setMarketIndex}
            />

            <Buttons 
                label="Add" 
                awaitingSign={awaitingSign} 
                onConfirm={() => {}} 
                onCancel={() => setModalVariation(ModalVariation.DISABLED)}
            />
        </div>
    )
}