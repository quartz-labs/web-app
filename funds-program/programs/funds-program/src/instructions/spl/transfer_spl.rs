use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{
    self, Mint, Token, TokenAccount
}};
use crate::{
    state::Vault,
    errors::ErrorCode
};

#[derive(Accounts)]
pub struct TransferSPL<'info> {
    #[account(
        mut,
        seeds = [b"vault", backup.key().as_ref()],
        bump,
        has_one = backup,
        has_one = user,
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        seeds = [b"vault", backup.key().as_ref(), token_mint.key().as_ref()],
        bump,
        token::mint = token_mint,
        token::authority = vault
    )]
    pub vault_spl: Account<'info, TokenAccount>,

    /// CHECK: Receiving account does not need to be checked
    #[account(mut)]
    pub receiver: UncheckedAccount<'info>,

    #[account(
        init_if_needed,
        payer = vault,
        associated_token::mint = token_mint,
        associated_token::authority = receiver
    )]
    pub receiver_ata: Account<'info, TokenAccount>,

    /// CHECK: The backup account is not read or written to, it only locates the PDA
    pub backup: UncheckedAccount<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub token_mint: Account<'info, Mint>,
    
    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub system_program: Program<'info, System>
}

pub fn transfer_spl_handler(
    ctx: Context<TransferSPL>, 
    amount: u64
) -> Result<()> {
    msg!(
        "Sending {} tokens to {}, mint address: {}",
        amount, ctx.accounts.receiver_ata.key(), ctx.accounts.token_mint.key()
    );

    if ctx.accounts.vault_spl.amount < amount {
        return err!(ErrorCode::InsufficientFunds);
    }

    let backup = ctx.accounts.backup.key();
    let seeds = &[
        b"vault",
        backup.as_ref(),
        &[ctx.accounts.vault.bump]
    ];
    let signer_seeds = &[&seeds[..]];

    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(), 
            token::Transfer { 
                from: ctx.accounts.vault_spl.to_account_info(), 
                to: ctx.accounts.receiver_ata.to_account_info(), 
                authority: ctx.accounts.vault.to_account_info()
            }, 
            signer_seeds
        ),
        amount
    )?;

    Ok(())
}