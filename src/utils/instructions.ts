import { getConfig as getMarginfiConfig, MarginfiClient } from "@mrgnlabs/marginfi-client-v2";
import { QuartzClientLight, WSOL_MINT } from "@quartz-labs/sdk";
import type { AnchorWallet } from "@solana/wallet-adapter-react";
import type { TransactionInstruction } from "@solana/web3.js";
import type { Connection } from "@solana/web3.js";
import type { PublicKey } from "@solana/web3.js";
import { JUPITER_SLIPPAGE_BPS, type MarketIndex } from "../config/constants";
import { TOKENS } from "../config/tokens";
import { createAssociatedTokenAccountInstruction, createCloseAccountInstruction, createSyncNativeInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { Keypair, SystemProgram } from "@solana/web3.js";
import type { AddressLookupTableAccount } from "@solana/web3.js";
import { getJupiterSwapQuote, getTokenAccountBalance } from "./helpers";

export async function makeInitAccountIxs(
    connection: Connection,
    wallet: AnchorWallet
): Promise<{
    instructions: TransactionInstruction[], 
    marginfiSigner: Keypair | null
}> {
    const [quartzClient, marginfiClient] = await Promise.all([
        QuartzClientLight.fetchClientLight(connection),
        MarginfiClient.fetch(getMarginfiConfig(), wallet, connection)
    ]);

    const [ixs_initAccount, marginfiAccounts] = await Promise.all([
        quartzClient.makeInitQuartzUserIxs(wallet.publicKey),
        marginfiClient.getMarginfiAccountsForAuthority(wallet.publicKey)
    ]);

    const newMarginfiKeypair = Keypair.generate();
    const oix_initMarginfiAccount: TransactionInstruction[] = [];
    if (marginfiAccounts.length === 0) {
        const ix_createMarginfiAccount = await marginfiClient.makeCreateMarginfiAccountIx(newMarginfiKeypair.publicKey);
        oix_initMarginfiAccount.push(...ix_createMarginfiAccount.instructions);
    } else if (marginfiAccounts[0]?.isDisabled) {
        throw new Error("Flash loan MarginFi account is bankrupt"); // TODO: Handle disabled MarginFi accounts
    }
    
    return {
        instructions: [...ixs_initAccount, ...oix_initMarginfiAccount],
        marginfiSigner: oix_initMarginfiAccount.length > 0 ? newMarginfiKeypair : null
    };
}

export async function makeCloseAccountIxs(
    connection: Connection,
    wallet: AnchorWallet
): Promise<TransactionInstruction[]> {
    const quartzClient = await QuartzClientLight.fetchClientLight(connection);
    const user = await quartzClient.getQuartzAccountLight(wallet.publicKey);
    return await user.makeCloseAccountIxs();
}

export async function makeDepositIxs(
    connection: Connection,
    wallet: AnchorWallet,
    amountBaseUnits: number,
    marketIndex: MarketIndex
): Promise<TransactionInstruction[]> {
    const quartzClient = await QuartzClientLight.fetchClientLight(connection);
    const userPromise = quartzClient.getQuartzAccountLight(wallet.publicKey);

    const mint = TOKENS[marketIndex].mintAddress;
    const walletAta = await getAssociatedTokenAddress(mint, wallet.publicKey);
    const oix_createAta = await makeCreateAtaIxsIfNeeded(connection, walletAta, wallet.publicKey, mint);

    const oix_wrapSol: TransactionInstruction[] = [];
    const oix_closeWsol: TransactionInstruction[] = [];
    if (mint === WSOL_MINT) {
        const ix_wrapSol = SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: walletAta,
            lamports: amountBaseUnits,
        });
        const ix_syncNative = createSyncNativeInstruction(walletAta);
        oix_wrapSol.push(ix_wrapSol, ix_syncNative);
        oix_closeWsol.push(createCloseAccountInstruction(walletAta, wallet.publicKey, wallet.publicKey));
    }

    const user = await userPromise;
    const ix_deposit = await user.makeDepositIx(amountBaseUnits, mint, marketIndex, false);
    return [...oix_createAta, ...oix_wrapSol, ix_deposit, ...oix_closeWsol];
}

export async function makeWithdrawIxs(
    connection: Connection,
    wallet: AnchorWallet,
    amountBaseUnits: number,
    marketIndex: MarketIndex
): Promise<TransactionInstruction[]> {
    const quartzClient = await QuartzClientLight.fetchClientLight(connection);
    const userPromise = quartzClient.getQuartzAccountLight(wallet.publicKey);

    const mint = TOKENS[marketIndex].mintAddress;
    const walletAta = await getAssociatedTokenAddress(mint, wallet.publicKey);
    const oix_createAta = await makeCreateAtaIxsIfNeeded(connection, walletAta, wallet.publicKey, mint);

    const oix_closeWsol: TransactionInstruction[] = [];
    if (mint === WSOL_MINT) {
        oix_closeWsol.push(createCloseAccountInstruction(walletAta, wallet.publicKey, wallet.publicKey));
    }

    const user = await userPromise;
    const ix_withdraw = await user.makeWithdrawIx(amountBaseUnits, mint, marketIndex, false);
    return [...oix_createAta, ix_withdraw, ...oix_closeWsol];
}

export async function makeCollateralRepayIxs(
    connection: Connection,
    wallet: AnchorWallet,
    amountLoanBaseUnits: number,
    marketIndexLoan: MarketIndex,
    marketIndexCollateral: MarketIndex
): Promise<{
    instructions: TransactionInstruction[],
    lookupTables: AddressLookupTableAccount[],
    flashLoanAmountBaseUnits: number
}> {
    const quartzClient = await QuartzClientLight.fetchClientLight(connection);
    const userPromise = quartzClient.getQuartzAccountLight(wallet.publicKey);

    const mintCollateral = TOKENS[marketIndexCollateral].mintAddress;
    const walletAtaCollateral = await getAssociatedTokenAddress(mintCollateral, wallet.publicKey);
    const startingBalanceCollateral = await getTokenAccountBalance(connection, walletAtaCollateral);

    const mintLoan = TOKENS[marketIndexLoan].mintAddress;
    const walletAtaLoan = await getAssociatedTokenAddress(mintLoan, wallet.publicKey);
    const oix_createAtaLoan = await makeCreateAtaIxsIfNeeded(connection, walletAtaLoan, wallet.publicKey, mintLoan);

    const jupiterQuote = await getJupiterSwapQuote(mintCollateral, mintLoan, amountLoanBaseUnits, JUPITER_SLIPPAGE_BPS);
    const collateralRequiredForSwap = Number(jupiterQuote.inAmount) * (1 + (JUPITER_SLIPPAGE_BPS / 10_000));

    const user = await userPromise;
    const { ixs: ixs_collateralRepay, lookupTables } = await user.makeCollateralRepayIxs(
        wallet.publicKey,
        walletAtaLoan,
        mintLoan,
        marketIndexLoan,
        walletAtaCollateral,
        mintCollateral,
        marketIndexCollateral,
        startingBalanceCollateral + collateralRequiredForSwap,
        jupiterQuote
    );
    return {
        instructions: [...oix_createAtaLoan, ...ixs_collateralRepay],
        lookupTables,
        flashLoanAmountBaseUnits: collateralRequiredForSwap
    };
}

async function makeCreateAtaIxsIfNeeded(
    connection: Connection,
    ata: PublicKey,
    authority: PublicKey,
    mint: PublicKey
) {
    const oix_createAta: TransactionInstruction[] = [];
    const ataInfo = await connection.getAccountInfo(ata);
    if (ataInfo === null) {
        oix_createAta.push(
            createAssociatedTokenAccountInstruction(
                authority,
                ata,
                authority,
                mint,
            )
        );
    }
    return oix_createAta;
}
