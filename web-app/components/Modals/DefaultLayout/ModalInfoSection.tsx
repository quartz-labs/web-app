import React from "react";
import styles from "./DefaultLayout.module.css";

interface ModalInfoSection {
    maxAmount: number;
    errorText: string;
    setAmount: (amount: number) => void;
    children: React.ReactNode;
}

export default function ModalInfoSection({maxAmount, errorText, setAmount, children} : ModalInfoSection) {
    return (
        <div className={styles.infoSection}>
            <div className={styles.infoValue}>
                {children}
            </div>

            <div className={styles.infoBalances}>
                <p className="small-text light-text">Available: {maxAmount}</p>
                <button className={`glass-button ghost ${styles.balanceButton}`} onClick={() => setAmount(maxAmount / 2)}>
                    Half
                </button>
                <button className={`glass-button ghost ${styles.balanceButton}`} onClick={() => setAmount(maxAmount)}>
                    Max
                </button>
            </div>
            
            {errorText &&
                <p className={styles.errorText}>{errorText}</p>
            }  
        </div>
    )
}