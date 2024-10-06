use anchor_lang::prelude::*;
use anchor_spl::{
    token,
    token::{Mint, Token}, 
    token::TokenAccount
};
use drift_cpi::{
    cpi::withdraw, 
    Withdraw
};
use crate::{
    constants::{DRIFT_MARKET_INDEX_SOL, DRIFT_PROGRAM_ID, WSOL_MINT_ADDRESS}, 
    errors::ErrorCode, 
    state::Vault
};

#[derive(Accounts)]
pub struct WithdrawLamports<'info> {
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

    #[account(mut)]
    pub owner: Signer<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"drift_state"],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_state: UncheckedAccount<'info>,

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
    pub spot_market_vault: Box<Account<'info, TokenAccount>>,
    
    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub drift_signer: UncheckedAccount<'info>,

    #[account(
        constraint = wsol_mint.key() == WSOL_MINT_ADDRESS @ ErrorCode::InvalidMintAddress
    )]
    pub wsol_mint: Box<Account<'info, Mint>>,

    pub token_program: Program<'info, Token>,

    /// CHECK: Account is safe once the address is correct
    #[account(
        constraint = drift_program.key() == DRIFT_PROGRAM_ID @ ErrorCode::InvalidDriftProgram
    )]
    pub drift_program: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub const_account: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub additional_account: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(mut)]
    pub spot_market_sol: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub spot_market_usdc: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn withdraw_lamports_handler(
    ctx: Context<WithdrawLamports>, 
    amount: u64
) -> Result<()> {
    let vault_bump = ctx.accounts.vault.bump;
    let owner = ctx.accounts.owner.key();
    let seeds = &[
        b"vault",
        owner.as_ref(),
        &[vault_bump]
    ];
    let signer_seeds = &[&seeds[..]];

    // Build Drift Withdraw CPI
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        Withdraw {
            state: ctx.accounts.drift_state.to_account_info(),
            user: ctx.accounts.drift_user.to_account_info(),
            user_stats: ctx.accounts.drift_user_stats.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
            spot_market_vault: ctx.accounts.spot_market_vault.to_account_info(),
            drift_signer: ctx.accounts.drift_signer.to_account_info(),
            user_token_account: ctx.accounts.vault_wsol.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
        },
        signer_seeds
    ).with_remaining_accounts(vec![
        ctx.accounts.const_account.to_account_info(),
        ctx.accounts.additional_account.to_account_info(),
        ctx.accounts.spot_market_sol.to_account_info(),
        ctx.accounts.spot_market_usdc.to_account_info()
    ]);

    withdraw(cpi_ctx, DRIFT_MARKET_INDEX_SOL, amount, true)?;

    // Close wSol vault, sending balance to owner

    let cpi_ctx_close = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        token::CloseAccount {
            account: ctx.accounts.vault_wsol.to_account_info(),
            destination: ctx.accounts.owner.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        },
        signer_seeds
    );
    token::close_account(cpi_ctx_close)?;

    Ok(())
}