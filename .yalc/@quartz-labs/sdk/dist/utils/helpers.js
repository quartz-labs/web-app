import { ComputeBudgetProgram, PublicKey, } from "@solana/web3.js";
import { TOKENS } from "../config/tokens.js";
import { createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { VersionedTransaction } from "@solana/web3.js";
import { TransactionMessage } from "@solana/web3.js";
import { DEFAULT_COMPUTE_UNIT_LIMIT, DEFAULT_COMPUTE_UNIT_PRICE } from "../index.browser.js";
export async function getComputeUnitLimit(connection, instructions, address, blockhash, lookupTables = []) {
    const messageV0 = new TransactionMessage({
        payerKey: address,
        recentBlockhash: blockhash,
        instructions: instructions
    }).compileToV0Message(lookupTables);
    const simulation = await connection.simulateTransaction(new VersionedTransaction(messageV0));
    const estimatedComputeUnits = simulation.value.unitsConsumed;
    if (!estimatedComputeUnits)
        console.log("Could not simulate for CUs, using default limit");
    const computeUnitLimit = estimatedComputeUnits
        ? Math.ceil(estimatedComputeUnits * 1.5)
        : DEFAULT_COMPUTE_UNIT_LIMIT;
    return computeUnitLimit;
}
export async function getComputerUnitLimitIx(connection, instructions, address, blockhash, lookupTables = []) {
    const computeUnitLimit = await getComputeUnitLimit(connection, instructions, address, blockhash, lookupTables);
    return ComputeBudgetProgram.setComputeUnitLimit({
        units: computeUnitLimit,
    });
}
export async function getComputeUnitPrice(connection, instructions) {
    const accounts = instructions.flatMap(instruction => instruction.keys);
    const writeableAccounts = accounts.filter(account => account.isWritable).map(account => account.pubkey);
    const recentFees = await connection.getRecentPrioritizationFees({
        lockedWritableAccounts: writeableAccounts
    }).then(fees => fees.map(fee => fee.prioritizationFee));
    if (recentFees.length === 0)
        return DEFAULT_COMPUTE_UNIT_PRICE;
    const positiveFees = recentFees.filter(fee => fee > 0);
    const sortedFees = [...positiveFees].sort((a, b) => a - b);
    // Calculate Q1 and Q3
    const q1Index = Math.floor(sortedFees.length * 0.25);
    const q3Index = Math.floor(sortedFees.length * 0.75);
    const q1 = sortedFees[q1Index];
    const q3 = sortedFees[q3Index];
    if (q1 === undefined || q3 === undefined)
        return Math.min(...recentFees);
    // Calculate IQR and bounds
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    // Filter out outliers and calculate average
    const filteredFees = sortedFees.filter(fee => fee >= lowerBound && fee <= upperBound);
    const average = filteredFees.reduce((sum, fee) => sum + fee, 0) / filteredFees.length;
    return Math.ceil(average);
}
;
export async function getComputeUnitPriceIx(connection, instructions) {
    const computeUnitPrice = await getComputeUnitPrice(connection, instructions);
    return ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: computeUnitPrice,
    });
}
export const toRemainingAccount = (pubkey, isSigner, isWritable) => {
    return {
        pubkey: pubkey,
        isSigner: isSigner,
        isWritable: isWritable,
    };
};
export const getTokenProgram = async (connection, mint) => {
    const mintAccount = await retryWithBackoff(() => connection.getAccountInfo(mint), 3);
    return mintAccount?.owner || TOKEN_PROGRAM_ID;
};
export async function makeCreateAtaIxIfNeeded(connection, ata, authority, mint, tokenProgramId) {
    const oix_createAta = [];
    const ataInfo = await retryWithBackoff(() => connection.getAccountInfo(ata), 3);
    if (ataInfo === null) {
        oix_createAta.push(createAssociatedTokenAccountInstruction(authority, ata, authority, mint, tokenProgramId));
    }
    return oix_createAta;
}
export function baseUnitToDecimal(baseUnits, marketIndex) {
    const token = TOKENS[marketIndex];
    return baseUnits / (10 ** token.decimalPrecision.toNumber());
}
export function decimalToBaseUnit(decimal, marketIndex) {
    const token = TOKENS[marketIndex];
    return Math.trunc(decimal * (10 ** token.decimalPrecision.toNumber()));
}
export async function retryWithBackoff(fn, retries = 5, initialDelay = 1_000, retryCallback) {
    let lastError = new Error("Unknown error");
    for (let i = 0; i <= retries; i++) {
        try {
            return await fn();
        }
        catch (error) {
            const delay = initialDelay * (2 ** i);
            lastError = (error instanceof Error)
                ? error
                : new Error(String(error));
            if (retryCallback) {
                retryCallback(lastError, delay);
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw lastError;
}
export function evmAddressToSolana(evmAddress) {
    const bytes32 = `0x000000000000000000000000${evmAddress.replace("0x", "")}`;
    const bytes = new Uint8Array((bytes32.length - 2) / 2);
    let offset = 2;
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = Number.parseInt(bytes32.substring(offset, offset + 2), 16);
        offset += 2;
    }
    return new PublicKey(bytes);
}
//# sourceMappingURL=helpers.js.map