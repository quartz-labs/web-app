import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { baseUnitToUi, uiToBaseUnit } from "@/utils/helpers";
import { AccountData } from "@/utils/accountData";
import { DECIMALS_USDC, MICRO_CENTS_PER_USDC } from "@/utils/constants";

interface OfframpUSDModalProps {
    accountData: AccountData | undefined,
    isValid: (amountBaseUnits: number, minAmountBaseUnits: number, maxAmountBaseUnits: number, minAmountUi: string, maxAmountUi: string) => string;
    closeModal: (signature?: string) => void;
}

export default function OfframpUSDModal(
    {accountData, isValid, closeModal} : OfframpUSDModalProps
) {
    const awaitingSign = false;
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT_BASE_UNITS = 31 * MICRO_CENTS_PER_USDC;
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
        
        if (error) {
            setErrorText(error);
            return
        };

        throw new Error("Off-ramp not implemented");
    }

    return (
        <>
            <ModalDefaultContent
                title="Off-ramp USD"
                denomination="USD"
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
                {accountData &&
                    <p>({(accountData.usdcRate * 100).toFixed(4)}% APR)</p>
                }
            </ModalInfoSection>

            <ModalButtons 
                label="Off-ramp" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={closeModal}
            />
        </>
    )
}