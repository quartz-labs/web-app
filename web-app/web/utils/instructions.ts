import { AnchorProvider, BN, Idl, Program, setProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { DRIFT_PROGRAM_ID, USDC_MINT } from "./constants";
import idl from "../idl/funds_program.json";
import { FundsProgram } from "@/types/funds_program";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, VersionedTransaction } from "@solana/web3.js";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { getVault } from "./utils";
import { getUserAccountPublicKey } from "./driftHelpers";

export const initAccount = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
    const [vaultPda, vaultUsdcPda] = getVault(wallet.publicKey);

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

        const [userStatsPda] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("user_stats"), vaultPda.toBuffer()],
            new web3.PublicKey(DRIFT_PROGRAM_ID)
        );

        const [statePda] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("drift_state")],
            new web3.PublicKey(DRIFT_PROGRAM_ID)
        );

        const userAccountPublicKey = await getUserAccountPublicKey(
            new web3.PublicKey(DRIFT_PROGRAM_ID),
            vaultPda
        );

        const ix_initDriftAccount = await program.methods
            .initDriftAccount()
            .accounts({
                // @ts-ignore - Causing an issue in Cursor IDE
                vault: vaultPda,
                owner: wallet.publicKey,
                userStats: userStatsPda,
                state: statePda,
                driftProgram: driftProgramId,
                rent: web3.SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const tx = new Transaction().add(ix_initUser, ix_initDriftAccount);

        const latestBlockhash = await connection.getLatestBlockhash();
        tx.recentBlockhash = latestBlockhash.blockhash;
        tx.feePayer = wallet.publicKey;

        const versionedTx = new VersionedTransaction(tx.compileMessage());
        const signedTx = await wallet.signTransaction(versionedTx);

        const simulation = await connection.simulateTransaction(signedTx);
        console.log("Simulation result:", simulation);

        const signature = await provider.connection.sendRawTransaction(signedTx.serialize());
        
        await connection.confirmTransaction({
            signature,
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        });

        console.log(signature);

        return signature;
    } catch (err) {
        if (err instanceof WalletSignTransactionError) {
            return null;
        } else throw err;
    }
}

export const withdrawSol = async(wallet: AnchorWallet, connection: web3.Connection, amountLamports: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
    const [vaultPda, _] = getVault(wallet.publicKey);

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
