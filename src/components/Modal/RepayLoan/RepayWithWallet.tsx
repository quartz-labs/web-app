import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import styles from "../Modal.module.css";
import { useError } from "@/src/context/error-provider";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { useStore } from "@/src/utils/store";
import { baseUnitToDecimal, decimalToBaseUnit } from "@quartz-labs/sdk/browser";
import { buildEndpointURL, validateAmount, fetchAndParse, deserializeTransaction, signAndSendTransaction, formatPreciseDecimal } from "@/src/utils/helpers";
import { captureError } from "@/src/utils/errors";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import Buttons from "../Buttons.ModalComponent";
import InputSection from "../Input.ModalComponent";
import type { RepayLoanInnerModalProps } from "../Variations/RepayLoan.Modal";

export default function RepayWithWallet({
    depositLimitBaseUnits,
    marketIndexLoan,
    setMarketIndexLoan,
    loanPositionsMarketIndices,
    amountLoanStr,
    setAmountLoanStr
}: RepayLoanInnerModalProps) {
    const wallet = useAnchorWallet();

    const { prices, balances, rates, setModalVariation } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const amountDecimals = Number(amountLoanStr);

    const maxRepayBaseUnits = Math.min(
        depositLimitBaseUnits, 
        Math.abs(balances?.[marketIndexLoan] ?? 0)
    );

    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");
        
        const errorText = validateAmount(marketIndexLoan, amountDecimals, depositLimitBaseUnits);
        setErrorText(errorText);
        if (errorText) return;

        setAwaitingSign(true);
        try {
            const endpoint = buildEndpointURL("/api/build-tx/deposit", {
                address: wallet.publicKey.toBase58(),
                amountBaseUnits: decimalToBaseUnit(amountDecimals, marketIndexLoan),
                repayingLoan: true,
                marketIndex: marketIndexLoan
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
            <h2 className={`${styles.heading} ${styles.headingRepayLoan}`}>Repay Loan from Wallet</h2>

            <InputSection
                borrowing={true}
                price={prices?.[marketIndexLoan]}
                rate={rates?.[marketIndexLoan]?.borrowRate}
                available={baseUnitToDecimal(maxRepayBaseUnits, marketIndexLoan)}
                amountStr={amountLoanStr}
                setAmountStr={setAmountLoanStr}
                setMaxAmount={() => setAmountLoanStr(
                    maxRepayBaseUnits ? formatPreciseDecimal(baseUnitToDecimal(maxRepayBaseUnits, marketIndexLoan)) : "0"
                )}
                setHalfAmount={() => setAmountLoanStr(
                    maxRepayBaseUnits ? formatPreciseDecimal(baseUnitToDecimal(Math.trunc(maxRepayBaseUnits / 2), marketIndexLoan)) : "0"
                )}
                marketIndex={marketIndexLoan}
                setMarketIndex={setMarketIndexLoan}
                selectableMarketIndices={loanPositionsMarketIndices}
            />

            {errorText &&
                <div className={styles.messageTextWrapper}>
                    <p className={"error-text"}>{errorText}</p>
                </div>
            } 

            <Buttons 
                label="Repay Loan"
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={() => setModalVariation(ModalVariation.DISABLED)}
            />
        </div>
    )
}