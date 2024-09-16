use anchor_lang::prelude::*;
use crate::state::Vault;
use crate::constants::QUARTZ_MANAGER_ADDRESS;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        seeds = [b"vault", user.key().as_ref()],
        bump,
        payer = quartz_manager,
        space = Vault::INIT_SPACE
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        mut,
        constraint = quartz_manager.key() == QUARTZ_MANAGER_ADDRESS @ ErrorCode::InvalidQuartzAccount
    )]
    pub quartz_manager: Signer<'info>,

    /// CHECK: User account is not read or written to, it is only assigned as the owner and can be any account
    pub user: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>
}

pub fn init_user_handler(ctx: Context<InitializeUser>) -> Result<()> {
    ctx.accounts.vault.user = ctx.accounts.user.key();

    msg!("Initialized account for user {}", ctx.program_id);
    Ok(())
}
