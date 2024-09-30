use anchor_lang::prelude::*;
use drift_sdk::accounts::{State, UserStats};
use drift_sdk::cpi::{initialize_user, initialize_user_stats};
use drift_sdk::{InitializeUser, InitializeUserStats};
use crate::{
    state::Vault,
    errors::ErrorCode,
    constants::DRIFT_ADDRESS
};

#[derive(Accounts)]
pub struct InitDriftAccount<'info> {
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
        seeds = [b"user_stats", owner.key().as_ref()],
        bump
    )]
    pub user_stats: Account<'info, UserStats>,

    #[account(
        mut,
        seeds = [b"drift_state", drift_program.key().as_ref()],
        bump
    )]
    pub state: Box<Account<'info, State>>,

    pub rent: Sysvar<'info, Rent>,
    
    pub system_program: Program<'info, System>,

    /// CHECK: This account is safe once it's the correct address
    #[account(
        constraint = drift_program.key() == DRIFT_ADDRESS @ ErrorCode::InvalidDriftAddress
    )]
    pub drift_program: UncheckedAccount<'info>,
}

pub fn init_drift_account_handler(ctx: Context<InitDriftAccount>) -> Result<()> {    
    msg!("init_drift_account: Initialize user stats account");

    let vault_bump = ctx.accounts.vault.bump;
    let owner = ctx.accounts.owner.key();
    let seeds = &[
        b"vault",
        owner.as_ref(),
        &[vault_bump]
    ];
    let signer_seeds = &[&seeds[..]];

    let create_user_stats_cpi_context = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        InitializeUserStats {
            user_stats: ctx.accounts.user_stats.to_account_info(),
            state: ctx.accounts.state.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
            payer: ctx.accounts.vault.to_account_info(),
            rent: ctx.accounts.rent.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
        },
        signer_seeds
    );
    
    initialize_user_stats(create_user_stats_cpi_context)?;

    msg!("init_drift_account: Initialize user account");

    let create_user_cpi_context = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        InitializeUser {
            user: ctx.accounts.owner.to_account_info(),
            user_stats: ctx.accounts.user_stats.to_account_info(),
            state: ctx.accounts.state.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
            payer: ctx.accounts.owner.to_account_info(),
            rent: ctx.accounts.rent.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
        },
        signer_seeds
    );
 
    initialize_user(create_user_cpi_context, 0, [0; 32])?;

    msg!("init_drift_account: Done");

    Ok(())
}