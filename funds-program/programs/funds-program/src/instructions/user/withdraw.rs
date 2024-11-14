use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken, token::{self, Mint, Token, TokenAccount}
};
use drift::{
    Drift,
    cpi::withdraw as drift_withdraw, 
    Withdraw as DriftWithdraw
};
use crate::state::Vault;

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(
        mut,
        seeds = [b"vault".as_ref(), owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(
        init,
        seeds = [vault.key().as_ref(), spl_mint.key().as_ref()],
        bump,
        payer = owner,
        token::mint = spl_mint,
        token::authority = vault
    )]
    pub vault_spl: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        mut,
        associated_token::mint = spl_mint,
        associated_token::authority = owner
    )]
    pub owner_spl: Box<Account<'info, TokenAccount>>,

    pub spl_mint: Box<Account<'info, Mint>>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user".as_ref(), vault.key().as_ref(), (0u16).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user: UncheckedAccount<'info>,
    
    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user_stats".as_ref(), vault.key().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user_stats: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"drift_state".as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_state: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(mut)]
    pub spot_market_vault: UncheckedAccount<'info>,
    
    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub drift_signer: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub drift_program: Program<'info, Drift>,

    pub system_program: Program<'info, System>,
}

pub fn withdraw_handler<'info>(
    ctx: Context<'_, '_, '_, 'info, Withdraw<'info>>, 
    amount_base_units: u64,
    drift_market_index: u16,
    reduce_only: bool
) -> Result<()> {
    let vault_bump = ctx.accounts.vault.bump;
    let owner = ctx.accounts.owner.key();
    let seeds = &[
        b"vault",
        owner.as_ref(),
        &[vault_bump]
    ];
    let signer_seeds = &[&seeds[..]];

    // Drift Withdraw CPI

    let mut cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        DriftWithdraw {
            state: ctx.accounts.drift_state.to_account_info(),
            user: ctx.accounts.drift_user.to_account_info(),
            user_stats: ctx.accounts.drift_user_stats.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
            spot_market_vault: ctx.accounts.spot_market_vault.to_account_info(),
            drift_signer: ctx.accounts.drift_signer.to_account_info(),
            user_token_account: ctx.accounts.vault_spl.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
        },
        signer_seeds
    );

    cpi_ctx.remaining_accounts = ctx.remaining_accounts.to_vec();

    drift_withdraw(cpi_ctx, drift_market_index, amount_base_units, reduce_only)?;

    // Transfer tokens from vault's ATA to owner's ATA

    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(), 
            token::Transfer { 
                from: ctx.accounts.vault_spl.to_account_info(), 
                to: ctx.accounts.owner_spl.to_account_info(), 
                authority: ctx.accounts.vault.to_account_info()
            }, 
            signer_seeds
        ),
        amount_base_units
    )?;

    // Close vault's ATA

    let cpi_ctx_close = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        token::CloseAccount {
            account: ctx.accounts.vault_spl.to_account_info(),
            destination: ctx.accounts.owner.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        },
        signer_seeds
    );
    token::close_account(cpi_ctx_close)?;

    Ok(())
}