import { DriftUser } from "./types/classes/driftUser.class.js";
import { DRIFT_PROGRAM_ID, MARKET_INDEX_USDC, MESSAGE_TRANSMITTER_PROGRAM_ID, SPEND_CALLER, TOKEN_MESSAGE_MINTER_PROGRAM_ID, } from "./config/constants.js";
import { getDriftSpotMarketVaultPublicKey, getDriftStatePublicKey, getPythOracle, getDriftSignerPublicKey, getVaultPublicKey, getVaultSplPublicKey, getCollateralRepayLedgerPublicKey, getBridgeRentPayerPublicKey, getLocalToken, getTokenMinter, getRemoteTokenMessenger, getTokenMessenger, getSenderAuthority, getMessageTransmitter, getEventAuthority, getInitRentPayerPublicKey, getSpendMulePda } from "./utils/accounts.js";
import { getTokenProgram, } from "./utils/helpers.js";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, } from "@solana/spl-token";
import { SystemProgram, SYSVAR_INSTRUCTIONS_PUBKEY } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import BN from "bn.js";
import { TOKENS } from "./config/tokens.js";
import { Keypair } from "@solana/web3.js";
export class QuartzUser {
    pubkey;
    vaultPubkey;
    spendLimitPerTransaction;
    spendLimitPerTimeframe;
    remainingSpendLimitPerTimeframe;
    nextTimeframeResetSlot;
    timeframeInSlots;
    connection;
    program;
    quartzLookupTable;
    driftUser;
    driftSigner;
    constructor(pubkey, connection, program, quartzLookupTable, driftClient, driftUserAccount, spendLimitPerTransaction, spendLimitPerTimeframe, remainingSpendLimitPerTimeframe, nextTimeframeResetSlot, timeframeInSlots) {
        this.pubkey = pubkey;
        this.connection = connection;
        this.program = program;
        this.quartzLookupTable = quartzLookupTable;
        this.vaultPubkey = getVaultPublicKey(pubkey);
        this.driftSigner = getDriftSignerPublicKey();
        this.spendLimitPerTransaction = spendLimitPerTransaction;
        this.spendLimitPerTimeframe = spendLimitPerTimeframe;
        this.remainingSpendLimitPerTimeframe = remainingSpendLimitPerTimeframe;
        this.nextTimeframeResetSlot = nextTimeframeResetSlot;
        this.timeframeInSlots = timeframeInSlots;
        this.driftUser = new DriftUser(this.vaultPubkey, driftClient, driftUserAccount);
    }
    getHealth() {
        return this.driftUser.getHealth();
    }
    getRepayUsdcValueForTargetHealth(targetHealth, repayAssetWeight, repayLiabilityWeight) {
        // New Quartz health after repayment is given as:
        // 
        //                         marginRequirement - (repayValue * repayLiabilityWeight)
        //   targetHealth =  1 - -----------------------------------------------------------
        //                       currentWeightedCollateral - (repayValue * repayAssetWeight)
        //
        // Where repayAssetWeight and repayLiabilityWeight are between 0 and 1.
        // The following is an algebraicly simplified expression of the above formula, in terms of repayValue.
        if (targetHealth < 0 || targetHealth > 100)
            throw Error("Target health must be between 0 and 100 inclusive");
        if (!Number.isInteger(targetHealth))
            throw new Error("Target health must be a whole number");
        if (repayAssetWeight < 0 || repayAssetWeight > 100)
            throw Error("Repay collateral weight must be between 0 and 100 inclusive");
        if (!Number.isInteger(repayAssetWeight))
            throw new Error("Repay collateral weight must be a whole number");
        if (repayLiabilityWeight < 100)
            throw Error("Repay liability weight must be greater or equal to 100");
        if (!Number.isInteger(repayLiabilityWeight))
            throw new Error("Repay liability weight must be a whole number");
        if (targetHealth <= this.getHealth())
            throw Error("Target health must be greater than current health");
        const currentWeightedCollateral = this.getTotalWeightedCollateralValue();
        const marginRequirement = this.getMarginRequirement();
        const targetHealthDecimal = targetHealth / 100;
        const repayAssetWeightDecimal = repayAssetWeight / 100;
        const repayLiabilityWeightDecimal = repayLiabilityWeight / 100;
        const repayValueUsdcBaseUnits = Math.round((currentWeightedCollateral * (targetHealthDecimal - 1) + marginRequirement) / (repayAssetWeightDecimal * (targetHealthDecimal - 1) + repayLiabilityWeightDecimal));
        return repayValueUsdcBaseUnits;
    }
    getTotalCollateralValue() {
        return this.driftUser.getTotalCollateralValue().toNumber(); // No params = not weighted
    }
    getTotalWeightedCollateralValue() {
        return this.driftUser.getTotalCollateralValue("Initial").toNumber();
    }
    getMarginRequirement() {
        return this.driftUser.getInitialMarginRequirement().toNumber();
    }
    getSpendableBalanceUsdcBaseUnits() {
        return this.driftUser.getFreeCollateral("Initial").toNumber();
    }
    async getTokenBalance(spotMarketIndex) {
        return this.driftUser.getTokenAmount(spotMarketIndex);
    }
    async getMultipleTokenBalances(marketIndices) {
        const balancesArray = await Promise.all(marketIndices.map(async (index) => ({
            index,
            balance: await this.getTokenBalance(index)
        })));
        const balances = balancesArray.reduce((acc, { index, balance }) => Object.assign(acc, { [index]: balance }), {});
        return balances;
    }
    async getWithdrawalLimit(spotMarketIndex, reduceOnly = false) {
        return this.driftUser.getWithdrawalLimit(spotMarketIndex, reduceOnly).toNumber();
    }
    async getMultipleWithdrawalLimits(spotMarketIndices, reduceOnly = false) {
        const limitsArray = await Promise.all(spotMarketIndices.map(async (index) => ({
            index,
            limit: await this.getWithdrawalLimit(index, reduceOnly)
        })));
        const limits = limitsArray.reduce((acc, { index, limit }) => Object.assign(acc, { [index]: limit }), {});
        return limits;
    }
    // --- Instructions ---
    async getLookupTables() {
        return [this.quartzLookupTable];
    }
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
    async makeCloseAccountIxs() {
        const ix_closeVault = await this.program.methods
            .closeUser()
            .accounts({
            vault: this.vaultPubkey,
            owner: this.pubkey,
            initRentPayer: getInitRentPayerPublicKey(),
            driftUser: this.driftUser.pubkey,
            driftUserStats: this.driftUser.statsPubkey,
            driftState: getDriftStatePublicKey(),
            driftProgram: DRIFT_PROGRAM_ID,
            systemProgram: SystemProgram.programId
        })
            .instruction();
        return {
            ixs: [ix_closeVault],
            lookupTables: [this.quartzLookupTable],
            signers: []
        };
    }
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
    async makeUpgradeAccountIxs(spendLimitPerTransaction, spendLimitPerTimeframe, timeframeInSlots) {
        const ix_upgradeAccount = await this.program.methods
            .upgradeVault(spendLimitPerTransaction, spendLimitPerTimeframe, timeframeInSlots)
            .accounts({
            vault: this.vaultPubkey,
            owner: this.pubkey,
            initRentPayer: getInitRentPayerPublicKey(),
            systemProgram: SystemProgram.programId
        })
            .instruction();
        return {
            ixs: [ix_upgradeAccount],
            lookupTables: [this.quartzLookupTable],
            signers: []
        };
    }
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
    async makeDepositIx(amountBaseUnits, marketIndex, reduceOnly) {
        const mint = TOKENS[marketIndex].mint;
        const tokenProgram = await getTokenProgram(this.connection, mint);
        const ownerSpl = await getAssociatedTokenAddress(mint, this.pubkey, false, tokenProgram);
        const ix = await this.program.methods
            .deposit(new BN(amountBaseUnits), marketIndex, reduceOnly)
            .accounts({
            vault: this.vaultPubkey,
            vaultSpl: getVaultSplPublicKey(this.pubkey, mint),
            owner: this.pubkey,
            ownerSpl: ownerSpl,
            splMint: mint,
            driftUser: this.driftUser.pubkey,
            driftUserStats: this.driftUser.statsPubkey,
            driftState: getDriftStatePublicKey(),
            spotMarketVault: getDriftSpotMarketVaultPublicKey(marketIndex),
            tokenProgram: tokenProgram,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            driftProgram: DRIFT_PROGRAM_ID,
            systemProgram: SystemProgram.programId
        })
            .remainingAccounts(this.driftUser.getRemainingAccounts(marketIndex))
            .instruction();
        return {
            ixs: [ix],
            lookupTables: [this.quartzLookupTable],
            signers: []
        };
    }
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
    async makeWithdrawIx(amountBaseUnits, marketIndex, reduceOnly) {
        const mint = TOKENS[marketIndex].mint;
        const tokenProgram = await getTokenProgram(this.connection, mint);
        const ownerSpl = await getAssociatedTokenAddress(mint, this.pubkey, false, tokenProgram);
        const ix = await this.program.methods
            .withdraw(new BN(amountBaseUnits), marketIndex, reduceOnly)
            .accounts({
            vault: this.vaultPubkey,
            vaultSpl: getVaultSplPublicKey(this.pubkey, mint),
            owner: this.pubkey,
            ownerSpl: ownerSpl,
            splMint: mint,
            driftUser: this.driftUser.pubkey,
            driftUserStats: this.driftUser.statsPubkey,
            driftState: getDriftStatePublicKey(),
            spotMarketVault: getDriftSpotMarketVaultPublicKey(marketIndex),
            driftSigner: this.driftSigner,
            tokenProgram: tokenProgram,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            driftProgram: DRIFT_PROGRAM_ID,
            systemProgram: SystemProgram.programId
        })
            .remainingAccounts(this.driftUser.getRemainingAccounts(marketIndex))
            .instruction();
        return {
            ixs: [ix],
            lookupTables: [this.quartzLookupTable],
            signers: []
        };
    }
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
    async makeAdjustSpendLimitsIxs(spendLimitPerTransaction, spendLimitPerTimeframe, timeframeInSlots) {
        const ix_adjustSpendLimits = await this.program.methods
            .adjustSpendLimits(spendLimitPerTransaction, spendLimitPerTimeframe, timeframeInSlots)
            .accounts({
            vault: this.vaultPubkey,
            owner: this.pubkey
        })
            .instruction();
        return {
            ixs: [ix_adjustSpendLimits],
            lookupTables: [this.quartzLookupTable],
            signers: []
        };
    }
    async makeSpendIxs(amountBaseUnits, spendCaller) {
        console.log(spendCaller.publicKey.toBase58());
        console.log(SPEND_CALLER.toBase58());
        console.log(spendCaller.publicKey.equals(SPEND_CALLER));
        if (!spendCaller.publicKey.equals(SPEND_CALLER)) {
            throw new Error("Unauthorized spend caller");
        }
        const messageSentEventData = Keypair.generate();
        const ix_startSpend = await this.program.methods
            .startSpend(new BN(amountBaseUnits))
            .accounts({
            vault: this.vaultPubkey,
            owner: this.pubkey,
            spendCaller: SPEND_CALLER,
            mule: getSpendMulePda(this.pubkey),
            usdcMint: TOKENS[MARKET_INDEX_USDC].mint,
            driftUser: this.driftUser.pubkey,
            driftUserStats: this.driftUser.statsPubkey,
            driftState: getDriftStatePublicKey(),
            spotMarketVault: getDriftSpotMarketVaultPublicKey(MARKET_INDEX_USDC),
            driftSigner: this.driftSigner,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            driftProgram: DRIFT_PROGRAM_ID,
            instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
            systemProgram: SystemProgram.programId,
        })
            .remainingAccounts(this.driftUser.getRemainingAccounts(MARKET_INDEX_USDC))
            .instruction();
        const ix_completeSpend = await this.program.methods
            .completeSpend()
            .accounts({
            vault: this.vaultPubkey,
            owner: this.pubkey,
            spendCaller: SPEND_CALLER,
            mule: getSpendMulePda(this.pubkey),
            usdcMint: TOKENS[MARKET_INDEX_USDC].mint,
            bridgeRentPayer: getBridgeRentPayerPublicKey(),
            senderAuthorityPda: getSenderAuthority(),
            messageTransmitter: getMessageTransmitter(),
            tokenMessenger: getTokenMessenger(),
            remoteTokenMessenger: getRemoteTokenMessenger(),
            tokenMinter: getTokenMinter(),
            localToken: getLocalToken(),
            messageSentEventData: messageSentEventData.publicKey,
            eventAuthority: getEventAuthority(),
            messageTransmitterProgram: MESSAGE_TRANSMITTER_PROGRAM_ID,
            tokenMessengerMinterProgram: TOKEN_MESSAGE_MINTER_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
            systemProgram: SystemProgram.programId,
        })
            .instruction();
        return {
            ixs: [ix_startSpend, ix_completeSpend],
            lookupTables: [this.quartzLookupTable],
            signers: [spendCaller, messageSentEventData]
        };
    }
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
    async makeCollateralRepayIxs(caller, depositMarketIndex, withdrawMarketIndex, swapInstruction) {
        const depositMint = TOKENS[depositMarketIndex].mint;
        const withdrawMint = TOKENS[withdrawMarketIndex].mint;
        const [depositTokenProgram, withdrawTokenProgram] = await Promise.all([
            getTokenProgram(this.connection, depositMint),
            getTokenProgram(this.connection, withdrawMint)
        ]);
        const [callerDepositSpl, callerWithdrawSpl] = await Promise.all([
            getAssociatedTokenAddress(depositMint, caller, false, depositTokenProgram),
            getAssociatedTokenAddress(withdrawMint, caller, false, withdrawTokenProgram)
        ]);
        const driftState = getDriftStatePublicKey();
        const collateralRepayLedger = getCollateralRepayLedgerPublicKey(this.pubkey);
        const startCollateralRepayPromise = this.program.methods
            .startCollateralRepay()
            .accounts({
            caller: caller,
            callerDepositSpl: callerDepositSpl,
            callerWithdrawSpl: callerWithdrawSpl,
            owner: this.pubkey,
            vault: this.vaultPubkey,
            mintDeposit: depositMint,
            mintWithdraw: withdrawMint,
            tokenProgramDeposit: depositTokenProgram,
            tokenProgramWithdraw: withdrawTokenProgram,
            systemProgram: SystemProgram.programId,
            instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
            ledger: collateralRepayLedger
        })
            .instruction();
        const depositCollateralRepayPromise = this.program.methods
            .depositCollateralRepay(depositMarketIndex)
            .accounts({
            caller: caller,
            callerSpl: callerDepositSpl,
            owner: this.pubkey,
            vault: this.vaultPubkey,
            vaultSpl: getVaultSplPublicKey(this.pubkey, depositMint),
            splMint: depositMint,
            driftUser: this.driftUser.pubkey,
            driftUserStats: this.driftUser.statsPubkey,
            driftState: driftState,
            spotMarketVault: getDriftSpotMarketVaultPublicKey(depositMarketIndex),
            tokenProgram: depositTokenProgram,
            driftProgram: DRIFT_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
            ledger: collateralRepayLedger
        })
            .remainingAccounts(this.driftUser.getRemainingAccounts(depositMarketIndex))
            .instruction();
        const withdrawCollateralRepayPromise = this.program.methods
            .withdrawCollateralRepay(withdrawMarketIndex)
            .accounts({
            caller: caller,
            callerSpl: callerWithdrawSpl,
            owner: this.pubkey,
            vault: this.vaultPubkey,
            vaultSpl: getVaultSplPublicKey(this.pubkey, withdrawMint),
            splMint: withdrawMint,
            driftUser: this.driftUser.pubkey,
            driftUserStats: this.driftUser.statsPubkey,
            driftState: driftState,
            spotMarketVault: getDriftSpotMarketVaultPublicKey(withdrawMarketIndex),
            driftSigner: this.driftSigner,
            tokenProgram: withdrawTokenProgram,
            driftProgram: DRIFT_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            depositPriceUpdate: getPythOracle(depositMarketIndex),
            withdrawPriceUpdate: getPythOracle(withdrawMarketIndex),
            instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
            ledger: collateralRepayLedger
        })
            .remainingAccounts(this.driftUser.getRemainingAccounts(withdrawMarketIndex))
            .instruction();
        const [ix_startCollateralRepay, ix_depositCollateralRepay, ix_withdrawCollateralRepay] = await Promise.all([
            startCollateralRepayPromise,
            depositCollateralRepayPromise,
            withdrawCollateralRepayPromise
        ]);
        return {
            ixs: [
                ix_startCollateralRepay,
                swapInstruction,
                ix_depositCollateralRepay,
                ix_withdrawCollateralRepay
            ],
            lookupTables: [this.quartzLookupTable],
            signers: []
        };
    }
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
    async makeTopUpCardIxs(amountUsdcBaseUnits) {
        const messageSentEventData = Keypair.generate();
        const ownerUsdc = await getAssociatedTokenAddress(TOKENS[MARKET_INDEX_USDC].mint, this.pubkey);
        const ix_topUpCard = await this.program.methods
            .topUpCard(new BN(amountUsdcBaseUnits))
            .accounts({
            vault: this.vaultPubkey,
            ownerUsdc: ownerUsdc,
            owner: this.pubkey,
            usdcMint: TOKENS[MARKET_INDEX_USDC].mint,
            bridgeRentPayer: getBridgeRentPayerPublicKey(),
            senderAuthorityPda: getSenderAuthority(),
            messageTransmitter: getMessageTransmitter(),
            tokenMessenger: getTokenMessenger(),
            remoteTokenMessenger: getRemoteTokenMessenger(),
            tokenMinter: getTokenMinter(),
            localToken: getLocalToken(),
            messageSentEventData: messageSentEventData.publicKey,
            eventAuthority: getEventAuthority(),
            messageTransmitterProgram: MESSAGE_TRANSMITTER_PROGRAM_ID,
            tokenMessengerMinterProgram: TOKEN_MESSAGE_MINTER_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
        })
            .remainingAccounts(this.driftUser.getRemainingAccounts(MARKET_INDEX_USDC))
            .instruction();
        return {
            ixs: [ix_topUpCard],
            lookupTables: [this.quartzLookupTable],
            signers: []
        };
    }
}
//# sourceMappingURL=user.js.map