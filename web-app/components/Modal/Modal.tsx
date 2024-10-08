import { useState } from "react";
import styles from "./Modal.module.css";
import { PuffLoader } from "react-spinners";

export interface ModalProps {
    title: string;
    denomination: string;
    buttonText: string;
    minAmount: number;
    onConfirm: (amount: number) => void;
    onCancel: () => void;
}

export default function Modal(
    { title, denomination, buttonText, minAmount, onConfirm, onCancel }: ModalProps
) {
    const [awaitingSign, setAwaitingSign] = useState(false);
    const [amount, setAmount] = useState(""); 
    const [errorText, setErrorText] = useState("");

    const handleConfirm = (amount: string) => {
        let numAmount;
        try {
            numAmount = Number(amount);
        } catch {
            setErrorText("Invalid input");
            return;
        }

        if (numAmount < minAmount) {
            setErrorText("Minimum amount: " + minAmount);
            return;
        }

        setErrorText("");
        setAwaitingSign(true);
        onConfirm(numAmount);
    }

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
                    {errorText &&
                        <p className={styles.error}>{errorText}</p>
                    }  
                </div>
                
                <div className={styles.buttons}>
                    <button 
                        className={`glass-button ${styles.modalButton}`}
                        onClick={() => handleConfirm(amount)}
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
                            <p>{buttonText}</p>
                        }
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