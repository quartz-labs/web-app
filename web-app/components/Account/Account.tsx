import { WalletButton } from "../solana/solana-provider";
import Logo from "../Logo/Logo";
import styles from "./Account.module.css";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { closeAccount } from "@/utils/instructions";

export default function Account() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const onCloseAccount = () => {
        if (!connection || !wallet) return;
        closeAccount(wallet, connection);
    }

    return (
        <div className={styles.accountWrapper}>
            <Logo />
            <WalletButton onCloseAccount={onCloseAccount} />
      </div>
    )
}