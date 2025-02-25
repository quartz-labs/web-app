import styles from "./TransactionStatus.module.css";
import type { CardTransactionStatus } from "@/src/types/interfaces/ProviderCardHistory.interface";

interface TransactionStatusProps {
    status: CardTransactionStatus;
}

export default function TransactionStatus({status} : TransactionStatusProps) {
    const completed = "Completed";
    const pending = "Pending";
    const declined = "Declined";
    const reversed = "Reversed";

    if (status === "completed") return ( <p className={styles["success"]}>{completed}</p> )
    if (status === "pending") return ( <p className={styles["processing"]}>{pending}</p> )
    if (status === "declined") return ( <p className={styles["fail"]}>{declined}</p> )
    if (status === "reversed") return ( <p className={styles["loading"]}>{reversed}</p>)
    else throw new TypeError("Invalid status");
}