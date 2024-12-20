import { useStore } from "@/src/utils/store";
import styles from "./ButtonRow.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";

export default function ButtonRow() {
    const { setModalVariation, balances } = useStore();
    const hasLoan = balances ? Object.values(balances).some(balance => balance < 0) : false;

    return (
        <div className={styles.buttonRow}>
            <button 
                className={"glass-button"} 
                onClick={() => setModalVariation(ModalVariation.ADD_FUNDS)}
            >
                Add Funds
            </button>

            <button 
                className={"glass-button"} 
                onClick={() => setModalVariation(ModalVariation.WITHDRAW)}
            >
                Withdraw
            </button>

            {hasLoan && (
                <button 
                    className={"glass-button ghost"} 
                    onClick={() => setModalVariation(ModalVariation.REPAY_LOAN)}
                >
                    Repay Loan
                </button>
            )}
        </div>
    );
}