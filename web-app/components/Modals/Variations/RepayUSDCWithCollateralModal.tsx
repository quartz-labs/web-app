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
import { BalanceInfo } from "@/utils/balance";

interface RepayUSDCWithCollateralModalProps {
    balanceInfo: BalanceInfo,
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function RepayUSDCWithCollateralModal(
    {balanceInfo, isValid, closeModal} : RepayUSDCWithCollateralModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [amount, setAmount] = useState(0);
    const [errorText, setErrorText] = useState("");
    const MIN_AMOUNT = 0.000001;

    let maxRepay = 0;
    if (balanceInfo.solUi !== null && balanceInfo.usdcUi !== null && balanceInfo.solPriceUSD !== null) {
        const solValue = balanceInfo.solUi * balanceInfo.solPriceUSD;
        maxRepay = Math.min(balanceInfo.usdcUi, solValue);
    }

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
                maxAmount={maxRepay}
                setAmount={setAmount}
            />

            <ModalInfoSection 
                maxAmount={maxRepay} 
                minDecimals={2} 
                setAmount={setAmount}
                errorText={errorText}
            >
                {(balanceInfo.usdcUi != null) &&
                    <p>Loan remaining: {Math.abs(balanceInfo.usdcUi)}</p>
                }
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