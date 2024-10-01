use anchor_lang::prelude::*;

mod state;
mod errors;
mod constants;
mod instructions;
use instructions::*;

declare_id!("B6gXhjcwsD8uFsaaPNFxeswxSNM79iP5mPgBnmxQJjn2");

#[program]
pub mod funds_program {
    use super::*;

    pub fn init_user(ctx: Context<InitializeUser>) -> Result<()> {
        init_user_handler(ctx)
    }

    pub fn close_user(ctx: Context<CloseUser>) -> Result<()> {
        close_user_handler(ctx)
    }

    // Not required until mobile app
    // pub fn change_user(ctx: Context<ChangeUser>) -> Result<()> {
    //     change_user_handler(ctx)
    // }

    pub fn init_drift_account(ctx: Context<InitDriftAccount>) -> Result<()> {
        init_drift_account_handler(ctx)
    }

    pub fn withdraw_lamports(ctx: Context<WithdrawLamports>, amount: u64) -> Result<()> {
        withdraw_lamports_handler(ctx, amount)
    }

    pub fn deposit_lamports_drift(ctx: Context<DepositLamportsDrift>, amount: u64, market_index: u16, reduce_only: bool) -> Result<()> {
        deposit_lamports_drift_handler(ctx, amount, market_index, reduce_only)
    }

    // Not required until mobile app
    // pub fn spend_usdc(ctx: Context<SpendUSDC>, amount_cents: u64) -> Result<()> {
    //     spend_usdc_handler(ctx, amount_cents)
    // }

    pub fn withdraw_usdc(ctx: Context<WithdrawUSDC>, amount: u64) -> Result<()> {
        withdraw_usdc_handler(ctx, amount)
    }
}
