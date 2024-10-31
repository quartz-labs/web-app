import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_USDC } from "@/utils/constants";
import { uiToBaseUnit } from "@/utils/helpers";
import { liquidateSol } from "@/utils/instructions";

interface RepayUSDCWithCollateralModalProps {
    maxRepay: number;
    loanRemaining: number;
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function RepayUSDCWithCollateralModal(
    {maxRepay, loanRemaining, isValid, closeModal} : RepayUSDCWithCollateralModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [amount, setAmount] = useState(0);
    const [errorText, setErrorText] = useState("");
    const MIN_AMOUNT = 0.000001;

    const handleConfirm = async () => {
        const error = isValid(amount, MIN_AMOUNT, maxRepay);
        if (error) {
            setErrorText(error);
            return
        };
        if (!wallet) return;

        setAwaitingSign(true);
        const baseUnits = uiToBaseUnit(amount, DECIMALS_USDC).toNumber();
        const signature = await liquidateSol(wallet, connection, baseUnits, showError);
        setAwaitingSign(false);

        if (signature) closeModal(signature);
    }

    return (
        <>
            <ModalDefaultContent
                title="Repay USDC Loan with SOL Collateral"
                denomination="USDC"
                amount={amount}
                setAmount={setAmount}
            />

            <ModalInfoSection 
                maxAmount={maxRepay} 
                setAmount={setAmount}
                errorText={errorText}
            >
                <p>Loan remaining: {loanRemaining}</p>
            </ModalInfoSection>

            <ModalButtons 
                label="Repay" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={closeModal}
            />
        </>
    )
}