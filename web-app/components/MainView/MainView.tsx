import { ViewProps } from "@/app/dashboard/page";
import { MICRO_CENTS_PER_USDC } from "@/utils/constants";
import { depositLamports, withdrawLamports, withdrawUsdt } from "@/utils/instructions";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Image from "next/image";
import styles from "./MainView.module.css";
import { getSign, roundToDecimalPlaces, roundToDecimalPlacesAbsolute } from "@/utils/utils";
import { PuffLoader } from "react-spinners";
import React from "react";

export default function MainView({ 
    solPrice, 
    totalSolBalance, 
    usdcLoanBalance, 
    solDailyRate, 
    usdcDailyRate, 
    balanceLoaded,
    swapView, 
    enableModal, 
    disableModal, 
    enableOfframpModal 
}: ViewProps) {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const handleDeposit = () => {
        enableModal({
            title: "Deposit SOL",
            denomination: "SOL",
            buttonText: "Deposit",
            minAmount: 0,
            onConfirm: async (amount: number) => {
                if (!wallet) return;

                const signature = await depositLamports(wallet, connection, amount * LAMPORTS_PER_SOL);
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
            minAmount: 0,
            onConfirm: async (amount: number) => {
                if (!wallet) return;

                const signature = await withdrawLamports(wallet, connection, amount * LAMPORTS_PER_SOL);
                if (signature) disableModal();
            },
            onCancel: () => { disableModal(); }
        })
    }

    const handleOfframp = () => {
        enableModal({
            title: "Off-ramp to USD",
            denomination: "USD",
            buttonText: "Off-ramp",
            minAmount: 0,
            onConfirm: async (amount: number) => {
                if (!wallet) return;

                const signature = await withdrawUsdt(wallet, connection, amount * MICRO_CENTS_PER_USDC);
                if (!signature) return;

                const amountTrunc = amount.toFixed(2);
                const url = `https://exchange.mercuryo.io/?widget_id=52148ead-2e7d-4f05-8f98-426f20ab2e74&fiat_currency=USD&currency=USDT&network=SOLANA&amount=${amountTrunc}&type=sell`;
                enableOfframpModal(url);
                window.open(url, "_blank", "noopener,noreferrer");
            },
            onCancel: () => { disableModal(); }
        })
    }

    const netSolBalance = ((totalSolBalance * solPrice) - usdcLoanBalance) / solPrice;
    const dailySolChange = totalSolBalance * solDailyRate * solPrice;
    const dailyUsdcChange = usdcLoanBalance * usdcDailyRate;
    const dailyNetChange = dailySolChange - dailyUsdcChange;

    return (
        <div className="dashboard-wrapper">
            {!balanceLoaded &&
                <div className={styles.balanceWrapper}>
                    <div className={styles.loadingBalance}>
                        <p className={`${styles.fiatAmount} ${styles.smallMargin}`}>$</p>
                        <PuffLoader
                            color={"#ffffff"}
                            size={50}
                            aria-label="Loading"
                            data-testid="loader"
                            className={styles.loader}
                        />
                    </div>
                </div>
            }

            {balanceLoaded &&
                <div className={styles.balanceWrapper}>
                    <p className={styles.title}>
                        {roundToDecimalPlaces(netSolBalance, 4)} SOL
                    </p>
                    <div className={styles.mainBalance}>
                        <p className={styles.fiatAmount}>
                            ${(netSolBalance * solPrice).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className={styles.subBalance}>
                            {getSign(dailyNetChange)}${roundToDecimalPlacesAbsolute(dailyNetChange, 4)} /day
                        </p>
                    </div>
                </div>
            }

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