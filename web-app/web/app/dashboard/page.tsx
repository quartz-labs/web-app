"use client";

import Image from 'next/image';
import styles from './page.module.css';
import Balance from "@/components/balance/Balance";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { web3 } from '@coral-xyz/anchor';
import { isPdaInitialized } from '@/utils/utils';

export default function Dashboard() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = async () => {
            if (!wallet || !await isPdaInitialized(wallet, connection)) {
                router.push("/");
            }
        }
        isLoggedIn();
    }, [wallet]);
    
    return (
        <main className="container">
            <div className={styles.navBar}>
                <Image 
                    src="/logo.svg" 
                    alt="Quartz" 
                    width={200} 
                    height={69}
                />

                <WalletMultiButton />
            </div>
            
            <Balance breakdownView={false}/>

            <div className={styles.buttons}>
                <button className={`${styles.mainButton} glassButton`}>Deposit</button>
                <button className={`${styles.mainButton} glassButton`}>Withdraw</button>
                <button className={`${styles.mainButton} glassButton`}>Liquidate</button>
                <button className={`${styles.mainButton} glassButton`}>Off-ramp</button>
            </div>
        </main>
    )
}