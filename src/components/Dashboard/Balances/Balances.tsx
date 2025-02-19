import { useEffect } from "react";
import { useState } from "react";
import styles from "./Balances.module.css";
import { calculateBalances, calculateBalanceDollarValues, calculateRateChanges, plusOrMinus, formatDollarValue } from "@/src/utils/helpers";
import { useStore } from "@/src/utils/store";
import { baseUnitToDecimal, MARKET_INDEX_USDC } from "@quartz-labs/sdk";

export default function Balances() {
    const { isInitialized, prices, balances, rates, borrowLimits } = useStore(); 

    const [collateralBalance, setCollateralBalance] = useState<[string, string]>(["0", "00"]);
    const [netRate, setNetRate] = useState<number>(0);
    const [collateralRate, setCollateralRate] = useState<number>(0);

    const displayBalances = isInitialized && prices !== undefined && balances !== undefined;

    useEffect(() => {
        if (!balances || !prices) return;
        const balanceValues = calculateBalanceDollarValues(prices, balances);

        const { collateralBalance } = calculateBalances(balanceValues);
        setCollateralBalance(formatDollarValue(collateralBalance, 2));

        if (!rates) return;
        const { netRate, collateralRate } = calculateRateChanges(balanceValues, rates);
        setNetRate(netRate);
        setCollateralRate(collateralRate);
    }, [prices, balances, rates]);

    const usdcBorrowLimitBaseUnits = borrowLimits?.[MARKET_INDEX_USDC] ?? 0;
    const availableCredit = formatDollarValue(
        baseUnitToDecimal(usdcBorrowLimitBaseUnits, MARKET_INDEX_USDC),
        2
    );

    const netRateClass = netRate > 0 
        ? styles.netRatePositive 
        : netRate < 0 
            ? styles.netRateNegative 
            : "";

    return (
        <div className={styles.balanceOverview}>
            <div className={styles.netBalanceWrapper}>
                {displayBalances && (
                    <>
                        <p className={styles.netBalance}>
                            ${availableCredit[0]}<span className={styles.netBalanceDecimal}>.{availableCredit[1]}</span>
                        </p>
                        {rates !== undefined && (
                            <p className={`${styles.rateHeight} ${netRateClass}`}>{plusOrMinus(netRate, "$")} /day</p>
                        )}
                    </>
                )}
                {!displayBalances && (
                    <p className={`${styles.netBalance} ${styles.notInitialized}`}>
                        $--<span className={styles.netBalanceDecimal}>.--</span>
                    </p>
                )}
            </div>

            <div className={styles.detailBalanceWrapper}>
                <h2 className={styles.detailBalanceTitle}>Total Collateral</h2>
                {displayBalances && (
                    <>
                        <p className={styles.detailBalance}>
                            ${collateralBalance[0]}<span className={styles.detailBalanceDecimal}>.{collateralBalance[1]}</span>
                        </p>
                        {rates !== undefined && (
                            <p className={`${styles.detailBalanceRate} ${styles.rateHeight}`}>{plusOrMinus(collateralRate, "$")} /day</p>
                        )}
                    </>
                )}
                {!displayBalances && (
                    <>
                        <p className={`${styles.detailBalance} ${styles.notInitialized}`}>
                            $--<span className={styles.detailBalanceDecimal}>.--</span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}