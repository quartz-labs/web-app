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
import { getDepositSolIx, withdrawSol } from '@/utils/instructions';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, VersionedTransaction } from '@solana/web3.js';
import { getVault } from '@/utils/getPDAs';

const WalletMultiButtonDynamic = dynamic(
    () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
    { ssr: false }
);

export default function Dashboard() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const router = useRouter();
    const {publicKey, sendTransaction} = useWallet();

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
                if (!publicKey || !wallet) {
                    console.error("Error: Wallet not connected");
                    return;
                }

                const [vault, _] = getVault(publicKey);

                const ix_transferLamports = SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: vault,
                    lamports: amount * LAMPORTS_PER_SOL
                });

                const ix_depositLamportsDrift = await getDepositSolIx(wallet, connection, amount * LAMPORTS_PER_SOL);

                if (!ix_depositLamportsDrift) {
                    console.log("Error: User cancelled transaction")
                    return;
                }

                const tx = new Transaction().add(ix_transferLamports, ix_depositLamportsDrift);

                const latestBlockhash = await connection.getLatestBlockhash();
                tx.recentBlockhash = latestBlockhash.blockhash;
                tx.feePayer = wallet.publicKey;

                const versionedTx = new VersionedTransaction(tx.compileMessage());
                const signedTx = await wallet.signTransaction(versionedTx);

                const simulation = await connection.simulateTransaction(signedTx);
                console.log("Simulation result:", simulation);

                const signature = await connection.sendRawTransaction(signedTx.serialize(), { skipPreflight: true });
                
                await connection.confirmTransaction({
                    signature,
                    blockhash: latestBlockhash.blockhash,
                    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                });

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
                const signature = await withdrawSol(wallet, connection, amount * LAMPORTS_PER_SOL);
                console.log(signature);
                if (signature) setModalEnabled(false);
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
            onConfirm: async (amount: number) => {
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
            onConfirm: async (amount: number) => {
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

                <WalletMultiButtonDynamic />
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