use anchor_lang::prelude::*;
use crate::{
    state::Vault,
    errors::ErrorCode
};

#[derive(Accounts)]
pub struct TransferLamports<'info> {
    #[account(
        mut,
        seeds = [b"vault", backup.key().as_ref()],
        bump,
        has_one = backup,
        has_one = user,
    )]
    pub vault: Account<'info, Vault>,

    /// CHECK: Receiving account does not need to be checked
    #[account(mut)]
    pub receiver: UncheckedAccount<'info>,

    /// CHECK: The backup account is not read or written to, it only locates the PDA
    pub backup: UncheckedAccount<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>
}

pub fn transfer_lamports_handler(
    ctx: Context<TransferLamports>, 
    amount_lamports: u64
) -> Result<()> {
    msg!("Sending {} lamports to {}", amount_lamports, ctx.accounts.receiver.key());

    if **ctx.accounts.vault.to_account_info().try_borrow_lamports()? < amount_lamports {
        return err!(ErrorCode::InsufficientFunds);
    }

    **ctx.accounts.vault.to_account_info().try_borrow_mut_lamports()? -= amount_lamports;
    **ctx.accounts.receiver.to_account_info().try_borrow_mut_lamports()? += amount_lamports;

    msg!("Lamports sent");

    Ok(())
}