import { useStore } from "@/src/utils/store";
import styles from "./CardRow.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { fetchAndParse } from "@/src/utils/helpers";
import config from "@/src/config/config";
import type { CardsForUserResponse } from "@/src/types/interfaces/CardUserResponse.interface";
export default function CardRow() {
    const { setModalVariation, userFromDb, jwtToken, setCardDetails, cardDetails } = useStore();


    const createCard = async () => {
        // if user has no cards, kyc is approved.
        const createCardResponse: CardsForUserResponse = await fetchAndParse(`${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/issuing/create`, {
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
        });

        setCardDetails(cardDetails ? [...cardDetails, createCardResponse] : [createCardResponse]);
        console.log(createCardResponse);
    }

    return (
        <div className={styles.buttonRow} style={{ paddingTop: '20px' }}>


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

            {Array.isArray(cardDetails) && cardDetails.length > 0 && cardDetails.map((card: CardsForUserResponse) => (
                <div key={card.id} className={styles.cardDetails}>
                    <div>Card Type: {card.type}</div>
                    <div>Status: {card.status}</div>
                    <div>Last 4: {card.last4}</div>
                    <div>Expires: {card.expirationMonth}/{card.expirationYear}</div>
                    <div>Limit: {card.limit.amount} per {card.limit.frequency}</div>
                </div>
            ))}
        </div>
    );
}