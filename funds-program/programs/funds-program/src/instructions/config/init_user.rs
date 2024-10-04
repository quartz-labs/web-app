use anchor_lang::prelude::*;
use crate::state::Vault;

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        seeds = [b"vault", owner.key().as_ref()],
        bump,
        payer = owner,
        space = Vault::INIT_SPACE
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>
}

pub fn init_user_handler(ctx: Context<InitializeUser>) -> Result<()> {
    msg!("init_user: Initializing account");

    // Set up vault state
    ctx.accounts.vault.owner = ctx.accounts.owner.key();
    ctx.accounts.vault.bump = ctx.bumps.vault;

    msg!("init_user: Done");

    Ok(())
}
