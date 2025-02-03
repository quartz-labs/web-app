import { useStore } from "@/src/utils/store";
import styles from "../../Modal.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useRefetchCardUser } from "@/src/utils/hooks";
import { useEffect } from "react";

export default function CardKycModal() {
    const { kycLink, setModalVariation } = useStore();
    const refetchCardUser = useRefetchCardUser();

    useEffect(() => {
        return () => {
            refetchCardUser();
        }
    }, [refetchCardUser]);

    if (!kycLink) {
        return (
            <div className={styles.contentWrapper}>
                <h2 className={styles.heading}>Complete KYC Verification</h2>
                <p className={"error-text"}>No KYC link found</p>
            </div>
        );
    }

    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>Complete KYC Verification</h2>

            <p>
                You will be redirected to the KYC verification page. If you are not redirected, please&nbsp;
                <a href={kycLink} target="_blank" rel="noopener noreferrer" className={styles.kycLink}>click here</a>.
            </p>

            <p>Once you have completed the KYC, please click done below.</p>

            <button
                className={`glass-button ${styles.mainButton}`}
                onClick={() => setModalVariation(ModalVariation.DISABLED)}
            >
                Done
            </button>
        </div>
    );
}