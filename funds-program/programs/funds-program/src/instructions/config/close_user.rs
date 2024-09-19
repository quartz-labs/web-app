use anchor_lang::prelude::*;
use crate::state::Vault;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct CloseUser<'info> {
    #[account(
        mut,
        seeds = [b"vault", backup.key().as_ref()],
        bump = vault.bump,
        has_one = backup,
        has_one = user,
        close = init_payer,
    )]
    pub vault: Account<'info, Vault>,

    /// CHECK: The init_payer account is not read or written to, it only recieves rent
    #[account(
        mut,
        constraint = init_payer.key() == vault.init_payer.key() @ ErrorCode::InvalidInitPayer
    )]
    pub init_payer: UncheckedAccount<'info>,

    /// CHECK: The backup account is not read or written to, it only locates the PDA
    pub backup: UncheckedAccount<'info>,

    pub user: Signer<'info>,
}

pub fn close_user_handler(_ctx: Context<CloseUser>) -> Result<()> {
    msg!("Closing user account");
    Ok(())
}