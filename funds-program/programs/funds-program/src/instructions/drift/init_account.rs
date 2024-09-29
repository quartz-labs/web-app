use anchor_lang::prelude::*;
use drift_sdk::cpi::{initialize_user, initialize_user_stats};
use drift_sdk::{InitializeUser, InitializeUserStats};

#[derive(Accounts)]
pub struct DriftUserInit<'info> {
    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref()],
        bump,
    )]
    pda_account: SystemAccount<'info>,

    /// CHECK: TODO - this is actually unsafe, just temporary
    #[account(mut)]
    pub user: AccountInfo<'info>,

    /// CHECK: TODO - this is actually unsafe, just temporary
    #[account(mut)]
    pub user_stats: AccountInfo<'info>,

    /// CHECK: TODO - this is actually unsafe, just temporary
    #[account(mut)]
    pub state: AccountInfo<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub rent: Sysvar<'info, Rent>,
    
    pub system_program: Program<'info, System>,

    #[account(mut)]
    owner: SystemAccount<'info>,

    /// CHECK: This is the Drift program ID
    pub drift_program: AccountInfo<'info>,
}

pub fn drift_init_user_handler(ctx: Context<DriftUserInit>) -> Result<()> {    
    let seed = ctx.accounts.owner.key();
    let bump_seed = ctx.bumps.pda_account;
    let signer_seeds: &[&[&[u8]]] = &[&[b"vault", seed.as_ref(), &[bump_seed]]];

    let create_user_stats_cpi_context = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        InitializeUserStats {
            user_stats: ctx.accounts.user_stats.to_account_info(),
            state: ctx.accounts.state.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            rent: ctx.accounts.rent.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
        },
        signer_seeds,
    );
    
    initialize_user_stats(create_user_stats_cpi_context)?;

    let create_user_cpi_context = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        InitializeUser {
            user: ctx.accounts.user.to_account_info(),
            user_stats: ctx.accounts.user_stats.to_account_info(),
            state: ctx.accounts.state.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            rent: ctx.accounts.rent.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
        },
        signer_seeds,
    );
 
    initialize_user(create_user_cpi_context, 0, [0; 32])?;
    Ok(())
}