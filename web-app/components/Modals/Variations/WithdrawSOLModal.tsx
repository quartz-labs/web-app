import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_SOL } from "@/utils/constants";
import { truncateToDecimalPlaces, uiToBaseUnit } from "@/utils/helpers";
import { withdrawLamports } from "@/utils/instructions";
import { BalanceInfo } from "@/utils/balance";

interface WithdrawSOLModalProps {
    balanceInfo: BalanceInfo;
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function WithdrawSOLModal(
    {balanceInfo, isValid, closeModal} : WithdrawSOLModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT = 0.000001;

    let maxWithdraw = 0;
    if (balanceInfo.solUi !== null && balanceInfo.usdcUi !== null && balanceInfo.solPriceUSD !== null) {
        const requiredSol = balanceInfo.usdcUi / (balanceInfo.solUi * balanceInfo.solPriceUSD);
        const rawMaxWithdraw = balanceInfo.solUi - requiredSol;
        maxWithdraw = truncateToDecimalPlaces(rawMaxWithdraw, DECIMALS_SOL);
    }

    const handleConfirm = async () => {
        const error = isValid(amount, MIN_AMOUNT, maxWithdraw);
        if (error) {
            setErrorText(error);
            return
        };
        if (!wallet) return;

        setAwaitingSign(true);
        const baseUnits = uiToBaseUnit(amount, DECIMALS_SOL).toNumber();
        const signature = await withdrawLamports(wallet, connection, baseUnits, showError);
        setAwaitingSign(false);

        if (signature) closeModal(signature);
    }

    return (
        <>
            <ModalDefaultContent
                title="Withdraw SOL"
                denomination="SOL"
                amountStr={amountStr}
                maxAmount={maxWithdraw}
                maxDecimals={DECIMALS_SOL}
                setAmountStr={setAmountStr}
            />

            <ModalInfoSection 
                maxAmount={maxWithdraw} 
                minDecimals={0} 
                errorText={errorText}
            >
                {(balanceInfo.solPriceUSD !== null) &&
                    <p>${(balanceInfo.solPriceUSD * amount).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                }
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