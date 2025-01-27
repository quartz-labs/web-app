import { useStore } from "@/src/utils/store";
import styles from "../Modal.module.css";

export default function CardKycModal() {
    const { kycLink, cardUserInfo } = useStore();

    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>Complete KYC Verification here:</h2>
            {kycLink || kycLink === "" ? (
                <a href={kycLink} target="_blank" rel="noopener noreferrer" className={styles.kycLink}>{kycLink}</a>
            ) : cardUserInfo?.applicationCompletionLink ? (
                <a href={`${cardUserInfo.applicationCompletionLink.url}?userId=${cardUserInfo.applicationCompletionLink.params.userId}`} target="_blank" rel="noopener noreferrer" className={styles.kycLink}>
                    {`${cardUserInfo.applicationCompletionLink.url}?userId=${cardUserInfo.applicationCompletionLink.params.userId}`}
                </a>
            ) : null}

        </div>
    );
}