import React from "react";
import styles from "./DefaultLayout.module.css";
import { useQueryClient } from "@tanstack/react-query";

interface ModalInfoSection {
    maxAmountUi?: number;
    minDecimals: number;
    errorText: string;
    children: React.ReactNode;
}

export default function ModalInfoSection({maxAmountUi, minDecimals, errorText, children} : ModalInfoSection) {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ["drift-balance"], refetchType: "all" });
    queryClient.invalidateQueries({ queryKey: ["drift-withdraw-limit"], refetchType: "all" });
    queryClient.invalidateQueries({ queryKey: ["drift-rate"], refetchType: "all" });
    
    return (
        <div className={styles.infoSectionWrapper}>
            <div className={`${styles.infoSection} ${styles.stretchWidth}`}>
                <div className={styles.infoValue}>
                    {children}
                </div>

                {(maxAmountUi !== undefined) &&
                    <p className="small-text light-text">Available: {maxAmountUi.toLocaleString('en-IE', { minimumFractionDigits: minDecimals, maximumFractionDigits: 6 })}</p>
                }
            </div>

            {errorText &&
                <p className={styles.errorText}>{errorText}</p>
            } 
        </div>
    )
}