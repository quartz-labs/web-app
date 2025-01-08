import { useEffect } from "react";
import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import styles from "../Modal.module.css";
import { useError } from "@/src/context/error-provider";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { useRefetchAccountData } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { useDepositLimitsQuery } from "@/src/utils/queries";
import { MarketIndex, baseUnitToDecimal, decimalToBaseUnit } from "@quartz-labs/sdk/browser";
import { buildEndpointURL, validateAmount, fetchAndParse, deserializeTransaction, signAndSendTransaction } from "@/src/utils/helpers";
import { captureError } from "@/src/utils/errors";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import Buttons from "../Buttons.ModalComponent";
import InputSection from "../Input.ModalComponent";

export default function RepayWithWallet() {
    const wallet = useAnchorWallet();

    const { prices, balances, rates, setModalVariation } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const refetchAccountData = useRefetchAccountData();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amountDecimals = Number(amountStr);

    const loanMarketIndices = balances
        ? Object.entries(balances)
            .filter(([, balance]) => balance < 0)
            .map(([marketIndex]) => Number(marketIndex) as MarketIndex)
        : [];

    const [ marketIndex, setMarketIndex ] = useState<MarketIndex>(loanMarketIndices[0] ?? MarketIndex[0]);

    useEffect(() => {
        refetchAccountData();
    }, [refetchAccountData]);

    const { data: depositLimitBaseUnits } = useDepositLimitsQuery(wallet?.publicKey ?? null, marketIndex);
    const maxRepayBaseUnits = Math.min(
        depositLimitBaseUnits ?? 0, 
        Math.abs(balances?.[marketIndex] ?? 0)
    );

    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");
        
        const errorText = validateAmount(marketIndex, amountDecimals, depositLimitBaseUnits ?? 0);
        setErrorText(errorText);
        if (errorText) return;

        setAwaitingSign(true);
        try {
            const endpoint = buildEndpointURL("/api/build-tx/deposit", {
                address: wallet.publicKey.toBase58(),
                amountBaseUnits: decimalToBaseUnit(amountDecimals, marketIndex),
                repayingLoan: true,
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
                borrowing={false}
                price={prices?.[marketIndex]}
                rate={rates?.[marketIndex]?.depositRate}
                available={baseUnitToDecimal(maxRepayBaseUnits, marketIndex)}
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(maxRepayBaseUnits ? baseUnitToDecimal(maxRepayBaseUnits, marketIndex).toString() : "0")}
                setHalfAmount={() => setAmountStr(maxRepayBaseUnits ? baseUnitToDecimal(Math.trunc(maxRepayBaseUnits / 2), marketIndex).toString() : "0")}
                marketIndex={marketIndex}
                setMarketIndex={setMarketIndex}
                selectableMarketIndices={loanMarketIndices}
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