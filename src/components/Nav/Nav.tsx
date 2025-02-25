import Image from "next/image";
import styles from "./Nav.module.css";
import { WalletButton } from "@/src/context/solana/solana-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { TailSpin } from "react-loader-spinner";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useStore } from "@/src/utils/store";

export interface NavProps {
  isAccountInitialized: boolean;
  isAccountStatusLoading: boolean;
}

export default function Nav({ 
  isAccountInitialized,
  isAccountStatusLoading
}: NavProps) {
  const wallet = useWallet();
  const { setModalVariation } = useStore();

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
        {isAccountStatusLoading && 
          <TailSpin
            height="100%"
            width="100%"
            color="#ffffffA5"
            ariaLabel="loading-spinner"
            wrapperClass={styles.loadingSpinner}
          />
        }

        {wallet.publicKey && isAccountInitialized &&
          <button 
            className={styles.notificationsButton}
            onClick={() => {
              console.log("clicked");
              setModalVariation(ModalVariation.NOTIFICATIONS)}
          }
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
            disableCloseAccount={!isAccountInitialized}
            onCloseAccount={() => setModalVariation(ModalVariation.CLOSE_ACCOUNT)}
        />
      </div>
    </div>
  );
}