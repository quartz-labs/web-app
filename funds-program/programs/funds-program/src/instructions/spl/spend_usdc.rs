use anchor_lang::prelude::*;
use anchor_spl::token::{
    Token,
    TokenAccount,
    Mint
};
use crate::{
    errors::ErrorCode,
    constants::{QUARTZ_HOLDING_ADDRESS, USDC_MINT_ADDRESS},
    state::Vault
};

#[derive(Accounts)]
pub struct SpendUSDC<'info> {
    #[account(
        mut,
        seeds = [b"vault", backup.key().as_ref()],
        bump,
        has_one = backup,
        has_one = user,
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        mut,
        seeds = [b"vault", backup.key().as_ref(), usdc_mint.key().as_ref()],
        bump,
        token::mint = usdc_mint,
        token::authority = vault
    )]
    pub vault_usdc: Account<'info, TokenAccount>,

    /// CHECK: The Quartz account is not read or written too, just needs to be the correct address
    #[account(
        mut,
        constraint = quartz_holding.key() == QUARTZ_HOLDING_ADDRESS @ ErrorCode::InvalidQuartzAccount
    )]
    pub quartz_holding: UncheckedAccount<'info>,

    #[account(
        mut,
        associated_token::mint = usdc_mint,
        associated_token::authority = quartz_holding
    )]
    pub quartz_holding_ata: Account<'info, TokenAccount>,

    /// CHECK: The backup account is not read or written to, it only locates the PDA
    pub backup: UncheckedAccount<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        constraint = usdc_mint.key() == USDC_MINT_ADDRESS @ ErrorCode::InvalidMintAddress
    )]
    pub usdc_mint: Account<'info, Mint>,
    
    pub token_program: Program<'info, Token>
}

pub fn spend_usdc_handler(
    _ctx: Context<SpendUSDC>, 
    amount_cents: u64
) -> Result<()> {
    msg!("Sending {} USDC cents to Quartz", amount_cents);

    Ok(())
}