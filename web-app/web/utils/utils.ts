import { web3 } from "@coral-xyz/anchor";
import { AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { FUNDS_PROGRAM_ID, USDC_MINT } from "./constants";
import { PublicKey } from "@solana/web3.js";

export const isVaultInitialized = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const [vaultPda, _] = getVault(wallet.publicKey);
    const vaultPdaAccount = await connection.getAccountInfo(vaultPda);
    return (vaultPdaAccount !== null);
}

export const getVault = (owner: PublicKey) => {
    const usdcMintPubkey = new web3.PublicKey(USDC_MINT);
    const [pda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), owner.toBuffer()],
        new web3.PublicKey(FUNDS_PROGRAM_ID)
    )
    const [ata] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), owner.toBuffer(), usdcMintPubkey.toBuffer()],
        new web3.PublicKey(FUNDS_PROGRAM_ID)
    );
    return [pda, ata];
}
