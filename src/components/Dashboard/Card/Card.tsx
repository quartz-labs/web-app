import { useStore } from "@/src/utils/store";
import styles from "./Card.module.css";
import Image from "next/image";
import CopyText from "./CopyText";

interface CardDetails {
    cvc: string | null;
    pan: string | null;
}

export default function Card({ cvc, pan }: CardDetails) {
    const { cardDetails, jwtToken } = useStore();

    if (!cardDetails || !jwtToken) {
        return (
            <div className={styles.card}>
                <Image 
                    className={styles.visaLogo}
                    src="/visa.svg"
                    alt="Visa"
                    width={77}
                    height={25}
                />
                <div className={styles.detail}>
                    <p className={styles.label}>Virtual Card</p>
                    <p>•••• ••••</p>
                </div>
            </div>
        );
    }

    if (!pan || !cvc) {
        return (
            <div className={styles.card}>
                <Image 
                    className={styles.visaLogo}
                    src="/visa.svg"
                    alt="Visa"
                    width={77}
                    height={25}
                />
                <div className={styles.detail}>
                    <p className={styles.label}>Virtual Card</p>
                    <p>•••• {cardDetails.last4}</p>
                </div>
            </div>
        );
    }

    const expiryYear = cardDetails.expiration_year.toString().slice(-2);
    const expiryMonth = cardDetails.expiration_month.toString().padStart(2, '0');
    return (
        <div className={styles.card}>
            <Image 
                className={styles.visaLogo}
                src="/visa.svg"
                alt="Visa"
                width={77}
                height={25}
            />
            <div className={styles.cardNumber}>
                <p className={styles.label}>Card Number</p>
                <CopyText text={pan} />
            </div>
            <div className={styles.cardDetails}>
                <div className={styles.detail}>
                    <p className={styles.label}>Expiry</p>
                    <CopyText text={`${expiryMonth}/${expiryYear}`} />
                </div>
                <div className={styles.detail}>
                    <p className={styles.label}>CVC</p>
                    <CopyText text={cvc} />
                </div>
            </div>
        </div>
    );
}