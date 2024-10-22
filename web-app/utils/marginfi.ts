import { MarginFi } from "@/types/marginfi";
import marginfiIdl from "../idl/marginfi.json";
import { AnchorProvider, BN, Idl, Program } from "@coral-xyz/anchor";
import { PublicKey, SYSVAR_INSTRUCTIONS_PUBKEY } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
import { MARGINFI_GROUP_1 } from "./constants";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export async function buildFlashLoanIxs(
    provider: AnchorProvider,
    amountBorrow: number,
    amountRepay: number,
    startIndex: number = 0,
    innerIxs: TransactionInstruction[],
    accounts: {
        authority: PublicKey,
        marginfiAccount: PublicKey,
        borrowLiquidityAuthority: PublicKey,
        borrowLiquidity: PublicKey,
        repayLiquidity: PublicKey,
        borrowAta: PublicKey,
        repayAta: PublicKey,
        borrowBank: PublicKey,
        repayBank: PublicKey,
        borrowOracle: PublicKey,
        repayOracle: PublicKey
    },
) {
    const marginfiProgram = new Program(marginfiIdl as Idl, provider) as unknown as Program<MarginFi>;
    const endIndex = startIndex + innerIxs.length + 3 + 2; // 2 for compute units, 3 for loan ixs

    const ix_startFlashLoan = await marginfiProgram.methods
        .lendingAccountStartFlashloan(new BN(endIndex))
        .accounts({
            marginfiAccount: accounts.marginfiAccount,
            signer: accounts.authority,
            ixsSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
        })
        .instruction();

    const ix_withdrawLoan = await marginfiProgram.methods
        .lendingAccountWithdraw(new BN(amountBorrow), false)
        .accounts({
            marginfiGroup: MARGINFI_GROUP_1,
            marginfiAccount: accounts.marginfiAccount,
            signer: accounts.authority,
            bank: accounts.borrowBank,
            destinationTokenAccount: accounts.borrowAta,
            // @ts-expect-error - IDL issues
            bankLiquidityVaultAuthority: accounts.borrowLiquidityAuthority,
            bankLiquidityVault: accounts.borrowLiquidity,
            tokenProgram: TOKEN_PROGRAM_ID
        })
        .remainingAccounts([
            {
                pubkey: accounts.borrowBank,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: accounts.borrowOracle,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: accounts.repayBank,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: accounts.repayOracle,
                isSigner: false,
                isWritable: false
            }
        ])
        .instruction();

    const ix_repayLoan = await marginfiProgram.methods
        .lendingAccountRepay(new BN(amountRepay), true)
        .accounts({
            marginfiGroup: MARGINFI_GROUP_1,
            marginfiAccount: accounts.marginfiAccount,
            signer: accounts.authority,
            bank: accounts.repayBank,
            signerTokenAccount: accounts.repayAta,
            // @ts-expect-error - IDL issues
            bankLiquidityVault: accounts.repayLiquidity,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .instruction();

    const ix_endFlashLoan = await marginfiProgram.methods
        .lendingAccountEndFlashloan()
        .accounts({
            marginfiAccount: accounts.marginfiAccount,
            signer: accounts.authority
        })
        .remainingAccounts([
            {
                pubkey: accounts.borrowBank,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: accounts.borrowOracle,
                isSigner: false,
                isWritable: false
            }
        ])
        .instruction();

    const instructions = [
        ix_startFlashLoan,
        ix_withdrawLoan,
        ...innerIxs,
        ix_repayLoan,
        ix_endFlashLoan
    ];
    return instructions;
}