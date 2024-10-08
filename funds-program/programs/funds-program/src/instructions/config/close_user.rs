use anchor_lang::prelude::*;
use crate::state::Vault;

#[derive(Accounts)]
pub struct CloseUser<'info> {
    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner,
        close = owner,
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(mut)]
    pub owner: Signer<'info>,
}

pub fn close_user_handler(_ctx: Context<CloseUser>) -> Result<()> {
    Ok(())
}