import { useStore } from "@/src/utils/store";
import styles from "../Modal.module.css";
import { useEffect } from "react";
import { captureError } from "@/src/utils/errors";
import { useError } from "@/src/context/error-provider";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useRefetchCardUser } from "@/src/utils/hooks";

export default function CardKycModal() {
    const { showError } = useError();
    const { kycLink, setModalVariation } = useStore();
    const refetchCardUser = useRefetchCardUser();

    useEffect(() => {
        if (kycLink) {
            window.open(kycLink, "_blank", "noopener noreferrer");
        } else {
            captureError(showError, "No KYC link found", "/CardKyc.Modal.tsx", null, null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kycLink]);

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
                onClick={() => {
                    setModalVariation(ModalVariation.DISABLED);
                    refetchCardUser();
                }}
            >
                Done
            </button>
        </div>
    );
}