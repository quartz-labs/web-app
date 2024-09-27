"use client";

import Image from 'next/image';
import styles from './page.module.css';
import Balance from "@/components/balance/Balance";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
    const { publicKey } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if (!publicKey) router.push("/");
    }, [publicKey]);
    
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