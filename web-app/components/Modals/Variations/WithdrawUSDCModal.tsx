import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_USDC } from "@/utils/constants";
import { truncateToDecimalPlaces, uiToBaseUnit } from "@/utils/helpers";
import { withdrawUsdc } from "@/utils/instructions";
import { BalanceInfo } from "@/utils/balance";

interface WithdrawUSDCModalProps {
    balanceInfo: BalanceInfo,
    apr: number | null;
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function WithdrawUSDCModal(
    {balanceInfo, apr, isValid, closeModal} : WithdrawUSDCModalProps
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
        const totalWithdrawable = balanceInfo.solUi * balanceInfo.solPriceUSD * 0.8;
        const rawMaxWithdraw = totalWithdrawable - balanceInfo.usdcUi;
        maxWithdraw = truncateToDecimalPlaces(rawMaxWithdraw, DECIMALS_USDC);
    }

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
                amountStr={amountStr}
                maxAmount={maxWithdraw}
                maxDecimals={DECIMALS_USDC}
                setAmountStr={setAmountStr}
            />

            <ModalInfoSection 
                maxAmount={maxWithdraw} 
                minDecimals={2} 
                errorText={errorText}
            >
                <p>
                    ${amount.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {(apr !== null) &&
                        <span className="tiny-text">({apr * 100}% APR)</span>
                    }
                </p>
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