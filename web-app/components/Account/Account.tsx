import { WalletButton } from "../solana/solana-provider";
import Logo from "../Logo/Logo";
import styles from "./Account.module.css";

export default function Account() {
    return (
        <div className={styles.accountWrapper}>
            <Logo />

            <WalletButton />
      </div>
    )
}