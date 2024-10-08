import { useState } from "react";
import styles from "./Modal.module.css";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export interface OfframpModalProps {
    url: string;
    closeModal: () => void;
}

export default function OfframpModal(
    { url, closeModal }: OfframpModalProps
) {
    const wallet = useAnchorWallet();
    const walletkey = wallet 
        ? ` (${wallet.publicKey.toString().slice(0, 4)}...${wallet.publicKey.toString().slice(-4)})` 
        : "";

    return (
        <div className={styles.modalWrapper}>
            <div className={`glass ${styles.modal}`}>
                <div className={styles.contentWrapper}>
                    <h2 className={styles.offrampTitle}>You will be redirected to Mercuryo to complete your off-ramp</h2>
                    <p className={styles.offrampRedirect}>If you are not redirected <a href={url} target="_blank">click here</a></p>
                    <p className={styles.offrampBodyStart}>Your SOL has been exchanged for USDT.</p>
                    <p className={styles.offrampBody}>If you do not complete the off-ramp, the USDT will remain in your connected wallet{walletkey}.</p>
                </div>

                <div className={styles.buttons}>
                    <button 
                        className={`glass-button ${styles.modalButton}`}
                        onClick={() => closeModal()}
                    >
                        Done
                    </button>
                </div>              
            </div>
        </div>
    )
}