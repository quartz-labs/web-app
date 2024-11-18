use anchor_lang::prelude::*;
use drift::{
    program::Drift,
    cpi::delete_user, 
    cpi::accounts::DeleteUser,
    state::{
        state::State as DriftState, 
        user::{User as DriftUser, UserStats as DriftUserStats}
    }
};
use crate::state::Vault;

#[derive(Accounts)]
pub struct CloseDriftAccount<'info> {
    #[account(
        mut,
        seeds = [b"vault".as_ref(), owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(mut)]
    pub owner: Signer<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user".as_ref(), vault.key().as_ref(), (0u16).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user: AccountLoader<'info, DriftUser>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user_stats".as_ref(), vault.key().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user_stats: AccountLoader<'info, DriftUserStats>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"drift_state".as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_state: Box<Account<'info, DriftState>>,

    pub drift_program: Program<'info, Drift>
}

pub fn close_drift_account_handler(
    ctx: Context<CloseDriftAccount>
) -> Result<()> {    
    let vault_bump = ctx.accounts.vault.bump;
    let owner = ctx.accounts.owner.key();
    let seeds = &[
        b"vault",
        owner.as_ref(),
        &[vault_bump]
    ];
    let signer_seeds = &[&seeds[..]];

    let delete_user_cpi_context = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        DeleteUser {
            user: ctx.accounts.drift_user.to_account_info(),
            user_stats: ctx.accounts.drift_user_stats.to_account_info(),
            state: ctx.accounts.drift_state.to_account_info(),
            authority: ctx.accounts.vault.to_account_info()
        },
        signer_seeds
    );
    
    delete_user(delete_user_cpi_context)?;

    Ok(())
}