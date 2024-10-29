"use client";

import styles from "./ErrorPopup.module.css";

export interface ErrorPopupProps {
    enabled: boolean,
    message: string,
}

export default function ErrorPopup({enabled, message} : ErrorPopupProps) {
    if (!enabled) return (<></>);

    return (
        <div className={`${styles.errorPopup} glass`} onClick={() => {console.log("click")}}>
            <div className={styles.heading}>
                <p className={styles.headingError}>
                    Error
                </p>

                <p className={styles.headingDetails}>
                    Details
                </p>
            </div>

            <p className={styles.message}>{message}</p>
        </div>
    );
}