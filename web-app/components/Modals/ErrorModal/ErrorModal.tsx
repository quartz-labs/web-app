"use client";

import styles from "../DefaultModal/DefaultModal.module.css";
import Modal from "../Modal";
import { useError } from "@/context/error-provider";

export default function ErrorModal() {
    const { propsDetails, detailsEnabled, hideDetails } = useError();

    if (!propsDetails) return (<></>)
    const { message, body, id } = propsDetails;

    const limitedBody = body.length > 500 ? `${body.substring(0, 500)}...` : body;
    const email = `mailto:iarla@quartzpay.io?subject=Error%20Report:%20${id}`;

    if (!detailsEnabled) return (<></>);
    return (
        <Modal onClose={hideDetails} extraClass={"modalError"}>
            <div className={styles.contentWrapper}>
                <h2 className={`${styles.heading} ${styles.errorHeading}`}>Error</h2>

                <div className={styles.errorBodyWrapper}>
                    <div className={styles.errorBody}>
                        <p>{message}</p>
                        <p>{limitedBody}</p>
                    </div>
                    
                    <p className="small-text light-text">
                        Contact support through <a href="https://discord.gg/K3byNmnKNm" target="_blank">Discord</a> or <a href={email} target="_blank">email</a> with the following <span className="no-wrap">Error ID: {id}</span>
                    </p>
                </div>
            </div>

            <div className={styles.buttons}>
                <button 
                    className={`glass-button ghost ${styles.modalButton} ${styles.errorButton}`}
                    onClick={hideDetails}
                >
                    Close
                </button>     
            </div>  
        </Modal>
    )
}