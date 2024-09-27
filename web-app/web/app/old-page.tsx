"use client";

import { useState } from 'react';
import idl from "./idl.json";
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { AnchorProvider, Idl, Program, setProvider, web3 } from '@coral-xyz/anchor';
import styles from './page.module.css';
import { LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { FundsProgram } from './types/funds_program';
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token';

export default function Page() {
  const FUNDS_PROGRAM_ID = "B91b1VtvTSzcwJ5JDgbtJYf8syfE1HSsfW3C8iFgwcYN";
  const USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  let provider;
  let program: Program<FundsProgram> | undefined;

  const usdcMintPubkey = new web3.PublicKey(USDC_MINT);

  if (wallet) {
    provider = new AnchorProvider(connection, wallet, {
      commitment: "confirmed"
    });
    if (provider) {
      setProvider(provider);
      program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
    } else {
      console.log("Error: Could not set provider");
    }
  }

  const [modalType, setModalType] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [confirmFunction, setConfirmFunction] = useState<((amount: string) => void) | null>(null);

  const handleOpenModal = (type: string, func: (amount: string) => void) => {
    setModalType(type);
    setConfirmFunction(() => func); // Store the function to be called
  };

  const handleCloseModal = () => {
    setModalType(null);
    setAmount('');
    setConfirmFunction(null);
  };

  const initAccount = async () => {
    if (!program || !wallet) {
      console.log("Error: program not found");
      return;
    }

    const [vaultPda] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), wallet.publicKey.toBuffer()],
      program.programId
    );
    const [vaultUsdcPda] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), wallet.publicKey.toBuffer(), usdcMintPubkey.toBuffer()],
      program.programId
    );

    const signature = await program.methods
      .initUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda,
        vaultUsdc: vaultUsdcPda,
        owner: wallet.publicKey,
        usdcMint: USDC_MINT,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Account initialized. Tx signature: ", signature);
  };

  const closeAccount = () => {
    console.log("Account closed");
  };

  const depositSol = (amount: string) => {
    const amountLamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);
    console.log(`Depositing ${amountLamports} lamports`);
  };

  const withdrawSol = (amount: string) => {
    const amountLamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);
    console.log(`Withdrawing ${amountLamports} lamports`);
  };

  const offRamp = (amount: string) => {
    const amountLamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);
    console.log(`Off-ramping ${amountLamports} lamports`);
  };

  const liquidate = (amount: string) => {
    const amountLamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);
    console.log(`Liquidating ${amountLamports} lamports`);
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%", flexDirection: 'column' }}>
      {!wallet ? (
        <p>gm, please connect wallet</p>
      ) : (
        <>
          <button className={styles.button} onClick={initAccount}>Init Account</button>
          <button className={styles.button} onClick={() => handleOpenModal('deposit', depositSol)}>Deposit SOL</button>
          <button className={styles.button} onClick={() => handleOpenModal('withdraw', withdrawSol)}>Withdraw SOL</button>
          <button className={styles.button} onClick={() => handleOpenModal('off-ramp', offRamp)}>Off-ramp</button>
          <button className={styles.button} onClick={() => handleOpenModal('liquidate', liquidate)}>Liquidate</button>
          <button className={styles.button} onClick={closeAccount}>Close Account</button>

          {/* Modal */}
          {modalType && (
            <div className={styles.modal}>
              <h2>{modalType.charAt(0).toUpperCase() + modalType.slice(1)} Amount</h2>
              <input type="text" placeholder={`Enter amount to ${modalType}`} value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '75%', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
              <button className={styles.button} onClick={() => { confirmFunction && confirmFunction(amount); handleCloseModal(); }}>Confirm</button>
              <button className={styles.button} onClick={handleCloseModal}>Cancel</button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
