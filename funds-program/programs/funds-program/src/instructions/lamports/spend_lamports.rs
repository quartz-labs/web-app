use anchor_lang::prelude::*;
use crate::{
    state::Vault,
    utils::transfer_lamports_from_vault,
    errors::ErrorCode,
    constants::QUARTZ_HOLDING_ADDRESS
};

#[derive(Accounts)]
pub struct SpendLamports<'info> {
    #[account(
        mut,
        seeds = [b"vault", backup.key().as_ref()],
        bump,
        has_one = backup,
        has_one = user,
    )]
    pub vault: Account<'info, Vault>,

    /// CHECK: Receiving account does not need to be checked, once the address is the correct one
    #[account(
        mut,
        constraint = quartz_holding.key() == QUARTZ_HOLDING_ADDRESS @ ErrorCode::InvalidQuartzAccount
    )]
    pub quartz_holding: UncheckedAccount<'info>,

    /// CHECK: The backup account is not read or written to, it only locates the PDA
    pub backup: UncheckedAccount<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>
}

pub fn spend_lamports_handler(
    ctx: Context<SpendLamports>, 
    amount_lamports: u64
) -> Result<()> {
    msg!("Sending {} lamports to Quartz", amount_lamports);

    transfer_lamports_from_vault(
        amount_lamports, 
        ctx.accounts.vault.to_account_info(), 
        ctx.accounts.quartz_holding.to_account_info()
    )?;

    msg!("Lamports sent");

    Ok(())
}