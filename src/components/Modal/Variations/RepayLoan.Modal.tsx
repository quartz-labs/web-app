import { useState } from "react";
import RepayWithCollateral from "../RepayLoan/RepayWithCollateral";
import RepayWithWallet from "../RepayLoan/RepayWithWallet";
import styles from "../Modal.module.css";

export default function RepayLoanModal() {
    const [collateralRepaySelected, setCollateralRepaySelected] = useState(false);
    
    return (
        <>
            <div className={styles.repaySelectButtonRow}>
                <button 
                    onClick={() => setCollateralRepaySelected(false)}
                    className={`glass-button ${styles.repaySelectButtonLeft} ${collateralRepaySelected ? styles.repaySelectButtonInactive : ""}`}
                >
                    Repay from Wallet
                </button>
                <button 
                    onClick={() => setCollateralRepaySelected(true)}
                    className={`glass-button ${styles.repaySelectButtonRight} ${!collateralRepaySelected ? styles.repaySelectButtonInactive : ""}`}
                >
                    Repay with Collateral
                </button>
            </div>

            <div className={`glass ${styles.repayInnerModal}`}>
                {collateralRepaySelected && <RepayWithCollateral />}
                {!collateralRepaySelected && <RepayWithWallet />}
            </div>
        </>
    )
}