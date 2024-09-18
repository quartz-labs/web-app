use anchor_lang::prelude::*;

mod state;
mod errors;
mod constants;
mod utils;
mod instructions;
use instructions::*;

declare_id!("8QGSGBtq2dfVC3mtEyCnHBJV7vVby4nuj44wS46viY8G");

#[program]
pub mod funds_program {
    use super::*;

    pub fn init_user(ctx: Context<InitializeUser>) -> Result<()> {
        init_user_handler(ctx)
    }

    pub fn close_user(ctx: Context<CloseUser>) -> Result<()> {
        close_user_handler(ctx)
    }

    pub fn change_user(ctx: Context<ChangeUser>) -> Result<()> {
        change_user_handler(ctx)
    }

    pub fn transfer_lamports(ctx: Context<TransferLamports>, amount: u64) -> Result<()> {
        transfer_lamports_handler(ctx, amount)
    }

    pub fn spend_usdc(ctx: Context<SpendUSDC>, amount_cents: u64) -> Result<()> {
        spend_usdc_handler(ctx, amount_cents)
    }

    pub fn transfer_spl(ctx: Context<TransferSPL>, amount: u64) -> Result<()> {
        transfer_spl_handler(ctx, amount)
    }
}
