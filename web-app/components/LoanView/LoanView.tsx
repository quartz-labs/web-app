import { ViewProps } from "@/app/dashboard/page";
import styles from "./LoanView.module.css";
import { getSign, truncateToDecimalPlaces, truncateToDecimalPlacesAbsolute } from "@/utils/helpers";
import { PuffLoader } from "react-spinners";

interface LoanViewProps extends ViewProps {
    handleRepayUsdc: () => void;
    handleRepayUsdcWithCollateral: () => void;
}

export default function LoanView({
    solPrice,
    totalSolBalance,
    usdcLoanBalance,
    solApy,
    usdcApr,
    swapView,
    handleRepayUsdc,
    handleRepayUsdcWithCollateral
}: LoanViewProps) {
    // TODO - If only daily rates are null, just keep them loading and show balance
    const balanceLoaded = (solPrice !== null && totalSolBalance !== null && usdcLoanBalance !== null && solApy !== null && usdcApr !== null);
    solPrice = solPrice ?? 0;
    totalSolBalance = totalSolBalance ?? 0;
    usdcLoanBalance = usdcLoanBalance ?? 0;
    solApy = solApy ?? 0;
    usdcApr = usdcApr ?? 0;

    const netSolBalance = ((totalSolBalance * solPrice) - usdcLoanBalance) / solPrice;
    const dailySolChange = totalSolBalance * (solApy / 365) * solPrice;
    const dailyUsdcChange = usdcLoanBalance * (usdcApr / 365);
    const dailyNetChange = dailySolChange - dailyUsdcChange;

    const CHANGE_DECIMAL_PRECISION = 4;

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
                                {truncateToDecimalPlaces(totalSolBalance, 5)} SOL ({getSign(dailySolChange, CHANGE_DECIMAL_PRECISION)}${truncateToDecimalPlacesAbsolute(dailySolChange, CHANGE_DECIMAL_PRECISION)} /day)
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
                                USDC ({getSign(dailyUsdcChange, CHANGE_DECIMAL_PRECISION)}${truncateToDecimalPlacesAbsolute(dailyUsdcChange, CHANGE_DECIMAL_PRECISION)} /day)
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
                                After outstanding loans ({getSign(dailyNetChange, CHANGE_DECIMAL_PRECISION)}${truncateToDecimalPlacesAbsolute(dailyNetChange, CHANGE_DECIMAL_PRECISION)} /day)
                            </p>
                        </div>
                    }
                </div>
            </div>

            <div className={styles.buttons}>
                <button onClick={handleRepayUsdcWithCollateral} className={"glass-button"}>Repay Loan with Collateral</button>
                <button onClick={handleRepayUsdc} className={"glass-button"}>Repay Loan with USDC</button>
                <button onClick={swapView} className={"glass-button ghost"}>Back to Dashboard</button>
            </div>
        </div>
    )
}