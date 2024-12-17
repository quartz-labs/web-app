import Image from "next/image";
import styles from "./Nav.module.css";
import { WalletButton } from "@/context/solana/solana-provider";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Nav() {
  const wallet = useWallet();

  const isAccountCreated = true;

  return (
    <div className={styles["nav"]}>
      <a href="https://quartzpay.io/" target="_blank" className={styles.logoContainer}>
        <Image 
            className={"image-fill"}
            src="/logo.svg" 
            alt="Quartz" 
            priority
            // Initial size values below are changed by css class
            width={115}
            height={45} 
        />
      </a>

      <div className={styles.navItems}>
        {wallet.publicKey && 
          <button 
            className={styles.notificationsButton}
            onClick={() => {}}
          >
            <Image 
                className={"image-fill"}
                src="/bell.svg" 
                alt="Notifications" 
                priority
                // Initial size values below are changed by css class
                width={30}
                height={30} 
            />
          </button>
        }
        
        <WalletButton 
            disableCloseAccount={!isAccountCreated}
        />
      </div>
    </div>
  );
}