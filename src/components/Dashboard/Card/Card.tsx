import { useStore } from "@/src/utils/store";
import styles from "./Card.module.css";
import type { CardsForUserResponse } from "@/src/types/interfaces/CardUserResponse.interface";
import { useState } from "react";
import { fetchAndParse } from "@/src/utils/helpers";
import config from "@/src/config/config";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { TailSpin } from "react-loader-spinner";

export default function Card() {
    const { 
        setModalVariation, 
        quartzCardUser, 
        jwtToken, 
        setCardDetails, 
        cardDetails 
    } = useStore();
    const [showDetails, setShowDetails] = useState(false);

    const [cardPan, setCardPan] = useState<string[] | null>(null);
    const [cardCvc, setCardCvc] = useState<string[] | null>(null);

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
                    id: quartzCardUser?.card_api_user_id,
                    type: "virtual",
                    frequency: "allTime",
                    amountLimit: "0"
                }),
            }
        );

        setCardDetails(cardDetails ? [...cardDetails, createCardResponse] : [createCardResponse]);
        console.log(createCardResponse);
    }

    const getCardDetails = async (cardId: string) => {
        const response = await fetchAndParse(`/api/card-details?id=${cardId}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jwtToken
            })
        });
        setCardPan([response.pan]);
        setCardCvc([response.cvc]);
        setShowDetails(true);
    }

    if (cardDetails !== undefined && cardDetails.length > 0) {
        return (
            <div className={styles.cardsContainer}>
                {cardDetails.map((card: CardsForUserResponse) => (
                    <div key={card.id} className={styles.cardWrapper}>
                        <div>
                            <div>Status: {card.status}</div>
                            <div>Limit: ${card.limit?.amount / 100 || '0.00'} per {card.limit?.frequency || 'allTime'}</div>
                            <div>Balance: $?</div>
                        </div>

                        {!showDetails && (
                            <button
                                className={styles.cardDetails}
                                onClick={() => getCardDetails(card.id)}
                            >
                                <div className={styles.cardNumber}>**** **** **** {card.last4}</div>
                                <div>Expires: {card.expirationMonth}/{card.expirationYear}</div>
                            </button>
                        )}

                        {showDetails && (
                            <div className={styles.cardDetails}>
                                <div className={styles.cardNumber}>{cardPan}</div>
                                <div className={styles.cardDetailsRow}>
                                    <div>Expires: {card.expirationMonth}/{card.expirationYear}</div>
                                    <div>CVC: {cardCvc}</div>
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
            {!quartzCardUser?.auth_level && (
                <button
                    className={`glass-button ${styles.mainButton}`}
                    onClick={() => setModalVariation(ModalVariation.CARD_SIGNUP)}
                >
                    Sign up for Quartz Card ✨
                </button>
            )}

            {quartzCardUser?.auth_level === "Base" && (
                <button
                    className={`glass-button ${styles.mainButton}`}
                    onClick={() => setModalVariation(ModalVariation.CARD_KYC)}
                >
                    KYC for Quartz Card
                </button>
            )}

            {quartzCardUser?.auth_level === "Pending" && (
                <div className={styles.pending}>
                    <p>KYC pending...</p>
                    <TailSpin
                        height="18.5"
                        width="18.5"
                        color="#ffffffA5"
                        ariaLabel="loading-spinner"
                        wrapperStyle={{
                            width: "25px"
                        }}
                    />
                </div>
            )}

            {quartzCardUser?.auth_level === "Card" &&
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