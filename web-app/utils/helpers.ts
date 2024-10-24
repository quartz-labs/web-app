import { AnchorProvider, web3, BN } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { AddressLookupTableAccount, PublicKey, Transaction, TransactionInstruction, Connection } from "@solana/web3.js";
import { getVault } from "./getPDAs";
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { Bank, MarginfiAccountWrapper, MarginfiClient } from "@mrgnlabs/marginfi-client-v2";
import BigNumber from "bignumber.js";
import { Amount } from "@mrgnlabs/mrgn-common";

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

export const baseUnitToUi = (amountBase: number | BN, decimals: number): string => {
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

export const uiToBaseUnit = (amountUi: number | BigNumber, decimals: number): BigNumber => {
    const input = new BigNumber(amountUi);
    const multiplier = new BigNumber(10 ** decimals);
    const baseUnits = input.times(multiplier).integerValue();
    return baseUnits;
}

export const divideBN = (a: BN, b: BN) => {
    return a.div(b).toNumber() + a.mod(b).toNumber();
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function getFlashLoanRepayAmount(
    amountBorrowUi: BigNumber | number,
    borrowBank: Bank,
    repayBank: Bank,
    slippage: number,
    marginfiClient: MarginfiClient,
) {
    const oracleBorrow = marginfiClient.getOraclePriceByBank(borrowBank.address);
    if (!oracleBorrow) throw Error(`Oracle for bank ${borrowBank.address} not found`);
    const oracleRepay = marginfiClient.getOraclePriceByBank(repayBank.address);
    if (!oracleRepay) throw Error(`Oracle for bank ${repayBank.address} not found`);

    const amountBorrow = new BigNumber(amountBorrowUi);
    const amountRepay = amountBorrow
        .times(oracleBorrow.priceWeighted.highestPrice)
        .div(oracleRepay.priceWeighted.lowestPrice)
        .times(1 + slippage);
    return amountRepay;
}

export async function makeFlashLoanTx(
    marginfiAccount: MarginfiAccountWrapper,
    amountUi: Amount,
    bankAddress: PublicKey,
    instructions: TransactionInstruction[],
    lookupTables: AddressLookupTableAccount[],
    priorityFeeUi?: number,
    createAtas: boolean = true,
) {
    return marginfiAccount.makeLoopTx(
        amountUi,
        amountUi,
        bankAddress,
        bankAddress,
        instructions,
        lookupTables,
        priorityFeeUi,
        createAtas
    );
}
