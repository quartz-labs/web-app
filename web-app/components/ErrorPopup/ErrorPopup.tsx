"use client";

import { useError } from "@/context/error-provider";
import styles from "./ErrorPopup.module.css";
import { useEffect, useRef, useState } from "react";

export default function ErrorPopup() {
    const { message, enabled, hideError } = useError();
    const TIMEOUT_TIME = 4000;
    const [isMouseEntered, setIsMouseEntered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            console.log(isMouseEntered);
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
    
    if (!enabled) return (<></>);
    return (
        <button 
            className={styles.errorPopup} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {hideError()}}
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