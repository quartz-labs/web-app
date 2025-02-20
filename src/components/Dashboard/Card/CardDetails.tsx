import { useStore } from "@/src/utils/store";
import styles from "./Card.module.css";
import { AuthLevel, TandCsNeeded } from "@/src/types/enums/AuthLevel.enum";
import { useState } from "react";
import { fetchAndParse } from "@/src/utils/helpers";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { TailSpin } from "react-loader-spinner";
import { useLoginCardUser, useOpenKycLink } from "@/src/utils/hooks";
import { PuffLoader } from "react-spinners";
import Card from "./Card";

export default function CardDetails() {
    const {
        setModalVariation,
        quartzCardUser,
        jwtToken,
        cardDetails,
        providerCardUser,
        isSigningLoginMessage
    } = useStore();
    const openKycLink = useOpenKycLink();

    const [loadingDetails, setLoadingDetails] = useState(false);
    const [cardPan, setCardPan] = useState<string | null>(null);
    const [cardCvc, setCardCvc] = useState<string | null>(null);
    const showDetails = (cardPan !== null && cardCvc !== null);

    const getCardDetails = async (cardId: string) => {
        setLoadingDetails(true);
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
        setCardPan(formattedPan);
        setCardCvc(response.cvc);
        setLoadingDetails(false);
    }

    const swapCardDetailsVisibility = () => {
        if (showDetails || cardDetails === undefined) {
            setCardPan(null);
            setCardCvc(null);
        } else {
            getCardDetails(cardDetails.id);
        }
    }

    const loginCardUser = useLoginCardUser();

    if (
        quartzCardUser?.auth_level === undefined 
        || (quartzCardUser?.auth_level === AuthLevel.CARD && !cardDetails)
    ) {
        return (
            <div className={styles.cardWrapper}>
                <div className={styles.cardContainer}>
                    <Card
                        cvc={cardCvc}
                        pan={cardPan}
                    />  

                    <button
                        className={`glass-button ${styles.cardButton}`}
                        onClick={() => setModalVariation(ModalVariation.CARD_SIGNUP)}
                    >
                        Get Quartz Card
                    </button>
                </div>
            </div>
        )
    }

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
                            if (quartzCardUser?.auth_level === AuthLevel.CARD) {
                                setModalVariation(ModalVariation.ACCEPT_TANDCS);
                            } else {
                                loginCardUser.mutate(TandCsNeeded.NOT_NEEDED)
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

    if (quartzCardUser?.auth_level === AuthLevel.BASE) {
        const link = providerCardUser?.applicationCompletionLink ? (
            `${providerCardUser.applicationCompletionLink.url}?userId=${providerCardUser.applicationCompletionLink.params.userId}`
        ) : undefined;
        return (
            <div className={styles.cardWrapper}>
                <div className={styles.cardContainer}>
                    <Card
                        cvc={cardCvc}
                        pan={cardPan}
                    />

                    {link && (
                        <button
                            className={`glass-button ${styles.cardButton}`}
                            onClick={() => openKycLink(link)}
                        >
                            Complete KYC
                        </button>
                    )}

                    {!link && (
                        <div className={styles.kycPending}>
                            <p>Loading KYC link...</p>

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
                </div>
            </div>
        )
    }

    if (quartzCardUser?.auth_level === AuthLevel.KYC_PENDING) {
        return (
            <div className={styles.cardWrapper}>
                <div className={styles.cardContainer}>
                    <Card
                        cvc={cardCvc}
                        pan={cardPan}
                    />

                    <div className={styles.kycPending}>
                        <p>KYC verification pending...</p>

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