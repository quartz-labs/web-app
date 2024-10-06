use anchor_lang::prelude::*;

mod state;
mod errors;
mod constants;
mod instructions;
use instructions::*;

declare_id!("6ggU2Pwj8XgHxTerNNhvCxarQN5GGVLYmnvPgWDm6BUX");

#[program]
pub mod funds_program {
    use super::*;

    // Config

    pub fn init_user(ctx: Context<InitializeUser>) -> Result<()> {
        init_user_handler(ctx)
    }

    pub fn close_user(ctx: Context<CloseUser>) -> Result<()> {
        close_user_handler(ctx)
    }

    pub fn init_drift_account(ctx: Context<InitDriftAccount>) -> Result<()> {
        init_drift_account_handler(ctx)
    }

    // Balance

    pub fn withdraw_lamports(ctx: Context<WithdrawLamports>, amount: u64) -> Result<()> {
        withdraw_lamports_handler(ctx, amount)
    }

    pub fn deposit_lamports(ctx: Context<DepositLamports>, amount: u64) -> Result<()> {
        deposit_lamports_handler(ctx, amount)
    }

    pub fn withdraw_usdc(ctx: Context<WithdrawUsdc>, amount_cents: u64) -> Result<()> {
        withdraw_usdc_handler(ctx, amount_cents)
    }

    pub fn begin_swap<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, BeginSwap<'info>>, 
        amount_in: u64
    ) -> Result<()> {
        begin_swap_handler(ctx, amount_in)
    }

    pub fn end_swap(ctx: Context<EndSwap>) -> Result<()> {
        end_swap_handler(ctx)
    }
}
