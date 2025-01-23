import { useStore } from "@/src/utils/store";
import styles from "../Modal.module.css";

export default function CardKycModal() {
    const { kycLink } = useStore();

    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>Complete KYC Verification here:</h2>
            <a href={kycLink} target="_blank" rel="noopener noreferrer" className={styles.kycLink}>{kycLink}</a>
        </div>
    );
}