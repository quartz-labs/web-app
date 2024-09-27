"use client";

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "./Balance.module.css";
import { getVault, isVaultInitialized } from "@/utils/utils";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface BalanceProps {
    breakdownView: Boolean;
}

export default function Balance({breakdownView}: BalanceProps) {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const [solBalance, setSolBalance] = useState(0);
    
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
                } else {
                    throw new Error("Account info not found");
                }
            } catch (error) {
                console.error("Failed to retreive account info: ", error);
            }
        }
    }, [wallet]);

    if (breakdownView) {
        return (
            <div className={styles.balanceWrapper}>
                
            </div>
        )
    } 
    else {
        return (
            <div className={styles.balanceWrapper}>
                {solBalance}
            </div>
        )
    }
    
}