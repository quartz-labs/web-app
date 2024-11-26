import { useCallback } from "react";
import styles from "./Modal.module.css";
import DepositSOLModal from "./Variations/DepositSOLModal";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import WithdrawSOLModal from "./Variations/WithdrawSOLModal";
import WithdrawUSDCModal from "./Variations/WithdrawUSDCModal";
import OfframpUSDModal from "./Variations/OfframpUSDModal";
import OfframpCompleteModal from "./Variations/OfframpCompleteModal";
import RepayUSDCModal from "./Variations/RepayUSDCModal";
import RepayUSDCWithCollateralModal from "./Variations/RepayUSDCWithCollateralModal";
import TelegramModal from "./Variations/TelegramModal";
import CloseAccountModal from "./Variations/CloseAccountModal";
import { Balance } from "@/interfaces/balance.interface";

export enum ModalVariation {
    Disabled,
    DepositSOL,
    WithdrawSOL,
    WithdrawUSDC,
    OfframpUSD,
    OfframpComplete,
    RepayUSDC,
    RepayUSDCWithCollateral,
    Telegram,
    CloseAccount
}

interface ModalProps{
    variation: ModalVariation;
    solPriceUSD?: number;
    balance?: Balance;
    rates?: Balance;
    withdrawLimits?: Balance;
    onClose: (signature?: string, accountClosed?: boolean) => void;
}

export default function Modal({
    variation, 
    solPriceUSD, 
    balance,
    rates,
    withdrawLimits, 
    onClose
} : ModalProps) {
    const wallet = useAnchorWallet();

    const handleWrapperClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const isValid = (
        amountBaseUnits: number, 
        minAmountBaseUnits: number, 
        maxAmountBaseUnits: number, 
        minAmountUi: string,
        maxAmountUi: string
    ) => {
        if (isNaN(amountBaseUnits)) return "Invalid input";
        if (amountBaseUnits < minAmountBaseUnits) return "Minimum amount: " + minAmountUi;
        if (amountBaseUnits > maxAmountBaseUnits) return "Maximum amount: " + maxAmountUi;
        if (!wallet) return "Wallet not connected";
        
        return "";
    }

    if (variation === ModalVariation.Disabled) return (<></>);
    return (
        <div className={styles.modalWrapper} onClick={handleWrapperClick}>
            <div 
                className={`glass ${styles.modal} ${variation === ModalVariation.CloseAccount ? styles.errorModal : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                {(() => {
                    switch (variation) {
                        case ModalVariation.DepositSOL:
                            return <DepositSOLModal
                                solPriceUSD={solPriceUSD}
                                solRate={rates?.lamports}
                                isValid={isValid} 
                                closeModal={onClose}
                            />;
                            
                        case ModalVariation.WithdrawSOL:
                            return <WithdrawSOLModal 
                                solPriceUSD={solPriceUSD}
                                withdrawLimitsSol={withdrawLimits?.lamports}
                                isValid={isValid}
                                closeModal={onClose}
                            />;

                        case ModalVariation.WithdrawUSDC:
                            return <WithdrawUSDCModal 
                                withdrawLimitsUsdc={withdrawLimits?.usdc}
                                usdcRate={rates?.usdc}
                                isValid={isValid}
                                closeModal={onClose}
                            />;

                        case ModalVariation.OfframpUSD:
                            return <OfframpUSDModal 
                                withdrawLimitsUsdc={withdrawLimits?.usdc}
                                usdcRate={rates?.usdc}
                                isValid={isValid}
                                closeModal={onClose}
                            />;

                        case ModalVariation.OfframpComplete:
                            return <OfframpCompleteModal 
                                closeModal={onClose}
                                url={""}
                            />;

                        case ModalVariation.RepayUSDC:
                            return <RepayUSDCModal
                                balanceUsdc={balance?.usdc}
                                isValid={isValid}
                                closeModal={onClose}
                            />;

                        case ModalVariation.RepayUSDCWithCollateral:
                            return <RepayUSDCWithCollateralModal
                                balanceUsdc={balance?.usdc} 
                                isValid={isValid}
                                closeModal={onClose}
                            />;

                        case ModalVariation.Telegram:
                            return <TelegramModal
                                closeModal={onClose}
                            />

                        case ModalVariation.CloseAccount:
                            return <CloseAccountModal
                                closeModal={onClose}
                            />

                        default:
                            return <></>;
                    }
                })()}
            </div>
        </div>
    )
}