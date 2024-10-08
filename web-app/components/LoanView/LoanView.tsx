import { ViewProps } from "@/app/dashboard/page";
import { MICRO_CENTS_PER_USDC } from "@/utils/constants";
import { depositUsdc } from "@/utils/instructions";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "./LoanView.module.css";

export default function LoanView({swapView, enableModal, disableModal} : ViewProps) {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const handleRepayUsdc = () => {
        enableModal({
            title: "Repay USDC Loan",
            denomination: "USDC",
            buttonText: "Repay",
            onConfirm: async (amount: number) => {
                if (!wallet) {
                    console.error("Error: Wallet not connected");
                    return;
                }
                const signature = await depositUsdc(wallet, connection, amount * MICRO_CENTS_PER_USDC);
                console.log(signature);
                if (signature) disableModal();
            },
            onCancel: () => { disableModal(); }
        })
    }

    return (
        <div>
            <div className={styles.balanceWrapper}>
                <div>
                    <p className={styles.title}>Total Assets</p>
                    <p className={styles.fiatAmount}>$0</p>
                    <p className={styles.subBalance}>0 SOL (+$0 /day)</p>
                </div>
                
                <div>
                    <p className={styles.title}>Loans</p>
                    <p className={styles.fiatAmount}>$0</p>
                    <p className={styles.subBalance}>USDT (+$0 /day)</p>
                </div>

                <div>
                    <p className={styles.title}>Net Balance</p>
                    <p className={styles.fiatAmount}>$0</p>
                    <p className={styles.subBalance}>After outstanding loans (+$0 /day)</p>
                </div>
            </div>

            <div className={styles.buttons}>
                <button onClick={handleRepayUsdc} className={"glass-button"}>Repay Loans</button>
                <button onClick={swapView} className={"glass-button ghost"}>Back to Dashboard</button>
            </div>
        </div>
    )
}