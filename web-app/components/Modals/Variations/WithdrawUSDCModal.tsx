import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_USDC } from "@/utils/constants";
import { uiToBaseUnit } from "@/utils/helpers";
import { withdrawUsdc } from "@/utils/instructions";

interface WithdrawUSDCModalProps {
    maxWithdraw: number;
    apr: number;
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function WithdrawUSDCModal(
    {maxWithdraw, apr, isValid, closeModal} : WithdrawUSDCModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [amount, setAmount] = useState(0);
    const [errorText, setErrorText] = useState("");
    const MIN_AMOUNT = 0.000001;

    const handleConfirm = async () => {
        const error = isValid(amount, MIN_AMOUNT, maxWithdraw);
        if (error) {
            setErrorText(error);
            return
        };
        if (!wallet) return;

        setAwaitingSign(true);
        const baseUnits = uiToBaseUnit(amount, DECIMALS_USDC).toNumber();
        const signature = await withdrawUsdc(wallet, connection, baseUnits, showError);
        setAwaitingSign(false);

        if (signature) closeModal(signature);
    }

    return (
        <>
            <ModalDefaultContent
                title="Withdraw USDC"
                denomination="USDC"
                amount={amount}
                setAmount={setAmount}
            />

            <ModalInfoSection 
                maxAmount={maxWithdraw} 
                setAmount={setAmount}
                errorText={errorText}
            >
                <p>${amount.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="tiny-text">({apr * 100}% APR)</span></p>
            </ModalInfoSection>

            <ModalButtons 
                label="Withdraw" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={closeModal}
            />
        </>
    )
}