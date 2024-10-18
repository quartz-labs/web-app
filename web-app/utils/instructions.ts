import quartzIdl from "../idl/funds_program.json";
import { FundsProgram } from "@/types/funds_program";
import driftIdl from "../idl/drift.json";
import { DriftProgram } from "@/types/drift";

import { AnchorProvider, BN, Idl, Program, setProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, DRIFT_PROGRAM_ID, DRIFT_SPOT_MARKET_SOL, DRIFT_SPOT_MARKET_USDC, DRIFT_SIGNER, USDC_MINT, WSOL_MINT, DRIFT_ADDITIONAL_ACCOUNT_1, DRIFT_ADDITIONAL_ACCOUNT_2, USDT_MINT } from "./constants";
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SystemProgram, Transaction, VersionedTransaction } from "@solana/web3.js";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { getDriftSpotMarketVault, getDriftState, getDriftUser, getDriftUserStats, getVault, getVaultUsdc, getVaultWsol } from "./getPDAs";
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { getOrCreateAssociatedTokenAccountAnchor } from "./utils";
import { getJupiterSwapIx } from "./jup";
import { TransactionMessage } from "@solana/web3.js";

export const initAccount = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const quartzProgram = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const driftProgram = new Program(driftIdl as Idl, provider) as unknown as Program<DriftProgram>;
    const vaultPda = getVault(wallet.publicKey);

    try {
        const ix_initUser = await quartzProgram.methods
            .initUser()
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                owner: wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const ix_initVaultDriftAccount = await quartzProgram.methods
            .initDriftAccount()
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                owner: wallet.publicKey,
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                driftState: getDriftState(),
                driftProgram: DRIFT_PROGRAM_ID,
                rent: web3.SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const ix_initWalletDriftUserStats = await driftProgram.methods
            .initializeUserStats()
            .accounts({
                userStats: getDriftUserStats(wallet.publicKey),
                state: getDriftState(),
                authority: wallet.publicKey,
                payer: wallet.publicKey,
                rent: web3.SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const ix_initWalletDriftUser = await driftProgram.methods
            .initializeUser()
            .accounts({
                user: getDriftUser(wallet.publicKey),
                userStats: getDriftUserStats(wallet.publicKey),
                state: getDriftState(),
                authority: wallet.publicKey,
                payer: wallet.publicKey,
                rent: web3.SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const tx = new Transaction().add(ix_initUser, ix_initVaultDriftAccount, ix_initWalletDriftUserStats, ix_initWalletDriftUser);
        const signature = await provider.sendAndConfirm(tx);
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}

export const withdrawLamports = async(wallet: AnchorWallet, connection: web3.Connection, amountLamports: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);

    try {
        const signature = await program.methods
            .withdrawLamports(new BN(amountLamports), true)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultWsol: getVaultWsol(vaultPda),
                owner: wallet.publicKey,    
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
                driftSigner: DRIFT_SIGNER,
                wsolMint: WSOL_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_2,
                additionalAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                spotMarketSol: DRIFT_SPOT_MARKET_SOL,
                spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
                systemProgram: SystemProgram.programId,
            })
            .rpc();
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}

export const depositLamports = async(wallet: AnchorWallet, connection: web3.Connection, amountLamports: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);

    try {
        const signature = await program.methods
            .depositLamports(new BN(amountLamports), false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultWsol: getVaultWsol(vaultPda),
                owner: wallet.publicKey,    
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
                wsolMint: WSOL_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                spotMarket: DRIFT_SPOT_MARKET_SOL,
                systemProgram: SystemProgram.programId,
            })
            .rpc();
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}


export const liquidateSol = async(wallet: AnchorWallet, connection: web3.Connection, amountLamports: number, amountMicroCents: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const quartzProgram = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>; 
    const vaultPda = getVault(wallet.publicKey);

    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    const walletWSol = await getAssociatedTokenAddress(WSOL_MINT, wallet.publicKey);

    const ixs_initATAs: web3.TransactionInstruction[] = [];

    if (!(await connection.getAccountInfo(walletUsdc))) {
        ixs_initATAs.push(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                walletUsdc,
                wallet.publicKey,
                USDC_MINT
            )
        );
    }

    if (!(await connection.getAccountInfo(walletWSol))) {
        ixs_initATAs.push(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                walletWSol,
                wallet.publicKey,
                WSOL_MINT
            )
        );
    }
    
    // const ix_beginSwap = ;
    // const ix_endSwap = ;

    const ix_depositUsdt = await quartzProgram.methods
            .depositUsdc(new BN(amountMicroCents), false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultUsdc: getVaultUsdc(vaultPda),
                owner: wallet.publicKey,    
                ownerUsdc: walletUsdc,
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
                usdcMint: USDC_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_2,
                additionalAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                spotMarketSol: DRIFT_SPOT_MARKET_SOL,
                spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

    const ix_withdrawLamports = await quartzProgram.methods
        .withdrawLamports(new BN(amountLamports), true)
        .accounts({
            // @ts-expect-error - IDL issue
            vault: vaultPda,
            vaultWsol: getVaultWsol(vaultPda),
            owner: wallet.publicKey,    
            driftState: getDriftState(),
        })
        .instruction();

    const ix_wrapSol = web3.SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: walletWSol,
        lamports: amountLamports,
    });

    // const tx = new Transaction().add(...ixs_initATAs, ix_beginSwap, ix_depositUsdt, ix_withdrawLamports, ix_wrapSol, ix_endSwap);
    const tx = new Transaction().add(...ixs_initATAs, ix_depositUsdt, ix_withdrawLamports, ix_wrapSol);

    const latestBlockhash = await connection.getLatestBlockhash();
    tx.recentBlockhash = latestBlockhash.blockhash;
    tx.feePayer = wallet.publicKey;

    const versionedTx = new VersionedTransaction(tx.compileMessage());
    const signedTx = await wallet.signTransaction(versionedTx);

    const simulation = await connection.simulateTransaction(signedTx);
    console.log("Simulation result:", simulation);

    const signature = await provider.sendAndConfirm(tx);
    return signature;
}


export const depositUsdt = async(wallet: AnchorWallet, connection: web3.Connection, amountMicroCents: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);

    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    if (!walletUsdc) throw new Error("No USDC account found on connected wallet");

    try {       
        const quoteEndpoint = `https://quote-api.jup.ag/v6/quote?inputMint=${USDT_MINT.toBase58()}&outputMint=${USDC_MINT.toBase58()}&amount=${amountMicroCents}&slippageBps=50&swapMode=ExactOut`;
        const quoteResponse = await (await fetch(quoteEndpoint)).json();
        const { swapTransaction } = await (
            await fetch('https://quote-api.jup.ag/v6/swap', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                quoteResponse,
                userPublicKey: wallet.publicKey.toString(),
                wrapAndUnwrapSol: true,
              })
            })
          ).json();
        
        const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
        const tx_jupiter = VersionedTransaction.deserialize(swapTransactionBuf);
        const sx_jupiter = await provider.sendAndConfirm(tx_jupiter);
        if (!sx_jupiter) return;

        const sx_depositUsdt = await program.methods
            .depositUsdc(new BN(amountMicroCents), false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultUsdc: getVaultUsdc(vaultPda),
                owner: wallet.publicKey,    
                ownerUsdc: walletUsdc,
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
                usdcMint: USDC_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_2,
                additionalAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                spotMarketSol: DRIFT_SPOT_MARKET_SOL,
                spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
                systemProgram: SystemProgram.programId,
            })
            .rpc();

        return sx_depositUsdt;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}

export const withdrawUsdt = async(wallet: AnchorWallet, connection: web3.Connection, amountMicroCents: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);
    const walletUsdc = await getOrCreateAssociatedTokenAccountAnchor(wallet, connection, provider, USDC_MINT);

    try {
        const ix_withdrawUsdc = await program.methods
            .withdrawUsdc(new BN(amountMicroCents), false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultUsdc: getVaultUsdc(vaultPda),
                owner: wallet.publicKey,    
                ownerUsdc: walletUsdc,
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
                driftSigner: DRIFT_SIGNER,
                usdcMint: USDC_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                additionalAccount: DRIFT_ADDITIONAL_ACCOUNT_2,
                spotMarketSol: DRIFT_SPOT_MARKET_SOL,
                spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const { instructions, addressLookupTableAccounts } = await getJupiterSwapIx(wallet.publicKey, connection, amountMicroCents, USDC_MINT, USDT_MINT, false);

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [ix_withdrawUsdc, ...instructions],
        }).compileToV0Message(addressLookupTableAccounts);
        const tx = new VersionedTransaction(messageV0);

        const signature = await provider.sendAndConfirm(tx);
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}
