"use client";

import { useCallback } from "react";
import styles from "../Modal.module.css";
import { useError } from "@/src/context/error-provider";

export default function ErrorModal() {
    const { propsDetails, detailsEnabled, hideDetails } = useError();

    const handleWrapperClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            hideDetails();
        }
    }, [hideDetails]);

    if (!propsDetails) return (<></>)
    const { message, body, errorId } = propsDetails;

    const limitedBody = body.length > 500 ? `${body.substring(0, 500)}...` : body;
    const email = `mailto:iarla@quartzpay.io?subject=Error%20Report:%20${errorId}`;

    if (!detailsEnabled) return (<></>);
    return (
        <div className={`${styles.modalWrapper} ${styles.errorModalWrapper}`} onClick={handleWrapperClick}>
            <div 
                className={`glass ${styles.modal} ${styles.errorModal}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.contentWrapper}>
                    <h2 className={`${styles.heading} ${styles.errorHeading}`}>Error</h2>
                
                    <div className={styles.errorBodyWrapper}>
                        <div className={styles.errorBody}>
                            <p>{message}</p>
                            <p>{limitedBody}</p>
                        </div>
                        
                        <p className="small-text light-text">
                            Contact support through <a href="https://discord.gg/K3byNmnKNm" target="_blank" rel="noopener noreferrer">Discord</a> or <a href={email} target="_blank" rel="noopener noreferrer">email</a> with the following <span className="no-wrap">Error ID: {errorId}</span>
                        </p>
                    </div>

                    <div className={`${styles.buttons} ${styles.singleButton}`}>
                        <button 
                            className={`glass-button ghost ${styles.mainButton}`}
                            onClick={hideDetails}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}