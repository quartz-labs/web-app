use anchor_lang::prelude::*;
use crate::state::Vault;
use crate::constants::*;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        seeds = [b"vault", user.key().as_ref()],
        bump,
        payer = quartz,
        space = Vault::INIT_SPACE
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        mut,
        constraint = quartz.key() == QUARTZ_PUBKEY @ ErrorCode::InvalidQuartzAccount
    )]
    pub quartz: Signer<'info>,

    /// CHECK: Account can be created for any user
    pub user: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>
}

pub fn init_user_handler(ctx: Context<InitializeUser>) -> Result<()> {
    ctx.accounts.vault.user = ctx.accounts.user.key();

    msg!("Initialized account for user {}", ctx.program_id);
    Ok(())
}
