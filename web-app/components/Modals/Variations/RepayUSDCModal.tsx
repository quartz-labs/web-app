import { useEffect, useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_USDC, USDC_MINT } from "@/utils/constants";
import { truncateToDecimalPlaces, uiToBaseUnit } from "@/utils/helpers";
import { depositUsdc } from "@/utils/instructions";
import { BalanceInfo } from "@/utils/balance";
import { getAssociatedTokenAddress } from "@solana/spl-token";

interface RepayUSDCModalProps {
    balanceInfo: BalanceInfo,
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function RepayUSDCModal(
    {balanceInfo, isValid, closeModal} : RepayUSDCModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT = 0.000001;

    const [usdcWalletBalance, setUsdcWalletBalance] = useState(0);
    let maxRepay = 0;
    if (balanceInfo.solUi !== null && balanceInfo.usdcUi !== null && balanceInfo.solPriceUSD !== null) {
        const rawMaxRepay = Math.min(balanceInfo.usdcUi, usdcWalletBalance);
        maxRepay = truncateToDecimalPlaces(rawMaxRepay, DECIMALS_USDC);
    }

    useEffect(() => {
        const fetchUsdcWalletBalance = async () => {
            if (!wallet) return;
            const tokenAccount = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
            const balance = await connection.getTokenAccountBalance(tokenAccount);
            setUsdcWalletBalance(Number(balance.value.amount) * DECIMALS_USDC);
        }
        fetchUsdcWalletBalance();
    }, [connection, wallet])

    const handleConfirm = async () => {
        const error = isValid(amount, MIN_AMOUNT, maxRepay);
        if (error) {
            setErrorText(error);
            return
        };
        if (!wallet) return;

        setAwaitingSign(true);
        const baseUnits = uiToBaseUnit(amount, DECIMALS_USDC).toNumber();
        const signature = await depositUsdc(wallet, connection, baseUnits, showError);
        setAwaitingSign(false);

        if (signature) closeModal(signature);
    }

    return (
        <>
            <ModalDefaultContent
                title="Repay USDC Loan"
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
                {balanceInfo.usdcUi &&
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