import { useStore } from "@/src/utils/store";
import styles from "./Card.module.css";
import { AuthLevel, type CardsForUserResponse } from "@/src/types/interfaces/CardUserResponse.interface";
import { useState } from "react";
import { fetchAndParse } from "@/src/utils/helpers";
import config from "@/src/config/config";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { TailSpin } from "react-loader-spinner";
import { useLoginCardUser, useOpenKycLink } from "@/src/utils/hooks";
import { PuffLoader } from "react-spinners";

export default function Card() {
    const { 
        setModalVariation, 
        quartzCardUser, 
        jwtToken, 
        setCardDetails, 
        cardDetails,
        providerCardUser,
        isSigningLoginMessage
    } = useStore();
    const [showDetails, setShowDetails] = useState(false);
    const openKycLink = useOpenKycLink();

    const [creatingCard, setCreatingCard] = useState(false);
    const [cardPan, setCardPan] = useState<string[] | null>(null);
    const [cardCvc, setCardCvc] = useState<string[] | null>(null);

    const link = providerCardUser?.applicationCompletionLink ? (
        `${providerCardUser.applicationCompletionLink.url}?userId=${providerCardUser.applicationCompletionLink.params.userId}`
    ) : undefined;

    const createCard = async () => {
        // if user has no cards, kyc is approved.
        setCreatingCard(true);
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
        setCreatingCard(false);
        setCardDetails(cardDetails ? [...cardDetails, createCardResponse] : [createCardResponse]);
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
        
        const formattedPan = response.pan.match(/.{1,4}/g).join(' ');
        setCardPan([formattedPan]);
        setCardCvc([response.cvc]);
        setShowDetails(true);
    }
    
    const loginCardUser = useLoginCardUser();
    if (!jwtToken) {
        return (
            <div className={styles.cardsContainer}>
                <button
                    className={`glass-button ${styles.loginButton}`}
                    onClick={() => loginCardUser.mutate()}
                >
                    {isSigningLoginMessage && (
                        <PuffLoader
                            color={"#ffffff"}
                            size={30}
                            aria-label="Loading"
                            data-testid="loader"
                        />
                    )}
                    
                    {!isSigningLoginMessage && (
                        <p>Verify Wallet</p>
                    )}
                </button>
            </div>
        )
    }

    if (cardDetails !== undefined && cardDetails[0] !== undefined) {
        const card = cardDetails[0];
        return (
            <div className={styles.cardsContainer}>
                <div className={styles.cardWrapper}>
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

                <button
                    className={`glass-button`}
                onClick={() => setModalVariation(ModalVariation.CARD_TOPUP)}
                >
                    Top up card!
                </button>
            </div>
        )
    }

    if (quartzCardUser?.auth_level === undefined) {
        return (
            <div className={styles.cardsContainer}>
                <button
                    className={`glass-button`}
                    onClick={() => setModalVariation(ModalVariation.CARD_SIGNUP)}
                >
                    Sign up for Quartz Card ✨
                </button>
            </div>
        )
    }

    if (quartzCardUser?.auth_level === AuthLevel.BASE) {
        return (
            <div className={styles.cardsContainer}>
                {link && (
                    <button
                        className={`glass-button`}
                        onClick={() => openKycLink(link)}
                    >
                        KYC for Quartz Card
                    </button>
                )}
                {!link && (
                    <TailSpin
                        height="18.5"
                        width="18.5"
                        color="#ffffffA5"
                        ariaLabel="loading-spinner"
                        wrapperStyle={{
                            width: "25px"
                        }}
                    />
                )}
            </div>
        )
    }

    if (quartzCardUser?.auth_level === AuthLevel.PENDING) {
        return (
            <div className={styles.cardsContainer}>
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
            </div>
        )
    }

    if (quartzCardUser?.auth_level === AuthLevel.CARD) {
        return (
            <div className={styles.cardsContainer}>
                <button
                    className={`glass-button`}
                    onClick={createCard}
                >
                    {creatingCard && (
                        <PuffLoader
                            color={"#ffffff"}
                            size={30}
                            aria-label="Loading"
                            data-testid="loader"
                        />
                    )}
                    
                    {!creatingCard && (
                        <p>Create Card</p>
                    )}
                </button>
            </div>
        )
    }
}