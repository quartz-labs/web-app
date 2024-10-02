import { AnchorProvider, BN, Idl, Program, setProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { DRIFT_PROGRAM_ID, USDC_MINT, WSOL_MINT } from "./constants";
import idl from "../idl/funds_program.json";
import { FundsProgram } from "@/types/funds_program";
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, VersionedTransaction } from "@solana/web3.js";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { getDriftPDAs, getVault } from "./getPDAs";

export const initAccount = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
    const [vaultPda, vaultUsdcPda, _wsol] = getVault(wallet.publicKey);
    const [userPda, userStatsPda, statePda, _spotMarketVault] = getDriftPDAs(wallet.publicKey);

    const driftProgramId = new PublicKey(DRIFT_PROGRAM_ID);

    try {
        const ix_initUser = await program.methods
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
            .instruction();

        const ix_initDriftAccount = await program.methods
            .initDriftAccount()
            .accounts({
                // @ts-ignore - Causing an issue in Cursor IDE
                vault: vaultPda,
                owner: wallet.publicKey,
                user: userPda,
                userStats: userStatsPda,
                state: statePda,
                driftProgram: driftProgramId,
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
    const [vaultPda, _usdc, _wsol] = getVault(wallet.publicKey);

    try {
        const signature = await program.methods
            .withdrawLamports(new BN(amountLamports))
            .accounts({
            // @ts-ignore - Causing an issue in Cursor IDE
            vault: vaultPda, 
            receiver: wallet.publicKey,
            owner: wallet.publicKey,
            systemProgram: SystemProgram.programId
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
    const [vaultPda, _usdc, vaultWSol] = getVault(wallet.publicKey);
    const [userPda, userStatsPda, statePda, spotMarketVault] = getDriftPDAs(
        wallet.publicKey, 1
    ); // 1 for SOL

    try {
        const signature = await program.methods
            .depositLamportsDrift(new BN(amountLamports))
            .accounts({
                // @ts-ignore - Causing an issue in Cursor IDE
                vault: vaultPda,
                owner: wallet.publicKey,
                state: statePda,
                user: userPda,
                userStats: userStatsPda,
                spotMarketVault: spotMarketVault,
                userTokenAccount: vaultWSol,
                wsolMint: WSOL_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                additionalAccount: new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix"), // TODO - Remove hardcoding
                marketVault: new PublicKey("3x85u7SWkmmr7YQGYhtjARgxwegTLJgkSLRprfXod6rh"), // TODO - Remove hardcoding
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
