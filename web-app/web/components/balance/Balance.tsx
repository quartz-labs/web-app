"use client";

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "./Balance.module.css";
import { getVault, isVaultInitialized } from "@/utils/utils";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Balance() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const [detailedView, setDetailedView] = useState(false);
    const [rentExemptionThreshold, setRentExemptionThreshold] = useState(0);

    const [solBalance, setSolBalance] = useState(0);
    const [solPrice, setSolPrice] = useState(0);
    // TODO - Get USDC loan balance
    const [usdcLoanBalance, setUsdcLoanBalance] = useState(0);

    // TODO - Calculate daily change on balances
    const [solDailyChange, setSolDailyChange] = useState(0);
    const [usdcLoanDailyChange, setUsdcLoanDailyChange] = useState(0);

    const updateSolPrice = async () => {
        try {
            const response = await fetch('/api/solana-price');
            const data = await response.json();
            setSolPrice(data.solana.usd);
        } catch {
            console.error("Error: Unable to reach CoinGecko for price data");
        }
    }

    useEffect(() => {
        updateSolPrice();
        const interval = setInterval(updateSolPrice, 10000);

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
                    updateSolPrice();
                }

                connection.onAccountChange(
                    vault,
                    updatedAccountInfo => {
                        const vaultBalance = updatedAccountInfo.lamports - rentExemptionThreshold;
                        console.log(rentExemptionThreshold);
                        console.log(updatedAccountInfo.lamports);
                        console.log(vaultBalance);
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
                        <p className={styles.dailyChange}>+${solDailyChange} /day</p>
                    </div>

                    <div className={styles.balanceCell}>
                        <h3 className={styles.subheading}>Loans</h3>
                        <p className={styles.mainBalance}>
                            ${(usdcLoanBalance).toLocaleString('en-IE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </p>
                        <p className={styles.subBalance}>USDC</p>
                        <p className={styles.dailyChange}>+${usdcLoanDailyChange} /day</p>
                    </div>

                    <div className={styles.balanceCell}>
                        <h3 className={styles.subheading}>Net Balance</h3>
                        <p className={styles.mainBalance}>
                            ${((solBalance * solPrice) - usdcLoanBalance).toLocaleString(
                                'en-IE', {minimumFractionDigits: 2, maximumFractionDigits: 2}
                            )}
                        </p>
                        <p className={styles.subBalance}>After outstanding loans</p>
                        <p className={styles.dailyChange}>+${solDailyChange - usdcLoanDailyChange} /day</p>
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