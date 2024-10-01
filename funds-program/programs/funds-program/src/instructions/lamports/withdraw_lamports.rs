use anchor_lang::prelude::*;
use crate::{
    state::Vault,
    errors::ErrorCode
};

#[derive(Accounts)]
pub struct WithdrawLamports<'info> {
    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner,
    )]
    pub vault: Account<'info, Vault>,

    /// CHECK: Receiving account does not need to be checked
    #[account(mut)]
    pub receiver: UncheckedAccount<'info>,

    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>
}

pub fn withdraw_lamports_handler(
    ctx: Context<WithdrawLamports>, 
    amount: u64
) -> Result<()> {
    msg!("withdraw_lamports: Withdrawing {} lamports from Drift", amount);

    // let program_id = ctx.accounts.system_program.to_account_info();
    
    // let seed = ctx.accounts.owner.key();
    // let bump_seed = ctx.bumps.pda_account;
    // let signer_seeds: &[&[&[u8]]] = &[&[b"pda", seed.as_ref(), &[bump_seed]]];
 
    // let cpi_context = CpiContext::new(
    //     program_id,
    //     Withdraw {
    //         state: ctx.accounts.state.to_account_info(),
    //         user: ctx.accounts.user.to_account_info(),
    //         user_stats: ctx.accounts.user_stats.to_account_info(),
    //         authority: ctx.accounts.authority.to_account_info(),
    //         drift_signer: ctx.accounts.drift_signer.to_account_info(),
    //         spot_market_vault: ctx.accounts.spot_market_vault.to_account_info(),
    //         user_token_account: ctx.accounts.user_token_account.to_account_info(),
    //         token_program: ctx.accounts.token_program.to_account_info(),
    //     },
    // )
    // .with_signer(signer_seeds);
    
    // withdraw(cpi_context, market_index, amount, reduce_only)?;


    msg!("withdraw_lamports: Sending lamports to {}", ctx.accounts.receiver.key());

    if **ctx.accounts.vault.to_account_info().try_borrow_lamports()? < amount {
        return err!(ErrorCode::InsufficientFunds);
    }

    **ctx.accounts.vault.to_account_info().try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.receiver.to_account_info().try_borrow_mut_lamports()? += amount;

    msg!("withdraw_lamports: Done");

    Ok(())
}