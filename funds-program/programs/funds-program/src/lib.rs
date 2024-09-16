use anchor_lang::prelude::*;

pub mod constants;
pub use constants::*;

declare_id!("8QGSGBtq2dfVC3mtEyCnHBJV7vVby4nuj44wS46viY8G");

#[program]
pub mod funds_program {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        msg!("Initialized account for user {}", ctx.program_id);
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

    pub user: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>
}

#[account]
pub struct Vault {
    pub user: Pubkey
}

impl Space for Vault {
    const INIT_SPACE: usize = ANCHOR_DISCRIMINATOR + PUBKEY_SIZE;
}


#[error_code]
pub enum ErrorCode {
    #[msg("Invalid Quartz account")]
    InvalidQuartzAccount,
}