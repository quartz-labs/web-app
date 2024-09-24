use anchor_lang::prelude::*;
use anchor_spl::token::{
    self, Mint, Token, TokenAccount
};
use crate::{
    errors::ErrorCode,
    constants::{QUARTZ_HOLDING_ADDRESS, USDC_MINT_ADDRESS},
    state::Vault
};

// TODO - This is not functional, needs looking at again once using mobile app
#[derive(Accounts)]
pub struct SpendUSDC<'info> {
    #[account(
        mut,
        seeds = [b"vault", backup.key().as_ref()],
        bump = vault.bump,
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
    pub quartz_holding_usdc: Account<'info, TokenAccount>,

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
    ctx: Context<SpendUSDC>, 
    amount_cents: u64
) -> Result<()> {
    msg!("Spending {} USDC with card", amount_cents * 100);

    if ctx.accounts.vault_usdc.amount < amount_cents {
        return err!(ErrorCode::InsufficientFunds);
    }

    let vault_bump = ctx.accounts.vault.bump;
    let backup = ctx.accounts.backup.key();
    let signer_seeds = &[
        b"vault",
        backup.as_ref(),
        &[vault_bump]
    ];

    // Transfer USDC
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(), 
            token::Transfer { 
                from: ctx.accounts.vault_usdc.to_account_info(), 
                to: ctx.accounts.quartz_holding_usdc.to_account_info(), 
                authority: ctx.accounts.vault.to_account_info()
            }, 
            &[&signer_seeds[..]]
        ),
        amount_cents
    )?;

    Ok(())
}