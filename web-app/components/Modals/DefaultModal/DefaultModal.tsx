import { useState } from "react";
import styles from "./DefaultModal.module.css";
import { PuffLoader } from "react-spinners";
import Modal from "../Modal";

export interface DefaultModalProps {
    buttonText: string;
    minAmount: number;
    maxAmount: number;
    onConfirm: (amount: number) => void;
    onCancel: () => void;
    extraInfo: React.ReactNode;
}

export default function DefaultModal(
    { title, denomination, buttonText, minAmount, maxAmount, onConfirm, onCancel, extraInfo: children }: DefaultModalProps
) {

    const handleConfirm = async () => {
        if (amount < MIN_DEPOSIT) {
            setErrorText("Minimum amount: " + MIN_DEPOSIT);
            return;
        }

        if (amount > maxDeposit) {
            setErrorText("Maximum amount: " + maxDeposit);
            return;
        }

        setErrorText("");
        setAwaitingSign(true);
        await onConfirm(amount);
        setAwaitingSign(false);
    }

    return (
        <>
            

            
            
                  
        </>
    )
}