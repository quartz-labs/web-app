use anchor_lang::prelude::*;
use crate::state::Vault;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct ChangeUser<'info> {
    #[account(
        mut,
        seeds = [b"vault", backup.key().as_ref()],
        bump,
        has_one = backup,
    )]
    pub vault: Account<'info, Vault>,

    /// CHECK: The init_payer account is not read or written to, it only recieves rent
    #[account(
        mut,
        constraint = init_payer.key() == vault.init_payer.key() @ ErrorCode::InvalidQuartzAccount
    )]
    pub init_payer: UncheckedAccount<'info>,

    /// CHECK: The new_user account is not read or written to, it only locates the PDA
    pub new_user: UncheckedAccount<'info>,

    pub backup: Signer<'info>,
}

pub fn change_user_handler(ctx: Context<ChangeUser>) -> Result<()> {
    msg!("Changing local user keypair");

    ctx.accounts.vault.user = ctx.accounts.new_user.key();
    Ok(())
}