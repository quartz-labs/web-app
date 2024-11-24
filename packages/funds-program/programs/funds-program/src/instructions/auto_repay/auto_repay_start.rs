use anchor_lang::{
    prelude::*,
    Discriminator,
    solana_program::{
        instruction::Instruction,
        sysvar::instructions::{self, load_current_index_checked, load_instruction_at_checked}
    }
};
use anchor_spl::{associated_token::AssociatedToken, token::{Mint, Token, TokenAccount}};
use crate::{
    check, constants::{JUPITER_EXACT_OUT_ROUTE_DISCRIMINATOR, JUPITER_ID}, errors::QuartzError, helpers::get_jup_exact_out_route_platform_fees, state::Vault
};

#[derive(Accounts)]
pub struct AutoRepayStart<'info> {
    #[account(mut)]
    pub caller: Signer<'info>,

    #[account(
        mut,
        associated_token::mint = withdraw_mint,
        associated_token::authority = caller
    )]
    pub caller_withdraw_spl: Box<Account<'info, TokenAccount>>,

    pub withdraw_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        seeds = [b"vault".as_ref(), owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(
        init,
        seeds = [vault.key().as_ref(), withdraw_mint.key().as_ref()],
        bump,
        payer = caller,
        token::mint = withdraw_mint,
        token::authority = vault
    )]
    pub vault_withdraw_spl: Box<Account<'info, TokenAccount>>,

    /// CHECK: Can be any account, once it has a Vault
    pub owner: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub system_program: Program<'info, System>,

    /// CHECK: Account is safe once address is correct
    #[account(address = instructions::ID)]
    instructions: UncheckedAccount<'info>,
}

pub fn validate_instruction_order<'info>(
    swap_instruction: &Instruction,
    deposit_instruction: &Instruction,
    withdraw_instruction: &Instruction,
) -> Result<()> {
    // This instruction is the 1st instruction

    // Check the 2nd instruction is Jupiter's exact_out_route
    check!(
        swap_instruction.program_id.eq(&JUPITER_ID),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        swap_instruction.data[..8].eq(&JUPITER_EXACT_OUT_ROUTE_DISCRIMINATOR),
        QuartzError::IllegalAutoRepayInstructions
    );

    // Check the 3rd instruction is auto_repay_deposit
    check!(
        deposit_instruction.program_id.eq(&crate::id()),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        deposit_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayDeposit::DISCRIMINATOR),
        QuartzError::IllegalAutoRepayInstructions
    );

    // Check the 4th instruction is auto_repay_withdraw
    check!(
        withdraw_instruction.program_id.eq(&crate::id()),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        withdraw_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayWithdraw::DISCRIMINATOR),
        QuartzError::IllegalAutoRepayInstructions
    );

    Ok(())
}

fn validate_swap_data<'info>(
    ctx: &Context<'_, '_, '_, 'info, AutoRepayStart<'info>>,
    swap_instruction: &Instruction,
) -> Result<()> {
    let platform_fee_bps = get_jup_exact_out_route_platform_fees(swap_instruction)?;
    check!(
        platform_fee_bps.eq(&0),
        QuartzError::InvalidPlatformFee
    );

    let swap_source_mint = swap_instruction.accounts[5].pubkey;
    check!(
        swap_source_mint.eq(&ctx.accounts.withdraw_mint.key()),
        QuartzError::InvalidRepayMint
    );

    let swap_source_token_account = swap_instruction.accounts[2].pubkey;
    check!(
        swap_source_token_account.eq(&ctx.accounts.caller_withdraw_spl.key()),
        QuartzError::InvalidSourceTokenAccount
    );

    Ok(())
}

pub fn auto_repay_start_handler<'info>(
    ctx: Context<'_, '_, '_, 'info, AutoRepayStart<'info>>,
    start_withdraw_balance: u64
) -> Result<()> {
    let index: usize = load_current_index_checked(&ctx.accounts.instructions.to_account_info())?.into();
    let swap_instruction = load_instruction_at_checked(index + 1, &ctx.accounts.instructions.to_account_info())?;
    let deposit_instruction = load_instruction_at_checked(index + 2, &ctx.accounts.instructions.to_account_info())?;
    let withdraw_instruction = load_instruction_at_checked(index + 3, &ctx.accounts.instructions.to_account_info())?;
    
    validate_instruction_order(&swap_instruction, &deposit_instruction, &withdraw_instruction)?;

    validate_swap_data(&ctx, &swap_instruction)?;

    // Check declared start balance is accurate
    let caller_true_balance = ctx.accounts.caller_withdraw_spl.amount;
    check!(
        start_withdraw_balance == caller_true_balance,
        QuartzError::InvalidStartBalance
    );

    Ok(())
}