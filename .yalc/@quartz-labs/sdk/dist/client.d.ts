import { BN } from "@drift-labs/sdk";
import type { PublicKey, Connection, AddressLookupTableAccount, MessageCompiledInstruction } from "@solana/web3.js";
import { QuartzUser } from "./user.js";
import type { TransactionInstruction } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
export declare class QuartzClient {
    private connection;
    private program;
    private quartzLookupTable;
    private driftClient;
    private constructor();
    private static getProgram;
    static fetchClient(connection: Connection): Promise<QuartzClient>;
    static doesQuartzUserExist(connection: Connection, owner: PublicKey): Promise<boolean>;
    getAllQuartzAccountOwnerPubkeys(): Promise<PublicKey[]>;
    getQuartzAccount(owner: PublicKey): Promise<QuartzUser>;
    getMultipleQuartzAccounts(owners: PublicKey[]): Promise<(QuartzUser | null)[]>;
    getDepositRate(spotMarketIndex: number): Promise<BN>;
    getBorrowRate(spotMarketIndex: number): Promise<BN>;
    private getSpotMarketAccount;
    listenForInstruction(instructionName: string, onInstruction: (instruction: MessageCompiledInstruction, accountKeys: PublicKey[]) => void): Promise<void>;
    static parseTopUpIx(connection: Connection, signature: string, owner: PublicKey): Promise<{
        amountBaseUnits: BN;
        messageSentEventDataAccounts: PublicKey[];
    }>;
    /**
     * Creates instructions to initialize a new Quartz user account.
     * @param owner - The public key of Quartz account owner.
     * @param spendLimitPerTransaction - The card spend limit per transaction.
     * @param spendLimitPerTimeframe - The card spend limit per timeframe.
     * @param timeframeInSlots - The timeframe in slots (eg: 216,000 for ~1 day).
     * @returns {Promise<{
     *     ixs: TransactionInstruction[],
     *     lookupTables: AddressLookupTableAccount[],
     *     signers: Keypair[]
     * }>} Object containing:
     * - ixs: Array of instructions to initialize the Quartz user account.
     * - lookupTables: Array of lookup tables for building VersionedTransaction.
     * - signers: Array of signer keypairs that must sign the transaction the instructions are added to.
     * @throws Error if the RPC connection fails. The transaction will fail if the vault already exists, or the user does not have enough SOL.
     */
    makeInitQuartzUserIxs(owner: PublicKey, spendLimitPerTransaction: BN, spendLimitPerTimeframe: BN, timeframeInSlots: BN): Promise<{
        ixs: TransactionInstruction[];
        lookupTables: AddressLookupTableAccount[];
        signers: Keypair[];
    }>;
    admin: {
        makeReclaimBridgeRentIxs: (messageSentEventData: PublicKey, attestation: Buffer<ArrayBuffer>) => Promise<TransactionInstruction[]>;
    };
}
//# sourceMappingURL=client.d.ts.map