import { useCallback } from "react";
import styles from "./ModalWrapper.module.css";

interface ModalWrapperProps{
    onClose: () => void;
    children: React.ReactNode;
}

export default function ModalWrapper({onClose, children} : ModalWrapperProps) {
    const handleWrapperClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    return (
        <div className={styles.modalWrapper} onClick={handleWrapperClick}>
            <div className={`glass ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}