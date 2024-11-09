import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_SOL, DECIMALS_USDC } from "@/utils/constants";
import { baseUnitToUi, truncateToDecimalPlaces, uiToBaseUnit } from "@/utils/helpers";
import { liquidateSol } from "@/utils/instructions";
import { AccountData } from "@/utils/driftData";

interface RepayUSDCWithCollateralModalProps {
    accountData: AccountData | null,
    solPriceUSD: number | null,
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function RepayUSDCWithCollateralModal(
    {accountData, solPriceUSD, isValid, closeModal} : RepayUSDCWithCollateralModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT = 0.01;

    let maxRepay = 0;
    if (accountData !== null && solPriceUSD !== null) {
        const solValue = Number(baseUnitToUi(accountData.solBalanceBaseUnits, DECIMALS_SOL)) * solPriceUSD;
        const rawMaxRepay = Math.min(Number(baseUnitToUi(accountData.usdcBalanceBaseUnits, DECIMALS_USDC)), solValue);
        maxRepay = truncateToDecimalPlaces(rawMaxRepay, DECIMALS_USDC);
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
                title="Repay Loan with Collateral"
                subtitle="Repay your USDC loan using your existing SOL deposits"
                denomination="USDC"
                amountStr={amountStr}
                maxAmount={maxRepay}
                maxDecimals={DECIMALS_USDC}
                setAmountStr={setAmountStr}
            />

            <ModalInfoSection 
                maxAmount={maxRepay} 
                minDecimals={2}
                errorText={errorText}
            >
                {(accountData != null) &&
                    <p>Loan remaining: {baseUnitToUi(accountData.usdcBalanceBaseUnits, DECIMALS_USDC)}</p>
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