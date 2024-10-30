import { ViewProps } from "@/app/dashboard/page";
import { depositLamports, withdrawLamports, withdrawUsdc } from "@/utils/instructions";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import Image from "next/image";
import styles from "./MainView.module.css";
import { getSign, truncateToDecimalPlaces, truncateToDecimalPlacesAbsolute, uiToBaseUnit } from "@/utils/helpers";
import { PuffLoader } from "react-spinners";
import React from "react";
import { DECIMALS_SOL, DECIMALS_USDC } from "@/utils/constants";
import { useError } from "@/context/error-provider";

export default function MainView({ 
    solPrice, 
    totalSolBalance, 
    usdcLoanBalance, 
    solDailyRate, 
    usdcDailyRate, 
    swapView, 
    enableModal, 
    disableModal, 
    updateBalance,
    //enableOfframpModal 
}: ViewProps) {
    const { connection } = useConnection();
    const { showError } = useError();
    const wallet = useAnchorWallet();

    const balanceLoaded = (solPrice !== null && totalSolBalance !== null && usdcLoanBalance !== null && solDailyRate !== null && usdcDailyRate !== null);
    solPrice = solPrice ?? 0;
    totalSolBalance = totalSolBalance ?? 0;
    usdcLoanBalance = usdcLoanBalance ?? 0;
    solDailyRate = solDailyRate ?? 0;
    usdcDailyRate = usdcDailyRate ?? 0;

    const netSolBalance = ((totalSolBalance * solPrice) - usdcLoanBalance) / solPrice;
    const dailySolChange = totalSolBalance * solDailyRate * solPrice;
    const dailyUsdcChange = usdcLoanBalance * usdcDailyRate;
    const dailyNetChange = dailySolChange - dailyUsdcChange;

    const handleDeposit = () => {
        enableModal({
            title: "Deposit SOL",
            denomination: "SOL",
            buttonText: "Deposit",
            minAmount: 0,
            maxAmount: null,
            onConfirm: async (amount: number) => {
                if (!wallet) return;

                const baseUnits = uiToBaseUnit(amount, DECIMALS_SOL).toNumber();
                const signature = await depositLamports(wallet, connection, baseUnits, showError);
                if (!signature) return;

                updateBalance(signature);
                disableModal();
            },
            onCancel: () => { disableModal(); },
            extraInfo: <p >${solPrice * } <span className="tiny-text">({solDailyRate * 365}% APY)</span></p>
        })
    }

    const handleWithdraw = () => {
        enableModal({
            title: "Withdraw SOL",
            denomination: "SOL",
            buttonText: "Withdraw",
            minAmount: 0,
            maxAmount: null,
            onConfirm: async (amount: number) => {
                if (!wallet) return;

                const baseUnits = uiToBaseUnit(amount, DECIMALS_SOL).toNumber();
                const signature = await withdrawLamports(wallet, connection, baseUnits, showError);
                if (!signature) return;
                
                updateBalance(signature);
                disableModal();
            },
            onCancel: () => { disableModal(); },
            onSetMax: () => {return netSolBalance.toString()}
        })
    }

    const handleWithdrawUSDC = () => {
        enableModal({
            title: "Withdraw USDC",
            denomination: "USDC",
            buttonText: "Withdraw",
            minAmount: 0,
            maxAmount: null,
            onConfirm: async (amount: number) => {
                if (!wallet) return;

                const baseUnits = uiToBaseUnit(amount, DECIMALS_USDC).toNumber();
                const signature = await withdrawUsdc(wallet, connection, baseUnits, showError);
                if (!signature) return;

                updateBalance(signature);
                disableModal();
            },
            onCancel: () => { disableModal(); }
        })
    }

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
                        />
                    </div>
                </div>
            }

            {balanceLoaded &&
                <div className={styles.balanceWrapper}>
                    <p className={styles.title}>
                        {truncateToDecimalPlaces(netSolBalance, 5)} SOL
                    </p>
                    <div className={styles.mainBalance}>
                        <p className={styles.fiatAmount}>
                            ${(netSolBalance * solPrice).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className={styles.subBalance}>
                            {getSign(dailyNetChange)}${truncateToDecimalPlacesAbsolute(dailyNetChange, 4)} /day
                        </p>
                    </div>
                </div>
            }

            <div className={styles.buttons}>
                <div className={styles.buttonsRow}>
                    <button onClick={handleDeposit} className={"glass-button"}>Deposit SOL</button>
                    <button onClick={handleWithdraw} className={"glass-button"}>Withdraw SOL</button>
                </div>
                <button onClick={handleWithdrawUSDC} className={"glass-button"}>
                    Withdraw USDC
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