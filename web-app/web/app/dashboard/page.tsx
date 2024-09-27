"use client";

import Image from 'next/image';
import styles from './page.module.css';
import Balance from "@/components/balance/Balance";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { web3 } from '@coral-xyz/anchor';
import { isVaultInitialized } from '@/utils/utils';
import Modal, { ModalProps } from '@/components/modal/Modal';

export default function Dashboard() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const router = useRouter();

    const [modalEnabled, setModalEnabled] = useState(false);
    const [modalData, setModalData] = useState<ModalProps>({
        title: "",
        denomination: "",
        buttonText: "",
        onConfirm: () => {},
        onCancel: () => {}
    });

    useEffect(() => {
        const isLoggedIn = async () => {
            if (!wallet || !await isVaultInitialized(wallet, connection)) {
                router.push("/");
            }
        }
        isLoggedIn();
    }, [wallet]);
    
    const handleDeposit = () => {
        setModalEnabled(true);
        setModalData({
            title: "Deposit SOL",
            denomination: "SOL",
            buttonText: "Deposit",
            onConfirm: (amount: Number) => {

                setModalEnabled(false);
            },
            onCancel: () => { setModalEnabled(false); }
        })
    }

    const handleWithdraw = () => {
        setModalEnabled(true);
        setModalData({
            title: "Withdraw SOL",
            denomination: "SOL",
            buttonText: "Withdraw",
            onConfirm: (amount: Number) => {
                
                setModalEnabled(false);
            },
            onCancel: () => { setModalEnabled(false); }
        })
    }

    const handleLiquidate = () => {
        setModalEnabled(true);
        setModalData({
            title: "Liquidate SOL",
            denomination: "SOL",
            buttonText: "Liquidate",
            onConfirm: (amount: Number) => {
                console.log("Liquidate " + amount);
                setModalEnabled(false);
            },
            onCancel: () => { setModalEnabled(false); }
        })
    }

    const handleOfframp = () => {
        setModalEnabled(true);
        setModalData({
            title: "Offramp USDC",
            denomination: "USDC",
            buttonText: "Offramp",
            onConfirm: (amount: Number) => {
                console.log("Offramp " + amount);
                setModalEnabled(false);
            },
            onCancel: () => { setModalEnabled(false); }
        })
    }

    return (
        <main className="container">
            {modalEnabled && (
                <Modal {...modalData} />
            )}

            <div className={styles.navBar}>
                <Image 
                    src="/logo.svg" 
                    alt="Quartz" 
                    width={200} 
                    height={69}
                />

                <WalletMultiButton />
            </div>
            
            <Balance/>

            <div className={styles.buttons}>
                <button onClick={handleDeposit} className={`${styles.mainButton} glassButton`}>Deposit</button>
                <button onClick={handleWithdraw} className={`${styles.mainButton} glassButton`}>Withdraw</button>
                <button onClick={handleLiquidate} className={`${styles.mainButton} glassButton`}>Liquidate</button>
                <button onClick={handleOfframp} className={`${styles.mainButton} glassButton`}>Off-ramp</button>
            </div>
        </main>
    )
}