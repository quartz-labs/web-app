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
        seeds = [b"vault", owner.key().as_ref()],
        bump,
        payer = owner,
        space = Vault::INIT_SPACE
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        init,
        seeds = [vault.key().as_ref(), usdc_mint.key().as_ref()],
        bump,
        payer = owner,
        token::mint = usdc_mint,
        token::authority = vault
    )]
    pub vault_usdc: Account<'info, TokenAccount>,

    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        constraint = usdc_mint.key() == USDC_MINT_ADDRESS @ ErrorCode::InvalidMintAddress
    )]
    pub usdc_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,

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
