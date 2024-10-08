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
    const [amount, setAmount] = useState<number | string>(''); 

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
                        onChange={(e) => 
                            setAmount(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
                        }
                    />
                </div>
                
                <div className={styles.buttons}>
                    <button 
                        className={`glass-button ${styles.modalButton}`}
                        onClick={() => onConfirm(Number(amount))}
                    >
                        {buttonText}
                    </button>
                    <button 
                        className={`glass-button ghost ${styles.modalButton}`}
                        onClick={() => onCancel()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}