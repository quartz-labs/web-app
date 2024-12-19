import { useEffect } from "react";
import { useState } from "react";
import styles from "./Balances.module.css";
import { calculateBalances, calculateBalanceDollarValues, calculateRateChanges, plusOrMinus, formatDollarValue } from "@/utils/helpers";
import { useStore } from "@/utils/store";

export default function Balances() {
    const { isInitialized, prices, balances, rates } = useStore(); 

    const [netBalance, setNetBalance] = useState<[string, string]>(["0", "00"]);
    const [loanBalance, setLoanBalance] = useState<[string, string]>(["0", "00"]);
    const [collateralBalance, setCollateralBalance] = useState<[string, string]>(["0", "00"]);
    const [netRate, setNetRate] = useState<number>(0);
    const [loanRate, setLoanRate] = useState<number>(0);
    const [collateralRate, setCollateralRate] = useState<number>(0);

    const displayBalances = isInitialized && prices && balances;

    useEffect(() => {
        if (!balances || !prices) return;
        const balanceValues = calculateBalanceDollarValues(prices, balances);

        const { collateralBalance, loanBalance, netBalance } = calculateBalances(balanceValues);
        setCollateralBalance(formatDollarValue(collateralBalance, 2));
        setLoanBalance(formatDollarValue(loanBalance, 2));
        setNetBalance(formatDollarValue(netBalance, 2));

        if (!rates) return;
        const { netRate, loanRate, collateralRate } = calculateRateChanges(balanceValues, rates);
        setNetRate(netRate);
        setLoanRate(loanRate);
        setCollateralRate(collateralRate);
    }, [prices, balances, rates]);

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
                            ${netBalance[0]}<span className={styles.netBalanceDecimal}>.{netBalance[1]}</span>
                        </p>
                        <p className={`${styles.rateHeight} ${netRateClass}`}>{plusOrMinus(netRate, "$")} /day</p>
                    </>
                )}
                {!displayBalances && (
                    <p className={`${styles.netBalance} ${styles.notInitialized}`}>
                        $--<span className={styles.netBalanceDecimal}>.--</span>
                    </p>
                )}
            </div>

            <div>
                <h2 className={styles.detailBalanceTitle}>Loan</h2>
                {displayBalances && (
                    <>
                        <p className={styles.detailBalance}>    
                            ${loanBalance[0]}<span className={styles.detailBalanceDecimal}>.{loanBalance[1]}</span>
                        </p>
                        <p className={`${styles.detailBalanceRate} ${styles.rateHeight}`}>{plusOrMinus(loanRate)} /day</p>
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

            <div>
                <h2 className={styles.detailBalanceTitle}>Total Collateral</h2>
                {displayBalances && (
                    <>
                        <p className={styles.detailBalance}>
                            ${collateralBalance[0]}<span className={styles.detailBalanceDecimal}>.{collateralBalance[1]}</span>
                        </p>
                        <p className={`${styles.detailBalanceRate} ${styles.rateHeight}`}>{plusOrMinus(collateralRate)} /day</p>
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