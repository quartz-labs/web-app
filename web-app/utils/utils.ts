import { AnchorProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getVault } from "./getPDAs";
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const isVaultInitialized = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const vaultPda = getVault(wallet.publicKey);
    const vaultPdaAccount = await connection.getAccountInfo(vaultPda);
    return (vaultPdaAccount !== null);
}

export const roundToDecimalPlaces = (num: number, place: number) => {
    const multiplier = Math.pow(10, place);
    return Math.round((num * multiplier + Number.EPSILON)) / multiplier;
}

export const getOrCreateAssociatedTokenAccountAnchor = async (wallet: AnchorWallet, connection: Connection, provider: AnchorProvider, mint: PublicKey) => {
    const associatedTokenAddress = await getAssociatedTokenAddress(
        mint,
        wallet.publicKey
    );

    const accountInfo = await connection.getAccountInfo(associatedTokenAddress);
    if (!accountInfo) {
        const tx = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedTokenAddress,
                wallet.publicKey,
                mint
            )
        );

        const signature = await provider.sendAndConfirm(tx);
        console.log(signature);
    }

    return associatedTokenAddress;
}
