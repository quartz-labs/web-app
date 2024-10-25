import { WalletButton } from "../solana/solana-provider";
import Logo from "../Logo/Logo";
import styles from "./Account.module.css";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { closeAccount } from "@/utils/instructions";

export interface AccountProps {
    disableCloseAccount?: boolean
}

export default function Account({disableCloseAccount} : AccountProps) {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const onCloseAccount = () => {
        if (!connection || !wallet) return;
        closeAccount(wallet, connection);
    }

    return (
        <div className={styles.accountWrapper}>
            <Logo />
            <div className={styles.warningWrapper}>
                <p className={styles.warning}>Off-ramps temporarily disabled, click <a href="https://x.com/quartzpay/status/1849526071755960533" target="_blank">here</a> for more info</p>
                <WalletButton onCloseAccount={onCloseAccount} disableCloseAccount={disableCloseAccount ?? false} />
            </div>
      </div>
    )
}