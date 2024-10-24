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
    DECIMAL_PLACES_USDC,
    MARGINFI_GROUP_1 
} from "./constants";
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SystemProgram, Transaction, VersionedTransaction, TransactionMessage, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { getDriftSpotMarketVault, getDriftState, getDriftUser, getDriftUserStats, getVault, getVaultUsdc, getVaultWsol } from "./getPDAs";
import { baseUnitToToken, getOrCreateAssociatedTokenAccountAnchor } from "./helpers";
import { getJupiterSwapIx } from "./jupiter";
import { createAssociatedTokenAccountIdempotentInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { Keypair } from "@solana/web3.js";
import { MarginfiClient, getConfig } from '@mrgnlabs/marginfi-client-v2';
import BigNumber from "bignumber.js";

export const initAccount = async (wallet: AnchorWallet, connection: web3.Connection) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const quartzProgram = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const marginfiProgram = new Program(marginfiIdl as Idl, provider) as unknown as Program<MarginFi>;
    const marginfiClient = await MarginfiClient.fetch(getConfig(), wallet, connection);
    
    const vaultPda = getVault(wallet.publicKey);
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
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                driftState: getDriftState(),
                driftProgram: DRIFT_PROGRAM_ID,
                rent: web3.SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

        const tx = new Transaction().add(ix_initUser, ix_initVaultDriftAccount);

        // Create MarginFi account if use doesn't have one already
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
            tx.add(ix_initMarginfiAccount);
        }

        const signature = await provider.sendAndConfirm(tx, [marginfiAccount]);
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

    try {
        const ix_closeDriftAccount = await program.methods
            .closeDriftAccount()
            .accounts({
                // @ts-expect-error - IDL issue
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
        
        const tx = new Transaction().add(ix_closeDriftAccount, ix_closeVault);
        const signature = await provider.sendAndConfirm(tx);
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

    try {
        const signature = await program.methods
            .withdrawLamports(new BN(amountLamports), true)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultWsol: getVaultWsol(vaultPda),
                owner: wallet.publicKey,    
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
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
            .rpc();
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

    try {
        const signature = await program.methods
            .depositLamports(new BN(amountLamports), false)
            .accounts({
                // @ts-expect-error - IDL issue
                vault: vaultPda,
                vaultWsol: getVaultWsol(vaultPda),
                owner: wallet.publicKey,    
                driftState: getDriftState(),
                driftUser: getDriftUser(vaultPda),
                driftUserStats: getDriftUserStats(vaultPda),
                spotMarketVault: getDriftSpotMarketVault(DRIFT_MARKET_INDEX_SOL),
                wsolMint: WSOL_MINT,
                tokenProgram: TOKEN_PROGRAM_ID,
                driftProgram: DRIFT_PROGRAM_ID,
                constAccount: DRIFT_ADDITIONAL_ACCOUNT_1,
                spotMarket: DRIFT_SPOT_MARKET_SOL,
                systemProgram: SystemProgram.programId,
            })
            .rpc();
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
    const marginfiProgram = new Program(marginfiIdl as Idl, provider) as unknown as Program<MarginFi>;
    const vaultPda = getVault(wallet.publicKey);

    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    const walletWSol = await getAssociatedTokenAddress(WSOL_MINT, wallet.publicKey);

    const marginfiClient = await MarginfiClient.fetch(getConfig(), wallet, connection);

    let marginfiAccounts = await marginfiClient.getMarginfiAccountsForAuthority(wallet.publicKey);
    if (marginfiAccounts.length === 0) {
        const newAccount = Keypair.generate();
        const tx_initMarginFiAccount = await marginfiProgram.methods
            .marginfiAccountInitialize()
            .accounts({
                marginfiGroup: MARGINFI_GROUP_1,
                marginfiAccount: newAccount.publicKey,
                authority: wallet.publicKey,
                feePayer: wallet.publicKey,
                systemProgram: SystemProgram.programId
            })
            .transaction();
        const signature = await provider.sendAndConfirm(tx_initMarginFiAccount, [newAccount]);

        await connection.confirmTransaction({signature, ...(await connection.getLatestBlockhash())}, "finalized");
        marginfiAccounts = await marginfiClient.getMarginfiAccountsForAuthority(wallet.publicKey);
    }

    const marginfiAccount = marginfiAccounts[0];
    const solBank = marginfiClient.getBankByTokenSymbol("SOL");
    if (!solBank) throw Error(`${"SOL"} bank not found`);
    const usdcBank = marginfiClient.getBankByTokenSymbol("USDC");
    if (!usdcBank) throw Error(`${"USDC"} bank not found`);

    const oracleSol = marginfiClient.getOraclePriceByBank(solBank.address);
    const oracleUsdc = marginfiClient.getOraclePriceByBank(usdcBank.address);
    if (!oracleSol || !oracleUsdc) return;

    const amountUsdc = new BigNumber(baseUnitToToken(amountMicroCents, DECIMAL_PLACES_USDC));
    const amountSol = amountUsdc
        .times(oracleUsdc.priceWeighted.highestPrice)
        .div(oracleSol.priceWeighted.lowestPrice)
        .times(2);
    const amountLamports = new BN(amountSol.times(LAMPORTS_PER_SOL).integerValue().toString());

    const ix_createUsdcAta = createAssociatedTokenAccountIdempotentInstruction(
        wallet.publicKey,
        walletUsdc,
        wallet.publicKey,
        USDC_MINT
    );

    const ix_createWSolAta = createAssociatedTokenAccountIdempotentInstruction(
        wallet.publicKey,
        walletWSol,
        wallet.publicKey,
        WSOL_MINT
    );

    const ix_depositUsdc = await quartzProgram.methods
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

    const ix_withdrawLamports = await quartzProgram.methods
        .withdrawLamports(amountLamports, true)
        .accounts({
            // @ts-expect-error - IDL issue
            vault: vaultPda,
            vaultWsol: getVaultWsol(vaultPda),
            owner: wallet.publicKey,    
            driftState: getDriftState(),
            driftUser: getDriftUser(vaultPda),
            driftUserStats: getDriftUserStats(vaultPda),
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
        lamports: amountLamports.toNumber(),
    });

    const { flashloanTx } = await marginfiAccount.makeLoopTx(
        amountSol,
        amountUsdc,
        solBank.address,
        usdcBank.address,
        [ix_createUsdcAta, ix_createWSolAta, ix_depositUsdc, ix_withdrawLamports, ix_wrapSol],
        [],
        0.000001
    );

    const signedTx = await wallet.signTransaction(flashloanTx);
    const simulation = await connection.simulateTransaction(signedTx);
    console.log("Simulation result:", simulation);

    const signature = await connection.sendRawTransaction(signedTx.serialize());
    // const signature = await sendTransactionHandler(connection, signedTx)
    console.log(signature);
    return signature;
}


export const depositUsdt = async(wallet: AnchorWallet, connection: web3.Connection, amountMicroCents: number) => {
    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"}); 
    setProvider(provider);
    const program = new Program(quartzIdl as Idl, provider) as unknown as Program<FundsProgram>;
    const vaultPda = getVault(wallet.publicKey);

    const walletUsdc = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    if (!walletUsdc) throw new Error("No USDC account found on connected wallet");

    try {       
        const quoteEndpoint = `https://quote-api.jup.ag/v6/quote?inputMint=${USDT_MINT.toBase58()}&outputMint=${USDC_MINT.toBase58()}&amount=${amountMicroCents}&slippageBps=50&swapMode=ExactOut`;
        const quoteResponse = await (await fetch(quoteEndpoint)).json();
        const { swapTransaction } = await (
            await fetch('https://quote-api.jup.ag/v6/swap', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                quoteResponse,
                userPublicKey: wallet.publicKey.toString(),
                wrapAndUnwrapSol: true,
              })
            })
          ).json();
        
        const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
        const tx_jupiter = VersionedTransaction.deserialize(swapTransactionBuf);
        const sx_jupiter = await provider.sendAndConfirm(tx_jupiter);
        if (!sx_jupiter) return;

        const sx_depositUsdt = await program.methods
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
            .rpc();

        return sx_depositUsdt;
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

        const { instructions, addressLookupTableAccounts } = await getJupiterSwapIx(wallet.publicKey, connection, amountMicroCents, USDC_MINT, USDT_MINT, false);

        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [ix_withdrawUsdc, ...instructions],
        }).compileToV0Message(addressLookupTableAccounts);
        const tx = new VersionedTransaction(messageV0);

        const signature = await provider.sendAndConfirm(tx);
        return signature;
    } catch (err) {
        if (!(err instanceof WalletSignTransactionError)) console.error(err);
        return null;
    }
}
