import { PublicKey, type Connection, type TransactionInstruction } from "@solana/web3.js";
import type { AccountMeta } from "../types/interfaces/accountMeta.interface.js";
import { type MarketIndex } from "../config/tokens.js";
import type { AddressLookupTableAccount } from "@solana/web3.js";
export declare function getComputeUnitLimit(connection: Connection, instructions: TransactionInstruction[], address: PublicKey, blockhash: string, lookupTables?: AddressLookupTableAccount[]): Promise<number>;
export declare function getComputerUnitLimitIx(connection: Connection, instructions: TransactionInstruction[], address: PublicKey, blockhash: string, lookupTables?: AddressLookupTableAccount[]): Promise<TransactionInstruction>;
export declare function getComputeUnitPrice(connection: Connection, instructions: TransactionInstruction[]): Promise<number>;
export declare function getComputeUnitPriceIx(connection: Connection, instructions: TransactionInstruction[]): Promise<TransactionInstruction>;
export declare const toRemainingAccount: (pubkey: PublicKey, isSigner: boolean, isWritable: boolean) => AccountMeta;
export declare const getTokenProgram: (connection: Connection, mint: PublicKey) => Promise<PublicKey>;
export declare function makeCreateAtaIxIfNeeded(connection: Connection, ata: PublicKey, authority: PublicKey, mint: PublicKey, tokenProgramId: PublicKey): Promise<TransactionInstruction[]>;
export declare function baseUnitToDecimal(baseUnits: number, marketIndex: MarketIndex): number;
export declare function decimalToBaseUnit(decimal: number, marketIndex: MarketIndex): number;
export declare function retryWithBackoff<T>(fn: () => Promise<T>, retries?: number, initialDelay?: number, retryCallback?: (error: unknown, delayMs: number) => void): Promise<T>;
export declare function evmAddressToSolana(evmAddress: string): PublicKey;
//# sourceMappingURL=helpers.d.ts.map