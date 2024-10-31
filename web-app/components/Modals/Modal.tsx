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
import { BalanceInfo } from "@/utils/balance";

export enum ModalVariation {
    Disabled,
    DepositSOL,
    WithdrawSOL,
    WithdrawUSDC,
    OfframpUSD,
    OfframpComplete,
    RepayUSDC,
    RepayUSDCWithCollateral
}

interface ModalProps{
    variation: ModalVariation;
    balanceInfo: BalanceInfo;
    solApy: number | null;
    usdcApr: number | null;
    onClose: (signature?: string) => void;
}

export default function Modal(
    {variation, balanceInfo, solApy, usdcApr, onClose} : ModalProps
) {
    const wallet = useAnchorWallet();

    const handleWrapperClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const isValid = (amount: number, minAmount: number, maxAmount: number) => {
        if (isNaN(amount)) return "Invalid input";
        if (amount < minAmount) return "Minimum amount: " + minAmount;
        if (amount > maxAmount) return "Maximum amount: " + maxAmount;
        if (!wallet) return "Wallet not connected";
        
        return "";
    }

    if (variation === ModalVariation.Disabled) return (<></>);
    return (
        <div className={styles.modalWrapper} onClick={handleWrapperClick}>
            <div 
                className={`glass ${styles.modal}`}
                onClick={(e) => e.stopPropagation()}
            >
                {(() => {
                    switch (variation) {
                        case ModalVariation.DepositSOL:
                            return <DepositSOLModal
                                balanceInfo={balanceInfo}
                                isValid={isValid} 
                                closeModal={onClose}
                                apy={solApy} 
                            />;
                            
                        case ModalVariation.WithdrawSOL:
                            return <WithdrawSOLModal 
                                balanceInfo={balanceInfo}
                                isValid={isValid}
                                closeModal={onClose}
                            />;

                        case ModalVariation.WithdrawUSDC:
                            return <WithdrawUSDCModal 
                                balanceInfo={balanceInfo}
                                isValid={isValid}
                                closeModal={onClose}
                                apr={usdcApr}
                            />;

                        case ModalVariation.OfframpUSD:
                            return <OfframpUSDModal 
                                balanceInfo={balanceInfo}
                                isValid={isValid}
                                closeModal={onClose}
                                apr={usdcApr}
                            />;

                        case ModalVariation.OfframpComplete:
                            return <OfframpCompleteModal 
                                closeModal={onClose}
                                url={""}
                            />;

                        case ModalVariation.RepayUSDC:
                            return <RepayUSDCModal
                                balanceInfo={balanceInfo}
                                isValid={isValid}
                                closeModal={onClose}
                            />;

                        case ModalVariation.RepayUSDCWithCollateral:
                            return <RepayUSDCWithCollateralModal
                                balanceInfo={balanceInfo}
                                isValid={isValid}
                                closeModal={onClose}
                            />;

                        default:
                            return <></>;
                    }
                })()}
            </div>
        </div>
    )
}