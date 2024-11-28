import { ViewProps } from "@/app/dashboard/page";
import styles from "./View.module.css";
import { baseUnitToUi, getSign, truncateToDecimalPlaces, truncateToDecimalPlacesAbsolute } from "@/utils/helpers";
import { PuffLoader } from "react-spinners";
import { DECIMALS_SOL, DECIMALS_USDC } from "@/utils/constants";

interface LoanViewProps extends ViewProps {
    health?: number;
    handleRepayUsdc: () => void;
    handleRepayUsdcWithCollateral: () => void;
    handleTelegram: () => void;
}

export default function LoanView({
    solPrice,
    balance,
    rates,
    health,
    swapView,
    handleRepayUsdc,
    handleRepayUsdcWithCollateral,
    handleTelegram
}: LoanViewProps) {
    const DAYS_IN_YEAR = 365;
    const CHANGE_DECIMAL_PRECISION = 4;

    solPrice = solPrice ?? 0;

    let solBalanceUi = 0;
    let usdcBalanceUi = 0;
    let netSolBalance = 0;
    let dailySolChange = 0;
    let dailyUsdcChange = 0;

    if (balance && solPrice > 0) {
        solBalanceUi = Number(baseUnitToUi(balance.lamports, DECIMALS_SOL));
        usdcBalanceUi = Number(baseUnitToUi(balance.usdc, DECIMALS_USDC));

        netSolBalance = ((solBalanceUi * solPrice) - usdcBalanceUi) / solPrice;

        if (rates) {
            dailySolChange = solBalanceUi * (rates.lamports / DAYS_IN_YEAR) * solPrice;
            dailyUsdcChange = usdcBalanceUi * (rates.usdc / DAYS_IN_YEAR);
        }
    }

    const dailyNetChange = dailySolChange - dailyUsdcChange;

    return (
        <div className="dashboard-wrapper">
            <div className={`${styles.balanceWrapper} ${styles.loanViewWrapper}`}>
                <div>
                    <p className={styles.title}>Total Asset Value</p>

                    {!balance &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={50}
                            aria-label="Loading"
                            data-testid="loader"
                            className={styles.loader}
                        />
                    }

                    {balance &&
                        <div>
                            <p className={styles.fiatAmount}>
                                ${(solBalanceUi * solPrice).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className={styles.subBalance}>
                                {truncateToDecimalPlaces(solBalanceUi, 5)} SOL {rates && 
                                    <span>
                                        ({getSign(dailySolChange, CHANGE_DECIMAL_PRECISION)}${truncateToDecimalPlacesAbsolute(dailySolChange, CHANGE_DECIMAL_PRECISION)} /day)
                                    </span>
                                }
                            </p>
                        </div>
                    }
                </div>

                <div>
                    <p className={styles.title}>Loans {health !== undefined && <span>(Health: {health}%)</span>}</p>

                    {!balance &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={50}
                            aria-label="Loading"
                            data-testid="loader"
                            className={styles.loader}
                        />
                    }

                    {balance &&
                        <div>
                            <p className={styles.fiatAmount}>
                                ${usdcBalanceUi.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className={styles.subBalance}>
                                USDC {rates &&
                                    <span>
                                        ({getSign(dailyUsdcChange, CHANGE_DECIMAL_PRECISION)}${truncateToDecimalPlacesAbsolute(dailyUsdcChange, CHANGE_DECIMAL_PRECISION)} /day)
                                    </span>
                                }
                            </p>
                        </div>
                    }
                </div>

                <div>
                    <p className={styles.title}>Net Balance</p>

                    {!balance &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={50}
                            aria-label="Loading"
                            data-testid="loader"
                            className={styles.loader}
                        />
                    }

                    {balance &&
                        <div>
                            <p className={styles.fiatAmount}>
                                ${(netSolBalance * solPrice).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className={styles.subBalance}>
                                After outstanding loans {rates &&
                                    <span>
                                        ({getSign(dailyNetChange, CHANGE_DECIMAL_PRECISION)}${truncateToDecimalPlacesAbsolute(dailyNetChange, CHANGE_DECIMAL_PRECISION)} /day)
                                    </span>
                                }
                            </p>
                        </div>
                    }
                </div>
            </div>

            <div className={styles.buttons}>
                <div className={styles.buttonsRow}>
                    <button onClick={handleRepayUsdcWithCollateral} className={"glass-button"}>Collateral Repay</button>
                    <button onClick={handleRepayUsdc} className={"glass-button"}>USDC Repay</button>
                </div>
                <button onClick={handleTelegram} className={"glass-button"}>Account Health Notifications</button>
                <button onClick={swapView} className={"glass-button ghost"}>Back to Dashboard</button>
            </div>
        </div>
    )
}