import { useStore } from "@/src/utils/store";
import styles from "./Card.module.css";
import type { CardsForUserResponse } from "@/src/types/interfaces/CardUserResponse.interface";
import { useState } from "react";
import { fetchAndParse } from "@/src/utils/helpers";
import config from "@/src/config/config";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";

export default function Card() {
    const { setModalVariation, userFromDb, jwtToken, setCardDetails, cardDetails } = useStore();
    const [showDetails, setShowDetails] = useState(false);

    const createCard = async () => {
        // if user has no cards, kyc is approved.
        const createCardResponse: CardsForUserResponse = await fetchAndParse(
            `${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/issuing/create`,
            {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userFromDb?.card_api_user_id,
                    type: "virtual",
                    frequency: "allTime",
                    amountLimit: "0"
                }),
            }
        );

        setCardDetails(cardDetails ? [...cardDetails, createCardResponse] : [createCardResponse]);
        console.log(createCardResponse);
    }

    if (cardDetails !== undefined && cardDetails.length > 0) {
        return (
            <div className={styles.cardsContainer}>
                {cardDetails.map((card: CardsForUserResponse) => (
                    <div key={card.id} className={styles.cardWrapper}>
                        <div>
                            <div>Status: {card.status}</div>
                            <div>Limit: {card.limit.amount} per {card.limit.frequency}</div>
                            <div>Balance: $?</div>
                        </div>

                        {!showDetails && (
                            <button
                                className={styles.cardDetails}
                                onClick={() => setShowDetails(true)}
                            >  
                                <div className={styles.cardNumber}>**** **** **** {card.last4}</div>
                                <div>Expires: {card.expirationMonth}/{card.expirationYear}</div>
                            </button>
                        )}

                        {showDetails && (
                            <div className={styles.cardDetails}>
                                <div className={styles.cardNumber}>1234 5678 9012 3456</div>
                                <div className={styles.cardDetailsRow}>
                                    <div>Expires: {card.expirationMonth}/{card.expirationYear}</div>
                                    <div>CVC: 123</div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={styles.cardsContainer}>
            {!userFromDb?.auth_level && (
                <button
                    className={`glass-button ${styles.mainButton}`}
                    onClick={() => setModalVariation(ModalVariation.CARD_SIGNUP)}
                >
                    Sign up for Quartz Card ✨
                </button>
            )}

            {userFromDb?.auth_level === "Base" && (
                <button
                    className={`glass-button ${styles.mainButton}`}
                    onClick={() => setModalVariation(ModalVariation.CARD_KYC)}
                >
                    KYC for Quartz Card
                </button>
            )}

            {userFromDb?.auth_level === "Card" &&
                <button
                    className={`glass-button ${styles.mainButton}`}
                    onClick={createCard}
                >
                    Create Card
                </button>
            }
        </div>
    )
}