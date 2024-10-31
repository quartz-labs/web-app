import { useCallback } from "react";
import styles from "./ModalWrapper.module.css";
import DepositSOLModal from "./Variations/DepositSOLModal";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import WithdrawSOLModal from "./Variations/WithdrawSOLModal";
import WithdrawUSDCModal from "./Variations/WithdrawUSDCModal";
import OfframpUSDModal from "./Variations/OfframpUSDModal";
import OfframpCompleteModal from "./Variations/OfframpCompleteModal";
import RepayUSDCModal from "./Variations/RepayUSDCModal";
import RepayUSDCWithCollateralModal from "./Variations/RepayUSDCWithCollateralModal";

export enum ModalVariation {
    DepositSOL,
    WithdrawSOL,
    WithdrawUSDC,
    OfframpUSD,
    OfframpComplete,
    RepayUSDC,
    RepayUSDCWithCollateral,
    Error
}

interface ModalProps{
    variation: ModalVariation;
    onClose: () => void;
}

export default function Modal(
    {variation, onClose} : ModalProps
) {
    const wallet = useAnchorWallet();

    const handleWrapperClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const isValid = (amount: number, minAmount: number, maxAmount: number) => {
        if (amount < minAmount) return "Minimum amount: " + minAmount;
        if (amount > maxAmount) return "Maximum amount: " + maxAmount;
        if (!wallet) return "Wallet not connected";
        
        return "";
    }

    // TODO - Make Error modal red and higher z index
    return (
        <div className={styles.modalWrapper} onClick={handleWrapperClick}>
            <div 
                className={`glass ${styles.modal}`}
                onClick={(e) => e.stopPropagation()}
            >
                {(() => {
                    switch (variation) {
                        case ModalVariation.DepositSOL:
                            return <DepositSOLModal />;
                            
                        case ModalVariation.WithdrawSOL:
                            return <WithdrawSOLModal />;

                        case ModalVariation.WithdrawUSDC:
                            return <WithdrawUSDCModal />;

                        case ModalVariation.OfframpUSD:
                            return <OfframpUSDModal />;

                        case ModalVariation.OfframpComplete:
                            return <OfframpCompleteModal />;

                        case ModalVariation.RepayUSDC:
                            return <RepayUSDCModal />;

                        case ModalVariation.RepayUSDCWithCollateral:
                            return <RepayUSDCWithCollateralModal />;

                        default:
                            return <></>;
                    }
                })()}
            </div>
        </div>
    )
}