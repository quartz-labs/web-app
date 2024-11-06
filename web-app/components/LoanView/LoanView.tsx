import { ViewProps } from "@/app/dashboard/page";
import styles from "./LoanView.module.css";
import { baseUnitToUi, getSign, truncateToDecimalPlaces, truncateToDecimalPlacesAbsolute } from "@/utils/helpers";
import { PuffLoader } from "react-spinners";
import { DECIMALS_SOL, DECIMALS_USDC } from "@/utils/constants";

interface LoanViewProps extends ViewProps {
    handleRepayUsdc: () => void;
    handleRepayUsdcWithCollateral: () => void;
}

export default function LoanView({
    solPrice,
    accountData,
    swapView,
    handleRepayUsdc,
    handleRepayUsdcWithCollateral,
}: LoanViewProps) {
    solPrice = solPrice ?? 0;

    let netSolBalance = 0;
    let dailySolChange = 0;
    let dailyUsdcChange = 0;

    if (accountData) {
        netSolBalance = ((Number(baseUnitToUi(accountData.solBalanceBaseUnits, DECIMALS_SOL)) * solPrice) - Number(baseUnitToUi(accountData.usdcBalanceBaseUnits, DECIMALS_USDC))) / solPrice;
        dailySolChange = Number(baseUnitToUi(accountData.solBalanceBaseUnits, DECIMALS_SOL)) * (accountData.solRate / 365) * solPrice;
        dailyUsdcChange = Number(baseUnitToUi(accountData.usdcBalanceBaseUnits, DECIMALS_USDC)) * (accountData.usdcRate / 365);
    }

    const dailyNetChange = dailySolChange - dailyUsdcChange;

    const CHANGE_DECIMAL_PRECISION = 4;

    return (
        <div className="dashboard-wrapper">
            <div className={styles.balanceWrapper}>
                <div>
                    <p className={styles.title}>Total Assets</p>

                    {!accountData &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={50}
                            aria-label="Loading"
                            data-testid="loader"
                            className={styles.loader}
                        />
                    }

                    {accountData &&
                        <div>
                            <p className={styles.fiatAmount}>
                                ${(Number(baseUnitToUi(accountData.solBalanceBaseUnits, DECIMALS_SOL)) * solPrice).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className={styles.subBalance}>
                                {truncateToDecimalPlaces(Number(baseUnitToUi(accountData.solBalanceBaseUnits, DECIMALS_SOL)), 5)} SOL ({getSign(dailySolChange, CHANGE_DECIMAL_PRECISION)}${truncateToDecimalPlacesAbsolute(dailySolChange, CHANGE_DECIMAL_PRECISION)} /day)
                            </p>
                        </div>
                    }
                </div>

                <div>
                    <p className={styles.title}>Loans {(accountData !== null) && <span>(Health: {accountData.health}%)</span>}</p>

                    {!accountData &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={50}
                            aria-label="Loading"
                            data-testid="loader"
                            className={styles.loader}
                        />
                    }

                    {accountData &&
                        <div>
                            <p className={styles.fiatAmount}>
                                ${Number(baseUnitToUi(accountData.usdcBalanceBaseUnits, DECIMALS_USDC)).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className={styles.subBalance}>
                                USDC ({getSign(dailyUsdcChange, CHANGE_DECIMAL_PRECISION)}${truncateToDecimalPlacesAbsolute(dailyUsdcChange, CHANGE_DECIMAL_PRECISION)} /day)
                            </p>
                        </div>
                    }
                </div>

                <div>
                    <p className={styles.title}>Net Balance</p>

                    {!accountData &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={50}
                            aria-label="Loading"
                            data-testid="loader"
                            className={styles.loader}
                        />
                    }

                    {accountData &&
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