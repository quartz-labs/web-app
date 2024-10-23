import { useState } from "react";
import styles from "./DefaultModal.module.css";
import { PuffLoader } from "react-spinners";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

export interface DefaultModalProps {
    title: string;
    denomination: string;
    buttonText: string;
    minAmount: number;
    onConfirm: (amount: number) => void;
    onCancel: () => void;
    onSetMax?: () => string;
}

export default function DefaultModal(
    { title, denomination, buttonText, minAmount, onConfirm, onCancel, onSetMax }: DefaultModalProps
) {
    const [awaitingSign, setAwaitingSign] = useState(false);
    const [amount, setAmount] = useState(""); 
    const [errorText, setErrorText] = useState("");

    const handleConfirm = async (amount: string) => {
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
        await onConfirm(numAmount);
        setAwaitingSign(false);
    }

    return (
        <ModalWrapper onClose={onCancel}>
            <h2 className={styles.heading}>{title}</h2>
            <div className={styles.inputSection}>
                <p>Amount ({denomination})</p>
                <div className={styles.inputFieldWrapper}>
                    <input 
                        className={styles.inputField}
                        type="text" 
                        placeholder={"0.0"} 
                        value={amount} 
                        onChange={(e) => 
                            setAmount(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
                        }
                    />
                    {onSetMax &&
                        <button 
                            className={styles.maxButton} 
                            onClick={() => setAmount(onSetMax())}
                        >
                            Max
                        </button>
                    }
                </div>
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
        </ModalWrapper>
    )
}