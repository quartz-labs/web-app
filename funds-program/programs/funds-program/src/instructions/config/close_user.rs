use anchor_lang::prelude::*;
use crate::state::Vault;
use crate::constants::QUARTZ_MANAGER_ADDRESS;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct CloseUser<'info> {
    #[account(
        mut,
        seeds = [b"vault", user.key().as_ref()],
        bump,
        has_one = user,
        close = quartz_manager,
    )]
    pub vault: Account<'info, Vault>,

    /// CHECK: The Quartz manager account is not read or written to, it only recieves rent
    #[account(
        constraint = quartz_manager.key() == QUARTZ_MANAGER_ADDRESS @ ErrorCode::InvalidQuartzAccount
    )]
    pub quartz_manager: UncheckedAccount<'info>,

    pub user: Signer<'info>
}

pub fn close_user_handler(ctx: Context<CloseUser>) -> Result<()> {
    msg!("Closing user account for {}", ctx.program_id);
    Ok(())
}