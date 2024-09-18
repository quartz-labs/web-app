use anchor_lang::prelude::*;
use crate::{
    state::Vault,
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

    /// CHECK: Quartz account is not read or written to, just needs to be the correct address
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
    _ctx: Context<SpendLamports>, 
    amount_lamports: u64
) -> Result<()> {
    msg!("Swapping {} lamports for card spend", amount_lamports);

    // TODO - Implement
    // 1. Swap lamports to USDC
    // 2. Send USDC to Quartz

    let usdc_amount = 0;
    msg!("Sent {} USDC to Quartz", usdc_amount);

    Ok(())
}
