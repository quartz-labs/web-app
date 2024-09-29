use anchor_lang::prelude::*;
//import the cpi drift deposit
use drift_sdk::cpi::withdraw;
use drift_sdk::Withdraw;

#[derive(Accounts)]
pub struct DriftWithdrawBorrow<'info> {
    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref()],
        bump,
    )]
    pda_account: SystemAccount<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    
    #[account(mut)]
    owner: SystemAccount<'info>,
    
    system_program: Program<'info, System>,
}

pub fn drift_withdraw_borrow_handler(ctx: Context<DriftWithdrawBorrow>, amount: u64, market_index: u16, reduce_only: bool) -> Result<()> {
    let program_id = ctx.accounts.system_program.to_account_info();
    
    let seed = ctx.accounts.owner.key();
    let bump_seed = ctx.bumps.pda_account;
    let signer_seeds: &[&[&[u8]]] = &[&[b"pda", seed.as_ref(), &[bump_seed]]];
 
    let cpi_context = CpiContext::new(
        program_id,
        Withdraw {
            state: ctx.accounts.state.to_account_info(),
            user: ctx.accounts.user.to_account_info(),
            user_stats: ctx.accounts.user_stats.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
            drift_signer: ctx.accounts.drift_signer.to_account_info(),
            spot_market_vault: ctx.accounts.spot_market_vault.to_account_info(),
            user_token_account: ctx.accounts.user_token_account.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
        },
    )
    .with_signer(signer_seeds);
 
    withdraw(cpi_context, market_index, amount, reduce_only)?;
    Ok(())
}