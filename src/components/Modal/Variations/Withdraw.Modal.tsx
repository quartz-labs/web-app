import { baseUnitToDecimal, buildAndSendTransaction, decimalToBaseUnit, validateAmount } from "@/src/utils/helpers";
import type { MarketIndex } from "@/src/config/constants";
import { useRefetchAccountData, useRefetchWithdrawLimits } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import styles from "../Modal.module.css";
import InputSection from "../Input.ModuleComponent";
import Buttons from "../Buttons.ModalComponent";
import { makeWithdrawIxs } from "@/src/utils/instructions";
import { useError } from "@/src/context/error-provider";
import { captureError } from "@/src/utils/errors";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";

export default function WithdrawModal() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const { prices, rates, withdrawLimits, setModalVariation } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const refetchAccountData = useRefetchAccountData();
    const refetchWithdrawLimits = useRefetchWithdrawLimits();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amountDecimals = Number(amountStr);

    const [ marketIndex, setMarketIndex ] = useState<MarketIndex>(SUPPORTED_DRIFT_MARKETS[0]);

    useEffect(() => {
        refetchAccountData();
        
        const interval = setInterval(refetchWithdrawLimits, 3_000);
        return () => clearInterval(interval);
    }, [refetchAccountData, refetchWithdrawLimits]);

    const maxAmountBaseUnits = withdrawLimits?.[marketIndex] ?? 0;

    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");

        const errorText = validateAmount(marketIndex, amountDecimals, maxAmountBaseUnits);
        setErrorText(errorText);
        if (errorText) return;

        setAwaitingSign(true);
        try {
            const amountBaseUnits = decimalToBaseUnit(amountDecimals, marketIndex);
            const instructions = await makeWithdrawIxs(connection, wallet, amountBaseUnits, marketIndex);
            const signature = await buildAndSendTransaction(instructions, wallet, connection, showTxStatus);
            setAwaitingSign(false);
            if (signature) setModalVariation(ModalVariation.DISABLED);
        } catch (error) {
            if (error instanceof WalletSignTransactionError) showTxStatus({ status: TxStatus.SIGN_REJECTED });
            else {
                showTxStatus({ status: TxStatus.NONE });
                captureError(showError, "Failed to withdraw", "/WithdrawModal.tsx", error, wallet.publicKey);
            }
        } finally {
            setAwaitingSign(false);
        }
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