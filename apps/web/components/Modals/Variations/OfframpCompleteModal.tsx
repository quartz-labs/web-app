import { useAnchorWallet } from "@solana/wallet-adapter-react";
import styles from "../DefaultLayout/DefaultLayout.module.css";
import { getDisplayWalletAddress } from "@/utils/helpers";

interface OfframpCompleteModalProps {
  url: string;
  closeModal: () => void;
}

export default function OfframpCompleteModal({ url, closeModal }: OfframpCompleteModalProps) {
  const wallet = useAnchorWallet();
  const walletkey = wallet ? getDisplayWalletAddress(wallet.publicKey.toString()) : "";

  return (
    <>
      <div className={styles.contentWrapper}>
        <h2 className={styles.heading}>You will be redirected to Mercuryo to complete your off-ramp</h2>

        <p className="light-text">
          If you are not redirected{" "}
          <a href={url} target="_blank">
            click here
          </a>
        </p>

        <p>Your SOL has been exchanged for USDT.</p>

        <p>If you do not complete the off-ramp, the USDC will remain in your connected wallet{walletkey}.</p>
      </div>

      <div className={styles.buttons}>
        <button className={`glass-button ${styles.mainButton}`} onClick={closeModal}>
          Done
        </button>
      </div>
    </>
  );
}
