import styles from "./Transactions.module.css";
import TransactionCard from "./TransactionCard";
import type { CardTransaction } from "@/src/types/CardTransaction.interface";

interface TransactionsProps {
    transactions: CardTransaction[]
}

export default function TransactionHistory({transactions} : TransactionsProps) {
    let lastDate: Date | null = null;

    if (transactions.length === 0) {
        return (<></>);
    }

    return (
        <div className={styles.transactionListWrapper}>
            <h2 className={styles.title}>Card Transactions</h2>
            <ul className={styles.transactionList}>
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