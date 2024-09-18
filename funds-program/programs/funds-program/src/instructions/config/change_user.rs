use anchor_lang::prelude::*;
use crate::state::Vault;

#[derive(Accounts)]
pub struct ChangeUser<'info> {
    #[account(
        mut,
        seeds = [b"vault", backup.key().as_ref()],
        bump,
        has_one = backup,
    )]
    pub vault: Account<'info, Vault>,

    /// CHECK: The new_user can be any account
    pub new_user: UncheckedAccount<'info>,

    pub backup: Signer<'info>,
}

pub fn change_user_handler(ctx: Context<ChangeUser>) -> Result<()> {
    msg!("Changing local user keypair");

    ctx.accounts.vault.user = ctx.accounts.new_user.key();
    Ok(())
}