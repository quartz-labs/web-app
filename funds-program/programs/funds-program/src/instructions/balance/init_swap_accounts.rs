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
pub struct InitSwapAccounts<'info> {
    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(
        init,
        seeds = [vault.key().as_ref(), b"wsol"],
        bump,
        payer = owner,
        token::mint = wsol_mint,
        token::authority = vault
    )]
    pub vault_wsol: Box<Account<'info, TokenAccount>>,

    #[account(
        init,
        seeds = [vault.key().as_ref(), b"usdc"],
        bump,
        payer = owner,
        token::mint = usdc_mint,
        token::authority = vault
    )]
    pub vault_usdc: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub owner: Signer<'info>,
    
    // TODO - Add check for account
    pub wsol_mint: Box<Account<'info, Mint>>,

    pub usdc_mint: Box<Account<'info, Mint>>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>
}

pub fn init_swap_accounts_handler(
    _ctx: Context<InitSwapAccounts>
) -> Result<()> {
    Ok(())
}
