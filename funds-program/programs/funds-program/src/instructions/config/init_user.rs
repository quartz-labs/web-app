use anchor_lang::prelude::*;
use anchor_spl::token::{
    Token,
    TokenAccount,
    Mint
};
use crate::{
    state::Vault,
    constants::USDC_MINT_ADDRESS,
    errors::ErrorCode
};

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

    #[account(
        init,
        seeds = [b"vault", backup.key().as_ref(), usdc_mint.key().as_ref()],
        bump,
        payer = payer,
        token::mint = usdc_mint,
        token::authority = vault
    )]
    pub vault_usdc: Account<'info, TokenAccount>,

    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: Backup account is not read or written to, is only assigned as owner and can be any accountx
    pub backup: UncheckedAccount<'info>,

    /// CHECK: User account is not read or written to, is only assigned as owner and can be any account
    pub user: UncheckedAccount<'info>,

    #[account(
        constraint = usdc_mint.key() == USDC_MINT_ADDRESS @ ErrorCode::InvalidMintAddress
    )]
    pub usdc_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>
}

pub fn init_user_handler(ctx: Context<InitializeUser>) -> Result<()> {
    msg!("Initializing account");

    ctx.accounts.vault.backup = ctx.accounts.backup.key();
    ctx.accounts.vault.user = ctx.accounts.user.key();
    ctx.accounts.vault.init_payer = ctx.accounts.payer.key();

    Ok(())
}
