import { AnchorProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { USDC_MINT } from "./constants";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getVault } from "./getPDAs";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const isVaultInitialized = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const vaultPda = getVault(wallet.publicKey);
    const vaultPdaAccount = await connection.getAccountInfo(vaultPda);
    return (vaultPdaAccount !== null);
}

export const getUsdcDailyBorrowRate = async () => {
    // TODO - Implement pulling real data

    return 0.1125 / 365;
}

export const getSolDailyEarnRate = async () => {
    // TODO - Implement pulling real data

    return 0.07 / 365;
}

export const roundToDecimalPlaces = (num: number, place: number) => {
    const multiplier = Math.pow(10, place);
    return Math.round((num * multiplier + Number.EPSILON)) / multiplier;
}

export const getOrCreateAssociatedTokenAccountAnchor = async (wallet: AnchorWallet, connection: Connection, provider: AnchorProvider, mint: PublicKey) => {
    const associatedTokenAddress = await getAssociatedTokenAddress(
        mint,
        wallet.publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const accountInfo = await connection.getAccountInfo(associatedTokenAddress);
    if (!accountInfo) {
        const tx = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedTokenAddress,
                wallet.publicKey,
                mint,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            )
        );

        try {
            const signature = await provider.sendAndConfirm(tx);
            console.log("Associated token account created. Signature:", signature);
        } catch (error) {
            console.error("Error creating associated token account:", error);
            return null;
        }
    }

    return associatedTokenAddress;
}
