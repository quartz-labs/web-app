import { AccountLayout, getAssociatedTokenAddress } from "@solana/spl-token";
import { getAccountsFromInstructions } from "./helpers";
import { getPriorityFeeEstimate } from "./transactionSender";
import { makeDepositLamportsInstructions } from "./instructions";
import { captureError } from "./errors";
import { Connection } from "@solana/web3.js";
import { ShowErrorProps } from "@/context/error-provider";
import { MICRO_LAMPORTS_PER_LAMPORT, USDC_MINT } from "./constants";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export const fetchMaxDepositLamports = async (wallet: AnchorWallet, connection: Connection, showError: (props: ShowErrorProps) => void) => {
    const balanceLamports = await connection.getBalance(wallet?.publicKey);

    const ataSize = AccountLayout.span;
    const wSolAtaRent = await connection.getMinimumBalanceForRentExemption(ataSize);
    
    try {
        const depositIxs = await makeDepositLamportsInstructions(wallet, connection, balanceLamports, showError);
        const accountKeys = await getAccountsFromInstructions(connection, depositIxs);

        const computeUnitPriceMicroLamports = await getPriorityFeeEstimate(accountKeys);
        const baseSignerFeeLamports = 5000;
        const priorityFeeLamports = (computeUnitPriceMicroLamports * 200_000 ) / MICRO_LAMPORTS_PER_LAMPORT;
        const maxDeposit = balanceLamports - (wSolAtaRent * 2) - (baseSignerFeeLamports + priorityFeeLamports);

        return Math.max(maxDeposit, 0);
    } catch (error) {
        captureError(showError, "Could not calculate max SOL deposit value", "/DepositSOLModal.tsx", error, wallet.publicKey);
        return 0;
    }
}

export const fetchMaxDepositUsdc = async (wallet: AnchorWallet, connection: Connection) => {
    const tokenAccount = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
    const balance = await connection.getTokenAccountBalance(tokenAccount);
    return Number(balance.value.amount);
}