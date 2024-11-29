import quartzIdl from "../idl/quartz.json";
import { Quartz } from "@/types/quartz";
import marginfiIdl from "../idl/marginfi.json";

import { AnchorProvider, BN, Idl, Program, setProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
    DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, DRIFT_PROGRAM_ID, DRIFT_SPOT_MARKET_SOL, DRIFT_SPOT_MARKET_USDC, DRIFT_SIGNER,
    DRIFT_ORACLE_1, DRIFT_ORACLE_2,
    USDC_MINT, WSOL_MINT,
    MARGINFI_GROUP_1,
    DECIMALS_USDC,
    QUARTZ_ADDRESS_TABLE,
    QUARTZ_PROGRAM_ID,
    MARGINFI_PROGRAM_ID
} from "./constants";
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SystemProgram, VersionedTransaction, TransactionMessage, Connection, TransactionInstruction } from "@solana/web3.js";
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
import { TxStatus, TxStatusProps } from "@/context/tx-status-provider";

export const initAccount = async (
    wallet: AnchorWallet, 
    connection: web3.Connection, 
    showError: (props: ShowErrorProps) => void,
    trackTx: (props: TxStatusProps) => void
) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const quartzProgram = new Program(quartzIdl as Idl, QUARTZ_PROGRAM_ID, provider) as unknown as Program<Quartz>;
    const marginfiProgram = new Program(marginfiIdl as Idl, MARGINFI_PROGRAM_ID, provider);
    const marginfiClient = await MarginfiClient.fetch(getConfig(), wallet, connection);

    const vaultPda = getVault(wallet.publicKey);
    const marginfiAccount = Keypair.generate();

    try {
        const ix_initUser = await quartzProgram.methods
            .initUser()
            .accounts({
                vault: vaultPda,
                owner: wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const ix_initVaultDriftAccount = await quartzProgram.methods
            .initDriftAccount()
            .accounts({
                vault: vaultPda,
                owner: wallet.publicKey,
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                driftState: getDriftState(),
                driftProgram: DRIFT_PROGRAM_ID,
                rent: web3.SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const computeBudget = 200_000;
        
        // Create MarginFi account if user doesn't have one already
        const oix_initMarginfiAccount: TransactionInstruction[] = [];
        const marginfiAccounts = await marginfiClient.getMarginfiAccountsForAuthority(wallet.publicKey);
        if (marginfiAccounts.length === 0) {
            oix_initMarginfiAccount.push(
                await marginfiProgram.methods
                .marginfiAccountInitialize()
                .accounts({
                    marginfiGroup: MARGINFI_GROUP_1,
                    marginfiAccount: marginfiAccount.publicKey,
                    authority: wallet.publicKey,
                    feePayer: wallet.publicKey,
                    systemProgram: SystemProgram.programId
                })
                .instruction()
            )
        } else if (marginfiAccounts[0].isDisabled) throw new Error("Flash loan MarginFi account is bankrupt"); // TODO - Handle disabled MarginFi Account

        const instructions = [ix_initUser, ix_initVaultDriftAccount, ...oix_initMarginfiAccount];
        const ix_priority = await createPriorityFeeInstructions(connection, instructions, computeBudget);
        instructions.unshift(...ix_priority);

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: instructions,
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        trackTx({status: TxStatus.SIGNING});
        const signedTx = await wallet.signTransaction(tx);
        if (oix_initMarginfiAccount.length > 0) signedTx.sign([marginfiAccount]);  // Only sign if initing new MarginFi account

        const signature = await sendTransactionHandler(trackTx, connection, signedTx);
        return signature;
    } catch (error) {
        if (error instanceof WalletSignTransactionError) trackTx({status: TxStatus.SIGN_REJECTED});
        else {
            captureError(showError, "Could not initialize account", "utils: /instructions.ts", error, wallet.publicKey);
            trackTx({status: TxStatus.NONE});
        }
        return null;
    }
}


export const closeAccount = async (
    wallet: AnchorWallet, 
    connection: web3.Connection, 
    showError: (props: ShowErrorProps) => void,
    trackTx: (props: TxStatusProps) => void
) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, QUARTZ_PROGRAM_ID, provider) as unknown as Program<Quartz>;

    const vaultPda = getVault(wallet.publicKey);

    try {
        const ix_closeDriftAccount = await program.methods
            .closeDriftAccount()
            .accounts({
                vault: vaultPda,
                owner: wallet.publicKey,
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                driftState: getDriftState(),
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

        trackTx({status: TxStatus.SIGNING});
        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(trackTx, connection, signedTx);
        return signature;
    } catch (error) {
        if (error instanceof WalletSignTransactionError) trackTx({status: TxStatus.SIGN_REJECTED});
        else {
            captureError(showError, "Could not close account", "utils: /instructions.ts", error, wallet.publicKey);
            trackTx({status: TxStatus.NONE});
        }
        return null;
    }
}


export const makeDepositLamportsInstructions = async (wallet: AnchorWallet, connection: web3.Connection, amountLamports: number, showError: (props: ShowErrorProps) => void) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, QUARTZ_PROGRAM_ID, provider) as unknown as Program<Quartz>;

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
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, WSOL_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletWSol,
                splMint: WSOL_MINT,
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                driftState: getDriftState(),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
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

        const instructions = [...oix_createWSolAta, ix_wrapSol, ix_syncNative, ix_deposit, ix_closeWSolAta];
        return instructions;
    } catch (error) {
        if (!(error instanceof WalletSignTransactionError)) {
            captureError(showError, "Could not create Deposit SOL Instruction", "utils: /instructions.ts", error, wallet.publicKey);
        }
        return [];
    }
}


export const depositLamports = async (
    wallet: AnchorWallet, 
    connection: web3.Connection, 
    amountLamports: number, 
    showError: (props: ShowErrorProps) => void,
    trackTx: (props: TxStatusProps) => void
) => {
    try {
        const instructions = await makeDepositLamportsInstructions(wallet, connection, amountLamports, showError);

        const computeBudget = 200_000;
        const ix_priority = await createPriorityFeeInstructions(connection, instructions, computeBudget);
        instructions.unshift(...ix_priority);

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: instructions,
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        trackTx({status: TxStatus.SIGNING});
        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(trackTx, connection, signedTx);
        return signature;
    } catch (error) {
        if (error instanceof WalletSignTransactionError) trackTx({status: TxStatus.SIGN_REJECTED});
        else {
            captureError(showError, "Could not deposit SOL", "utils: /instructions.ts", error, wallet.publicKey);
            trackTx({status: TxStatus.NONE});
        }
        return null;
    }
}


export const withdrawLamports = async (
    wallet: AnchorWallet, 
    connection: web3.Connection, 
    amountLamports: number, 
    showError: (props: ShowErrorProps) => void,
    trackTx: (props: TxStatusProps) => void
) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, QUARTZ_PROGRAM_ID, provider) as unknown as Program<Quartz>;

    const walletWSol = await getAssociatedTokenAddress(WSOL_MINT, wallet.publicKey);
    const vaultPda = getVault(wallet.publicKey);

    try {
        const oix_createWSolAta = await createAtaIfNeeded(connection, walletWSol, wallet.publicKey, WSOL_MINT);

        const ix_withdraw = await program.methods
            .withdraw(new BN(amountLamports), DRIFT_MARKET_INDEX_SOL, true)
            .accounts({
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, WSOL_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletWSol,
                splMint: WSOL_MINT,
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                driftState: getDriftState(),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
                driftSigner: DRIFT_SIGNER,
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

        trackTx({status: TxStatus.SIGNING});
        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(trackTx, connection, signedTx);
        return signature;
    } catch (error) {
        if (error instanceof WalletSignTransactionError) trackTx({status: TxStatus.SIGN_REJECTED});
        else {
            captureError(showError, "Could not withdraw SOL", "utils: /instructions.ts", error, wallet.publicKey);
            trackTx({status: TxStatus.NONE});
        }
        return null;
    }
}


export const depositUsdc = async (
    wallet: AnchorWallet, 
    connection: Connection, 
    amountMicroCents: number, 
    showError: (props: ShowErrorProps) => void,
    trackTx: (props: TxStatusProps) => void
) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, QUARTZ_PROGRAM_ID, provider) as unknown as Program<Quartz>;
    
    const vaultPda = getVault(wallet.publicKey);
    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    if (!walletUsdc) throw new Error("No USDC account found on connected wallet");

    try {
        const ix_deposit = await program.methods
            .deposit(new BN(amountMicroCents), DRIFT_MARKET_INDEX_USDC, true)
            .accounts({
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, USDC_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletUsdc,
                splMint: USDC_MINT,
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                driftState: getDriftState(),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
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

        trackTx({status: TxStatus.SIGNING});
        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(trackTx, connection, signedTx);
        return signature;
    } catch (error) {
        if (error instanceof WalletSignTransactionError) trackTx({status: TxStatus.SIGN_REJECTED});
        else {
            captureError(showError, "Could not deposit USDC", "utils: /instructions.ts", error, wallet.publicKey);
            trackTx({status: TxStatus.NONE});
        }
        return null;
    }
}



export const withdrawUsdc = async (
    wallet: AnchorWallet, 
    connection: web3.Connection, 
    amountMicroCents: number, 
    showError: (props: ShowErrorProps) => void,
    trackTx: (props: TxStatusProps) => void,
) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, QUARTZ_PROGRAM_ID, provider) as unknown as Program<Quartz>;
    
    const vaultPda = getVault(wallet.publicKey);
    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);

    try {
        const oix_createAta = await createAtaIfNeeded(connection, walletUsdc, wallet.publicKey, USDC_MINT);

        const ix_withdraw = await program.methods
            .withdraw(new BN(amountMicroCents), DRIFT_MARKET_INDEX_USDC, false)
            .accounts({
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, USDC_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletUsdc,
                splMint: USDC_MINT,
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                driftState: getDriftState(),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
                driftSigner: DRIFT_SIGNER,
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

        trackTx({status: TxStatus.SIGNING});
        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(trackTx, connection, signedTx);
        return signature;
    } catch (error) {
        if (error instanceof WalletSignTransactionError) trackTx({status: TxStatus.SIGN_REJECTED});
        else {
            captureError(showError, "Could not withdraw USDC", "utils: /instructions.ts", error, wallet.publicKey);
            trackTx({status: TxStatus.NONE});
        }
        return null;
    }
}


export const repayUsdcWithSol = async (
    wallet: AnchorWallet, 
    connection: web3.Connection, 
    amountMicroCents: number, 
    showError: (props: ShowErrorProps) => void,
    trackTx: (props: TxStatusProps) => void
) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);
    const quartzProgram = new Program(quartzIdl as Idl, QUARTZ_PROGRAM_ID, provider) as unknown as Program<Quartz>;

    const vaultPda = getVault(wallet.publicKey);
    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    const walletWSol = await getAssociatedTokenAddress(WSOL_MINT, wallet.publicKey);

    try {
        const QuartzLookupTable = await connection.getAddressLookupTable(QUARTZ_ADDRESS_TABLE).then((res) => res.value);
        if (!QuartzLookupTable) throw Error("Address Lookup Table account not found");

        // Get MarginFi client and bank
        const marginfiClient = await MarginfiClient.fetch(getConfig(), wallet, connection);
        const usdcBank = marginfiClient.getBankByTokenSymbol("USDC");
        if (!usdcBank) throw Error(`${"USDC"} bank not found`);

        const [ marginfiAccount ] = await marginfiClient.getMarginfiAccountsForAuthority(wallet.publicKey);
        if (marginfiAccount === undefined) throw new Error("Flash loan MarginFi account not found");
        if (marginfiAccount.isDisabled) throw new Error("Flash loan MarginFi account is bankrupt"); // TODO - Handle disabled MarginFi Account

        // Get price info for flash loan
        const jupiterQuote = await getJupiterSwapQuote(WSOL_MINT, USDC_MINT, amountMicroCents, true);
        const amountLamports = Number(jupiterQuote.inAmount);
        if (isNaN(amountLamports)) throw Error(`Invalid Jupiter quote`);

        // Build instructions
        const {
            instructions: jupiterSwapIxs,
            addressLookupTableAccounts: jupiterLookupTables
        } = await getJupiterSwapIx(wallet.publicKey, connection, jupiterQuote);
        const [ix_createWSolIndempotent, , , ix_jupiterSwap] = jupiterSwapIxs;

        const ix_depositUsdc = await quartzProgram.methods
            .deposit(new BN(amountMicroCents), DRIFT_MARKET_INDEX_USDC, true)
            .accounts({
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, USDC_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletUsdc,
                splMint: USDC_MINT,
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                driftState: getDriftState(),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
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
                vault: vaultPda,
                vaultSpl: getVaultSpl(vaultPda, WSOL_MINT),
                owner: wallet.publicKey,
                ownerSpl: walletWSol,
                splMint: WSOL_MINT,
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                driftState: getDriftState(),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
                driftSigner: DRIFT_SIGNER,
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

        // Create flash loan and send tx
        const amountUsdcUi = new BigNumber(baseUnitToUi(amountMicroCents, DECIMALS_USDC));
        const { flashloanTx } = await makeFlashLoanTx(
            marginfiAccount,
            amountUsdcUi,
            usdcBank.address,
            [ix_createWSolIndempotent, ix_depositUsdc, ix_withdrawLamports, ix_jupiterSwap, ix_closeWSolAta],
            [QuartzLookupTable, ...jupiterLookupTables],
            0.002,
            true
        );

        trackTx({status: TxStatus.SIGNING});
        const signedTx = await wallet.signTransaction(flashloanTx);
        const signature = await sendTransactionHandler(trackTx, connection, signedTx);
        return signature;
    } catch (error) {
        if (error instanceof WalletSignTransactionError) trackTx({status: TxStatus.SIGN_REJECTED});
        else {
            captureError(showError, "Could not liquidate loan", "utils: /instructions.ts", error, wallet.publicKey);
            trackTx({status: TxStatus.NONE});
        }
        return null;
    }
}

// export const createLookupTable = async (wallet: AnchorWallet, connection: web3.Connection) => {
//     // Convert address strings to PublicKeys
//     const newAddresses = [
//         "6JjHXLheGSNvvexgzMthEcgjkcirDrGduc3HAKB2P1v2",
//         "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
//         "So11111111111111111111111111111111111111112",
//         "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
//         "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
//         "dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH",
//         "BAtFj4kQttZRVep3UZS2aZRDixkGYgWsbqTBVDbnSsPF",
//         "En8hkHLkRe9d9DraYmBTrus518BvmVH448YcvmrFM6Ce",
//         "3x85u7SWkmmr7YQGYhtjARgxwegTLJgkSLRprfXod6rh",
//         "6gMq3mRCKf8aP3ttTyYhuijVZ2LGi14oDsBbkgubfLB3",
//         "11111111111111111111111111111111",
//         "GXWqPpjQpdz7KZw9p7f5PX2eGxHAhvpNXiviFkAB8zXg",
//         "DfYCNezifxAEsQbAJ1b3j6PX3JVBe8fu11KBhxsbw5d2",
//         "JCNCMFXo5M5qwUPg2Utu1u6YWp3MbygxqBsBeXXJfrw",
//         "4qp6Fx6tnZkY5Wropq9wUYgtFxXKwE6viZxFHg3rdAG8",
//         "2s37akK2eyBbp8DZgCm7RtsaEz8eJP3Nxd4urLHQv7yB",
//         "3uxNepDbmkDNq6JhRja5Z8QwbTrfmkKP8AKZV5chYDGG",
//         "7jaiZR5Sk8hdYN9MxTpczTcwbWpb5WEoxSANuUwveuat",
//         "Dpw1EAVrSB1ibxiDQyTAW6Zip3J4Btk2x4SgApQCeFbX",
//         "CCKtUs6Cgwo4aaQUmBPmyoApH2gUDErxNZCAntD6LYGh",
//         "7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE",
//         "Sysvar1nstructions1111111111111111111111111",
//         "MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA",
//         "ComputeBudget111111111111111111111111111111"
//     ];
//     const addresses = newAddresses.map(addr => new PublicKey(addr));

//     const [createLookupTableIx, lookupTableAddress] = AddressLookupTableProgram.createLookupTable({
//         authority: wallet.publicKey,
//         payer: wallet.publicKey,
//         recentSlot: await connection.getSlot(),
//     });

//     const extendLookupTableIx = AddressLookupTableProgram.extendLookupTable({
//         lookupTable: lookupTableAddress, // Address of the newly created table
//         authority: wallet.publicKey,
//         payer: wallet.publicKey,
//         addresses: addresses,
//     });

//     const freezeLookupTableIx = AddressLookupTableProgram.freezeLookupTable({
//         lookupTable: lookupTableAddress,
//         authority: wallet.publicKey,
//     });
    

//     // Get latest blockhash
//     const { blockhash } = await connection.getLatestBlockhash();

//     // Create versioned transaction
//     const messageV0 = new TransactionMessage({
//         payerKey: wallet.publicKey,
//         recentBlockhash: blockhash,
//         instructions: [createLookupTableIx, extendLookupTableIx, freezeLookupTableIx],
//     }).compileToV0Message();

//     const transaction = new VersionedTransaction(messageV0);

//     // Sign transaction
//     trackTx({status: TxStatus.SIGNING});    
//     const signedTx = await wallet.signTransaction(transaction);
//     const signature = await sendTransactionHandler(connection, signedTx);
//     return signature;
// }
