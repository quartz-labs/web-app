import { useStore } from "@/src/utils/store";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import styles from "../Modal.module.css";
import { PuffLoader } from "react-spinners";
import { captureError } from "@/src/utils/errors";
import { useError } from "@/src/context/error-provider";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { useRefetchAccountStatus } from "@/src/utils/hooks";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { signAndSendTransaction, fetchAndParse, deserializeTransaction, buildEndpointURL } from "@/src/utils/helpers";

export default function CloseAccountModal() {
    const wallet = useAnchorWallet();

    const { setModalVariation } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const refetchAccountStatus = useRefetchAccountStatus();
    
    const [ awaitingSign, setAwaitingSign ] = useState(false);

    const handleCloseAccount = async () => {
        if (!wallet) return captureError(showError, "No wallet connected", "/CloseAccountModal.tsx", undefined, null);

        setAwaitingSign(true);
        try {
            const endpoint = buildEndpointURL("/api/build-tx/close-account", {
                address: wallet.publicKey.toBase58()
            });
            const response = await fetchAndParse(endpoint, undefined, 3);
            const transaction = deserializeTransaction(response.transaction);
            const signature = await signAndSendTransaction(transaction, wallet, showTxStatus);
            
            setAwaitingSign(false);
            if (signature) {
                refetchAccountStatus(signature);
                setModalVariation(ModalVariation.DISABLED);
            }
        } catch (error) {
            if (error instanceof WalletSignTransactionError) showTxStatus({ status: TxStatus.SIGN_REJECTED });
            else {
                showTxStatus({ status: TxStatus.NONE });
                captureError(showError, "Failed to close account", "/CloseAccountModal.tsx", error, wallet.publicKey);
            }
        } finally {
            setAwaitingSign(false);
        }
    }

    return (
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

            <div className={styles.buttons}>
                <button 
                    className={`glass-button ${styles.mainButton}`}
                    onClick={() => setModalVariation(ModalVariation.DISABLED)}
                >
                    Cancel
                </button>
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
            </div>
        </div>
    )
}