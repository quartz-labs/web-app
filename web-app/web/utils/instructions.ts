import { AnchorProvider, Idl, Program, setProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { FUNDS_PROGRAM_ID, USDC_MINT } from "./constants";
import idl from "../idl/funds-program.json";
import { FundsProgram } from "@/app/types/funds_program";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SystemProgram } from "@solana/web3.js";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";

export const initAccount = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const usdcMintPubkey = new web3.PublicKey(USDC_MINT);

    const program = new Program(idl as Idl, provider) as unknown as Program<FundsProgram>;


    const [vaultPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), wallet.publicKey.toBuffer()],
        new web3.PublicKey(FUNDS_PROGRAM_ID)
    );
    const [vaultUsdcPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), wallet.publicKey.toBuffer(), usdcMintPubkey.toBuffer()],
        new web3.PublicKey(FUNDS_PROGRAM_ID)
    );

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