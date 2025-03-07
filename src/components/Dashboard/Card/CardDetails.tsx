import { useStore } from "@/src/utils/store";
import styles from "./Card.module.css";
import { useState } from "react";
import { fetchAndParse } from "@/src/utils/helpers";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useLoginCardUser } from "@/src/utils/hooks";
import { PuffLoader } from "react-spinners";
import Card from "./Card";
import { TermsNeeded } from "@/src/types/enums/TermsNeeded.enum";

export default function CardDetails() {
    const {
        setModalVariation,
        jwtToken,
        cardUser,
        cardDetails,
        isSigningLoginMessage
    } = useStore();

    const [loadingDetails, setLoadingDetails] = useState(false);
    const [cardPan, setCardPan] = useState<string | null>(null);
    const [cardCvc, setCardCvc] = useState<string | null>(null);
    const showDetails = (cardPan !== null && cardCvc !== null);

    const getCardDetails = async (cardId: string) => {
        setLoadingDetails(true);
        const response = await fetchAndParse(`/api/card-details?cardId=${cardId}`, {
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
        setCardPan(formattedPan);
        setCardCvc(response.cvc);
        setLoadingDetails(false);
    }

    const swapCardDetailsVisibility = () => {
        if (showDetails || cardDetails === undefined) {
            setCardPan(null);
            setCardCvc(null);
        } else {
            getCardDetails(cardDetails.id.toString());
        }
    }

    const loginCardUser = useLoginCardUser();

    if (!jwtToken) {
        return (
            <div className={styles.cardWrapper}>
                <div className={styles.cardContainer}>
                    <Card
                        cvc={cardCvc}
                        pan={cardPan}
                    />

                    <button
                        className={`glass-button ${styles.cardButton}`}
                        onClick={() => {
                            if (cardUser?.account_status === "card") {
                                setModalVariation(ModalVariation.ACCEPT_TANDCS);
                            } else {
                                loginCardUser.mutate(TermsNeeded.NOT_NEEDED)
                            }
                        }}
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
                            <p>Authorize Wallet</p>
                        )}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardContainer}>
                <Card
                    cvc={cardCvc}
                    pan={cardPan}
                />  

                <div className={styles.buttonsRow}>
                    <button
                        className={`glass-button ${styles.cardButton}`}
                        onClick={() => setModalVariation(ModalVariation.SPEND_LIMITS)}
                    >
                        Spend Limits
                    </button>
                    <button
                        className={`glass-button ${styles.cardButton}`}
                        onClick={() => swapCardDetailsVisibility()}
                    >
                        {loadingDetails &&
                            <PuffLoader
                                color={"#ffffff"}
                                size={30}
                                aria-label="Loading"
                                data-testid="loader"
                            />
                        }

                        {!loadingDetails &&
                            <p>{showDetails ? "Hide Details" : "View Details"}</p>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}