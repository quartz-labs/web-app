use anchor_lang::prelude::*;
use crate::state::Vault;

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        seeds = [b"vault", user.key().as_ref()],
        bump,
        payer = payer,
        space = Vault::INIT_SPACE
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: User account is not read or written to, it is only assigned as the owner and can be any account
    pub user: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>
}

pub fn init_user_handler(ctx: Context<InitializeUser>) -> Result<()> {
    msg!("Initializing account for user {}", ctx.program_id);

    ctx.accounts.vault.user = ctx.accounts.user.key();
    ctx.accounts.vault.init_payer = ctx.accounts.payer.key();

    Ok(())
}
