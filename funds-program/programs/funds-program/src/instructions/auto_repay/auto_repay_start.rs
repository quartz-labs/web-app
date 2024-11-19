use anchor_lang::{
    prelude::*,
    Discriminator,
    solana_program::{
        instruction::Instruction,
        sysvar::instructions::{self, load_current_index_checked, load_instruction_at_checked}
    }
};
use anchor_spl::token::{Mint, Token, TokenAccount};
use jupiter::i11n::ExactOutRouteI11n;
use crate::{
    check, 
    errors::ErrorCode, helpers::get_jup_exact_out_route_platform_fees
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

    pub token_program: Program<'info, Token>,

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
        swap_instruction.program_id.eq(&jupiter::ID),
        ErrorCode::IllegalAutoRepayInstructions
    );

    check!(
        swap_instruction.data[..8]
            .eq(&jupiter::instructions::ExactOutRoute::DISCRIMINATOR),
        ErrorCode::IllegalAutoRepayInstructions
    );

    // Check the 3rd instruction is auto_repay_deposit
    check!(
        deposit_instruction.program_id.eq(&crate::id()),
        ErrorCode::IllegalAutoRepayInstructions
    );

    check!(
        deposit_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayDeposit::DISCRIMINATOR),
        ErrorCode::IllegalAutoRepayInstructions
    );

    // Check the 4th instruction is auto_repay_withdraw
    check!(
        withdraw_instruction.program_id.eq(&crate::id()),
        ErrorCode::IllegalAutoRepayInstructions
    );

    check!(
        withdraw_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayWithdraw::DISCRIMINATOR),
        ErrorCode::IllegalAutoRepayInstructions
    );

    Ok(())
}

fn validate_swap_data<'info>(
    ctx: &Context<'_, '_, '_, 'info, AutoRepayStart<'info>>,
    swap_instruction: &Instruction,
) -> Result<()> {
    msg!("platform fee bps: {:?}", get_jup_exact_out_route_platform_fees(swap_instruction));
    
    check!(
        get_jup_exact_out_route_platform_fees(swap_instruction)?.eq(&0),
        ErrorCode::InvalidPlatformFee
    );

    let swap_source_mint = swap_instruction.accounts[5].pubkey;
    msg!("source mint: {:?}", swap_source_mint);
    check!(
        swap_source_mint.eq(&ctx.accounts.withdraw_mint.key()),
        ErrorCode::InvalidRepayMint
    );

    let swap_source_token_account = swap_instruction.accounts[2].pubkey;
    msg!("source token account: {:?}", swap_source_token_account);
    check!(
        swap_source_token_account.eq(&ctx.accounts.caller_withdraw_spl.key()),
        ErrorCode::InvalidSourceTokenAccount
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
    let caller_balance = ctx.accounts.caller_withdraw_spl.amount;

    msg!("start withdraw balance: {:?}", start_withdraw_balance);
    msg!("caller balance: {:?}", caller_balance);

    check!(
        start_withdraw_balance == caller_balance,
        ErrorCode::InvalidStartBalance
    );

    Ok(())
}