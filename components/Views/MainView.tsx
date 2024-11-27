import { ViewProps } from "@/app/dashboard/page";
import styles from "./View.module.css";
import { baseUnitToUi, getSign, truncateToDecimalPlaces, truncateToDecimalPlacesAbsolute } from "@/utils/helpers";
import { PuffLoader } from "react-spinners";
import React from "react";
import { DECIMALS_SOL, DECIMALS_USDC } from "@/utils/constants";

interface MainViewProps extends ViewProps {
    handleDepositSol: () => void;
    handleWithdrawSol: () => void;
    handleWithdrawUSDC: () => void;
}

export default function MainView({ 
    solPrice,
    balance,
    balanceStale,
    rates,
    swapView,
    handleDepositSol,
    handleWithdrawSol,
    handleWithdrawUSDC
}: MainViewProps) {
    const DAYS_IN_YEAR = 365;
    const CHANGE_DECIMAL_PRECISION = 4;

    const loadingBalance = (balanceStale || !balance);

    solPrice = solPrice ?? 0;

    let netSolBalance = 0;
    let dailySolChange = 0;
    let dailyUsdcChange = 0;

    if (balance && solPrice > 0) {
        const solBalanceUi = Number(baseUnitToUi(balance.lamports, DECIMALS_SOL));
        const usdcBalanceUi = Number(baseUnitToUi(balance.usdc, DECIMALS_USDC));

        netSolBalance = ((solBalanceUi * solPrice) - usdcBalanceUi) / solPrice;

        if (rates) {
            dailySolChange = solBalanceUi * (rates.lamports / DAYS_IN_YEAR) * solPrice;
            dailyUsdcChange = usdcBalanceUi * (rates.usdc / DAYS_IN_YEAR);
        }
    }

    const dailyNetChange = dailySolChange - dailyUsdcChange;

    return (
        <div className="dashboard-wrapper">
            {loadingBalance &&
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

            {!loadingBalance &&
                <div className={styles.balanceWrapper}>
                    <div>
                        <p className={styles.title}>
                            {truncateToDecimalPlaces(netSolBalance, 5)} SOL
                        </p>
                        <div className={styles.mainBalance}>
                            <p className={styles.fiatAmount}>
                                ${(netSolBalance * solPrice).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            {rates &&
                                <p className={styles.subBalance}>
                                    {getSign(dailyNetChange, CHANGE_DECIMAL_PRECISION)}${truncateToDecimalPlacesAbsolute(dailyNetChange, CHANGE_DECIMAL_PRECISION)} /day
                                </p>
                            }
                        </div>
                    </div>
                </div>
            }

            <div className={styles.buttons}>
                <div className={styles.buttonsRow}>
                    <button onClick={handleDepositSol} className={"glass-button"}>Deposit SOL</button>
                    <button onClick={handleWithdrawSol} className={"glass-button"}>Withdraw SOL</button>
                </div>
                <button onClick={handleWithdrawUSDC} className={"glass-button"}>
                    Withdraw USDC
                    {/* <Image
                        src="/arrow.svg"
                        alt=""
                        width={22}
                        height={22}
                    /> */}
                </button>
                <button onClick={swapView} className={"glass-button ghost"}>Manage Loans</button>
            </div>
        </div>
    )
}