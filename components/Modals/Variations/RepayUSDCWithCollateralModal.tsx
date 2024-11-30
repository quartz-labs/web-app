import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_SOL, DECIMALS_USDC } from "@/utils/constants";
import { baseUnitToUi, uiToBaseUnit } from "@/utils/helpers";
import { repayUsdcWithSol } from "@/utils/instructions";
import { useTxStatus } from "@/context/tx-status-provider";
import { useQueryClient } from "@tanstack/react-query";
import styles from "../DefaultLayout/DefaultLayout.module.css";
import { Balance } from "@/interfaces/balance.interface";

interface RepayUSDCWithCollateralModalProps {
    balance?: Balance;
    solPriceUSD?: number;
    isValid: (amountBaseUnits: number, minAmountBaseUnits: number, maxAmountBaseUnits: number, minAmountUi: string, maxAmountUi: string) => string;
    closeModal: (signature?: string) => void;
}

export default function RepayUSDCWithCollateralModal({
    balance,
    solPriceUSD,
    isValid, 
    closeModal
} : RepayUSDCWithCollateralModalProps) {
    const { connection } = useConnection();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = uiToBaseUnit(Number(amountStr), DECIMALS_USDC).toNumber();
    const solEquivalent = Number(amountStr) / (solPriceUSD ?? 0);

    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ["drift-balance"], refetchType: "all" });
    queryClient.invalidateQueries({ queryKey: ["drift-withdraw-limit"], refetchType: "all" });
    queryClient.invalidateQueries({ queryKey: ["drift-rate"], refetchType: "all" });

    const MIN_AMOUNT_BASE_UNITS = 1;
    const maxAmountBaseUnits = balance?.usdc ?? 0;
    const maxAmountUi = baseUnitToUi(maxAmountBaseUnits, DECIMALS_USDC);
    const solBalanceUi = Number(baseUnitToUi(balance?.lamports ?? 0, DECIMALS_SOL));

    const handleConfirm = async () => {
        const error = isValid(
            amount, 
            MIN_AMOUNT_BASE_UNITS, 
            maxAmountBaseUnits, 
            baseUnitToUi(MIN_AMOUNT_BASE_UNITS, DECIMALS_USDC), 
            maxAmountUi
        );
        
        setErrorText(error);
        if (error || !wallet) return;

        setAwaitingSign(true);
        const signature = await repayUsdcWithSol(wallet, connection, amount, showError, showTxStatus);
        setAwaitingSign(false);

        if (signature) closeModal(signature);
    }

    return (
        <>
            <ModalDefaultContent
                title="Repay Loan with Collateral"
                subtitle="Repay your USDC loan using the SOL in your Quartz account"
                denomination="USDC"
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(maxAmountUi)}
                setHalfAmount={() => setAmountStr(baseUnitToUi(Math.trunc(maxAmountBaseUnits / 2), DECIMALS_USDC))}
            />

            
            <div className={styles.infoSectionWrapper}>
                {(balance != undefined) &&
                    <div className={`${styles.infoSection} ${styles.stretchWidth}`}>
                        {(solPriceUSD != undefined) &&
                            <div className={styles.infoValue}>
                                <p>SOL: {solEquivalent.toLocaleString('en-IE', { minimumFractionDigits: 0, maximumFractionDigits: 6 })}</p>
                            </div>
                        }

                        <div className={styles.infoRight}>
                            <p className="small-text light-text">USDC Loan: {maxAmountUi}</p>
                            <p className="small-text light-text">SOL balance: {solBalanceUi.toLocaleString('en-IE', { minimumFractionDigits: 0, maximumFractionDigits: 6 })}</p>
                        </div>
                    </div>
                }

                {errorText &&
                    <p className={styles.errorText}>{errorText}</p>
                } 
            </div>

            <ModalButtons 
                label="Repay" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={closeModal}
            />
        </>
    )
}