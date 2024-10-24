import { AnchorProvider, web3, BN } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getVault } from "./getPDAs";
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from "@solana/spl-token";

export const isVaultInitialized = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const vaultPda = getVault(wallet.publicKey);
    const vaultPdaAccount = await connection.getAccountInfo(vaultPda);
    return (vaultPdaAccount !== null);
}

export const roundToDecimalPlaces = (num: number, place: number) => {
    const multiplier = Math.pow(10, place);
    return Math.round((num * multiplier + Number.EPSILON)) / multiplier;
}

export const roundToDecimalPlacesAbsolute = (num: number, place: number) => {
    const rounded = roundToDecimalPlaces(num, place);
    return Math.abs(rounded);
}

export const getSign = (num: number) => {
    if (num < 0) return "-";
    else return "+"
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

export const baseUnitToToken = (amountBase: number | BN, decimals: number): string => {
    const amountBN = BN.isBN(amountBase) ? amountBase : new BN(amountBase);

    if (amountBN.isNeg()) {
        throw new Error('Negative amounts not allowed');
    }
    
    if (decimals < 0 || decimals > 20) { // 20 is a safe upper limit for most tokens
        throw new Error('Decimals must be between 0 and 20');
    }

    // Convert to string and handle padding
    const amountStr = amountBN.toString();
    const paddedStr = amountStr.padStart(decimals + 1, '0'); // +1 to ensure we always have at least one digit before decimal
    
    // Split into whole and decimal parts
    const wholeStr = paddedStr.slice(0, -decimals) || '0';
    const decimalStr = paddedStr.slice(-decimals);
    
    // Return formatted string, trimming trailing zeros after decimal
    if (decimals === 0) return wholeStr;
    const trimmed = `${wholeStr}.${decimalStr}`.replace(/\.?0+$/, '');
    return trimmed === '' ? '0' : trimmed;
}

export const divideBN = (a: BN, b: BN) => {
    return a.div(b).toNumber() + a.mod(b).toNumber();
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
