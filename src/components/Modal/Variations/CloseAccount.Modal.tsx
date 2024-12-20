import { useStore } from "@/src/utils/store";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import styles from "../Modal.module.css";
import { PuffLoader } from "react-spinners";
import { captureError } from "@/src/utils/errors";
import { useError } from "@/src/context/error-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { useRefetchAccountStatus } from "@/src/utils/hooks";

export default function CloseAccountModal() {
    const { setModalVariation } = useStore();
    const { wallet } = useWallet();
    const { showError } = useError();
    const refetchAccountStatus = useRefetchAccountStatus();
    
    const [ awaitingSign, setAwaitingSign ] = useState(false);

    const handleCloseAccount = async () => {
        if (!wallet) return captureError(showError, "No wallet connected", "/CloseAccountModal.tsx", undefined);

        setAwaitingSign(true);
        const signature = ""; //await closeAccount(wallet, connection, showError, showTxStatus);
        setAwaitingSign(false);
        if (signature) {
            setModalVariation(ModalVariation.DISABLED);
            refetchAccountStatus(signature);
        }
    }

    return (
        <>
            <div className={styles.contentWrapper}>
                <h2 className={`${styles.heading} ${styles.closeHeading}`}>
                    Permanently Close Account
                </h2>
            
                <p className={"error-text large-text"} style={{marginBottom: "42px"}}>
                    Warning: This action cannot be undone
                </p>

                <div className={styles.closeRequirements}>
                    <p>To continue, your account must: </p>
                    <ul>
                        <li>be at least 13 days old</li>
                        <li>have no outstanding loans</li>
                        <li>have no remaining funds</li>
                    </ul>
                </div>
            </div>

            <div className={styles.buttons}>
                <button 
                    className={`glass-button ghost error ${styles.mainButton}`}
                    onClick={handleCloseAccount}
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
                        <p>Close Account</p>
                    }
                </button>

                <button 
                    className={`glass-button ${styles.mainButton}`}
                    onClick={() => setModalVariation(ModalVariation.DISABLED)}
                >
                    Cancel
                </button>
            </div>
        </>
    )
}