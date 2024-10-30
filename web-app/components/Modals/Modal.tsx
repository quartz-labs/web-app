import { useCallback } from "react";
import styles from "./ModalWrapper.module.css";
import DepositSOLModal from "./DepositSOLModal/DepositSOLModal";

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
    const handleWrapperClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);


    // TODO - Make Error modal red
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