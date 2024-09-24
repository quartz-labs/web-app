use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{
    self, Mint, Token, TokenAccount
}};
use crate::{
    state::Vault,
    errors::ErrorCode,
    constants::USDC_MINT_ADDRESS
};

#[derive(Accounts)]
pub struct WithdrawUSDC<'info> {
    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner,
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        mut,
        seeds = [b"vault", owner.key().as_ref(), usdc_mint.key().as_ref()],
        bump,
        token::mint = usdc_mint,
        token::authority = vault
    )]
    pub vault_usdc: Account<'info, TokenAccount>,

    /// CHECK: Receiving account does not need to be checked
    #[account(mut)]
    pub receiver: UncheckedAccount<'info>,

    #[account(
        init_if_needed,
        payer = owner,
        associated_token::mint = usdc_mint,
        associated_token::authority = receiver
    )]
    pub receiver_usdc: Account<'info, TokenAccount>,

    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        constraint = usdc_mint.key() == USDC_MINT_ADDRESS @ ErrorCode::InvalidMintAddress
    )]
    pub usdc_mint: Account<'info, Mint>,
    
    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub system_program: Program<'info, System>
}

pub fn withdraw_usdc_handler(
    ctx: Context<WithdrawUSDC>, 
    amount_cents: u64
) -> Result<()> {
    msg!(
        "Sending {} USDC to {}",
        amount_cents*100, ctx.accounts.receiver_usdc.key()
    );

    if ctx.accounts.vault_usdc.amount < amount_cents {
        return err!(ErrorCode::InsufficientFunds);
    }

    let vault_bump = ctx.accounts.vault.bump;
    let owner = ctx.accounts.owner.key();
    let signer_seeds = &[
        b"vault",
        owner.as_ref(),
        &[vault_bump]
    ];

    // TODO - This is only when vault is the payer
    // // Initialize receiver's ATA if needed
    // if ctx.accounts.receiver_usdc.amount == 0 {
    //     msg!("No receiver ATA found, creating new with vault as payer");
    //     // TODO - Check vault has enough SOL to cover creation?

    //     anchor_spl::associated_token::create_idempotent(
    //         CpiContext::new_with_signer(
    //             ctx.accounts.associated_token_program.to_account_info(),
    //             anchor_spl::associated_token::Create {
    //                 payer: ctx.accounts.vault.to_account_info(),
    //                 associated_token: ctx.accounts.receiver_usdc.to_account_info(),
    //                 authority: ctx.accounts.receiver.to_account_info(),
    //                 mint: ctx.accounts.usdc_mint.to_account_info(),
    //                 system_program: ctx.accounts.system_program.to_account_info(),
    //                 token_program: ctx.accounts.token_program.to_account_info(),
    //             },
    //             &[&signer_seeds[..]]
    //         )
    //     )?;
    // }

    // Transfer tokens
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(), 
            token::Transfer { 
                from: ctx.accounts.vault_usdc.to_account_info(), 
                to: ctx.accounts.receiver_usdc.to_account_info(), 
                authority: ctx.accounts.vault.to_account_info()
            }, 
            &[&signer_seeds[..]]
        ),
        amount_cents
    )?;

    Ok(())
}
