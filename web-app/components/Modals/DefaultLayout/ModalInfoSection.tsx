import React from "react";
import styles from "./DefaultLayout.module.css";

interface ModalInfoSection {
    maxAmount: number;
    minDecimals: number;
    errorText: string;
    setAmount: (amount: number) => void;
    children: React.ReactNode;
}

export default function ModalInfoSection({maxAmount, minDecimals, errorText, children} : ModalInfoSection) {
    return (
        <div className={styles.infoSectionWrapper}>
            <div className={`${styles.infoSection} ${styles.stretchWidth}`}>
                <div className={styles.infoValue}>
                    {children}
                </div>

                <p className="small-text light-text">Available: {maxAmount.toLocaleString('en-IE', { minimumFractionDigits: minDecimals, maximumFractionDigits: 6 })}</p>
            </div>

            {errorText &&
                <p className={styles.errorText}>{errorText}</p>
            } 
        </div>
    )
}