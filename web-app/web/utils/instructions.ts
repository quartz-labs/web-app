import { AnchorProvider, BN, Idl, Program, setProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { USDC_MINT } from "./constants";
import idl from "../idl/funds-program.json";
import { FundsProgram } from "@/types/funds_program";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SystemProgram } from "@solana/web3.js";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { getVault } from "./utils";

export const initAccount = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;
    const [vaultPda, vaultUsdcPda] = getVault(wallet.publicKey);

    try {
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