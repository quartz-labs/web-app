import { useStore } from "@/src/utils/store";
import styles from "./Card.module.css";
import type { CardsForUserResponse } from "@/src/types/interfaces/CardUserResponse.interface";
import { useState } from "react";

export default function Card() {
    const { cardDetails } = useStore();
    const [showDetails, setShowDetails] = useState(false);

    if (cardDetails !== undefined && cardDetails.length > 0) {
        return cardDetails.map((card: CardsForUserResponse) => (
            <div key={card.id} className={styles.cardWrapper}>
                <div>
                    <div>Status: {card.status}</div>
                    <div>Limit: {card.limit.amount} per {card.limit.frequency}</div>
                </div>

                {!showDetails && (
                    <button
                        className={styles.cardDetails}
                        onClick={() => setShowDetails(true)}
                >  
                    <div>**** **** **** {card.last4}</div>
                        <div>Expires: {card.expirationMonth}/{card.expirationYear}</div>
                    </button>
                )}

                {showDetails && (
                    <div className={styles.cardDetails}>
                        <div>1234 5678 9012 3456</div>
                        <div className={styles.cardDetailsRow}>
                            <div>Expires: {card.expirationMonth}/{card.expirationYear}</div>
                            <div>CVC: 123</div>
                        </div>
                    </div>
                )}
            </div>
            
        ))
    }
    return <></>
}