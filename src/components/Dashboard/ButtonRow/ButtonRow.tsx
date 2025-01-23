import { useStore } from "@/src/utils/store";
import styles from "./ButtonRow.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";

export default function ButtonRow() {
    const { setModalVariation, balances } = useStore();
    const hasLoan = balances ? Object.values(balances).some(balance => balance < 0) : false;

    return (
        <div className={styles.buttonRow}>
            <button 
                className={`glass-button ${styles.mainButton}`} 
                onClick={() => setModalVariation(ModalVariation.ADD_FUNDS)}
            >
                Add Funds
            </button>

            <button 
                className={`glass-button ${styles.mainButton}`} 
                onClick={() => setModalVariation(ModalVariation.WITHDRAW)}
            >
                Withdraw
            </button>

            <button 
                className={`glass-button ${styles.mainButton}`} 
                onClick={() => setModalVariation(ModalVariation.BORROW)}
            >
                Borrow
            </button>

            {hasLoan && (
                <button 
                    className={`glass-button ghost ${styles.mainButton}`} 
                    onClick={() => setModalVariation(ModalVariation.REPAY_LOAN)}
                >
                    Repay Loan
                </button>
            )}
        </div>
    );
}