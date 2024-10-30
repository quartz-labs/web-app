import quartzIdl from "../idl/funds_program.json";
import { FundsProgram } from "@/types/funds_program";
import marginfiIdl from "../idl/marginfi.json";
import { MarginFi } from "@/types/marginfi";

import { AnchorProvider, BN, Idl, Program, setProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
    DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, DRIFT_PROGRAM_ID, DRIFT_SPOT_MARKET_SOL, DRIFT_SPOT_MARKET_USDC, DRIFT_SIGNER,
    DRIFT_ORACLE_1, DRIFT_ORACLE_2,
    USDC_MINT, WSOL_MINT,
    MARGINFI_GROUP_1,
    DECIMALS_USDC,
    FUNDS_PROGRAM_ADDRESS_TABLE
} from "./constants";
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SystemProgram, VersionedTransaction, TransactionMessage, Connection } from "@solana/web3.js";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { getDriftSpotMarketVault, getDriftState, getDriftUser, getDriftUserStats, getVault, getVaultSpl, toRemainingAccount } from "./getAccounts";
import { baseUnitToUi, createAtaIfNeeded, makeFlashLoanTx } from "./helpers";
import { createCloseAccountInstruction, createSyncNativeInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { Keypair } from "@solana/web3.js";
import { MarginfiClient, getConfig } from '@mrgnlabs/marginfi-client-v2';
import { createPriorityFeeInstructions, sendTransactionHandler } from "./transactionSender";
import { getJupiterSwapIx, getJupiterSwapQuote } from "./jupiter";
import BigNumber from "bignumber.js";
import { ShowErrorProps } from "@/context/error-provider";
import { captureError } from "@/utils/errors";

export const initAccount = async (wallet: AnchorWallet, connection: web3.Connection, showError: (props: ShowErrorProps) => void) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const quartzProgram = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const marginfiProgram = new Program(marginfiIdl as Idl, provider) as unknown as Program<MarginFi>;
    const marginfiClient = await MarginfiClient.fetch(getConfig(), wallet, connection);

    const vaultPda = getVault(wallet.publicKey);
    const driftUser = getDriftUser(vaultPda);
    const driftUserStats = getDriftUserStats(vaultPda);
    const driftState = getDriftState();
    const marginfiAccount = Keypair.generate();

    try {
        const ix_initUser = await quartzProgram.methods
            .initUser()
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                owner: wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const ix_initVaultDriftAccount = await quartzProgram.methods
            .initDriftAccount()
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                owner: wallet.publicKey,
                driftUser: driftUser,
                driftUserStats: driftUserStats,
                driftState: driftState,
                driftProgram: DRIFT_PROGRAM_ID,
                rent: web3.SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const computeBudget = 200_000;
        

        const instructions = [ix_initUser, ix_initVaultDriftAccount];
        // Create MarginFi account if user doesn't have one already
        const marginfiAccounts = await marginfiClient.getMarginfiAccountsForAuthority(wallet.publicKey);
        if (marginfiAccounts.length === 0) {
            const ix_initMarginfiAccount = await marginfiProgram.methods
                .marginfiAccountInitialize()
                .accounts({
                    marginfiGroup: MARGINFI_GROUP_1,
                    marginfiAccount: marginfiAccount.publicKey,
                    authority: wallet.publicKey,
                    feePayer: wallet.publicKey,
                    systemProgram: SystemProgram.programId
                })
                .instruction();
            instructions.push(ix_initMarginfiAccount);
        }

        const ix_priority = await createPriorityFeeInstructions(connection, instructions, computeBudget);
        instructions.unshift(...ix_priority);

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [...instructions],
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        signedTx.sign([marginfiAccount]);
        const signature = await sendTransactionHandler(showError, connection, signedTx);
        return signature;
    } catch (error) {
        if (!(error instanceof WalletSignTransactionError)) {
            captureError(showError, "Could not initialize account", "utils: /instructions.ts", error, wallet.publicKey);
        }
        return null;
    }
}


export const closeAccount = async (wallet: AnchorWallet, connection: web3.Connection, showError: (props: ShowErrorProps) => void) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;

    const vaultPda = getVault(wallet.publicKey);
    const driftUser = getDriftUser(vaultPda);
    const driftUserStats = getDriftUserStats(vaultPda);
    const driftState = getDriftState();

    try {
        const ix_closeDriftAccount = await program.methods
            .closeDriftAccount()
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                owner: wallet.publicKey,
                driftUser: driftUser,
                driftUserStats: driftUserStats,
                driftState: driftState,
                driftProgram: DRIFT_PROGRAM_ID
            })
            .instruction();

        const ix_closeVault = await program.methods
            .closeUser()
            .accounts({
                vault: vaultPda,
                owner: wallet.publicKey
            })
            .instruction();

        const latestBlockhash = await connection.getLatestBlockhash();

        const computeBudget = 200_000;

        const instructions = [ix_closeDriftAccount, ix_closeVault];
        const ix_priority = await createPriorityFeeInstructions(connection, instructions, computeBudget);

        instructions.unshift(...ix_priority);

        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: instructions,
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(showError, connection, signedTx);
        return signature;
    } catch (error) {
        if (!(error instanceof WalletSignTransactionError)) {
            captureError(showError, "Could not close account", "utils: /instructions.ts", error, wallet.publicKey)
        }
        return null;
    }
}


export const depositLamports = async (wallet: AnchorWallet, connection: web3.Connection, amountLamports: number, showError: (props: ShowErrorProps) => void) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;

    const walletWSol = await getAssociatedTokenAddress(WSOL_MINT, wallet.publicKey);
    const vaultPda = getVault(wallet.publicKey);

    try {
        const oix_createWSolAta = await createAtaIfNeeded(connection, walletWSol, wallet.publicKey, WSOL_MINT);

        const ix_wrapSol = SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: walletWSol,
            lamports: amountLamports
        });

        const ix_syncNative = createSyncNativeInstruction(walletWSol);

        const ix_deposit = await program.methods
            .deposit(new BN(amountLamports), DRIFT_MARKET_INDEX_SOL, false)
            .accounts({
                //@ts-expect-error: IDL issues
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, WSOL_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletWSol,
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
                splMint: WSOL_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                systemProgram: SystemProgram.programId
            })
            .remainingAccounts([
                toRemainingAccount(DRIFT_ORACLE_1, false, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_SOL, true, false)
            ])
            .instruction();

        const ix_closeWSolAta = createCloseAccountInstruction(
            walletWSol,
            wallet.publicKey,
            wallet.publicKey
        );

        const computeBudget = 200_000;
        const instructions = [...oix_createWSolAta, ix_wrapSol, ix_syncNative, ix_deposit, ix_closeWSolAta];
        const ix_priority = await createPriorityFeeInstructions(connection, instructions, computeBudget);
        instructions.unshift(...ix_priority);

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: instructions,
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(showError, connection, signedTx);
        return signature;
    } catch (error) {
        if (!(error instanceof WalletSignTransactionError)) {
            captureError(showError, "Could not deposit SOL", "utils: /instructions.ts", error, wallet.publicKey);
        }
        return null;
    }
}


export const withdrawLamports = async (wallet: AnchorWallet, connection: web3.Connection, amountLamports: number, showError: (props: ShowErrorProps) => void) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;

    const walletWSol = await getAssociatedTokenAddress(WSOL_MINT, wallet.publicKey);
    const vaultPda = getVault(wallet.publicKey);

    try {
        const oix_createWSolAta = await createAtaIfNeeded(connection, walletWSol, wallet.publicKey, WSOL_MINT);

        const ix_withdraw = await program.methods
            .withdraw(new BN(amountLamports), DRIFT_MARKET_INDEX_SOL, true)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, WSOL_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletWSol,
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
                driftSigner: DRIFT_SIGNER,
                splMint: WSOL_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
            })
            .remainingAccounts([
                toRemainingAccount(DRIFT_ORACLE_2, false, false),
                toRemainingAccount(DRIFT_ORACLE_1, false, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_SOL, true, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_USDC, false, false)
            ])
            .instruction();

        const ix_closeWSolAta = createCloseAccountInstruction(
            walletWSol,
            wallet.publicKey,
            wallet.publicKey
        );

        const computeBudget = 250_000;
        const instructions = [...oix_createWSolAta, ix_withdraw, ix_closeWSolAta];
        const ix_priority = await createPriorityFeeInstructions(connection, instructions, computeBudget);
        instructions.unshift(...ix_priority);

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: instructions,
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(showError, connection, signedTx);
        return signature;
    } catch (error) {
        if (!(error instanceof WalletSignTransactionError)) {
            captureError(showError, "Could not withdraw SOL", "utils: /instructions.ts", error, wallet.publicKey);
        }
        return null;
    }
}


export const depositUsdc = async (wallet: AnchorWallet, connection: Connection, amountMicroCents: number, showError: (props: ShowErrorProps) => void) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);

    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    if (!walletUsdc) throw new Error("No USDC account found on connected wallet");

    try {
        const ix_deposit = await program.methods
            .deposit(new BN(amountMicroCents), DRIFT_MARKET_INDEX_USDC, false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, USDC_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletUsdc,
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
                splMint: USDC_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                systemProgram: SystemProgram.programId
            })
            .remainingAccounts([
                toRemainingAccount(DRIFT_ORACLE_2, false, false),
                toRemainingAccount(DRIFT_ORACLE_1, false, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_SOL, true, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_USDC, true, false)
            ])
            .instruction();

        const computeBudget = 200_000;
        const instructions = [ix_deposit];
        const ix_priority = await createPriorityFeeInstructions(connection, instructions, computeBudget);
        instructions.unshift(...ix_priority);

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: instructions,
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(showError, connection, signedTx);
        return signature;
    } catch (error) {
        if (!(error instanceof WalletSignTransactionError)) {
            captureError(showError, "Could not deposit USDC", "utils: /instructions.ts", error, wallet.publicKey);
        }
        return null;
    }
}


export const withdrawUsdc = async (wallet: AnchorWallet, connection: web3.Connection, amountMicroCents: number, showError: (props: ShowErrorProps) => void) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);
    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);

    try {
        const oix_createAta = await createAtaIfNeeded(connection, walletUsdc, wallet.publicKey, USDC_MINT);

        const ix_withdraw = await program.methods
            .withdraw(new BN(amountMicroCents), DRIFT_MARKET_INDEX_USDC, false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, USDC_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletUsdc,
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
                driftSigner: DRIFT_SIGNER,
                splMint: USDC_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
            })
            .remainingAccounts([
                toRemainingAccount(DRIFT_ORACLE_1, false, false),
                toRemainingAccount(DRIFT_ORACLE_2, false, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_SOL, true, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_USDC, true, false)
            ])
            .instruction();

        const computeBudget = 200_000;
        const instructions = [...oix_createAta, ix_withdraw];
        const ix_priority = await createPriorityFeeInstructions(connection, instructions, computeBudget);
        instructions.unshift(...ix_priority);

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: instructions,
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(showError, connection, signedTx);
        return signature;
    } catch (error) {
        if (!(error instanceof WalletSignTransactionError)) {
            captureError(showError, "Could not withdraw USDC", "utils: /instructions.ts", error, wallet.publicKey);
        }
        return null;
    }
}


export const liquidateSol = async (wallet: AnchorWallet, connection: web3.Connection, amountMicroCents: number, showError: (props: ShowErrorProps) => void) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const quartzProgram = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;

    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    const walletWSol = await getAssociatedTokenAddress(WSOL_MINT, wallet.publicKey);

    const vaultPda = getVault(wallet.publicKey);
    const driftUser = getDriftUser(vaultPda);
    const driftUserStats = getDriftUserStats(vaultPda);
    const driftState = getDriftState();

    try {
        // Get MarginFi client and bank
        const marginfiClient = await MarginfiClient.fetch(getConfig(), wallet, connection);
        const usdcBank = marginfiClient.getBankByTokenSymbol("USDC");
        if (!usdcBank) throw Error(`${"USDC"} bank not found`);

        // Init MarginFi Account if not found
        let marginfiAccounts = await marginfiClient.getMarginfiAccountsForAuthority(wallet.publicKey);
        if (marginfiAccounts.length === 0) marginfiAccounts = await createNewMarginfiAccount(showError, wallet, connection, provider, marginfiClient);
        const marginfiAccount = marginfiAccounts[0];

        // Get price info for flash loan
        const jupiterQuote = await getJupiterSwapQuote(WSOL_MINT, USDC_MINT, amountMicroCents, true);
        const amountLamports = Number(jupiterQuote.inAmount);
        if (isNaN(amountLamports)) throw Error(`Invalid Jupiter quote`);

        // -- ADDRESS LOOKUP TABLE
        const fundsProgramLookupTable = await connection.getAddressLookupTable(FUNDS_PROGRAM_ADDRESS_TABLE).then((res) => res.value);
        if (!fundsProgramLookupTable) throw Error("Address Lookup Table account not found");

        // Build instructions
        const oix_createWSolAta = await createAtaIfNeeded(connection, walletWSol, wallet.publicKey, WSOL_MINT);

        const ix_depositUsdc = await quartzProgram.methods
            .deposit(new BN(amountMicroCents), DRIFT_MARKET_INDEX_USDC, false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, USDC_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletUsdc,
                driftState: driftState,
                driftUser: driftUser,
                driftUserStats: driftUserStats,
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
                splMint: USDC_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                systemProgram: SystemProgram.programId
            })
            .remainingAccounts([
                toRemainingAccount(DRIFT_ORACLE_2, false, false),
                toRemainingAccount(DRIFT_ORACLE_1, false, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_SOL, true, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_USDC, true, false)
            ])
            .instruction();

        const ix_withdrawLamports = await quartzProgram.methods
            .withdraw(new BN(amountLamports), DRIFT_MARKET_INDEX_SOL, true)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, WSOL_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletWSol,
                driftState: driftState,
                driftUser: driftUser,
                driftUserStats: driftUserStats,
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
                driftSigner: DRIFT_SIGNER,
                splMint: WSOL_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
            })
            .remainingAccounts([
                toRemainingAccount(DRIFT_ORACLE_2, false, false),
                toRemainingAccount(DRIFT_ORACLE_1, false, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_SOL, true, false),
                toRemainingAccount(DRIFT_SPOT_MARKET_USDC, false, false)
            ])
            .instruction();

        const ix_closeWSolAta = createCloseAccountInstruction(
            walletWSol,
            wallet.publicKey,
            wallet.publicKey
        );

        const {
            instructions: jupiterSwap,
            addressLookupTableAccounts: jupiterLookupTables
        } = await getJupiterSwapIx(wallet.publicKey, connection, jupiterQuote);

        // Create flash loan and send tx
        const amountUsdc = new BigNumber(baseUnitToUi(amountMicroCents, DECIMALS_USDC));
        const { flashloanTx } = await makeFlashLoanTx(
            marginfiAccount,
            amountUsdc,
            usdcBank.address,
            [...oix_createWSolAta, ix_depositUsdc, ix_withdrawLamports, ...jupiterSwap, ix_closeWSolAta],
            [fundsProgramLookupTable, ...jupiterLookupTables],
            0.002,
            true
        );

        const signedTx = await wallet.signTransaction(flashloanTx);
        const signature = await sendTransactionHandler(showError, connection, signedTx);
        return signature;
    } catch (error) {
        if (!(error instanceof WalletSignTransactionError)) {
            captureError(showError, "Could not withdraw USDC", "utils: /instructions.ts", error, wallet.publicKey);
        }
        return null;
    }
}


const createNewMarginfiAccount = async (showError: (props: ShowErrorProps) => void, wallet: AnchorWallet, connection: Connection, provider: AnchorProvider, client: MarginfiClient) => {
    console.log("Creating MarginFi account");
    const marginfiProgram = new Program(marginfiIdl as Idl, provider) as unknown as Program<MarginFi>;
    const newAccount = Keypair.generate();

    const ix_createAccount = await marginfiProgram.methods
        .marginfiAccountInitialize()
        .accounts({
            marginfiGroup: MARGINFI_GROUP_1,
            marginfiAccount: newAccount.publicKey,
            authority: wallet.publicKey,
            feePayer: wallet.publicKey,
            systemProgram: SystemProgram.programId
        })
        .instruction();

    const computeBudget = 200_000;
    const instructions = [ix_createAccount];
    const ix_priority = await createPriorityFeeInstructions(connection, instructions, computeBudget);
    instructions.unshift(...ix_priority);

    const latestBlockhash = await connection.getLatestBlockhash();
    const messageV0 = new TransactionMessage({
        payerKey: wallet.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: instructions,
    }).compileToV0Message();
    const tx = new VersionedTransaction(messageV0);

    const signedTx = await wallet.signTransaction(tx);
    signedTx.sign([newAccount]);
    const signature = await sendTransactionHandler(showError, connection, signedTx);

    // Wait for tx to be finalized
    await connection.confirmTransaction({ signature, ...(await connection.getLatestBlockhash()) }, "finalized");
    const accounts = await client.getMarginfiAccountsForAuthority(wallet.publicKey);
    return accounts;
}
