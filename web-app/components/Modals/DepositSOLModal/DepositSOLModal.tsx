import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";

interface DepositSOLModalProps {
    maxDeposit: number;
    solPrice: number;
    apy: number;
    awaitingSign: boolean;
    errorText: string;
    onConfirm: (amount: number, minAmount: number, maxAmount: number) => void;
    onCancel: () => void;
}

export default function DepositSOLModal(
    {maxDeposit, solPrice, apy, awaitingSign, errorText, onConfirm, onCancel} : DepositSOLModalProps
) {
    const [amount, setAmount] = useState(0);
    const MIN_DEPOSIT = 0.000001;

    return (
        <>
            <ModalDefaultContent
                title="Deposit SOL"
                denomination="SOL"
                amount={amount}
                setAmount={setAmount}
            />

            <ModalInfoSection 
                maxAmount={maxDeposit} 
                setAmount={setAmount}
                errorText={errorText}
            >
                <p>${solPrice * Number(amount)} <span className="tiny-text">({apy * 100}% APY)</span></p>
            </ModalInfoSection>

            <ModalButtons 
                label="Deposit" 
                awaitingSign={awaitingSign} 
                onConfirm={() => {onConfirm(amount, MIN_DEPOSIT, maxDeposit)}} 
                onCancel={onCancel}
            />
        </>
    )
}