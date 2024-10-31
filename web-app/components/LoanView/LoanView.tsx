import { ViewProps } from "@/app/dashboard/page";
import { DECIMALS_USDC } from "@/utils/constants";
import { depositUsdc, liquidateSol } from "@/utils/instructions";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "./LoanView.module.css";
import { getSign, truncateToDecimalPlaces, truncateToDecimalPlacesAbsolute, uiToBaseUnit } from "@/utils/helpers";
import { PuffLoader } from "react-spinners";
import { useError } from "@/context/error-provider";

export default function LoanView({
    solPrice,
    totalSolBalance,
    usdcLoanBalance,
    solDailyRate,
    usdcDailyRate,
    swapView
}: ViewProps) {
    // TODO - If only daily rates are null, just keep them loading and show balance
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
                                {truncateToDecimalPlaces(totalSolBalance, 5)} SOL ({getSign(dailySolChange)}${truncateToDecimalPlacesAbsolute(dailySolChange, 4)} /day)
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
                                USDC ({getSign(dailyUsdcChange)}${truncateToDecimalPlacesAbsolute(dailyUsdcChange, 4)} /day)
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
                                After outstanding loans ({getSign(dailyNetChange)}${truncateToDecimalPlacesAbsolute(dailyNetChange, 4)} /day)
                            </p>
                        </div>
                    }
                </div>
            </div>

            <div className={styles.buttons}>
                <button onClick={handleLiquidateForUsdc} className={"glass-button"}>Repay Loan with Collateral</button>
                <button onClick={handleRepayUsdc} className={"glass-button"}>Repay Loan with USDC</button>
                <button onClick={swapView} className={"glass-button ghost"}>Back to Dashboard</button>
            </div>
        </div>
    )
}