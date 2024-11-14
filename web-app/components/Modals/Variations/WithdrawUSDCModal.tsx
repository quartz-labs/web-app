import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_USDC, MICRO_CENTS_PER_USDC } from "@/utils/constants";
import { baseUnitToUi, uiToBaseUnit } from "@/utils/helpers";
import { withdrawUsdc } from "@/utils/instructions";
import { AccountData } from "@/utils/accountData";
import { useTxStatus } from "@/context/tx-status-provider";

interface WithdrawUSDCModalProps {
    accountData: AccountData | undefined;
    isValid: (amountBaseUnits: number, minAmountBaseUnits: number, maxAmountBaseUnits: number, minAmountUi: string, maxAmountUi: string) => string;
    closeModal: (signature?: string) => void;
}

export default function WithdrawUSDCModal(
    {accountData, isValid, closeModal} : WithdrawUSDCModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT_BASE_UNITS = 0.01 * MICRO_CENTS_PER_USDC;
    const maxAmountBaseUnits = (accountData) ? accountData.usdcWithdrawLimitBaseUnits : 0;

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
        const signature = await withdrawUsdc(wallet, connection, baseUnits, showError, showTxStatus);
        setAwaitingSign(false);

        if (signature) closeModal(signature);
    }

    return (
        <>
            <ModalDefaultContent
                title="Withdraw USDC"
                denomination="USDC"
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(baseUnitToUi(maxAmountBaseUnits, DECIMALS_USDC))}
                setHalfAmount={() => setAmountStr(baseUnitToUi(Math.trunc(maxAmountBaseUnits / 2), DECIMALS_USDC))}
            />

            <ModalInfoSection 
                maxAmountUi={Number(baseUnitToUi(maxAmountBaseUnits, DECIMALS_USDC))} 
                minDecimals={2} 
                errorText={errorText}
            >
                <p>
                    ${amount.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {accountData &&
                        <span className="tiny-text">({(accountData.usdcRate * 100).toFixed(4)}% APR)</span>
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