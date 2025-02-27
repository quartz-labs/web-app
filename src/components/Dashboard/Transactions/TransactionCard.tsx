import Image from "next/image";
import styles from "./Transactions.module.css"
import { useEffect, useRef, useState } from "react";
import type { CardTransactionData } from "@/src/types/interfaces/CardTransactionData.interface";

interface TransactionCardProps {
    transaction: CardTransactionData;
    dateLabelled: boolean;
}

export default function TransactionCard({ transaction, dateLabelled }: TransactionCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const detailsRef = useRef<HTMLDivElement>(null);

    // Formatted date/time strings
    const timeObj = new Date(transaction.data.spend.authorizedAt);
    const formattedDate = timeObj.toLocaleDateString("en-IE", {
        month: "long",
        day: "numeric"
    });
    const formattedTime = timeObj.toLocaleTimeString("en-IE", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    const formattedDateTime = `${formattedDate}, ${formattedTime}`;


    const merchantImage = transaction.data.spend.enrichedMerchantIcon;
    const defaultMerchantIcon = "/dollar.svg";

    // Formatted date label
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let dateLabel = formattedDate;
    if (timeObj.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) dateLabel = "Today";
    else if (timeObj.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0)) dateLabel = "Yesterday";


    // Handle opening and closing transaction details
    const PADDING_VERTICLE = 20;
    const PADDING_HORIZONTAL = 20;
    useEffect(() => {
        if (detailsRef.current) {
            if (isOpen) {
                detailsRef.current.style.maxHeight = `${detailsRef.current.scrollHeight + (PADDING_VERTICLE * 2)}px`;
                detailsRef.current.style.padding = `${PADDING_VERTICLE}px ${PADDING_HORIZONTAL}px`;
            } else {
                detailsRef.current.style.maxHeight = '0px';
                detailsRef.current.style.padding = `0px ${PADDING_HORIZONTAL}px`;
            }
        }
    }, [isOpen]);

    const declined = transaction.data.spend.status === "declined" || transaction.declinedReason != null;
    const localAmount = (transaction.data.spend.localAmount ?? transaction.data.spend.amount) / 100;
    const currency = (transaction.data.spend.localCurrency ?? transaction.data.spend.currency).toUpperCase();

    const formattedTransactionHash = transaction.transactionHash
        ? transaction.transactionHash.slice(0, 4) + "..." + transaction.transactionHash.slice(-4)
        : null;
    const transactionLink = transaction.transactionHash ? `https://solscan.io/tx/${transaction.transactionHash}` : null;

    return (
        <li className={styles.transactionCardWrapper}>
            {dateLabelled &&
                <div className={styles.dateLabel}>
                    <p className="small-text light-text">{dateLabel}</p>
                </div>
            }
            <div className={`glass ${styles.transactionCard}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`glass ${styles.cardBase} ${isOpen && styles.selected} ${declined && styles.declined}`}
                >
                    <div className={styles.vendor}>
                        <Image
                            src={merchantImage || defaultMerchantIcon}
                            alt="Merchant Icon"
                            height={34}
                            width={34}
                            className={styles.vendorLogo}
                        />
                        {declined &&
                            <p>Declined</p>
                        }
                        {!declined &&
                            <p>{transaction.data.spend.enrichedMerchantName}</p>
                        }
                    </div>
                    <p>${transaction.data.spend.amount / 100}</p>
                </button>

                <div ref={detailsRef} className={`${styles.transactionDetails} ${isOpen && styles.open}`}>
                    <div className={styles.transactionDetailsRow}>
                        <p className="light">Amount:</p> 
                        <p>{localAmount} {currency}</p>
                    </div>
                    <div className={styles.transactionDetailsRow}>
                        <p className="light">Time:</p> 
                        <p>{formattedDateTime}</p>
                    </div>
                    {!declined && transaction.transactionHash &&
                        <div className={styles.transactionDetailsRow}>
                            <p className="light">On-Chain Transaction:</p> 
                            {transactionLink &&
                                <a href={transactionLink} target="_blank" rel="noopener noreferrer">{formattedTransactionHash}</a>
                            }
                        </div>
                    }
                    {declined && transaction.declinedReason &&
                        <div className={styles.transactionDetailsRow}>
                            <p className="light">Reason:</p> 
                            <p>{transaction.declinedReason}</p>
                        </div>
                    }
                </div>
            </div>
        </li>
    )
}