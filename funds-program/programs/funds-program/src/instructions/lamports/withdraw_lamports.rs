use anchor_lang::prelude::*;
use crate::{
    state::Vault,
    errors::ErrorCode
};

#[derive(Accounts)]
pub struct WithdrawLamports<'info> {
    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner,
    )]
    pub vault: Account<'info, Vault>,

    /// CHECK: Receiving account does not need to be checked
    #[account(mut)]
    pub receiver: UncheckedAccount<'info>,

    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>
}

pub fn withdraw_lamports_handler(
    ctx: Context<WithdrawLamports>, 
    amount: u64
) -> Result<()> {
    msg!("Sending {} lamports to {}", amount, ctx.accounts.receiver.key());

    if **ctx.accounts.vault.to_account_info().try_borrow_lamports()? < amount {
        return err!(ErrorCode::InsufficientFunds);
    }

    **ctx.accounts.vault.to_account_info().try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.receiver.to_account_info().try_borrow_mut_lamports()? += amount;

    msg!("Lamports sent");

    Ok(())
}