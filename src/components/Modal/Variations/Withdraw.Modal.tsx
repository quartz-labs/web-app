import { baseUnitToDecimal } from "@/src/utils/helpers";
import type { MarketIndex } from "@/src/config/constants";
import { useRefetchAccountData, useRefetchWithdrawLimits } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import styles from "../Modal.module.css";
import InputSection from "../Input.ModuleComponent";
import Buttons from "../Buttons.ModalComponent";

export default function WithdrawModal() {
    const refetchAccountData = useRefetchAccountData();
    const refetchWithdrawLimits = useRefetchWithdrawLimits();
    
    const { prices, rates, withdrawLimits, setModalVariation } = useStore();
    const wallet = useWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const [ marketIndex, setMarketIndex ] = useState<MarketIndex>(SUPPORTED_DRIFT_MARKETS[0]);

    useEffect(() => {
        refetchAccountData();
        
        const interval = setInterval(refetchWithdrawLimits, 3_000);
        return () => clearInterval(interval);
    }, [refetchAccountData, refetchWithdrawLimits]);

    const maxAmountBaseUnits = withdrawLimits?.[marketIndex] ?? 0;

    const handleConfirm = async () => {
        const minAmount = baseUnitToDecimal(1, marketIndex);

        if (isNaN(amount)) return setErrorText("Invalid input");
        if (amount > baseUnitToDecimal(maxAmountBaseUnits, marketIndex)) return setErrorText(`Maximum amount: ${maxAmountBaseUnits}`);
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
            <h2 className={styles.heading}>Withdraw Funds</h2>

            <InputSection
                borrowing={true}
                price={prices?.[marketIndex]}
                rate={rates?.[marketIndex]?.borrowRate}
                available={baseUnitToDecimal(maxAmountBaseUnits, marketIndex)}
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(maxAmountBaseUnits ? baseUnitToDecimal(maxAmountBaseUnits, marketIndex).toString() : "0")}
                setHalfAmount={() => setAmountStr(maxAmountBaseUnits ? baseUnitToDecimal(Math.trunc(maxAmountBaseUnits / 2), marketIndex).toString() : "0")}
                marketIndex={marketIndex}
                setMarketIndex={setMarketIndex}
            />

            {errorText &&
                <div className={styles.errorTextWrapper}>
                    <p>{errorText}</p>
                </div>
            } 

            <Buttons 
                label="Withdraw" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={() => setModalVariation(ModalVariation.DISABLED)}
            />
        </div>
    )
}