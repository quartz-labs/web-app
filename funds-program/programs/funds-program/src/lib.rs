use anchor_lang::prelude::*;

mod state;
mod errors;
mod constants;
use constants::*;

declare_id!("8QGSGBtq2dfVC3mtEyCnHBJV7vVby4nuj44wS46viY8G");

#[program]
pub mod funds_program {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        msg!("Initialized account for user {}", ctx.program_id);
        Ok(())
    }

    pub fn send_lamports(ctx: Context<SendLamports>, amount: u64) -> Result<()> {
        // TODO - Implement
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        seeds = [b"vault", user.key().as_ref()],
        bump,
        payer = quartz,
        space = Vault::INIT_SPACE
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        mut,
        constraint = quartz.key() == QUARTZ_PUBKEY @ ErrorCode::InvalidQuartzAccount
    )]
    pub quartz: Signer<'info>,

    /// CHECK: Account can be created for any user
    pub user: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct SendLamports<'info> {
    #[account(
        mut,
        seeds = [b"vault", user.key().as_ref()],
        bump,
        space = Vault::INIT_SPACE
    )]
    pub vault: Account<'info, Vault>,

    pub receiver    
}
