import { useState } from "react";
import styles from "./DefaultModal.module.css";
import { PuffLoader } from "react-spinners";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

export interface DefaultModalProps {
    title: string;
    denomination: string;
    buttonText: string;
    minAmount: number;
    maxAmount: number;
    onConfirm: (amount: number) => void;
    onCancel: () => void;
    children: React.ReactNode;
}

export default function DefaultModal(
    { title, denomination, buttonText, minAmount, maxAmount, onConfirm, onCancel, children }: DefaultModalProps
) {
    const [awaitingSign, setAwaitingSign] = useState(false);
    const [amount, setAmount] = useState(""); 
    const [errorText, setErrorText] = useState("");

    const handleConfirm = async (amount: string) => {
        const numAmount = Number(amount);
        if (isNaN(numAmount)) {
            setErrorText("Invalid input");
            return;
        }

        if (numAmount < minAmount) {
            setErrorText("Minimum amount: " + minAmount);
            return;
        }

        if (numAmount > maxAmount) {
            setErrorText("Maximum amount: " + minAmount);
            return;
        }

        setErrorText("");
        setAwaitingSign(true);
        await onConfirm(numAmount);
        setAwaitingSign(false);
    }

    return (
        <ModalWrapper onClose={onCancel}>
            <div className={styles.contentWrapper}>
                <h2 className={styles.heading}>{title}</h2>
            </div>
            
            <div className={styles.inputSection}>
                <p>Amount</p>
                <div className={styles.inputFieldWrapper}>
                    <input 
                        className={styles.inputField}
                        type="text" 
                        placeholder={"0.0 " + denomination} 
                        value={amount} 
                        onChange={(e) => 
                            setAmount(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
                        }
                    />
                </div>
                {errorText &&
                    <p className={styles.error}>{errorText}</p>
                }  
            </div>

            <div className={styles.infoSection}>
                <div className={styles.infoValue}>
                    {children}
                </div>

                <div className={styles.infoBalances}>
                    <p className="small-text light-text">Available: {maxAmount}</p>
                    <button className={`glass-button ghost ${styles.balanceButton}`} onClick={() => setAmount((maxAmount / 2).toString())}>
                        Half
                    </button>
                    <button className={`glass-button ghost ${styles.balanceButton}`} onClick={() => setAmount(maxAmount.toString())}>
                        Max
                    </button>
                </div>
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