use anchor_lang::prelude::*;
use crate::state::Vault;

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        seeds = [b"vault", backup.key().as_ref()],
        bump,
        payer = payer,
        space = Vault::INIT_SPACE
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: Backup account is not read or written to, is only assigned as owner and can be any accountx
    pub backup: UncheckedAccount<'info>,

    /// CHECK: User account is not read or written to, is only assigned as owner and can be any account
    pub user: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>
}

pub fn init_user_handler(ctx: Context<InitializeUser>) -> Result<()> {
    msg!("Initializing account");

    ctx.accounts.vault.backup = ctx.accounts.backup.key();
    ctx.accounts.vault.user = ctx.accounts.user.key();
    ctx.accounts.vault.init_payer = ctx.accounts.payer.key();

    Ok(())
}
