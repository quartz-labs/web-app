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
    const [solBalance, setSolBalance] = useState(0);
    const [solPrice, setSolPrice] = useState(0);

    const updateSolPrice = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
            const data = await response.json();
            setSolPrice(data.solana.usd);
        } catch {
            console.error("Error: Unable to reach CoinGecko for price data");
        }
    }

    useEffect(() => {
        const interval = setInterval(updateSolPrice, 5000);
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
                connection.onAccountChange(
                    vault,
                    updatedAccountInfo => {
                        setSolBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
                    },
                    "confirmed"
                );

                const accountInfo = await connection.getAccountInfo(vault);
                if (accountInfo) {
                    setSolBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
                    updateSolPrice();
                } else {
                    throw new Error("Account info not found");
                }
            } catch (error) {
                console.error("Failed to retreive account info: ", error);
            }
        }
        updateBalance();
    }, [wallet]);

    if (detailedView) {
        return (
            <div className={styles.balanceWrapper}>
                
            </div>
        )
    } 
    else {
        return (
            <div className={styles.balanceWrapper}>
                <h2 className={styles.heading}>Spendable Balance</h2>
                <div className={styles.balanceCell}>
                    <p className={styles.mainBalance}>${(solBalance * solPrice).toLocaleString('en-IE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    <p className={styles.subBalance}>{solBalance} SOL</p>
                </div>
            </div>
        )
    }
    
}