import { AnchorProvider, BN, Idl, Program, setProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, DRIFT_PROGRAM_ID, DRIFT_SPOT_MARKET_SOL, DRIFT_SPOT_MARKET_USDC, DRIFT_SIGNER, USDC_MINT, WSOL_MINT, DRIFT_ADDITIONAL_ACCOUNT_1, DRIFT_ADDITIONAL_ACCOUNT_2 } from "./constants";
import idl from "../idl/funds_program.json";
import { FundsProgram } from "@/types/funds_program";
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SystemProgram, Transaction, VersionedTransaction } from "@solana/web3.js";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { getDriftSpotMarketVault, getDriftState, getDriftUser, getDriftUserStats, getVault, getVaultUsdc, getVaultWsol } from "./getPDAs";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { getOrCreateAssociatedTokenAccountAnchor } from "./utils";

export const initAccount = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);

    try {
        const ix_initUser = await program.methods
            .initUser()
            .accounts({
                // @ts-ignore - Causing an issue in Cursor IDE
                vault: vaultPda,
                owner: wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const ix_initDriftAccount = await program.methods
            .initDriftAccount()
            .accounts({
                // @ts-ignore - Causing an issue in Cursor IDE
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

        const tx = new Transaction().add(ix_initUser, ix_initDriftAccount);
        const signature = await provider.sendAndConfirm(tx);
        return signature;
    } catch (err) {
        if (err instanceof WalletSignTransactionError) {
            return null;
        } else throw err;
    }
}

export const withdrawLamports = async(wallet: AnchorWallet, connection: web3.Connection, amountLamports: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);

    try {
        const signature = await program.methods
            .withdrawLamports(new BN(amountLamports), true)
            .accounts({
                // @ts-ignore - Causing an issue in Cursor IDE
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
        if (err instanceof WalletSignTransactionError) {
            return null;
        } else throw err;
    }
}

export const depositLamports = async(wallet: AnchorWallet, connection: web3.Connection, amountLamports: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);

    try {
        const signature = await program.methods
            .depositLamports(new BN(amountLamports), false)
            .accounts({
                // @ts-ignore - Causing an issue in Cursor IDE
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
        if (err instanceof WalletSignTransactionError) {
            return null;
        } else throw err;
    }
}

// export const liquidateSol = async(wallet: AnchorWallet, connection: web3.Connection, amountLamports: number) => {
//     const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
//     setProvider(provider);
//     const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
//     const vaultPda = getVault(wallet.publicKey);
//     const walletUsdc = await getOrCreateAssociatedTokenAccountAnchor(wallet, connection, provider, USDC_MINT);

//     try {
//         const ix_initSwapAccounts = await program.methods
//             .initSwapAccounts()
//             .accounts({
//                 // @ts-ignore - Causing an issue in Cursor IDE
//                 vault: vaultPda,
//                 vaultWsol: getVaultWsol(vaultPda),
//                 vaultUsdc: getVaultUsdc(vaultPda),
//                 owner: wallet.publicKey,
//                 wsolMint: WSOL_MINT,
//                 usdcMint: USDC_MINT,
//                 tokenProgram: TOKEN_PROGRAM_ID,
//                 systemProgram: SystemProgram.programId,
//             })
//             .instruction();

//         const ix_beginSwap = await program.methods
//             .beginSwap(new BN(amountLamports))
//             .accounts({
//                 // @ts-ignore - Causing an issue in Cursor IDE
//                 vault: vaultPda,
//                 vaultWsol: getVaultWsol(vaultPda),
//                 vaultUsdc: getVaultUsdc(vaultPda),
//                 owner: wallet.publicKey,
//                 driftState: getDriftState(),
//                 driftUser: getDriftUser(vaultPda),
//                 driftUserStats: getDriftUserStats(vaultPda),
//                 inSpotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
//                 outSpotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
//                 driftSigner: DRIFT_SIGNER,
//                 instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
//                 constAccount: new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix"), // TODO - Remove hardcoding
//                 additionalAccount: new PublicKey("5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7"), // TODO - Remove hardcoding
//                 spotMarketSol: DRIFT_SPOT_MARKET_SOL,
//                 spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
//                 driftProgram: DRIFT_PROGRAM_ID,
//                 tokenProgram: TOKEN_PROGRAM_ID
//             })
//             .instruction();

//         // const ix_jupiter = await ;

//         const ix_endSwap = await program.methods
//             .endSwap()
//             .accounts({
//                 // @ts-ignore - Causing an issue in Cursor IDE
//                 vault: vaultPda,
//                 vaultWsol: getVaultWsol(vaultPda),
//                 vaultUsdc: getVaultUsdc(vaultPda),
//                 owner: wallet.publicKey,
//                 ownerUsdc: walletUsdc,
//                 driftState: getDriftState(),
//                 driftUser: getDriftUser(vaultPda),
//                 driftUserStats: getDriftUserStats(vaultPda),
//                 inSpotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
//                 outSpotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
//                 driftSigner: DRIFT_SIGNER,
//                 wsolMint: WSOL_MINT,
//                 usdcMint: USDC_MINT,
//                 instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
//                 constAccount: new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix"), // TODO - Remove hardcoding
//                 additionalAccount: new PublicKey("5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7"), // TODO - Remove hardcoding
//                 spotMarketSol: DRIFT_SPOT_MARKET_SOL,
//                 spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
    //             driftProgram: DRIFT_PROGRAM_ID,
    //             tokenProgram: TOKEN_PROGRAM_ID,
    //             systemProgram: SystemProgram.programId
    //         })
    //         .instruction(); 

    //     const tx = new Transaction().add(ix_initSwapAccounts, ix_beginSwap, ix_endSwap);

    //     const latestBlockhash = await connection.getLatestBlockhash();
    //     tx.recentBlockhash = latestBlockhash.blockhash;
    //     tx.feePayer = wallet.publicKey;

    //     const versionedTx = new VersionedTransaction(tx.compileMessage());
    //     const signedTx = await wallet.signTransaction(versionedTx);

    //     const simulation = await connection.simulateTransaction(signedTx);
    //     console.log("Simulation result:", simulation);

    //     const signature = await provider.connection.sendRawTransaction(signedTx.serialize(), {skipPreflight: true});
        
    //     await connection.confirmTransaction({
    //         signature,
    //         blockhash: latestBlockhash.blockhash,
    //         lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    //     });

    //     return signature;
    // } catch (err) {
    //     if (err instanceof WalletSignTransactionError) {
    //         return null;
//         } else throw err;
//     }
// }

export const depositUsdc = async(wallet: AnchorWallet, connection: web3.Connection, amountMicroCents: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);

    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    if (!walletUsdc) throw new Error("No USDC account found on connected wallet");

    try {
        const signature = await program.methods
            .depositUsdc(new BN(amountMicroCents), false)
            .accounts({
                // @ts-ignore - Causing an issue in Cursor IDE
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
        return signature;
    } catch (err) {
        if (err instanceof WalletSignTransactionError) {
            return null;
        } else throw err;
    }
}

export const withdrawUsdc = async(wallet: AnchorWallet, connection: web3.Connection, amountMicroCents: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);
    const walletUsdc = await getOrCreateAssociatedTokenAccountAnchor(wallet, connection, provider, USDC_MINT);

    try {
        const signature = await program.methods
            .withdrawUsdc(new BN(amountMicroCents), false)
            .accounts({
                // @ts-ignore - Causing an issue in Cursor IDE
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
            .rpc();
        return signature;
    } catch (err) {
        if (err instanceof WalletSignTransactionError) {
            return null;
        } else throw err;
    }
}