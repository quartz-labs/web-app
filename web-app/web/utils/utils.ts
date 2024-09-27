import { web3 } from "@coral-xyz/anchor";
import { AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { FUNDS_PROGRAM_ID } from "./constants";

export const isPdaInitialized = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const [vaultPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), wallet.publicKey.toBuffer()],
        new web3.PublicKey(FUNDS_PROGRAM_ID)
    );
    const vaultPdaAccount = await connection.getAccountInfo(vaultPda);
    return (vaultPdaAccount !== null);
}