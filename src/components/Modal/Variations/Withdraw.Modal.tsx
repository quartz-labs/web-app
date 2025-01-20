import { validateAmount, fetchAndParse, deserializeTransaction, signAndSendTransaction, buildEndpointURL, formatPreciseDecimal } from "@/src/utils/helpers";
import { useRefetchAccountData, useRefetchWithdrawLimits } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import styles from "../Modal.module.css";
import InputSection from "../Input.ModalComponent";
import Buttons from "../Buttons.ModalComponent";
import { useError } from "@/src/context/error-provider";
import { captureError } from "@/src/utils/errors";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { MarketIndex, baseUnitToDecimal, decimalToBaseUnit } from "@quartz-labs/sdk/browser";

export default function WithdrawModal() {
    const wallet = useAnchorWallet();

    const { prices, rates, balances, withdrawLimits, setModalVariation } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const refetchAccountData = useRefetchAccountData();
    const refetchWithdrawLimits = useRefetchWithdrawLimits();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amountDecimals = Number(amountStr);

    const collateralMarketIndices = balances
        ? Object.entries(balances)
            .filter(([, balance]) => balance > 0)
            .map(([marketIndex]) => Number(marketIndex) as MarketIndex)
        : [];

    const [ marketIndex, setMarketIndex ] = useState<MarketIndex>(collateralMarketIndices[0] ?? MarketIndex[0]);

    useEffect(() => {
        refetchAccountData();
        
        const interval = setInterval(refetchWithdrawLimits, 3_000);
        return () => clearInterval(interval);
    }, [refetchAccountData, refetchWithdrawLimits]);
    
    const collateralBalance = balances?.[marketIndex] ?? 0;
    const maxWithdrawBaseUnits = collateralBalance > 0
        ? Math.min(collateralBalance, withdrawLimits?.[marketIndex] ?? 0)
        : 0;

    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");

        const errorText = validateAmount(marketIndex, amountDecimals, maxWithdrawBaseUnits);
        setErrorText(errorText);
        if (errorText) return;

        setAwaitingSign(true);
        try {
            const endpoint = buildEndpointURL("/api/build-tx/withdraw", {
                address: wallet.publicKey.toBase58(),
                allowLoan: false,
                amountBaseUnits: decimalToBaseUnit(amountDecimals, marketIndex),
                marketIndex
            });
            const response = await fetchAndParse(endpoint);
            const transaction = deserializeTransaction(response.transaction);
            const signature = await signAndSendTransaction(transaction, wallet, showTxStatus);
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
                available={baseUnitToDecimal(maxWithdrawBaseUnits, marketIndex)}
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(
                    maxWithdrawBaseUnits ? formatPreciseDecimal(baseUnitToDecimal(maxWithdrawBaseUnits, marketIndex)) : "0"
                )}
                setHalfAmount={() => setAmountStr(
                    maxWithdrawBaseUnits ? formatPreciseDecimal(baseUnitToDecimal(Math.trunc(maxWithdrawBaseUnits / 2), marketIndex)) : "0"
                )}
                marketIndex={marketIndex}
                setMarketIndex={setMarketIndex}
                selectableMarketIndices={collateralMarketIndices}
            />

            {errorText &&
                <div className={styles.messageTextWrapper}>
                    <p className={"error-text"}>{errorText}</p>
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