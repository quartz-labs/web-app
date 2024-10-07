"use client";

import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './page.module.css';
import Balance from "@/components/balance/Balance";
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isVaultInitialized } from '@/utils/utils';
import Modal, { ModalProps } from '@/components/modal/Modal';
import { depositLamports, depositUsdc, liquidateSol, withdrawLamports, withdrawUsdc } from '@/utils/instructions';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, VersionedTransaction } from '@solana/web3.js';
import { getVault } from '@/utils/getPDAs';
import { MICRO_CENTS_PER_USDC } from '@/utils/constants';

const WalletMultiButtonDynamic = dynamic(
    () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
    { ssr: false }
);

export default function Dashboard() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const router = useRouter();

    const [modalEnabled, setModalEnabled] = useState(false);
    const [modalData, setModalData] = useState<ModalProps>({
        title: "",
        denomination: "",
        buttonText: "",
        onConfirm: (amount: number) => {},
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
            onConfirm: async (amount: number) => {
                if (!wallet) {
                    console.error("Error: Wallet not connected");
                    return;
                }
                const signature = await depositLamports(wallet, connection, amount * LAMPORTS_PER_SOL);
                console.log(signature);
                if (signature) setModalEnabled(false);
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
            onConfirm: async (amount: number) => {
                if (!wallet) {
                    console.error("Error: Wallet not connected");
                    return;
                }
                const signature = await withdrawLamports(wallet, connection, amount * LAMPORTS_PER_SOL);
                console.log(signature);
                if (signature) setModalEnabled(false);
            },
            onCancel: () => { setModalEnabled(false); }
        })
    }

    const handleRepayUsdc = () => {
        setModalEnabled(true);
        setModalData({
            title: "Repay USDC Loan",
            denomination: "USDC",
            buttonText: "Repay",
            onConfirm: async (amount: number) => {
                if (!wallet) {
                    console.error("Error: Wallet not connected");
                    return;
                }
                const signature = await depositUsdc(wallet, connection, amount * MICRO_CENTS_PER_USDC);
                console.log(signature);
                if (signature) setModalEnabled(false);
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
            onConfirm: async (amount: number) => {
                if (!wallet) {
                    console.error("Error: Wallet not connected");
                    return;
                }
                const signature = await withdrawUsdc(wallet, connection, amount * MICRO_CENTS_PER_USDC);
                console.log(signature);
                if (signature) setModalEnabled(false);
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

                <WalletMultiButtonDynamic />
            </div>
            
            <Balance/>

            <div className={styles.buttons}>
                <button onClick={handleDeposit} className={`${styles.mainButton} glassButton`}>Deposit</button>
                <button onClick={handleWithdraw} className={`${styles.mainButton} glassButton`}>Withdraw</button>
                <button onClick={handleRepayUsdc} className={`${styles.mainButton} glassButton`}>Repay USDC</button>
                <button onClick={handleOfframp} className={`${styles.mainButton} glassButton`}>Off-ramp</button>
            </div>
        </main>
    )
}