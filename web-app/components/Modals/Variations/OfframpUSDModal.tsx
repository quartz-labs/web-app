import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";

interface OfframpUSDModalProps {
    maxWithdraw: number;
    apr: number;
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function OfframpUSDModal(
    {maxWithdraw, apr, isValid, closeModal} : OfframpUSDModalProps
) {
    const awaitingSign = false;
    const [amount, setAmount] = useState(0);
    const [errorText, setErrorText] = useState("");
    const MIN_AMOUNT = 31;

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
                setAmount={setAmount}
            />

            <ModalInfoSection 
                maxAmount={maxWithdraw} 
                setAmount={setAmount}
                errorText={errorText}
            >
                <p>({apr * 100}% APR)</p>
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