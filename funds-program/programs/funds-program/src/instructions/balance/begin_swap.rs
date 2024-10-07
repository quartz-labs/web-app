use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use drift_cpi::{
    cpi::begin_swap as drift_begin_swap, 
    BeginSwap as DriftBeginSwap
};
use drift_accounts::{
    State as DriftState,
    User as DriftUser,
    UserStats as DriftUserStats
};
use crate::{
    constants::{
        DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, DRIFT_PROGRAM_ID, USDC_MINT_ADDRESS, WSOL_MINT_ADDRESS
    }, 
    errors::ErrorCode, 
    state::Vault
};

#[derive(Accounts)]
pub struct BeginSwap<'info> {
    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(
        mut,
        seeds = [vault.key().as_ref(), b"wsol"],
        bump,
        token::authority = vault
    )]
    pub vault_wsol: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds = [vault.key().as_ref(), b"usdc"],
        bump,
        token::authority = vault
    )]
    pub vault_usdc: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub owner: Signer<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"drift_state"],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_state: Box<Account<'info, DriftState>>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user", vault.key().as_ref(), (0u16).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user: AccountLoader<'info, DriftUser>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user_stats", vault.key().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user_stats: AccountLoader<'info, DriftUserStats>,

    #[account(
        mut,
        seeds = [b"spot_market_vault", (DRIFT_MARKET_INDEX_SOL).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        bump,
    )] // TODO - Add mint checks
    pub in_spot_market_vault: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds = [b"spot_market_vault", (DRIFT_MARKET_INDEX_USDC).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        bump,
    )]
    pub out_spot_market_vault: Box<Account<'info, TokenAccount>>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub drift_signer: UncheckedAccount<'info>,

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
}

pub fn begin_swap_handler(
    ctx: Context<BeginSwap>,
    amount_in: u64
) -> Result<()> {
    let vault_bump = ctx.accounts.vault.bump;
    let owner = ctx.accounts.owner.key();
    let seeds = &[
        b"vault",
        owner.as_ref(),
        &[vault_bump]
    ];
    let signer_seeds = &[&seeds[..]];

    // Call Drift CPI

    let mut cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        DriftBeginSwap {
            state: ctx.accounts.drift_state.to_account_info(),
            user: ctx.accounts.drift_user.to_account_info(),
            user_stats: ctx.accounts.drift_user_stats.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
            out_spot_market_vault: ctx.accounts.out_spot_market_vault.to_account_info(),
            in_spot_market_vault: ctx.accounts.in_spot_market_vault.to_account_info(),
            out_token_account: ctx.accounts.vault_usdc.to_account_info(),
            in_token_account: ctx.accounts.vault_wsol.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
            drift_signer: ctx.accounts.drift_signer.to_account_info(),
            instructions: ctx.accounts.instructions.to_account_info()
        },
        signer_seeds
    );

    cpi_ctx.remaining_accounts = vec![
        ctx.accounts.const_account.to_account_info(),
        ctx.accounts.additional_account.to_account_info(),
        ctx.accounts.spot_market_usdc.to_account_info(),
        ctx.accounts.spot_market_sol.to_account_info(),
    ];

    drift_begin_swap(cpi_ctx, DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, amount_in)?;

    Ok(())
}
