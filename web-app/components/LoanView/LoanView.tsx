import { ViewProps } from "@/app/dashboard/page";
import { MICRO_CENTS_PER_USDC } from "@/utils/constants";
import { depositUsdt, liquidateSol } from "@/utils/instructions";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "./LoanView.module.css";
import { getSign, roundToDecimalPlaces, roundToDecimalPlacesAbsolute } from "@/utils/utils";
import { PuffLoader } from "react-spinners";

export default function LoanView ({
    solPrice, 
    totalSolBalance, 
    usdcLoanBalance, 
    solDailyRate, 
    usdcDailyRate, 
    balanceLoaded,
    swapView, 
    enableModal, 
    disableModal,
    updateBalance
} : ViewProps) {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const handleRepayUsdc = () => {
        enableModal({
            title: "Repay USDT Loan",
            denomination: "USDT",
            buttonText: "Repay",
            minAmount: 0,
            onConfirm: async (amount: number) => {
                if (!wallet) return;

                const signature = await depositUsdt(wallet, connection, amount * MICRO_CENTS_PER_USDC);
                // const amountLamports = 0;
                // const amountMicroCents = 0;
                // const signature = await liquidateSol(wallet, connection, amountLamports, amountMicroCents);
                if (signature) {
                    updateBalance();
                    disableModal();
                }
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
            <div className={styles.balanceWrapper}>
                <div>
                    <p className={styles.title}>Total Assets</p>

                    {!balanceLoaded &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={50}
                            aria-label="Loading"
                            data-testid="loader"
                            className={styles.loader}
                        />
                    }

                    {balanceLoaded &&         
                        <div>            
                            <p className={styles.fiatAmount}>
                                ${(totalSolBalance * solPrice).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className={styles.subBalance}>
                                {roundToDecimalPlaces(totalSolBalance, 4)} SOL ({getSign(dailySolChange)}${roundToDecimalPlacesAbsolute(dailySolChange, 4)} /day)
                            </p>
                        </div>  
                    }
                </div>
                
                <div>
                    <p className={styles.title}>Loans</p>

                    {!balanceLoaded &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={50}
                            aria-label="Loading"
                            data-testid="loader"
                            className={styles.loader}
                        />
                    }

                    {balanceLoaded &&         
                        <div>
                            <p className={styles.fiatAmount}>
                                ${usdcLoanBalance.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className={styles.subBalance}>
                                USDT ({getSign(dailyUsdcChange)}${roundToDecimalPlacesAbsolute(dailyUsdcChange, 4)} /day)
                            </p>
                        </div>
                    }
                </div>

                <div>
                    <p className={styles.title}>Net Balance</p>

                    {!balanceLoaded &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={50}
                            aria-label="Loading"
                            data-testid="loader"
                            className={styles.loader}
                        />
                    }

                    {balanceLoaded &&  
                        <div> 
                            <p className={styles.fiatAmount}>
                                ${(netSolBalance * solPrice).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className={styles.subBalance}>
                                After outstanding loans ({getSign(dailyNetChange)}${roundToDecimalPlacesAbsolute(dailyNetChange, 4)} /day)
                            </p>
                        </div>
                    }
                </div>
            </div>

            <div className={styles.buttons}>
                <button onClick={handleRepayUsdc} className={"glass-button"}>Repay Loans</button>
                <button onClick={swapView} className={"glass-button ghost"}>Back to Dashboard</button>
            </div>
        </div>
    )
}