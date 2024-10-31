import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { BalanceInfo } from "@/utils/balance";

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
    const [amount, setAmount] = useState(0);
    const [errorText, setErrorText] = useState("");
    const MIN_AMOUNT = 31;

    let maxWithdraw = 0;
    if (balanceInfo.solUi !== null && balanceInfo.usdcUi !== null && balanceInfo.solPriceUSD !== null) {
        const totalWithdrawable = balanceInfo.solUi * balanceInfo.solPriceUSD * 0.8;
        maxWithdraw = totalWithdrawable - balanceInfo.usdcUi;
    }

    const handleConfirm = async () => {
        const error = isValid(amount, MIN_AMOUNT, maxWithdraw);
        if (error) {
            setErrorText(error);
            return
        };

        throw new Error("Off-ramp not implemented");
    }

    return (
        <>
            <ModalDefaultContent
                title="Off-ramp USD"
                denomination="USD"
                amount={amount}
                maxAmount={maxWithdraw}
                setAmount={setAmount}
            />

            <ModalInfoSection 
                maxAmount={maxWithdraw} 
                minDecimals={2} 
                setAmount={setAmount}
                errorText={errorText}
            >
                {apr !== null &&
                    <p>({apr * 100}% APR)</p>
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