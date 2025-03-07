import styles from "./TransactionHistory.module.css";
import TransactionCard from "./TransactionCard";
import type { CardTransaction } from "@/src/types/CardTransaction.interface";

interface TransactionsProps {
    transactions: CardTransaction[]
}

export default function TransactionHistory({transactions} : TransactionsProps) {
    let lastDate: Date | null = null;
    return (
        <div className={`${styles["transactions"]}`}>
            <h2 className={styles.title}>Card Transactions</h2>
            <ul className={styles["transactions-content"]}>
                {transactions.map((transaction, index) => {
                    const isFirstOfDay = !lastDate || lastDate.setHours(0,0,0,0) !== new Date(transaction.authorized_at).setHours(0,0,0,0);
                    lastDate = new Date(transaction.authorized_at);

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