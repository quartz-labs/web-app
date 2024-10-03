use anchor_lang::prelude::*;
use anchor_spl::{
    token::{Mint, Token}, 
    token::TokenAccount
};
use drift_sdk::accounts::State;
use drift_sdk::cpi::deposit;
use drift_sdk::Deposit;

use crate::{
    constants::{DRIFT_PROGRAM_ID, WSOL_MINT_ADDRESS},
    errors::ErrorCode,
    state::Vault
};

#[derive(Accounts)]
pub struct DepositLamportsDrift<'info> {
    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        mut,
        seeds = [b"drift_state"],
        seeds::program = drift_program.key(),
        bump
    )]
    pub state: Box<Account<'info, State>>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user", vault.key().as_ref(), (0u16).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub user: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user_stats", vault.key().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub user_stats: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"spot_market_vault", (1u16).to_le_bytes().as_ref()], // 1 for SOL
        seeds::program = drift_program.key(),
        bump,
    )]
    pub spot_market_vault: UncheckedAccount<'info>,

    #[account(
        init,
        seeds = [b"vault", owner.key().as_ref(), wsol_mint.key().as_ref()],
        bump,
        payer = owner,
        token::mint = wsol_mint,
        token::authority = vault
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(
        constraint = wsol_mint.key() == WSOL_MINT_ADDRESS @ ErrorCode::InvalidMintAddress
    )]
    pub wsol_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,

    /// CHECK: Account is safe once the address is correct
    #[account(
        constraint = drift_program.key() == DRIFT_PROGRAM_ID @ ErrorCode::InvalidDriftProgram
    )]
    pub drift_program: UncheckedAccount<'info>,

    /// CHECK: Additonal account needed for the Drift CPI
    #[account()]
    pub additional_account: UncheckedAccount<'info>,

    /// CHECK: Additonal account needed for the Drift CPI
    #[account(mut)]
    pub market_vault: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>
}

pub fn deposit_lamports_drift_handler(
    ctx: Context<DepositLamportsDrift>, 
    amount: u64
) -> Result<()> {
    msg!("deposit_lamports_drift: Deposit {} lamports into Drift", amount);
    
    let vault_bump = ctx.accounts.vault.bump;
    let owner = ctx.accounts.owner.key();
    let seeds = &[
        b"vault",
        owner.as_ref(),
        &[vault_bump]
    ];
    let signer_seeds = &[&seeds[..]];
 
    let cpi_accounts = Deposit {
        state: ctx.accounts.state.to_account_info(),
        user: ctx.accounts.user.to_account_info(),
        user_stats: ctx.accounts.user_stats.to_account_info(),
        authority: ctx.accounts.vault.to_account_info(),
        spot_market_vault: ctx.accounts.spot_market_vault.to_account_info(),
        user_token_account: ctx.accounts.user_token_account.to_account_info(),
        token_program: ctx.accounts.token_program.to_account_info(),
    };

    let mut cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        cpi_accounts,
        signer_seeds
    );

    // Add additional_account and market_vault as remaining accounts
    cpi_ctx.remaining_accounts = vec![
        ctx.accounts.additional_account.to_account_info(),
        ctx.accounts.market_vault.to_account_info(),
    ];

    deposit(cpi_ctx, 1, amount, false)?;

    msg!("deposit_lamports_drift: Done");

    Ok(())
}