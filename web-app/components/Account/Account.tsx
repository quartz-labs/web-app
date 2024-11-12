import { WalletButton } from "../../context/solana/solana-provider";
import Logo from "../Logo/Logo";
import styles from "./Account.module.css";

export interface AccountProps {
    onCloseAccount?: () => void;
}

export default function Account({onCloseAccount} : AccountProps) {
    const disableCloseAccount = (onCloseAccount === undefined);

    return (
        <div className={styles.accountWrapper}>
            <Logo />
            
            <div className={styles.warningWrapper}>
                <p className={styles.warning}>Off-ramps are temporarily disabled, click <a href="https://x.com/quartzpay/status/1849526071755960533" target="_blank">here</a> for more info</p>
                <WalletButton onCloseAccount={onCloseAccount} disableCloseAccount={disableCloseAccount} />
            </div>
        </div>
    )
}