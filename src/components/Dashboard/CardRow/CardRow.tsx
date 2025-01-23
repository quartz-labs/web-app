import { useStore } from "@/src/utils/store";
import styles from "./CardRow.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";

export default function CardRow() {
    const { setModalVariation, userFromDb, cardUserInfo } = useStore();

    return (
        <div className={styles.buttonRow}>


            {!userFromDb?.auth_level && (
                <button
                    className={`glass-button ${styles.mainButton}`}
                    onClick={() => setModalVariation(ModalVariation.CARD_SIGNUP)}
                >
                    Sign up for Quartz Card ✨
                </button>
            )}

            {cardUserInfo?.applicationStatus !== 'approved' && (
            <button
                className={`glass-button ${styles.mainButton}`}
                onClick={() => setModalVariation(ModalVariation.CARD_KYC)}
            >
                KYC for Quartz Card
                </button>
            )}

        </div>
    );
}