import styles from "./TransactionHistory.module.css";
import TransactionCard from "./TransactionCard";
import type { ProviderCardHistory } from "@/src/types/interfaces/ProviderCardHistory.interface";

interface TransactionsProps {
    transactions: ProviderCardHistory[]
}

export default function TransactionHistory({transactions} : TransactionsProps) {
    let lastDate: Date | null = null;
    return (
        <div className={`glass ${styles["transactions"]}`}>
            <h2 className={styles["heading"]}>Transactions</h2>
            <ul className={styles["transactions-content"]}>
                {transactions.map((transaction, index) => {
                    const isFirstOfDay = !lastDate || lastDate.setHours(0,0,0,0) !== new Date(transaction.spend.authorizedAt).setHours(0,0,0,0);
                    lastDate = new Date(transaction.spend.authorizedAt);

                    return (
                        <TransactionCard
                            key={index}
                            transaction={transaction}
                            dateLabelled={isFirstOfDay}
                        />
                    );
                })}
            </ul>
        </div>
    )
}