import Image from "next/image";
import styles from "./TransactionCard.module.css"
//import CurrencyInfo from "./CurrencyInfo";
import { useEffect, useRef, useState } from "react";
import type { CardTransaction } from "@/src/types/CardTransaction.interface";

interface TransactionCardProps {
    transaction: CardTransaction;
    dateLabelled: boolean;
}

export default function TransactionCard({ transaction, dateLabelled }: TransactionCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const detailsRef = useRef<HTMLDivElement>(null);

    // Formatted date/time strings
    const timeObj = new Date(transaction.authorized_at);
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


    const merchantImage = transaction.enriched_merchant_icon;
    const defaultMerchantIcon = "/dollar.svg";

    // Formatted date label
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let dateLabel = formattedDate;
    if (timeObj.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) dateLabel = "Today";
    else if (timeObj.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0)) dateLabel = "Yesterday";


    //const inputTokenIcon = "/tokens/sol.jpg"; // TODO - Remove hardcoding

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

    return (
        <li className={styles["transaction-card-wrapper"]}>
            {dateLabelled &&
                <div className={styles["date-label"]}>
                    <small className="light">{dateLabel}</small>
                </div>
            }
            <div className={`glass ${styles["transaction-card"]}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`glass ${styles["card-base"]} ${isOpen && styles["selected"]}`}
                >
                    <div className={styles["currencies"]}>
                        <Image
                            src={merchantImage || defaultMerchantIcon}
                            alt="Merchant Icon"
                            height={19}
                            width={19}
                            className={styles["merchant-icon"]}
                        />
                    </div>
                    <div className={styles["basic-info"]}>
                        {/* <p className="light">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</p> <p>${transaction.spend.amount / 100}</p> */}
                        <p>${transaction.amount / 100}</p>
                        {/* <TransactionStatus status={transaction.spend.status} /> */}
                        <p>{formattedTime}</p>
                    </div>
                </button>

                <div ref={detailsRef} className={`${styles["card-details"]} ${isOpen && styles["open"]}`}>
                    <p className="light">Spent</p> <p>${transaction.amount / 100}</p>
                    <p className="light">At</p> <p>{transaction.enriched_merchant_name}</p>
                    <p className="light">Created on</p> <p>{formattedDateTime}</p>
                </div>
            </div>
        </li>
    )
}