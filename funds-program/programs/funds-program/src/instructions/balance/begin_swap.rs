use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use crate::{
    constants::{
        DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, DRIFT_PROGRAM_ID, USDC_MINT_ADDRESS, WSOL_MINT_ADDRESS
    }, 
    errors::ErrorCode, 
    state::Vault
};

#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(
        init,
        seeds = [vault.key().as_ref(), wsol_mint.key().as_ref()],
        bump,
        payer = owner,
        token::mint = wsol_mint,
        token::authority = vault
    )]
    pub vault_wsol: Box<Account<'info, TokenAccount>>,

    #[account(
        init,
        seeds = [vault.key().as_ref(), usdc_mint.key().as_ref()],
        bump,
        payer = owner,
        token::mint = usdc_mint,
        token::authority = vault
    )]
    pub vault_usdc: Box<Account<'info, TokenAccount>>, // TODO - Note, possible space saving here is not to use mint account in instruction, just have "usdc" as seed and check it's the same as output's

    #[account(mut)]
    pub owner: Signer<'info>,

     /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
     #[account(
        mut,
        seeds = [b"user", vault.key().as_ref(), (0u16).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user_stats", vault.key().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user_stats: UncheckedAccount<'info>,

    #[account(
        mut,
        seeds = [b"spot_market_vault", (DRIFT_MARKET_INDEX_SOL).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        token::mint = wsol_mint,
        bump,
    )]
    pub in_spot_market_vault: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds = [b"spot_market_vault", (DRIFT_MARKET_INDEX_USDC).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        token::mint = usdc_mint,
        bump,
    )]
    pub out_spot_market_vault: Box<Account<'info, TokenAccount>>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub drift_signer: UncheckedAccount<'info>,

    #[account(
        constraint = wsol_mint.key() == WSOL_MINT_ADDRESS @ ErrorCode::InvalidMintAddress
    )]
    pub wsol_mint: Account<'info, Mint>,

    #[account(
        constraint = wsol_mint.key() == USDC_MINT_ADDRESS @ ErrorCode::InvalidMintAddress
    )]
    pub usdc_mint: Account<'info, Mint>,

    /// CHECK: TODO - This is actually unsafe, but temporary
    pub instructions: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub const_account: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub additional_account: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(mut)]
    pub spot_market_sol: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(mut)]
    pub spot_market_usdc: UncheckedAccount<'info>,

    /// CHECK: Account is safe once the address is correct
    #[account(
        constraint = drift_program.key() == DRIFT_PROGRAM_ID @ ErrorCode::InvalidDriftProgram
    )]
    pub drift_program: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>
}

pub fn begin_swap_handler(ctx: Context<Swap>) -> Result<()> {
    let vault_bump = ctx.accounts.vault.bump;
    let owner = ctx.accounts.owner.key();
    let seeds = &[
        b"vault",
        owner.as_ref(),
        &[vault_bump]
    ];
    let signer_seeds = &[&seeds[..]];

    Ok(())
}
