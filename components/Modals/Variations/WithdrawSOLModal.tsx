import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_SOL } from "@/utils/constants";
import { withdrawLamports } from "@/utils/instructions";
import { useTxStatus } from "@/context/tx-status-provider";
import { uiToBaseUnit } from "@/utils/helpers";
import { baseUnitToUi } from "@/utils/helpers";

interface WithdrawSOLModalProps {
    solPriceUSD?: number;
    withdrawLimitsSol?: number;
    isValid: (amountBaseUnits: number, minAmountBaseUnits: number, maxAmountBaseUnits: number, minAmountUi: string, maxAmountUi: string) => string;
    closeModal: (signature?: string) => void;
}

export default function WithdrawSOLModal({
    solPriceUSD, 
    withdrawLimitsSol, 
    isValid, 
    closeModal
} : WithdrawSOLModalProps) {
    const { connection } = useConnection();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = uiToBaseUnit(Number(amountStr), DECIMALS_SOL).toNumber();

    const MIN_AMOUNT_BASE_UNITS = 1;
    const maxAmountBaseUnits = withdrawLimitsSol ?? 0;
    
    const handleConfirm = async () => {
        console.log("amountStr", amountStr);
        console.log("amount", amount);
        const error = isValid(
            amount, 
            MIN_AMOUNT_BASE_UNITS, 
            maxAmountBaseUnits, 
            baseUnitToUi(MIN_AMOUNT_BASE_UNITS, DECIMALS_SOL), 
            baseUnitToUi(maxAmountBaseUnits, DECIMALS_SOL)
        );
        
        setErrorText(error);
        if (error || !wallet) return;

        setAwaitingSign(true);
        const signature = await withdrawLamports(wallet, connection, amount, showError, showTxStatus);
        setAwaitingSign(false);

        if (signature) closeModal(signature);
    }

    return (
        <>
            <ModalDefaultContent
                title="Withdraw SOL"
                denomination="SOL"
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(baseUnitToUi(maxAmountBaseUnits, DECIMALS_SOL))}
                setHalfAmount={() => setAmountStr(baseUnitToUi(Math.trunc(maxAmountBaseUnits / 2), DECIMALS_SOL))}
            />

            <ModalInfoSection 
                maxAmountUi={Number(baseUnitToUi(maxAmountBaseUnits, DECIMALS_SOL))} 
                minDecimals={0} 
                errorText={errorText}
            >
                {(solPriceUSD !== undefined) &&
                    <p>${(solPriceUSD * Number(amountStr)).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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