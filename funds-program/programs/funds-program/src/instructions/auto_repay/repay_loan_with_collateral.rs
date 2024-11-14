use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken, token::{self, Mint, Token, TokenAccount}
};
use drift::{
    Drift,
    cpi::{
        deposit as drift_deposit, 
        withdraw as drift_withdraw
    }, 
    Deposit as DriftDeposit,
    Withdraw as DriftWithdraw
};
use crate::state::Vault;

#[derive(Accounts)]
pub struct RepayLoanWithCollateral<'info> {
    #[account(
        mut,
        seeds = [b"vault".as_ref(), owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(
        init,
        seeds = [vault.key().as_ref(), mint_collateral.key().as_ref()],
        bump,
        payer = owner,
        token::mint = mint_collateral,
        token::authority = vault
    )]
    pub vault_collateral: Box<Account<'info, TokenAccount>>,

    #[account(
        init,
        seeds = [vault.key().as_ref(), mint_loan.key().as_ref()],
        bump,
        payer = owner,
        token::mint = mint_loan,
        token::authority = vault
    )]
    pub vault_loan: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        mut,
        associated_token::mint = mint_collateral,
        associated_token::authority = owner
    )]
    pub owner_collateral: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        associated_token::mint = mint_loan,
        associated_token::authority = owner
    )]
    pub owner_loan: Box<Account<'info, TokenAccount>>,

    pub mint_collateral: Box<Account<'info, Mint>>,

    pub mint_loan: Box<Account<'info, Mint>>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub drift_user: UncheckedAccount<'info>,
    
    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub drift_user_stats: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub drift_state: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub spot_market_vault_collateral: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub spot_market_vault_loan: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub drift_signer: UncheckedAccount<'info>,

    pub drift_program: Program<'info, Drift>,

    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub system_program: Program<'info, System>,
}

#[inline(never)]
fn repay_loan<'info>(
    ctx: &Context<'_, '_, '_, 'info, RepayLoanWithCollateral<'info>>,
    amount_loan_base_units: u64,
    drift_market_index_loan: u16,
    signer_seeds: &[&[&[u8]]]
) -> Result<()> {
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(), 
            token::Transfer { 
                from: ctx.accounts.owner_loan.to_account_info(), 
                to: ctx.accounts.vault_loan.to_account_info(), 
                authority: ctx.accounts.owner.to_account_info()
            }
        ),
        amount_loan_base_units
    )?;

    let deposit_accounts = DriftDeposit {
        state: ctx.accounts.drift_state.to_account_info(),
        user: ctx.accounts.drift_user.to_account_info(),
        user_stats: ctx.accounts.drift_user_stats.to_account_info(),
        authority: ctx.accounts.vault.to_account_info(),
        spot_market_vault: ctx.accounts.spot_market_vault_loan.to_account_info(),
        user_token_account: ctx.accounts.vault_loan.to_account_info(),
        token_program: ctx.accounts.token_program.to_account_info()
    };

    let mut deposit_ctx = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        deposit_accounts,
        signer_seeds
    );

    deposit_ctx.remaining_accounts = ctx.remaining_accounts.to_vec();

    // reduce_only = true to prevent depositing more than the borrowed position
    drift_deposit(deposit_ctx, drift_market_index_loan, amount_loan_base_units, true)
}

#[inline(never)]
fn withdraw_collateral<'info>(
    ctx: &Context<'_, '_, '_, 'info, RepayLoanWithCollateral<'info>>,
    amount_collateral_base_units: u64,
    drift_market_index_collateral: u16,
    signer_seeds: &[&[&[u8]]]
) -> Result<()> {
    let withdraw_accounts = DriftWithdraw {
        state: ctx.accounts.drift_state.to_account_info(),
        user: ctx.accounts.drift_user.to_account_info(),
        user_stats: ctx.accounts.drift_user_stats.to_account_info(),
        authority: ctx.accounts.vault.to_account_info(),
        spot_market_vault: ctx.accounts.spot_market_vault_collateral.to_account_info(),
        drift_signer: ctx.accounts.drift_signer.to_account_info(),
        user_token_account: ctx.accounts.vault_collateral.to_account_info(),
        token_program: ctx.accounts.token_program.to_account_info(),
    };

    let mut withdraw_ctx = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        withdraw_accounts,
        signer_seeds
    );

    withdraw_ctx.remaining_accounts = ctx.remaining_accounts.to_vec();

    // reduce_only = true to prevent withdrawing more than the collateral position (which would create a new loan)
    drift_withdraw(withdraw_ctx, drift_market_index_collateral, amount_collateral_base_units, true)?;

    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(), 
            token::Transfer { 
                from: ctx.accounts.vault_collateral.to_account_info(), 
                to: ctx.accounts.owner_collateral.to_account_info(), 
                authority: ctx.accounts.vault.to_account_info()
            }, 
            signer_seeds
        ),
        amount_collateral_base_units
    )
}

#[inline(never)]
fn close_atas<'info>(
    ctx: &Context<'_, '_, '_, 'info, RepayLoanWithCollateral<'info>>,
    signer_seeds: &[&[&[u8]]]
) -> Result<()> {
    let cpi_ctx_close = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        token::CloseAccount {
            account: ctx.accounts.vault_loan.to_account_info(),
            destination: ctx.accounts.owner.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        },
        signer_seeds
    );
    token::close_account(cpi_ctx_close)?;

    let cpi_ctx_close = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        token::CloseAccount {
            account: ctx.accounts.vault_collateral.to_account_info(),
            destination: ctx.accounts.owner.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        },
        signer_seeds
    );
    token::close_account(cpi_ctx_close)
}

pub fn repay_loan_with_collateral_handler<'info>(
    ctx: Context<'_, '_, '_, 'info, RepayLoanWithCollateral<'info>>, 
    amount_collateral_base_units: u64,
    amount_loan_base_units: u64,
    drift_market_index_collateral: u16,
    drift_market_index_loan: u16
) -> Result<()> {
    msg!("start handler");

    let vault_bump = ctx.accounts.vault.bump;
    let owner = ctx.accounts.owner.key();
    let seeds = &[
        b"vault",
        owner.as_ref(),
        &[vault_bump]
    ];
    let signer_seeds = &[&seeds[..]];

    repay_loan(&ctx, amount_loan_base_units, drift_market_index_loan, signer_seeds)?;

    withdraw_collateral(&ctx, amount_collateral_base_units, drift_market_index_collateral, signer_seeds)?;

    close_atas(&ctx, signer_seeds)?;

    Ok(())
}