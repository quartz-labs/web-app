import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { BalanceInfo } from "@/utils/balance";
import { truncateToDecimalPlaces } from "@/utils/helpers";

interface OfframpUSDModalProps {
    balanceInfo: BalanceInfo,
    apr: number | null;
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function OfframpUSDModal(
    {balanceInfo, apr, isValid, closeModal} : OfframpUSDModalProps
) {
    const awaitingSign = false;
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT = 31;

    let maxWithdraw = 0;
    if (balanceInfo.solUi !== null && balanceInfo.usdcUi !== null && balanceInfo.solPriceUSD !== null) {
        const totalWithdrawable = balanceInfo.solUi * balanceInfo.solPriceUSD * 0.8;
        const rawMaxWithdraw = totalWithdrawable - balanceInfo.usdcUi;
        maxWithdraw = truncateToDecimalPlaces(rawMaxWithdraw, 2);
    }

    const handleConfirm = async () => {
        const error = isValid(amount, MIN_AMOUNT, maxWithdraw);
        if (error) {
            setErrorText(error);
            return
        };

        // TODO: Truncate to 2 decimal places

        throw new Error("Off-ramp not implemented");
    }

    return (
        <>
            <ModalDefaultContent
                title="Off-ramp USD"
                denomination="USD"
                amountStr={amountStr}
                maxAmount={maxWithdraw}
                maxDecimals={2}
                setAmountStr={setAmountStr}
            />

            <ModalInfoSection 
                maxAmount={maxWithdraw} 
                minDecimals={2} 
                errorText={errorText}
            >
                {apr !== null &&
                    <p>({(apr * 100).toFixed(4)}% APR)</p>
                }
            </ModalInfoSection>

            <ModalButtons 
                label="Off-ramp" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={closeModal}
            />
        </>
    )
}