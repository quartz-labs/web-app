import styles from "./ModalWrapper.module.css";

interface ModalWrapperProps{
    children: React.ReactNode
}

export default function ModalWrapper({children} : ModalWrapperProps) {
    return (
        <div>
            <div className={styles.modalWrapper}>
                <div className={`glass ${styles.modal}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}