use anchor_lang::prelude::*;
use crate::state::Vault;

#[derive(Accounts)]
pub struct TransferLamports<'info> {
    #[account(
        mut,
        seeds = [b"vault", user.key().as_ref()],
        bump,
        has_one = user,
    )]
    pub vault: Account<'info, Vault>,

    pub user: Signer<'info>,
}

pub fn transfer_lamports_handler(ctx: Context<TransferLamports>, amount: u64) -> Result<()> {
    // TODO - Implement
    Ok(())
}