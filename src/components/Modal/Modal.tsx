import { ModalComponents } from "@/src/config/constants";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useStore } from "@/src/utils/store";
import styles from "./Modal.module.css";
import { useCallback } from "react";

export default function Modal() {
    const { modalVariation, setModalVariation } = useStore();

    const handleWrapperClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setModalVariation(ModalVariation.DISABLED);
        }
    }, [setModalVariation]);

    if (modalVariation === ModalVariation.DISABLED) return <></>;

    const ModalComponent = ModalComponents[modalVariation];
    return (
        <div className={styles.modalWrapper} onClick={handleWrapperClick}>
            <div className={`glass ${styles.modal} ${modalVariation === ModalVariation.CLOSE_ACCOUNT ? styles.errorModal : ""}`}>
                <ModalComponent />
            </div>
        </div>
    )
}