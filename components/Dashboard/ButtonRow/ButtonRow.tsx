import styles from "./ButtonRow.module.css";

export default function ButtonRow() {
    const handleAddFunds = () => {
        throw new Error("Not implemented");
    };

    const handleWithdraw = () => {
        throw new Error("Not implemented");
    };

    const handleRepayLoan = () => {
        throw new Error("Not implemented");
    };

    return (
        <div className={styles.buttonRow}>
            <button className={"glass-button"} onClick={handleAddFunds}>Add Funds</button>
            <button className={"glass-button"} onClick={handleWithdraw}>Withdraw</button>
            <button className={"glass-button ghost"} onClick={handleRepayLoan}>Repay Loan</button>
        </div>
    );
}