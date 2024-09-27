import { useState } from "react";
import styles from "./Modal.module.css";

export interface ModalProps {
    title: string;
    denomination: string;
    buttonText: string;
    onConfirm: (amount: number) => void;
    onCancel: () => void;
}

export default function Modal(
    { title, denomination, buttonText, onConfirm, onCancel }: ModalProps
) {
    const [amount, setAmount] = useState<number | string>(''); // State variable for amount

    return (
        <div className={styles.modalWrapper}>
            <div className={`glass ${styles.modal}`}>
                <h2 className={styles.heading}>{title}</h2>
                <div className={styles.inputFieldWrapper}>
                    <p>Amount ({denomination})</p>
                    <input 
                        className={styles.inputField}
                        type="text" 
                        placeholder={"0.0"} 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className={styles.buttons}>
                    <button 
                        className={`glassButton ${styles.modalButton}`}
                        onClick={() => onConfirm(Number(amount))}
                    >
                        {buttonText}
                    </button>
                    <button 
                        className={`glassButton ghost ${styles.modalButton}`}
                        onClick={() => onCancel()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}