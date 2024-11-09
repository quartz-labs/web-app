import { useEffect, useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_USDC, USDC_MINT } from "@/utils/constants";
import { baseUnitToUi, uiToBaseUnit } from "@/utils/helpers";
import { depositUsdc } from "@/utils/instructions";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { AccountData } from "@/utils/accountData";
import { useTxStatus } from "@/context/tx-status-provider";

interface RepayUSDCModalProps {
    accountData: AccountData | undefined;
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function RepayUSDCModal(
    {accountData, isValid, closeModal} : RepayUSDCModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT = 0.01;

    const [usdcWalletBalance, setUsdcWalletBalance] = useState(0);
    let maxRepay = 0;
    if (accountData) {
        const rawMaxRepay = Math.min(accountData.usdcBalanceBaseUnits, usdcWalletBalance);
        maxRepay = Number(baseUnitToUi(rawMaxRepay, DECIMALS_USDC));
    }

    useEffect(() => {
        const fetchUsdcWalletBalance = async () => {
            if (!wallet) return;
            const tokenAccount = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
            const balance = await connection.getTokenAccountBalance(tokenAccount);
            setUsdcWalletBalance(Number(balance.value.amount));
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
        const signature = await depositUsdc(wallet, connection, baseUnits, showError, showTxStatus);
        setAwaitingSign(false);

        if (signature) closeModal(signature);
    }

    return (
        <>
            <ModalDefaultContent
                title="Repay Loan with USDC"
                subtitle="Deposit USDC from your wallet to pay off your loan"
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
                {accountData &&
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