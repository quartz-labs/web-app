import { ViewProps } from "@/app/dashboard/page";
import styles from "./MainView.module.css";
import { getSign, truncateToDecimalPlaces, truncateToDecimalPlacesAbsolute } from "@/utils/helpers";
import { PuffLoader } from "react-spinners";
import React from "react";

interface MainViewProps extends ViewProps {
    handleDepositSol: () => void;
    handleWithdrawSol: () => void;
    handleWithdrawUSDC: () => void;
}

export default function MainView({ 
    solPrice, 
    totalSolBalance, 
    usdcLoanBalance, 
    solApy, 
    usdcApr, 
    swapView,
    handleDepositSol,
    handleWithdrawSol,
    handleWithdrawUSDC
}: MainViewProps) {
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
                            {getSign(dailyNetChange, CHANGE_DECIMAL_PRECISION)}${truncateToDecimalPlacesAbsolute(dailyNetChange, CHANGE_DECIMAL_PRECISION)} /day
                        </p>
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