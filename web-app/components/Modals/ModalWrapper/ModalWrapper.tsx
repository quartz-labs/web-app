import { useCallback } from "react";
import styles from "./ModalWrapper.module.css";

interface ModalWrapperProps{
    onClose: () => void;
    extraClass?: string;
    children: React.ReactNode;
}

export default function ModalWrapper({onClose, extraClass, children} : ModalWrapperProps) {
    const handleWrapperClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    return (
        <div className={styles.modalWrapper} onClick={handleWrapperClick}>
            <div 
                className={`glass ${styles.modal} ${extraClass ? styles[extraClass] : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}