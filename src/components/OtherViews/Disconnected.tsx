import { WalletButton } from "@/src/context/solana/solana-provider";
import styles from "./OtherViews.module.css";

export default function Disconnected() {
  return (
    <div className={`glass panel center-content ${styles.disconnected}`}>
      <div className={"central-container"}>
        <h1 className={styles.title}>Connect wallet to access Quartz</h1>
        <WalletButton 
            disableCloseAccount={true}
            onCloseAccount={() => {}}
        />
      </div>
    </div>
  );
}
