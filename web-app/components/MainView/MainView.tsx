import { ViewProps } from "@/app/dashboard/page";
import { MICRO_CENTS_PER_USDC } from "@/utils/constants";
import { depositLamports, withdrawLamports, withdrawUsdc } from "@/utils/instructions";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Image from "next/image";
import styles from "./MainView.module.css";

export default function MainView({swapView, enableModal, disableModal} : ViewProps) {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const handleDeposit = () => {
        enableModal({
            title: "Deposit SOL",
            denomination: "SOL",
            buttonText: "Deposit",
            onConfirm: async (amount: number) => {
                if (!wallet) {
                    console.error("Error: Wallet not connected");
                    return;
                }
                const signature = await depositLamports(wallet, connection, amount * LAMPORTS_PER_SOL);
                console.log(signature);
                if (signature) disableModal();
            },
            onCancel: () => { disableModal(); }
        })
    }

    const handleWithdraw = () => {
        enableModal({
            title: "Withdraw SOL",
            denomination: "SOL",
            buttonText: "Withdraw",
            onConfirm: async (amount: number) => {
                if (!wallet) {
                    console.error("Error: Wallet not connected");
                    return;
                }
                const signature = await withdrawLamports(wallet, connection, amount * LAMPORTS_PER_SOL);
                console.log(signature);
                if (signature) disableModal();
            },
            onCancel: () => { disableModal(); }
        })
    }

    const handleOfframp = () => {
        enableModal({
            title: "Offramp USDC",
            denomination: "USDC",
            buttonText: "Offramp",
            onConfirm: async (amount: number) => {
                if (!wallet) {
                    console.error("Error: Wallet not connected");
                    return;
                }
                const signature = await withdrawUsdc(wallet, connection, amount * MICRO_CENTS_PER_USDC);
                console.log(signature);
                if (signature) disableModal();
            },
            onCancel: () => { disableModal(); }
        })
    }

    return (
        <div>
            <div className={styles.balanceWrapper}>
                <p className={styles.title}>0 SOL</p>
                <div className={styles.mainBalance}>
                    <p className={styles.fiatAmount}>$0</p>
                    <p className={styles.subBalance}>+$0 /day</p>
                </div>
            </div>

            <div className={styles.buttons}>
                <div className={styles.buttonsRow}>
                    <button onClick={handleDeposit} className={"glass-button"}>Deposit SOL</button>
                    <button onClick={handleWithdraw} className={"glass-button"}>Withdraw SOL</button>
                </div>
                <button onClick={handleOfframp} className={"glass-button"}>
                    Off-ramp to USD
                    <Image 
                        src="/arrow.svg" 
                        alt="" 
                        width={22} 
                        height={22}
                    />
                </button>
                <button onClick={swapView} className={"glass-button ghost"}>Manage Loans</button>
            </div>
        </div>
    )
}