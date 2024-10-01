use anchor_lang::prelude::*;
use anchor_spl::token_interface::{TokenInterface, TokenAccount};
use drift_sdk::accounts::State;
use drift_sdk::cpi::deposit;
use drift_sdk::Deposit;

use crate::{
    constants::DRIFT_PROGRAM_ID,
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
        seeds = [b"spot_market_vault", (0u16).to_le_bytes().as_ref()], // 0 for SOL
        seeds::program = drift_program.key(),
        bump,
    )]
    pub spot_market_vault: UncheckedAccount<'info>,

    #[account(
        mut,
        token::authority = vault
    )]
    pub user_token_account: Box<InterfaceAccount<'info, TokenAccount>>,

    pub token_program: Interface<'info, TokenInterface>,

    /// CHECK: Account is safe once the address is correct
    #[account(
        constraint = drift_program.key() == DRIFT_PROGRAM_ID @ ErrorCode::InvalidDriftProgram
    )]
    pub drift_program: UncheckedAccount<'info>,
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
 
    let cpi_context = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        Deposit {
            state: ctx.accounts.state.to_account_info(),
            user: ctx.accounts.user.to_account_info(),
            user_stats: ctx.accounts.user_stats.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
            spot_market_vault: ctx.accounts.spot_market_vault.to_account_info(),
            user_token_account: ctx.accounts.user_token_account.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
        },
        signer_seeds
    );
 
    deposit(cpi_context, 0, amount, false)?;

    msg!("deposit_lamports_drift: Done");

    Ok(())
}