import quartzIdl from "../idl/funds_program.json";
import { FundsProgram } from "@/types/funds_program";
import marginfiIdl from "../idl/marginfi.json";
import { MarginFi } from "@/types/marginfi";

import { AnchorProvider, BN, Idl, Program, setProvider, web3 } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { 
    DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, DRIFT_PROGRAM_ID, DRIFT_SPOT_MARKET_SOL, DRIFT_SPOT_MARKET_USDC, DRIFT_SIGNER, 
    DRIFT_ADDITIONAL_ACCOUNT_1, DRIFT_ADDITIONAL_ACCOUNT_2,
    USDC_MINT, WSOL_MINT, USDT_MINT, 
    DECIMALS_USDC,
    MARGINFI_GROUP_1, 
    FUNDS_PROGRAM_ADDRESS_TABLE
} from "./constants";
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SystemProgram, VersionedTransaction, TransactionMessage, Connection } from "@solana/web3.js";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { getDriftSpotMarketVault, getDriftState, getDriftUser, getDriftUserStats, getVault, getVaultUsdc, getVaultWsol } from "./getPDAs";
import { baseUnitToUi, getOrCreateAssociatedTokenAccountAnchor, makeFlashLoanTx } from "./helpers";
import { getJupiterSwapIx, getJupiterSwapQuote } from "./jupiter";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { Keypair } from "@solana/web3.js";
import { MarginfiClient, getConfig } from '@mrgnlabs/marginfi-client-v2';
import BigNumber from "bignumber.js";
import { sendTransactionHandler } from "./transactionSender";

export const initAccount = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
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

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [...instructions],
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        tx.sign([marginfiAccount]);
        const signature = await sendTransactionHandler(connection, signedTx);
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}

export const closeAccount = async(wallet: AnchorWallet, connection: web3.Connection) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
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
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [ix_closeDriftAccount, ix_closeVault],
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(connection, signedTx);
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}
            

export const withdrawLamports = async(wallet: AnchorWallet, connection: web3.Connection, amountLamports: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;

    const vaultPda = getVault(wallet.publicKey);
    const vaultWsol = getVaultWsol(vaultPda);
    const driftUser = getDriftUser(vaultPda);
    const driftUserStats = getDriftUserStats(vaultPda);
    const driftState = getDriftState();

    try {
        const ix = await program.methods
            .withdrawLamports(new BN(amountLamports), true)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultWsol: vaultWsol,
                owner: wallet.publicKey,    
                driftState: driftState,
                driftUser: driftUser,
                driftUserStats: driftUserStats,
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
                driftSigner: DRIFT_SIGNER,
                wsolMint: WSOL_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_2,
                additionalAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                spotMarketSol: DRIFT_SPOT_MARKET_SOL,
                spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [ix],
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(connection, signedTx);
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}

export const depositLamports = async(wallet: AnchorWallet, connection: web3.Connection, amountLamports: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;

    const vaultPda = getVault(wallet.publicKey);
    const vaultWsol = getVaultWsol(vaultPda);
    const driftUser = getDriftUser(vaultPda);
    const driftUserStats = getDriftUserStats(vaultPda);
    const driftState = getDriftState();

    try {
        const ix = await program.methods
            .depositLamports(new BN(amountLamports), false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultWsol: vaultWsol,
                owner: wallet.publicKey,    
                driftState: driftState,
                driftUser: driftUser,
                driftUserStats: driftUserStats,
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
                wsolMint: WSOL_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                spotMarket: DRIFT_SPOT_MARKET_SOL,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [ix],
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(connection, signedTx);
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}


export const liquidateSol = async(wallet: AnchorWallet, connection: web3.Connection, amountMicroCents: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const quartzProgram = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>; 

    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    const walletWSol = await getAssociatedTokenAddress(WSOL_MINT, wallet.publicKey);
    
    const vaultPda = getVault(wallet.publicKey);
    const vaultUsdc = getVaultUsdc(vaultPda);
    const vaultWsol = getVaultWsol(vaultPda);
    const driftUser = getDriftUser(vaultPda);
    const driftUserStats = getDriftUserStats(vaultPda);
    const driftState = getDriftState();

    // Get MarginFi client and bank
    const marginfiClient = await MarginfiClient.fetch(getConfig(), wallet, connection);
    const usdcBank = marginfiClient.getBankByTokenSymbol("USDC");
    if (!usdcBank) throw Error(`${"USDC"} bank not found`);

    // Init MarginFi Account if not found
    let marginfiAccounts = await marginfiClient.getMarginfiAccountsForAuthority(wallet.publicKey);
    if (marginfiAccounts.length === 0) marginfiAccounts = await createNewMarginfiAccount(wallet, connection, provider, marginfiClient);
    const marginfiAccount = marginfiAccounts[0];

    // Get price info for flash loan
    const jupiterQuote = await getJupiterSwapQuote(WSOL_MINT, USDC_MINT, amountMicroCents, true);
    const amountLamports = Number(jupiterQuote.inAmount);
    if (isNaN(amountLamports)) throw Error(`Invalid Jupiter quote`);

    // -- ADDRESS LOOKUP TABLE
    const fundsProgramLookupTable = await connection.getAddressLookupTable(FUNDS_PROGRAM_ADDRESS_TABLE).then((res) => res.value);
    if (!fundsProgramLookupTable) throw Error("Address Lookup Table account not found");
    
    // // ATA instructions
    // const ix_createUsdcAta = createAssociatedTokenAccountIdempotentInstruction(
    //     wallet.publicKey,
    //     walletUsdc,
    //     wallet.publicKey,
    //     USDC_MINT
    // );

    // const ix_createWSolAta = createAssociatedTokenAccountIdempotentInstruction(
    //     wallet.publicKey,
    //     walletWSol,
    //     wallet.publicKey,
    //     WSOL_MINT
    // );

    // Quartz program instructions
    const ix_depositUsdc = await quartzProgram.methods
            .depositUsdc(new BN(amountMicroCents), false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultUsdc: vaultUsdc,
                owner: wallet.publicKey,    
                ownerUsdc: walletUsdc,
                driftState: driftState,
                driftUser: driftUser,
                driftUserStats: driftUserStats,
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
                usdcMint: USDC_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_2,
                additionalAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                spotMarketSol: DRIFT_SPOT_MARKET_SOL,
                spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

    const ix_withdrawLamports = await quartzProgram.methods
        .withdrawLamports(new BN(amountLamports), true)
        .accounts({
            // @ts-expect-error - IDL issue
            vault: vaultPda,
            vaultWsol: vaultWsol,
            owner: wallet.publicKey,    
            driftState: driftState,
            driftUser: driftUser,
            driftUserStats: driftUserStats,
            spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
            driftSigner: DRIFT_SIGNER,
            wsolMint: WSOL_MINT,
            tokenProgram: TOKEN_PROGRAM_ID,
            driftProgram: DRIFT_PROGRAM_ID,
            constAccount: DRIFT_ADDITIONAL_ACCOUNT_2,
            additionalAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
            spotMarketSol: DRIFT_SPOT_MARKET_SOL,
            spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
            systemProgram: SystemProgram.programId,
        })
        .instruction();

    const ix_wrapSol = web3.SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: walletWSol,
        lamports: amountLamports,
    });

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
        [ix_depositUsdc, ix_withdrawLamports, ix_wrapSol, ...jupiterSwap],
        [fundsProgramLookupTable, ...jupiterLookupTables],
        0.001,
        true
    );

    const signedTx = await wallet.signTransaction(flashloanTx);
    const simulation = await connection.simulateTransaction(signedTx);
    console.log("Simulation result:", simulation);

    const signature = await sendTransactionHandler(connection, signedTx);
    console.log(signature);
    return signature;
}

const createNewMarginfiAccount = async(wallet: AnchorWallet, connection: Connection, provider: AnchorProvider, client: MarginfiClient) => {
    console.log("Creating MarginFi account");
    const marginfiProgram = new Program(marginfiIdl as Idl, provider) as unknown as Program<MarginFi>;
    const newAccount = Keypair.generate();

    const ix = await marginfiProgram.methods
        .marginfiAccountInitialize()
        .accounts({
            marginfiGroup: MARGINFI_GROUP_1,
            marginfiAccount: newAccount.publicKey,
            authority: wallet.publicKey,
            feePayer: wallet.publicKey,
            systemProgram: SystemProgram.programId
        })
        .instruction();

    const latestBlockhash = await connection.getLatestBlockhash();
    const messageV0 = new TransactionMessage({
        payerKey: wallet.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: [ix],
    }).compileToV0Message();
    const tx = new VersionedTransaction(messageV0);
    
    const signedTx = await wallet.signTransaction(tx);
    signedTx.sign([newAccount]);
    const signature = await sendTransactionHandler(connection, signedTx);

    // Wait for tx to be finalized
    await connection.confirmTransaction({signature, ...(await connection.getLatestBlockhash())}, "finalized");
    const accounts = await client.getMarginfiAccountsForAuthority(wallet.publicKey);
    return accounts;
}

export const depositUsdc = async(wallet: AnchorWallet, connection: Connection, amountMicroCents: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);

    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    if (!walletUsdc) throw new Error("No USDC account found on connected wallet");

    try {       
        const ix = await program.methods
            .depositUsdc(new BN(amountMicroCents), false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultUsdc: getVaultUsdc(vaultPda),
                owner: wallet.publicKey,    
                ownerUsdc: walletUsdc,
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
                usdcMint: USDC_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_2,
                additionalAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                spotMarketSol: DRIFT_SPOT_MARKET_SOL,
                spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
                systemProgram: SystemProgram.programId,
            })
            .instruction();
        
        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [ix],
        }).compileToV0Message();
        const tx = new VersionedTransaction(messageV0);

        const signedTx = await wallet.signTransaction(tx);
        const signature = await sendTransactionHandler(connection, signedTx);
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}

export const withdrawUsdt = async(wallet: AnchorWallet, connection: web3.Connection, amountMicroCents: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);
    const walletUsdc = await getOrCreateAssociatedTokenAccountAnchor(wallet, connection, provider, USDC_MINT);

    try {
        const ix_withdrawUsdc = await program.methods
            .withdrawUsdc(new BN(amountMicroCents), false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultUsdc: getVaultUsdc(vaultPda),
                owner: wallet.publicKey,    
                ownerUsdc: walletUsdc,
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_USDC),
                driftSigner: DRIFT_SIGNER,
                usdcMint: USDC_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                additionalAccount: DRIFT_ADDITIONAL_ACCOUNT_2,
                spotMarketSol: DRIFT_SPOT_MARKET_SOL,
                spotMarketUsdc: DRIFT_SPOT_MARKET_USDC,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const jupiterQuote = await getJupiterSwapQuote(USDC_MINT, USDT_MINT, amountMicroCents, false, 22);
        const { instructions, addressLookupTableAccounts } = await getJupiterSwapIx(wallet.publicKey, connection, jupiterQuote);

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [ix_withdrawUsdc, ...instructions],
        }).compileToV0Message(addressLookupTableAccounts);
        const tx = new VersionedTransaction(messageV0);
        
        const signedTx = await wallet.signTransaction(tx);
        const simulation = await connection.simulateTransaction(signedTx);
        console.log("Simulation result:", simulation);

        const signature = await sendTransactionHandler(connection, signedTx);
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}
