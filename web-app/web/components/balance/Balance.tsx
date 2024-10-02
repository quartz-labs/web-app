"use client";

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "./Balance.module.css";
import { getSolDailyEarnRate, getUsdcDailyBorrowRate, isVaultInitialized, roundToDecimalPlaces } from "@/utils/utils";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getVault } from "@/utils/getPDAs";

export default function Balance() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const [detailedView, setDetailedView] = useState(false);
    const [rentExemptionThreshold, setRentExemptionThreshold] = useState(0);

    const [solBalance, setSolBalance] = useState(0);
    const [solPrice, setSolPrice] = useState(0);
    // TODO - Get USDC loan balance
    const [usdcLoanBalance, setUsdcLoanBalance] = useState(0);

    const [solDailyEarnRate, setSolDailyEarnRate] = useState(0.07);
    const [usdcDailyBorrowRate, setUsdcDailyBorrowRate] = useState(0);


    const updateFinancialData = async () => {
        try {
            const response = await fetch('/api/solana-price');
            const data = await response.json();
            setSolPrice(data.solana.usd);

            setSolDailyEarnRate(await getSolDailyEarnRate());
            setUsdcDailyBorrowRate(await getUsdcDailyBorrowRate());
        } catch {
            console.error("Error: Unable to reach CoinGecko for price data");
        }
    }

    useEffect(() => {
        updateFinancialData();
        const interval = setInterval(updateFinancialData, 10000);

        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        const updateBalance = async () => {
            if (!connection || !wallet || !await isVaultInitialized(wallet, connection)) {
                console.error("Wallet, connection or PDA not found");
                return;
            }

            try {
                const [vault, _] = getVault(wallet.publicKey);
                
                const vaultAccount = await connection.getAccountInfo(vault);
                if (vaultAccount) {
                    const requiredRent = await connection.getMinimumBalanceForRentExemption(vaultAccount.data.length);
                    setRentExemptionThreshold(requiredRent);

                    const vaultBalance = vaultAccount.lamports - requiredRent;
                    setSolBalance(vaultBalance / LAMPORTS_PER_SOL);
                    updateFinancialData();
                }

                connection.onAccountChange(
                    vault,
                    updatedAccountInfo => {
                        const vaultBalance = updatedAccountInfo.lamports - rentExemptionThreshold;
                        setSolBalance(vaultBalance / LAMPORTS_PER_SOL);
                    },
                    "confirmed"
                );
            } catch (error) {
                console.error("Failed to retreive account info: ", error);
            }
        }
        updateBalance();
    }, [wallet, rentExemptionThreshold]);

    // TODO - If collateralized SOL is not earning, this calculation must be adjusted as it assumes all SOL is earning yield
    const dailySolChange = solDailyEarnRate * solBalance * solPrice;
    const dailyUsdcChange = usdcDailyBorrowRate * usdcLoanBalance;
    const dailyNetChange = dailySolChange - dailyUsdcChange;

    if (detailedView) {
        return (
            <div className={styles.balanceWrapper}>
                <h2 className={styles.heading}>Asset Breakdown</h2>

                <div className={styles.balancesRow}>
                    <div className={styles.balanceCell}>
                        <h3 className={styles.subheading}>Total Assets</h3>
                        <p className={styles.mainBalance}>
                            ${(solBalance * solPrice).toLocaleString('en-IE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </p>
                        <p className={styles.subBalance}>{solBalance} SOL</p>
                        <p className={styles.dailyChange}>
                            +${roundToDecimalPlaces(dailySolChange, 4)} /day
                        </p>
                    </div>

                    <div className={styles.balanceCell}>
                        <h3 className={styles.subheading}>Loans</h3>
                        <p className={styles.mainBalance}>
                            ${(usdcLoanBalance).toLocaleString('en-IE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </p>
                        <p className={styles.subBalance}>USDC</p>
                        <p className={styles.dailyChange}>
                            +${roundToDecimalPlaces(dailyUsdcChange, 4)} /day
                        </p>
                    </div>

                    <div className={styles.balanceCell}>
                        <h3 className={styles.subheading}>Net Balance</h3>
                        <p className={styles.mainBalance}>
                            ${((solBalance * solPrice) - usdcLoanBalance).toLocaleString(
                                'en-IE', {minimumFractionDigits: 2, maximumFractionDigits: 2}
                            )}
                        </p>
                        <p className={styles.subBalance}>After outstanding loans</p>
                        <p className={styles.dailyChange}>
                            +${roundToDecimalPlaces(dailyNetChange,4)} /day
                        </p>
                    </div>
                </div>
                
                <button 
                    className={`glassButton ghost ${styles.viewButton}`}
                    onClick={ () => setDetailedView(false) }
                >
                    Simple View
                </button>
            </div>
        )
    } 
    else {
        return (
            <div className={styles.balanceWrapper}>
                <h2 className={styles.heading}>Net Balance</h2>
                <div className={styles.balanceCell}>
                    <p className={styles.mainBalance}>
                        ${((solBalance * solPrice) - usdcLoanBalance).toLocaleString(
                            'en-IE', {minimumFractionDigits: 2, maximumFractionDigits: 2}
                        )}
                    </p>
                    <p className={styles.subBalance}>{solBalance} SOL</p>
                </div>
                <button 
                    className={`glassButton ghost ${styles.viewButton}`}
                    onClick={ () => setDetailedView(true) }
                >
                    View Breakdown
                </button>
            </div>
        )
    }
    
}