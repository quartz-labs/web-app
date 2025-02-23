import { useState } from "react";
import styles from "./OtherViews.module.css";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PuffLoader } from "react-spinners";
import { useError } from "@/src/context/error-provider";
import { useRefetchAccountStatus } from "@/src/utils/hooks";
import { captureError } from "@/src/utils/errors";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { signAndSendTransaction, fetchAndParse, deserializeTransaction, buildEndpointURL } from "@/src/utils/helpers";

export default function Onboarding() {
  const wallet = useAnchorWallet();
  const { showError } = useError();
  const { showTxStatus } = useTxStatus();
  const refetchAccountStatus = useRefetchAccountStatus();

  const [checkboxes, setCheckboxes] = useState([false, false, false]);
  const [missingCheckboxes, setMissingCheckboxes] = useState([false, false, false]);
  const [attemptFailed, setAttemptFailed] = useState(false);
  const [awaitingSign, setAwaitingSign] = useState(false);

  const handleCheckboxChange = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  const handleCreateAccount = async () => {
    if (!wallet || awaitingSign) return;

    setMissingCheckboxes(checkboxes.map(checked => !checked));
    if (!checkboxes.every(checked => checked)) {
        setAttemptFailed(true);
        return;
    }

    setAttemptFailed(false);
    setAwaitingSign(true);
    refetchAccountStatus();
    try {
        const endpoint = buildEndpointURL("/api/build-tx/init-account", { 
            address: wallet.publicKey.toBase58() 
        });
        const response = await fetchAndParse(endpoint);
        const transaction = deserializeTransaction(response.transaction);
        const signature = await signAndSendTransaction(transaction, wallet, showTxStatus);

        setAwaitingSign(false);
        if (signature) refetchAccountStatus(signature);
    } catch (error) {
        if (error instanceof WalletSignTransactionError) showTxStatus({ status: TxStatus.SIGN_REJECTED });
        else {
            showTxStatus({ status: TxStatus.NONE });
            captureError(showError, "Failed to create account", "/Onboarding.tsx", error, wallet.publicKey);
        }
    } finally {
        setAwaitingSign(false);
    }
  };

  return (
    <div className={"glass panel center-content"}>
      <div className={"central-container"}>
      <h1 className={styles.title}>Acknowledge Terms</h1>
        <p className={styles.subheading}>Creating an account requires 0.035 SOL for rent which can be reclaimed if you ever decide to close your account.</p>

        <ul className={styles.checkboxes}>
            <li>
                <label className={missingCheckboxes[0] ? styles.missingLabel : ""}>
                    <input 
                        type="checkbox" 
                        checked={checkboxes[0]} 
                        onChange={() => handleCheckboxChange(0)} 
                    />
                    <span className={styles.checkboxText}>
                        I accept the <a href="https://docs.quartzpay.io/terms-and-conditions" target="_blank">terms and conditions</a>.
                    </span>
                </label>
            </li>

            <li>
                <label className={missingCheckboxes[1] ? styles.missingLabel : ""}>
                    <input 
                        type="checkbox" 
                        checked={checkboxes[1]} 
                        onChange={() => handleCheckboxChange(1)} 
                    />
                    <span className={styles.checkboxText}>
                        I accept the <a href="https://docs.quartzpay.io/privacy-policy" target="_blank">privacy policy</a>.
                    </span>
                </label>
            </li>

            <li>
                <label className={missingCheckboxes[2] ? styles.missingLabel : ""}>
                    <input 
                        type="checkbox" 
                        checked={checkboxes[2]} 
                        onChange={() => handleCheckboxChange(2)} 
                    />
                    <span className={styles.checkboxText}>
                        I have read and understood the <a href="https://docs.quartzpay.io/risks" target="_blank">protocol disclaimer</a>.
                    </span>
                </label>
            </li>
        </ul>

        <button onClick={handleCreateAccount} className={`glass-button`}>
            {awaitingSign &&
                <PuffLoader
                    color={"#ffffff"}
                    size={30}
                    aria-label="Loading"
                    data-testid="loader"
                />
            }

            {!awaitingSign &&
                <p>Create Account</p>
            }
        </button>

        {attemptFailed && 
            <p className={styles.failMessage}>You must agree to all terms</p>
        }
      </div>
    </div>
  );
}
