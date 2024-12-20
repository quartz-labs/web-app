import { PuffLoader } from "react-spinners";
import styles from "./Modal.module.css";

interface ButtonsProps {
    label: string;
    awaitingSign: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function Buttons({label, awaitingSign, onConfirm, onCancel} : ButtonsProps) {
    return (
        <div className={styles.buttons}>
            <button 
                className={`glass-button ${styles.mainButton}`}
                onClick={onConfirm}
            >
                {awaitingSign &&
                    <PuffLoader
                        color={"#ffffff"}
                        size={30}
                        aria-label="Loading"
                        data-testid="loader"
                    />
                }

                {!awaitingSign &&
                    <p>{label}</p>
                }
            </button>
            <button 
                className={`glass-button ghost ${styles.mainButton}`}
                onClick={() => onCancel()}
            >
                Cancel
            </button>
        </div>        
    )
}