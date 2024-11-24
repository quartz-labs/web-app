import { useState } from "react";
import styles from "../DefaultLayout/DefaultLayout.module.css";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { useTxStatus } from "@/context/tx-status-provider";
import { captureError } from "@/utils/errors";
import { closeAccount } from "@/utils/instructions";
import PuffLoader from "react-spinners/PuffLoader";

interface CloseAccountModalProps {
  closeModal: (signature?: string, accountClosed?: boolean) => void;
}

export default function CloseAccountModal({ closeModal }: CloseAccountModalProps) {
  const { connection } = useConnection();
  const { showError } = useError();
  const { showTxStatus } = useTxStatus();
  const wallet = useAnchorWallet();

  const [awaitingSign, setAwaitingSign] = useState(false);

  const handleCloseAccount = async () => {
    if (!wallet) return captureError(showError, "No wallet connected", "/CloseAccountModal.tsx", undefined);

    setAwaitingSign(true);
    const signature = await closeAccount(wallet, connection, showError, showTxStatus);
    setAwaitingSign(false);
    if (signature) closeModal(signature, true);
  };

  return (
    <>
      <div className={styles.contentWrapper}>
        <h2 className={`${styles.heading} ${styles.closeHeading}`}>Permanently Close Account</h2>

        <p className={"error-text large-text"} style={{ marginBottom: "42px" }}>
          Warning: This action cannot be undone
        </p>

        <div className={styles.closeRequirements}>
          <p>To continue, your account must: </p>
          <ul>
            <li>be at least 13 days old</li>
            <li>have no outstanding loans</li>
            <li>have no remaining deposits</li>
          </ul>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={`glass-button ghost error ${styles.mainButton}`} onClick={handleCloseAccount}>
          {awaitingSign && <PuffLoader color={"#ffffff"} size={30} aria-label="Loading" data-testid="loader" />}

          {!awaitingSign && <p>Close Account</p>}
        </button>

        <button className={`glass-button ${styles.mainButton}`} onClick={() => closeModal()}>
          Cancel
        </button>
      </div>
    </>
  );
}
