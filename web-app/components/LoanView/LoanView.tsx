import { ViewProps } from "@/app/dashboard/page";
import { DECIMALS_USDC } from "@/utils/constants";
import { liquidateSol } from "@/utils/instructions";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "./LoanView.module.css";
import { getSign, roundToDecimalPlaces, roundToDecimalPlacesAbsolute, uiToBaseUnit } from "@/utils/helpers";
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
            title: "Repay USDC Loan with SOL Deposits",
            denomination: "USDC",
            buttonText: "Repay",
            minAmount: 0,
            onConfirm: async (amount: number) => {
                if (!wallet) return;

                const baseUnits = uiToBaseUnit(amount, DECIMALS_USDC).toNumber();
                const signature = await liquidateSol(wallet, connection, baseUnits);
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
                                USDC ({getSign(dailyUsdcChange)}${roundToDecimalPlacesAbsolute(dailyUsdcChange, 4)} /day)
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
                <button onClick={handleRepayUsdc} className={"glass-button"}>Repay Loan with Deposits</button>
                <button onClick={swapView} className={"glass-button ghost"}>Back to Dashboard</button>
            </div>
        </div>
    )
}