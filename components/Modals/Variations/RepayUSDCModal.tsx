import { useEffect, useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_USDC, MICRO_CENTS_PER_USDC, USDC_MINT } from "@/utils/constants";
import { baseUnitToUi, uiToBaseUnit } from "@/utils/helpers";
import { depositUsdc } from "@/utils/instructions";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { useTxStatus } from "@/context/tx-status-provider";

interface RepayUSDCModalProps {
    balanceUsdc?: number;
    isValid: (amountBaseUnits: number, minAmountBaseUnits: number, maxAmountBaseUnits: number, minAmountUi: string, maxAmountUi: string) => string;
    closeModal: (signature?: string) => void;
}

export default function RepayUSDCModal({
    balanceUsdc,
    isValid, 
    closeModal
} : RepayUSDCModalProps) {
    const { connection } = useConnection();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT_BASE_UNITS = 0.01 * MICRO_CENTS_PER_USDC;

    const [usdcWalletBalance, setUsdcWalletBalance] = useState(0);
    const maxAmountBaseUnits = (balanceUsdc) ? Math.min(balanceUsdc, usdcWalletBalance) : 0;

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
        const amountBaseUnits = uiToBaseUnit(amount, DECIMALS_USDC).toNumber();
        const error = isValid(
            amountBaseUnits, 
            MIN_AMOUNT_BASE_UNITS, 
            maxAmountBaseUnits, 
            baseUnitToUi(MIN_AMOUNT_BASE_UNITS, DECIMALS_USDC), 
            baseUnitToUi(maxAmountBaseUnits, DECIMALS_USDC)
        );
            
        setErrorText(error);
        if (error || !wallet) return;

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
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(baseUnitToUi(maxAmountBaseUnits, DECIMALS_USDC))}
                setHalfAmount={() => setAmountStr(baseUnitToUi(Math.trunc(maxAmountBaseUnits / 2), DECIMALS_USDC))}
            />

            <ModalInfoSection 
                maxAmountUi={
                    (balanceUsdc === undefined)
                        ? undefined
                        : Number(baseUnitToUi(maxAmountBaseUnits, DECIMALS_USDC))
                } 
                minDecimals={2} 
                errorText={errorText}
            >
                {balanceUsdc &&
                    <p>Loan remaining: {baseUnitToUi(balanceUsdc, DECIMALS_USDC)}</p>
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