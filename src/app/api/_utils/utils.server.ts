import { createCloseAccountInstruction, createSyncNativeInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { makeCreateAtaIxIfNeeded, getTokenProgram, QuartzUser, TOKENS, MarketIndex } from "@quartz-labs/sdk";
import { Connection, PublicKey, TransactionInstruction, SystemProgram, AddressLookupTableAccount } from "@solana/web3.js";
import { getWsolMint } from "@/src/utils/helpers";

export async function makeDepositIxs(
    connection: Connection,
    address: PublicKey,
    amountBaseUnits: number,
    marketIndex: MarketIndex,
    user: QuartzUser,
    repayingLoan: boolean
): Promise<{
    ixs: TransactionInstruction[],
    lookupTables: AddressLookupTableAccount[],
}> {
    const mint = TOKENS[marketIndex].mint;
    const mintTokenProgram = await getTokenProgram(connection, mint);
    const walletAta = await getAssociatedTokenAddress(mint, address, false, mintTokenProgram);
    const oix_createAta = await makeCreateAtaIxIfNeeded(connection, walletAta, address, mint, mintTokenProgram);

    const oix_wrapSol: TransactionInstruction[] = [];
    const oix_closeWsol: TransactionInstruction[] = [];
    if (mint === getWsolMint()) {
        const ix_wrapSol = SystemProgram.transfer({
            fromPubkey: address,
            toPubkey: walletAta,
            lamports: amountBaseUnits,
        });
        const ix_syncNative = createSyncNativeInstruction(walletAta);
        oix_wrapSol.push(ix_wrapSol, ix_syncNative);
        oix_closeWsol.push(createCloseAccountInstruction(walletAta, address, address));
    }

    const {
        ixs,
        lookupTables,
    } = await user.makeDepositIx(amountBaseUnits, marketIndex, repayingLoan);
    
    return {
        ixs: [...oix_createAta, ...oix_wrapSol, ...ixs, ...oix_closeWsol],
        lookupTables: [...lookupTables]
    };
}