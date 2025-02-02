import { useStore } from "@/src/utils/store";
import styles from "../Modal.module.css";
import { useEffect } from "react";
import { captureError } from "@/src/utils/errors";
import { useError } from "@/src/context/error-provider";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useRefetchProviderCardUser } from "@/src/utils/hooks";

export default function CardKycModal() {
    const { showError } = useError();
    const { kycLink, providerCardUser, setModalVariation } = useStore();
    const refetchCardUser = useRefetchProviderCardUser();

    const url = kycLink ?? (
        providerCardUser?.applicationCompletionLink ? (
            `${providerCardUser.applicationCompletionLink.url}?userId=${providerCardUser.applicationCompletionLink.params.userId}`
        ) : undefined
    );

    useEffect(() => {
        if (url) {
            window.open(url, "_blank", "noopener noreferrer");
        } else {
            captureError(showError, "No KYC link found", "/CardKyc.Modal.tsx", null, null);
        }
    }, [url, showError]);

    if (!url) {
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
                <a href={url} target="_blank" rel="noopener noreferrer" className={styles.kycLink}>click here</a>.
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