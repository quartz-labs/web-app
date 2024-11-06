import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { baseUnitToUi } from "@/utils/helpers";
import { AccountData } from "@/utils/driftData";
import { DECIMALS_USDC } from "@/utils/constants";

interface OfframpUSDModalProps {
    accountData: AccountData | null,
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function OfframpUSDModal(
    {accountData, isValid, closeModal} : OfframpUSDModalProps
) {
    const awaitingSign = false;
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT = 31;
    const maxAmount = (accountData !== null)
        ? Number(baseUnitToUi(accountData.usdcWithdrawLimitBaseUnits, DECIMALS_USDC))
        : 0;

    const handleConfirm = async () => {
        const error = isValid(amount, MIN_AMOUNT, maxAmount);
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
                maxAmount={maxAmount}
                maxDecimals={2}
                setAmountStr={setAmountStr}
            />

            <ModalInfoSection 
                maxAmount={maxAmount} 
                minDecimals={2} 
                errorText={errorText}
            >
                {accountData !== null &&
                    <p>({(accountData.usdcRate * 100).toFixed(4)}% APR)</p>
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