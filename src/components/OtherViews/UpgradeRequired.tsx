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

export default function UpgradeRequired() {
  const wallet = useAnchorWallet();
  const { showError } = useError();
  const { showTxStatus } = useTxStatus();
  const refetchAccountStatus = useRefetchAccountStatus();

  const [awaitingSign, setAwaitingSign] = useState(false);

  const handleCreateAccount = async () => {
    if (!wallet || awaitingSign) return;

    setAwaitingSign(true);
    refetchAccountStatus();
    try {
        const endpoint = buildEndpointURL("/api/build-tx/upgrade-account", { 
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
            captureError(showError, "Failed to upgrade account", "/Upgrade.tsx", error, wallet.publicKey);
        }
    } finally {
        setAwaitingSign(false);
    }
  };

  return (
    <div className={"glass panel center-content"}>
      <div className={"central-container wide"}>
      <h1 className={styles.title}>Account Upgrade</h1>
        <p className={styles.subheading}>We&apos;ve upgraded the Quartz protocol and require your signature to update your account.</p>

        <p style={{ marginBottom: "30px" }}>Visit our <a href="https://discord.gg/K3byNmnKNm" target="_blank">Discord</a> for more details.</p>

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
                <p>Upgrade Account</p>
            }
        </button>
      </div>
    </div>
  );
}
