import styles from "./Transactions.module.css";
import TransactionCard from "./TransactionCard";
import type { CardTransactionData } from "@/src/types/interfaces/CardTransactionData.interface";

interface TransactionsProps {
    transactions: CardTransactionData[]
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
                    const isFirstOfDay = !lastDate || lastDate.setHours(0,0,0,0) !== new Date(transaction.data.spend.authorizedAt).setHours(0,0,0,0);
                    lastDate = new Date(transaction.data.spend.authorizedAt);

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