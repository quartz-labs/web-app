use anchor_lang::prelude::*;

mod macros;
mod state;
mod errors;
mod constants;
mod instructions;
use instructions::*;

declare_id!("6JjHXLheGSNvvexgzMthEcgjkcirDrGduc3HAKB2P1v2");

#[cfg(not(feature = "no-entrypoint"))]
use solana_security_txt::security_txt;
#[cfg(not(feature = "no-entrypoint"))]
security_txt! {
    name: "Quartz",
    project_url: "https://quartzpay.io/",
    contacts: "email:iarla@quartzpay.io",
    policy: "https://github.com/quartz-labs/quartz-app/blob/main/SECURITY.md",
    preferred_languages: "en",
    source_code: "https://github.com/quartz-labs/quartz-app"
}

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

    pub fn close_drift_account(ctx: Context<CloseDriftAccount>) -> Result<()> {
        close_drift_account_handler(ctx)
    }

    // User

    pub fn deposit<'info>(
        ctx: Context<'_, '_, '_, 'info, Deposit<'info>>, 
        amount_base_units: u64, 
        drift_market_index: u16,
        reduce_only: bool
    ) -> Result<()> {
        deposit_handler(ctx, amount_base_units, drift_market_index, reduce_only)
    }

    pub fn withdraw<'info>(
        ctx: Context<'_, '_, '_, 'info, Withdraw<'info>>, 
        amount_base_units: u64, 
        drift_market_index: u16,
        reduce_only: bool
    ) -> Result<()> {
        withdraw_handler(ctx, amount_base_units, drift_market_index, reduce_only)
    }

    // Auto Repay

    pub fn auto_repay_start<'info>(
        ctx: Context<'_, '_, '_, 'info, AutoRepayStart<'info>>,
        start_balance: u64  
    ) -> Result<()> {
        auto_repay_start_handler(ctx, start_balance)
    }

    pub fn auto_repay_deposit<'info>(
        ctx: Context<'_, '_, 'info, 'info, AutoRepayDeposit<'info>>,
        drift_market_index: u16
    ) -> Result<()> {
        auto_repay_deposit_handler(ctx, drift_market_index)
    }

    pub fn auto_repay_withdraw<'info>(
        ctx: Context<'_, '_, '_, 'info, AutoRepayWithdraw<'info>>,
        drift_market_index: u16
    ) -> Result<()> {
        auto_repay_withdraw_handler(ctx, drift_market_index)
    }
}
