import { BN } from "@drift-labs/sdk";
import { calculateBorrowRate, calculateDepositRate, DRIFT_PROGRAM_ID, fetchUserAccountsUsingKeys as fetchDriftAccountsUsingKeys } from "@drift-labs/sdk";
import { MARGINFI_GROUP_1, MARGINFI_PROGRAM_ID, MESSAGE_TRANSMITTER_PROGRAM_ID, QUARTZ_ADDRESS_TABLE, QUARTZ_PROGRAM_ID, RENT_RECLAIMER_PUBKEY } from "./config/constants.js";
import { IDL } from "./types/idl/quartz.js";
import { AnchorProvider, BorshInstructionCoder, Program, setProvider } from "@coral-xyz/anchor";
import { QuartzUser } from "./user.js";
import { getBridgeRentPayerPublicKey, getDriftStatePublicKey, getDriftUserPublicKey, getDriftUserStatsPublicKey, getInitRentPayerPublicKey, getMessageTransmitter, getVaultPublicKey } from "./utils/accounts.js";
import { SystemProgram, SYSVAR_RENT_PUBKEY, } from "@solana/web3.js";
import { DummyWallet } from "./types/classes/dummyWallet.class.js";
import { retryWithBackoff } from "./utils/helpers.js";
import { getConfig as getMarginfiConfig, MarginfiClient } from "@mrgnlabs/marginfi-client-v2";
import { Keypair } from "@solana/web3.js";
import { DriftClientService } from "./services/driftClientService.js";
export class QuartzClient {
    connection;
    program;
    quartzLookupTable;
    driftClient;
    constructor(connection, program, quartzAddressTable, driftClient) {
        this.connection = connection;
        this.program = program;
        this.quartzLookupTable = quartzAddressTable;
        this.driftClient = driftClient;
    }
    static async getProgram(connection) {
        const wallet = new DummyWallet();
        const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
        setProvider(provider);
        return new Program(IDL, QUARTZ_PROGRAM_ID, provider);
    }
    static async fetchClient(connection) {
        const program = await QuartzClient.getProgram(connection);
        const quartzLookupTable = await connection.getAddressLookupTable(QUARTZ_ADDRESS_TABLE).then((res) => res.value);
        if (!quartzLookupTable)
            throw Error("Address Lookup Table account not found");
        const driftClient = await DriftClientService.getDriftClient(connection);
        return new QuartzClient(connection, program, quartzLookupTable, driftClient);
    }
    static async doesQuartzUserExist(connection, owner) {
        const vault = getVaultPublicKey(owner);
        const program = await QuartzClient.getProgram(connection);
        try {
            await retryWithBackoff(async () => {
                await program.account.vault.fetch(vault);
            }, 3);
            return true;
        }
        catch {
            return false;
        }
    }
    async getAllQuartzAccountOwnerPubkeys() {
        return (await this.program.account.vault.all()).map((vault) => vault.account.owner);
    }
    async getQuartzAccount(owner) {
        const vaultAddress = getVaultPublicKey(owner);
        const vaultAccount = await this.program.account.vault.fetch(vaultAddress); // Check account exists
        const [driftUserAccount] = await fetchDriftAccountsUsingKeys(this.connection, this.driftClient.program, [getDriftUserPublicKey(vaultAddress)]);
        if (!driftUserAccount)
            throw Error("Drift user not found");
        return new QuartzUser(owner, this.connection, this.program, this.quartzLookupTable, this.driftClient, driftUserAccount, vaultAccount.spendLimitPerTransaction, vaultAccount.spendLimitPerTimeframe, vaultAccount.remainingSpendLimitPerTimeframe, vaultAccount.nextTimeframeResetSlot, vaultAccount.timeframeInSlots);
    }
    async getMultipleQuartzAccounts(owners) {
        if (owners.length === 0)
            return [];
        const vaultAddresses = owners.map((owner) => getVaultPublicKey(owner));
        const vaultAccounts = await this.program.account.vault.fetchMultiple(vaultAddresses);
        vaultAccounts.forEach((account, index) => {
            if (account === null)
                throw Error(`Account not found for pubkey: ${vaultAddresses[index]?.toBase58()}`);
        });
        const driftUsers = await fetchDriftAccountsUsingKeys(this.connection, this.driftClient.program, vaultAddresses.map((vault) => getDriftUserPublicKey(vault)));
        // TODO: Uncomment once Drift accounts are guaranteed
        // const undefinedIndex = driftUsers.findIndex(user => !user);
        // if (undefinedIndex !== -1) {
        //     throw new Error(`[${this.wallet?.publicKey}] Failed to fetch drift user for vault ${vaults[undefinedIndex].toBase58()}`);
        // }
        return driftUsers.map((driftUser, index) => {
            if (driftUser === undefined)
                return null;
            if (owners[index] === undefined)
                throw Error("Missing pubkey in owners array");
            const vaultAccount = vaultAccounts[index];
            if (!vaultAccount)
                throw Error(`Vault account not found for pubkey: ${vaultAddresses[index]?.toBase58()}`);
            return new QuartzUser(owners[index], this.connection, this.program, this.quartzLookupTable, this.driftClient, driftUser, vaultAccount.spendLimitPerTransaction, vaultAccount.spendLimitPerTimeframe, vaultAccount.remainingSpendLimitPerTimeframe, vaultAccount.nextTimeframeResetSlot, vaultAccount.timeframeInSlots);
        });
    }
    async getDepositRate(spotMarketIndex) {
        const spotMarket = await this.getSpotMarketAccount(spotMarketIndex);
        const depositRate = calculateDepositRate(spotMarket);
        return depositRate;
    }
    async getBorrowRate(spotMarketIndex) {
        const spotMarket = await this.getSpotMarketAccount(spotMarketIndex);
        const borrowRate = calculateBorrowRate(spotMarket);
        return borrowRate;
    }
    async getSpotMarketAccount(spotMarketIndex) {
        const spotMarket = await this.driftClient.getSpotMarketAccount(spotMarketIndex);
        if (!spotMarket)
            throw Error("Spot market not found");
        return spotMarket;
    }
    async listenForInstruction(instructionName, onInstruction) {
        this.connection.onLogs(QUARTZ_PROGRAM_ID, async (logs) => {
            if (!logs.logs.some(log => log.includes(instructionName)))
                return;
            const tx = await retryWithBackoff(async () => {
                const tx = await this.connection.getTransaction(logs.signature, {
                    maxSupportedTransactionVersion: 0,
                    commitment: 'confirmed'
                });
                if (!tx)
                    throw new Error("Transaction not found");
                return tx;
            });
            const encodedIxs = tx.transaction.message.compiledInstructions;
            const coder = new BorshInstructionCoder(IDL);
            for (const ix of encodedIxs) {
                try {
                    const quartzIx = coder.decode(Buffer.from(ix.data), "base58");
                    if (quartzIx?.name.toLowerCase() === instructionName.toLowerCase()) {
                        const accountKeys = tx.transaction.message.staticAccountKeys;
                        onInstruction(ix, accountKeys);
                    }
                }
                catch { }
            }
        }, "confirmed");
    }
    static async parseTopUpIx(connection, signature, owner) {
        const INSRTUCTION_NAME = "topUpCard";
        const ACCOUNT_INDEX_OWNER = 1;
        const ACCOUNT_INDEX_MESSAGE_SENT_EVENT_DATA = 11;
        const tx = await connection.getTransaction(signature, {
            maxSupportedTransactionVersion: 0,
            commitment: "finalized"
        });
        if (!tx)
            throw new Error("Transaction not found");
        const encodedIxs = tx.transaction.message.compiledInstructions;
        const coder = new BorshInstructionCoder(IDL);
        const messageSentEventDataAccounts = [];
        let totalTopUpBaseUnits = new BN(0);
        for (const ix of encodedIxs) {
            try {
                const quartzIx = coder.decode(Buffer.from(ix.data), "base58");
                if (quartzIx?.name.toLowerCase() === INSRTUCTION_NAME.toLowerCase()) {
                    const accountKeys = tx.transaction.message.staticAccountKeys;
                    const ownerIndex = ix.accountKeyIndexes?.[ACCOUNT_INDEX_OWNER];
                    if (ownerIndex === undefined || accountKeys[ownerIndex] === undefined) {
                        throw new Error("Owner not found");
                    }
                    const actualOwner = accountKeys[ownerIndex];
                    if (!actualOwner.equals(owner))
                        throw new Error("Owner does not match");
                    const args = quartzIx.data;
                    totalTopUpBaseUnits = totalTopUpBaseUnits.add(args.amountUsdcBaseUnits);
                    const messageSentEventDataIndex = ix.accountKeyIndexes?.[ACCOUNT_INDEX_MESSAGE_SENT_EVENT_DATA];
                    if (messageSentEventDataIndex === undefined || accountKeys[messageSentEventDataIndex] === undefined) {
                        throw new Error("Message sent event data not found");
                    }
                    messageSentEventDataAccounts.push(accountKeys[messageSentEventDataIndex]);
                }
            }
            catch { }
        }
        return {
            amountBaseUnits: totalTopUpBaseUnits,
            messageSentEventDataAccounts
        };
    }
    // --- Instructions ---
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
    async makeInitQuartzUserIxs(owner, spendLimitPerTransaction, spendLimitPerTimeframe, timeframeInSlots) {
        const wallet = new DummyWallet(owner);
        const marginfiClient = await MarginfiClient.fetch(getMarginfiConfig(), wallet, this.connection);
        const marginfiAccounts = await marginfiClient.getMarginfiAccountsForAuthority(owner);
        const requiresMarginfiAccount = (marginfiAccounts.length === 0);
        const vault = getVaultPublicKey(owner);
        const marginfiAccount = Keypair.generate();
        const ix_initUser = await this.program.methods
            .initUser(requiresMarginfiAccount, spendLimitPerTransaction, spendLimitPerTimeframe, timeframeInSlots)
            .accounts({
            vault: vault,
            owner: owner,
            initRentPayer: getInitRentPayerPublicKey(),
            driftUser: getDriftUserPublicKey(vault),
            driftUserStats: getDriftUserStatsPublicKey(vault),
            driftState: getDriftStatePublicKey(),
            driftProgram: DRIFT_PROGRAM_ID,
            marginfiGroup: MARGINFI_GROUP_1,
            marginfiAccount: marginfiAccount.publicKey,
            marginfiProgram: MARGINFI_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
        })
            .instruction();
        return {
            ixs: [ix_initUser],
            lookupTables: [this.quartzLookupTable],
            signers: [marginfiAccount]
        };
    }
    admin = {
        makeReclaimBridgeRentIxs: async (messageSentEventData, attestation) => {
            const ix_reclaimBridgeRent = await this.program.methods
                .reclaimBridgeRent(attestation)
                .accounts({
                rentReclaimer: RENT_RECLAIMER_PUBKEY,
                bridgeRentPayer: getBridgeRentPayerPublicKey(),
                messageTransmitter: getMessageTransmitter(),
                messageSentEventData: messageSentEventData,
                cctpMessageTransmitter: MESSAGE_TRANSMITTER_PROGRAM_ID
            })
                .instruction();
            return [ix_reclaimBridgeRent];
        }
    };
}
//# sourceMappingURL=client.js.map