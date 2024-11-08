"use client";

import { useError } from "@/context/error-provider";
import styles from "../Popup.module.css";
import { useEffect, useRef, useState } from "react";

export default function ErrorPopup() {
    const { propsError, errorEnabled, hideError, showDetails } = useError();
    const [isMouseEntered, setIsMouseEntered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    
    const TIMEOUT_TIME = 6_000;

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            if(!isMouseEntered) hideError();
        }, TIMEOUT_TIME);

        return () => clearTimeout(timeoutRef.current);
    }, [hideError, isMouseEntered]);

    const handleMouseEnter = () => {
        setIsMouseEntered(true);
    }

    const handleMouseLeave = () => {
        setIsMouseEntered(false);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if(!isMouseEntered) hideError();
        }, TIMEOUT_TIME);
    }

    if (!propsError) return (<></>)
    const { message } = propsError;

    if (!errorEnabled) return (<></>);
    return (
        <button 
            className={styles.popup} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => showDetails(propsError)}
        >
            <div className={styles.heading}>
                <p className={styles.headingError}>
                    Error
                </p>

                <p className={styles.headingDetails}>
                    Details
                </p>
            </div>

            <p className={styles.message}>{message}</p>
        </button>
    );
}