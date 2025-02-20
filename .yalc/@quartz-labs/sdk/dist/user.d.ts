import type { DriftClient, UserAccount } from "@drift-labs/sdk";
import type { Connection, AddressLookupTableAccount, TransactionInstruction } from "@solana/web3.js";
import type { Quartz } from "./types/idl/quartz.js";
import type { Program } from "@coral-xyz/anchor";
import type { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { type MarketIndex } from "./config/tokens.js";
import { Keypair } from "@solana/web3.js";
export declare class QuartzUser {
    readonly pubkey: PublicKey;
    readonly vaultPubkey: PublicKey;
    readonly spendLimitPerTransaction: BN;
    readonly spendLimitPerTimeframe: BN;
    readonly remainingSpendLimitPerTimeframe: BN;
    readonly nextTimeframeResetSlot: BN;
    readonly timeframeInSlots: BN;
    private connection;
    private program;
    private quartzLookupTable;
    private driftUser;
    private driftSigner;
    constructor(pubkey: PublicKey, connection: Connection, program: Program<Quartz>, quartzLookupTable: AddressLookupTableAccount, driftClient: DriftClient, driftUserAccount: UserAccount, spendLimitPerTransaction: BN, spendLimitPerTimeframe: BN, remainingSpendLimitPerTimeframe: BN, nextTimeframeResetSlot: BN, timeframeInSlots: BN);
    getHealth(): number;
    getRepayUsdcValueForTargetHealth(targetHealth: number, repayAssetWeight: number, repayLiabilityWeight: number): number;
    getTotalCollateralValue(): number;
    getTotalWeightedCollateralValue(): number;
    getMarginRequirement(): number;
    getSpendableBalanceUsdcBaseUnits(): number;
    getTokenBalance(spotMarketIndex: number): Promise<BN>;
    getMultipleTokenBalances(marketIndices: MarketIndex[]): Promise<Record<MarketIndex, BN>>;
    getWithdrawalLimit(spotMarketIndex: number, reduceOnly?: boolean): Promise<number>;
    getMultipleWithdrawalLimits(spotMarketIndices: MarketIndex[], reduceOnly?: boolean): Promise<Record<MarketIndex, number>>;
    getLookupTables(): Promise<AddressLookupTableAccount[]>;
    /**
     * Creates instructions to close a Quartz user account. This cannot be undone.
     * @returns {Promise<{
     *     ixs: TransactionInstruction[],
     *     lookupTables: AddressLookupTableAccount[],
     *     signers: Keypair[]
     * }>} Object containing:
     * - ixs: Array of instructions to close the Quartz user account.
     * - lookupTables: Array of lookup tables for building VersionedTransaction.
     * - signers: Array of signer keypairs that must sign the transaction the instructions are added to.
     * @throw Error if the RPC connection fails. The transaction will fail if the account has any balance or loans, or is less than 13 days old.
     */
    makeCloseAccountIxs(): Promise<{
        ixs: TransactionInstruction[];
        lookupTables: AddressLookupTableAccount[];
        signers: Keypair[];
    }>;
    /**
     * Creates instructions to upgrade a Quartz user account.
     * @param spendLimitPerTransaction - The card spend limit per transaction.
     * @param spendLimitPerTimeframe - The card spend limit per timeframe.
     * @param timeframeInSlots - The timeframe in slots (eg: 216,000 for ~1 day).
     * @returns {Promise<{
     *     ixs: TransactionInstruction[],
     *     lookupTables: AddressLookupTableAccount[],
     *     signers: Keypair[]
     * }>} Object containing:
     * - ixs: Array of instructions to upgrade the Quartz user account.
     * - lookupTables: Array of lookup tables for building VersionedTransaction.
     * - signers: Array of signer keypairs that must sign the transaction the instructions are added to.
     * @throw Error if the RPC connection fails. The transaction will fail if the account does not require an upgrade.
     */
    makeUpgradeAccountIxs(spendLimitPerTransaction: BN, spendLimitPerTimeframe: BN, timeframeInSlots: BN): Promise<{
        ixs: TransactionInstruction[];
        lookupTables: AddressLookupTableAccount[];
        signers: Keypair[];
    }>;
    /**
     * Creates instructions to deposit a token into the Quartz user account.
     * @param amountBaseUnits - The amount of tokens to deposit.
     * @param marketIndex - The market index of the token to deposit.
     * @param reduceOnly - True means amount will be capped so a negative balance (loan) cannot become a positive balance (collateral).
     * @returns {Promise<{
     *     ixs: TransactionInstruction[],
     *     lookupTables: AddressLookupTableAccount[],
     *     signers: Keypair[]
     * }>} Object containing:
     * - ixs: Array of instructions to deposit the token into the Quartz user account.
     * - lookupTables: Array of lookup tables for building VersionedTransaction.
     * - signers: Array of signer keypairs that must sign the transaction the instructions are added to.
     * @throw Error if the RPC connection fails. The transaction will fail if the owner does not have enough tokens.
     */
    makeDepositIx(amountBaseUnits: number, marketIndex: MarketIndex, reduceOnly: boolean): Promise<{
        ixs: TransactionInstruction[];
        lookupTables: AddressLookupTableAccount[];
        signers: Keypair[];
    }>;
    /**
     * Creates instructions to withdraw a token from the Quartz user account.
     * @param amountBaseUnits - The amount of tokens to withdraw.
     * @param marketIndex - The market index of the token to withdraw.
     * @param reduceOnly - True means amount will be capped so a positive balance (collateral) cannot become a negative balance (loan).
     * @returns {Promise<{
     *     ixs: TransactionInstruction[],
     *     lookupTables: AddressLookupTableAccount[],
     *     signers: Keypair[]
     * }>} Object containing:
     * - ixs: Array of instructions to withdraw the token from the Quartz user account.
     * - lookupTables: Array of lookup tables for building VersionedTransaction.
     * - signers: Array of signer keypairs that must sign the transaction the instructions are added to.
     * @throw Error if the RPC connection fails. The transaction will fail if the account does not have enough tokens or, (when taking out a loan) the account health is not high enough for a loan.
     */
    makeWithdrawIx(amountBaseUnits: number, marketIndex: MarketIndex, reduceOnly: boolean): Promise<{
        ixs: TransactionInstruction[];
        lookupTables: AddressLookupTableAccount[];
        signers: Keypair[];
    }>;
    /**
     * Creates instructions to adjust the spend limits of a Quartz user account.
     * @param spendLimitPerTransaction - The new spend limit per transaction.
     * @param spendLimitPerTimeframe - The new spend limit per timeframe.
     * @param timeframeInSlots - The new timeframe in slots.
     * @returns {Promise<{
     *     ixs: TransactionInstruction[],
     *     lookupTables: AddressLookupTableAccount[],
     *     signers: Keypair[]
     * }>} Object containing:
     * - ixs: Array of instructions to adjust the spend limits.
     * - lookupTables: Array of lookup tables for building VersionedTransaction.
     * - signers: Array of signer keypairs that must sign the transaction the instructions are added to.
     * @throw Error if the RPC connection fails.
     */
    makeAdjustSpendLimitsIxs(spendLimitPerTransaction: BN, spendLimitPerTimeframe: BN, timeframeInSlots: BN): Promise<{
        ixs: TransactionInstruction[];
        lookupTables: AddressLookupTableAccount[];
        signers: Keypair[];
    }>;
    makeSpendIxs(amountBaseUnits: number, spendCaller: Keypair): Promise<{
        ixs: TransactionInstruction[];
        lookupTables: AddressLookupTableAccount[];
        signers: Keypair[];
    }>;
    /**
     * Creates instructions to repay a loan using collateral.
     * @param caller - The public key of the caller, this can be the owner or someone else if account health is 0%.
     * @param depositMarketIndex - The market index of the loan token to deposit.
     * @param withdrawMarketIndex - The market index of the collateral token to withdraw.
     * @param swapInstruction - The swap instruction to use. Deposit and withdrawn amounts are calculated by the balance change after this instruction.
     * @returns {Promise<{
     *     ixs: TransactionInstruction[],
     *     lookupTables: AddressLookupTableAccount[],
     *     signers: Keypair[]
     * }>} Object containing:
     * - ixs: Array of instructions to repay the loan using collateral.
     * - lookupTables: Array of lookup tables for building VersionedTransaction.
     * - signers: Array of signer keypairs that must sign the transaction the instructions are added to.
     * @throw Error if the RPC connection fails. The transaction will fail if:
     * - the caller does not have enough tokens.
     * - the account health is above 0% and the caller is not the owner.
     * - the account health is 0% and the caller is not the owner, but the health has not increased above 0% after the repay.
     */
    makeCollateralRepayIxs(caller: PublicKey, depositMarketIndex: MarketIndex, withdrawMarketIndex: MarketIndex, swapInstruction: TransactionInstruction): Promise<{
        ixs: TransactionInstruction[];
        lookupTables: AddressLookupTableAccount[];
        signers: Keypair[];
    }>;
    /**
     * Creates instructions to top up the card.
     * @param amountUsdcBaseUnits - The amount of USDC base tokens to top up the card with.
     * @returns {Promise<{
     *     ixs: TransactionInstruction[],
     *     lookupTables: AddressLookupTableAccount[],
     *     signerKeypair: Keypair
     * }>} Object containing:
     * - ixs: Array of instructions to top up the card.
     * - lookupTables: Array of lookup tables for building VersionedTransaction.
     * - signers: Keypairs that must sign the transaction the instructions are added to.
     * @throw Error if the RPC connection fails. The transaction will fail if the owner does not have enough tokens or, (when taking out a loan) the account health is not high enough for a loan.
     */
    makeTopUpCardIxs(amountUsdcBaseUnits: number): Promise<{
        ixs: TransactionInstruction[];
        lookupTables: AddressLookupTableAccount[];
        signers: Keypair[];
    }>;
}
//# sourceMappingURL=user.d.ts.map