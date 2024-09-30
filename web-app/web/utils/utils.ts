import { BN, web3 } from "@coral-xyz/anchor";
import { AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { FUNDS_PROGRAM_ID, USDC_MINT } from "./constants";
import { PublicKey } from "@solana/web3.js";
import axios from 'axios';
import { DriftClient, DriftEnv, initialize, PERCENTAGE_PRECISION, PerpMarketConfig } from "@drift-labs/sdk";

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
