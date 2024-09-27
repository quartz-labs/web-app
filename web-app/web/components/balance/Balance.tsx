import styles from "./Balance.module.css";

interface BalanceProps {
    breakdownView: Boolean;
}

export default function Balance({breakdownView}: BalanceProps) {
    
    
    if (breakdownView) {
        return (
            <div className={styles.balanceWrapper}>

            </div>
        )
    } 
    else {
        return (
            <div className={styles.balanceWrapper}>

            </div>
        )
    }
    
}