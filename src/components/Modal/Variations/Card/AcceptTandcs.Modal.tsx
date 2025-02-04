import { useStore } from "@/src/utils/store";
import styles from "../../Modal.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useLoginCardUser, useRefetchCardUser } from "@/src/utils/hooks";
import { useEffect } from "react";

export default function AcceptTandcsModal() {
    const { setModalVariation, setAcceptTandcs } = useStore();
    const refetchCardUser = useRefetchCardUser();

    const loginCardUser = useLoginCardUser();

    const tandcsLink = "https://www.google.com";

    useEffect(() => {
        return () => {
            refetchCardUser();
        }
    }, [refetchCardUser]);


    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>Sign into your Quartz Card account</h2>

            <p style={{ marginBottom: "55px", marginTop: "10px" }}>
                Do you accept the Quartz Spend Card <a href={tandcsLink} target="_blank" rel="noopener noreferrer" className={styles.kycLink}>terms and conditions</a>?
            </p>

            <button
                className={`glass-button ${styles.mainButton}`}
                onClick={() => {
                    const acceptTandcs = true;
                    console.log("acceptTandcs", acceptTandcs);
                    setAcceptTandcs(acceptTandcs);
                    loginCardUser.mutate();
                    setModalVariation(ModalVariation.DISABLED)
                }}
            >
                I accept
            </button>
        </div>
    );
}